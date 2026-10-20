import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import {
  telemetry,
  stepNewtonianPhysics,
  ORBITAL_NODES,
  type NodeId,
  type ModeId
} from './PhysicsTelemetry'
import { MegaStructuresBuilder, type BrutalistEngineRig } from './MegaStructuresBuilder'
import { soundEngine } from './SoundEngine'

export const EARTH_RADIUS = 100.0
export const STATION_RADIUS = 138.0

export const ELEVATOR_DIR = new THREE.Vector3(0.55, 0.0, 0.835).normalize()
const ENGINE_ARRAY_NORMAL = new THREE.Vector3(-0.52, 0.54, 0.662).normalize()
const EQUATORIAL_NORMAL = new THREE.Vector3(-0.58, 0.0, 0.814).normalize()
const IGNITION_STAGE_NORMAL = new THREE.Vector3(-0.38, 0.66, 0.648).normalize()

export class EarthSceneEngine {
  private container: HTMLElement
  private scene!: THREE.Scene
  private camera!: THREE.PerspectiveCamera
  private renderer!: THREE.WebGLRenderer
  private composer!: EffectComposer
  private bloomPass!: UnrealBloomPass
  private anamorphicPass!: ShaderPass
  private controls!: OrbitControls

  private sunLight!: THREE.DirectionalLight
  // 黄金前向受光角：让地球正面 75% 区域明亮通透，彻底告别黑乎乎的暗球！
  private currentSunDir = new THREE.Vector3(-0.48, 0.28, 0.83).normalize()

  private builder!: MegaStructuresBuilder
  private earthGroup!: THREE.Group
  private earthMaterial!: THREE.ShaderMaterial
  private cloudDeckMaterial!: THREE.ShaderMaterial
  private atmosHaloMat!: THREE.ShaderMaterial
  private cloudsMesh!: THREE.Mesh
  private globalNeedlesMat!: THREE.ShaderMaterial

  private engineArrayGroup!: THREE.Group
  private engineArrayRigs: BrutalistEngineRig[] = []
  private subMatrixBeamMat!: THREE.ShaderMaterial
  private steeringArrayGroup!: THREE.Group
  private steeringRigs: BrutalistEngineRig[] = []
  private ignitionStageGroup!: THREE.Group
  private ignitionStageRigs: BrutalistEngineRig[] = []
  private elevatorSystemGroup!: THREE.Group
  private climberPods: THREE.Group[] = []
  private tianzhuAnim!: { upper: THREE.Group; lower: THREE.Group; strobes: THREE.Mesh[] }
  private habitatGroup!: THREE.Group
  private deepSpaceGroup!: THREE.Group
  private deepSpaceLaserMat!: THREE.ShaderMaterial
  private lunaGroup!: THREE.Group
  private lunarRigs: BrutalistEngineRig[] = []

  private dyingSunGroup!: THREE.Group
  private dyingSunMat!: THREE.ShaderMaterial
  private prominenceShellMat!: THREE.ShaderMaterial
  private coronaLayerMats: THREE.ShaderMaterial[] = []
  private coronaBillboards: THREE.Mesh[] = []
  private eclipseOccluderSphere!: THREE.Mesh

  private camAnim = {
    active: false,
    startTime: 0,
    duration: 2600,
    startPos: new THREE.Vector3(),
    endPos: new THREE.Vector3(),
    startLook: new THREE.Vector3(),
    endLook: new THREE.Vector3(),
    useSphericalArc: false
  }
  private lookAtTarget = new THREE.Vector3(0, 0, 0)
  private baseCamPos = new THREE.Vector3(0, 16, 265)

  private clock = new THREE.Clock()
  private lastFrameTime = performance.now()
  private rafId = 0
  private cinematicInterval: number | null = null
  private storyTimers: number[] = []
  private dominoIgnitionProgress = 1.0
  private globalWaveProgress = 1.0
  private isEclipseShotActive = false
  private orbitalTravelAngle = 0.0

  constructor(container: HTMLElement) {
    this.container = container
    this.builder = new MegaStructuresBuilder()
    this.initRendererAndLighting()
    this.createQuietDeepSpaceStarfield()
    this.createPhotorealisticFrozenEarth()
    this.createDenseGlobalEngineMatrix()
    this.createOrbitalTrajectoryRings()
    this.createAllEightDetailedMegastructures()
    this.createBoilingRedGiantSun()
    this.setupResize()
    this.animate()
    this.startAutoCinematicCycle()
  }

