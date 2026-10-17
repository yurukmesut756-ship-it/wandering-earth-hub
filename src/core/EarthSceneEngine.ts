import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { telemetry, ORBITAL_NODES, type NodeId, type ModeId } from './PhysicsTelemetry'
import { MegaStructuresBuilder, type BrutalistEngineRig } from './MegaStructuresBuilder'
import { soundEngine } from './SoundEngine'

export const EARTH_RADIUS = 100.0
// 太阳主光源方向 (220, 100, 200)，确保 Z > 0，照亮地球正面 70% 区域！
export const SUN_LIGHT_POS = new THREE.Vector3(220, 100, 200)
export const SUN_DIR_NORM = SUN_LIGHT_POS.clone().normalize()

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

  // 8 大空间节点与动画绑定
  private engineArrayGroup!: THREE.Group
  private engineArrayRigs: BrutalistEngineRig[] = []
  private steeringArrayGroup!: THREE.Group
  private steeringRigs: BrutalistEngineRig[] = []
  private anchorGroup!: THREE.Group
  private climberTrains: THREE.Group[] = []
  private tianzhuGroup!: THREE.Group
  private tianzhuAnim!: { upper: THREE.Group; lower: THREE.Group; strobes: THREE.Mesh[] }
  private habitatGroup!: THREE.Group
  private deepSpaceGroup!: THREE.Group
  private deepSpaceLaserMat!: THREE.ShaderMaterial
  private lunaGroup!: THREE.Group
  private lunarRigs: BrutalistEngineRig[] = []
  private dyingSunGroup!: THREE.Group
  private dyingSunMat!: THREE.ShaderMaterial
  private coronaMat!: THREE.ShaderMaterial

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

  constructor(container: HTMLElement) {
    this.container = container
    this.builder = new MegaStructuresBuilder()
    this.initRendererAndLighting()
    this.createStarfieldAndDistantSaturn()
    this.createPhotorealisticFrozenEarth()
    this.createRazorThinGlobalLightNeedles()
    this.createOrbitalTrajectoryRings()
    this.createAllEightDetailedMegastructures()
    this.createBoilingRedGiantSun()
    this.setupResize()
    this.animate()
    this.startAutoCinematicCycle()
  }

  // ============================================================================
  // 1. 渲染器、PMREMGenerator 环境反射、正面 70% 太阳主光与随动相机补光组
  // ============================================================================
  private initRendererAndLighting() {
    this.scene = new THREE.Scene()

    const w = this.container.clientWidth
    const h = this.container.clientHeight
    this.camera = new THREE.PerspectiveCamera(40, w / h, 0.2, 6000)
    this.camera.position.copy(this.baseCamPos)

    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })
    this.renderer.setSize(w, h)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    // 严格对齐参数自检表：toneMappingExposure = 1.35
    this.renderer.toneMappingExposure = 1.35
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.container.appendChild(this.renderer.domElement)

    // 立即生成并挂载 PMREMGenerator HDR 环境反射贴图，解决空间站金属死黑！
    this.scene.environment = MegaStructuresBuilder.createStudioSpaceHDRI(this.renderer)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.05
    this.controls.minDistance = 1.5
    this.controls.maxDistance = 1400

    // 1. 主太阳方向光：设在 (220, 100, 200) (Z > 0)，照亮正面 70% 地球与所有近景空间站
    const sunLight = new THREE.DirectionalLight(0xfff8ed, 4.2)
    sunLight.position.copy(SUN_LIGHT_POS)
    this.scene.add(sunLight)

    // 2. 大气环境天光
    const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x1e3a8a, 1.1)
    this.scene.add(hemiLight)

    // 3. 相机随动补光与轮廓光组 (Camera-Relative Rim/Fill Light Rig)，保证任何特写绝无死黑阴影
    const camFillLight = new THREE.DirectionalLight(0x3888ff, 1.4)
    camFillLight.position.set(-25, 15, 30)
    const camRimLight = new THREE.DirectionalLight(0xffeedd, 1.2)
    camRimLight.position.set(30, 25, -15)
    this.camera.add(camFillLight)
    this.camera.add(camRimLight)
    this.scene.add(this.camera)

    // 4. 严格钳制 UnrealBloomPass：threshold: 0.65, strength: 0.55 (超载上限 0.80), radius: 0.45
    this.composer = new EffectComposer(this.renderer)
    this.composer.addPass(new RenderPass(this.scene, this.camera))
    this.bloomPass = new UnrealBloomPass(new THREE.Vector2(w, h), 0.55, 0.45, 0.65)
    this.composer.addPass(this.bloomPass)

    this.earthGroup = new THREE.Group()
    this.scene.add(this.earthGroup)
  }

  private createStarfieldAndDistantSaturn() {
    const layers = [
      { count: 3500, size: 1.5, color: 0xe2e8f0, radius: 2200 },
      { count: 1600, size: 2.2, color: 0x93c5fd, radius: 1900 },
      { count: 900, size: 2.5, color: 0xfde68a, radius: 1750 }
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

    // 远景带环巨行星
    const saturn = new THREE.Group()
    saturn.position.set(-580, 130, -820)
    saturn.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(26, 48, 48),
        new THREE.MeshStandardMaterial({ color: 0xd4b483, roughness: 0.75 })
      )
    )
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(34, 58, 64),
      new THREE.MeshBasicMaterial({ color: 0xcbd5e1, side: THREE.DoubleSide, transparent: true, opacity: 0.48 })
    )
    ring.rotation.x = Math.PI / 2.2
    saturn.add(ring)
    this.scene.add(saturn)
  }

  // ============================================================================
  // 2. 高反照率冰封地球着色器 (正面 70% 白昼冰封大陆与蔚蓝海洋 + 左下 30% 暗夜金光城市群 + 纯白立体云层)
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
        void main() {
          vUv = uv;
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

        void main() {
          // 利用高程图计算山脉微法线起伏
          float hC = texture2D(uBumpTex, vUv).r;
          float hR = texture2D(uBumpTex, vUv + vec2(0.001, 0.0)).r;
          float hU = texture2D(uBumpTex, vUv + vec2(0.0, 0.001)).r;
          vec3 bumpOffset = vec3(hC - hR, hC - hU, 0.0) * 1.4;

          vec3 N = normalize(vNormalWorld + bumpOffset);
          vec3 V = normalize(vViewDir);
          vec3 L = normalize(uSunDir);

          vec3 rawDay = texture2D(uDayTex, vUv).rgb;
          vec3 nightSample = texture2D(uNightTex, vUv).rgb;

          // 将真实陆地贴图与高反照率冰川白/冰晶蓝融合，还原冰封流浪地球质感
          float landMask = smoothstep(0.05, 0.25, rawDay.r - rawDay.b * 0.65);
          vec3 glacialLand = mix(rawDay * 1.25, vec3(0.82, 0.91, 0.98), 0.55);
          vec3 sapphireOcean = mix(rawDay, vec3(0.05, 0.24, 0.52), 0.45);
          vec3 frozenAlbedo = mix(sapphireOcean, glacialLand, landMask);

          float NdotL = dot(N, L);
          float dayFactor = smoothstep(-0.18, 0.22, NdotL);
          float diffuse = max(0.0, NdotL);

          // 海洋与冰面太阳镜面高光
          vec3 H = normalize(L + V);
          float spec = pow(max(0.0, dot(N, H)), 32.0) * (1.0 - landMask * 0.5) * 0.25 * dayFactor;

          // 白昼面明亮通透，且控制在 Bloom 阈值 (0.65) 以内绝不糊成白球
          vec3 litDay = clamp(frozenAlbedo * (0.14 + diffuse * 0.58) + vec3(spec), 0.0, 0.62);

          // 左下 30% 夜半球：深蓝冰壳基底 + 璀璨金色地下城灯网
          vec3 nightBase = vec3(0.02, 0.05, 0.11) * (1.0 - dayFactor);
          vec3 nightLights = nightSample * vec3(1.15, 0.92, 0.6) * 0.85 * (1.0 - dayFactor);

          // 瑞利/米氏双层内缘大气散射
          float fresnel = pow(1.0 - max(0.0, dot(V, N)), 3.2);
          vec3 rimGlow = mix(vec3(0.1, 0.55, 1.0), vec3(0.4, 0.88, 1.0), dayFactor) * fresnel * 0.48;

          vec3 finalCol = mix(nightBase + nightLights, litDay, dayFactor) + rimGlow;
          gl_FragColor = vec4(finalCol, 1.0);
        }
      `
    })

    // 异步叠加 NASA Blue Marble 细节纹理
    loader.load(
      'https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg',
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace
        this.earthMaterial.uniforms.uDayTex.value = tex
      }
    )

    const earthMesh = new THREE.Mesh(new THREE.SphereGeometry(EARTH_RADIUS, 128, 128), this.earthMaterial)
    this.earthGroup.add(earthMesh)

    // 纯白蓬松立体大气云层 (opacity: 0.82)
    const cloudMat = new THREE.MeshStandardMaterial({
      map: this.builder.fluffyCloudsTex,
      alphaMap: this.builder.fluffyCloudsTex,
      color: 0xffffff,
      roughness: 0.9,
      metalness: 0.0,
      transparent: true,
      opacity: 0.82,
      depthWrite: false
    })
    loader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png',
      (tex) => {
        cloudMat.map = tex
        cloudMat.alphaMap = tex
        cloudMat.needsUpdate = true
      }
    )
    this.cloudsMesh = new THREE.Mesh(new THREE.SphereGeometry(EARTH_RADIUS * 1.005, 96, 96), cloudMat)
    this.earthGroup.add(this.cloudsMesh)

    // 双层瑞利散射大气外光晕 (#1a8cff -> #66e0ff)
    const atmosHaloMat = new THREE.ShaderMaterial({
      uniforms: {
        uInnerColor: { value: new THREE.Color(0x1a8cff) },
        uOuterColor: { value: new THREE.Color(0x66e0ff) }
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
          float f = pow(clamp(0.66 - dot(vNormal, vViewPos), 0.0, 1.0), 3.2);
          vec3 col = mix(uInnerColor, uOuterColor, f);
          gl_FragColor = vec4(col, f * 0.78);
        }
      `,
      side: THREE.BackSide,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
    this.earthGroup.add(new THREE.Mesh(new THREE.SphereGeometry(EARTH_RADIUS * 1.026, 96, 96), atmosHaloMat))
  }

  // ============================================================================
  // 3. 彻底消灭“橙色大蝌蚪”：2,000 束大陆微米级冰蓝光针 + 360 束赤道转向光针 (半径 0.02~0.06, 透明度 0.6)
  // ============================================================================
  private createRazorThinGlobalLightNeedles() {
    const totalCount = 2360
    // 严格遵守自检表：radiusTop = 0.02, radiusBottom = 0.06, height = 4.2
    const needleGeo = new THREE.CylinderGeometry(0.02, 0.06, 4.2, 6, 1, true)
    needleGeo.translate(0, 2.1, 0)

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
          float activeMask = smoothstep(vWaveOrder - 0.08, vWaveOrder + 0.02, uWaveProgress);
          if (activeMask <= 0.01 || uThrust <= 0.01) discard;

          // 根部星点闪烁 + 向上平滑渐隐至 0.0
          float rootSpark = exp(-vUv.y * 12.0) * 0.65;
          float hairFade = pow(max(0.0, 1.0 - vUv.y), 2.2);

          vec3 iceBlue = mix(vec3(0.4, 0.88, 1.0), vec3(1.0, 1.0, 1.0), rootSpark);
          vec3 whiteGold = mix(vec3(1.0, 0.65, 0.2), vec3(1.0, 0.95, 0.85), rootSpark);
          vec3 col = mix(iceBlue, whiteGold, uOverclock);

          // 严格限制最高透明度 <= 0.60，呈现纤细半透明冰蓝光丝
          float alpha = clamp((hairFade * 0.52 + rootSpark * 0.35) * activeMask * clamp(uThrust, 0.2, 1.15), 0.0, 0.60);
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

    // 地表星点微光粒子 (Pinpoint Star-Like Surface Sparks)
    const sparkPos = new Float32Array(totalCount * 3)

    const patches = [
      { latMin: 16, latMax: 68, lonMin: 10, lonMax: 145 },   // 亚欧板块
      { latMin: 22, latMax: 64, lonMin: -130, lonMax: -62 }, // 北美板块
      { latMin: 14, latMax: 52, lonMin: -12, lonMax: 48 }    // 欧洲板块
    ]

    for (let i = 0; i < totalCount; i++) {
      let latDeg = 0
      let lonDeg = 0
      let scaleLen = 1.0

      if (i < 360) {
        // 360 座赤道转向发动机光针
        latDeg = (Math.random() - 0.5) * 0.8
        lonDeg = (i / 360) * 360 - 180
        scaleLen = 0.75 + Math.random() * 0.35
      } else {
        const p = patches[i % patches.length]
        latDeg = p.latMin + Math.random() * (p.latMax - p.latMin)
        lonDeg = p.lonMin + Math.random() * (p.lonMax - p.lonMin)
        scaleLen = 0.8 + Math.random() * 0.55
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
          color: 0xa5f3fc,
          size: 0.65,
          map: this.builder.softGlowSprite,
          transparent: true,
          opacity: 0.78,
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
    this.earthGroup.add(buildRing(142.0, 0, 0, 0.18))
    this.earthGroup.add(buildRing(158.0, 0.24, -0.15, 0.15))
    this.scene.add(buildRing(380.0, 0.05, 0.03, 0.14))
  }

  // ============================================================================
  // 4. 构建全部 8 大高精度 CAD 空间巨构节点（含喜马拉雅雪山地形与冰雾）
  // ============================================================================
  private getMountainElevation(lx: number, ly: number, engineSites: { f: number; r: number }[]): number {
    let minEngineDist = 999
    for (const s of engineSites) {
      const d = Math.hypot(lx - s.r, ly - s.f)
      if (d < minEngineDist) minEngineDist = d
    }

    // 4 阶高精度多倍频山脊分形噪声 (Ridged Multifractal Himalayan Noise)
    const o1 = 1.0 - Math.abs(Math.sin(lx * 0.18 + ly * 0.12))
    const o2 = 1.0 - Math.abs(Math.cos(lx * 0.38 - ly * 0.32 + 0.5))
    const o3 = 1.0 - Math.abs(Math.sin(lx * 0.82 + ly * 0.74 - 1.2))
    const o4 = Math.sin(lx * 1.7) * Math.cos(ly * 1.7) * 0.18
    const rawMountain = (Math.pow(o1, 2.2) * 1.6 + Math.pow(o2, 1.8) * 0.9 + o3 * 0.45 + o4) * 1.15

    // 发动机地基平滑下压与基座岩石台地
    const plateauMask = THREE.MathUtils.smoothstep(minEngineDist, 0.9, 2.5)
    return THREE.MathUtils.lerp(0.58, rawMountain, plateauMask)
  }

  private createAllEightDetailedMegastructures() {
    const up = new THREE.Vector3(0, 1, 0)

    // -------------------------------------------------------------------------
    // Node 2: ENGINE ARRAY 01 (晨昏线阳光斜射下的喜马拉雅雪山地形 + 18 座野兽派 7 联装聚变发动机 + 冰雾)
    // -------------------------------------------------------------------------
    this.engineArrayGroup = new THREE.Group()
    // 放在向阳晨昏线附近 (0.22, 0.66, 0.72)，使太阳光斜射照亮雪山棱线与发动机 32 肋片！
    const arrayNormal = new THREE.Vector3(0.22, 0.66, 0.72).normalize()
    const tangentF = new THREE.Vector3().crossVectors(up, arrayNormal).normalize()
    const tangentR = new THREE.Vector3().crossVectors(arrayNormal, tangentF).normalize()

    const engineSites = [
      { f: -5.5, r: -0.8, s: 1.35 },
      { f: -4.2, r: 1.8, s: 1.25 },
      { f: -2.8, r: -2.6, s: 1.2 },
      { f: -1.5, r: 0.3, s: 1.3 },
      { f: -0.2, r: 3.1, s: 1.15 },
      { f: 1.2, r: -1.8, s: 1.18 },
      { f: 2.5, r: 1.4, s: 1.15 },
      { f: 3.8, r: -3.5, s: 1.05 },
      { f: 4.8, r: -0.4, s: 1.12 },
      { f: 6.2, r: 2.8, s: 1.05 },
      { f: 7.6, r: -2.2, s: 1.0 },
      { f: 9.0, r: 0.9, s: 1.02 },
      { f: 10.6, r: 3.6, s: 0.95 },
      { f: 12.2, r: -1.4, s: 0.95 },
      { f: 13.8, r: 1.8, s: 0.92 },
      { f: 15.5, r: -2.9, s: 0.88 },
      { f: 17.2, r: 0.4, s: 0.9 },
      { f: 19.0, r: 2.6, s: 0.85 }
    ]

    // 构建贴合地球精确曲率 (EARTH_RADIUS = 100) 的极坐标同心圆弧球面扇区 (彻底消除 4 角悬空方形补丁！)
    const numRings = 72
    const numRadials = 96
    const maxRadius = 25.0
    const vertexCount = 1 + numRings * numRadials
    const positions = new Float32Array(vertexCount * 3)
    const colors = new Float32Array(vertexCount * 3)
    const indices: number[] = []

    // 顶点 0：中心点 (lx = 0, ly = 0)
    const centerElev = this.getMountainElevation(0, 0, engineSites)
    const centerWorld = arrayNormal.clone().multiplyScalar(EARTH_RADIUS + centerElev)
    positions[0] = centerWorld.x
    positions[1] = centerWorld.y
    positions[2] = centerWorld.z
    const centerSnow = THREE.MathUtils.clamp((centerElev - 0.4) / 1.5, 0.0, 1.0)
    colors[0] = THREE.MathUtils.lerp(0.18, 0.94, Math.pow(centerSnow, 1.4))
    colors[1] = THREE.MathUtils.lerp(0.24, 0.97, Math.pow(centerSnow, 1.4))
    colors[2] = THREE.MathUtils.lerp(0.32, 1.0, Math.pow(centerSnow, 1.4))

    // 同心圆环顶点
    for (let r = 1; r <= numRings; r++) {
      const normR = r / numRings
      const radius = normR * maxRadius
      // 边缘平滑衰减到 0，边缘环微下潜 -0.04，确保与地球大球体 100% 无缝咬合
      const edgeFade = 1.0 - THREE.MathUtils.smoothstep(normR, 0.58, 1.0)
      const dip = normR > 0.98 ? -0.04 : 0.0

      for (let k = 0; k < numRadials; k++) {
        const theta = (k / numRadials) * Math.PI * 2
        const lx = radius * Math.cos(theta)
        const ly = radius * Math.sin(theta)

        const rawElev = this.getMountainElevation(lx, ly, engineSites)
        const h = rawElev * edgeFade + dip

        const ptNorm = arrayNormal
          .clone()
          .multiplyScalar(EARTH_RADIUS)
          .addScaledVector(tangentR, lx)
          .addScaledVector(tangentF, ly)
          .normalize()
        const worldPt = ptNorm.multiplyScalar(EARTH_RADIUS + h)

        const vIdx = 1 + (r - 1) * numRadials + k
        positions[vIdx * 3] = worldPt.x
        positions[vIdx * 3 + 1] = worldPt.y
        positions[vIdx * 3 + 2] = worldPt.z

        const snowRatio = THREE.MathUtils.clamp((h - 0.35) / 1.5, 0.0, 1.0)
        colors[vIdx * 3] = THREE.MathUtils.lerp(0.18, 0.94, Math.pow(snowRatio, 1.4))
        colors[vIdx * 3 + 1] = THREE.MathUtils.lerp(0.24, 0.97, Math.pow(snowRatio, 1.4))
        colors[vIdx * 3 + 2] = THREE.MathUtils.lerp(0.32, 1.0, Math.pow(snowRatio, 1.4))
      }
    }

    // 索引三角面装配
    // 第 1 环与中心点连接
    for (let k = 0; k < numRadials; k++) {
      const nextK = (k + 1) % numRadials
      indices.push(0, 1 + k, 1 + nextK)
    }
    // 相邻环之间生成四边形三角对
    for (let r = 1; r < numRings; r++) {
      const ringStart = 1 + (r - 1) * numRadials
      const nextRingStart = 1 + r * numRadials
      for (let k = 0; k < numRadials; k++) {
        const nextK = (k + 1) % numRadials
        const a = ringStart + k
        const b = ringStart + nextK
        const c = nextRingStart + k
        const d = nextRingStart + nextK

        indices.push(a, c, b)
        indices.push(b, c, d)
      }
    }

    const terrainGeo = new THREE.BufferGeometry()
    terrainGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    terrainGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    terrainGeo.setIndex(indices)
    terrainGeo.computeVertexNormals()

    const snowMountainMat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      bumpMap: this.builder.pbrMaps.bumpMap,
      bumpScale: 0.12,
      roughness: 0.68,
      metalness: 0.15,
      envMapIntensity: 1.6
    })
    this.engineArrayGroup.add(new THREE.Mesh(terrainGeo, snowMountainMat))

    // 将 18 座 32 肋片野兽派行星发动机锚定在山脉台地上
    engineSites.forEach((s, idx) => {
      const threshold = (idx / engineSites.length) * 0.82
      const rig = this.builder.buildBrutalistPlanetaryEngine(s.s, 14.5, threshold)
      const h = this.getMountainElevation(s.r, s.f, engineSites)
      const ptNorm = arrayNormal
        .clone()
        .multiplyScalar(EARTH_RADIUS)
        .addScaledVector(tangentR, s.r)
        .addScaledVector(tangentF, s.f)
        .normalize()
      rig.group.position.copy(ptNorm.clone().multiplyScalar(EARTH_RADIUS + h - 0.08))
      rig.group.quaternion.setFromUnitVectors(up, ptNorm)
      this.engineArrayGroup.add(rig.group)
      this.engineArrayRigs.push(rig)
    })

    // 照亮雪山山脊的蓝白等离子点光源 + 谷底体积冰雾面板 (Volumetric Ice-Fog Billboards)
    const valleyLightPos = arrayNormal.clone().multiplyScalar(EARTH_RADIUS + 4.5)
    const valleyLight = new THREE.PointLight(0x66e0ff, 3.2, 35)
    valleyLight.position.copy(valleyLightPos)
    this.engineArrayGroup.add(valleyLight)

    const mistMat = new THREE.SpriteMaterial({
      map: this.builder.mistSpriteTex,
      color: 0xcbe8ff,
      transparent: true,
      opacity: 0.24,
      depthWrite: false
    })
    for (let m = 0; m < 28; m++) {
      const sprite = new THREE.Sprite(mistMat)
      const mf = -6 + Math.random() * 22
      const mr = (Math.random() - 0.5) * 10
      const mNorm = arrayNormal
        .clone()
        .multiplyScalar(EARTH_RADIUS)
        .addScaledVector(tangentF, mf)
        .addScaledVector(tangentR, mr)
        .normalize()
      sprite.position.copy(mNorm.multiplyScalar(EARTH_RADIUS + 0.85))
      sprite.scale.set(5.5, 2.2, 1)
      this.engineArrayGroup.add(sprite)
    }

    this.earthGroup.add(this.engineArrayGroup)

    // -------------------------------------------------------------------------
    // Node 3: EQUATORIAL STEERING ARRAY (赤道装甲峡谷壕沟 + 万向节切向转向发动机阵列)
    // -------------------------------------------------------------------------
    this.steeringArrayGroup = new THREE.Group()
    for (let i = 0; i < 14; i++) {
      const lonAngle = 0.18 + i * 0.018
      const dir = new THREE.Vector3(Math.sin(lonAngle), 0, Math.cos(lonAngle)).normalize()
      const rig = this.builder.buildGimbalSteeringEngineUnit(1.15, 16.0)
      rig.group.position.copy(dir.clone().multiplyScalar(EARTH_RADIUS + 0.05))
      rig.group.quaternion.setFromUnitVectors(up, dir)
      this.steeringArrayGroup.add(rig.group)
      this.steeringRigs.push(rig)
    }
    this.earthGroup.add(this.steeringArrayGroup)

    // -------------------------------------------------------------------------
    // Node 4 & Node 5: EQUATORIAL ANCHOR + TIANZHU APEX STATION (置于向阳面赤道)
    // -------------------------------------------------------------------------
    const elevatorNormal = new THREE.Vector3(0.58, 0.0, 0.814).normalize()
    const anchor = this.builder.buildEquatorialAnchorComplex(42.0)
    this.anchorGroup = anchor.group
    this.climberTrains = anchor.climberTrains
    this.anchorGroup.position.copy(elevatorNormal.clone().multiplyScalar(EARTH_RADIUS))
    this.anchorGroup.quaternion.setFromUnitVectors(up, elevatorNormal)
    this.earthGroup.add(this.anchorGroup)

    const tianzhu = this.builder.buildTianzhuApexStation()
    this.tianzhuGroup = tianzhu.group
    this.tianzhuAnim = {
      upper: tianzhu.ringUpper,
      lower: tianzhu.ringLower,
      strobes: tianzhu.strobes
    }
    this.tianzhuGroup.position.copy(elevatorNormal.clone().multiplyScalar(142.0))
    this.tianzhuGroup.quaternion.setFromUnitVectors(up, elevatorNormal)
    this.earthGroup.add(this.tianzhuGroup)

    // -------------------------------------------------------------------------
    // Node 6: HABITAT RING AURORA (高轨向阳侧，背景为明亮的蔚蓝地球弧面)
    // -------------------------------------------------------------------------
    this.habitatGroup = this.builder.buildHabitatRingAurora()
    this.habitatGroup.position.set(-68, 45, 135)
    this.habitatGroup.lookAt(0, 0, 0)
    this.earthGroup.add(this.habitatGroup)

    // -------------------------------------------------------------------------
    // Node 7: DEEP SPACE ARRAY (5艘 JWST 18镜片镀金折反射激光中继探测器)
    // -------------------------------------------------------------------------
    const ds = this.builder.buildDeepSpaceRelayFleet()
    this.deepSpaceGroup = ds.group
    this.deepSpaceLaserMat = ds.laserShaderMat
    this.deepSpaceGroup.position.set(-185, 65, 195)
    this.deepSpaceGroup.lookAt(-580, 130, -820)
    this.scene.add(this.deepSpaceGroup)

    // -------------------------------------------------------------------------
    // Node 8: LUNA (高对比度陨石坑月球 + 3座静海核聚变放逐发动机)
    // -------------------------------------------------------------------------
    const luna = this.builder.buildPhotorealisticLuna(27.0)
    this.lunaGroup = luna.group
    this.lunarRigs = luna.lunarRigs
    this.lunaGroup.position.set(240, 32, -195)
    this.scene.add(this.lunaGroup)
  }

  // ============================================================================
  // 5. 沸腾的 3D Simplex 湍流红巨星太阳 (位于 SUN_LIGHT_POS 同轴深空，供第一章日全食实拍运镜)
  // ============================================================================
  private createBoilingRedGiantSun() {
    this.dyingSunGroup = new THREE.Group()
    // 放置在 SUN_DIR_NORM * 620 处，与主太阳光严格同轴！
    this.dyingSunGroup.position.copy(SUN_DIR_NORM.clone().multiplyScalar(620))

    this.dyingSunMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewDir;
        varying vec3 vPos;
        void main() {
          vUv = uv;
          vPos = position;
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
            mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
                mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
            mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
            f.z
          );
        }

        void main() {
          vec3 p = vPos * 0.08 + vec3(uTime * 0.25);
          float n = noise(p) * 0.6 + noise(p * 2.4 - uTime * 0.4) * 0.3 + noise(p * 5.0) * 0.1;
          float limb = pow(1.0 - max(0.0, dot(vNormal, vViewDir)), 1.8);

          vec3 crimson = vec3(0.82, 0.14, 0.02);
          vec3 orangeGranule = vec3(1.15, 0.48, 0.08);
          vec3 goldFlare = vec3(1.45, 1.15, 0.55);

          vec3 col = mix(crimson, orangeGranule, smoothstep(0.25, 0.65, n));
          col = mix(col, goldFlare, smoothstep(0.62, 0.88, n + limb * 0.35));
          gl_FragColor = vec4(col, 1.0);
        }
      `
    })

    const sunMesh = new THREE.Mesh(new THREE.SphereGeometry(95, 64, 64), this.dyingSunMat)
    this.dyingSunGroup.add(sunMesh)

    // 体积日冕射线光环 (在日全食时从地球暗部边缘溢出的钻石环日冕)
    this.coronaMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewDir;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          vViewDir = normalize(-mvPos.xyz);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec3 vNormal;
        varying vec3 vViewDir;
        void main() {
          float f = pow(clamp(0.78 - dot(vNormal, vViewDir), 0.0, 1.0), 2.8);
          float rays = 0.85 + 0.15 * sin(vNormal.x * 24.0 + vNormal.y * 24.0 + uTime * 2.0);
          vec3 col = mix(vec3(1.0, 0.38, 0.08), vec3(1.35, 1.05, 0.55), f);
          gl_FragColor = vec4(col * rays, f * 0.78);
        }
      `,
      side: THREE.BackSide,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
    this.dyingSunGroup.add(new THREE.Mesh(new THREE.SphereGeometry(155, 48, 48), this.coronaMat))
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
        const n = new THREE.Vector3(0.22, 0.66, 0.72).normalize()
        const f = new THREE.Vector3().crossVectors(up, n).normalize()
        const r = new THREE.Vector3().crossVectors(n, f).normalize()
        // 旗舰发动机在 (f: -1.5, r: 0.3) 附近
        const engCenter = n
          .clone()
          .multiplyScalar(EARTH_RADIUS + 0.65)
          .addScaledVector(f, -1.5)
          .addScaledVector(r, 0.3)
        // 贴地大仰拍英雄机位 (Low-Angle Hero Shot) 紧贴左前侧山脊，仰望喷口与天际羽流
        const camPos = engCenter
          .clone()
          .addScaledVector(f, -3.2)
          .addScaledVector(r, -2.2)
          .addScaledVector(n, 0.68)
        // 视线朝向喷口上方天际，使发动机雄踞左下方，巨型等离子羽流斜插右上深空！
        const lookAt = engCenter
          .clone()
          .addScaledVector(f, 2.6)
          .addScaledVector(r, 1.8)
          .addScaledVector(n, 5.0)
        return { pos: camPos, look: lookAt }
      }

      case 'EQUATORIAL': {
        const startAng = 0.14
        const camPos = new THREE.Vector3(
          Math.sin(startAng) * (EARTH_RADIUS + 2.4),
          1.4,
          Math.cos(startAng) * (EARTH_RADIUS + 2.4)
        )
        const lookAng = 0.32
        const lookAt = new THREE.Vector3(
          Math.sin(lookAng) * (EARTH_RADIUS + 1.2),
          0.6,
          Math.cos(lookAng) * (EARTH_RADIUS + 1.2)
        )
        return { pos: camPos, look: lookAt }
      }

      case 'ANCHOR': {
        const n = new THREE.Vector3(0.58, 0.0, 0.814).normalize()
        const t = new THREE.Vector3(-0.814, 0.25, 0.58).normalize()
        const camPos = n
          .clone()
          .multiplyScalar(EARTH_RADIUS + 3.8)
          .addScaledVector(t, 7.8)
        const lookAt = n.clone().multiplyScalar(EARTH_RADIUS + 2.2)
        return { pos: camPos, look: lookAt }
      }

      case 'TIANZHU': {
        const n = new THREE.Vector3(0.58, 0.0, 0.814).normalize()
        const t = new THREE.Vector3(-0.814, 0.2, 0.58).normalize()
        const stPos = n.clone().multiplyScalar(142.0)
        const camPos = stPos.clone().addScaledVector(n, 8.2).addScaledVector(t, 7.5)
        const lookAt = stPos.clone().addScaledVector(n, -4.0)
        return { pos: camPos, look: lookAt }
      }

      case 'HABITAT': {
        const hPos = this.habitatGroup.position.clone()
        const radial = hPos.clone().normalize()
        const side = new THREE.Vector3().crossVectors(radial, up).normalize()
        const camPos = hPos.clone().addScaledVector(radial, 10.2).addScaledVector(side, 7.2).add(new THREE.Vector3(0, 3.0, 0))
        const lookAt = hPos.clone().addScaledVector(radial, -8.0)
        return { pos: camPos, look: lookAt }
      }

      case 'DEEP_SPACE': {
        const dPos = this.deepSpaceGroup.position.clone()
        return {
          pos: dPos.clone().add(new THREE.Vector3(4.5, 2.2, 7.2)),
          look: dPos.clone().add(new THREE.Vector3(-2.5, -0.5, -4.5))
        }
      }

      case 'LUNA': {
        const lPos = this.lunaGroup.position.clone()
        return {
          pos: lPos.clone().add(new THREE.Vector3(16, 12, 46)),
          look: lPos.clone().add(new THREE.Vector3(4, 3, 8))
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
    this.camAnim.useSphericalArc = mid.length() < EARTH_RADIUS * 1.15
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

  // ============================================================================
  // 7. 彻底修复的三幕宽银幕电影序列 (物理 3D 钻石环日全食 + 雪山多米诺点火 + 大陆波浪齐射)
  // ============================================================================
  public startThreeChapterStorySequence() {
    this.clearStoryTimers()
    telemetry.storyActive = true
    this.controls.enabled = false

    const isZh = () => telemetry.lang === 'ZH'
    const sunPos = this.dyingSunGroup.position.clone()

    // -------------------------------------------------------------------------
    // CHAPTER I: THE DYING SUN & DIAMOND-RING TOTAL SOLAR ECLIPSE (0s - 9s)
    // -------------------------------------------------------------------------
    telemetry.storyChapter = isZh() ? '第一章 // CHAPTER I' : 'CHAPTER I'
    telemetry.storyTitle = isZh() ? '垂死之日 THE DYING SUN' : 'THE DYING SUN'
    telemetry.storySubtitle = isZh()
      ? '2075年，太阳急速老化膨胀为红巨星，氦闪即将吞噬地球。'
      : 'In 2075, the Sun began to die. A helium flash would engulf the inner planets.'
    soundEngine.speak(
      'Chapter One: The Dying Sun.',
      '第一章，垂死之日。太阳正在死去。'
    )

    // 镜头从地球侧翼缓缓横移进入地球本影锥 (-SUN_DIR_NORM * 255)，让地球暗部边缘横穿红巨星太阳表面形成钻石环日全食！
    const eclipseStartPos = SUN_DIR_NORM.clone().multiplyScalar(-255).add(new THREE.Vector3(-95, 22, 55))
    const eclipseEndPos = SUN_DIR_NORM.clone().multiplyScalar(-255).add(new THREE.Vector3(-8, -4, 5))

    this.camera.position.copy(eclipseStartPos)
    this.baseCamPos.copy(eclipseStartPos)
    this.lookAtTarget.copy(sunPos)

    this.camAnim.startPos.copy(eclipseStartPos)
    this.camAnim.endPos.copy(eclipseEndPos)
    this.camAnim.startLook.copy(sunPos)
    this.camAnim.endLook.copy(sunPos)
    this.camAnim.startTime = performance.now()
    this.camAnim.duration = 8800
    this.camAnim.useSphericalArc = false
    this.camAnim.active = true

    this.storyTimers.push(
      window.setTimeout(() => {
        telemetry.storySubtitle = isZh()
          ? '所以我们选择，带着地球一起逃离。'
          : 'So we chose to take the Earth with us.'
        soundEngine.speak('So we chose to take the Earth with us.', '所以我们选择，带着地球一起逃离。')
      }, 4500)
    )

    // -------------------------------------------------------------------------
    // CHAPTER II: IGNITION (9s - 19s) — 喜马拉雅雪山峡谷 24 肋片发动机多米诺点火
    // -------------------------------------------------------------------------
    this.storyTimers.push(
      window.setTimeout(() => {
        telemetry.storyChapter = isZh() ? '第二章 // CHAPTER II' : 'CHAPTER II'
        telemetry.storyTitle = isZh() ? '苍穹点火 IGNITION' : 'IGNITION'
        telemetry.storySubtitle = isZh()
          ? '一万座行星发动机七联装核心依次点火，高准直等离子柱刺穿云层。'
          : '10,000 planetary engines spool up their 7-nozzle cores and pierce the stratosphere.'
        soundEngine.speak(
          'Chapter Two: Ignition. Ten thousand planetary engines light up.',
          '第二章，苍穹点火。一万座行星发动机依次点亮。'
        )

        this.dominoIgnitionProgress = 0.0
        for (let b = 0; b < 6; b++) {
          this.storyTimers.push(
            window.setTimeout(() => {
              soundEngine.playIgnitionBoom(b)
            }, b * 1200)
          )
        }

        const pose = this.getNodeCameraPose('ENGINE_ARRAY')
        this.camera.position.copy(pose.pos.clone().add(new THREE.Vector3(-1.8, -0.3, -1.5)))
        this.baseCamPos.copy(this.camera.position)
        this.lookAtTarget.copy(pose.look)

        this.camAnim.startPos.copy(this.camera.position)
        this.camAnim.endPos.copy(pose.pos.clone().add(new THREE.Vector3(2.5, 0.6, 2.0)))
        this.camAnim.startLook.copy(pose.look)
        this.camAnim.endLook.copy(pose.look.clone().add(new THREE.Vector3(0, 2.5, 0)))
        this.camAnim.startTime = performance.now()
        this.camAnim.duration = 9600
        this.camAnim.useSphericalArc = false
        this.camAnim.active = true
      }, 9000)
    )

    // -------------------------------------------------------------------------
    // CHAPTER III: TURNING THE WORLD (19s - 30s) — 全球微米级光针波浪点亮 + 赤道切向制动
    // -------------------------------------------------------------------------
    this.storyTimers.push(
      window.setTimeout(() => {
        telemetry.storyChapter = isZh() ? '第三章 // CHAPTER III' : 'CHAPTER III'
        telemetry.storyTitle = isZh() ? '刹住世界 TURNING THE WORLD' : 'TURNING THE WORLD'
        telemetry.storySubtitle = isZh()
          ? '各大洲推进阵列同步并网，赤道转向发动机切向齐射，刹停地球自转。'
          : "Equatorial steering engines fire tangentially in unison to halt Earth's rotation."
        soundEngine.speak(
          "Chapter Three: Turning the World. Equatorial engines fire to halt Earth's rotation.",
          '第三章，刹住世界。赤道转向发动机齐射，刹停地球自转。'
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
        this.flyToNode('EQUATORIAL', 4.5)
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
        name: telemetry.lang === 'ZH' ? '一号推进阵列' : 'ENGINE ARRAY 01',
        alt: 'ALT: 11.2 KM',
        pos: new THREE.Vector3(0.22, 0.66, 0.72).normalize().multiplyScalar(EARTH_RADIUS)
      },
      {
        id: 'EQUATORIAL',
        name: telemetry.lang === 'ZH' ? '赤道转向带' : 'EQUATORIAL TORQUE',
        alt: 'LAT: 00°00′',
        pos: new THREE.Vector3(Math.sin(0.24) * EARTH_RADIUS, 0, Math.cos(0.24) * EARTH_RADIUS)
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

  // ============================================================================
  // 8. 主渲染循环 (严格钳制 Bloom 强度 <= 0.80，120% 超载延伸尾焰长度 25%)
  // ============================================================================
  private animate = () => {
    this.rafId = requestAnimationFrame(this.animate)
    const now = performance.now()
    const elapsed = this.clock.getElapsedTime()

    this.updateCameraTransition(now)

    if (this.dominoIgnitionProgress < 1.0) {
      this.dominoIgnitionProgress = Math.min(1.0, this.dominoIgnitionProgress + 0.0026)
    }
    if (this.globalWaveProgress < 1.0) {
      this.globalWaveProgress = Math.min(1.0, this.globalWaveProgress + 0.0042)
    }

    const thrustNorm = telemetry.thrustPercent / 100
    const isOverclock =
      telemetry.twelveStrikeActive || telemetry.heliosOverdrive || telemetry.thrustPercent > 105 ? 1.0 : 0.0

    // 更新全球微光针
    this.globalNeedlesMat.uniforms.uTime.value = elapsed
    this.globalNeedlesMat.uniforms.uThrust.value = thrustNorm
    this.globalNeedlesMat.uniforms.uWaveProgress.value = this.globalWaveProgress
    this.globalNeedlesMat.uniforms.uOverclock.value = isOverclock

    // 更新全部 7 联装高准直发动机尾焰与 25% 超载长度延伸
    const lengthScale = isOverclock > 0.5 ? 1.25 : 1.0
    const blink = Math.sin(elapsed * 7.5) > 0.1
    const updateEngineList = (list: BrutalistEngineRig[], igProg: number) => {
      list.forEach((rig) => {
        rig.coreRayMat.uniforms.uTime.value = elapsed
        rig.coreRayMat.uniforms.uThrust.value = thrustNorm
        rig.coreRayMat.uniforms.uOverclock.value = isOverclock
        rig.coreRayMat.uniforms.uIgnitionProgress.value = igProg

        rig.sheathMat.uniforms.uTime.value = elapsed
        rig.sheathMat.uniforms.uThrust.value = thrustNorm
        rig.sheathMat.uniforms.uOverclock.value = isOverclock
        rig.sheathMat.uniforms.uIgnitionProgress.value = igProg

        if (rig.godRayMat) {
          rig.godRayMat.uniforms.uTime.value = elapsed
          rig.godRayMat.uniforms.uThrust.value = thrustNorm
          rig.godRayMat.uniforms.uOverclock.value = isOverclock
          rig.godRayMat.uniforms.uIgnitionProgress.value = igProg
        }

        if (rig.ionPoints && rig.ionVelocities) {
          const posAttr = rig.ionPoints.geometry.attributes.position
          const arr = posAttr.array as Float32Array
          const v = rig.ionVelocities
          const speedMul = thrustNorm * (isOverclock > 0.5 ? 1.4 : 1.0)
          for (let i = 0; i < v.length; i++) {
            arr[i * 3 + 1] += v[i] * speedMul
            if (arr[i * 3 + 1] > 14.5) {
              arr[i * 3 + 1] = 0.05 + Math.random() * 0.4
              const rad = 0.04 + Math.pow(Math.random(), 2.0) * 0.35
              const theta = Math.random() * Math.PI * 2
              arr[i * 3] = Math.cos(theta) * rad
              arr[i * 3 + 2] = Math.sin(theta) * rad
            }
          }
          posAttr.needsUpdate = true
        }

        if (rig.vaporSprites) {
          rig.vaporSprites.forEach((sp, sIdx) => {
            sp.material.rotation = (elapsed * 0.03 + sIdx * 0.35) % (Math.PI * 2)
          })
        }

        rig.plumeAssembly.scale.set(1.0, lengthScale, 1.0)
        rig.strobes.forEach((s) => (s.visible = blink))
      })
    }
    updateEngineList(this.engineArrayRigs, this.dominoIgnitionProgress)
    updateEngineList(this.steeringRigs, 1.0)
    updateEngineList(this.lunarRigs, 1.0)

    // 太空电梯轿厢攀升、天柱号双环反向旋转、极光号自转
    this.climberTrains.forEach((pod, idx) => {
      pod.position.y = 1.6 + ((elapsed * 0.14 + idx * 0.33) % 1.0) * 32.0
    })
    if (this.tianzhuAnim) {
      this.tianzhuAnim.upper.rotation.y = elapsed * 0.32
      this.tianzhuAnim.lower.rotation.y = -elapsed * 0.32
      this.tianzhuAnim.strobes.forEach((s) => (s.visible = blink))
    }

    this.habitatGroup.rotation.z = elapsed * 0.16
    this.cloudsMesh.rotation.y = elapsed * 0.004
    this.deepSpaceLaserMat.uniforms.uTime.value = elapsed
    this.dyingSunMat.uniforms.uTime.value = elapsed
    this.coronaMat.uniforms.uTime.value = elapsed

    // 相机低频呼吸与近景微震颤
    if (telemetry.currentMode !== 'EXPLORE') {
      const bx = Math.sin(elapsed * 0.65) * 0.14
      const by = Math.cos(elapsed * 0.52) * 0.11
      const nearEngine =
        telemetry.currentNode === 'ENGINE_ARRAY' ||
        telemetry.currentNode === 'EQUATORIAL' ||
        isOverclock > 0.5
      const shake = nearEngine ? (isOverclock > 0.5 ? 0.14 : 0.04) : 0.0
      this.camera.position.set(
        this.baseCamPos.x + bx + (Math.random() - 0.5) * shake,
        this.baseCamPos.y + by + (Math.random() - 0.5) * shake,
        this.baseCamPos.z
      )
    } else {
      this.controls.update()
      this.baseCamPos.copy(this.camera.position)
    }

    // 严格遵守参数自检表：常规 strength = 0.55，120% 超载上限锁死在 0.80！
    this.bloomPass.strength = telemetry.bloomEnabled ? (isOverclock > 0.5 ? 0.80 : 0.55) : 0.0

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
