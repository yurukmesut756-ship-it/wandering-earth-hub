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

// 晨昏线暮光位置法线 (与 SUN_DIR_NORM 点积约为 -0.05，地面笼罩暮光轮廓，背后天空是深邃黑夜星空！)
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

  private camFillLight!: THREE.DirectionalLight
  private camRimLight!: THREE.DirectionalLight
  private hemiLight!: THREE.HemisphereLight

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
  private climberPods: THREE.Group[] = []
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
    this.createRazorThinGlobalLightNeedles()
    this.createOrbitalTrajectoryRings()
    this.createAllEightDetailedMegastructures()
    this.createBoilingRedGiantSunAndEclipseOccluder()
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
    this.renderer.toneMappingExposure = 1.32
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.container.appendChild(this.renderer.domElement)

    this.scene.environment = MegaStructuresBuilder.createStudioSpaceHDRI(this.renderer)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.05
    this.controls.minDistance = 1.2
    this.controls.maxDistance = 1400

    const sunLight = new THREE.DirectionalLight(0xfff8ed, 4.0)
    sunLight.position.copy(SUN_LIGHT_POS)
    this.scene.add(sunLight)

    this.hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x1e3a8a, 1.0)
    this.scene.add(this.hemiLight)

    // 随相机同步补光与轮廓光组
    this.camFillLight = new THREE.DirectionalLight(0x3888ff, 1.25)
    this.camFillLight.position.set(-25, 15, 30)
    this.camRimLight = new THREE.DirectionalLight(0xffeedd, 1.1)
    this.camRimLight.position.set(30, 25, -15)
    this.camera.add(this.camFillLight)
    this.camera.add(this.camRimLight)
    this.scene.add(this.camera)

    // 严格钳制 UnrealBloomPass：threshold: 0.65, strength: 0.55 (超载上限 0.80), radius: 0.45
    this.composer = new EffectComposer(this.renderer)
    this.composer.addPass(new RenderPass(this.scene, this.camera))
    this.bloomPass = new UnrealBloomPass(new THREE.Vector2(w, h), 0.55, 0.45, 0.65)
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
        new THREE.MeshStandardMaterial({ color: 0x9a8262, roughness: 0.8 })
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
          float hC = texture2D(uBumpTex, vUv).r;
          float hR = texture2D(uBumpTex, vUv + vec2(0.001, 0.0)).r;
          float hU = texture2D(uBumpTex, vUv + vec2(0.0, 0.001)).r;
          vec3 bumpOffset = vec3(hC - hR, hC - hU, 0.0) * 1.4;

          vec3 N = normalize(vNormalWorld + bumpOffset);
          vec3 V = normalize(vViewDir);
          vec3 L = normalize(uSunDir);

          vec3 rawDay = texture2D(uDayTex, vUv).rgb;
          vec3 nightSample = texture2D(uNightTex, vUv).rgb;

          float landMask = smoothstep(0.05, 0.25, rawDay.r - rawDay.b * 0.65);
          vec3 glacialLand = mix(rawDay * 1.25, vec3(0.82, 0.91, 0.98), 0.55);
          vec3 sapphireOcean = mix(rawDay, vec3(0.05, 0.24, 0.52), 0.45);
          vec3 frozenAlbedo = mix(sapphireOcean, glacialLand, landMask);

          float NdotL = dot(N, L);
          float dayFactor = smoothstep(-0.18, 0.22, NdotL);
          float diffuse = max(0.0, NdotL);

          vec3 H = normalize(L + V);
          float spec = pow(max(0.0, dot(N, H)), 32.0) * (1.0 - landMask * 0.5) * 0.25 * dayFactor;
          vec3 litDay = clamp(frozenAlbedo * (0.12 + diffuse * 0.56) + vec3(spec), 0.0, 0.60);

          vec3 nightBase = vec3(0.012, 0.028, 0.065) * (1.0 - dayFactor);
          vec3 nightLights = nightSample * vec3(1.15, 0.92, 0.6) * 0.85 * (1.0 - dayFactor);

          float fresnel = pow(1.0 - max(0.0, dot(V, N)), 3.2);
          vec3 rimGlow = mix(vec3(0.08, 0.52, 1.0), vec3(0.38, 0.88, 1.0), dayFactor) * fresnel * 0.52;

          vec3 finalCol = mix(nightBase + nightLights, litDay, dayFactor) + rimGlow;
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
      color: 0xffffff,
      roughness: 0.9,
      metalness: 0.0,
      transparent: true,
      opacity: 0.78,
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
          gl_FragColor = vec4(col, f * 0.82);
        }
      `,
      side: THREE.BackSide,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
    this.earthGroup.add(new THREE.Mesh(new THREE.SphereGeometry(EARTH_RADIUS * 1.026, 96, 96), atmosHaloMat))
  }

  private createRazorThinGlobalLightNeedles() {
    const totalCount = 2360
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

          float rootSpark = exp(-vUv.y * 12.0) * 0.65;
          float hairFade = pow(max(0.0, 1.0 - vUv.y), 2.2);

          vec3 iceBlue = mix(vec3(0.4, 0.88, 1.0), vec3(1.0, 1.0, 1.0), rootSpark);
          vec3 whiteGold = mix(vec3(1.0, 0.65, 0.2), vec3(1.0, 0.95, 0.85), rootSpark);
          vec3 col = mix(iceBlue, whiteGold, uOverclock);

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
    const sparkPos = new Float32Array(totalCount * 3)

    const patches = [
      { latMin: 16, latMax: 68, lonMin: 10, lonMax: 145 },
      { latMin: 22, latMax: 64, lonMin: -130, lonMax: -62 },
      { latMin: 14, latMax: 52, lonMin: -12, lonMax: 48 }
    ]

    for (let i = 0; i < totalCount; i++) {
      let latDeg = 0
      let lonDeg = 0
      let scaleLen = 1.0

      if (i < 360) {
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
  // 5. 构建全部 8 大巨构节点 (晨昏线暮光布局 + 低角度逆星空背景)
  // ============================================================================
  private createAllEightDetailedMegastructures() {
    const up = new THREE.Vector3(0, 1, 0)

    // -------------------------------------------------------------------------
    // Node 2: ENGINE ARRAY 01 (置于晨昏线暮光交界带 ENGINE_ARRAY_NORMAL，背后是深邃星空！)
    // -------------------------------------------------------------------------
    this.engineArrayGroup = new THREE.Group()
    const tangentF = new THREE.Vector3().crossVectors(up, ENGINE_ARRAY_NORMAL).normalize()
    const tangentR = new THREE.Vector3().crossVectors(ENGINE_ARRAY_NORMAL, tangentF).normalize()

    const engineSites = [
      { f: 0.0, r: 0.0, s: 1.45 },     // 0号旗舰重聚变发动机 (Chapter II IGNITION 主角)
      { f: 2.2, r: -2.1, s: 1.25 },
      { f: 2.8, r: 2.2, s: 1.22 },
      { f: 5.4, r: -0.6, s: 1.15 },
      { f: 6.2, r: 3.1, s: 1.08 },
      { f: 8.5, r: -2.8, s: 1.02 },
      { f: 9.6, r: 1.2, s: 0.98 },
      { f: 12.2, r: -1.2, s: 0.92 },
      { f: 13.5, r: 2.6, s: 0.88 },
      { f: 16.0, r: -2.4, s: 0.85 },
      { f: 17.5, r: 0.8, s: 0.82 }
    ]

    // 局部雪山地形：边缘沉入地壳内部 (-0.25) 并在远景自动 LOD 隐藏，绝不在地球远景露出方形补丁！
    const terrainGeo = new THREE.PlaneGeometry(42, 42, 128, 128)
    const posAttr = terrainGeo.attributes.position
    const colorsAttr = new Float32Array(posAttr.count * 3)

    for (let i = 0; i < posAttr.count; i++) {
      const lx = posAttr.getX(i)
      const ly = posAttr.getY(i)
      const radialDist = Math.hypot(lx, ly)
      const edgeFade = 1.0 - THREE.MathUtils.smoothstep(radialDist, 12.0, 20.5)
      const h = this.getMountainElevation(lx, ly, engineSites) * edgeFade - (1.0 - edgeFade) * 0.35

      const worldPt = ENGINE_ARRAY_NORMAL
        .clone()
        .multiplyScalar(EARTH_RADIUS)
        .addScaledVector(tangentR, lx)
        .addScaledVector(tangentF, ly)
        .normalize()
        .multiplyScalar(EARTH_RADIUS + h)
      posAttr.setXYZ(i, worldPt.x, worldPt.y, worldPt.z)

      // 暮光冷蓝/暗岩雪山色调，绝不刺眼泛白抢夺尾焰对比度
      const snowRatio = THREE.MathUtils.clamp((h - 0.25) / 1.3, 0.1, 1.0)
      colorsAttr[i * 3] = THREE.MathUtils.lerp(0.08, 0.32, snowRatio)
      colorsAttr[i * 3 + 1] = THREE.MathUtils.lerp(0.12, 0.44, snowRatio)
      colorsAttr[i * 3 + 2] = THREE.MathUtils.lerp(0.18, 0.62, snowRatio)
    }
    terrainGeo.setAttribute('color', new THREE.BufferAttribute(colorsAttr, 3))
    terrainGeo.computeVertexNormals()

    const twilightMountainMat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      bumpMap: this.builder.gunmetalBump,
      bumpScale: 0.06,
      roughness: 0.78,
      metalness: 0.15,
      envMapIntensity: 1.1
    })
    this.engineArrayGroup.add(new THREE.Mesh(terrainGeo, twilightMountainMat))

    engineSites.forEach((s, idx) => {
      const threshold = (idx / engineSites.length) * 0.78
      const rig = this.builder.buildBrutalistPlanetaryEngine(s.s, 15.5, threshold)
      const h = this.getMountainElevation(s.r, s.f, engineSites)
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
    })

    this.earthGroup.add(this.engineArrayGroup)

    // -------------------------------------------------------------------------
    // Node 3: EQUATORIAL STEERING ARRAY (置于赤道暮光地平线，6 座 30° 倾角转向喷口向黑夜星空齐射)
    // -------------------------------------------------------------------------
    this.steeringArrayGroup = new THREE.Group()
    const baseEqLon = Math.atan2(EQUATORIAL_NORMAL.x, EQUATORIAL_NORMAL.z)
    for (let i = 0; i < 8; i++) {
      const lonAngle = baseEqLon + i * 0.022
      const dir = new THREE.Vector3(Math.sin(lonAngle), (i % 2 - 0.5) * 0.008, Math.cos(lonAngle)).normalize()
      const rig = this.builder.buildGimbalSteeringEngineUnit(1.22, 16.5)
      rig.group.position.copy(dir.clone().multiplyScalar(EARTH_RADIUS + 0.02))
      rig.group.quaternion.setFromUnitVectors(up, dir)
      this.steeringArrayGroup.add(rig.group)
      this.steeringRigs.push(rig)
    }
    this.earthGroup.add(this.steeringArrayGroup)

    // -------------------------------------------------------------------------
    // Node 4 & Node 5: EQUATORIAL ANCHOR + TIANZHU APEX STATION (置于赤道晨昏线附近)
    // -------------------------------------------------------------------------
    const anchor = this.builder.buildEquatorialAnchorComplex(42.0)
    this.anchorGroup = anchor.group
    this.climberPods = anchor.climberPods
    this.anchorGroup.position.copy(ANCHOR_NORMAL.clone().multiplyScalar(EARTH_RADIUS))
    this.anchorGroup.quaternion.setFromUnitVectors(up, ANCHOR_NORMAL)
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
    // Node 6: HABITAT RING AURORA (高轨晨昏线侧，背景是地球发光蓝色大气弧)
    // -------------------------------------------------------------------------
    this.habitatGroup = this.builder.buildHabitatRingAurora()
    this.habitatGroup.position.set(-76, 42, 132)
    this.habitatGroup.lookAt(0, 0, 0)
    this.earthGroup.add(this.habitatGroup)

    // -------------------------------------------------------------------------
    // Node 7: DEEP SPACE ARRAY (十字翼相控阵中继舰队)
    // -------------------------------------------------------------------------
    const ds = this.builder.buildDeepSpaceRelayFleet()
    this.deepSpaceGroup = ds.group
    this.deepSpaceLaserMat = ds.laserShaderMat
    this.deepSpaceGroup.position.set(-185, 65, 195)
    this.deepSpaceGroup.lookAt(-580, 130, -820)
    this.scene.add(this.deepSpaceGroup)

    // -------------------------------------------------------------------------
    // Node 8: LUNA (阿波罗中灰高对比度陨石坑月球 + 0.35 比例月球发动机)
    // -------------------------------------------------------------------------
    const luna = this.builder.buildPhotorealisticLuna(27.0)
    this.lunaGroup = luna.group
    this.lunarRigs = luna.lunarRigs
    this.lunaGroup.position.set(240, 32, -195)
    this.scene.add(this.lunaGroup)
  }

  // ============================================================================
  // 6. 沸腾红巨星太阳 + 专用纯黑日全食遮蔽天体 (打造 00:21-00:23 锐利钻石环日全食！)
  // ============================================================================
  private createBoilingRedGiantSunAndEclipseOccluder() {
    this.dyingSunGroup = new THREE.Group()
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

          vec3 crimson = vec3(0.85, 0.15, 0.02);
          vec3 orangeGranule = vec3(1.18, 0.52, 0.09);
          vec3 goldFlare = vec3(1.5, 1.22, 0.65);

          vec3 col = mix(crimson, orangeGranule, smoothstep(0.25, 0.65, n));
          col = mix(col, goldFlare, smoothstep(0.62, 0.88, n + limb * 0.35));
          gl_FragColor = vec4(col, 1.0);
        }
      `
    })

    const sunMesh = new THREE.Mesh(new THREE.SphereGeometry(85, 64, 64), this.dyingSunMat)
    this.dyingSunGroup.add(sunMesh)

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
          float f = pow(clamp(0.82 - dot(vNormal, vViewDir), 0.0, 1.0), 2.8);
          float rays = 0.85 + 0.15 * sin(vNormal.x * 28.0 + vNormal.y * 28.0 + uTime * 2.2);
          vec3 col = mix(vec3(1.0, 0.42, 0.08), vec3(1.45, 1.15, 0.65), f);
          gl_FragColor = vec4(col * rays, f * 0.88);
        }
      `,
      side: THREE.BackSide,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
    this.dyingSunGroup.add(new THREE.Mesh(new THREE.SphereGeometry(145, 48, 48), this.coronaMat))

    // 纯黑日全食遮蔽球体 (Placed in front of the Sun during Chapter I 4.0s-8.8s to guarantee a razor-sharp pitch-black eclipse silhouette with diamond-ring flare on the upper-right rim!)
    this.eclipseOccluderSphere = new THREE.Mesh(
      new THREE.SphereGeometry(83.5, 64, 64),
      new THREE.MeshBasicMaterial({ color: 0x000000 })
    )
    // 默认偏移在侧面，进入日食分镜时平滑横移遮挡太阳，右上角留出璀璨钻石环日冕！
    this.eclipseOccluderSphere.position.set(-180, -35, 85)
    this.dyingSunGroup.add(this.eclipseOccluderSphere)

    this.scene.add(this.dyingSunGroup)
  }

  // ============================================================================
  // 7. FIX 5: 低角度仰视逆星空英雄机位 (Low-Angle Hero Shots Against Dark Starry Sky!)
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
        // 低角度英雄仰视镜头 (EARTH_RADIUS + 0.85，向上仰视 35° 望向深邃星空背景中的 5 座巨型发动机与冲天等离子柱，复刻 00:03 & 00:28)
        const n = ENGINE_ARRAY_NORMAL
        const f = new THREE.Vector3().crossVectors(up, n).normalize()
        const r = new THREE.Vector3().crossVectors(n, f).normalize()
        const camPos = n
          .clone()
          .multiplyScalar(EARTH_RADIUS + 0.85)
          .addScaledVector(f, -2.6)
          .addScaledVector(r, 0.95)
        const lookAt = n
          .clone()
          .multiplyScalar(EARTH_RADIUS + 5.8)
          .addScaledVector(f, 5.2)
          .addScaledVector(r, 0.1)
        return { pos: camPos, look: lookAt }
      }

      case 'EQUATORIAL': {
        // 贴近赤道暮光地平线，向上仰视一排 30° 倾角的肋片转向喷口向黑夜星空齐射 (复刻 00:04 & 00:28)
        const baseLon = Math.atan2(EQUATORIAL_NORMAL.x, EQUATORIAL_NORMAL.z)
        const camLon = baseLon - 0.026
        const lookLon = baseLon + 0.055
        const camPos = new THREE.Vector3(
          Math.sin(camLon) * (EARTH_RADIUS + 0.72),
          -0.45,
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
        // 掠过赤道发光蓝色大气层边缘，平视太空电梯基座与向上直插星空的 3 根紧绷纳米带 (复刻 00:05)
        const n = ANCHOR_NORMAL
        const t = new THREE.Vector3(-n.z, 0.12, n.x).normalize()
        const camPos = n
          .clone()
          .multiplyScalar(EARTH_RADIUS + 1.65)
          .addScaledVector(t, 4.8)
        const lookAt = n.clone().multiplyScalar(EARTH_RADIUS + 3.6)
        return { pos: camPos, look: lookAt }
      }

      case 'TIANZHU': {
        // 对齐 00:06-00:07：背景为发光的地球蓝色弧线，前景展现修长钛桁架脊柱与暗古铜金网格太阳翼
        const n = ANCHOR_NORMAL
        const t = new THREE.Vector3(-n.z, 0.18, n.x).normalize()
        const stPos = n.clone().multiplyScalar(142.0)
        const camPos = stPos.clone().addScaledVector(n, 5.2).addScaledVector(t, 6.4)
        const lookAt = stPos.clone().addScaledVector(n, -2.5)
        return { pos: camPos, look: lookAt }
      }

      case 'HABITAT': {
        // 对齐 00:08-00:11：展现宽扁倒角香槟钛双同心圆环与扁平圆盘中枢，背景为蔚蓝地球弧面
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

  // ============================================================================
  // 8. 升级版三幕宽银幕电影序列 (00:21 钻石环日全食 -> 00:24 水平正侧特写高炉点火 -> 00:28 肋片转向喷口仰视齐射)
  // ============================================================================
  public startThreeChapterStorySequence() {
    this.clearStoryTimers()
    telemetry.storyActive = true
    this.controls.enabled = false

    const isZh = () => telemetry.lang === 'ZH'
    const up = new THREE.Vector3(0, 1, 0)
    const sunPos = this.dyingSunGroup.position.clone()

    // -------------------------------------------------------------------------
    // CHAPTER I: THE DYING SUN & DIAMOND-RING ECLIPSE (0s - 9s, 复刻 00:21-00:23)
    // -------------------------------------------------------------------------
    this.isEclipseShotActive = true
    telemetry.storyChapter = isZh() ? '第一章 // CHAPTER I' : 'CHAPTER I'
    telemetry.storyTitle = isZh() ? '垂死之日 THE DYING SUN' : 'THE DYING SUN'
    telemetry.storySubtitle = isZh()
      ? '太阳正在死去，急速膨胀的红巨星即将吞噬地球。'
      : 'And the Sun is dying.'
    soundEngine.speak('Chapter One: The Dying Sun.', '第一章，垂死之日。太阳正在死去。')

    // 0s-4s: 直视深空中沸腾的红巨星太阳
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

    // 4.0s-8.8s: 纯黑地球剪影横移遮蔽太阳，右上角边缘绽放出夺目的钻石环日冕！(复刻 00:22-00:23)
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

    // -------------------------------------------------------------------------
    // CHAPTER II: IGNITION (9s - 19s, 复刻 00:24-00:25 旗舰行星发动机水平正侧面特写 + 高炉橙光 + 冲天等离子巨柱)
    // -------------------------------------------------------------------------
    this.storyTimers.push(
      window.setTimeout(() => {
        this.isEclipseShotActive = false
        this.eclipseOccluderSphere.position.set(-180, -35, 85)

        telemetry.storyChapter = isZh() ? '第二章 // CHAPTER II' : 'CHAPTER II'
        telemetry.storyTitle = isZh() ? '苍穹点火 IGNITION' : 'IGNITION'
        telemetry.storySubtitle = isZh()
          ? '行星发动机高炉核心点火，巨型等离子光柱与电离火花直冲云霄。'
          : 'Planetary engine furnace ignites as a colossal plasma pillar erupts into the heavens.'
        soundEngine.speak('Chapter Two: Ignition.', '第二章，苍穹点火。')

        this.dominoIgnitionProgress = 0.0
        for (let b = 0; b < 5; b++) {
          this.storyTimers.push(
            window.setTimeout(() => {
              soundEngine.playIgnitionBoom(b)
            }, b * 1200)
          )
        }

        // 严格复刻 00:24-00:25：正对 0 号旗舰发动机的水平正侧面特写 (Dead-On Horizontal Profile Close-up)
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
        const profileLookStart = n.clone().multiplyScalar(EARTH_RADIUS + 1.15).addScaledVector(f, 0.2)
        const profileLookEnd = n.clone().multiplyScalar(EARTH_RADIUS + 2.6).addScaledVector(f, 0.4)

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

    // -------------------------------------------------------------------------
    // CHAPTER III: TURNING THE WORLD (19s - 30s, 复刻 00:26 大陆波浪点亮 -> 00:28 5座肋片转向喷口低角度仰视齐射)
    // -------------------------------------------------------------------------
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

    // 24.5s: 直接切至复刻 00:28 的低角度倾斜仰视特写——5座带36肋片与24道青色狭缝的转向喷口在星空下轰鸣！
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
        name: telemetry.lang === 'ZH' ? '一号推进阵列' : 'ENGINE ARRAY 01',
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

  // ============================================================================
  // 9. 主渲染循环 (含距离 LOD 剔除局部雪山补丁 + 四层体积/GPU粒子尾焰更新)
  // ============================================================================
  private animate = () => {
    this.rafId = requestAnimationFrame(this.animate)
    const now = performance.now()
    const elapsed = this.clock.getElapsedTime()

    this.updateCameraTransition(now)

    // 关键修复：根据相机距地心距离动态 LOD 隐藏局部 42x42 地形网格，全球视角下 100% 无缝绝无方形补丁凸出！
    const camDist = this.camera.position.length()
    this.engineArrayGroup.visible = camDist < 138.0
    this.steeringArrayGroup.visible = camDist < 138.0

    // 第一章日全食平滑移动遮蔽天体，形成右上角钻石环日冕
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

    const lengthScale = isOverclock > 0.5 ? 1.25 : 1.0
    const blink = Math.sin(elapsed * 7.5) > 0.1

    const updateEngineList = (list: BrutalistEngineRig[], igProg: number) => {
      list.forEach((rig) => {
        rig.coreColumnMat.uniforms.uTime.value = elapsed
        rig.coreColumnMat.uniforms.uThrust.value = thrustNorm
        rig.coreColumnMat.uniforms.uOverclock.value = isOverclock
        rig.coreColumnMat.uniforms.uIgnitionProgress.value = igProg

        rig.godRayPlanesMat.uniforms.uTime.value = elapsed
        rig.godRayPlanesMat.uniforms.uThrust.value = thrustNorm
        rig.godRayPlanesMat.uniforms.uOverclock.value = isOverclock
        rig.godRayPlanesMat.uniforms.uIgnitionProgress.value = igProg

        rig.ionParticlesMat.uniforms.uTime.value = elapsed
        rig.ionParticlesMat.uniforms.uThrust.value = thrustNorm
        rig.ionParticlesMat.uniforms.uOverclock.value = isOverclock
        rig.ionParticlesMat.uniforms.uIgnitionProgress.value = igProg

        rig.plumeAssembly.scale.set(1.0, lengthScale, 1.0)
        rig.strobes.forEach((s) => (s.visible = blink))
      })
    }
    updateEngineList(this.engineArrayRigs, this.dominoIgnitionProgress)
    updateEngineList(this.steeringRigs, 1.0)
    updateEngineList(this.lunarRigs, 1.0)

    this.climberPods.forEach((pod, idx) => {
      pod.position.y = 1.5 + ((elapsed * 0.14 + idx * 0.45) % 1.0) * 32.0
    })
    if (this.tianzhuAnim) {
      this.tianzhuAnim.upper.rotation.y = elapsed * 0.32
      this.tianzhuAnim.lower.rotation.y = -elapsed * 0.25
      this.tianzhuAnim.strobes.forEach((s) => (s.visible = blink))
    }

    this.habitatGroup.rotation.z = elapsed * 0.15
    this.cloudsMesh.rotation.y = elapsed * 0.004
    this.deepSpaceLaserMat.uniforms.uTime.value = elapsed
    this.dyingSunMat.uniforms.uTime.value = elapsed
    this.coronaMat.uniforms.uTime.value = elapsed

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
