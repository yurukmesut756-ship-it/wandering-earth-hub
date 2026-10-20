import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

export interface BrutalistEngineRig {
  group: THREE.Group
  plumeAssembly: THREE.Group
  coreLaserMat: THREE.ShaderMaterial
  vortexSheathMat: THREE.ShaderMaterial
  ionSparksMat: THREE.ShaderMaterial
  strobes: THREE.Mesh[]
  mistSprites: THREE.Sprite[]
  nozzleFlare: THREE.Sprite
}

export class MegaStructuresBuilder {
  public steelAlbedo: THREE.CanvasTexture
  public steelNormal: THREE.CanvasTexture
  public steelRoughness: THREE.CanvasTexture
  public furnaceWindowTex: THREE.CanvasTexture
  public champagneHullTex: THREE.CanvasTexture
  public solarWingTex: THREE.CanvasTexture

  public frozenEarthDayTex: THREE.CanvasTexture
  public frozenEarthBumpTex: THREE.CanvasTexture
  public frozenEarthWaterTex: THREE.CanvasTexture
  public frozenEarthNightTex: THREE.CanvasTexture
  public fluffyCloudsTex: THREE.CanvasTexture
  public moonRegolithTex: THREE.CanvasTexture
  public softGlowSprite: THREE.CanvasTexture
  public mistSpriteTex: THREE.CanvasTexture

  constructor() {
    const pbr = this.createHeavyIndustrialPBRMaps()
    this.steelAlbedo = pbr.albedo
    this.steelNormal = pbr.normal
    this.steelRoughness = pbr.roughness

    this.furnaceWindowTex = this.createWarmOrangeGantryTexture()
    this.champagneHullTex = this.createChampagneBevelTexture()
    this.solarWingTex = this.createSapphireSiliconSolarTexture()

    const earthTex = this.createSmoothFrozenEarthTextures()
    this.frozenEarthDayTex = earthTex.day
    this.frozenEarthBumpTex = earthTex.bump
    this.frozenEarthWaterTex = earthTex.water
    this.frozenEarthNightTex = earthTex.night

    this.fluffyCloudsTex = this.createSilkyCycloneCloudsTexture()
    this.moonRegolithTex = this.createApolloLunarRegolithTexture()
    this.softGlowSprite = this.createSoftRadialGlowSprite()
    this.mistSpriteTex = this.createVolumetricMistTexture()
  }

