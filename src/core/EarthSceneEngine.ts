import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { telemetry, ORBITAL_NODES, type NodeId, type ModeId } from './PhysicsTelemetry'
import { MegaStructuresBuilder, type BrutalistEngineRig } from './MegaStructuresBuilder'
import { soundEngine } from './SoundEngine'

export const EARTH_RADIUS = 100.0
export const SUN_LIGHT_POS = new THREE.Vector3(220, 100, 200)
export const SUN_DIR_NORM = SUN_LIGHT_POS.clone().normalize()

const ENGINE_ARRAY_NORMAL = new THREE.Vector3(-0.66, 0.56, 0.50).normalize()
const EQUATORIAL_NORMAL = new THREE.Vector3(-0.68, 0.0, 0.733).normalize()
const ANCHOR_NORMAL = new THREE.Vector3(-0.52, 0.0, 0.854).normalize()

export class EarthSceneEngine {
  private container: HTMLElement
  private scene!: THREE.Scene
  private camera!: THREE.PerspectiveCamera
  private renderer!: THREE.WebGLRenderer
  private composer!: EffectComposer
  private bloomPass!: UnrealBloomPass
  private controls!: OrbitControls

  private builder!: MegaStructuresBuilder
  private earthGroup!: THREE.Group
  private earthMaterial!: THREE.ShaderMaterial
  private cloudsMesh!: THREE.Mesh
  private globalNeedlesMat!: THREE.ShaderMaterial

  // 8 大空间节点与高密矩阵引用
  private engineArrayGroup!: THREE.Group
  private engineArrayRigs: BrutalistEngineRig[] = []
  private distantMatrixBeamMat!: THREE.ShaderMaterial
  private steeringArrayGroup!: THREE.Group
  private steeringRigs: BrutalistEngineRig[] = []
  private anchorGroup!: THREE.Group
  private climberPods: THREE.Group[] = []
  private tianzhuGroup!: THREE.Group
  private tianzhuAnim!: { upper: THREE.Group; lower: THREE.Group; strobes: THREE.Mesh[] }
  private habitatGroup!: THREE.Group
  private deepSpaceGroup!: THREE.Group
  private deepSpaceLaserMat!: THREE.ShaderMaterial
  private lunaGroup!: THREE.Group
  private lunarRigs: BrutalistEngineRig[] = []

  // 狂暴红巨星太阳 (含米粒黑子、18道3D磁环日珥耀斑、放射状星芒日冕、2000颗CME抛射粒子)
  private dyingSunGroup!: THREE.Group
  private dyingSunMat!: THREE.ShaderMaterial
  private solarProminenceMat!: THREE.ShaderMaterial
  private coronaStreamersMat!: THREE.ShaderMaterial
  private cmeParticlesMat!: THREE.ShaderMaterial
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
  private baseCamPos = new THREE.Vector3(0, 24, 275)

  private clock = new THREE.Clock()
  private rafId = 0
  private cinematicInterval: number | null = null
  private storyTimers: number[] = []
  private dominoIgnitionProgress = 1.0
  private globalWaveProgress = 1.0
  private isEclipseShotActive = false

  constructor(container: HTMLElement) {
    this.container = container
    this.builder = new MegaStructuresBuilder()
    this.initRendererAndLighting()
    this.createStarfieldAndDistantSaturn()
    this.createPhotorealisticFrozenEarth()
    this.createDenseGlobalEngineMatrix()
    this.createOrbitalTrajectoryRings()
    this.createAllEightDetailedMegastructures()
    this.createBoilingSunWith3DSolarFlares()
    this.setupResize()
    this.animate()
    this.startAutoCinematicCycle()
  }

  // ============================================================================
  // 1. 渲染器与固定立体侧逆光布局 (移除相机头灯，让法线贴图与铸钢肋片呈现深邃3D立体光影！)
  // ============================================================================
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
    this.renderer.toneMappingExposure = 1.32
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.container.appendChild(this.renderer.domElement)

    this.scene.environment = MegaStructuresBuilder.createStudioSpaceHDRI(this.renderer)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.05
    this.controls.minDistance = 1.2
    this.controls.maxDistance = 1400

    // 1. 主太阳强方向光 (固定角度斜射，铸造强烈明暗交界与金属高光)
    const sunLight = new THREE.DirectionalLight(0xfff6e6, 4.2)
    sunLight.position.copy(SUN_LIGHT_POS)
    this.scene.add(sunLight)

    // 2. 地球电离层冷蓝固定侧逆轮廓光 (照射晨昏线侧的发动机矩阵与空间站，产生硬核金属勾边)
    const twilightRimLight = new THREE.DirectionalLight(0x00b4ff, 2.2)
    twilightRimLight.position.set(-240, 140, -120)
    this.scene.add(twilightRimLight)

    // 3. 地表熔岩/高炉底部暖橙反射光
    const hemiLight = new THREE.HemisphereLight(0x7dd3fc, 0x2e1d0f, 0.85)
    this.scene.add(hemiLight)

    this.composer = new EffectComposer(this.renderer)
    this.composer.addPass(new RenderPass(this.scene, this.camera))
    this.bloomPass = new UnrealBloomPass(new THREE.Vector2(w, h), 0.58, 0.45, 0.65)
    this.composer.addPass(this.bloomPass)

