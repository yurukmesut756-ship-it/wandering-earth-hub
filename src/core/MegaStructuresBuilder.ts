import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

export interface BrutalistEngineRig {
  group: THREE.Group
  plumeAssembly: THREE.Group
  coreLaserMat: THREE.ShaderMaterial
  vortexSheathMat: THREE.ShaderMaterial
  shockRingMat: THREE.ShaderMaterial
  ionSparksMat: THREE.ShaderMaterial
  strobes: THREE.Mesh[]
}

export class MegaStructuresBuilder {
  // 真 PBR 工业金属贴图组 (Albedo + Sobel Normal Map + Roughness Map)
  public steelAlbedo: THREE.CanvasTexture
  public steelNormal: THREE.CanvasTexture
  public steelRoughness: THREE.CanvasTexture
  public furnaceWindowTex: THREE.CanvasTexture
  public champagneHullTex: THREE.CanvasTexture
  public bronzeSolarTex: THREE.CanvasTexture

  // 分形高精星球贴图
  public frozenEarthDayTex: THREE.CanvasTexture
  public frozenEarthBumpTex: THREE.CanvasTexture
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
    this.bronzeSolarTex = this.createBronzeGoldSolarTexture()

    const earthTex = this.createFractalFrozenEarthTextures()
    this.frozenEarthDayTex = earthTex.day
    this.frozenEarthBumpTex = earthTex.bump
    this.frozenEarthNightTex = earthTex.night