  public static createStudioSpaceHDRI(renderer: THREE.WebGLRenderer): THREE.Texture {
    const pmrem = new THREE.PMREMGenerator(renderer)
    pmrem.compileEquirectangularShader()

    const envScene = new RoomEnvironment()
    const skyMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      vertexShader: `
        varying vec3 vDir;
        void main() {
          vDir = normalize(position);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vDir;
        void main() {
          vec3 d = normalize(vDir);
          vec3 darkSpace = vec3(0.04, 0.08, 0.15);
          vec3 horizonStrip = vec3(0.28, 0.68, 1.35) * exp(-pow((d.y + 0.25) * 3.2, 2.0));
          float sunSpec = pow(max(0.0, dot(d, normalize(vec3(0.68, 0.35, 0.64)))), 28.0);
          vec3 col = darkSpace + horizonStrip + vec3(2.4, 2.2, 1.9) * sunSpec;
          gl_FragColor = vec4(col, 1.0);
        }
      `
    })
    envScene.add(new THREE.Mesh(new THREE.SphereGeometry(45, 32, 16), skyMat))

    const envMap = pmrem.fromScene(envScene, 0.025).texture
    pmrem.dispose()
    return envMap
  }

  private configureSmoothTexture(tex: THREE.CanvasTexture, wrapRepeat = false): THREE.CanvasTexture {
    tex.generateMipmaps = true
    tex.minFilter = THREE.LinearMipmapLinearFilter
    tex.magFilter = THREE.LinearFilter
    if (wrapRepeat) {
      tex.wrapS = THREE.RepeatWrapping
      tex.wrapT = THREE.RepeatWrapping
    } else {
      tex.wrapS = THREE.RepeatWrapping
      tex.wrapT = THREE.ClampToEdgeWrapping
    }
    tex.needsUpdate = true
    return tex
  }

  private createHeavyIndustrialPBRMaps() {
    const size = 512
    const heightData = new Float32Array(size * size)

    const albedoC = document.createElement('canvas')
    albedoC.width = size
    albedoC.height = size
    const aCtx = albedoC.getContext('2d')!

    const roughC = document.createElement('canvas')
    roughC.width = size
    roughC.height = size
    const rCtx = roughC.getContext('2d')!

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const row = Math.floor(y / 64)
        const shift = (row % 2) * 48
        const sx = (x + shift) % 96
        const sy = y % 64

        const isSeam = sx < 3 || sy < 3
        const isRib = sy > 18 && sy < 46 && sx % 16 < 4
        const isRivet =
          Math.hypot(sx - 10, sy - 10) < 3.0 ||
          Math.hypot(sx - 86, sy - 10) < 3.0 ||
          Math.hypot(sx - 10, sy - 54) < 3.0 ||
          Math.hypot(sx - 86, sy - 54) < 3.0

        const grain = (Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1
        let h = 0.5 + grain * 0.06
        if (isSeam) h = 0.08
        else if (isRivet) h = 0.92
        else if (isRib) h = 0.72

        heightData[y * size + x] = h

        const plateShade = ((row + Math.floor((x + shift) / 96)) % 3) * 7
        let baseVal = 40 + plateShade + grain * 7
        if (isSeam) baseVal = 15
        else if (isRivet) baseVal = 72
        else if (sx < 6 || sy < 6) baseVal += 16
        aCtx.fillStyle = `rgb(${baseVal}, ${baseVal + 6}, ${baseVal + 14})`
        aCtx.fillRect(x, y, 1, 1)

        let rVal = 110 + grain * 20
        if (isSeam) rVal = 230
        else if (isRivet || sx < 6 || sy < 6) rVal = 50
        rCtx.fillStyle = `rgb(${rVal}, ${rVal}, ${rVal})`
        rCtx.fillRect(x, y, 1, 1)
      }
    }

    const normalC = document.createElement('canvas')
    normalC.width = size
    normalC.height = size
    const nCtx = normalC.getContext('2d')!
    const imgData = nCtx.createImageData(size, size)
    const strength = 5.0

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const xm = (x - 1 + size) % size
        const xp = (x + 1) % size
        const ym = (y - 1 + size) % size
        const yp = (y + 1) % size

        const dX =
          heightData[ym * size + xp] +
          2 * heightData[y * size + xp] +
          heightData[yp * size + xp] -
          (heightData[ym * size + xm] + 2 * heightData[y * size + xm] + heightData[yp * size + xm])

        const dY =
          heightData[yp * size + xm] +
          2 * heightData[yp * size + x] +
          heightData[yp * size + xp] -
          (heightData[ym * size + xm] + 2 * heightData[ym * size + x] + heightData[ym * size + xp])

        const nx = -dX * strength
        const ny = -dY * strength
        const nz = 1.0
        const len = Math.hypot(nx, ny, nz)

        const idx = (y * size + x) * 4
        imgData.data[idx] = Math.round(((nx / len) * 0.5 + 0.5) * 255)
        imgData.data[idx + 1] = Math.round(((ny / len) * 0.5 + 0.5) * 255)
        imgData.data[idx + 2] = Math.round(((nz / len) * 0.5 + 0.5) * 255)
        imgData.data[idx + 3] = 255
      }
    }
    nCtx.putImageData(imgData, 0, 0)

    const wrap = (t: THREE.CanvasTexture, rx: number, ry: number) => {
      this.configureSmoothTexture(t, true)
      t.repeat.set(rx, ry)
      return t
    }

    return {
      albedo: wrap(new THREE.CanvasTexture(albedoC), 4, 4),
      normal: wrap(new THREE.CanvasTexture(normalC), 4, 4),
      roughness: wrap(new THREE.CanvasTexture(roughC), 4, 4)
    }
  }

  private createSoftRadialGlowSprite(): THREE.CanvasTexture {
    const c = document.createElement('canvas')
    c.width = 128
    c.height = 128
    const ctx = c.getContext('2d')!
    const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
    g.addColorStop(0, 'rgba(255, 255, 255, 1.0)')
    g.addColorStop(0.25, 'rgba(210, 252, 255, 0.95)')
    g.addColorStop(0.58, 'rgba(0, 195, 255, 0.35)')
    g.addColorStop(1, 'rgba(0, 0, 0, 0.0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 128, 128)
    return this.configureSmoothTexture(new THREE.CanvasTexture(c), false)
  }

  private createVolumetricMistTexture(): THREE.CanvasTexture {
    const c = document.createElement('canvas')
    c.width = 256
    c.height = 128
    const ctx = c.getContext('2d')!
    const g = ctx.createRadialGradient(128, 64, 6, 128, 64, 118)
    g.addColorStop(0, 'rgba(180, 235, 255, 0.42)')
    g.addColorStop(0.5, 'rgba(60, 145, 225, 0.14)')
    g.addColorStop(1, 'rgba(0, 0, 0, 0.0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 256, 128)
    return this.configureSmoothTexture(new THREE.CanvasTexture(c), false)
  }

  private createWarmOrangeGantryTexture(): THREE.CanvasTexture {
    const c = document.createElement('canvas')
    c.width = 512
    c.height = 128
    const ctx = c.getContext('2d')!
    ctx.fillStyle = '#070a0f'
    ctx.fillRect(0, 0, 512, 128)
    for (let row = 14; row < 114; row += 18) {
      for (let col = 4; col < 506; col += 8) {
        if (Math.random() > 0.2) {
          ctx.fillStyle = Math.random() > 0.25 ? '#ff8811' : '#ffdd88'
          ctx.fillRect(col, row, 5, 4)
        }
      }
    }
    const tex = this.configureSmoothTexture(new THREE.CanvasTexture(c), true)
    tex.repeat.set(8, 1)
    return tex
  }

  private createChampagneBevelTexture(): THREE.CanvasTexture {
    const c = document.createElement('canvas')
    c.width = 512
    c.height = 512
    const ctx = c.getContext('2d')!
    ctx.fillStyle = '#c8cfd8'
    ctx.fillRect(0, 0, 512, 512)
    ctx.strokeStyle = '#647080'
    ctx.lineWidth = 2.0
    for (let y = 0; y < 512; y += 64) {
      for (let x = 0; x < 512; x += 96) {
        ctx.fillStyle = (x + y) % 128 === 0 ? '#d8dfe8' : '#b8c0cc'
        ctx.fillRect(x + 2, y + 2, 92, 60)
        ctx.strokeRect(x, y, 96, 64)
      }
    }
    const tex = this.configureSmoothTexture(new THREE.CanvasTexture(c), true)
    tex.repeat.set(6, 2)
    return tex
  }

  private createSapphireSiliconSolarTexture(): THREE.CanvasTexture {
    const c = document.createElement('canvas')
    c.width = 512
    c.height = 512
    const ctx = c.getContext('2d')!
    ctx.fillStyle = '#182b49'
    ctx.fillRect(0, 0, 512, 512)
    ctx.strokeStyle = '#365d94'
    ctx.lineWidth = 1.5
    for (let i = 0; i <= 512; i += 24) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, 512)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(512, i)
      ctx.stroke()
    }
    ctx.strokeStyle = '#94a3b8'
    ctx.lineWidth = 3.0
    for (let i = 64; i < 512; i += 128) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, 512)
      ctx.stroke()
    }
    const tex = this.configureSmoothTexture(new THREE.CanvasTexture(c), true)
    tex.repeat.set(3, 1)
    return tex
  }

  private createSmoothFrozenEarthTextures() {
    const w = 1024
    const h = 512

    const dayC = document.createElement('canvas')
    dayC.width = w
    dayC.height = h
    const dCtx = dayC.getContext('2d')!
    const oceanGrad = dCtx.createLinearGradient(0, 0, 0, h)
    oceanGrad.addColorStop(0, '#b8d4ee')
    oceanGrad.addColorStop(0.15, '#184278')
    oceanGrad.addColorStop(0.5, '#0e2d56')
    oceanGrad.addColorStop(0.85, '#184278')
    oceanGrad.addColorStop(1, '#c5ddf2')
    dCtx.fillStyle = oceanGrad
    dCtx.fillRect(0, 0, w, h)

    const bumpC = document.createElement('canvas')
    bumpC.width = w
    bumpC.height = h
    const bCtx = bumpC.getContext('2d')!
    bCtx.fillStyle = '#080808'
    bCtx.fillRect(0, 0, w, h)

    const waterC = document.createElement('canvas')
    waterC.width = w
    waterC.height = h
    const wCtx = waterC.getContext('2d')!
    wCtx.fillStyle = '#ffffff'
    wCtx.fillRect(0, 0, w, h)

    const nightC = document.createElement('canvas')
    nightC.width = w
    nightC.height = h
    const nCtx = nightC.getContext('2d')!
    nCtx.fillStyle = '#000000'
    nCtx.fillRect(0, 0, w, h)

    const continents = [
      { x: 675, y: 135, rx: 210, ry: 75 },
      { x: 775, y: 185, rx: 105, ry: 58 },
      { x: 550, y: 255, rx: 92, ry: 88 },
      { x: 215, y: 145, rx: 132, ry: 68 },
      { x: 315, y: 325, rx: 72, ry: 84 },
      { x: 835, y: 348, rx: 72, ry: 42 }
    ]

    continents.forEach((c) => {
      for (let i = 0; i < 110; i++) {
        const ang = (i / 110) * Math.PI * 2
        const wave = 0.5 + 0.45 * Math.sin(i * 3.7) * Math.cos(i * 2.3)
        const cx = c.x + Math.cos(ang) * c.rx * wave
        const cy = c.y + Math.sin(ang) * c.ry * wave
        const rad = 28 + (i % 38)

        const gDay = dCtx.createRadialGradient(cx, cy, 2, cx, cy, rad)
        gDay.addColorStop(0, 'rgba(235, 244, 255, 0.68)')
        gDay.addColorStop(0.5, 'rgba(165, 195, 225, 0.45)')
        gDay.addColorStop(1, 'rgba(24, 66, 120, 0.0)')
        dCtx.fillStyle = gDay
        dCtx.beginPath()
        dCtx.arc(cx, cy, rad, 0, Math.PI * 2)
        dCtx.fill()

        const gBump = bCtx.createRadialGradient(cx, cy, 1, cx, cy, rad * 0.85)
        gBump.addColorStop(0, 'rgba(220, 220, 220, 0.35)')
        gBump.addColorStop(0.5, 'rgba(110, 110, 110, 0.18)')
        gBump.addColorStop(1, 'rgba(0, 0, 0, 0.0)')
        bCtx.fillStyle = gBump
        bCtx.beginPath()
        bCtx.arc(cx, cy, rad * 0.85, 0, Math.PI * 2)
        bCtx.fill()

        const gWater = wCtx.createRadialGradient(cx, cy, 4, cx, cy, rad * 0.9)
        gWater.addColorStop(0, 'rgba(0, 0, 0, 0.85)')
        gWater.addColorStop(0.7, 'rgba(0, 0, 0, 0.4)')
        gWater.addColorStop(1, 'rgba(0, 0, 0, 0.0)')
        wCtx.fillStyle = gWater
        bCtx.beginPath()
        wCtx.arc(cx, cy, rad * 0.9, 0, Math.PI * 2)
        wCtx.fill()
      }

      for (let h = 0; h < 75; h++) {
        const hx = c.x + (Math.random() - 0.5) * c.rx * 1.3
        const hy = c.y + (Math.random() - 0.5) * c.ry * 1.2
        const glowR = 4.0 + Math.random() * 7.5
        const ng = nCtx.createRadialGradient(hx, hy, 0.2, hx, hy, glowR)
        ng.addColorStop(0, 'rgba(255, 215, 130, 0.95)')
        ng.addColorStop(0.4, 'rgba(255, 165, 60, 0.45)')
        ng.addColorStop(1, 'rgba(0, 0, 0, 0.0)')
        nCtx.fillStyle = ng
        nCtx.beginPath()
        nCtx.arc(hx, hy, glowR, 0, Math.PI * 2)
        nCtx.fill()
      }
    })

    const dayTex = this.configureSmoothTexture(new THREE.CanvasTexture(dayC), false)
    dayTex.colorSpace = THREE.SRGBColorSpace
    return {
      day: dayTex,
      bump: this.configureSmoothTexture(new THREE.CanvasTexture(bumpC), false),
      water: this.configureSmoothTexture(new THREE.CanvasTexture(waterC), false),
      night: this.configureSmoothTexture(new THREE.CanvasTexture(nightC), false)
    }
  }

  private createSilkyCycloneCloudsTexture(): THREE.CanvasTexture {
    const w = 1024
    const h = 512
    const c = document.createElement('canvas')
    c.width = w
    c.height = h
    const ctx = c.getContext('2d')!
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, w, h)
    return this.configureSmoothTexture(new THREE.CanvasTexture(c), false)
  }

  private createApolloLunarRegolithTexture(): THREE.CanvasTexture {
    const c = document.createElement('canvas')
    c.width = 1024
    c.height = 512
    const ctx = c.getContext('2d')!
    ctx.fillStyle = '#757980'
    ctx.fillRect(0, 0, 1024, 512)

    const mares = [
      { x: 340, y: 200, r: 125 },
      { x: 490, y: 235, r: 110 },
      { x: 660, y: 215, r: 90 },
      { x: 245, y: 315, r: 82 }
    ]
    mares.forEach((m) => {
      const g = ctx.createRadialGradient(m.x, m.y, 10, m.x, m.y, m.r)
      g.addColorStop(0, '#363a40')
      g.addColorStop(0.7, '#50545c')
      g.addColorStop(1, 'rgba(117, 121, 128, 0)')
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2)
      ctx.fill()
    })

    for (let i = 0; i < 1500; i++) {
      const x = Math.random() * 1024
      const y = Math.random() * 512
      const r = 1.5 + Math.pow(Math.random(), 3) * 34
      ctx.strokeStyle = 'rgba(210, 215, 222, 0.55)'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.stroke()
      ctx.fillStyle = 'rgba(24, 27, 32, 0.68)'
      ctx.beginPath()
      ctx.arc(x + 0.9, y + 0.9, r * 0.84, 0, Math.PI * 2)
      ctx.fill()
    }
    return this.configureSmoothTexture(new THREE.CanvasTexture(c), false)
  }

  // ============================================================================
  // 超高亮度强化版等离子激光巨柱着色器 (保证在任何视角与距离下都极其醒目震撼！)
  // ============================================================================
  public createCollimatedLaserCoreShader(ignitionThreshold = 0.0): THREE.ShaderMaterial {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uThrust: { value: 1.0 },
        uOverclock: { value: 0.0 },
        uIgnitionProgress: { value: 1.0 },
        uIgnitionThreshold: { value: ignitionThreshold }
      },
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
        uniform float uThrust;
        uniform float uOverclock;
        uniform float uIgnitionProgress;
        uniform float uIgnitionThreshold;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewDir;

        void main() {
          float ig = clamp((uIgnitionProgress - uIgnitionThreshold) * 4.5, 0.0, 1.0);
          if (ig <= 0.01 || uThrust <= 0.01) discard;

          float cosView = abs(dot(normalize(vNormal), normalize(vViewDir)));
          // 提高最低保底可见度 (0.35 + 0.65 * cosView)，使圆柱从侧面或远景看也绝不会变暗消失！
          float coreWhite = pow(cosView, 2.2);
          float solidPresence = 0.38 + 0.62 * pow(cosView, 1.1);

          // 10 节高对比度超音速马赫激波环
          float machWave = sin(vUv.y * 85.0 - uTime * 30.0);
          float shockDiamond = exp(-pow(machWave, 2.0) * 10.0) * smoothstep(0.65, 0.0, vUv.y);

          float flow = 0.90 + 0.10 * sin(vUv.y * 42.0 - uTime * 45.0);
          float vFade = pow(max(0.0, 1.0 - vUv.y), 0.95) * smoothstep(0.0, 0.01, vUv.y);
          float growMask = smoothstep(vUv.y, vUv.y - 0.1, ig);

          // HDR 级高亮白青核心 (#f0ffff * 1.8) + 亮电光蓝外缘 (#00b8ff)
          vec3 cyanBeam = mix(vec3(0.05, 0.75, 1.0), vec3(1.35, 1.75, 2.1), coreWhite * 0.85 + shockDiamond * 0.65);
          vec3 goldBeam = mix(vec3(1.0, 0.58, 0.10), vec3(1.85, 1.65, 1.2), coreWhite * 0.85 + shockDiamond * 0.65);
          vec3 finalCol = mix(cyanBeam, goldBeam, uOverclock) * flow;

          float alpha = clamp((solidPresence * 0.92 + shockDiamond * 0.65) * vFade * growMask * clamp(uThrust, 0.35, 1.25), 0.0, 0.98);
          gl_FragColor = vec4(finalCol, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    })
  }

  public createHelicalVortexSheathShader(ignitionThreshold = 0.0): THREE.ShaderMaterial {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uThrust: { value: 1.0 },
        uOverclock: { value: 0.0 },
        uIgnitionProgress: { value: 1.0 },
        uIgnitionThreshold: { value: ignitionThreshold }
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
        uniform float uThrust;
        uniform float uOverclock;
        uniform float uIgnitionProgress;
        uniform float uIgnitionThreshold;
        varying vec2 vUv;

        void main() {
          float ig = clamp((uIgnitionProgress - uIgnitionThreshold) * 4.5, 0.0, 1.0);
          if (ig <= 0.01 || uThrust <= 0.01) discard;

          float centerDist = abs(vUv.x - 0.5) * 2.0;
          float gaussX = exp(-pow(centerDist * 2.1, 2.0));
          float coreX = exp(-pow(centerDist * 4.5, 2.0));

          float featherY = pow(max(0.0, 1.0 - vUv.y), 1.1) * smoothstep(0.0, 0.015, vUv.y);
          float growMask = smoothstep(vUv.y, vUv.y - 0.12, ig);
          float pulse = 0.88 + 0.12 * sin(vUv.y * 28.0 - uTime * 22.0);

          vec3 colBlue = mix(vec3(0.05, 0.72, 1.0), vec3(1.2, 1.6, 1.9), coreX);
          vec3 colGold = mix(vec3(1.0, 0.48, 0.08), vec3(1.6, 1.4, 1.0), coreX);
          vec3 col = mix(colBlue, colGold, uOverclock) * pulse;

          float alpha = clamp(gaussX * 0.65 * featherY * growMask * clamp(uThrust, 0.35, 1.25), 0.0, 0.72);
          gl_FragColor = vec4(col, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    })
  }

  public createRisingIonParticlesShader(
    plumeHeight: number,
    ignitionThreshold = 0.0
  ): THREE.ShaderMaterial {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uThrust: { value: 1.0 },
        uOverclock: { value: 0.0 },
        uIgnitionProgress: { value: 1.0 },
        uIgnitionThreshold: { value: ignitionThreshold },
        uSprite: { value: this.softGlowSprite },
        uPlumeHeight: { value: plumeHeight }
      },
      vertexShader: `
        attribute float aOffset;
        attribute float aSpeed;
        attribute float aRadial;
        uniform float uTime;
        uniform float uPlumeHeight;
        varying float vLife;

        void main() {
          float life = mod(aOffset + uTime * aSpeed, 1.0);
          vLife = life;

          vec3 pos = position;
          pos.y = life * uPlumeHeight;
          float spread = (1.0 + life * 1.35) * aRadial;
          pos.x *= spread;
          pos.z *= spread;

          vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = clamp((1.0 - life * 0.6) * (68.0 / -mvPos.z), 2.0, 11.0);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        uniform sampler2D uSprite;
        uniform float uThrust;
        uniform float uOverclock;
        uniform float uIgnitionProgress;
        uniform float uIgnitionThreshold;
        varying float vLife;

        void main() {
          float ig = clamp((uIgnitionProgress - uIgnitionThreshold) * 4.5, 0.0, 1.0);
          if (ig <= 0.01 || uThrust <= 0.01) discard;
          if (vLife > ig) discard;

          vec4 tex = texture2D(uSprite, gl_PointCoord);
          vec3 normalCol = mix(vec3(1.2, 1.5, 1.8), vec3(0.0, 0.75, 1.0), smoothstep(0.0, 0.4, vLife));
          vec3 overCol = mix(vec3(1.5, 1.4, 1.0), vec3(1.0, 0.5, 0.05), smoothstep(0.0, 0.4, vLife));
          vec3 col = mix(normalCol, overCol, uOverclock);

          float alpha = tex.a * pow(1.0 - vLife, 1.2) * 0.9 * ig;
          gl_FragColor = vec4(col, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  }

  // ============================================================================
  // 重工业钢铁行星发动机 + 2.2倍加粗加亮激光巨柱 + 喷口高能星芒耀斑
  // ============================================================================
  public buildBrutalistPlanetaryEngine(
    scale = 1.0,
    plumeHeight = 24.0,
    ignitionThreshold = 0.0
  ): BrutalistEngineRig {
    const group = new THREE.Group()
    const strobes: THREE.Mesh[] = []
    const mistSprites: THREE.Sprite[] = []

    const heavyCastSteelMat = new THREE.MeshStandardMaterial({
      color: 0x3e4b5e,
      map: this.steelAlbedo,
      normalMap: this.steelNormal,
      normalScale: new THREE.Vector2(1.5, 1.5),
      roughnessMap: this.steelRoughness,
      metalness: 0.86,
      roughness: 0.38,
      envMapIntensity: 2.2
    })

    const darkForgedIronMat = new THREE.MeshStandardMaterial({
      color: 0x222a36,
      normalMap: this.steelNormal,
      roughnessMap: this.steelRoughness,
      metalness: 0.88,
      roughness: 0.34,
      envMapIntensity: 2.0
    })

    const chromeHydraulicMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.94,
      roughness: 0.14,
      envMapIntensity: 2.4
    })

    const orangeGantryMat = new THREE.MeshBasicMaterial({
      map: this.furnaceWindowTex,
      color: 0xff9922
    })
    const cyanSlitMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff })
    const redStrobeMat = new THREE.MeshBasicMaterial({ color: 0xff2a4d })

    const subterraneanSkirt = new THREE.Mesh(
      new THREE.CylinderGeometry(1.15, 1.45, 0.52, 8),
      darkForgedIronMat
    )
    subterraneanSkirt.position.y = -0.08
    group.add(subterraneanSkirt)

    const outerApronRing = new THREE.Mesh(
      new THREE.CylinderGeometry(0.92, 1.18, 0.22, 8),
      heavyCastSteelMat
    )
    outerApronRing.position.y = 0.16
    group.add(outerApronRing)

    const lowerOctagon = new THREE.Mesh(
      new THREE.CylinderGeometry(0.52, 0.84, 0.42, 8),
      heavyCastSteelMat
    )
    lowerOctagon.position.y = 0.38
    const upperWaist = new THREE.Mesh(
      new THREE.CylinderGeometry(0.44, 0.52, 0.28, 16),
      heavyCastSteelMat
    )
    upperWaist.position.y = 0.70
    group.add(lowerOctagon, upperWaist)

    for (let t = 0; t < 6; t++) {
      const r = 0.78 - t * 0.052
      const y = 0.22 + t * 0.095
      const gantryWin = new THREE.Mesh(
        new THREE.CylinderGeometry(r, r + 0.01, 0.025, 16, 1, true),
        orangeGantryMat
      )
      gantryWin.position.y = y
      const girder = new THREE.Mesh(
        new THREE.TorusGeometry(r + 0.02, 0.016, 8, 24),
        darkForgedIronMat
      )
      girder.rotation.x = Math.PI * 0.5
      girder.position.y = y + 0.015
      group.add(gantryWin, girder)
    }

    for (let i = 0; i < 24; i++) {
      const ang = (i / 24) * Math.PI * 2
      const rib = new THREE.Mesh(new THREE.BoxGeometry(0.026, 0.65, 0.14), heavyCastSteelMat)
      rib.position.set(Math.cos(ang) * 0.58, 0.48, Math.sin(ang) * 0.58)
      rib.rotation.y = -ang
      rib.rotation.x = -0.26
      group.add(rib)

      const slit = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.18, 0.035), cyanSlitMat)
      slit.position.set(Math.cos(ang) * 0.48, 0.72, Math.sin(ang) * 0.48)
      slit.rotation.y = -ang
      slit.rotation.x = -0.15
      group.add(slit)
    }

    for (let i = 0; i < 8; i++) {
      const ang = (i / 8) * Math.PI * 2
      const legGroup = new THREE.Group()
      legGroup.rotation.y = ang

      const mainLeg = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.92, 0.22), heavyCastSteelMat)
      mainLeg.position.set(0, 0.36, 0.78)
      mainLeg.rotation.x = -0.72
      legGroup.add(mainLeg)

      for (const side of [-0.085, 0.085]) {
        const piston = new THREE.Mesh(
          new THREE.CylinderGeometry(0.022, 0.022, 0.65, 10),
          chromeHydraulicMat
        )
        piston.position.set(side, 0.32, 0.86)
        piston.rotation.x = -0.72
        legGroup.add(piston)
      }

      const footBlock = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.24, 0.38), darkForgedIronMat)
      footBlock.position.set(0, 0.02, 1.12)
      legGroup.add(footBlock)

      const strobe = new THREE.Mesh(new THREE.SphereGeometry(0.028, 8, 8), redStrobeMat)
      strobe.position.set(0, 0.18, 1.24)
      legGroup.add(strobe)
      strobes.push(strobe)

      group.add(legGroup)
    }

    const nozzleCollar = new THREE.Mesh(
      new THREE.TorusGeometry(0.45, 0.05, 12, 32),
      darkForgedIronMat
    )
    nozzleCollar.rotation.x = Math.PI * 0.5
    nozzleCollar.position.y = 0.84
    group.add(nozzleCollar)

    const throatCore = new THREE.Mesh(
      new THREE.CircleGeometry(0.42, 32),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    )
    throatCore.rotation.x = -Math.PI * 0.5
    throatCore.position.y = 0.82
    group.add(throatCore)

    // 强化版等离子激光巨柱组装 (直径加宽 2.2 倍，高度 24 单位，带喷口高亮星芒耀斑)
    const plumeAssembly = new THREE.Group()
    plumeAssembly.position.y = 0.82

    const coreLaserMat = this.createCollimatedLaserCoreShader(ignitionThreshold)
    const vortexSheathMat = this.createHelicalVortexSheathShader(ignitionThreshold)
    const ionSparksMat = this.createRisingIonParticlesShader(plumeHeight, ignitionThreshold)

    // 1. 加粗的高亮内芯等离子柱 (底半径 0.38 -> 顶半径 0.62)
    const innerCoreGeo = new THREE.CylinderGeometry(0.62, 0.38, plumeHeight, 32, 32, true)
    innerCoreGeo.translate(0, plumeHeight * 0.5, 0)
    plumeAssembly.add(new THREE.Mesh(innerCoreGeo, coreLaserMat))

    // 2. 加宽至 2.4 单位的 4 张交叉体积神光平面
    const planeGeo = new THREE.PlaneGeometry(2.4, plumeHeight, 1, 24)
    planeGeo.translate(0, plumeHeight * 0.5, 0)
    for (let p = 0; p < 4; p++) {
      const plane = new THREE.Mesh(planeGeo, vortexSheathMat)
      plane.rotation.y = (p * Math.PI) / 4
      plumeAssembly.add(plane)
    }

    // 3. 喷口中心高能聚变星芒耀斑 (Nozzle Star-Flare Sprite，确保任何角度看去喷口都像一颗璀璨恒星！)
    const flareMat = new THREE.SpriteMaterial({
      map: this.softGlowSprite,
      color: 0xb8f4ff,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
    const nozzleFlare = new THREE.Sprite(flareMat)
    nozzleFlare.position.set(0, 0.35, 0)
    nozzleFlare.scale.set(3.2, 3.2, 1.0)
    plumeAssembly.add(nozzleFlare)

    // 4. 底部电离云雾
    const collarMistMat = new THREE.SpriteMaterial({
      map: this.mistSpriteTex,
      color: 0x99ebff,
      transparent: true,
      opacity: 0.42,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
    for (let m = 0; m < 10; m++) {
      const sp = new THREE.Sprite(collarMistMat)
      const a = (m / 10) * Math.PI * 2
      sp.position.set(Math.cos(a) * 0.45, 0.18 + (m % 3) * 0.14, Math.sin(a) * 0.45)
      sp.scale.set(1.4, 0.65, 1)
      plumeAssembly.add(sp)
      mistSprites.push(sp)
    }

    // 5. 900 颗向上高速喷射的蓝白离子星点
    const pCount = 900
    const pPos = new Float32Array(pCount * 3)
    const pOffset = new Float32Array(pCount)
    const pSpeed = new Float32Array(pCount)
    const pRadial = new Float32Array(pCount)

    for (let i = 0; i < pCount; i++) {
      const a = Math.random() * Math.PI * 2
      const r = 0.06 + Math.random() * 0.38
      pPos[i * 3] = Math.cos(a) * r
      pPos[i * 3 + 1] = 0
      pPos[i * 3 + 2] = Math.sin(a) * r
      pOffset[i] = Math.random()
      pSpeed[i] = 0.5 + Math.random() * 0.7
      pRadial[i] = 0.75 + Math.random() * 0.6
    }
    const ptsGeo = new THREE.BufferGeometry()
    ptsGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    ptsGeo.setAttribute('aOffset', new THREE.BufferAttribute(pOffset, 1))
    ptsGeo.setAttribute('aSpeed', new THREE.BufferAttribute(pSpeed, 1))
    ptsGeo.setAttribute('aRadial', new THREE.BufferAttribute(pRadial, 1))
    plumeAssembly.add(new THREE.Points(ptsGeo, ionSparksMat))

    group.add(plumeAssembly)
    group.scale.setScalar(scale)

    return {
      group,
      plumeAssembly,
      coreLaserMat,
      vortexSheathMat,
      ionSparksMat,
      strobes,
      mistSprites,
      nozzleFlare
    }
  }

  public buildGimbalSteeringEngineUnit(
    scale = 1.0,
    plumeLength = 22.0
  ): BrutalistEngineRig {
    const group = new THREE.Group()

    const castSteelMat = new THREE.MeshStandardMaterial({
      color: 0x2c3646,
      map: this.steelAlbedo,
      normalMap: this.steelNormal,
      roughnessMap: this.steelRoughness,
      metalness: 0.86,
      roughness: 0.38,
      envMapIntensity: 2.0
    })

    const embeddedFoundation = new THREE.Mesh(
      new THREE.CylinderGeometry(1.15, 1.45, 0.55, 8),
      castSteelMat
    )
    embeddedFoundation.position.y = -0.1
    group.add(embeddedFoundation)

    for (const xSide of [-0.62, 0.62]) {
      const trunnion = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.82, 0.55), castSteelMat)
      trunnion.position.set(xSide, 0.42, 0)
      group.add(trunnion)
    }

    const innerRig = this.buildBrutalistPlanetaryEngine(0.95, plumeLength, 0.0)
    innerRig.group.position.set(0, 0.32, 0)
    innerRig.group.rotation.x = Math.PI * 0.5 - 0.42
    group.add(innerRig.group)

    group.scale.setScalar(scale)
    return {
      group,
      plumeAssembly: innerRig.plumeAssembly,
      coreLaserMat: innerRig.coreLaserMat,
      vortexSheathMat: innerRig.vortexSheathMat,
      ionSparksMat: innerRig.ionSparksMat,
      strobes: innerRig.strobes,
      mistSprites: innerRig.mistSprites,
      nozzleFlare: innerRig.nozzleFlare
    }
  }

  public buildIntegratedSpaceElevatorSystem(
    earthRadius = 100.0,
    stationRadius = 138.0
  ): {
    systemGroup: THREE.Group
    climberPods: THREE.Group[]
    ringUpper: THREE.Group
    ringLower: THREE.Group
    strobes: THREE.Mesh[]
  } {
    const systemGroup = new THREE.Group()
    const climberPods: THREE.Group[] = []
    const strobes: THREE.Mesh[] = []

    const silverTrussMat = new THREE.MeshStandardMaterial({
      color: 0xb4c2d4,
      normalMap: this.steelNormal,
      roughnessMap: this.steelRoughness,
      metalness: 0.86,
      roughness: 0.26,
      envMapIntensity: 2.1
    })
    const darkArmorMat = new THREE.MeshStandardMaterial({
      color: 0x283344,
      map: this.steelAlbedo,
      normalMap: this.steelNormal,
      metalness: 0.88,
      roughness: 0.34,
      envMapIntensity: 2.0
    })
    const moduleHullMat = new THREE.MeshStandardMaterial({
      color: 0xdce4ee,
      map: this.champagneHullTex,
      normalMap: this.steelNormal,
      metalness: 0.8,
      roughness: 0.24,
      envMapIntensity: 2.0
    })
    const solarArrayMat = new THREE.MeshStandardMaterial({
      map: this.solarWingTex,
      bumpMap: this.solarWingTex,
      bumpScale: 0.015,
      color: 0x60a5fa,
      metalness: 0.88,
      roughness: 0.16,
      envMapIntensity: 2.2,
      side: THREE.DoubleSide
    })
    const warmWindowMat = new THREE.MeshBasicMaterial({
      map: this.furnaceWindowTex,
      color: 0xffebb3
    })
    const cyanGlowMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff })
    const redBeaconMat = new THREE.MeshBasicMaterial({ color: 0xff2a4d })

    const anchorGroup = new THREE.Group()
    anchorGroup.position.y = earthRadius - 0.15

    const subFoundation = new THREE.Mesh(
      new THREE.CylinderGeometry(1.55, 1.95, 0.45, 8),
      darkArmorMat
    )
    subFoundation.position.y = 0.05
    const upperFortress = new THREE.Mesh(
      new THREE.CylinderGeometry(1.05, 1.42, 0.35, 8),
      silverTrussMat
    )
    upperFortress.position.y = 0.42
    const windowRing = new THREE.Mesh(
      new THREE.CylinderGeometry(1.25, 1.25, 0.1, 16, 1, true),
      warmWindowMat
    )
    windowRing.position.y = 0.32
    anchorGroup.add(subFoundation, upperFortress, windowRing)

    for (let t = 0; t < 4; t++) {
      const ang = (t / 4) * Math.PI * 2 + Math.PI * 0.25
      const pylon = new THREE.Group()
      pylon.rotation.y = ang

      const towerBody = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.35, 0.18), silverTrussMat)
      towerBody.position.set(0, 0.85, 0.72)
      towerBody.rotation.x = -0.12
      const rail = new THREE.Mesh(new THREE.BoxGeometry(0.03, 1.3, 0.03), cyanGlowMat)
      rail.position.set(0, 0.85, 0.62)
      rail.rotation.x = -0.12
      pylon.add(towerBody, rail)
      anchorGroup.add(pylon)
    }
    systemGroup.add(anchorGroup)

    const tetherSpan = stationRadius - earthRadius + 4.0
    const cableMat = new THREE.MeshStandardMaterial({
      color: 0xdbeafe,
      emissive: 0x0284c7,
      emissiveIntensity: 0.5,
      metalness: 0.92,
      roughness: 0.15
    })
    for (let c = 0; c < 3; c++) {
      const a = (c / 3) * Math.PI * 2
      const cableGeo = new THREE.CylinderGeometry(0.022, 0.022, tetherSpan, 8)
      cableGeo.translate(0, tetherSpan * 0.5, 0)
      const cable = new THREE.Mesh(cableGeo, cableMat)
      cable.position.set(Math.cos(a) * 0.22, earthRadius, Math.sin(a) * 0.22)
      systemGroup.add(cable)
    }

    for (let p = 0; p < 2; p++) {
      const pod = new THREE.Group()
      pod.position.y = earthRadius + 2.0 + p * 16.0

      const carriage = new THREE.Mesh(
        new THREE.CylinderGeometry(0.32, 0.35, 0.85, 12),
        moduleHullMat
      )
      const cabinLight = new THREE.Mesh(
        new THREE.CylinderGeometry(0.34, 0.34, 0.2, 12, 1, true),
        warmWindowMat
      )
      const magRing = new THREE.Mesh(
        new THREE.TorusGeometry(0.35, 0.025, 8, 24),
        cyanGlowMat
      )
      magRing.rotation.x = Math.PI * 0.5
      magRing.position.y = -0.35
      pod.add(carriage, cabinLight, magRing)

      const thruster = new THREE.Mesh(
        new THREE.ConeGeometry(0.16, 1.1, 12),
        new THREE.MeshBasicMaterial({
          color: 0x60f0ff,
          transparent: true,
          opacity: 0.85,
          blending: THREE.AdditiveBlending
        })
      )
      thruster.rotation.x = Math.PI
      thruster.position.y = -0.95
      pod.add(thruster)

      systemGroup.add(pod)
      climberPods.push(pod)
    }

    const stationGroup = new THREE.Group()
    stationGroup.position.y = stationRadius

    const dockingBay = new THREE.Mesh(
      new THREE.CylinderGeometry(0.55, 0.68, 1.2, 16, 1, true),
      darkArmorMat
    )
    dockingBay.position.y = -2.8
    const dockingGlowRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.66, 0.035, 8, 32),
      cyanGlowMat
    )
    dockingGlowRing.rotation.x = Math.PI * 0.5
    dockingGlowRing.position.y = -3.4
    stationGroup.add(dockingBay, dockingGlowRing)

    const spineLength = 12.0
    const corners = [
      [-0.22, -0.22],
      [0.22, -0.22],
      [-0.22, 0.22],
      [0.22, 0.22]
    ]
    corners.forEach(([cx, cz]) => {
      const beam = new THREE.Mesh(
        new THREE.CylinderGeometry(0.025, 0.025, spineLength, 8),
        silverTrussMat
      )
      beam.position.set(cx, 1.5, cz)
      stationGroup.add(beam)
    })

    for (let i = -8; i <= 14; i++) {
      const y = i * 0.5
      const frame = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.03, 0.46), silverTrussMat)
      frame.position.y = y
      stationGroup.add(frame)

      if (i % 3 === 0 && i >= -3) {
        const coreMod = new THREE.Mesh(
          new THREE.CylinderGeometry(0.22, 0.22, 0.85, 16),
          moduleHullMat
        )
        coreMod.position.y = y
        stationGroup.add(coreMod)
      }
    }

    const buildCentrifugeRing = (radius: number) => {
      const rGroup = new THREE.Group()
      const torus = new THREE.Mesh(
        new THREE.TorusGeometry(radius, 0.12, 16, 72),
        moduleHullMat
      )
      torus.rotation.x = Math.PI * 0.5
      torus.scale.set(1, 1, 0.65)
      rGroup.add(torus)

      const winBand = new THREE.Mesh(
        new THREE.TorusGeometry(radius - 0.1, 0.035, 8, 72),
        warmWindowMat
      )
      winBand.rotation.x = Math.PI * 0.5
      rGroup.add(winBand)

      for (let s = 0; s < 6; s++) {
        const spoke = new THREE.Mesh(
          new THREE.CylinderGeometry(0.024, 0.024, radius * 2, 8),
          silverTrussMat
        )
        spoke.rotation.z = Math.PI * 0.5
        spoke.rotation.y = (s / 6) * Math.PI
        rGroup.add(spoke)
      }
      return rGroup
    }

    const ringUpper = buildCentrifugeRing(2.2)
    ringUpper.position.y = 0.4
    const ringLower = buildCentrifugeRing(1.75)
    ringLower.position.y = -0.9
    stationGroup.add(ringUpper, ringLower)

    const crossBoom = new THREE.Mesh(new THREE.BoxGeometry(11.5, 0.12, 0.12), silverTrussMat)
    crossBoom.position.y = 2.4
    stationGroup.add(crossBoom)

    for (const side of [-1, 1]) {
      for (let wIdx = 0; wIdx < 2; wIdx++) {
        const xPos = side * (1.85 + wIdx * 1.55)
        for (const zDir of [-1, 1]) {
          const mast = new THREE.Mesh(
            new THREE.CylinderGeometry(0.02, 0.02, 4.4, 8),
            silverTrussMat
          )
          mast.rotation.x = Math.PI * 0.5
          mast.position.set(xPos, 2.4, zDir * 2.35)
          stationGroup.add(mast)

          for (const strip of [-0.18, 0.18]) {
            const wing = new THREE.Mesh(
              new THREE.BoxGeometry(0.28, 0.012, 4.2),
              solarArrayMat
            )
            wing.position.set(xPos + strip, 2.4, zDir * 2.35)
            wing.rotation.z = 0.08
            stationGroup.add(wing)
          }
        }
      }
    }

    for (const yPos of [-3.4, 0.4, 4.5, 7.5]) {
      const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.055, 8, 8), redBeaconMat)
      beacon.position.set(0, yPos, 0.32)
      stationGroup.add(beacon)
      strobes.push(beacon)
    }

    systemGroup.add(stationGroup)

    return {
      systemGroup,
      climberPods,
      ringUpper,
      ringLower,
      strobes
    }
  }

  public buildHabitatRingAurora(): THREE.Group {
    const aurora = new THREE.Group()

    const champagneTitaniumMat = new THREE.MeshStandardMaterial({
      color: 0xdce4ee,
      map: this.champagneHullTex,
      normalMap: this.steelNormal,
      normalScale: new THREE.Vector2(1.0, 1.0),
      roughnessMap: this.steelRoughness,
      metalness: 0.85,
      roughness: 0.24,
      envMapIntensity: 2.1
    })
    const slateTrimMat = new THREE.MeshStandardMaterial({
      color: 0x3b4656,
      normalMap: this.steelNormal,
      roughnessMap: this.steelRoughness,
      metalness: 0.88,
      roughness: 0.3,
      envMapIntensity: 2.0
    })
    const warmBiosphereMat = new THREE.MeshBasicMaterial({
      map: this.furnaceWindowTex,
      color: 0xffebb3
    })

    const outerBevelRing = new THREE.Mesh(
      new THREE.TorusGeometry(4.8, 0.55, 24, 96),
      champagneTitaniumMat
    )
    outerBevelRing.scale.set(1, 1, 0.32)

    const outerTrimRing = new THREE.Mesh(
      new THREE.TorusGeometry(5.32, 0.08, 12, 96),
      slateTrimMat
    )
    outerTrimRing.scale.set(1, 1, 0.4)

    const innerBevelRing = new THREE.Mesh(
      new THREE.TorusGeometry(3.35, 0.36, 20, 80),
      champagneTitaniumMat
    )
    innerBevelRing.scale.set(1, 1, 0.32)

    aurora.add(outerBevelRing, outerTrimRing, innerBevelRing)

    const outerBiosphereBand = new THREE.Mesh(
      new THREE.TorusGeometry(4.28, 0.14, 12, 96),
      warmBiosphereMat
    )
    outerBiosphereBand.scale.set(1, 1, 0.45)

    const innerBiosphereBand = new THREE.Mesh(
      new THREE.TorusGeometry(3.02, 0.09, 12, 80),
      warmBiosphereMat
    )
    innerBiosphereBand.scale.set(1, 1, 0.45)
    aurora.add(outerBiosphereBand, innerBiosphereBand)

    for (let i = 0; i < 8; i++) {
      const ang = (i / 8) * Math.PI
      const spoke = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.03, 9.6, 8),
        slateTrimMat
      )
      spoke.rotation.z = ang
      aurora.add(spoke)
    }

    const flatDiscHub = new THREE.Mesh(
      new THREE.CylinderGeometry(0.65, 0.52, 0.42, 32),
      champagneTitaniumMat
    )
    flatDiscHub.rotation.x = Math.PI * 0.5
    aurora.add(flatDiscHub)

    const hubDome = new THREE.Mesh(
      new THREE.SphereGeometry(0.36, 24, 16),
      slateTrimMat
    )
    hubDome.scale.set(1, 1, 0.45)
    aurora.add(hubDome)

    return aurora
  }

  public buildDeepSpaceRelayFleet(): {
    group: THREE.Group
    laserShaderMat: THREE.ShaderMaterial
  } {
    const fleet = new THREE.Group()

    const goldMirrorMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      metalness: 0.94,
      roughness: 0.12,
      envMapIntensity: 2.2
    })
    const silverShieldMat = new THREE.MeshStandardMaterial({
      color: 0xcbd5e1,
      normalMap: this.steelNormal,
      metalness: 0.86,
      roughness: 0.22,
      envMapIntensity: 1.9,
      side: THREE.DoubleSide
    })
    const darkStrutMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.85,
      roughness: 0.3
    })

    const laserShaderMat = new THREE.ShaderMaterial({
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
          float pulse = pow(0.5 + 0.5 * sin(vUv.y * 36.0 - uTime * 14.0), 6.0);
          vec3 col = mix(vec3(0.0, 0.72, 1.0), vec3(0.9, 1.0, 1.0), pulse);
          gl_FragColor = vec4(col, 0.28 + pulse * 0.45);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    const buildHexMirrorObservatory = (scale = 1.0) => {
      const sat = new THREE.Group()

      const hexR = 0.24
      const hexGeo = new THREE.CylinderGeometry(hexR * 0.94, hexR * 0.94, 0.04, 6)
      hexGeo.rotateX(Math.PI * 0.5)

      const hexCoords: [number, number][] = [[0, 0]]
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2
        hexCoords.push([Math.cos(a) * hexR * 1.75, Math.sin(a) * hexR * 1.75])
      }
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2
        hexCoords.push([Math.cos(a) * hexR * 3.42, Math.sin(a) * hexR * 3.42])
      }
      hexCoords.forEach(([hx, hy]) => {
        const m = new THREE.Mesh(hexGeo, goldMirrorMat)
        m.position.set(hx, hy, 0)
        sat.add(m)
      })

      for (let b = 0; b < 3; b++) {
        const a = (b / 3) * Math.PI * 2 + Math.PI / 6
        const strut = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 1.18, 6), darkStrutMat)
        strut.position.set(Math.cos(a) * 0.44, Math.sin(a) * 0.44, 0.55)
        strut.lookAt(0, 0, 1.1)
        strut.rotateX(Math.PI * 0.5)
        sat.add(strut)
      }
      const secMirror = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.05, 6), goldMirrorMat)
      secMirror.rotation.x = Math.PI * 0.5
      secMirror.position.z = 1.1
      sat.add(secMirror)

      for (let l = 0; l < 4; l++) {
        const shield = new THREE.Mesh(
          new THREE.BoxGeometry(2.1 - l * 0.08, 1.25 - l * 0.05, 0.012),
          silverShieldMat
        )
        shield.position.set(0, -0.55 - l * 0.08, -0.22)
        shield.rotation.x = Math.PI * 0.47
        shield.rotation.z = Math.PI * 0.25
        sat.add(shield)
      }

      sat.scale.setScalar(scale)
      return sat
    }

    const coords = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-3.2, 1.1, -2.4),
      new THREE.Vector3(3.5, -0.85, -2.1),
      new THREE.Vector3(-6.0, -1.2, -5.0),
      new THREE.Vector3(6.2, 1.4, -4.8)
    ]
    coords.forEach((p, idx) => {
      const pr = buildHexMirrorObservatory(idx === 0 ? 1.15 : 0.85)
      pr.position.copy(p)
      pr.rotation.y = 0.22
      fleet.add(pr)
    })

    const links: [number, number][] = [
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 4]
    ]
    links.forEach(([a, b]) => {
      const pA = coords[a]
      const pB = coords[b]
      const len = pA.distanceTo(pB)
      const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, len, 6), laserShaderMat)
      beam.position.copy(pA).lerp(pB, 0.5)
      beam.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), pB.clone().sub(pA).normalize())
      fleet.add(beam)
    })

    return { group: fleet, laserShaderMat }
  }

  public buildPhotorealisticLuna(moonRadius = 27.0): {
    group: THREE.Group
    lunarRigs: BrutalistEngineRig[]
  } {
    const group = new THREE.Group()
    const lunarRigs: BrutalistEngineRig[] = []

    const moonMat = new THREE.MeshStandardMaterial({
      map: this.moonRegolithTex,
      bumpMap: this.moonRegolithTex,
      bumpScale: 0.65,
      color: 0x72767e,
      roughness: 0.94,
      metalness: 0.02,
      envMapIntensity: 0.35
    })

    const loader = new THREE.TextureLoader()
    loader.setCrossOrigin('anonymous')
    loader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/moon_1024.jpg',
      (tex) => {
        tex.minFilter = THREE.LinearMipmapLinearFilter
        tex.magFilter = THREE.LinearFilter
        moonMat.map = tex
        moonMat.bumpMap = tex
        moonMat.needsUpdate = true
      }
    )

    const moonMesh = new THREE.Mesh(new THREE.SphereGeometry(moonRadius, 96, 96), moonMat)
    group.add(moonMesh)

    const engineNormals = [
      new THREE.Vector3(0.32, 0.18, 0.93).normalize(),
      new THREE.Vector3(0.42, 0.28, 0.86).normalize(),
      new THREE.Vector3(0.22, 0.08, 0.97).normalize()
    ]
    engineNormals.forEach((n, idx) => {
      const rig = this.buildBrutalistPlanetaryEngine(idx === 0 ? 0.42 : 0.35, 14.0, 0.0)
      rig.group.position.copy(n.clone().multiplyScalar(moonRadius - 0.12))
      rig.group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), n)
      group.add(rig.group)
      lunarRigs.push(rig)
    })

    return { group, lunarRigs }
  }
}