  private initRendererAndLighting() {
    this.scene = new THREE.Scene()

    const w = this.container.clientWidth
    const h = this.container.clientHeight
    this.camera = new THREE.PerspectiveCamera(38, w / h, 0.15, 6000)
    this.camera.position.copy(this.baseCamPos)

    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })
    this.renderer.setSize(w, h)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    // 提升整体曝光度至 1.38，使地球与发动机火焰明亮通透
    this.renderer.toneMappingExposure = 1.38
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.container.appendChild(this.renderer.domElement)

    this.scene.environment = MegaStructuresBuilder.createStudioSpaceHDRI(this.renderer)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.05
    this.controls.minDistance = 1.2
    this.controls.maxDistance = 1400

    this.sunLight = new THREE.DirectionalLight(0xfff8ed, 4.4)
    this.sunLight.position.copy(this.currentSunDir.clone().multiplyScalar(420))
    this.scene.add(this.sunLight)

    const twilightRimLight = new THREE.DirectionalLight(0x38bdf8, 2.0)
    twilightRimLight.position.set(-220, 140, 120)
    this.scene.add(twilightRimLight)

    const hemiLight = new THREE.HemisphereLight(0xa5f3fc, 0x1e293b, 1.15)
    this.scene.add(hemiLight)

    this.composer = new EffectComposer(this.renderer)
    this.composer.addPass(new RenderPass(this.scene, this.camera))

    this.bloomPass = new UnrealBloomPass(new THREE.Vector2(w, h), 0.56, 0.42, 0.65)
    this.composer.addPass(this.bloomPass)

    this.anamorphicPass = new ShaderPass({
      uniforms: {
        tDiffuse: { value: null },
        uResolution: { value: new THREE.Vector2(w, h) },
        uTime: { value: 0 },
        uStreakIntensity: { value: 0.32 },
        uAberration: { value: 0.0011 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform vec2 uResolution;
        uniform float uTime;
        uniform float uStreakIntensity;
        uniform float uAberration;
        varying vec2 vUv;

        void main() {
          vec2 centerOffset = vUv - 0.5;
          float dist = length(centerOffset);

          vec2 caOffset = centerOffset * dist * uAberration;
          float r = texture2D(tDiffuse, vUv + caOffset).r;
          float g = texture2D(tDiffuse, vUv).g;
          float b = texture2D(tDiffuse, vUv - caOffset).b;
          vec3 baseCol = vec3(r, g, b);

          vec3 streakAccum = vec3(0.0);
          float stepX = 1.0 / uResolution.x;
          for (int i = -6; i <= 6; i++) {
            if (i == 0) continue;
            float offset = float(i) * stepX * 9.5;
            vec3 sampleCol = texture2D(tDiffuse, vec2(clamp(vUv.x + offset, 0.0, 1.0), vUv.y)).rgb;
            float luma = dot(sampleCol, vec3(0.299, 0.587, 0.114));
            float highlight = smoothstep(0.72, 1.2, luma);
            float weight = exp(-abs(float(i)) * 0.36);
            streakAccum += sampleCol * highlight * weight;
          }
          vec3 anamorphicTint = vec3(0.22, 0.75, 1.0);
          vec3 finalCol = baseCol + streakAccum * anamorphicTint * uStreakIntensity * 0.15;

          float vignette = smoothstep(1.12, 0.32, dist);
          finalCol *= mix(0.76, 1.0, vignette);

          gl_FragColor = vec4(finalCol, 1.0);
        }
      `
    })
    this.composer.addPass(this.anamorphicPass)

    this.earthGroup = new THREE.Group()
    this.scene.add(this.earthGroup)
  }

  private createQuietDeepSpaceStarfield() {
    const layers = [
      { count: 4200, size: 0.9, color: 0xe2e8f0, radius: 2200 },
      { count: 1800, size: 1.35, color: 0x93c5fd, radius: 1900 },
      { count: 900, size: 1.75, color: 0xfde68a, radius: 1750 }
    ]
    layers.forEach((l) => {
      const pos = new Float32Array(l.count * 3)
      for (let i = 0; i < l.count; i++) {
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        pos[i * 3] = l.radius * Math.sin(phi) * Math.cos(theta)
        pos[i * 3 + 1] = l.radius * Math.cos(phi)
        pos[i * 3 + 2] = l.radius * Math.sin(phi) * Math.sin(theta)
      }
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      this.scene.add(
        new THREE.Points(
          geo,
          new THREE.PointsMaterial({
            color: l.color,
            size: l.size,
            map: this.builder.softGlowSprite,
            transparent: true,
            opacity: 0.85,
            depthWrite: false
          })
        )
      )
    })

    const saturn = new THREE.Group()
    saturn.position.set(480, 110, -780)
    saturn.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(24, 48, 48),
        new THREE.MeshStandardMaterial({ color: 0x9a8262, roughness: 0.88 })
      )
    )
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(32, 54, 64),
      new THREE.MeshBasicMaterial({ color: 0x94a3b8, side: THREE.DoubleSide, transparent: true, opacity: 0.38 })
    )
    ring.rotation.x = Math.PI / 2.2
    saturn.add(ring)
    this.scene.add(saturn)
  }

  private applyMaxAnisotropy(tex: THREE.Texture) {
    tex.generateMipmaps = true
    tex.minFilter = THREE.LinearMipmapLinearFilter
    tex.magFilter = THREE.LinearFilter
    tex.anisotropy = this.renderer.capabilities.getMaxAnisotropy()
    tex.needsUpdate = true
  }

  // ============================================================================
  // 1. 高亮度通透版冰封地球着色器（大幅提亮白昼陆地、海洋与暗夜冰壳，彻底解决地球太暗问题！）
  // ============================================================================
  private createPhotorealisticFrozenEarth() {
    const loader = new THREE.TextureLoader()
    loader.setCrossOrigin('anonymous')

    this.applyMaxAnisotropy(this.builder.frozenEarthDayTex)
    this.applyMaxAnisotropy(this.builder.frozenEarthBumpTex)
    this.applyMaxAnisotropy(this.builder.frozenEarthWaterTex)
    this.applyMaxAnisotropy(this.builder.frozenEarthNightTex)

    const proceduralCloudGLSL = `
      vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

      float snoise(vec3 v) {
        const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        vec3 x1 = x0 - i1 + 1.0 * C.xxx;
        vec3 x2 = x0 - i2 + 2.0 * C.xxx;
        vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
        i = mod(i, 289.0);
        vec4 p = permute(permute(permute(
                  i.z + vec4(0.0, i1.z, i2.z, 1.0))
                + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        float n_ = 1.0 / 7.0;
        vec3 ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        vec4 x = x_ * ns.x + ns.yyyy;
        vec4 y = y_ * ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        vec4 s0 = floor(b0) * 2.0 + 1.0;
        vec4 s1 = floor(b1) * 2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
        p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
      }

      const mat3 m3 = mat3(0.00,  0.80,  0.60,
                          -0.80,  0.36, -0.48,
                          -0.60, -0.48,  0.64);

      float fbm5(vec3 p) {
        float v = 0.0;
        float a = 0.5;
        for (int i = 0; i < 5; i++) {
          v += a * snoise(p);
          p = m3 * p * 2.06;
          a *= 0.5;
        }
        return v;
      }

      vec3 rotateY(vec3 v, float angle) {
        float c = cos(angle);
        float s = sin(angle);
        return vec3(c * v.x + s * v.z, v.y, -s * v.x + c * v.z);
      }

      float evaluateSilkyCloudDensity(vec3 unitPos, float rotAngle) {
        vec3 p = rotateY(normalize(unitPos), rotAngle);
        vec3 bandPos = vec3(p.x * 2.4, p.y * 3.8, p.z * 2.4);
        vec3 warp = vec3(
          fbm5(bandPos + vec3(1.3, 4.1, 2.7)),
          fbm5(bandPos + vec3(6.2, 1.9, 5.4)),
          fbm5(bandPos + vec3(3.7, 7.3, 1.1))
        );
        float macroSwirl = fbm5(bandPos * 1.35 + warp * 0.95);
        float fineWisps = fbm5(p * 16.0 + warp * 1.4);
        float raw = macroSwirl * 0.76 + fineWisps * 0.24;
        return smoothstep(0.10, 0.56, raw);
      }
    `

    this.earthMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uDayTex: { value: this.builder.frozenEarthDayTex },
        uTopoTex: { value: this.builder.frozenEarthBumpTex },
        uWaterTex: { value: this.builder.frozenEarthWaterTex },
        uNightTex: { value: this.builder.frozenEarthNightTex },
        uCloudRotation: { value: 0.0 },
        uSunDir: { value: this.currentSunDir },
        uTime: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormalWorld;
        varying vec3 vViewDir;
        varying vec3 vUnitPos;

        void main() {
          vUv = uv;
          vUnitPos = normalize(position);
          vNormalWorld = normalize(mat3(modelMatrix) * normal);
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vViewDir = normalize(cameraPosition - worldPos.xyz);
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        uniform sampler2D uDayTex;
        uniform sampler2D uTopoTex;
        uniform sampler2D uWaterTex;
        uniform sampler2D uNightTex;
        uniform float uCloudRotation;
        uniform vec3 uSunDir;
        uniform float uTime;
        varying vec2 vUv;
        varying vec3 vNormalWorld;
        varying vec3 vViewDir;
        varying vec3 vUnitPos;

        ${proceduralCloudGLSL}

        vec4 textureBicubic(sampler2D tex, vec2 uv) {
          vec2 texSize = vec2(2048.0, 1024.0);
          vec2 invTexSize = 1.0 / texSize;
          uv = uv * texSize - 0.5;
          vec2 fxy = fract(uv);
          uv -= fxy;
          vec4 xcubic = vec4(
            (1.0 - fxy.x) * (1.0 - fxy.x) * (1.0 - fxy.x),
            4.0 - 6.0 * fxy.x * fxy.x + 3.0 * fxy.x * fxy.x * fxy.x,
            1.0 + 3.0 * fxy.x + 3.0 * fxy.x * fxy.x - 3.0 * fxy.x * fxy.x * fxy.x,
            fxy.x * fxy.x * fxy.x
          ) / 6.0;
          vec4 ycubic = vec4(
            (1.0 - fxy.y) * (1.0 - fxy.y) * (1.0 - fxy.y),
            4.0 - 6.0 * fxy.y * fxy.y + 3.0 * fxy.y * fxy.y * fxy.y,
            1.0 + 3.0 * fxy.y + 3.0 * fxy.y * fxy.y - 3.0 * fxy.y * fxy.y * fxy.y,
            fxy.y * fxy.y * fxy.y
          ) / 6.0;
          vec4 c = uv.xxyy + vec2(-0.5, 1.5).xyxy;
          vec4 s = vec4(xcubic.xz + xcubic.yw, ycubic.xz + ycubic.yw);
          vec4 offset = c + vec4(xcubic.yw, ycubic.yw) / s;
          offset *= invTexSize.xxyy;
          vec4 sample0 = texture2D(tex, offset.xz);
          vec4 sample1 = texture2D(tex, offset.yz);
          vec4 sample2 = texture2D(tex, offset.xw);
          vec4 sample3 = texture2D(tex, offset.yw);
          float sx = s.x / (s.x + s.y);
          float sy = s.z / (s.z + s.w);
          return mix(mix(sample3, sample2, sx), mix(sample1, sample0, sx), sy);
        }

        void main() {
          vec3 dayColor = textureBicubic(uDayTex, vUv).rgb;
          vec3 nightSample = texture2D(uNightTex, vUv).rgb;
          float topo = textureBicubic(uTopoTex, vUv).r;
          float waterMask = textureBicubic(uWaterTex, vUv).r;

          float microRelief = fbm5(vUnitPos * 32.0) * 0.025;
          vec2 texel = vec2(1.0 / 2048.0, 1.0 / 1024.0);
          float hL = texture2D(uTopoTex, vUv - vec2(texel.x, 0.0)).r;
          float hR = texture2D(uTopoTex, vUv + vec2(texel.x, 0.0)).r;
          float hD = texture2D(uTopoTex, vUv - vec2(0.0, texel.y)).r;
          float hU = texture2D(uTopoTex, vUv + vec2(0.0, texel.y)).r;

          vec3 N0 = normalize(vNormalWorld);
          vec3 upVec = abs(N0.y) < 0.999 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
          vec3 T = normalize(cross(upVec, N0));
          vec3 B = cross(N0, T);

          float isLand = 1.0 - smoothstep(0.30, 0.70, waterMask);
          float bumpScale = mix(0.18, 2.2, isLand);
          vec3 N = normalize(N0 + (T * (hL - hR + microRelief) + B * (hD - hU + microRelief)) * bumpScale);
          vec3 V = normalize(vViewDir);
          vec3 L = normalize(uSunDir);

          // 全面提亮地球陆地与海洋基底色 (Gamma 提亮 + 冰封高反照率加成)
          float latAbs = abs(vUnitPos.y);
          float frostMask = smoothstep(0.38, 0.82, topo * 0.65 + latAbs * 0.55);
          vec3 brightLand = pow(dayColor, vec3(0.78)) * vec3(1.18, 1.24, 1.32);
          vec3 alpineSnow = vec3(0.88, 0.94, 1.0);
          vec3 landAlbedo = mix(brightLand, alpineSnow, frostMask * 0.45);

          float shelf = smoothstep(0.0, 0.35, topo);
          vec3 brightOcean = mix(vec3(0.06, 0.22, 0.46), pow(dayColor, vec3(0.82)) * vec3(0.95, 1.15, 1.42), 0.72 + shelf * 0.28);
          vec3 surfaceAlbedo = mix(brightOcean, landAlbedo, isLand);

          vec3 shadowSamplePos = normalize(vUnitPos - L * 0.012);
          float shadowCloud = evaluateSilkyCloudDensity(shadowSamplePos, -uCloudRotation);
          float cloudShadowFactor = 1.0 - shadowCloud * 0.28;

          float NdotL = dot(N, L);
          float sphereNdotL = dot(N0, L);
          float dayFactor = smoothstep(-0.26, 0.22, sphereNdotL);
          float diffuse = max(0.0, NdotL) * cloudShadowFactor;

          vec3 H = normalize(L + V);
          float spec = pow(max(0.0, dot(N0, H)), 32.0) * (1.0 - isLand) * 0.03 * dayFactor * cloudShadowFactor;

          // 提高白昼环境底光 (0.24) 与漫反射系数 (0.72)，使地球明亮清澈！
          vec3 litDay = clamp(surfaceAlbedo * (0.24 + diffuse * 0.72) + vec3(spec), 0.0, 0.66);

          // 提亮夜半球的深蓝冰川环境色与金色城市灯网，使背光面也具备丰富地形细节
          vec3 nightAmbient = surfaceAlbedo * vec3(0.10, 0.16, 0.28) * (1.0 - dayFactor);
          vec3 nightCities = nightSample * vec3(1.55, 1.15, 0.65) * 1.25 * (1.0 - dayFactor);

          float fresnel = pow(1.0 - max(0.0, dot(V, N0)), 3.2);
          vec3 rayleighLimb = mix(vec3(0.18, 0.58, 1.0), vec3(0.55, 0.88, 1.0), fresnel) * fresnel * (0.25 + 0.52 * dayFactor);

          vec3 finalCol = mix(nightAmbient + nightCities, litDay, dayFactor) + rayleighLimb;
          gl_FragColor = vec4(finalCol, 1.0);
        }
      `
    })

    loader.load(
      'https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg',
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace
        this.applyMaxAnisotropy(tex)
        this.earthMaterial.uniforms.uDayTex.value = tex
      }
    )
    loader.load(
      'https://unpkg.com/three-globe@2.31.0/example/img/earth-topology.png',
      (tex) => {
        this.applyMaxAnisotropy(tex)
        this.earthMaterial.uniforms.uTopoTex.value = tex
      }
    )
    loader.load(
      'https://unpkg.com/three-globe@2.31.0/example/img/earth-water.png',
      (tex) => {
        this.applyMaxAnisotropy(tex)
        this.earthMaterial.uniforms.uWaterTex.value = tex
      }
    )
    loader.load(
      'https://unpkg.com/three-globe@2.31.0/example/img/earth-night.jpg',
      (tex) => {
        this.applyMaxAnisotropy(tex)
        this.earthMaterial.uniforms.uNightTex.value = tex
      }
    )

    const earthMesh = new THREE.Mesh(new THREE.SphereGeometry(EARTH_RADIUS, 192, 192), this.earthMaterial)
    this.earthGroup.add(earthMesh)

    this.cloudDeckMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uSunDir: { value: this.currentSunDir },
        uCloudRotation: { value: 0.0 },
        uEngineSiteA: { value: ENGINE_ARRAY_NORMAL },
        uEngineSiteB: { value: EQUATORIAL_NORMAL }
      },
      vertexShader: `
        varying vec3 vNormalWorld;
        varying vec3 vUnitPos;
        void main() {
          vUnitPos = normalize(position);
          vNormalWorld = normalize(mat3(modelMatrix) * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uSunDir;
        uniform float uCloudRotation;
        uniform vec3 uEngineSiteA;
        uniform vec3 uEngineSiteB;
        varying vec3 vNormalWorld;
        varying vec3 vUnitPos;

        ${proceduralCloudGLSL}

        void main() {
          float cloudAlpha = evaluateSilkyCloudDensity(vUnitPos, 0.0);

          vec3 worldDir = normalize(vNormalWorld);
          float dA = distance(worldDir, normalize(uEngineSiteA));
          float dB = distance(worldDir, normalize(uEngineSiteB));
          float eyeCavitation = smoothstep(0.04, 0.14, dA) * smoothstep(0.04, 0.14, dB);
          float shockWall = (exp(-pow((dA - 0.11) * 28.0, 2.0)) + exp(-pow((dB - 0.11) * 28.0, 2.0))) * 0.5;

          cloudAlpha = clamp(cloudAlpha * eyeCavitation + shockWall * 0.4, 0.0, 1.0);
          if (cloudAlpha < 0.01) discard;

          vec3 L = normalize(uSunDir);
          float sphereDot = dot(worldDir, L);
          float dayFactor = smoothstep(-0.26, 0.24, sphereDot);

          vec3 dayCloudCol = vec3(0.96, 0.98, 1.0) * (0.34 + max(0.0, sphereDot) * 0.54);
          vec3 twilightTint = vec3(0.88, 0.50, 0.26) * exp(-pow(sphereDot * 4.5, 2.0)) * 0.25;
          vec3 nightCloudCol = vec3(0.06, 0.11, 0.20);
          vec3 plasmaRimGlow = vec3(0.20, 0.82, 1.0) * shockWall * 0.85;

          vec3 col = mix(nightCloudCol, dayCloudCol, dayFactor) + twilightTint + plasmaRimGlow;

          gl_FragColor = vec4(col, cloudAlpha * 0.65);
        }
      `,
      transparent: true,
      depthWrite: false
    })

    this.cloudsMesh = new THREE.Mesh(
      new THREE.SphereGeometry(EARTH_RADIUS * 1.004, 160, 160),
      this.cloudDeckMaterial
    )
    this.earthGroup.add(this.cloudsMesh)

    this.atmosHaloMat = new THREE.ShaderMaterial({
      uniforms: {
        uSunDir: { value: this.currentSunDir },
        uInnerColor: { value: new THREE.Color(0x2892ff) },
        uOuterColor: { value: new THREE.Color(0x88e0ff) }
      },
      vertexShader: `
        varying vec3 vNormalView;
        varying vec3 vNormalWorld;
        varying vec3 vViewPos;
        void main() {
          vNormalView = normalize(normalMatrix * normal);
          vNormalWorld = normalize(mat3(modelMatrix) * normal);
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          vViewPos = normalize(-mvPos.xyz);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        uniform vec3 uSunDir;
        uniform vec3 uInnerColor;
        uniform vec3 uOuterColor;
        varying vec3 vNormalView;
        varying vec3 vNormalWorld;
        varying vec3 vViewPos;

        void main() {
          float viewDot = dot(vNormalView, vViewPos);
          float limb = pow(clamp(0.68 - viewDot, 0.0, 1.0), 2.8);
          float sunFacing = dot(vNormalWorld, normalize(uSunDir));
          float dayMix = smoothstep(-0.35, 0.45, sunFacing);
          vec3 col = mix(uInnerColor, uOuterColor, limb);
          gl_FragColor = vec4(col, limb * (0.28 + dayMix * 0.54));
        }
      `,
      side: THREE.BackSide,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
    this.earthGroup.add(
      new THREE.Mesh(new THREE.SphereGeometry(EARTH_RADIUS * 1.015, 128, 128), this.atmosHaloMat)
    )
  }

  // ============================================================================
  // 2. 全面加亮加粗全球 3,600 座发动机火焰与地表聚变星芒 (彻底解决火焰不明显问题！)
  // ============================================================================
  private createDenseGlobalEngineMatrix() {
    const totalCount = 3600
    // 火焰光针半径扩大至 0.045 ~ 0.14，高度拉长至 6.8 单位，确保每一座发动机的火焰都清晰夺目！
    const needleGeo = new THREE.CylinderGeometry(0.045, 0.14, 6.8, 6, 1, true)
    needleGeo.translate(0, 3.4, 0)

    this.globalNeedlesMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uThrust: { value: 1.0 },
        uWaveProgress: { value: 1.0 },
        uOverclock: { value: 0.0 }
      },
      vertexShader: `
        attribute float aWaveOrder;
        varying vec2 vUv;
        varying float vWaveOrder;
        void main() {
          vUv = uv;
          vWaveOrder = aWaveOrder;
          gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uThrust;
        uniform float uWaveProgress;
        uniform float uOverclock;
        varying vec2 vUv;
        varying float vWaveOrder;

        void main() {
          float activeMask = smoothstep(vWaveOrder - 0.06, vWaveOrder + 0.02, uWaveProgress);
          if (activeMask <= 0.01 || uThrust <= 0.01) discard;

          float rootCore = exp(-vUv.y * 7.5);
          float laserDecay = pow(max(0.0, 1.0 - vUv.y), 1.45);
          float pulse = 0.88 + 0.12 * sin(uTime * 14.0 + vWaveOrder * 80.0);

          vec3 iceBlue = mix(vec3(0.05, 0.78, 1.0), vec3(1.35, 1.75, 2.1), rootCore);
          vec3 whiteGold = mix(vec3(1.0, 0.58, 0.12), vec3(1.8, 1.6, 1.1), rootCore);
          vec3 col = mix(iceBlue, whiteGold, uOverclock) * pulse;

          float alpha = clamp((laserDecay * 0.78 + rootCore * 0.65) * activeMask * clamp(uThrust, 0.3, 1.25), 0.0, 0.92);
          gl_FragColor = vec4(col, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    })

    const instMesh = new THREE.InstancedMesh(needleGeo, this.globalNeedlesMat, totalCount)
    const waveOrders = new Float32Array(totalCount)
    const dummy = new THREE.Object3D()
    const up = new THREE.Vector3(0, 1, 0)
    const sparkPos = new Float32Array(totalCount * 3)

    const patches = [
      { latMin: 18, latMax: 68, lonMin: 12, lonMax: 145 },
      { latMin: 22, latMax: 64, lonMin: -130, lonMax: -62 },
      { latMin: 16, latMax: 54, lonMin: -10, lonMax: 48 }
    ]

    for (let i = 0; i < totalCount; i++) {
      let latDeg = 0
      let lonDeg = 0
      let scaleLen = 1.0

      if (i < 360) {
        latDeg = (Math.random() - 0.5) * 0.6
        lonDeg = (i / 360) * 360 - 180
        scaleLen = 0.85 + Math.random() * 0.35
      } else {
        const p = patches[i % patches.length]
        latDeg = p.latMin + Math.random() * (p.latMax - p.latMin)
        lonDeg = p.lonMin + Math.random() * (p.lonMax - p.lonMin)
        scaleLen = 0.85 + Math.random() * 0.85
      }

      const phi = (90 - latDeg) * (Math.PI / 180)
      const theta = (lonDeg + 180) * (Math.PI / 180)

      const x = -EARTH_RADIUS * Math.sin(phi) * Math.cos(theta)
      const y = EARTH_RADIUS * Math.cos(phi)
      const z = EARTH_RADIUS * Math.sin(phi) * Math.sin(theta)

      dummy.position.set(x, y, z)
      const surfNorm = dummy.position.clone().normalize()
      dummy.quaternion.setFromUnitVectors(up, surfNorm)
      dummy.scale.set(1.0, scaleLen, 1.0)
      dummy.updateMatrix()
      instMesh.setMatrixAt(i, dummy.matrix)

      sparkPos[i * 3] = x * 1.002
      sparkPos[i * 3 + 1] = y * 1.002
      sparkPos[i * 3 + 2] = z * 1.002
      waveOrders[i] = (lonDeg + 180) / 360
    }

    instMesh.geometry.setAttribute('aWaveOrder', new THREE.InstancedBufferAttribute(waveOrders, 1))
    this.earthGroup.add(instMesh)

    // 地表发动机喷口高亮星点 (尺寸放大至 1.28，亮度 0.96)
    const sparkGeo = new THREE.BufferGeometry()
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3))
    this.earthGroup.add(
      new THREE.Points(
        sparkGeo,
        new THREE.PointsMaterial({
          color: 0xe0faff,
          size: 1.28,
          map: this.builder.softGlowSprite,
          transparent: true,
          opacity: 0.96,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        })
      )
    )
  }

  private createOrbitalTrajectoryRings() {
    const buildRing = (r: number, rx: number, rz: number, op: number) => {
      const pts: THREE.Vector3[] = []
      for (let i = 0; i < 180; i++) {
        const a = (i / 180) * Math.PI * 2
        pts.push(new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r))
      }
      const loop = new THREE.LineLoop(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({ color: 0x4da6ff, transparent: true, opacity: op })
      )
      loop.rotation.set(rx, 0, rz)
      return loop
    }
    this.earthGroup.add(buildRing(STATION_RADIUS, 0, 0, 0.14))
    this.earthGroup.add(buildRing(156.0, 0.24, -0.15, 0.12))
  }

  // ============================================================================
  // 3. 构建全部 8 大巨构节点（将 ENGINE ARRAY 扩充为 25 座核心巨塔 + 48 束环绕矩阵光柱，火焰极其壮观！）
  // ============================================================================
  private createAllEightDetailedMegastructures() {
    const up = new THREE.Vector3(0, 1, 0)

    // 1. ENGINE ARRAY 01 (25 座 5x5 阵列重工业巨塔 + 48 座远景矩阵光柱 = 同屏 73 根擎天等离子激光柱！)
    this.engineArrayGroup = new THREE.Group()
    const tangentF = new THREE.Vector3().crossVectors(up, ENGINE_ARRAY_NORMAL).normalize()
    const tangentR = new THREE.Vector3().crossVectors(ENGINE_ARRAY_NORMAL, tangentF).normalize()

    const heroEngineSites: { f: number; r: number; s: number }[] = []
    for (let row = 0; row < 5; row++) {
      for (let col = -2; col <= 2; col++) {
        const f = row * 3.2 + (Math.abs(col) % 2) * 1.1
        const r = col * 2.8 + (row % 2 - 0.5) * 0.8
        const s = Math.max(0.88, 1.48 - row * 0.11)
        heroEngineSites.push({ f, r, s })
      }
    }

    heroEngineSites.forEach((s, idx) => {
      const threshold = (idx / heroEngineSites.length) * 0.68
      const rig = this.builder.buildBrutalistPlanetaryEngine(s.s, 24.0, threshold)
      const ptNorm = ENGINE_ARRAY_NORMAL
        .clone()
        .multiplyScalar(EARTH_RADIUS)
        .addScaledVector(tangentR, s.r)
        .addScaledVector(tangentF, s.f)
        .normalize()

      rig.group.position.copy(ptNorm.clone().multiplyScalar(EARTH_RADIUS - 0.15))
      rig.group.quaternion.setFromUnitVectors(up, ptNorm)
      this.engineArrayGroup.add(rig.group)
      this.engineArrayRigs.push(rig)
    })

    // 额外铺设 48 束环绕推进矩阵的远景巨型等离子柱，让推进阵列天际线彻底被蓝白光柱填满！
    const subCount = 48
    const subBeamGeo = new THREE.CylinderGeometry(0.45, 0.28, 22.0, 16, 1, true)
    subBeamGeo.translate(0, 11.0, 0)
    this.subMatrixBeamMat = this.builder.createCollimatedLaserCoreShader(0.2)
    const subBeamsInst = new THREE.InstancedMesh(subBeamGeo, this.subMatrixBeamMat, subCount)
    const dummy = new THREE.Object3D()

    for (let i = 0; i < subCount; i++) {
      const row = Math.floor(i / 8)
      const col = (i % 8) - 3.5
      const df = 6.0 + row * 4.2
      const dr = col * 4.2 + (row % 2) * 1.8
      const ptNorm = ENGINE_ARRAY_NORMAL
        .clone()
        .multiplyScalar(EARTH_RADIUS)
        .addScaledVector(tangentR, dr)
        .addScaledVector(tangentF, df)
        .normalize()

      dummy.position.copy(ptNorm.clone().multiplyScalar(EARTH_RADIUS + 0.3))
      dummy.quaternion.setFromUnitVectors(up, ptNorm)
      dummy.scale.setScalar(Math.max(0.55, 1.0 - row * 0.06))
      dummy.updateMatrix()
      subBeamsInst.setMatrixAt(i, dummy.matrix)
    }
    this.engineArrayGroup.add(subBeamsInst)
    this.earthGroup.add(this.engineArrayGroup)

    // 2. EQUATORIAL STEERING ARRAY
    this.steeringArrayGroup = new THREE.Group()
    const baseEqLon = Math.atan2(EQUATORIAL_NORMAL.x, EQUATORIAL_NORMAL.z)
    for (let i = 0; i < 14; i++) {
      const lonAngle = baseEqLon + i * 0.018
      const surfNormal = new THREE.Vector3(
        Math.sin(lonAngle),
        (i % 2 - 0.5) * 0.006,
        Math.cos(lonAngle)
      ).normalize()

      const rig = this.builder.buildGimbalSteeringEngineUnit(1.25, 22.0)
      rig.group.position.copy(surfNormal.clone().multiplyScalar(EARTH_RADIUS - 0.15))
      rig.group.quaternion.setFromUnitVectors(up, surfNormal)
      this.steeringArrayGroup.add(rig.group)
      this.steeringRigs.push(rig)
    }
    this.earthGroup.add(this.steeringArrayGroup)

    // 3. IGNITION NODE
    this.ignitionStageGroup = new THREE.Group()
    const igTanF = new THREE.Vector3().crossVectors(up, IGNITION_STAGE_NORMAL).normalize()
    const igTanR = new THREE.Vector3().crossVectors(IGNITION_STAGE_NORMAL, igTanF).normalize()
    for (let i = -3; i <= 3; i++) {
      const scale = i === 0 ? 1.55 : Math.abs(i) === 1 ? 1.28 : 1.02
      const rig = this.builder.buildBrutalistPlanetaryEngine(scale, 25.0, (i + 3) * 0.1)
      const ptNorm = IGNITION_STAGE_NORMAL
        .clone()
        .multiplyScalar(EARTH_RADIUS)
        .addScaledVector(igTanR, i * 2.05)
        .addScaledVector(igTanF, Math.abs(i) * 0.8)
        .normalize()
      rig.group.position.copy(ptNorm.clone().multiplyScalar(EARTH_RADIUS - 0.15))
      rig.group.quaternion.setFromUnitVectors(up, ptNorm)
      this.ignitionStageGroup.add(rig.group)
      this.ignitionStageRigs.push(rig)
    }
    this.earthGroup.add(this.ignitionStageGroup)

    // 4 & 5. ELEVATOR & TIANZHU APEX STATION
    const elevatorSys = this.builder.buildIntegratedSpaceElevatorSystem(EARTH_RADIUS, STATION_RADIUS)
    this.elevatorSystemGroup = elevatorSys.systemGroup
    this.climberPods = elevatorSys.climberPods
    this.tianzhuAnim = {
      upper: elevatorSys.ringUpper,
      lower: elevatorSys.ringLower,
      strobes: elevatorSys.strobes
    }
    this.elevatorSystemGroup.quaternion.setFromUnitVectors(up, ELEVATOR_DIR)
    this.earthGroup.add(this.elevatorSystemGroup)

    // 6. HABITAT RING AURORA
    this.habitatGroup = this.builder.buildHabitatRingAurora()
    this.habitatGroup.position.set(-76, 42, 132)
    this.habitatGroup.lookAt(0, 0, 0)
    this.earthGroup.add(this.habitatGroup)

    // 7. DEEP SPACE ARRAY
    const ds = this.builder.buildDeepSpaceRelayFleet()
    this.deepSpaceGroup = ds.group
    this.deepSpaceLaserMat = ds.laserShaderMat
    this.deepSpaceGroup.position.set(-185, 65, 195)
    this.deepSpaceGroup.lookAt(480, 110, -780)
    this.scene.add(this.deepSpaceGroup)

    // 8. LUNA
    const luna = this.builder.buildPhotorealisticLuna(27.0)
    this.lunaGroup = luna.group
    this.lunarRigs = luna.lunarRigs
    this.lunaGroup.position.set(220, 28, -185)
    this.scene.add(this.lunaGroup)
  }

  private createBoilingRedGiantSun() {
    this.dyingSunGroup = new THREE.Group()
    this.dyingSunGroup.position.set(-280, 95, -240)

    const sunRadius = 36.0

    this.dyingSunMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        varying vec3 vUnitPos;
        varying vec3 vNormalView;
        varying vec3 vViewDir;
        void main() {
          vUnitPos = normalize(position);
          vNormalView = normalize(normalMatrix * normal);
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          vViewDir = normalize(-mvPos.xyz);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec3 vUnitPos;
        varying vec3 vNormalView;
        varying vec3 vViewDir;

        vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

        float snoise(vec3 v) {
          const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          vec3 i  = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);
          vec3 x1 = x0 - i1 + 1.0 * C.xxx;
          vec3 x2 = x0 - i2 + 2.0 * C.xxx;
          vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
          i = mod(i, 289.0);
          vec4 p = permute(permute(permute(
                    i.z + vec4(0.0, i1.z, i2.z, 1.0))
                  + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                  + i.x + vec4(0.0, i1.x, i2.x, 1.0));
          float n_ = 1.0 / 7.0;
          vec3 ns = n_ * D.wyz - D.xzx;
          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_);
          vec4 x = x_ * ns.x + ns.yyyy;
          vec4 y = y_ * ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);
          vec4 s0 = floor(b0) * 2.0 + 1.0;
          vec4 s1 = floor(b1) * 2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
          vec3 p0 = vec3(a0.xy, h.x);
          vec3 p1 = vec3(a0.zw, h.y);
          vec3 p2 = vec3(a1.xy, h.z);
          vec3 p3 = vec3(a1.zw, h.w);
          vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
          p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
          m = m * m;
          return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
        }

        const mat3 rotM = mat3(0.00,  0.80,  0.60,
                              -0.80,  0.36, -0.48,
                              -0.60, -0.48,  0.64);

        float fbmSimplex(vec3 p) {
          float f = 0.0;
          float amp = 0.5;
          for (int i = 0; i < 5; i++) {
            f += amp * snoise(p);
            p = rotM * p * 2.05;
            amp *= 0.5;
          }
          return f;
        }

        void main() {
          vec3 p = vUnitPos * 4.5 + vec3(0.0, uTime * 0.08, uTime * 0.06);

          vec3 q = vec3(
            fbmSimplex(p),
            fbmSimplex(p + vec3(5.2, 1.3, 2.8)),
            fbmSimplex(p + vec3(1.7, 9.2, 4.1))
          );
          vec3 r = vec3(
            fbmSimplex(p + 1.8 * q + vec3(1.7, 9.2, 0.5) + uTime * 0.12),
            fbmSimplex(p + 1.8 * q + vec3(8.3, 2.8, 3.1) - uTime * 0.10),
            0.0
          );
          float convection = fbmSimplex(p + 2.2 * r);

          float granules = 1.0 - abs(snoise(vUnitPos * 26.0 + q * 2.5 - uTime * 0.35));

          float macroMag = snoise(vUnitPos * 3.2 + q * 0.6);
          float sunspotUmbra = smoothstep(-0.42, -0.68, macroMag);
          float activeFlareRing = exp(-pow((macroMag + 0.36) * 7.5, 2.0)) * smoothstep(0.3, 0.9, granules);
          float flareFilaments = pow(max(0.0, convection + granules * 0.5), 2.4);

          float mu = clamp(dot(normalize(vNormalView), normalize(vViewDir)), 0.0, 1.0);
          float limbDarkening = pow(mu, 0.52);
          float chromosphereRim = pow(1.0 - mu, 4.2);

          vec3 deepCrimson = vec3(0.40, 0.04, 0.0);
          vec3 lavaOrange = vec3(1.0, 0.27, 0.0);
          vec3 whiteGold = vec3(1.45, 1.28, 0.85);

          vec3 surfaceCol = mix(deepCrimson, lavaOrange, smoothstep(-0.35, 0.38, convection + granules * 0.35));
          surfaceCol = mix(surfaceCol, whiteGold, clamp(flareFilaments * 0.65 + activeFlareRing * 0.9, 0.0, 1.0));
          surfaceCol = mix(surfaceCol, vec3(0.10, 0.01, 0.0), sunspotUmbra * 0.88);
          surfaceCol = surfaceCol * (0.32 + 0.68 * limbDarkening) + vec3(1.5, 0.55, 0.12) * chromosphereRim * 0.95;

          gl_FragColor = vec4(surfaceCol, 1.0);
        }
      `
    })

    const sunMesh = new THREE.Mesh(new THREE.SphereGeometry(sunRadius, 128, 128), this.dyingSunMat)
    this.dyingSunGroup.add(sunMesh)

    this.prominenceShellMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        uniform float uTime;
        varying vec3 vUnitPos;
        varying vec3 vNormalView;
        varying vec3 vViewDir;

        vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

        float snoise(vec3 v) {
          const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          vec3 i  = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);
          vec3 x1 = x0 - i1 + 1.0 * C.xxx;
          vec3 x2 = x0 - i2 + 2.0 * C.xxx;
          vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
          i = mod(i, 289.0);
          vec4 p = permute(permute(permute(
                    i.z + vec4(0.0, i1.z, i2.z, 1.0))
                  + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                  + i.x + vec4(0.0, i1.x, i2.x, 1.0));
          float n_ = 1.0 / 7.0;
          vec3 ns = n_ * D.wyz - D.xzx;
          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_);
          vec4 x = x_ * ns.x + ns.yyyy;
          vec4 y = y_ * ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);
          vec4 s0 = floor(b0) * 2.0 + 1.0;
          vec4 s1 = floor(b1) * 2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
          vec3 p0 = vec3(a0.xy, h.x);
          vec3 p1 = vec3(a0.zw, h.y);
          vec3 p2 = vec3(a1.xy, h.z);
          vec3 p3 = vec3(a1.zw, h.w);
          vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
          p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
          m = m * m;
          return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
        }

        void main() {
          vUnitPos = normalize(position);
          float tongue = max(0.0, snoise(vUnitPos * 6.5 - vec3(0.0, uTime * 0.45, 0.0)))
                       + max(0.0, snoise(vUnitPos * 14.0 + vec3(uTime * 0.6, 0.0, 0.0))) * 0.5;
          vec3 displaced = position + normal * (tongue * 2.4);
          vNormalView = normalize(normalMatrix * normal);
          vec4 mvPos = modelViewMatrix * vec4(displaced, 1.0);
          vViewDir = normalize(-mvPos.xyz);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec3 vUnitPos;
        varying vec3 vNormalView;
        varying vec3 vViewDir;

        void main() {
          float mu = abs(dot(normalize(vNormalView), normalize(vViewDir)));
          float rimFlame = pow(1.0 - mu, 2.6);
          float flicker = 0.7 + 0.3 * sin(vUnitPos.x * 25.0 + vUnitPos.y * 25.0 - uTime * 5.0);
          vec3 col = mix(vec3(1.0, 0.25, 0.02), vec3(1.6, 1.15, 0.45), rimFlame);
          gl_FragColor = vec4(col, rimFlame * flicker * 0.75);
        }
      `,
      side: THREE.BackSide,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    const prominenceShell = new THREE.Mesh(
      new THREE.SphereGeometry(sunRadius * 1.03, 128, 128),
      this.prominenceShellMat
    )
    this.dyingSunGroup.add(prominenceShell)

    const coronaConfigs = [
      { scale: 1.35, falloff: 3.2, opacity: 0.72, speed: 0.35 },
      { scale: 1.85, falloff: 3.8, opacity: 0.48, speed: -0.25 },
      { scale: 2.85, falloff: 4.5, opacity: 0.32, speed: 0.18 }
    ]

    coronaConfigs.forEach((cfg) => {
      const mat = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uFalloff: { value: cfg.falloff },
          uOpacity: { value: cfg.opacity },
          uSpeed: { value: cfg.speed }
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform float uFalloff;
          uniform float uOpacity;
          uniform float uSpeed;
          varying vec2 vUv;

          void main() {
            vec2 p = (vUv - 0.5) * 2.0;
            float r = length(p);
            if (r > 1.0) discard;

            float ang = atan(p.y, p.x);
            float streamer1 = 0.5 + 0.5 * sin(ang * 7.0 + uTime * uSpeed + sin(r * 6.0 - uTime * 1.2));
            float streamer2 = 0.5 + 0.5 * cos(ang * 13.0 - uTime * uSpeed * 1.4 + cos(r * 10.0));
            float streamer3 = 0.5 + 0.5 * sin(ang * 23.0 + r * 8.0 - uTime * 1.8);
            float cmeRays = 0.55 + 0.25 * pow(streamer1, 2.0) + 0.12 * pow(streamer2, 3.0) + 0.08 * streamer3;

            float expDecay = exp(-r * uFalloff) * smoothstep(1.0, 0.35, r);
            float innerMask = smoothstep(0.18, 0.38, r);

            vec3 innerGold = vec3(1.55, 1.05, 0.42);
            vec3 outerCrimson = vec3(0.92, 0.22, 0.03);
            vec3 col = mix(innerGold, outerCrimson, clamp((r - 0.2) / 0.8, 0.0, 1.0));

            float alpha = expDecay * innerMask * cmeRays * uOpacity;
            gl_FragColor = vec4(col, clamp(alpha, 0.0, 0.85));
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide
      })

      const size = sunRadius * 2.0 * cfg.scale
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(size, size), mat)
      this.dyingSunGroup.add(mesh)
      this.coronaLayerMats.push(mat)
      this.coronaBillboards.push(mesh)
    })

    this.eclipseOccluderSphere = new THREE.Mesh(
      new THREE.SphereGeometry(35.4, 64, 64),
      new THREE.MeshBasicMaterial({ color: 0x000000 })
    )
    this.eclipseOccluderSphere.position.set(-110, -22, 50)
    this.dyingSunGroup.add(this.eclipseOccluderSphere)

    this.scene.add(this.dyingSunGroup)
  }

  private getNodeCameraPose(nodeId: NodeId): { pos: THREE.Vector3; look: THREE.Vector3 } {
    const up = new THREE.Vector3(0, 1, 0)

    switch (nodeId) {
      case 'EARTH':
        return {
          pos: new THREE.Vector3(0, 16, 265),
          look: new THREE.Vector3(0, 0, 0)
        }

      case 'ENGINE_ARRAY': {
        const n = ENGINE_ARRAY_NORMAL
        const f = new THREE.Vector3().crossVectors(up, n).normalize()
        const r = new THREE.Vector3().crossVectors(n, f).normalize()
        const camPos = n
          .clone()
          .multiplyScalar(EARTH_RADIUS + 1.05)
          .addScaledVector(f, -3.4)
          .addScaledVector(r, 1.15)
        const lookAt = n
          .clone()
          .multiplyScalar(EARTH_RADIUS + 6.5)
          .addScaledVector(f, 6.2)
        return { pos: camPos, look: lookAt }
      }

      case 'EQUATORIAL': {
        const baseLon = Math.atan2(EQUATORIAL_NORMAL.x, EQUATORIAL_NORMAL.z)
        const camLon = baseLon - 0.028
        const lookLon = baseLon + 0.055
        const camPos = new THREE.Vector3(
          Math.sin(camLon) * (EARTH_RADIUS + 0.85),
          -0.38,
          Math.cos(camLon) * (EARTH_RADIUS + 0.85)
        )
        const lookAt = new THREE.Vector3(
          Math.sin(lookLon) * (EARTH_RADIUS + 5.2),
          1.2,
          Math.cos(lookLon) * (EARTH_RADIUS + 5.2)
        )
        return { pos: camPos, look: lookAt }
      }

      case 'ANCHOR': {
        const n = ELEVATOR_DIR
        const t = new THREE.Vector3(-n.z, 0.16, n.x).normalize()
        const camPos = n
          .clone()
          .multiplyScalar(EARTH_RADIUS + 1.45)
          .addScaledVector(t, 4.2)
        const lookAt = n.clone().multiplyScalar(EARTH_RADIUS + 2.8)
        return { pos: camPos, look: lookAt }
      }

      case 'TIANZHU': {
        const n = ELEVATOR_DIR
        const t = new THREE.Vector3(-n.z, 0.18, n.x).normalize()
        const stPos = n.clone().multiplyScalar(STATION_RADIUS)
        const camPos = stPos.clone().addScaledVector(n, 5.2).addScaledVector(t, 6.8)
        const lookAt = stPos.clone().addScaledVector(n, -1.5)
        return { pos: camPos, look: lookAt }
      }

      case 'HABITAT': {
        const hPos = this.habitatGroup.position.clone()
        const radial = hPos.clone().normalize()
        const side = new THREE.Vector3().crossVectors(radial, up).normalize()
        const camPos = hPos
          .clone()
          .addScaledVector(radial, 8.8)
          .addScaledVector(side, 6.2)
          .add(new THREE.Vector3(0, 2.4, 0))
        const lookAt = hPos.clone().addScaledVector(radial, -6.5)
        return { pos: camPos, look: lookAt }
      }

      case 'DEEP_SPACE': {
        const dPos = this.deepSpaceGroup.position.clone()
        return {
          pos: dPos.clone().add(new THREE.Vector3(3.8, 1.6, 6.2)),
          look: dPos.clone().add(new THREE.Vector3(-2.0, -0.4, -3.5))
        }
      }

      case 'LUNA': {
        const lPos = this.lunaGroup.position.clone()
        return {
          pos: lPos.clone().add(new THREE.Vector3(18, 10, 48)),
          look: lPos.clone().add(new THREE.Vector3(2, 1, 4))
        }
      }

      case 'IGNITION_NODE': {
        const n = IGNITION_STAGE_NORMAL
        const f = new THREE.Vector3().crossVectors(up, n).normalize()
        const camPos = n
          .clone()
          .multiplyScalar(EARTH_RADIUS + 0.65)
          .addScaledVector(f, -4.8)
        const lookAt = n
          .clone()
          .multiplyScalar(EARTH_RADIUS + 3.6)
          .addScaledVector(f, 2.2)
        return { pos: camPos, look: lookAt }
      }
    }
  }

  public flyToNode(nodeId: NodeId, duration = 2.6) {
    telemetry.currentNode = nodeId
    const { pos, look } = this.getNodeCameraPose(nodeId)

    this.camAnim.startPos.copy(this.camera.position)
    this.camAnim.endPos.copy(pos)
    this.camAnim.startLook.copy(this.lookAtTarget)
    this.camAnim.endLook.copy(look)
    this.camAnim.startTime = performance.now()
    this.camAnim.duration = duration * 1000
    this.camAnim.active = true

    const mid = this.camAnim.startPos.clone().lerp(this.camAnim.endPos, 0.5)
    this.camAnim.useSphericalArc = mid.length() < EARTH_RADIUS * 1.12
    this.controls.enabled = false
  }

  private updateCameraTransition(now: number) {
    if (!this.camAnim.active) return

    const rawT = Math.min(1.0, (now - this.camAnim.startTime) / this.camAnim.duration)
    const t = rawT < 0.5 ? 4 * rawT * rawT * rawT : 1 - Math.pow(-2 * rawT + 2, 3) / 2

    if (this.camAnim.useSphericalArc) {
      const dirA = this.camAnim.startPos.clone().normalize()
      const dirB = this.camAnim.endPos.clone().normalize()
      const qA = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), dirA)
      const qB = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), dirB)
      qA.slerp(qB, t)
      const arcDir = new THREE.Vector3(0, 0, 1).applyQuaternion(qA).normalize()

      const rA = this.camAnim.startPos.length()
      const rB = this.camAnim.endPos.length()
      const baseR = THREE.MathUtils.lerp(rA, rB, t)
      const archBoost = Math.sin(t * Math.PI) * 32.0
      const safeRadius = Math.max(EARTH_RADIUS * 1.15, baseR + archBoost)

      this.baseCamPos.copy(arcDir.multiplyScalar(safeRadius))
    } else {
      this.baseCamPos.lerpVectors(this.camAnim.startPos, this.camAnim.endPos, t)
    }

    this.lookAtTarget.lerpVectors(this.camAnim.startLook, this.camAnim.endLook, t)
    this.controls.target.copy(this.lookAtTarget)

    if (rawT >= 1.0) {
      this.camAnim.active = false
      if (telemetry.currentMode === 'EXPLORE') {
        this.controls.enabled = true
      }
    }
  }

  public startThreeChapterStorySequence() {
    this.clearStoryTimers()
    telemetry.storyActive = true
    this.controls.enabled = false
    if (!soundEngine.bgmPlaying) {
      soundEngine.startBGM()
    }

    const isZh = () => telemetry.lang === 'ZH'
    const sunPos = this.dyingSunGroup.position.clone()
    const toCamDir = sunPos.clone().negate().normalize()

    this.isEclipseShotActive = true
    telemetry.storyChapter = isZh() ? '第一章 // CHAPTER I' : 'CHAPTER I'
    telemetry.storyTitle = isZh() ? '垂死之日 THE DYING SUN' : 'THE DYING SUN'
    telemetry.storySubtitle = isZh()
      ? '太阳正在死去，急速膨胀的红巨星即将吞噬地球。'
      : 'And the Sun is dying.'
    soundEngine.speak('Chapter One: The Dying Sun.', '第一章，垂死之日。太阳正在死去。')

    this.eclipseOccluderSphere.position.set(-85, -18, 40)
    const sunCamStart = sunPos.clone().addScaledVector(toCamDir, 135).add(new THREE.Vector3(12, 4, -8))
    const sunCamEnd = sunPos.clone().addScaledVector(toCamDir, 122)

    this.camera.position.copy(sunCamStart)
    this.baseCamPos.copy(sunCamStart)
    this.lookAtTarget.copy(sunPos)

    this.camAnim.startPos.copy(sunCamStart)
    this.camAnim.endPos.copy(sunCamEnd)
    this.camAnim.startLook.copy(sunPos)
    this.camAnim.endLook.copy(sunPos)
    this.camAnim.startTime = performance.now()
    this.camAnim.duration = 8800
    this.camAnim.useSphericalArc = false
    this.camAnim.active = true

    this.storyTimers.push(
      window.setTimeout(() => {
        telemetry.storyChapter = ''
        telemetry.storyTitle = ''
        telemetry.storySubtitle = isZh()
          ? '所以我们决定，带着地球一起离开。'
          : 'So we will take the Earth with us.'
        soundEngine.speak('So we will take the Earth with us.', '所以我们决定，带着地球一起离开。')
      }, 4200)
    )

    this.storyTimers.push(
      window.setTimeout(() => {
        this.isEclipseShotActive = false
        this.eclipseOccluderSphere.position.set(-110, -22, 50)

        telemetry.storyChapter = isZh() ? '第二章 // CHAPTER II' : 'CHAPTER II'
        telemetry.storyTitle = isZh() ? '苍穹点火 IGNITION' : 'IGNITION'
        telemetry.storySubtitle = isZh()
          ? '行星发动机矩阵同步点火，白青色高斯等离子光柱直冲苍穹。'
          : 'Planetary engine matrix ignites across the horizon as plasma lasers pierce the heavens.'
        soundEngine.speak('Chapter Two: Ignition.', '第二章，苍穹点火。')

        this.dominoIgnitionProgress = 0.0
        for (let b = 0; b < 5; b++) {
          this.storyTimers.push(
            window.setTimeout(() => {
              soundEngine.playIgnitionBoom(b)
            }, b * 1200)
          )
        }

        const igPose = this.getNodeCameraPose('IGNITION_NODE')
        this.camera.position.copy(igPose.pos)
        this.baseCamPos.copy(igPose.pos)
        this.lookAtTarget.copy(igPose.look)

        this.camAnim.startPos.copy(igPose.pos)
        this.camAnim.endPos.copy(igPose.pos.clone().add(new THREE.Vector3(0.5, 0.35, 0.5)))
        this.camAnim.startLook.copy(igPose.look)
        this.camAnim.endLook.copy(igPose.look.clone().add(new THREE.Vector3(0, 1.8, 0)))
        this.camAnim.startTime = performance.now()
        this.camAnim.duration = 9600
        this.camAnim.useSphericalArc = false
        this.camAnim.active = true
      }, 9000)
    )

    this.storyTimers.push(
      window.setTimeout(() => {
        telemetry.storyChapter = ''
        telemetry.storyTitle = ''
        telemetry.storySubtitle = isZh()
          ? '一万座行星发动机，按各大洲版图依次点亮。'
          : '10,000 planetary engines light up, continent by continent.'
        soundEngine.speak(
          '10,000 planetary engines light up, continent by continent.',
          '一万座行星发动机，按各大洲版图依次点亮。'
        )

        this.globalWaveProgress = 0.0
        const earthPose = this.getNodeCameraPose('EARTH')
        this.camAnim.startPos.copy(this.camera.position)
        this.camAnim.endPos.copy(earthPose.pos)
        this.camAnim.startLook.copy(this.lookAtTarget)
        this.camAnim.endLook.copy(earthPose.look)
        this.camAnim.startTime = performance.now()
        this.camAnim.duration = 5200
        this.camAnim.useSphericalArc = true
        this.camAnim.active = true
      }, 19000)
    )

    this.storyTimers.push(
      window.setTimeout(() => {
        telemetry.storyChapter = isZh() ? '第三章 // CHAPTER III' : 'CHAPTER III'
        telemetry.storyTitle = isZh() ? '刹住世界 TURNING THE WORLD' : 'TURNING THE WORLD'
        telemetry.storySubtitle = isZh()
          ? '去刹住我们这个世界的自转。'
          : "To brake our world's rotation."
        soundEngine.speak("To brake our world's rotation.", '去刹住我们这个世界的自转。')

        const eqPose = this.getNodeCameraPose('EQUATORIAL')
        this.camera.position.copy(eqPose.pos)
        this.baseCamPos.copy(eqPose.pos)
        this.lookAtTarget.copy(eqPose.look)

        this.camAnim.startPos.copy(eqPose.pos)
        this.camAnim.endPos.copy(eqPose.pos.clone().add(new THREE.Vector3(0.4, 0.3, -0.6)))
        this.camAnim.startLook.copy(eqPose.look)
        this.camAnim.endLook.copy(eqPose.look.clone().add(new THREE.Vector3(0, 1.4, 0)))
        this.camAnim.startTime = performance.now()
        this.camAnim.duration = 5200
        this.camAnim.useSphericalArc = false
        this.camAnim.active = true
      }, 24500)
    )

    this.storyTimers.push(
      window.setTimeout(() => {
        telemetry.storyActive = false
        telemetry.currentMode = 'CINEMATIC'
        this.dominoIgnitionProgress = 1.0
        this.globalWaveProgress = 1.0
        this.flyToNode('EARTH', 2.8)
      }, 30000)
    )
  }

  private clearStoryTimers() {
    this.storyTimers.forEach((id) => clearTimeout(id))
    this.storyTimers = []
    telemetry.storyActive = false
    this.isEclipseShotActive = false
    if (this.eclipseOccluderSphere) {
      this.eclipseOccluderSphere.position.set(-110, -22, 50)
    }
    this.dominoIgnitionProgress = 1.0
    this.globalWaveProgress = 1.0
  }

  public setMode(mode: ModeId) {
    telemetry.currentMode = mode
    this.clearStoryTimers()

    if (mode === 'JOURNEY') {
      this.startThreeChapterStorySequence()
    } else if (mode === 'FIRST_PERSON') {
      this.flyToNode('IGNITION_NODE', 2.2)
    } else if (mode === 'EXPLORE') {
      this.controls.enabled = true
    } else if (mode === 'CINEMATIC') {
      this.flyToNode(telemetry.currentNode, 2.4)
    }
  }

  private startAutoCinematicCycle() {
    let idx = 0
    this.cinematicInterval = window.setInterval(() => {
      if (telemetry.currentMode === 'CINEMATIC' && !telemetry.storyActive && !this.camAnim.active) {
        idx = (idx + 1) % ORBITAL_NODES.length
        this.flyToNode(ORBITAL_NODES[idx].id, 3.0)
      }
    }, 8000)
  }

  private updateProjectedReticles() {
    if (telemetry.currentNode !== 'EARTH' || telemetry.storyActive || !telemetry.hudVisible) {
      telemetry.reticles = []
      return
    }

    const targets: { id: NodeId; name: string; alt: string; pos: THREE.Vector3 }[] = [
      {
        id: 'ENGINE_ARRAY',
        name: telemetry.lang === 'ZH' ? '一号推进阵列 (73座)' : 'ENGINE ARRAY 01',
        alt: 'ALT: 11.2 KM',
        pos: ENGINE_ARRAY_NORMAL.clone().multiplyScalar(EARTH_RADIUS)
      },
      {
        id: 'EQUATORIAL',
        name: telemetry.lang === 'ZH' ? '赤道转向带' : 'EQUATORIAL TORQUE',
        alt: 'LAT: 00°00′',
        pos: EQUATORIAL_NORMAL.clone().multiplyScalar(EARTH_RADIUS)
      },
      {
        id: 'ANCHOR',
        name: telemetry.lang === 'ZH' ? '太空电梯基座' : 'ELEVATOR ANCHOR',
        alt: 'ALT: 0.0 KM',
        pos: ELEVATOR_DIR.clone().multiplyScalar(EARTH_RADIUS)
      },
      {
        id: 'TIANZHU',
        name: telemetry.lang === 'ZH' ? '天柱号空间站' : 'TIANZHU APEX',
        alt: 'GEO: 35,786 KM',
        pos: ELEVATOR_DIR.clone().multiplyScalar(STATION_RADIUS)
      },
      {
        id: 'HABITAT',
        name: telemetry.lang === 'ZH' ? '极光殖民环' : 'HABITAT AURORA',
        alt: 'HEO: 52,400 KM',
        pos: this.habitatGroup.position.clone()
      }
    ]

    const w = this.container.clientWidth
    const h = this.container.clientHeight
    telemetry.reticles = targets.map((t) => {
      const p = t.pos.clone().project(this.camera)
      const x = (p.x * 0.5 + 0.5) * w
      const y = (-p.y * 0.5 + 0.5) * h
      const visible = p.z < 1.0 && x > 80 && x < w - 80 && y > 60 && y < h - 80
      return { id: t.id, name: t.name, alt: t.alt, x, y, visible }
    })
  }

  private animate = () => {
    this.rafId = requestAnimationFrame(this.animate)
    const now = performance.now()
    const dt = Math.min(0.1, (now - this.lastFrameTime) / 1000)
    this.lastFrameTime = now
    const elapsed = this.clock.getElapsedTime()

    stepNewtonianPhysics(dt)
    this.updateCameraTransition(now)

    const thrustNorm = telemetry.thrustPercent / 100
    const isOverclock =
      telemetry.twelveStrikeActive || telemetry.heliosOverdrive || telemetry.thrustPercent > 105 ? 1.0 : 0.0
    const speedFactor = thrustNorm * (isOverclock > 0.5 ? 1.65 : 1.0)

    this.orbitalTravelAngle += dt * 0.032 * speedFactor

    if (!this.isEclipseShotActive) {
      const sunDist = 360.0 + telemetry.sunRecessionUnits * 0.65
      const sunAzimuth = -2.25 - Math.sin(this.orbitalTravelAngle) * 0.45
      const sunElevation = 0.28 + Math.cos(this.orbitalTravelAngle * 0.7) * 0.1

      this.dyingSunGroup.position.set(
        Math.cos(sunAzimuth) * sunDist,
        sunElevation * sunDist,
        Math.sin(sunAzimuth) * sunDist
      )

      const dynamicSunLightDir = new THREE.Vector3(
        -0.48 + Math.sin(this.orbitalTravelAngle) * 0.25,
        0.28 + Math.cos(this.orbitalTravelAngle * 0.5) * 0.08,
        0.82
      ).normalize()

      this.currentSunDir.copy(dynamicSunLightDir)
      this.sunLight.position.copy(this.currentSunDir.clone().multiplyScalar(420))
      this.earthMaterial.uniforms.uSunDir.value.copy(this.currentSunDir)
      this.cloudDeckMaterial.uniforms.uSunDir.value.copy(this.currentSunDir)
      this.atmosHaloMat.uniforms.uSunDir.value.copy(this.currentSunDir)
    } else if (this.eclipseOccluderSphere) {
      this.eclipseOccluderSphere.position.lerp(new THREE.Vector3(-2.0, -1.2, 10.0), 0.025)
    }

    if (telemetry.currentNode !== 'LUNA') {
      const lunaAngle = -0.68 + Math.sin(this.orbitalTravelAngle * 0.85) * 0.42
      const lunaRadius = 295.0
      this.lunaGroup.position.set(
        Math.cos(lunaAngle) * lunaRadius,
        26.0 + Math.sin(this.orbitalTravelAngle * 0.5) * 12.0,
        Math.sin(lunaAngle) * lunaRadius
      )
    }
    this.lunaGroup.rotation.y = elapsed * 0.02

    // 所有主力发动机矩阵全天候保持可见，让你无论在太空远眺还是贴地近看都能看到壮观的冲天火焰！
    this.engineArrayGroup.visible = true
    this.steeringArrayGroup.visible = true
    this.ignitionStageGroup.visible = true

    const camDist = this.camera.position.length()
    const farBoost = THREE.MathUtils.clamp((camDist - 115.0) / 140.0, 0.0, 1.0)
    const plumeWidthScale = 1.0 + farBoost * 1.15
    const plumeHeightScale = (isOverclock > 0.5 ? 1.25 : 1.0) * (1.0 + farBoost * 0.45)
    const showCloseUpFX = camDist <= 135.0

    if (this.dominoIgnitionProgress < 1.0) {
      this.dominoIgnitionProgress = Math.min(1.0, this.dominoIgnitionProgress + 0.0028)
    }
    if (this.globalWaveProgress < 1.0) {
      this.globalWaveProgress = Math.min(1.0, this.globalWaveProgress + 0.0042)
    }

    const cloudRot = elapsed * 0.004
    this.cloudsMesh.rotation.y = cloudRot
    this.earthMaterial.uniforms.uTime.value = elapsed
    this.earthMaterial.uniforms.uCloudRotation.value = cloudRot
    this.cloudDeckMaterial.uniforms.uCloudRotation.value = cloudRot

    this.globalNeedlesMat.uniforms.uTime.value = elapsed
    this.globalNeedlesMat.uniforms.uThrust.value = thrustNorm
    this.globalNeedlesMat.uniforms.uWaveProgress.value = this.globalWaveProgress
    this.globalNeedlesMat.uniforms.uOverclock.value = isOverclock

    if (this.subMatrixBeamMat) {
      this.subMatrixBeamMat.uniforms.uTime.value = elapsed
      this.subMatrixBeamMat.uniforms.uThrust.value = thrustNorm
      this.subMatrixBeamMat.uniforms.uOverclock.value = isOverclock
      this.subMatrixBeamMat.uniforms.uIgnitionProgress.value = this.dominoIgnitionProgress
    }

    const blink = Math.sin(elapsed * 7.5) > 0.1

    const updateEngineList = (list: BrutalistEngineRig[], igProg: number, isEarthSurface = true) => {
      list.forEach((rig) => {
        rig.coreLaserMat.uniforms.uTime.value = elapsed
        rig.coreLaserMat.uniforms.uThrust.value = thrustNorm
        rig.coreLaserMat.uniforms.uOverclock.value = isOverclock
        rig.coreLaserMat.uniforms.uIgnitionProgress.value = igProg

        rig.vortexSheathMat.uniforms.uTime.value = elapsed
        rig.vortexSheathMat.uniforms.uThrust.value = thrustNorm
        rig.vortexSheathMat.uniforms.uOverclock.value = isOverclock
        rig.vortexSheathMat.uniforms.uIgnitionProgress.value = igProg

        rig.ionSparksMat.uniforms.uTime.value = elapsed
        rig.ionSparksMat.uniforms.uThrust.value = showCloseUpFX ? thrustNorm : 0.0
        rig.ionSparksMat.uniforms.uOverclock.value = isOverclock
        rig.ionSparksMat.uniforms.uIgnitionProgress.value = igProg

        if (isEarthSurface) {
          rig.plumeAssembly.scale.set(plumeWidthScale, plumeHeightScale, plumeWidthScale)
          rig.mistSprites?.forEach((sp) => (sp.visible = showCloseUpFX))
        } else {
          rig.plumeAssembly.scale.set(1.0, isOverclock > 0.5 ? 1.25 : 1.0, 1.0)
        }
        if (rig.nozzleFlare) {
          rig.nozzleFlare.visible = thrustNorm > 0.02
        }
        rig.strobes.forEach((s) => (s.visible = blink))
      })
    }
    updateEngineList(this.engineArrayRigs, this.dominoIgnitionProgress, true)
    updateEngineList(this.steeringRigs, 1.0, true)
    updateEngineList(this.ignitionStageRigs, this.dominoIgnitionProgress, true)
    updateEngineList(this.lunarRigs, 1.0, false)

    this.climberPods.forEach((pod, idx) => {
      const rawPhase = (elapsed * 0.065 + idx * 0.5) % 1.0
      const smoothS = rawPhase * rawPhase * (3.0 - 2.0 * rawPhase)
      pod.position.y = EARTH_RADIUS + 1.0 + smoothS * (STATION_RADIUS - EARTH_RADIUS - 2.2)
    })

    if (this.tianzhuAnim) {
      this.tianzhuAnim.upper.rotation.y = elapsed * 0.32
      this.tianzhuAnim.lower.rotation.y = -elapsed * 0.25
      this.tianzhuAnim.strobes.forEach((s) => (s.visible = blink))
    }

    this.habitatGroup.rotation.z = elapsed * 0.15
    this.deepSpaceLaserMat.uniforms.uTime.value = elapsed

    this.dyingSunMat.uniforms.uTime.value = elapsed
    this.prominenceShellMat.uniforms.uTime.value = elapsed
    this.coronaLayerMats.forEach((m) => (m.uniforms.uTime.value = elapsed))
    this.coronaBillboards.forEach((b) => b.lookAt(this.camera.position))

    if (telemetry.currentMode !== 'EXPLORE') {
      const bx = Math.sin(elapsed * 0.65) * 0.1
      const by = Math.cos(elapsed * 0.52) * 0.08
      const nearEngine =
        telemetry.currentNode === 'ENGINE_ARRAY' ||
        telemetry.currentNode === 'EQUATORIAL' ||
        telemetry.currentNode === 'IGNITION_NODE' ||
        isOverclock > 0.5
      const shake = nearEngine ? (isOverclock > 0.5 ? 0.12 : 0.03) : 0.0
      this.camera.position.set(
        this.baseCamPos.x + bx + (Math.random() - 0.5) * shake,
        this.baseCamPos.y + by + (Math.random() - 0.5) * shake,
        this.baseCamPos.z
      )
    } else {
      this.controls.update()
      this.baseCamPos.copy(this.camera.position)
    }

    this.bloomPass.strength = telemetry.bloomEnabled ? (isOverclock > 0.5 ? 0.76 : 0.54) : 0.0
    this.anamorphicPass.uniforms.uTime.value = elapsed
    this.anamorphicPass.uniforms.uStreakIntensity.value = telemetry.bloomEnabled
      ? isOverclock > 0.5
        ? 0.48
        : 0.28
      : 0.0
    this.anamorphicPass.uniforms.uAberration.value = isOverclock > 0.5 ? 0.0026 : 0.0011

    this.camera.lookAt(this.lookAtTarget)
    this.updateProjectedReticles()
    this.composer.render()
  }

  private setupResize() {
    window.addEventListener('resize', () => {
      const w = this.container.clientWidth
      const h = this.container.clientHeight
      this.camera.aspect = w / h
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(w, h)
      this.composer.setSize(w, h)
      this.anamorphicPass.uniforms.uResolution.value.set(w, h)
    })
  }

  public dispose() {
    cancelAnimationFrame(this.rafId)
    if (this.cinematicInterval) clearInterval(this.cinematicInterval)
    this.clearStoryTimers()
    this.renderer.dispose()
  }
}