    this.earthGroup = new THREE.Group()
    this.scene.add(this.earthGroup)
  }

  private createStarfieldAndDistantSaturn() {
    const layers = [
      { count: 3600, size: 1.5, color: 0xe2e8f0, radius: 2200 },
      { count: 1700, size: 2.2, color: 0x93c5fd, radius: 1900 },
      { count: 950, size: 2.5, color: 0xfde68a, radius: 1750 }
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
    saturn.position.set(-580, 130, -820)
    saturn.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(26, 48, 48),
        new THREE.MeshStandardMaterial({ color: 0x9a8262, roughness: 0.85 })
      )
    )
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(34, 58, 64),
      new THREE.MeshBasicMaterial({ color: 0x94a3b8, side: THREE.DoubleSide, transparent: true, opacity: 0.42 })
    )
    ring.rotation.x = Math.PI / 2.2
    saturn.add(ring)
    this.scene.add(saturn)
  }

  // ============================================================================
  // 2. 真·分形微法线冰封地球着色器 (彻底消除“玻璃球”塑料高光，呈现崎岖冰川山脉与哑光冻土)
  // ============================================================================
  private createPhotorealisticFrozenEarth() {
    const loader = new THREE.TextureLoader()
    loader.setCrossOrigin('anonymous')

    this.earthMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uDayTex: { value: this.builder.frozenEarthDayTex },
        uNightTex: { value: this.builder.frozenEarthNightTex },
        uBumpTex: { value: this.builder.frozenEarthBumpTex },
        uSunDir: { value: SUN_DIR_NORM }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormalWorld;
        varying vec3 vViewDir;
        varying vec3 vLocalPos;
        void main() {
          vUv = uv;
          vLocalPos = position;
          vNormalWorld = normalize(mat3(modelMatrix) * normal);
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vViewDir = normalize(cameraPosition - worldPos.xyz);
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        uniform sampler2D uDayTex;
        uniform sampler2D uNightTex;
        uniform sampler2D uBumpTex;
        uniform vec3 uSunDir;
        varying vec2 vUv;
        varying vec3 vNormalWorld;
        varying vec3 vViewDir;
        varying vec3 vLocalPos;

        // 实时 3D 微地形分形函数，为冰原与山脉注入高频岩石凹凸阴影，彻底消灭玻璃球光滑感！
        float hash(vec3 p) {
          p = fract(p * 0.3183099 + 0.1);
          p *= 17.0;
          return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
        }
        float noise(vec3 x) {
          vec3 i = floor(x);
          vec3 f = fract(x);
          f = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
                mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
            mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
            f.z
          );
        }
        float fbm(vec3 p) {
          return noise(p) * 0.55 + noise(p * 2.3) * 0.3 + noise(p * 5.2) * 0.15;
        }

        void main() {
          vec3 rawDay = texture2D(uDayTex, vUv).rgb;
          vec3 nightSample = texture2D(uNightTex, vUv).rgb;
          float hMap = texture2D(uBumpTex, vUv).r;

          // 计算贴图高程梯度 + 3D 实时分形微法线扰动
          float hR = texture2D(uBumpTex, vUv + vec2(0.0012, 0.0)).r;
          float hU = texture2D(uBumpTex, vUv + vec2(0.0, 0.0012)).r;
          vec3 p3 = vLocalPos * 0.35;
          float n0 = fbm(p3);
          float nX = fbm(p3 + vec3(0.08, 0.0, 0.0));
          float nY = fbm(p3 + vec3(0.0, 0.08, 0.0));

          vec3 microPerturb = vec3((hMap - hR) * 2.2 + (n0 - nX) * 0.65, (hMap - hU) * 2.2 + (n0 - nY) * 0.65, 0.0);
          vec3 N = normalize(vNormalWorld + microPerturb);
          vec3 V = normalize(vViewDir);
          vec3 L = normalize(uSunDir);

          // 区分陆地山脉与深海冰层
          float landMask = smoothstep(0.03, 0.22, rawDay.r - rawDay.b * 0.62);
          float ridgeCrag = abs(n0 * 2.0 - 1.0);
          vec3 rockyGlacier = mix(vec3(0.28, 0.33, 0.38), vec3(0.84, 0.90, 0.96), smoothstep(0.2, 0.75, ridgeCrag + hMap * 0.3));
          vec3 continentalCol = mix(rawDay * 1.15, rockyGlacier, 0.65);

          // 冰封海洋与冰裂纹理
          float iceCrack = smoothstep(0.46, 0.52, n0);
          vec3 deepOcean = mix(vec3(0.03, 0.12, 0.26), vec3(0.18, 0.38, 0.58), iceCrack * 0.55);
          vec3 surfaceAlbedo = mix(deepOcean, continentalCol, landMask);

          // Oren-Nayar 风格粗糙漫反射 (陆地 100% 哑光零塑料感，仅无冰深海保留微弱高光)
          float NdotL = dot(N, L);
          float dayFactor = smoothstep(-0.16, 0.22, NdotL);
          float diffuse = pow(max(0.0, NdotL), 0.88);

          vec3 H = normalize(L + V);
          float oceanSpecMask = (1.0 - landMask) * (1.0 - iceCrack * 0.8);
          float spec = pow(max(0.0, dot(N, H)), 64.0) * oceanSpecMask * 0.14 * dayFactor;

          vec3 litDay = clamp(surfaceAlbedo * (0.08 + diffuse * 0.58) + vec3(spec), 0.0, 0.60);

          // 夜半球：深炭蓝冻土 + 金色地下城灯网 + 晨昏线散射
          vec3 nightBase = vec3(0.008, 0.018, 0.042) * (1.0 - dayFactor);
          vec3 nightCities = nightSample * vec3(1.2, 0.92, 0.55) * 0.9 * (1.0 - dayFactor);

          // 极薄的边缘大气散射 (仅出现在球体最外圈 8% 边缘，绝不把地球变成玻璃泡！)
          float limb = pow(1.0 - max(0.0, dot(V, vNormalWorld)), 5.5);
          vec3 atmosRim = mix(vec3(0.05, 0.42, 0.95), vec3(0.35, 0.85, 1.0), dayFactor) * limb * 0.55;

          vec3 finalCol = mix(nightBase + nightCities, litDay, dayFactor) + atmosRim;
          gl_FragColor = vec4(finalCol, 1.0);
        }
      `
    })

    loader.load(
      'https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg',
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace
        this.earthMaterial.uniforms.uDayTex.value = tex
      }
    )

    const earthMesh = new THREE.Mesh(new THREE.SphereGeometry(EARTH_RADIUS, 128, 128), this.earthMaterial)
    this.earthGroup.add(earthMesh)

    const cloudMat = new THREE.MeshStandardMaterial({
      map: this.builder.fluffyCloudsTex,
      alphaMap: this.builder.fluffyCloudsTex,
      bumpMap: this.builder.fluffyCloudsTex,
      bumpScale: 0.15,
      color: 0xf8fafc,
      roughness: 0.95,
      metalness: 0.0,
      transparent: true,
      opacity: 0.72,
      depthWrite: false
    })
    loader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png',
      (tex) => {
        cloudMat.map = tex
        cloudMat.alphaMap = tex
        cloudMat.bumpMap = tex
        cloudMat.needsUpdate = true
      }
    )
    this.cloudsMesh = new THREE.Mesh(new THREE.SphereGeometry(EARTH_RADIUS * 1.004, 96, 96), cloudMat)
    this.earthGroup.add(this.cloudsMesh)

    // 紧贴地表边缘的高锐度大气散射层 (指数提高到 4.8，只亮边缘不糊球面)
    const atmosHaloMat = new THREE.ShaderMaterial({
      uniforms: {
        uInnerColor: { value: new THREE.Color(0x0055ff) },
        uOuterColor: { value: new THREE.Color(0x55d8ff) }
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewPos;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          vViewPos = normalize(-mvPos.xyz);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        uniform vec3 uInnerColor;
        uniform vec3 uOuterColor;
        varying vec3 vNormal;
        varying vec3 vViewPos;
        void main() {
          float f = pow(clamp(0.58 - dot(vNormal, vViewPos), 0.0, 1.0), 4.5);
          vec3 col = mix(uInnerColor, uOuterColor, f);
          gl_FragColor = vec4(col, f * 0.75);
        }
      `,
      side: THREE.BackSide,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
    this.earthGroup.add(new THREE.Mesh(new THREE.SphereGeometry(EARTH_RADIUS * 1.02, 96, 96), atmosHaloMat))
  }

  // ============================================================================
  // 3. 全球 6,000 座高密度行星发动机激光矩阵 + 6,000 颗地表聚变核心亮斑
  // ============================================================================
  private createDenseGlobalEngineMatrix() {
    const totalCount = 6000
    const needleGeo = new THREE.CylinderGeometry(0.018, 0.065, 5.2, 6, 1, true)
    needleGeo.translate(0, 2.6, 0)

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

          float rootCore = exp(-vUv.y * 10.0) * 0.85;
          float laserDecay = pow(max(0.0, 1.0 - vUv.y), 1.9);
          float pulse = 0.88 + 0.12 * sin(uTime * 16.0 + vWaveOrder * 90.0);

          vec3 iceBlue = mix(vec3(0.15, 0.82, 1.0), vec3(1.3, 1.6, 2.0), rootCore);
          vec3 whiteGold = mix(vec3(1.0, 0.6, 0.15), vec3(1.6, 1.4, 1.0), rootCore);
          vec3 col = mix(iceBlue, whiteGold, uOverclock) * pulse;

          float alpha = clamp((laserDecay * 0.58 + rootCore * 0.45) * activeMask * clamp(uThrust, 0.25, 1.2), 0.0, 0.72);
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
      { latMin: 15, latMax: 72, lonMin: 8, lonMax: 152 },    // 亚欧大陆全境高密矩阵
      { latMin: 20, latMax: 68, lonMin: -135, lonMax: -58 }, // 北美大陆高密矩阵
      { latMin: 12, latMax: 55, lonMin: -15, lonMax: 52 },   // 欧洲与北非矩阵
      { latMin: 25, latMax: 62, lonMin: 65, lonMax: 135 }    // 东亚与西伯利亚超密核心区
    ]

    for (let i = 0; i < totalCount; i++) {
      let latDeg = 0
      let lonDeg = 0
      let scaleLen = 1.0

      if (i < 720) {
        // 720 座赤道连续高密转向光环
        latDeg = (Math.random() - 0.5) * 1.1
        lonDeg = (i / 720) * 360 - 180
        scaleLen = 0.85 + Math.random() * 0.4
      } else {
        const p = patches[i % patches.length]
        latDeg = p.latMin + Math.random() * (p.latMax - p.latMin)
        lonDeg = p.lonMin + Math.random() * (p.lonMax - p.lonMin)
        scaleLen = 0.75 + Math.random() * 0.75
      }

      const phi = (90 - latDeg) * (Math.PI / 180)
      const theta = (lonDeg + 180) * (Math.PI / 180)

      const x = -EARTH_RADIUS * Math.sin(phi) * Math.cos(theta)
      const y = EARTH_RADIUS * Math.cos(phi)
      const z = EARTH_RADIUS * Math.sin(phi) * Math.sin(theta)

      dummy.position.set(x, y, z)
      const norm = dummy.position.clone().normalize()
      dummy.quaternion.setFromUnitVectors(up, norm)
      dummy.scale.set(1.0, scaleLen, 1.0)
      dummy.updateMatrix()
      instMesh.setMatrixAt(i, dummy.matrix)

      sparkPos[i * 3] = x * 1.001
      sparkPos[i * 3 + 1] = y * 1.001
      sparkPos[i * 3 + 2] = z * 1.001
      waveOrders[i] = (lonDeg + 180) / 360
    }

    instMesh.geometry.setAttribute('aWaveOrder', new THREE.InstancedBufferAttribute(waveOrders, 1))
    this.earthGroup.add(instMesh)

    const sparkGeo = new THREE.BufferGeometry()
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3))
    this.earthGroup.add(
      new THREE.Points(
        sparkGeo,
        new THREE.PointsMaterial({
          color: 0xcffafe,
          size: 0.78,
          map: this.builder.softGlowSprite,
          transparent: true,
          opacity: 0.88,
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
    this.earthGroup.add(buildRing(142.0, 0, 0, 0.16))
    this.earthGroup.add(buildRing(158.0, 0.24, -0.15, 0.14))
    this.scene.add(buildRing(380.0, 0.05, 0.03, 0.12))
  }

  private getMountainElevation(lx: number, ly: number, engineSites: { f: number; r: number }[]): number {
    let minEngineDist = 999
    for (const s of engineSites) {
      const d = Math.hypot(lx - s.r, ly - s.f)
      if (d < minEngineDist) minEngineDist = d
    }

    const ridge1 = 1.0 - Math.abs(Math.sin(lx * 0.28 + ly * 0.18))
    const ridge2 = 1.0 - Math.abs(Math.cos(lx * 0.52 - ly * 0.42))
    const detail = Math.sin(lx * 1.4) * Math.cos(ly * 1.4) * 0.22
    const rawMountain = (ridge1 * 1.35 + ridge2 * 0.75 + detail) * 1.15

    const plateauMask = THREE.MathUtils.smoothstep(minEngineDist, 0.85, 2.4)
    return THREE.MathUtils.lerp(0.45, rawMountain, plateauMask)
  }

  // ============================================================================
  // 4. 构建全部 8 大巨构节点 (ENGINE ARRAY 同屏 73 座巨型发动机矩阵铺满天际线！)
  // ============================================================================
  private createAllEightDetailedMegastructures() {
    const up = new THREE.Vector3(0, 1, 0)

    // -------------------------------------------------------------------------
    // Node 2: ENGINE ARRAY 01 (9座前景超精细高炉发动机 + 64座中远景 Instanced 发动机矩阵 = 同屏 73 座！)
    // -------------------------------------------------------------------------
    this.engineArrayGroup = new THREE.Group()
    const tangentF = new THREE.Vector3().crossVectors(up, ENGINE_ARRAY_NORMAL).normalize()
    const tangentR = new THREE.Vector3().crossVectors(ENGINE_ARRAY_NORMAL, tangentF).normalize()

    const heroEngineSites = [
      { f: 0.0, r: 0.0, s: 1.48 },
      { f: 2.1, r: -2.2, s: 1.28 },
      { f: 2.5, r: 2.3, s: 1.25 },
      { f: 4.8, r: -0.5, s: 1.18 },
      { f: 5.5, r: -4.2, s: 1.12 },
      { f: 5.8, r: 3.8, s: 1.12 },
      { f: 8.2, r: -2.4, s: 1.05 },
      { f: 8.6, r: 1.8, s: 1.05 },
      { f: 11.2, r: -0.2, s: 0.98 }
    ]

    const terrainGeo = new THREE.PlaneGeometry(56, 56, 140, 140)
    const posAttr = terrainGeo.attributes.position
    const colorsAttr = new Float32Array(posAttr.count * 3)

    for (let i = 0; i < posAttr.count; i++) {
      const lx = posAttr.getX(i)
      const ly = posAttr.getY(i)
      const radialDist = Math.hypot(lx, ly)
      const edgeFade = 1.0 - THREE.MathUtils.smoothstep(radialDist, 16.0, 27.5)
      const h = this.getMountainElevation(lx, ly, heroEngineSites) * edgeFade - (1.0 - edgeFade) * 0.35

      const worldPt = ENGINE_ARRAY_NORMAL
        .clone()
        .multiplyScalar(EARTH_RADIUS)
        .addScaledVector(tangentR, lx)
        .addScaledVector(tangentF, ly)
        .normalize()
        .multiplyScalar(EARTH_RADIUS + h)
      posAttr.setXYZ(i, worldPt.x, worldPt.y, worldPt.z)

      const snowRatio = THREE.MathUtils.clamp((h - 0.25) / 1.3, 0.1, 1.0)
      colorsAttr[i * 3] = THREE.MathUtils.lerp(0.08, 0.34, snowRatio)
      colorsAttr[i * 3 + 1] = THREE.MathUtils.lerp(0.12, 0.46, snowRatio)
      colorsAttr[i * 3 + 2] = THREE.MathUtils.lerp(0.18, 0.64, snowRatio)
    }
    terrainGeo.setAttribute('color', new THREE.BufferAttribute(colorsAttr, 3))
    terrainGeo.computeVertexNormals()

    const twilightMountainMat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      normalMap: this.builder.steelNormal,
      normalScale: new THREE.Vector2(0.8, 0.8),
      roughness: 0.78,
      metalness: 0.18,
      envMapIntensity: 1.2
    })
    this.engineArrayGroup.add(new THREE.Mesh(terrainGeo, twilightMountainMat))

    // 挂载 9 座前景高精主力发动机 + 喷口蓝白点光源照亮山脉与钢铁塔身
    heroEngineSites.forEach((s, idx) => {
      const threshold = (idx / 24) * 0.65
      const rig = this.builder.buildBrutalistPlanetaryEngine(s.s, 17.0, threshold)
      const h = this.getMountainElevation(s.r, s.f, heroEngineSites)
      const ptNorm = ENGINE_ARRAY_NORMAL
        .clone()
        .multiplyScalar(EARTH_RADIUS)
        .addScaledVector(tangentR, s.r)
        .addScaledVector(tangentF, s.f)
        .normalize()
      rig.group.position.copy(ptNorm.clone().multiplyScalar(EARTH_RADIUS + h - 0.06))
      rig.group.quaternion.setFromUnitVectors(up, ptNorm)
      this.engineArrayGroup.add(rig.group)
      this.engineArrayRigs.push(rig)

      if (idx < 4) {
        const pLight = new THREE.PointLight(0x00d8ff, 3.8, 16)
        pLight.position.copy(ptNorm.clone().multiplyScalar(EARTH_RADIUS + h + 2.2))
        this.engineArrayGroup.add(pLight)
      }
    })

    // 铺设 64 座中远景 Instanced 行星发动机塔台与冲天激光束，连绵至地平线尽头！
    const distantCount = 64
    const distBaseGeo = new THREE.CylinderGeometry(0.32, 0.68, 0.65, 12)
    distBaseGeo.translate(0, 0.325, 0)
    const distBaseMat = new THREE.MeshStandardMaterial({
      color: 0x26303d,
      normalMap: this.builder.steelNormal,
      metalness: 0.86,
      roughness: 0.4,
      envMapIntensity: 1.8
    })
    const distBasesInst = new THREE.InstancedMesh(distBaseGeo, distBaseMat, distantCount)

    const distBeamGeo = new THREE.CylinderGeometry(0.14, 0.24, 15.5, 12, 1, true)
    distBeamGeo.translate(0, 7.75, 0)
    this.distantMatrixBeamMat = this.builder.createCollimatedLaserCoreShader(0.25)
    const distBeamsInst = new THREE.InstancedMesh(distBeamGeo, this.distantMatrixBeamMat, distantCount)

    const dummy = new THREE.Object3D()
    for (let i = 0; i < distantCount; i++) {
      const row = Math.floor(i / 8)
      const col = (i % 8) - 3.5
      const df = 7.5 + row * 4.2 + (Math.random() - 0.5) * 1.8
      const dr = col * 4.4 + (row % 2) * 2.1 + (Math.random() - 0.5) * 1.4
      const scale = Math.max(0.45, 0.92 - row * 0.055)

      const ptNorm = ENGINE_ARRAY_NORMAL
        .clone()
        .multiplyScalar(EARTH_RADIUS)
        .addScaledVector(tangentR, dr)
        .addScaledVector(tangentF, df)
        .normalize()

      dummy.position.copy(ptNorm.clone().multiplyScalar(EARTH_RADIUS + 0.15))
      dummy.quaternion.setFromUnitVectors(up, ptNorm)
      dummy.scale.setScalar(scale)
      dummy.updateMatrix()
      distBasesInst.setMatrixAt(i, dummy.matrix)

      dummy.position.copy(ptNorm.clone().multiplyScalar(EARTH_RADIUS + 0.15 + 0.6 * scale))
      dummy.updateMatrix()
      distBeamsInst.setMatrixAt(i, dummy.matrix)
    }
    this.engineArrayGroup.add(distBasesInst, distBeamsInst)
    this.earthGroup.add(this.engineArrayGroup)

    // -------------------------------------------------------------------------
    // Node 3: EQUATORIAL STEERING ARRAY (12座重装万向节切向转向发动机矩阵)
    // -------------------------------------------------------------------------
    this.steeringArrayGroup = new THREE.Group()
    const baseEqLon = Math.atan2(EQUATORIAL_NORMAL.x, EQUATORIAL_NORMAL.z)
    for (let i = 0; i < 12; i++) {
      const lonAngle = baseEqLon + i * 0.018
      const dir = new THREE.Vector3(Math.sin(lonAngle), (i % 2 - 0.5) * 0.008, Math.cos(lonAngle)).normalize()
      const rig = this.builder.buildGimbalSteeringEngineUnit(1.25, 17.5)
      rig.group.position.copy(dir.clone().multiplyScalar(EARTH_RADIUS + 0.02))
      rig.group.quaternion.setFromUnitVectors(up, dir)
      this.steeringArrayGroup.add(rig.group)
      this.steeringRigs.push(rig)
    }
    this.earthGroup.add(this.steeringArrayGroup)

    // -------------------------------------------------------------------------
    // Node 4 & Node 5: EQUATORIAL ANCHOR + TIANZHU APEX STATION
    // -------------------------------------------------------------------------
    const anchor = this.builder.buildEquatorialAnchorComplex(42.0)
    this.anchorGroup = anchor.group
    this.climberPods = anchor.climberPods
    this.anchorGroup.position.copy(ANCHOR_NORMAL.clone().multiplyScalar(EARTH_RADIUS))
    this.anchorGroup.quaternion.setFromUnitVectors(up, ANCHOR_NORMAL)
    // 专属工程探照点光源，突显太空电梯 A 字钢铁桁架的铸铁法线与立体阴影
    const anchorSpot = new THREE.PointLight(0x38bdf8, 4.5, 28)
    anchorSpot.position.set(2.5, 5.5, 3.5)
    this.anchorGroup.add(anchorSpot)
    this.earthGroup.add(this.anchorGroup)

    const tianzhu = this.builder.buildTianzhuApexStation()
    this.tianzhuGroup = tianzhu.group
    this.tianzhuAnim = {
      upper: tianzhu.ringUpper,
      lower: tianzhu.ringLower,
      strobes: tianzhu.strobes
    }
    this.tianzhuGroup.position.copy(ANCHOR_NORMAL.clone().multiplyScalar(142.0))
    this.tianzhuGroup.quaternion.setFromUnitVectors(up, ANCHOR_NORMAL)
    this.earthGroup.add(this.tianzhuGroup)

    // -------------------------------------------------------------------------
    // Node 6: HABITAT RING AURORA
    // -------------------------------------------------------------------------
    this.habitatGroup = this.builder.buildHabitatRingAurora()
    this.habitatGroup.position.set(-76, 42, 132)
    this.habitatGroup.lookAt(0, 0, 0)
    this.earthGroup.add(this.habitatGroup)

    // -------------------------------------------------------------------------
    // Node 7: DEEP SPACE ARRAY
    // -------------------------------------------------------------------------
    const ds = this.builder.buildDeepSpaceRelayFleet()
    this.deepSpaceGroup = ds.group
    this.deepSpaceLaserMat = ds.laserShaderMat
    this.deepSpaceGroup.position.set(-185, 65, 195)
    this.deepSpaceGroup.lookAt(-580, 130, -820)
    this.scene.add(this.deepSpaceGroup)

    // -------------------------------------------------------------------------
    // Node 8: LUNA
    // -------------------------------------------------------------------------
    const luna = this.builder.buildPhotorealisticLuna(27.0)
    this.lunaGroup = luna.group
    this.lunarRigs = luna.lunarRigs
    this.lunaGroup.position.set(240, 32, -195)
    this.scene.add(this.lunaGroup)
  }

  // ============================================================================
  // 5. 真·狂暴红巨星太阳 (顶点沸腾置换 + 太阳黑子群 + 18道3D磁力线日珥耀斑拱环 + 放射状星芒日冕 + 2000颗CME粒子)
  // ============================================================================
  private createBoilingSunWith3DSolarFlares() {
    this.dyingSunGroup = new THREE.Group()
    this.dyingSunGroup.position.copy(SUN_DIR_NORM.clone().multiplyScalar(620))

    // 1. 顶点置换沸腾光球层 + 太阳黑子群 (Sunspots) + 耀斑白炽活动区
    this.dyingSunMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        uniform float uTime;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewDir;
        varying vec3 vPos;

        float hash(vec3 p) {
          p = fract(p * 0.3183099 + 0.1);
          p *= 17.0;
          return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
        }
        float noise(vec3 x) {
          vec3 i = floor(x);
          vec3 f = fract(x);
          f = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
                mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
            mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
            f.z
          );
        }

        void main() {
          vUv = uv;
          // 顶点实时沸腾起伏置换，彻底打破光滑球体轮廓！
          float disp = noise(position * 0.09 + uTime * 0.6) * 2.2 + noise(position * 0.25 - uTime * 1.1) * 0.9;
          vec3 newPos = position + normal * disp;
          vPos = newPos;
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPos = modelViewMatrix * vec4(newPos, 1.0);
          vViewDir = normalize(-mvPos.xyz);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewDir;
        varying vec3 vPos;

        float hash(vec3 p) {
          p = fract(p * 0.3183099 + 0.1);
          p *= 17.0;
          return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
        }
        float noise(vec3 x) {
          vec3 i = floor(x);
          vec3 f = fract(x);
          f = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
                mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
            mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
            f.z
          );
        }

        void main() {
          vec3 p = vPos * 0.075 + vec3(uTime * 0.28);
          float gran1 = noise(p);
          float gran2 = noise(p * 2.6 - uTime * 0.45);
          float gran3 = noise(p * 6.5 + uTime * 0.8);
          float cells = gran1 * 0.5 + gran2 * 0.32 + gran3 * 0.18;

          // 太阳黑子暗核 (Sunspot Umbra) 与周围亮斑耀斑区 (Active Faculae/Flares)
          float sunspot = smoothstep(0.28, 0.16, gran1 * 0.7 + gran2 * 0.3);
          float activeFlare = smoothstep(0.68, 0.88, cells);
          float limb = pow(1.0 - max(0.0, dot(vNormal, vViewDir)), 1.6);

          vec3 umbraDark = vec3(0.18, 0.02, 0.0);
          vec3 crimsonPlasma = vec3(0.95, 0.18, 0.02);
          vec3 orangeConvection = vec3(1.35, 0.58, 0.08);
          vec3 blindingFlare = vec3(2.2, 1.85, 1.15);

          vec3 col = mix(crimsonPlasma, orangeConvection, smoothstep(0.32, 0.66, cells));
          col = mix(col, umbraDark, sunspot * 0.85);
          col = mix(col, blindingFlare, clamp(activeFlare + limb * 0.45, 0.0, 1.0));

          gl_FragColor = vec4(col, 1.0);
        }
      `
    })

    const sunRadius = 85.0
    const sunMesh = new THREE.Mesh(new THREE.SphereGeometry(sunRadius, 96, 96), this.dyingSunMat)
    this.dyingSunGroup.add(sunMesh)

    // 2. 18 道真实三维喷发的太阳磁力线日珥与耀斑拱环 (3D Magnetic Solar Prominence & Flare Loops!)
    this.solarProminenceMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewDir;
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          vViewDir = normalize(-mvPos.xyz);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewDir;
        void main() {
          float core = pow(abs(dot(normalize(vNormal), normalize(vViewDir))), 1.6);
          float plasmaStream = 0.5 + 0.5 * sin(vUv.x * 28.0 - uTime * 7.5) * cos(vUv.y * 12.0 + uTime * 4.0);
          vec3 col = mix(vec3(1.2, 0.25, 0.02), vec3(2.4, 1.75, 0.75), core * plasmaStream);
          gl_FragColor = vec4(col, core * (0.45 + plasmaStream * 0.55));
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    })

    for (let i = 0; i < 18; i++) {
      const loopRadius = 14 + (i % 4) * 7.5
      const tubeRadius = 1.6 + (i % 3) * 0.9
      const loopGeo = new THREE.TorusGeometry(loopRadius, tubeRadius, 16, 48, Math.PI * 1.15)
      const loopMesh = new THREE.Mesh(loopGeo, this.solarProminenceMat)

      // 沿球面边缘与各纬度分布日珥巨拱
      const phi = (i / 18) * Math.PI * 2
      const tilt = ((i % 5) - 2) * 0.38
      const dir = new THREE.Vector3(Math.cos(phi) * Math.cos(tilt), Math.sin(tilt), Math.sin(phi) * Math.cos(tilt)).normalize()
      loopMesh.position.copy(dir.clone().multiplyScalar(sunRadius - 3.0))
      loopMesh.lookAt(dir.clone().multiplyScalar(sunRadius + 50))
      loopMesh.rotateZ(i * 0.7)
      this.dyingSunGroup.add(loopMesh)
    }

    // 3. 放射状星芒日冕耀斑流 (Anisotropic Radial Coronal Streamers & Flare Rays)
    this.coronaStreamersMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec2 vUv;

        void main() {
          vec2 p = (vUv - 0.5) * 2.0;
          float r = length(p);
          if (r > 1.0 || r < 0.26) discard;

          float ang = atan(p.y, p.x);
          // 多重频率放射状日冕激波流与耀斑尖刺
          float rays1 = pow(0.5 + 0.5 * sin(ang * 14.0 + uTime * 0.8 + sin(r * 8.0 - uTime * 2.5)), 3.0);
          float rays2 = pow(0.5 + 0.5 * cos(ang * 26.0 - uTime * 1.2 + cos(r * 12.0)), 4.0);
          float radialFalloff = pow(max(0.0, 1.0 - r), 2.2) * smoothstep(0.26, 0.34, r);

          vec3 innerGold = vec3(2.0, 1.35, 0.55);
          vec3 outerCrimson = vec3(1.1, 0.25, 0.04);
          vec3 col = mix(innerGold, outerCrimson, (r - 0.28) / 0.72);

          float alpha = radialFalloff * (0.38 + rays1 * 0.45 + rays2 * 0.38);
          gl_FragColor = vec4(col, clamp(alpha, 0.0, 0.92));
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    })

    // 3 张不同倾角交错的巨型日冕耀斑星芒盘 (直径 360 单位)
    for (let c = 0; c < 3; c++) {
      const streamerPlane = new THREE.Mesh(new THREE.PlaneGeometry(360, 360), this.coronaStreamersMat)
      streamerPlane.lookAt(0, 0, 0)
      streamerPlane.rotateZ((c * Math.PI) / 3)
      streamerPlane.rotateY((c - 1) * 0.18)
      this.dyingSunGroup.add(streamerPlane)
    }

    // 4. 2,000 颗向外高速喷发的日冕物质抛射 (CME) 等离子耀斑粒子
    const cmeCount = 2000
    const cmePos = new Float32Array(cmeCount * 3)
    const cmePhase = new Float32Array(cmeCount)
    for (let i = 0; i < cmeCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const dir = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta),
        Math.cos(phi),
        Math.sin(phi) * Math.sin(theta)
      )
      cmePos[i * 3] = dir.x
      cmePos[i * 3 + 1] = dir.y
      cmePos[i * 3 + 2] = dir.z
      cmePhase[i] = Math.random()
    }
    const cmeGeo = new THREE.BufferGeometry()
    cmeGeo.setAttribute('position', new THREE.BufferAttribute(cmePos, 3))
    cmeGeo.setAttribute('aPhase', new THREE.BufferAttribute(cmePhase, 1))

    this.cmeParticlesMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSprite: { value: this.builder.softGlowSprite }
      },
      vertexShader: `
        attribute float aPhase;
        uniform float uTime;
        varying float vLife;
        void main() {
          float life = fract(aPhase + uTime * 0.22);
          vLife = life;
          vec3 p = normalize(position) * (85.0 + life * 95.0);
          vec4 mvPos = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = clamp((1.0 - life * 0.7) * (180.0 / -mvPos.z), 2.0, 14.0);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        uniform sampler2D uSprite;
        varying float vLife;
        void main() {
          vec4 tex = texture2D(uSprite, gl_PointCoord);
          vec3 col = mix(vec3(2.0, 1.6, 0.8), vec3(1.0, 0.25, 0.02), vLife);
          gl_FragColor = vec4(col, tex.a * (1.0 - vLife) * 0.85);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
    this.dyingSunGroup.add(new THREE.Points(cmeGeo, this.cmeParticlesMat))

    // 5. 纯黑日全食遮蔽天体
    this.eclipseOccluderSphere = new THREE.Mesh(
      new THREE.SphereGeometry(84.0, 64, 64),
      new THREE.MeshBasicMaterial({ color: 0x000000 })
    )
    this.eclipseOccluderSphere.position.set(-180, -35, 85)
    this.dyingSunGroup.add(this.eclipseOccluderSphere)

    this.scene.add(this.dyingSunGroup)
  }

  // ============================================================================
  // 6. 精确计算每个节点的电影级机位
  // ============================================================================
  private getNodeCameraPose(nodeId: NodeId): { pos: THREE.Vector3; look: THREE.Vector3 } {
    const up = new THREE.Vector3(0, 1, 0)

    switch (nodeId) {
      case 'EARTH':
        return {
          pos: new THREE.Vector3(0, 24, 275),
          look: new THREE.Vector3(0, 0, 0)
        }

      case 'ENGINE_ARRAY': {
        const n = ENGINE_ARRAY_NORMAL
        const f = new THREE.Vector3().crossVectors(up, n).normalize()
        const r = new THREE.Vector3().crossVectors(n, f).normalize()
        const camPos = n
          .clone()
          .multiplyScalar(EARTH_RADIUS + 0.88)
          .addScaledVector(f, -2.5)
          .addScaledVector(r, 0.92)
        const lookAt = n
          .clone()
          .multiplyScalar(EARTH_RADIUS + 5.5)
          .addScaledVector(f, 5.5)
          .addScaledVector(r, 0.1)
        return { pos: camPos, look: lookAt }
      }

      case 'EQUATORIAL': {
        const baseLon = Math.atan2(EQUATORIAL_NORMAL.x, EQUATORIAL_NORMAL.z)
        const camLon = baseLon - 0.025
        const lookLon = baseLon + 0.055
        const camPos = new THREE.Vector3(
          Math.sin(camLon) * (EARTH_RADIUS + 0.72),
          -0.42,
          Math.cos(camLon) * (EARTH_RADIUS + 0.72)
        )
        const lookAt = new THREE.Vector3(
          Math.sin(lookLon) * (EARTH_RADIUS + 4.8),
          1.2,
          Math.cos(lookLon) * (EARTH_RADIUS + 4.8)
        )
        return { pos: camPos, look: lookAt }
      }

      case 'ANCHOR': {
        const n = ANCHOR_NORMAL
        const t = new THREE.Vector3(-n.z, 0.14, n.x).normalize()
        const camPos = n
          .clone()
          .multiplyScalar(EARTH_RADIUS + 1.85)
          .addScaledVector(t, 5.2)
        const lookAt = n.clone().multiplyScalar(EARTH_RADIUS + 3.8)
        return { pos: camPos, look: lookAt }
      }

      case 'TIANZHU': {
        const n = ANCHOR_NORMAL
        const t = new THREE.Vector3(-n.z, 0.18, n.x).normalize()
        const stPos = n.clone().multiplyScalar(142.0)
        const camPos = stPos.clone().addScaledVector(n, 5.2).addScaledVector(t, 6.4)
        const lookAt = stPos.clone().addScaledVector(n, -2.5)
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

    const isZh = () => telemetry.lang === 'ZH'
    const up = new THREE.Vector3(0, 1, 0)
    const sunPos = this.dyingSunGroup.position.clone()

    // CHAPTER I: THE DYING SUN (0s - 9s)
    this.isEclipseShotActive = true
    telemetry.storyChapter = isZh() ? '第一章 // CHAPTER I' : 'CHAPTER I'
    telemetry.storyTitle = isZh() ? '垂死之日 THE DYING SUN' : 'THE DYING SUN'
    telemetry.storySubtitle = isZh()
      ? '太阳正在死去，狂暴的日珥耀斑与红巨星即将吞噬地球。'
      : 'And the Sun is dying.'
    soundEngine.speak('Chapter One: The Dying Sun.', '第一章，垂死之日。太阳正在死去。')

    this.eclipseOccluderSphere.position.set(-145, -28, 70)
    const sunCamStart = sunPos.clone().addScaledVector(SUN_DIR_NORM, -280).add(new THREE.Vector3(24, 6, -15))
    const sunCamEnd = sunPos.clone().addScaledVector(SUN_DIR_NORM, -265)

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

    // CHAPTER II: IGNITION (9s - 19s)
    this.storyTimers.push(
      window.setTimeout(() => {
        this.isEclipseShotActive = false
        this.eclipseOccluderSphere.position.set(-180, -35, 85)

        telemetry.storyChapter = isZh() ? '第二章 // CHAPTER II' : 'CHAPTER II'
        telemetry.storyTitle = isZh() ? '苍穹点火 IGNITION' : 'IGNITION'
        telemetry.storySubtitle = isZh()
          ? '73 座连绵至天际线的行星发动机矩阵同步点火，等离子激光刺穿苍穹。'
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

        const n = ENGINE_ARRAY_NORMAL
        const f = new THREE.Vector3().crossVectors(up, n).normalize()
        const r = new THREE.Vector3().crossVectors(n, f).normalize()

        const profileCamStart = n
          .clone()
          .multiplyScalar(EARTH_RADIUS + 0.92)
          .addScaledVector(f, -2.35)
          .addScaledVector(r, -0.35)
        const profileCamEnd = n
          .clone()
          .multiplyScalar(EARTH_RADIUS + 1.15)
          .addScaledVector(f, -2.85)
          .addScaledVector(r, 0.45)
        const profileLookStart = n.clone().multiplyScalar(EARTH_RADIUS + 1.8).addScaledVector(f, 2.2)
        const profileLookEnd = n.clone().multiplyScalar(EARTH_RADIUS + 4.8).addScaledVector(f, 4.5)

        this.camera.position.copy(profileCamStart)
        this.baseCamPos.copy(profileCamStart)
        this.lookAtTarget.copy(profileLookStart)

        this.camAnim.startPos.copy(profileCamStart)
        this.camAnim.endPos.copy(profileCamEnd)
        this.camAnim.startLook.copy(profileLookStart)
        this.camAnim.endLook.copy(profileLookEnd)
        this.camAnim.startTime = performance.now()
        this.camAnim.duration = 9600
        this.camAnim.useSphericalArc = false
        this.camAnim.active = true
      }, 9000)
    )

    // CHAPTER III: TURNING THE WORLD (19s - 30s)
    this.storyTimers.push(
      window.setTimeout(() => {
        telemetry.storyChapter = ''
        telemetry.storyTitle = ''
        telemetry.storySubtitle = isZh()
          ? '一万座行星发动机，按各大洲版图依次点亮。'
          : '10,000 planetary engines light up, continent by continent.'
        soundEngine.speak(
          '10,000 planetary engines light up, continent by continent.',
          '一万座行星发动机，按大陆版图依次点亮。'
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
      this.eclipseOccluderSphere.position.set(-180, -35, 85)
    }
    this.dominoIgnitionProgress = 1.0
    this.globalWaveProgress = 1.0
  }

  public setMode(mode: ModeId) {
    telemetry.currentMode = mode
    this.clearStoryTimers()

    if (mode === 'STORY_INTRO' || mode === 'IGNITION') {
      this.startThreeChapterStorySequence()
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
        id: 'TIANZHU',
        name: telemetry.lang === 'ZH' ? '天柱号空间站' : 'TIANZHU APEX',
        alt: 'GEO: 35,786 KM',
        pos: this.tianzhuGroup.position.clone()
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
    const elapsed = this.clock.getElapsedTime()

    this.updateCameraTransition(now)

    const camDist = this.camera.position.length()
    this.engineArrayGroup.visible = camDist < 138.0
    this.steeringArrayGroup.visible = camDist < 138.0

    if (this.isEclipseShotActive && this.eclipseOccluderSphere) {
      this.eclipseOccluderSphere.position.lerp(new THREE.Vector3(-4.2, -2.6, 18.0), 0.022)
    }

    if (this.dominoIgnitionProgress < 1.0) {
      this.dominoIgnitionProgress = Math.min(1.0, this.dominoIgnitionProgress + 0.0028)
    }
    if (this.globalWaveProgress < 1.0) {
      this.globalWaveProgress = Math.min(1.0, this.globalWaveProgress + 0.0042)
    }

    const thrustNorm = telemetry.thrustPercent / 100
    const isOverclock =
      telemetry.twelveStrikeActive || telemetry.heliosOverdrive || telemetry.thrustPercent > 105 ? 1.0 : 0.0

    this.globalNeedlesMat.uniforms.uTime.value = elapsed
    this.globalNeedlesMat.uniforms.uThrust.value = thrustNorm
    this.globalNeedlesMat.uniforms.uWaveProgress.value = this.globalWaveProgress
    this.globalNeedlesMat.uniforms.uOverclock.value = isOverclock

    if (this.distantMatrixBeamMat) {
      this.distantMatrixBeamMat.uniforms.uTime.value = elapsed
      this.distantMatrixBeamMat.uniforms.uThrust.value = thrustNorm
      this.distantMatrixBeamMat.uniforms.uOverclock.value = isOverclock
      this.distantMatrixBeamMat.uniforms.uIgnitionProgress.value = this.dominoIgnitionProgress
    }

    const lengthScale = isOverclock > 0.5 ? 1.25 : 1.0
    const blink = Math.sin(elapsed * 7.5) > 0.1

    const updateEngineList = (list: BrutalistEngineRig[], igProg: number) => {
      list.forEach((rig) => {
        rig.coreLaserMat.uniforms.uTime.value = elapsed
        rig.coreLaserMat.uniforms.uThrust.value = thrustNorm
        rig.coreLaserMat.uniforms.uOverclock.value = isOverclock
        rig.coreLaserMat.uniforms.uIgnitionProgress.value = igProg

        rig.vortexSheathMat.uniforms.uTime.value = elapsed
        rig.vortexSheathMat.uniforms.uThrust.value = thrustNorm
        rig.vortexSheathMat.uniforms.uOverclock.value = isOverclock
        rig.vortexSheathMat.uniforms.uIgnitionProgress.value = igProg

        rig.shockRingMat.uniforms.uTime.value = elapsed
        rig.shockRingMat.uniforms.uOverclock.value = isOverclock
        rig.shockRingMat.uniforms.uIgnitionProgress.value = igProg

        rig.ionSparksMat.uniforms.uTime.value = elapsed
        rig.ionSparksMat.uniforms.uThrust.value = thrustNorm
        rig.ionSparksMat.uniforms.uOverclock.value = isOverclock
        rig.ionSparksMat.uniforms.uIgnitionProgress.value = igProg

        rig.plumeAssembly.scale.set(1.0, lengthScale, 1.0)
        rig.strobes.forEach((s) => (s.visible = blink))
      })
    }
    updateEngineList(this.engineArrayRigs, this.dominoIgnitionProgress)
    updateEngineList(this.steeringRigs, 1.0)
    updateEngineList(this.lunarRigs, 1.0)

    this.climberPods.forEach((pod, idx) => {
      pod.position.y = 1.6 + ((elapsed * 0.14 + idx * 0.48) % 1.0) * 8.5
    })
    if (this.tianzhuAnim) {
      this.tianzhuAnim.upper.rotation.y = elapsed * 0.32
      this.tianzhuAnim.lower.rotation.y = -elapsed * 0.25
      this.tianzhuAnim.strobes.forEach((s) => (s.visible = blink))
    }

    this.habitatGroup.rotation.z = elapsed * 0.15
    this.cloudsMesh.rotation.y = elapsed * 0.004
    this.deepSpaceLaserMat.uniforms.uTime.value = elapsed

    // 更新太阳沸腾光球、3D 日珥磁环、放射状耀斑冕流与 CME 抛射粒子
    this.dyingSunMat.uniforms.uTime.value = elapsed
    this.solarProminenceMat.uniforms.uTime.value = elapsed
    this.coronaStreamersMat.uniforms.uTime.value = elapsed
    this.cmeParticlesMat.uniforms.uTime.value = elapsed

    if (telemetry.currentMode !== 'EXPLORE') {
      const bx = Math.sin(elapsed * 0.65) * 0.08
      const by = Math.cos(elapsed * 0.52) * 0.06
      const nearEngine =
        telemetry.currentNode === 'ENGINE_ARRAY' ||
        telemetry.currentNode === 'EQUATORIAL' ||
        isOverclock > 0.5
      const shake = nearEngine ? (isOverclock > 0.5 ? 0.12 : 0.035) : 0.0
      this.camera.position.set(
        this.baseCamPos.x + bx + (Math.random() - 0.5) * shake,
        this.baseCamPos.y + by + (Math.random() - 0.5) * shake,
        this.baseCamPos.z
      )
    } else {
      this.controls.update()
      this.baseCamPos.copy(this.camera.position)
    }

    this.bloomPass.strength = telemetry.bloomEnabled ? (isOverclock > 0.5 ? 0.80 : 0.58) : 0.0

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
    })
  }

  public dispose() {
    cancelAnimationFrame(this.rafId)
    if (this.cinematicInterval) clearInterval(this.cinematicInterval)
    this.clearStoryTimers()
    this.renderer.dispose()
  }
}