    this.fluffyCloudsTex = this.createFractalCloudsTexture()
    this.moonRegolithTex = this.createApolloLunarRegolithTexture()
    this.softGlowSprite = this.createSoftRadialGlowSprite()
    this.mistSpriteTex = this.createVolumetricMistTexture()
  }

  // ============================================================================
  // 1. 高对比度重工业 HDR 环境反射贴图 (赋予铸钢与钛合金冷冽的边缘高光与深邃暗部)
  // ============================================================================
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
          // 强对比度工业反射环境：深邃太空黑 + 锐利大气蓝反光带 + 耀眼太阳高光点
          vec3 darkSpace = vec3(0.02, 0.04, 0.08);
          vec3 horizonStrip = vec3(0.22, 0.65, 1.35) * exp(-pow((d.y + 0.25) * 3.5, 2.0));
          float sunSpec = pow(max(0.0, dot(d, normalize(vec3(0.68, 0.35, 0.64)))), 32.0);
          vec3 col = darkSpace + horizonStrip + vec3(2.8, 2.4, 1.9) * sunSpec;
          gl_FragColor = vec4(col, 1.0);
        }
      `
    })
    envScene.add(new THREE.Mesh(new THREE.SphereGeometry(45, 32, 16), skyMat))

    const envMap = pmrem.fromScene(envScene, 0.025).texture
    pmrem.dispose()
    return envMap
  }

  // ============================================================================
  // 2. 真·切线空间法线贴图 (Sobel Normal Map) 与粗糙度贴图生成器 (彻底消灭塑料感！)
  // ============================================================================
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

    // 构建重型铸钢装甲板、深凹焊缝、加强肋与铆钉高度场
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const row = Math.floor(y / 64)
        const shift = (row % 2) * 48
        const sx = (x + shift) % 96
        const sy = y % 64

        // 装甲板深凹接缝
        const isSeam = sx < 4 || sy < 4
        // 内部加强瓦楞肋条
        const isRib = sy > 18 && sy < 46 && sx % 16 < 4
        // 铆钉凸起
        const isRivet =
          (Math.hypot(sx - 10, sy - 10) < 3.2) ||
          (Math.hypot(sx - 86, sy - 10) < 3.2) ||
          (Math.hypot(sx - 10, sy - 54) < 3.2) ||
          (Math.hypot(sx - 86, sy - 54) < 3.2)

        // 高频铸铁砂眼颗粒噪波
        const grain = (Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1
        let h = 0.5 + grain * 0.08
        if (isSeam) h = 0.1
        else if (isRivet) h = 0.92
        else if (isRib) h = 0.72

        heightData[y * size + x] = h

        // Albedo: 深沉重工业炭钢色 + 接缝环境光遮蔽 (AO) + 边缘磨损亮边
        const plateShade = ((row + Math.floor((x + shift) / 96)) % 3) * 6
        let baseVal = 28 + plateShade + grain * 8
        if (isSeam) baseVal = 10
        else if (isRivet) baseVal = 52
        else if (sx < 7 || sy < 7) baseVal += 14 // 装甲边缘高光磨损
        aCtx.fillStyle = `rgb(${baseVal}, ${baseVal + 4}, ${baseVal + 9})`
        aCtx.fillRect(x, y, 1, 1)

        // Roughness: 焊缝粗糙 (220)，板面中等拉丝 (115)，磨损边缘与铆钉高光低粗糙度 (55)
        let rVal = 115 + grain * 25
        if (isSeam) rVal = 230
        else if (isRivet || sx < 7 || sy < 7) rVal = 55
        rCtx.fillStyle = `rgb(${rVal}, ${rVal}, ${rVal})`
        rCtx.fillRect(x, y, 1, 1)
      }
    }

    // 使用 Sobel 算子将高度场转换为真 RGB 切线空间法线贴图 (Tangent-Space Normal Map)
    const normalC = document.createElement('canvas')
    normalC.width = size
    normalC.height = size
    const nCtx = normalC.getContext('2d')!
    const imgData = nCtx.createImageData(size, size)
    const strength = 5.5

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
          (heightData[ym * size + xm] + 2 * heightData[ym * size + x] + heightData[yp * size + xp])

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
      t.wrapS = THREE.RepeatWrapping
      t.wrapT = THREE.RepeatWrapping
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
    g.addColorStop(0.2, 'rgba(180, 245, 255, 0.9)')
    g.addColorStop(0.55, 'rgba(0, 195, 255, 0.28)')
    g.addColorStop(1, 'rgba(0, 0, 0, 0.0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 128, 128)
    return new THREE.CanvasTexture(c)
  }

  private createVolumetricMistTexture(): THREE.CanvasTexture {
    const c = document.createElement('canvas')
    c.width = 256
    c.height = 128
    const ctx = c.getContext('2d')!
    const g = ctx.createRadialGradient(128, 64, 6, 128, 64, 118)
    g.addColorStop(0, 'rgba(155, 210, 250, 0.38)')
    g.addColorStop(0.5, 'rgba(70, 130, 195, 0.15)')
    g.addColorStop(1, 'rgba(0, 0, 0, 0.0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 256, 128)
    return new THREE.CanvasTexture(c)
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
          ctx.fillStyle = Math.random() > 0.25 ? '#ff7700' : '#ffcc66'
          ctx.fillRect(col, row, 5, 4)
        }
      }
    }
    const tex = new THREE.CanvasTexture(c)
    tex.wrapS = THREE.RepeatWrapping
    tex.wrapT = THREE.RepeatWrapping
    tex.repeat.set(8, 1)
    return tex
  }

  private createChampagneBevelTexture(): THREE.CanvasTexture {
    const c = document.createElement('canvas')
    c.width = 512
    c.height = 512
    const ctx = c.getContext('2d')!
    ctx.fillStyle = '#c8c4bc'
    ctx.fillRect(0, 0, 512, 512)
    ctx.strokeStyle = '#6e6a63'
    ctx.lineWidth = 2.5
    for (let y = 0; y < 512; y += 64) {
      for (let x = 0; x < 512; x += 96) {
        ctx.fillStyle = (x + y) % 128 === 0 ? '#d8d4cc' : '#b8b4ac'
        ctx.fillRect(x + 2, y + 2, 92, 60)
        ctx.strokeRect(x, y, 96, 64)
      }
    }
    const tex = new THREE.CanvasTexture(c)
    tex.wrapS = THREE.RepeatWrapping
    tex.wrapT = THREE.RepeatWrapping
    tex.repeat.set(6, 2)
    return tex
  }

  private createBronzeGoldSolarTexture(): THREE.CanvasTexture {
    const c = document.createElement('canvas')
    c.width = 512
    c.height = 512
    const ctx = c.getContext('2d')!
    ctx.fillStyle = '#2c251e'
    ctx.fillRect(0, 0, 512, 512)
    ctx.strokeStyle = '#6e5636'
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
    ctx.strokeStyle = '#c49a52'
    ctx.lineWidth = 3.5
    for (let i = 64; i < 512; i += 128) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, 512)
      ctx.stroke()
    }
    const tex = new THREE.CanvasTexture(c)
    tex.wrapS = THREE.RepeatWrapping
    tex.wrapT = THREE.RepeatWrapping
    tex.repeat.set(3, 1)
    return tex
  }

  // ============================================================================
  // 3. 分形噪声冰封地球贴图 (告别画圆圈贴图，生成锯齿海岸线、冰川山脊与裂隙冰洋)
  // ============================================================================
  private fbm2D(x: number, y: number): number {
    let val = 0
    let amp = 0.5
    let freq = 1.0
    for (let i = 0; i < 6; i++) {
      const n = Math.sin(x * freq * 2.1 + Math.cos(y * freq * 1.9)) * Math.cos(y * freq * 2.3 - Math.sin(x * freq * 1.7))
      val += n * amp
      freq *= 2.15
      amp *= 0.5
    }
    return val * 0.5 + 0.5
  }

  private createFractalFrozenEarthTextures() {
    const w = 1024
    const h = 512
    const dayC = document.createElement('canvas')
    dayC.width = w
    dayC.height = h
    const dCtx = dayC.getContext('2d')!
    const dImg = dCtx.createImageData(w, h)

    const bumpC = document.createElement('canvas')
    bumpC.width = w
    bumpC.height = h
    const bCtx = bumpC.getContext('2d')!
    const bImg = bCtx.createImageData(w, h)

    const nightC = document.createElement('canvas')
    nightC.width = w
    nightC.height = h
    const nCtx = nightC.getContext('2d')!
    nCtx.fillStyle = '#000000'
    nCtx.fillRect(0, 0, w, h)

    // 真实大洲中心包络 (亚欧、北美、非洲、南美、澳洲)
    const centers = [
      { u: 0.65, v: 0.30, rx: 0.22, ry: 0.16 },
      { u: 0.54, v: 0.52, rx: 0.09, ry: 0.18 },
      { u: 0.22, v: 0.32, rx: 0.13, ry: 0.14 },
      { u: 0.30, v: 0.66, rx: 0.07, ry: 0.17 },
      { u: 0.80, v: 0.68, rx: 0.07, ry: 0.08 }
    ]

    for (let y = 0; y < h; y++) {
      const v = y / h
      const polarFactor = Math.pow(Math.abs(v - 0.5) * 2.0, 2.6)
      for (let x = 0; x < w; x++) {
        const u = x / w
        let mask = 0
        for (const c of centers) {
          const d = Math.hypot((u - c.u) / c.rx, (v - c.v) / c.ry)
          mask = Math.max(mask, Math.max(0, 1.0 - d * 0.85))
        }

        const n = this.fbm2D(u * 14.0, v * 7.0)
        const ridge = 1.0 - Math.abs(this.fbm2D(u * 28.0, v * 14.0) * 2.0 - 1.0)
        const elevation = mask * 0.75 + n * 0.45 + polarFactor * 0.35

        const idx = (y * w + x) * 4
        if (elevation > 0.58) {
          // 冰封大陆与高耸雪山山脉 (哑光冰原与深色裸岩山脊交错，绝非塑料色块)
          const mountainHeight = Math.min(1.0, (elevation - 0.58) * 2.4 + ridge * 0.45)
          const r = Math.round(95 + mountainHeight * 135)
          const g = Math.round(115 + mountainHeight * 130)
          const b = Math.round(140 + mountainHeight * 112)
          dImg.data[idx] = r
          dImg.data[idx + 1] = g
          dImg.data[idx + 2] = b
          dImg.data[idx + 3] = 255

          const bh = Math.round(128 + mountainHeight * 127)
          bImg.data[idx] = bh
          bImg.data[idx + 1] = bh
          bImg.data[idx + 2] = bh
          bImg.data[idx + 3] = 255
        } else {
          // 深邃结冰大洋与冰架裂隙
          const seaIce = Math.max(0, (elevation - 0.42) * 3.2)
          dImg.data[idx] = Math.round(10 + seaIce * 65)
          dImg.data[idx + 1] = Math.round(28 + seaIce * 85)
          dImg.data[idx + 2] = Math.round(58 + seaIce * 110)
          dImg.data[idx + 3] = 255

          bImg.data[idx] = Math.round(seaIce * 60)
          bImg.data[idx + 1] = Math.round(seaIce * 60)
          bImg.data[idx + 2] = Math.round(seaIce * 60)
          bImg.data[idx + 3] = 255
        }
      }
    }
    dCtx.putImageData(dImg, 0, 0)
    bCtx.putImageData(bImg, 0, 0)

    // 夜半球精细金色地下城路网与工业节点
    centers.forEach((c) => {
      nCtx.strokeStyle = 'rgba(255, 175, 65, 0.32)'
      nCtx.lineWidth = 1.0
      const nodes: [number, number][] = []
      for (let i = 0; i < 36; i++) {
        const nx = (c.u + (Math.random() - 0.5) * c.rx * 1.4) * w
        const ny = (c.v + (Math.random() - 0.5) * c.ry * 1.3) * h
        nodes.push([nx, ny])
        if (i > 0) {
          nCtx.beginPath()
          nCtx.moveTo(nodes[i - 1][0], nodes[i - 1][1])
          nCtx.lineTo(nx, ny)
          nCtx.stroke()
        }
        for (let p = 0; p < 24; p++) {
          const px = nx + (Math.random() - 0.5) * 28
          const py = ny + (Math.random() - 0.5) * 28
          nCtx.fillStyle = Math.random() > 0.25 ? '#ffaa33' : '#5ce1e6'
          nCtx.fillRect(px, py, 1.6, 1.6)
        }
      }
    })

    const dayTex = new THREE.CanvasTexture(dayC)
    dayTex.colorSpace = THREE.SRGBColorSpace
    return {
      day: dayTex,
      bump: new THREE.CanvasTexture(bumpC),
      night: new THREE.CanvasTexture(nightC)
    }
  }

  private createFractalCloudsTexture(): THREE.CanvasTexture {
    const c = document.createElement('canvas')
    c.width = 1024
    c.height = 512
    const ctx = c.getContext('2d')!
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, 1024, 512)

    for (let i = 0; i < 520; i++) {
      const x = Math.random() * 1024
      const y = 30 + Math.random() * 452
      const rx = 20 + Math.random() * 75
      const ry = 6 + Math.random() * 18
      const g = ctx.createRadialGradient(x, y, 2, x, y, rx)
      g.addColorStop(0, 'rgba(255, 255, 255, 0.72)')
      g.addColorStop(0.55, 'rgba(235, 245, 255, 0.3)')
      g.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.ellipse(x, y, rx, ry, (Math.random() - 0.5) * 0.35, 0, Math.PI * 2)
      ctx.fill()
    }
    return new THREE.CanvasTexture(c)
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
    return new THREE.CanvasTexture(c)
  }

  // ============================================================================
  // 4. 五层高能等离子激光巨柱着色器 (1.炽白马赫环光芯 + 2.双螺旋等离子涡流 + 3.云层电离激波环 + 4.1500颗GPU火花)
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
          // 中心极锐利高能激光轴线 + 边缘菲涅尔衰减
          float laserSpine = pow(cosView, 4.5);
          float softEdge = pow(cosView, 1.8);

          // 12 节超音速菱形马赫激波环 (12 Razor-Sharp Mach Shock Diamonds)
          float machWave = sin(vUv.y * 95.0 - uTime * 32.0);
          float shockDiamond = exp(-pow(machWave, 2.0) * 16.0) * smoothstep(0.55, 0.0, vUv.y) * pow(cosView, 2.2);

          // 高频纵向能量脉冲流
          float energyStream = 0.85 + 0.15 * sin(vUv.y * 45.0 - uTime * 48.0);
          float vFade = pow(max(0.0, 1.0 - vUv.y), 1.15) * smoothstep(0.0, 0.012, vUv.y);
          float growMask = smoothstep(vUv.y, vUv.y - 0.1, ig);

          vec3 cyanBeam = mix(vec3(0.0, 0.78, 1.0), vec3(1.6, 2.1, 2.6), laserSpine + shockDiamond * 0.8);
          vec3 goldBeam = mix(vec3(1.0, 0.52, 0.05), vec3(2.2, 1.9, 1.4), laserSpine + shockDiamond * 0.8);
          vec3 finalCol = mix(cyanBeam, goldBeam, uOverclock) * energyStream;

          float alpha = clamp((softEdge * 0.85 + shockDiamond * 0.75) * vFade * growMask * clamp(uThrust, 0.3, 1.2), 0.0, 0.96);
          gl_FragColor = vec4(finalCol, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    })
  }

  // 双螺旋上升等离子涡流护套着色器 (Helical Plasma Vortex & Turbulent Shear Sheath)
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

        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
        }
        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
            mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
            f.y
          );
        }

        void main() {
          float ig = clamp((uIgnitionProgress - uIgnitionThreshold) * 4.5, 0.0, 1.0);
          if (ig <= 0.01 || uThrust <= 0.01) discard;

          float centerDist = abs(vUv.x - 0.5) * 2.0;
          float gaussX = exp(-pow(centerDist * 2.4, 2.0));

          // 双螺旋等离子磁约束涡流丝 (Dual-Spiral Helical Filaments)
          float helix1 = exp(-pow(sin((vUv.x - 0.5) * 8.0 + vUv.y * 18.0 - uTime * 16.0), 2.0) * 8.0);
          float helix2 = exp(-pow(sin((vUv.x - 0.5) * 8.0 - vUv.y * 14.0 + uTime * 12.0), 2.0) * 8.0);
          float turb = noise(vec2(vUv.x * 6.0, vUv.y * 16.0 - uTime * 12.0));

          float featherY = pow(max(0.0, 1.0 - vUv.y), 1.3) * smoothstep(0.0, 0.02, vUv.y);
          float growMask = smoothstep(vUv.y, vUv.y - 0.12, ig);

          vec3 colBlue = mix(vec3(0.02, 0.48, 1.0), vec3(0.65, 0.96, 1.0), (helix1 + helix2) * 0.5);
          vec3 colGold = mix(vec3(1.0, 0.38, 0.02), vec3(1.0, 0.92, 0.65), (helix1 + helix2) * 0.5);
          vec3 col = mix(colBlue, colGold, uOverclock);

          float alpha = clamp(gaussX * (0.28 + (helix1 + helix2) * 0.22 + turb * 0.18) * featherY * growMask * clamp(uThrust, 0.3, 1.2), 0.0, 0.48);
          gl_FragColor = vec4(col, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    })
  }

  // 喷口水平激波环与云层电离击穿光环着色器 (Nozzle Shockwave & Cloud-Punch Ionization Ring)
  public createShockwaveDiscShader(ignitionThreshold = 0.0): THREE.ShaderMaterial {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
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
        uniform float uOverclock;
        uniform float uIgnitionProgress;
        uniform float uIgnitionThreshold;
        varying vec2 vUv;

        void main() {
          float ig = clamp((uIgnitionProgress - uIgnitionThreshold) * 4.5, 0.0, 1.0);
          if (ig <= 0.01) discard;

          float r = length(vUv - 0.5) * 2.0;
          if (r > 1.0) discard;

          float wave = fract(r * 2.5 - uTime * 2.8);
          float ring = exp(-pow((wave - 0.5) * 5.0, 2.0)) * (1.0 - r);
          float coreGlow = exp(-r * 3.5);

          vec3 col = mix(vec3(0.15, 0.85, 1.0), vec3(1.0, 0.72, 0.25), uOverclock);
          gl_FragColor = vec4(col * 1.4, (ring * 0.55 + coreGlow * 0.65) * (1.0 - r) * ig);
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
          float angle = life * 10.0 + aOffset * 6.28;
          float spread = (1.0 + life * 1.6) * aRadial;
          pos.x = cos(angle) * length(position.xz) * spread;
          pos.z = sin(angle) * length(position.xz) * spread;

          vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = clamp((1.0 - life * 0.6) * (68.0 / -mvPos.z), 1.8, 11.0);
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
          vec3 normalCol = mix(vec3(1.4, 1.6, 1.8), vec3(0.0, 0.85, 1.0), smoothstep(0.0, 0.3, vLife));
          vec3 overCol = mix(vec3(1.6, 1.5, 1.1), vec3(1.0, 0.5, 0.05), smoothstep(0.0, 0.3, vLife));
          vec3 col = mix(normalCol, overCol, uOverclock);

          float alpha = tex.a * pow(1.0 - vLife, 1.2) * 0.88 * ig;
          gl_FragColor = vec4(col, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  }

  // ============================================================================
  // 5. 重装铸钢行星发动机 (搭载真法线贴图 normalMap + 粗糙度贴图 roughnessMap + 5层激光巨柱)
  // ============================================================================
  public buildBrutalistPlanetaryEngine(
    scale = 1.0,
    plumeHeight = 16.5,
    ignitionThreshold = 0.0
  ): BrutalistEngineRig {
    const group = new THREE.Group()
    const strobes: THREE.Mesh[] = []

    // 搭载 Sobel 法线贴图与粗糙度贴图的重型铸钢装甲材质 (彻底告别塑料感！)
    const heavyCastSteelMat = new THREE.MeshStandardMaterial({
      color: 0x3b4656,
      map: this.steelAlbedo,
      normalMap: this.steelNormal,
      normalScale: new THREE.Vector2(1.6, 1.6),
      roughnessMap: this.steelRoughness,
      metalness: 0.88,
      roughness: 0.42,
      envMapIntensity: 2.2
    })

    const darkForgedIronMat = new THREE.MeshStandardMaterial({
      color: 0x1e242d,
      normalMap: this.steelNormal,
      normalScale: new THREE.Vector2(1.2, 1.2),
      roughnessMap: this.steelRoughness,
      metalness: 0.9,
      roughness: 0.38,
      envMapIntensity: 2.0
    })

    const chromeHydraulicMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.96,
      roughness: 0.12,
      envMapIntensity: 2.4
    })

    const orangeGantryMat = new THREE.MeshBasicMaterial({
      map: this.furnaceWindowTex,
      color: 0xff8811
    })
    const furnaceCoreMat = new THREE.MeshBasicMaterial({ color: 0xff5500 })
    const cyanSlitMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff })
    const redStrobeMat = new THREE.MeshBasicMaterial({ color: 0xff2a4d })

    // 1. 地下重装防爆基坑 + 16 座放射状导流装甲墩 + 高炉赤红核心
    const baseFoundation = new THREE.Mesh(new THREE.CylinderGeometry(0.82, 1.02, 0.16, 16), darkForgedIronMat)
    baseFoundation.position.y = 0.08
    group.add(baseFoundation)

    const furnaceGlow = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.65, 0.2, 16), furnaceCoreMat)
    furnaceGlow.position.y = 0.15
    group.add(furnaceGlow)

    // 2. 多级火山锥重装甲塔身 + 48 根锐利垂直铸钢散热肋 + 8 道水平环形工字钢梁
    const lowerCone = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.72, 0.38, 32, 1, true), heavyCastSteelMat)
    lowerCone.position.y = 0.3
    const upperCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.46, 0.26, 32, 1, true), heavyCastSteelMat)
    upperCollar.position.y = 0.6
    group.add(lowerCone, upperCollar)

    for (let t = 0; t < 7; t++) {
      const r = 0.68 - t * 0.044
      const y = 0.14 + t * 0.082
      const gantryWin = new THREE.Mesh(new THREE.CylinderGeometry(r, r + 0.01, 0.022, 24, 1, true), orangeGantryMat)
      gantryWin.position.y = y
      const ringGirder = new THREE.Mesh(new THREE.TorusGeometry(r + 0.022, 0.014, 8, 32), darkForgedIronMat)
      ringGirder.rotation.x = Math.PI * 0.5
      ringGirder.position.y = y + 0.014
      group.add(gantryWin, ringGirder)
    }

    for (let i = 0; i < 48; i++) {
      const ang = (i / 48) * Math.PI * 2
      const rib = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.62, 0.11), heavyCastSteelMat)
      rib.position.set(Math.cos(ang) * 0.52, 0.41, Math.sin(ang) * 0.52)
      rib.rotation.y = -ang
      rib.rotation.x = -0.28
      group.add(rib)
    }

    // 24 道上领圈青色磁约束散热狭缝
    for (let i = 0; i < 24; i++) {
      const ang = (i / 24) * Math.PI * 2
      const slit = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.16, 0.025), cyanSlitMat)
      slit.position.set(Math.cos(ang) * 0.425, 0.6, Math.sin(ang) * 0.425)
      slit.rotation.y = -ang
      slit.rotation.x = -0.18
      group.add(slit)
    }

    // 3. 8 座巨型锻钢桁架飞扶壁支腿 + 双镀铬液压减震缸 + 横向钢桥
    for (let i = 0; i < 8; i++) {
      const ang = (i / 8) * Math.PI * 2
      const pylonGroup = new THREE.Group()
      pylonGroup.rotation.y = ang

      // 主斜撑重型箱梁
      const mainPylon = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.78, 0.18), heavyCastSteelMat)
      mainPylon.position.set(0, 0.34, 0.68)
      mainPylon.rotation.x = -0.74
      pylonGroup.add(mainPylon)

      // 侧向工字钢翼板与双镀铬液压作动筒
      for (const side of [-0.072, 0.072]) {
        const gusset = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.6, 0.24), darkForgedIronMat)
        gusset.position.set(side, 0.28, 0.72)
        gusset.rotation.x = -0.74
        pylonGroup.add(gusset)

        const cylinderJacket = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.032, 0.32, 10), darkForgedIronMat)
        cylinderJacket.position.set(side * 0.9, 0.16, 0.86)
        cylinderJacket.rotation.x = -0.74
        pylonGroup.add(cylinderJacket)

        const chromePiston = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.52, 10), chromeHydraulicMat)
        chromePiston.position.set(side * 0.9, 0.28, 0.75)
        chromePiston.rotation.x = -0.74
        pylonGroup.add(chromePiston)
      }

      // 横向钢桁架联络桥
      const crossBridge = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.055, 0.08), darkForgedIronMat)
      crossBridge.position.set(0, 0.25, 0.62)
      pylonGroup.add(crossBridge)

      // 岩床重装锚定基座与红闪信标
      const anchorBlock = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.11, 0.34), heavyCastSteelMat)
      anchorBlock.position.set(0, 0.055, 0.98)
      pylonGroup.add(anchorBlock)

      const strobe = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 8), redStrobeMat)
      strobe.position.set(0, 0.14, 1.08)
      pylonGroup.add(strobe)
      strobes.push(strobe)

      group.add(pylonGroup)
    }

    // 4. 喷口火山口内腔：16 组碳化钨矢量导流瓣 + 4 座悬臂龙门吊 + 托卡马克磁约束环
    for (let i = 0; i < 16; i++) {
      const ang = (i / 16) * Math.PI * 2
      const petal = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.11, 0.11), darkForgedIronMat)
      petal.position.set(Math.cos(ang) * 0.4, 0.74, Math.sin(ang) * 0.4)
      petal.rotation.y = -ang
      petal.rotation.x = 0.22
      group.add(petal)
    }
    for (let c = 0; c < 4; c++) {
      const ang = (c / 4) * Math.PI * 2 + Math.PI * 0.25
      const crane = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.035, 0.26), heavyCastSteelMat)
      crane.position.set(Math.cos(ang) * 0.36, 0.81, Math.sin(ang) * 0.36)
      crane.rotation.y = -ang
      crane.rotation.x = 0.25
      group.add(crane)
    }

    const throatAperture = new THREE.Mesh(
      new THREE.CircleGeometry(0.36, 32),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    )
    throatAperture.rotation.x = -Math.PI * 0.5
    throatAperture.position.y = 0.68
    group.add(throatAperture)

    // =========================================================================
    // 5. 五层高能等离子激光巨柱组装
    // =========================================================================
    const plumeAssembly = new THREE.Group()
    plumeAssembly.position.y = 0.68

    const coreLaserMat = this.createCollimatedLaserCoreShader(ignitionThreshold)
    const vortexSheathMat = this.createHelicalVortexSheathShader(ignitionThreshold)
    const shockRingMat = this.createShockwaveDiscShader(ignitionThreshold)
    const ionSparksMat = this.createRisingIonParticlesShader(plumeHeight, ignitionThreshold)

    // Stage 1: 极亮准直内芯激光柱 + 12 节超音速菱形马赫环
    const innerCoreGeo = new THREE.CylinderGeometry(0.18, 0.26, plumeHeight, 32, 48, true)
    innerCoreGeo.translate(0, plumeHeight * 0.5, 0)
    plumeAssembly.add(new THREE.Mesh(innerCoreGeo, coreLaserMat))

    // Stage 2: 4 张交叉双螺旋等离子涡流护套平面
    const planeGeo = new THREE.PlaneGeometry(1.25, plumeHeight, 1, 32)
    planeGeo.translate(0, plumeHeight * 0.5, 0)
    for (let p = 0; p < 4; p++) {
      const plane = new THREE.Mesh(planeGeo, vortexSheathMat)
      plane.rotation.y = (p * Math.PI) / 4
      plumeAssembly.add(plane)
    }

    // Stage 3: 喷口水平激波盘 + 平流层云层击穿电离环
    const muzzleDisc = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 1.8), shockRingMat)
    muzzleDisc.rotation.x = -Math.PI * 0.5
    muzzleDisc.position.y = 0.05
    const cloudPunchDisc = new THREE.Mesh(new THREE.PlaneGeometry(2.8, 2.8), shockRingMat)
    cloudPunchDisc.rotation.x = -Math.PI * 0.5
    cloudPunchDisc.position.y = 2.6
    plumeAssembly.add(muzzleDisc, cloudPunchDisc)

    // Stage 4: 1,500 颗螺旋上升 GPU 电离火花粒子
    const pCount = 1500
    const pPos = new Float32Array(pCount * 3)
    const pOffset = new Float32Array(pCount)
    const pSpeed = new Float32Array(pCount)
    const pRadial = new Float32Array(pCount)

    for (let i = 0; i < pCount; i++) {
      const a = Math.random() * Math.PI * 2
      const r = 0.05 + Math.random() * 0.32
      pPos[i * 3] = Math.cos(a) * r
      pPos[i * 3 + 1] = 0
      pPos[i * 3 + 2] = Math.sin(a) * r
      pOffset[i] = Math.random()
      pSpeed[i] = 0.55 + Math.random() * 0.75
      pRadial[i] = 0.75 + Math.random() * 0.65
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
      shockRingMat,
      ionSparksMat,
      strobes
    }
  }

  public buildGimbalSteeringEngineUnit(
    scale = 1.0,
    plumeLength = 17.5
  ): BrutalistEngineRig {
    const group = new THREE.Group()

    const castSteelMat = new THREE.MeshStandardMaterial({
      color: 0x2b3442,
      map: this.steelAlbedo,
      normalMap: this.steelNormal,
      normalScale: new THREE.Vector2(1.5, 1.5),
      roughnessMap: this.steelRoughness,
      metalness: 0.88,
      roughness: 0.4,
      envMapIntensity: 2.1
    })

    const cradleBase = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.18, 1.25), castSteelMat)
    cradleBase.position.y = 0.09
    group.add(cradleBase)

    for (const xSide of [-0.62, 0.62]) {
      const pylon = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.85, 0.48), castSteelMat)
      pylon.position.set(xSide, 0.46, 0)
      group.add(pylon)
    }

    const innerRig = this.buildBrutalistPlanetaryEngine(0.95, plumeLength, 0.0)
    innerRig.group.position.set(0, 0.38, 0)
    innerRig.group.rotation.x = Math.PI * 0.5 - 0.52
    group.add(innerRig.group)

    group.scale.setScalar(scale)
    return {
      group,
      plumeAssembly: innerRig.plumeAssembly,
      coreLaserMat: innerRig.coreLaserMat,
      vortexSheathMat: innerRig.vortexSheathMat,
      shockRingMat: innerRig.shockRingMat,
      ionSparksMat: innerRig.ionSparksMat,
      strobes: innerRig.strobes
    }
  }

  // ============================================================================
  // 6. 重装铸钢太空电梯基地 (4座巨型倾斜 A 字钢铁桁架塔 + 顶部天轮横梁 + 2列重装电磁攀爬列车)
  // ============================================================================
  public buildEquatorialAnchorComplex(tetherLength = 42.0): {
    group: THREE.Group
    climberPods: THREE.Group[]
  } {
    const group = new THREE.Group()
    const climberPods: THREE.Group[] = []

    const heavySteelMat = new THREE.MeshStandardMaterial({
      color: 0x384354,
      map: this.steelAlbedo,
      normalMap: this.steelNormal,
      normalScale: new THREE.Vector2(1.6, 1.6),
      roughnessMap: this.steelRoughness,
      metalness: 0.88,
      roughness: 0.38,
      envMapIntensity: 2.2
    })
    const darkGirderMat = new THREE.MeshStandardMaterial({
      color: 0x1e2530,
      normalMap: this.steelNormal,
      roughnessMap: this.steelRoughness,
      metalness: 0.9,
      roughness: 0.35,
      envMapIntensity: 2.0
    })
    const chromeRailMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.95,
      roughness: 0.14,
      envMapIntensity: 2.4
    })
    const orangeWinMat = new THREE.MeshBasicMaterial({ map: this.furnaceWindowTex, color: 0xff8811 })
    const cyanCoilMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff })
    const redBeaconMat = new THREE.MeshBasicMaterial({ color: 0xff2a4d })

    // 1. 多层八角形重装海防防爆大坝与 16 座放射状扶壁墩
    const seaWall = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 3.2, 0.36, 8), darkGirderMat)
    seaWall.position.y = 0.18
    const coreFortress = new THREE.Mesh(new THREE.CylinderGeometry(1.75, 2.2, 0.55, 8), heavySteelMat)
    coreFortress.position.y = 0.52
    const crewDeck = new THREE.Mesh(new THREE.CylinderGeometry(2.22, 2.22, 0.14, 16, 1, true), orangeWinMat)
    crewDeck.position.y = 0.42
    group.add(seaWall, coreFortress, crewDeck)

    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2
      const pier = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.45, 0.85), heavySteelMat)
      pier.position.set(Math.cos(a) * 2.6, 0.22, Math.sin(a) * 2.6)
      pier.rotation.y = -a
      group.add(pier)
    }

    // 2. 4 座巨型向心倾斜 A 字钢铁立体桁架发射塔 (高 11.5 单位，含数十根三维交叉钢梁與天轮横梁)
    const towerHeight = 11.5
    for (let t = 0; t < 4; t++) {
      const ang = (t / 4) * Math.PI * 2 + Math.PI * 0.25
      const megaTower = new THREE.Group()
      megaTower.rotation.y = ang

      // A 字双主钢柱
      for (const xSide of [-0.38, 0.38]) {
        const mainColumn = new THREE.Mesh(new THREE.BoxGeometry(0.18, towerHeight, 0.24), heavySteelMat)
        mainColumn.position.set(xSide, towerHeight * 0.5, 1.45)
        mainColumn.rotation.x = -0.085
        mainColumn.rotation.z = -xSide * 0.08
        megaTower.add(mainColumn)
      }

      // 14 层水平钢横梁与 X 型立体交叉斜撑桁架
      for (let h = 0; h < 14; h++) {
        const y = 0.8 + h * 0.76
        const z = 1.85 - h * 0.065
        const w = 0.82 - h * 0.025

        const hBeam = new THREE.Mesh(new THREE.BoxGeometry(w, 0.065, 0.22), darkGirderMat)
        hBeam.position.set(0, y, z)
        megaTower.add(hBeam)

        const diag1 = new THREE.Mesh(new THREE.BoxGeometry(w * 1.15, 0.04, 0.06), heavySteelMat)
        diag1.position.set(0, y + 0.38, z - 0.03)
        diag1.rotation.z = 0.58
        const diag2 = new THREE.Mesh(new THREE.BoxGeometry(w * 1.15, 0.04, 0.06), heavySteelMat)
        diag2.position.set(0, y + 0.38, z - 0.03)
        diag2.rotation.z = -0.58
        megaTower.add(diag1, diag2)
      }

      // 发光线性电磁加速导轨 + 顶部红色防撞航空灯
      const magRail = new THREE.Mesh(new THREE.BoxGeometry(0.05, towerHeight * 0.95, 0.05), cyanCoilMat)
      magRail.position.set(0, towerHeight * 0.48, 1.25)
      magRail.rotation.x = -0.085
      const topBeacon = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), redBeaconMat)
      topBeacon.position.set(0, towerHeight + 0.2, 0.95)
      megaTower.add(magRail, topBeacon)

      group.add(megaTower)
    }

    // 塔顶重型环形天轮锁定平台 (Sky-Ring Gantry Crown at y = 11.2)
    const skyCrown = new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.14, 12, 32), heavySteelMat)
    skyCrown.rotation.x = Math.PI * 0.5
    skyCrown.position.y = 11.2
    group.add(skyCrown)

    // 3. 3 根高张力编织碳纳米管金属主缆索 + 中心镀铬质量驱动导轨
    const centralSpine = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 14.0, 12), chromeRailMat)
    centralSpine.position.y = 7.0
    group.add(centralSpine)

    for (let c = 0; c < 3; c++) {
      const a = (c / 3) * Math.PI * 2
      const cableGeo = new THREE.CylinderGeometry(0.024, 0.024, tetherLength, 8)
      cableGeo.translate(0, tetherLength * 0.5, 0)
      const cable = new THREE.Mesh(cableGeo, chromeRailMat)
      cable.position.set(Math.cos(a) * 0.32, 0.4, Math.sin(a) * 0.32)
      group.add(cable)
    }

    // 4. 2 列重装工业太空电梯攀爬列车 (含铸钢车架、发光磁箍缩环、货运集装箱舱、散热翼与向下喷射的等离子尾焰)
    for (let p = 0; p < 2; p++) {
      const train = new THREE.Group()
      train.position.y = 2.4 + p * 4.5

      // 中央重装抱轨车体
      const chassis = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.48, 1.35, 8), heavySteelMat)
      const crewRing = new THREE.Mesh(new THREE.CylinderGeometry(0.49, 0.49, 0.25, 16, 1, true), orangeWinMat)
      crewRing.position.y = 0.25
      train.add(chassis, crewRing)

      // 上下两道发光电磁箍缩环
      for (const ry of [-0.55, 0.55]) {
        const magClamp = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.035, 8, 24), cyanCoilMat)
        magClamp.rotation.x = Math.PI * 0.5
        magClamp.position.y = ry
        train.add(magClamp)
      }

      // 6 组外挂重型装甲货舱与散热百叶翼
      for (let k = 0; k < 6; k++) {
        const ka = (k / 6) * Math.PI * 2
        const cargoPod = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.85, 0.26), darkGirderMat)
        cargoPod.position.set(Math.cos(ka) * 0.58, -0.05, Math.sin(ka) * 0.58)
        cargoPod.rotation.y = -ka
        train.add(cargoPod)

        // 底部等离子推进尾焰
        const jet = new THREE.Mesh(
          new THREE.ConeGeometry(0.09, 0.95, 12),
          new THREE.MeshBasicMaterial({
            color: 0x00e5ff,
            transparent: true,
            opacity: 0.82,
            blending: THREE.AdditiveBlending
          })
        )
        jet.rotation.x = Math.PI
        jet.position.set(Math.cos(ka) * 0.56, -0.95, Math.sin(ka) * 0.56)
        train.add(jet)
      }

      group.add(train)
      climberPods.push(train)
    }

    return { group, climberPods }
  }

  // ============================================================================
  // 7. 天柱号空间站 (搭载真法线贴图的拉丝钛桁架 + 暗古铜金网格太阳翼)
  // ============================================================================
  public buildTianzhuApexStation(): {
    group: THREE.Group
    ringUpper: THREE.Group
    ringLower: THREE.Group
    strobes: THREE.Mesh[]
  } {
    const group = new THREE.Group()
    const strobes: THREE.Mesh[] = []

    const titaniumStrutMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      normalMap: this.steelNormal,
      roughnessMap: this.steelRoughness,
      metalness: 0.88,
      roughness: 0.28,
      envMapIntensity: 2.0
    })
    const pressurizedNodeMat = new THREE.MeshStandardMaterial({
      color: 0xcbd5e1,
      map: this.champagneHullTex,
      normalMap: this.steelNormal,
      normalScale: new THREE.Vector2(0.8, 0.8),
      metalness: 0.82,
      roughness: 0.26,
      envMapIntensity: 1.9
    })
    const mliBandMat = new THREE.MeshStandardMaterial({
      color: 0xa17c38,
      normalMap: this.steelNormal,
      metalness: 0.8,
      roughness: 0.34,
      envMapIntensity: 1.8
    })
    const bronzeSolarMat = new THREE.MeshStandardMaterial({
      map: this.bronzeSolarTex,
      bumpMap: this.bronzeSolarTex,
      bumpScale: 0.015,
      color: 0xc49a52,
      metalness: 0.86,
      roughness: 0.2,
      envMapIntensity: 2.1,
      side: THREE.DoubleSide
    })
    const fineWindowMat = new THREE.MeshBasicMaterial({
      map: this.furnaceWindowTex,
      color: 0xffebb3
    })

    const spineLength = 14.0
    const cornerOffsets = [
      [-0.16, -0.16],
      [0.16, -0.16],
      [-0.16, 0.16],
      [0.16, 0.16]
    ]
    cornerOffsets.forEach(([cx, cz]) => {
      const longeron = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, spineLength, 8),
        titaniumStrutMat
      )
      longeron.position.set(cx, 0, cz)
      group.add(longeron)
    })

    for (let i = -13; i <= 13; i++) {
      const y = i * 0.5
      const batten = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.024, 0.35), titaniumStrutMat)
      batten.position.y = y
      group.add(batten)

      if (i % 3 === 0) {
        const dockModule = new THREE.Mesh(
          new THREE.CylinderGeometry(0.15, 0.15, 0.65, 16),
          pressurizedNodeMat
        )
        dockModule.position.y = y
        const mliWrap = new THREE.Mesh(
          new THREE.CylinderGeometry(0.155, 0.155, 0.12, 16),
          mliBandMat
        )
        mliWrap.position.y = y + 0.18
        group.add(dockModule, mliWrap)
      }
    }

    const crossTruss = new THREE.Mesh(new THREE.BoxGeometry(10.6, 0.09, 0.09), titaniumStrutMat)
    crossTruss.position.y = 0.6
    group.add(crossTruss)

    for (const side of [-1, 1]) {
      for (let wIdx = 0; wIdx < 2; wIdx++) {
        const xPos = side * (1.65 + wIdx * 1.45)
        const gimbalJoint = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.24, 12), mliBandMat)
        gimbalJoint.position.set(xPos, 0.6, 0)
        group.add(gimbalJoint)

        for (const zDir of [-1, 1]) {
          const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 4.2, 8), titaniumStrutMat)
          mast.rotation.x = Math.PI * 0.5
          mast.position.set(xPos, 0.6, zDir * 2.25)
          group.add(mast)

          for (const stripOffset of [-0.15, 0.15]) {
            const blanket = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.01, 4.1), bronzeSolarMat)
            blanket.position.set(xPos + stripOffset, 0.6, zDir * 2.25)
            blanket.rotation.z = 0.06
            group.add(blanket)
          }
        }
      }
    }

    const buildSleekCentrifuge = (radius: number) => {
      const rGroup = new THREE.Group()
      const ringHull = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.085, 16, 72), pressurizedNodeMat)
      ringHull.rotation.x = Math.PI * 0.5
      ringHull.scale.set(1, 1, 0.65)
      rGroup.add(ringHull)

      const winTrack = new THREE.Mesh(new THREE.TorusGeometry(radius - 0.068, 0.024, 8, 72), fineWindowMat)
      winTrack.rotation.x = Math.PI * 0.5
      rGroup.add(winTrack)

      for (let c = 0; c < 8; c++) {
        const a = (c / 8) * Math.PI * 2
        const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.15, 12), titaniumStrutMat)
        collar.position.set(Math.cos(a) * radius, 0, Math.sin(a) * radius)
        collar.rotation.z = Math.PI * 0.5
        collar.rotation.y = -a + Math.PI * 0.5
        rGroup.add(collar)
      }

      for (let s = 0; s < 6; s++) {
        const spoke = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, radius * 2, 8), titaniumStrutMat)
        spoke.rotation.z = Math.PI * 0.5
        spoke.rotation.y = (s / 6) * Math.PI
        rGroup.add(spoke)
      }
      return rGroup
    }

    const ringUpper = buildSleekCentrifuge(1.8)
    ringUpper.position.y = -0.85
    const ringLower = buildSleekCentrifuge(1.45)
    ringLower.position.y = -1.65
    group.add(ringUpper, ringLower)

    for (const yPos of [-6.8, -3.2, 0.6, 4.2, 6.8]) {
      const navLight = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xe0f7ff })
      )
      navLight.position.set(0, yPos, 0.22)
      group.add(navLight)
      strobes.push(navLight)
    }

    return { group, ringUpper, ringLower, strobes }
  }

  // ============================================================================
  // 8. 极光号双环轨道城 (搭载真法线贴图的香槟钛装甲 + 扁平圆盘中枢)
  // ============================================================================
  public buildHabitatRingAurora(): THREE.Group {
    const aurora = new THREE.Group()

    const champagneTitaniumMat = new THREE.MeshStandardMaterial({
      color: 0xd6d3cd,
      map: this.champagneHullTex,
      normalMap: this.steelNormal,
      normalScale: new THREE.Vector2(1.1, 1.1),
      roughnessMap: this.steelRoughness,
      metalness: 0.85,
      roughness: 0.26,
      envMapIntensity: 2.0
    })
    const slateTrimMat = new THREE.MeshStandardMaterial({
      color: 0x3b4656,
      normalMap: this.steelNormal,
      roughnessMap: this.steelRoughness,
      metalness: 0.88,
      roughness: 0.3,
      envMapIntensity: 1.9
    })
    const warmBiosphereMat = new THREE.MeshBasicMaterial({
      map: this.furnaceWindowTex,
      color: 0xffebb3
    })

    const outerBevelRing = new THREE.Mesh(
      new THREE.TorusGeometry(4.8, 0.58, 24, 96),
      champagneTitaniumMat
    )
    outerBevelRing.scale.set(1, 1, 0.32)

    const outerTrimRing = new THREE.Mesh(
      new THREE.TorusGeometry(5.32, 0.085, 12, 96),
      slateTrimMat
    )
    outerTrimRing.scale.set(1, 1, 0.4)

    const innerBevelRing = new THREE.Mesh(
      new THREE.TorusGeometry(3.35, 0.38, 20, 80),
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
        new THREE.CylinderGeometry(0.032, 0.032, 9.6, 8),
        slateTrimMat
      )
      spoke.rotation.z = ang
      aurora.add(spoke)
    }

    const flatDiscHub = new THREE.Mesh(
      new THREE.CylinderGeometry(0.65, 0.52, 0.45, 32),
      champagneTitaniumMat
    )
    flatDiscHub.rotation.x = Math.PI * 0.5
    aurora.add(flatDiscHub)

    const hubDome = new THREE.Mesh(
      new THREE.SphereGeometry(0.38, 24, 16),
      slateTrimMat
    )
    hubDome.scale.set(1, 1, 0.45)
    aurora.add(hubDome)

    const axialNeedle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.014, 0.026, 2.6, 8),
      champagneTitaniumMat
    )
    axialNeedle.rotation.x = Math.PI * 0.5
    aurora.add(axialNeedle)

    return aurora
  }

  public buildDeepSpaceRelayFleet(): {
    group: THREE.Group
    laserShaderMat: THREE.ShaderMaterial
  } {
    const fleet = new THREE.Group()

    const titaniumWingMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      map: this.bronzeSolarTex,
      normalMap: this.steelNormal,
      metalness: 0.88,
      roughness: 0.22,
      envMapIntensity: 2.0,
      side: THREE.DoubleSide
    })
    const busMat = new THREE.MeshStandardMaterial({
      color: 0xcbd5e1,
      normalMap: this.steelNormal,
      metalness: 0.9,
      roughness: 0.2,
      envMapIntensity: 2.0
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
          vec3 col = mix(vec3(0.0, 0.78, 1.0), vec3(0.95, 1.0, 1.0), pulse);
          gl_FragColor = vec4(col, 0.22 + pulse * 0.38);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    const buildRelayProbe = (scale = 1.0) => {
      const probe = new THREE.Group()

      const coreBus = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.52, 8), busMat)
      coreBus.rotation.x = Math.PI * 0.5
      probe.add(coreBus)

      for (let w = 0; w < 4; w++) {
        const ang = (w / 4) * Math.PI * 2 + Math.PI * 0.25
        const wingGroup = new THREE.Group()
        wingGroup.rotation.z = ang

        const boom = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 2.2, 6), busMat)
        boom.position.y = 1.15
        const panel = new THREE.Mesh(new THREE.BoxGeometry(0.28, 1.95, 0.012), titaniumWingMat)
        panel.position.y = 1.18
        wingGroup.add(boom, panel)
        probe.add(wingGroup)
      }

      const flareSprite = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: this.softGlowSprite,
          color: 0x80e8ff,
          transparent: true,
          opacity: 0.9,
          blending: THREE.AdditiveBlending
        })
      )
      flareSprite.position.z = 0.32
      flareSprite.scale.set(0.85, 0.85, 1)
      probe.add(flareSprite)

      probe.scale.setScalar(scale)
      return probe
    }

    const coords = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-3.2, 1.1, -2.4),
      new THREE.Vector3(3.5, -0.85, -2.1),
      new THREE.Vector3(-6.0, -1.2, -5.0),
      new THREE.Vector3(6.2, 1.4, -4.8)
    ]
    coords.forEach((p, idx) => {
      const pr = buildRelayProbe(idx === 0 ? 1.15 : 0.82)
      pr.position.copy(p)
      pr.rotation.y = 0.18
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
      const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, len, 6), laserShaderMat)
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
      color: 0x686c73,
      roughness: 0.95,
      metalness: 0.02,
      envMapIntensity: 0.35
    })

    const loader = new THREE.TextureLoader()
    loader.setCrossOrigin('anonymous')
    loader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/moon_1024.jpg',
      (tex) => {
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
      const rig = this.buildBrutalistPlanetaryEngine(idx === 0 ? 0.38 : 0.32, 11.0, 0.0)
      rig.group.position.copy(n.clone().multiplyScalar(moonRadius - 0.04))
      rig.group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), n)
      group.add(rig.group)
      lunarRigs.push(rig)
    })

    return { group, lunarRigs }
  }
}
