import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

export interface BrutalistEngineRig {
  group: THREE.Group
  plumeAssembly: THREE.Group
  coreRayMat: THREE.ShaderMaterial
  sheathMat: THREE.ShaderMaterial
  godRayMat?: THREE.ShaderMaterial
  ionPoints?: THREE.Points
  ionVelocities?: Float32Array
  vaporSprites?: THREE.Sprite[]
  shockRingMesh?: THREE.Mesh
  crownFlareMesh?: THREE.Mesh
  strobes: THREE.Mesh[]
}

export interface IndustrialPBRMaps {
  map: THREE.CanvasTexture
  bumpMap: THREE.CanvasTexture
  roughnessMap: THREE.CanvasTexture
  emissiveMap: THREE.CanvasTexture
}

export class MegaStructuresBuilder {
  public pbrMaps: IndustrialPBRMaps
  public solarWingMaps: { map: THREE.CanvasTexture; bump: THREE.CanvasTexture }
  public frozenEarthDayTex: THREE.CanvasTexture
  public frozenEarthBumpTex: THREE.CanvasTexture
  public frozenEarthNightTex: THREE.CanvasTexture
  public fluffyCloudsTex: THREE.CanvasTexture
  public moonRegolithTex: THREE.CanvasTexture
  public softGlowSprite: THREE.CanvasTexture
  public mistSpriteTex: THREE.CanvasTexture
  public denseSteamTex: THREE.CanvasTexture

  constructor() {
    this.pbrMaps = this.createIndustrialPBRMaps()
    this.solarWingMaps = this.createISSSolarWingMaps()
    const earthTex = this.createFrozenWanderingEarthTextures()
    this.frozenEarthDayTex = earthTex.day
    this.frozenEarthBumpTex = earthTex.bump
    this.frozenEarthNightTex = earthTex.night
    this.fluffyCloudsTex = this.createFluffyCloudsTexture()
    this.moonRegolithTex = this.createSharpLunarCraterTexture()
    this.softGlowSprite = this.createSoftRadialGlowSprite()
    this.mistSpriteTex = this.createVolumetricMistTexture()
    this.denseSteamTex = this.createDenseSteamCloudTexture()
  }

  // ============================================================================
  // 1. PROCEDURAL MICRO-DETAIL PBR TEXTURE GENERATOR (ILM / WETA FX STANDARD)
  // ============================================================================
  public createIndustrialPBRMaps(): IndustrialPBRMaps {
    const size = 1024
    // 1. Base Albedo / Map
    const cAlbedo = document.createElement('canvas')
    cAlbedo.width = size
    cAlbedo.height = size
    const ctxA = cAlbedo.getContext('2d')!

    // 2. Bump Map
    const cBump = document.createElement('canvas')
    cBump.width = size
    cBump.height = size
    const ctxB = cBump.getContext('2d')!

    // 3. Roughness Map
    const cRough = document.createElement('canvas')
    cRough.width = size
    cRough.height = size
    const ctxR = cRough.getContext('2d')!

    // 4. Emissive Map (Thousands of inspection windows & warning stencils)
    const cEmiss = document.createElement('canvas')
    cEmiss.width = size
    cEmiss.height = size
    const ctxE = cEmiss.getContext('2d')!

    // Base backgrounds
    ctxA.fillStyle = '#2c333f'
    ctxA.fillRect(0, 0, size, size)
    ctxB.fillStyle = '#808080'
    ctxB.fillRect(0, 0, size, size)
    ctxR.fillStyle = '#555555'
    ctxR.fillRect(0, 0, size, size)
    ctxE.fillStyle = '#000000'
    ctxE.fillRect(0, 0, size, size)

    const tileSize = 64
    for (let y = 0; y < size; y += tileSize) {
      for (let x = 0; x < size; x += tileSize) {
        const randTone = ((x * 13 + y * 29) % 23) / 23
        const shade = Math.floor(40 + randTone * 25)
        ctxA.fillStyle = `rgb(${shade}, ${shade + 6}, ${shade + 14})`
        ctxA.fillRect(x + 1, y + 1, tileSize - 2, tileSize - 2)

        // Seams in bump
        ctxB.fillStyle = '#404040'
        ctxB.fillRect(x, y, tileSize, 2)
        ctxB.fillRect(x, y, 2, tileSize)
        ctxB.fillStyle = '#a0a0a0'
        ctxB.fillRect(x + 2, y + 2, tileSize - 4, tileSize - 4)

        // Roughness variation
        const roughVal = Math.floor(65 + randTone * 40)
        ctxR.fillStyle = `rgb(${roughVal}, ${roughVal}, ${roughVal})`
        ctxR.fillRect(x + 1, y + 1, tileSize - 2, tileSize - 2)

        // Rivets along plate edges
        for (let r = 8; r < tileSize; r += 16) {
          ctxB.fillStyle = '#ffffff'
          ctxB.fillRect(x + r, y + 3, 2, 2)
          ctxB.fillRect(x + 3, y + r, 2, 2)
        }

        // Thousands of microscopic warm-amber (#ffaa44) & cyan (#00e5ff) inspection window strips
        if ((x + y) % 128 === 0) {
          for (let row = 10; row < tileSize - 10; row += 12) {
            for (let col = 8; col < tileSize - 8; col += 7) {
              if (Math.random() > 0.28) {
                const isCyan = (x * y + col) % 7 === 0
                const winColor = isCyan ? '#00e5ff' : '#ffaa44'
                ctxE.fillStyle = winColor
                ctxE.fillRect(x + col, y + row, 4, 2)
                ctxA.fillStyle = winColor
                ctxA.fillRect(x + col, y + row, 4, 2)
              }
            }
          }
        }

        // Hazard stencils & warning markers
        if ((x * 7 + y * 3) % 256 === 0) {
          ctxE.fillStyle = '#ff3344'
          ctxE.fillRect(x + 12, y + tileSize - 8, 14, 3)
          ctxE.fillStyle = '#ffbb00'
          ctxE.fillRect(x + 32, y + tileSize - 8, 18, 3)
        }
      }
    }

    const map = new THREE.CanvasTexture(cAlbedo)
    map.wrapS = THREE.RepeatWrapping
    map.wrapT = THREE.RepeatWrapping
    map.repeat.set(4, 4)

    const bumpMap = new THREE.CanvasTexture(cBump)
    bumpMap.wrapS = THREE.RepeatWrapping
    bumpMap.wrapT = THREE.RepeatWrapping
    bumpMap.repeat.set(4, 4)

    const roughnessMap = new THREE.CanvasTexture(cRough)
    roughnessMap.wrapS = THREE.RepeatWrapping
    roughnessMap.wrapT = THREE.RepeatWrapping
    roughnessMap.repeat.set(4, 4)

    const emissiveMap = new THREE.CanvasTexture(cEmiss)
    emissiveMap.wrapS = THREE.RepeatWrapping
    emissiveMap.wrapT = THREE.RepeatWrapping
    emissiveMap.repeat.set(4, 4)

    return { map, bumpMap, roughnessMap, emissiveMap }
  }

  // ISS 级高精度双面深蓝硅光伏与铜导电母线贴图
  private createISSSolarWingMaps(): { map: THREE.CanvasTexture; bump: THREE.CanvasTexture } {
    const size = 512
    const cA = document.createElement('canvas')
    cA.width = size
    cA.height = size
    const ctxA = cA.getContext('2d')!

    const cB = document.createElement('canvas')
    cB.width = size
    cB.height = size
    const ctxB = cB.getContext('2d')!

    ctxA.fillStyle = '#071224'
    ctxA.fillRect(0, 0, size, size)
    ctxB.fillStyle = '#808080'
    ctxB.fillRect(0, 0, size, size)

    // 细密硅光子单晶晶胞 (#0f2a4a)
    const cellW = 16
    const cellH = 32
    for (let y = 0; y < size; y += cellH) {
      for (let x = 0; x < size; x += cellW) {
        ctxA.fillStyle = (x / cellW + y / cellH) % 2 === 0 ? '#0b1d38' : '#08172e'
        ctxA.fillRect(x + 1, y + 1, cellW - 2, cellH - 2)

        ctxB.fillStyle = '#a0a0a0'
        ctxB.fillRect(x + 1, y + 1, cellW - 2, cellH - 2)
      }
    }

    // 亮银/铜色汇流条 (Silver / Copper Busbars)
    ctxA.strokeStyle = '#38bdf8'
    ctxA.lineWidth = 1
    for (let x = cellW / 2; x < size; x += cellW) {
      ctxA.beginPath()
      ctxA.moveTo(x, 0)
      ctxA.lineTo(x, size)
      ctxA.stroke()
    }

    ctxA.strokeStyle = '#d97706'
    ctxA.lineWidth = 3
    for (let y = cellH; y < size; y += cellH * 2) {
      ctxA.beginPath()
      ctxA.moveTo(0, y)
      ctxA.lineTo(size, y)
      ctxA.stroke()
    }

    const map = new THREE.CanvasTexture(cA)
    map.wrapS = THREE.RepeatWrapping
    map.wrapT = THREE.RepeatWrapping
    map.repeat.set(2, 2)

    const bump = new THREE.CanvasTexture(cB)
    bump.wrapS = THREE.RepeatWrapping
    bump.wrapT = THREE.RepeatWrapping
    bump.repeat.set(2, 2)

    return { map, bump }
  }

  // 高动态 Studio/Space HDR 环境贴图探针
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
          vec3 zenith = vec3(0.18, 0.28, 0.48);
          vec3 atmosphereBounce = vec3(0.25, 0.62, 1.25);
          vec3 base = mix(atmosphereBounce, zenith, smoothstep(-0.6, 0.6, d.y));
          float sunHighlight = pow(max(0.0, dot(d, normalize(vec3(0.68, 0.35, 0.64)))), 16.0);
          base += vec3(2.2, 2.0, 1.7) * sunHighlight;
          gl_FragColor = vec4(base, 1.0);
        }
      `
    })
    envScene.add(new THREE.Mesh(new THREE.SphereGeometry(40, 32, 16), skyMat))
    const envMap = pmrem.fromScene(envScene, 0.03).texture
    pmrem.dispose()
    return envMap
  }

  private createSoftRadialGlowSprite(): THREE.CanvasTexture {
    const c = document.createElement('canvas')
    c.width = 128
    c.height = 128
    const ctx = c.getContext('2d')!
    const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
    g.addColorStop(0, 'rgba(255, 255, 255, 1.0)')
    g.addColorStop(0.22, 'rgba(170, 238, 255, 0.85)')
    g.addColorStop(0.55, 'rgba(40, 175, 255, 0.25)')
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
    const g = ctx.createRadialGradient(128, 64, 8, 128, 64, 115)
    g.addColorStop(0, 'rgba(185, 225, 255, 0.38)')
    g.addColorStop(0.5, 'rgba(120, 185, 245, 0.16)')
    g.addColorStop(1, 'rgba(0, 0, 0, 0.0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 256, 128)
    return new THREE.CanvasTexture(c)
  }

  private createDenseSteamCloudTexture(): THREE.CanvasTexture {
    const c = document.createElement('canvas')
    c.width = 256
    c.height = 256
    const ctx = c.getContext('2d')!
    ctx.clearRect(0, 0, 256, 256)

    const puffs = [
      { x: 128, y: 128, r: 85, a: 0.45 },
      { x: 100, y: 110, r: 65, a: 0.35 },
      { x: 155, y: 115, r: 60, a: 0.35 },
      { x: 115, y: 155, r: 55, a: 0.30 },
      { x: 145, y: 150, r: 58, a: 0.32 },
      { x: 85, y: 135, r: 45, a: 0.25 },
      { x: 170, y: 135, r: 45, a: 0.25 }
    ]
    puffs.forEach((p) => {
      const g = ctx.createRadialGradient(p.x, p.y, 4, p.x, p.y, p.r)
      g.addColorStop(0, `rgba(225, 242, 255, ${p.a})`)
      g.addColorStop(0.5, `rgba(165, 205, 245, ${p.a * 0.55})`)
      g.addColorStop(1, 'rgba(100, 150, 200, 0.0)')
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fill()
    })
    return new THREE.CanvasTexture(c)
  }

  private createFrozenWanderingEarthTextures() {
    const dayC = document.createElement('canvas')
    dayC.width = 2048
    dayC.height = 1024
    const dCtx = dayC.getContext('2d')!

    const seaGrad = dCtx.createLinearGradient(0, 0, 0, 1024)
    seaGrad.addColorStop(0, '#adc9e6')
    seaGrad.addColorStop(0.18, '#173f73')
    seaGrad.addColorStop(0.5, '#0c2b59')
    seaGrad.addColorStop(0.82, '#173f73')
    seaGrad.addColorStop(1, '#bfd8f2')
    dCtx.fillStyle = seaGrad
    dCtx.fillRect(0, 0, 2048, 1024)

    const bumpC = document.createElement('canvas')
    bumpC.width = 1024
    bumpC.height = 512
    const bCtx = bumpC.getContext('2d')!
    bCtx.fillStyle = '#202020'
    bCtx.fillRect(0, 0, 1024, 512)

    const nightC = document.createElement('canvas')
    nightC.width = 2048
    nightC.height = 1024
    const nCtx = nightC.getContext('2d')!
    nCtx.fillStyle = '#000000'
    nCtx.fillRect(0, 0, 2048, 1024)

    const landmasses = [
      { x: 1240, y: 290, rx: 420, ry: 175 },
      { x: 1060, y: 540, rx: 165, ry: 195 },
      { x: 450, y: 310, rx: 250, ry: 155 },
      { x: 610, y: 660, rx: 120, ry: 190 },
      { x: 1590, y: 690, rx: 130, ry: 95 }
    ]

    landmasses.forEach((m) => {
      for (let i = 0; i < 95; i++) {
        const ang = (i / 95) * Math.PI * 2
        const jitter = 0.55 + 0.45 * Math.sin(i * 4.3) * Math.cos(i * 2.7)
        const cx = m.x + Math.cos(ang) * m.rx * jitter
        const cy = m.y + Math.sin(ang) * m.ry * jitter
        const rad = 35 + (i % 45)

        const landG = dCtx.createRadialGradient(cx, cy, 4, cx, cy, rad)
        landG.addColorStop(0, '#eef6ff')
        landG.addColorStop(0.55, '#a8c7e6')
        landG.addColorStop(0.9, '#4c6d8c')
        landG.addColorStop(1, 'rgba(23, 63, 115, 0)')
        dCtx.fillStyle = landG
        dCtx.beginPath()
        dCtx.arc(cx, cy, rad, 0, Math.PI * 2)
        dCtx.fill()

        bCtx.fillStyle = 'rgba(235, 235, 235, 0.35)'
        bCtx.beginPath()
        bCtx.arc(cx * 0.5, cy * 0.5, rad * 0.4, 0, Math.PI * 2)
        bCtx.fill()
      }

      nCtx.strokeStyle = 'rgba(255, 175, 65, 0.28)'
      nCtx.lineWidth = 1.2
      const hubs: [number, number][] = []
      for (let h = 0; h < 28; h++) {
        const hx = m.x + (Math.random() - 0.5) * m.rx * 1.35
        const hy = m.y + (Math.random() - 0.5) * m.ry * 1.25
        hubs.push([hx, hy])
        if (h > 0) {
          nCtx.beginPath()
          nCtx.moveTo(hubs[h - 1][0], hubs[h - 1][1])
          nCtx.lineTo(hx, hy)
          nCtx.stroke()
        }
        for (let p = 0; p < 22; p++) {
          const px = hx + (Math.random() - 0.5) * 42
          const py = hy + (Math.random() - 0.5) * 42
          nCtx.fillStyle = Math.random() > 0.22 ? '#ffbb55' : '#66e0ff'
          nCtx.fillRect(px, py, 2.4, 2.4)
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

  private createFluffyCloudsTexture(): THREE.CanvasTexture {
    const c = document.createElement('canvas')
    c.width = 1024
    c.height = 512
    const ctx = c.getContext('2d')!
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, 1024, 512)

    for (let i = 0; i < 420; i++) {
      const x = Math.random() * 1024
      const y = 40 + Math.random() * 432
      const rx = 25 + Math.random() * 85
      const ry = 8 + Math.random() * 24
      const g = ctx.createRadialGradient(x, y, 2, x, y, rx)
      g.addColorStop(0, 'rgba(255, 255, 255, 0.65)')
      g.addColorStop(0.5, 'rgba(240, 248, 255, 0.28)')
      g.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.ellipse(x, y, rx, ry, (Math.random() - 0.5) * 0.4, 0, Math.PI * 2)
      ctx.fill()
    }
    return new THREE.CanvasTexture(c)
  }

  private createSharpLunarCraterTexture(): THREE.CanvasTexture {
    const c = document.createElement('canvas')
    c.width = 1024
    c.height = 512
    const ctx = c.getContext('2d')!
    // 调暗月球玄武岩与月壤基底颜色，杜绝高光白曝！
    ctx.fillStyle = '#7a8088'
    ctx.fillRect(0, 0, 1024, 512)

    const mares = [
      { x: 340, y: 200, r: 120 },
      { x: 490, y: 235, r: 105 },
      { x: 660, y: 215, r: 85 },
      { x: 245, y: 315, r: 78 }
    ]
    mares.forEach((m) => {
      const g = ctx.createRadialGradient(m.x, m.y, 12, m.x, m.y, m.r)
      g.addColorStop(0, '#383d44')
      g.addColorStop(0.7, '#4e545c')
      g.addColorStop(1, 'rgba(122, 128, 136, 0)')
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2)
      ctx.fill()
    })

    for (let i = 0; i < 1400; i++) {
      const x = Math.random() * 1024
      const y = Math.random() * 512
      const r = 1.5 + Math.pow(Math.random(), 3) * 30
      ctx.strokeStyle = 'rgba(180, 185, 192, 0.45)'
      ctx.lineWidth = 1.3
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.stroke()
      ctx.fillStyle = 'rgba(35, 38, 44, 0.52)'
      ctx.beginPath()
      ctx.arc(x + 0.8, y + 0.8, r * 0.82, 0, Math.PI * 2)
      ctx.fill()
    }
    return new THREE.CanvasTexture(c)
  }

  // ============================================================================
  // 2. 4-LAYER FLUID-DYNAMICS PLASMA PLUME & GOD-RAY SHADERS
  // ============================================================================
  public createCollimatedCoreRayShader(ignitionThreshold = 0.0): THREE.ShaderMaterial {
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
          float corePin = pow(cosView, 2.0);

          // 核心点 1：下部 35% 脉动马赫震波环 (Mach Shock-Diamond Oscillations in lower 35%)
          float machWave = sin(vUv.y * 65.0 - uTime * 20.0);
          float shockDiamond = smoothstep(0.35, 0.95, machWave) * smoothstep(0.40, 0.02, vUv.y) * 0.75;

          // 纵向羽流高速纤维流动
          float filaments = 0.85 + 0.15 * sin(vUv.x * 48.0 + sin(vUv.y * 28.0 - uTime * 18.0));
          // 顶部羽化消散 (NEVER a flat cut top!)
          float featherTop = smoothstep(1.0, 0.60, vUv.y) * smoothstep(0.0, 0.015, vUv.y);
          float growMask = smoothstep(vUv.y, vUv.y - 0.12, ig);

          // 纯白高光白芯 (#ffffff) -> 蔚蓝等离子电离边缘 (#00e5ff)
          vec3 nominalCol = mix(vec3(0.08, 0.82, 1.6), vec3(2.2, 2.35, 2.5), corePin + shockDiamond * 0.5);
          // 超载模式：优雅切换为白金白炽核心 (#fff2cc) 与暖橙护套 (#ff8800)
          vec3 overclockCol = mix(vec3(1.3, 0.55, 0.05), vec3(2.5, 2.2, 1.4), corePin + shockDiamond * 0.5);
          vec3 finalCol = mix(nominalCol, overclockCol, uOverclock) * filaments;

          float alpha = clamp((corePin * 0.75 + shockDiamond) * featherTop * growMask * clamp(uThrust, 0.25, 1.2), 0.0, 0.88);
          gl_FragColor = vec4(finalCol, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    })
  }

  public createOuterIonSheathShader(ignitionThreshold = 0.0): THREE.ShaderMaterial {
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

        float hash2(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
        }
        float noise2(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(hash2(i), hash2(i + vec2(1.0, 0.0)), f.x),
            mix(hash2(i + vec2(0.0, 1.0)), hash2(i + vec2(1.0, 1.0)), f.x),
            f.y
          );
        }

        void main() {
          float ig = clamp((uIgnitionProgress - uIgnitionThreshold) * 4.5, 0.0, 1.0);
          if (ig <= 0.01 || uThrust <= 0.01) discard;

          // 视线夹角高斯衰减：消除圆柱侧缘生硬切线，保证柔和体积光晕
          float cosAngle = abs(dot(normalize(vNormal), normalize(vViewDir)));
          float r = 1.0 - cosAngle;
          float gaussianRadial = exp(-pow(r * 2.5, 2.0));

          // 顶部羽化消散 smoothstep(1.0, 0.55, vUv.y)
          float featherTop = smoothstep(1.0, 0.55, vUv.y) * smoothstep(0.0, 0.03, vUv.y);

          // 向上滚动的湍流等离子纤维 (vUv.y - uTime * 6.0)
          vec2 uvFlow = vec2(vUv.x * 10.0, vUv.y * 14.0 - uTime * 6.0);
          float n = noise2(uvFlow) * 0.65 + noise2(uvFlow * 2.5 + 2.1) * 0.35;

          vec3 colBlue = vec3(0.12, 0.72, 1.45);
          vec3 colGold = vec3(1.35, 0.65, 0.12);
          vec3 col = mix(colBlue, colGold, uOverclock);

          float alpha = clamp(gaussianRadial * featherTop * (0.75 + n * 0.45) * ig * 0.65 * uThrust, 0.0, 0.65);
          gl_FragColor = vec4(col, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    })
  }

  public createAtmosphericGodRayShader(ignitionThreshold = 0.0): THREE.ShaderMaterial {
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

          // 横向高斯衰减：从中心向两侧柔和羽化
          float xDist = abs(vUv.x - 0.5) * 2.0;
          float gaussX = exp(-pow(xDist * 2.2, 2.0));

          // 纵向消散与基部渐出
          float vertFade = smoothstep(1.0, 0.55, vUv.y) * smoothstep(0.0, 0.025, vUv.y);

          // 动态高光光柱闪烁
          float shimmer = 0.85 + 0.15 * sin(vUv.y * 30.0 - uTime * 7.5);

          vec3 colBlue = vec3(0.18, 0.70, 1.4);
          vec3 colCore = vec3(0.9, 1.2, 1.6);
          vec3 colGold = vec3(1.35, 0.85, 0.4);
          vec3 baseCol = mix(colBlue, colGold, uOverclock);
          vec3 finalCol = mix(baseCol, colCore, gaussX * 0.45);

          float alpha = clamp(gaussX * vertFade * shimmer * ig * 0.48 * uThrust, 0.0, 0.65);
          gl_FragColor = vec4(finalCol, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    })
  }

  // ============================================================================
  // 3A. NODE 2: 11KM HEAVY-FUSION PLANETARY ENGINE (120+ CAD SUB-MESHES & FLUID STACK)
  // ============================================================================
  public buildBrutalistPlanetaryEngine(
    scale = 1.0,
    plumeHeight = 14.5,
    ignitionThreshold = 0.0
  ): BrutalistEngineRig {
    const group = new THREE.Group()
    const strobes: THREE.Mesh[] = []

    const darkArmoredSteel = new THREE.MeshStandardMaterial({
      color: 0x222834,
      map: this.pbrMaps.map,
      bumpMap: this.pbrMaps.bumpMap,
      bumpScale: 0.035,
      roughnessMap: this.pbrMaps.roughnessMap,
      emissiveMap: this.pbrMaps.emissiveMap,
      emissive: new THREE.Color(0xffffff),
      emissiveIntensity: 0.85,
      metalness: 0.78,
      roughness: 0.42,
      envMapIntensity: 1.8
    })

    const gunmetal = new THREE.MeshStandardMaterial({
      color: 0x1e2430,
      metalness: 0.85,
      roughness: 0.35,
      envMapIntensity: 1.8
    })

    const chromePiston = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      metalness: 0.98,
      roughness: 0.08,
      envMapIntensity: 2.4
    })

    const warningOrange = new THREE.MeshBasicMaterial({ color: 0xff9922 })
    const cyanCoil = new THREE.MeshBasicMaterial({ color: 0x00f5ff })
    const redStrobe = new THREE.MeshBasicMaterial({ color: 0xff1e38 })

    // -------------------------------------------------------------------------
    // 1. 地下基座与八角环形防爆开挖深坑 (Subterranean Excavation Basin)
    // -------------------------------------------------------------------------
    const baseOctagon = new THREE.Mesh(new THREE.CylinderGeometry(0.88, 1.12, 0.18, 8), darkArmoredSteel)
    baseOctagon.position.y = 0.09
    group.add(baseOctagon)

    // 八面环形泄爆排气壕沟与阶梯护堤 (Blast Deflector Trenches)
    const blastDike = new THREE.Mesh(new THREE.TorusGeometry(1.22, 0.07, 8, 8), gunmetal)
    blastDike.rotation.x = Math.PI * 0.5
    blastDike.position.y = 0.06
    group.add(blastDike)

    // -------------------------------------------------------------------------
    // 2. 8 根野兽派外挑大支撑臂 (8 Massive Splayed Cathedral Flying Buttress Pylons)
    // -------------------------------------------------------------------------
    const buttressRadiusOuter = 1.25
    for (let i = 0; i < 8; i++) {
      const ang = (i / 8) * Math.PI * 2
      const legG = new THREE.Group()
      legG.rotation.y = ang

      // A. 主承力梯形巨型斜梁 (Tapered Monolithic Box Girder)
      const mainGirder = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.92, 0.22), darkArmoredSteel)
      mainGirder.position.set(0, 0.38, 0.85)
      mainGirder.rotation.x = -0.72
      legG.add(mainGirder)

      // B. 双侧加固三角翼板 (Lateral Reinforcement Gussets)
      for (const side of [-0.075, 0.075]) {
        const gusset = new THREE.Mesh(new THREE.BoxGeometry(0.024, 0.84, 0.12), gunmetal)
        gusset.position.set(side, 0.36, 0.83)
        gusset.rotation.x = -0.72
        legG.add(gusset)
      }

      // C. 中央超高压液压缓冲活塞柱 (High-Pressure Hydraulic Ram)
      const hydPiston = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.78, 10), chromePiston)
      hydPiston.position.set(0, 0.32, 0.90)
      hydPiston.rotation.x = -0.72
      legG.add(hydPiston)

      // D. 岩层重载履带锚固靴 (Heavy Armored Rock Shoe Boot)
      const boot = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.12, 0.35), darkArmoredSteel)
      boot.position.set(0, 0.06, buttressRadiusOuter)
      legG.add(boot)

      // E. 防撞警示红闪灯与黄色安全标语带
      const st = new THREE.Mesh(new THREE.SphereGeometry(0.028, 8, 8), redStrobe)
      st.position.set(0, 0.15, buttressRadiusOuter + 0.12)
      legG.add(st)
      strobes.push(st)

      const warnBand = new THREE.Mesh(new THREE.BoxGeometry(0.33, 0.025, 0.12), warningOrange)
      warnBand.position.set(0, 0.11, buttressRadiusOuter)
      legG.add(warnBand)

      // F. 防爆泛光投光灯塔 (Perimeter Floodlight Tower)
      const towerPost = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.48, 6), darkArmoredSteel)
      towerPost.position.set(0.18, 0.24, buttressRadiusOuter - 0.08)
      legG.add(towerPost)

      group.add(legG)

      // G. 相邻两臂之间的横向弧形加固联络天桥 (Cathedral Cross-Tie Beam)
      const nextAng = ((i + 1) / 8) * Math.PI * 2
      const midAng = (ang + nextAng) * 0.5
      const bridgeR = 0.92
      const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.05, 0.08), gunmetal)
      bridge.position.set(Math.cos(midAng) * bridgeR, 0.32, Math.sin(midAng) * bridgeR)
      bridge.rotation.y = -midAng + Math.PI * 0.5
      group.add(bridge)
    }

    // -------------------------------------------------------------------------
    // 3. 双曲面收腰巨塔本体与 32 根外挑散热肋片 (Hyperbolic Tower & 32 Cooling Fins)
    // -------------------------------------------------------------------------
    // 下部收腰基座 (Waisted Cooling Tower Body)
    const towerGeo = new THREE.CylinderGeometry(0.54, 0.78, 0.45, 32, 1, true)
    const towerMesh = new THREE.Mesh(towerGeo, darkArmoredSteel)
    towerMesh.position.y = 0.30
    group.add(towerMesh)

    // 上部扩展火山口塔颈 (Upper Flared Neck)
    const neckGeo = new THREE.CylinderGeometry(0.68, 0.54, 0.32, 32, 1, true)
    const neckMesh = new THREE.Mesh(neckGeo, darkArmoredSteel)
    neckMesh.position.y = 0.62
    group.add(neckMesh)

    // 32 根锐利垂直外挑结构散热肋片 (32 Sharp Vertical Structural Cooling Fins)
    for (let f = 0; f < 32; f++) {
      const fAng = (f / 32) * Math.PI * 2
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.024, 0.68, 0.20), darkArmoredSteel)
      fin.position.set(Math.cos(fAng) * 0.62, 0.44, Math.sin(fAng) * 0.62)
      fin.rotation.y = -fAng
      fin.rotation.x = -0.28
      group.add(fin)
    }

    // 8 层水平加固外悬环形检修栈桥 (8 Horizontal Reinforcement Ring Gantries)
    for (let t = 0; t < 8; t++) {
      const ringR = 0.74 - t * 0.028 + (t > 4 ? (t - 4) * 0.04 : 0)
      const ringY = 0.16 + t * 0.075
      const gantry = new THREE.Mesh(new THREE.TorusGeometry(ringR, 0.014, 6, 32), gunmetal)
      gantry.rotation.x = Math.PI * 0.5
      gantry.position.y = ringY
      group.add(gantry)
    }

    // 4 根全高外挂工字钢工程电梯井与发光轿厢 (Vertical Elevator Shafts)
    for (let e = 0; e < 4; e++) {
      const eAng = (e / 4) * Math.PI * 2 + Math.PI / 4
      const shaft = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.74, 0.065), gunmetal)
      shaft.position.set(Math.cos(eAng) * 0.64, 0.44, Math.sin(eAng) * 0.64)
      group.add(shaft)

      // 电梯透明黄色工作光舱
      const car = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.05, 0.04), warningOrange)
      car.position.set(Math.cos(eAng) * 0.67, 0.25 + (e * 0.12), Math.sin(eAng) * 0.67)
      group.add(car)
    }

    // -------------------------------------------------------------------------
    // 4. 4km 宽喷口上层重工业建筑群 (Upper Rim Superstructure & Machinery Modules)
    // -------------------------------------------------------------------------
    // 喷口环形重装甲唇缘 (Armored Toroidal Crater Lip)
    const rimArmor = new THREE.Mesh(new THREE.TorusGeometry(0.68, 0.045, 12, 32), darkArmoredSteel)
    rimArmor.rotation.x = Math.PI * 0.5
    rimArmor.position.y = 0.76
    group.add(rimArmor)

    // 16 座环绕喷口边缘的重型机械模块建筑与检修机房 (16 Crenellated Machinery Housings)
    for (let b = 0; b < 16; b++) {
      const bAng = (b / 16) * Math.PI * 2
      const block = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.14, 0.16), darkArmoredSteel)
      block.position.set(Math.cos(bAng) * 0.72, 0.81, Math.sin(bAng) * 0.72)
      block.rotation.y = -bAng
      group.add(block)

      // 机房屋顶通气管道与散热百叶窗
      const vent = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.04, 0.09), gunmetal)
      vent.position.set(Math.cos(bAng) * 0.72, 0.89, Math.sin(bAng) * 0.72)
      vent.rotation.y = -bAng
      group.add(vent)
    }

    // 4 组向内伸出的悬臂重型起重行车 (4 Heavy Cantilevered Gantry Crane Booms)
    for (let c = 0; c < 4; c++) {
      const cAng = (c / 4) * Math.PI * 2 + 0.35
      const crane = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.05, 0.28), warningOrange)
      crane.position.set(Math.cos(cAng) * 0.62, 0.85, Math.sin(cAng) * 0.62)
      crane.rotation.y = -cAng + Math.PI * 0.5
      group.add(crane)
    }

    // 4 根斜向重元素矿石燃料注入滑道 (4 Angled Rock Fuel Feed Chutes)
    for (let ch = 0; ch < 4; ch++) {
      const chAng = (ch / 4) * Math.PI * 2 + 1.15
      const chute = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, 0.42, 8), gunmetal)
      chute.position.set(Math.cos(chAng) * 0.65, 0.68, Math.sin(chAng) * 0.65)
      chute.rotation.x = 0.55
      chute.rotation.y = -chAng
      group.add(chute)
    }

    // 喷口上沿 8 盏高照度防撞红闪灯
    for (let s = 0; s < 8; s++) {
      const sAng = (s / 8) * Math.PI * 2
      const strobe = new THREE.Mesh(new THREE.SphereGeometry(0.024, 8, 8), redStrobe)
      strobe.position.set(Math.cos(sAng) * 0.73, 0.89, Math.sin(sAng) * 0.73)
      group.add(strobe)
      strobes.push(strobe)
    }

    // -------------------------------------------------------------------------
    // 5. 凹陷重聚变反应加速膛与 7 联装喷口 (Recessed 7-Nozzle Fusion Core)
    // -------------------------------------------------------------------------
    const throatPlate = new THREE.Mesh(new THREE.CylinderGeometry(0.60, 0.48, 0.12, 32), gunmetal)
    throatPlate.position.y = 0.71
    group.add(throatPlate)

    // 主超导磁约束超导线圈大环
    const mainMagRing = new THREE.Mesh(new THREE.TorusGeometry(0.58, 0.022, 8, 32), cyanCoil)
    mainMagRing.rotation.x = Math.PI * 0.5
    mainMagRing.position.y = 0.75
    group.add(mainMagRing)

    // 7 联装独立环形聚变加速喷嘴座标 (Center + Hexagon)
    const nozzleCenters: [number, number][] = [[0, 0]]
    for (let n = 0; n < 6; n++) {
      const a = (n / 6) * Math.PI * 2
      nozzleCenters.push([Math.cos(a) * 0.24, Math.sin(a) * 0.24])
    }

    // -------------------------------------------------------------------------
    // 6. 4 层流体等离子巨型羽流栈 (Mach Diamond Cores + Sheath + God Rays + Particles + Vapor)
    // -------------------------------------------------------------------------
    const plumeAssembly = new THREE.Group()
    plumeAssembly.position.y = 0.74

    const coreRayMat = this.createCollimatedCoreRayShader(ignitionThreshold)
    const sheathMat = this.createOuterIonSheathShader(ignitionThreshold)
    const godRayMat = this.createAtmosphericGodRayShader(ignitionThreshold)

    // 7 联装独立小喷嘴
    const singleCoreGeo = new THREE.CylinderGeometry(0.065, 0.09, plumeHeight, 10, 32, true)
    singleCoreGeo.translate(0, plumeHeight * 0.5, 0)

    nozzleCenters.forEach(([nx, nz], idx) => {
      // 喷嘴金属托架与青色约束环
      const isCenter = idx === 0
      const bellRadius = isCenter ? 0.11 : 0.08
      const nozzleBell = new THREE.Mesh(
        new THREE.CylinderGeometry(bellRadius * 1.15, bellRadius, 0.12, 16, 1, true),
        chromePiston
      )
      nozzleBell.position.set(nx, 0.72, nz)
      group.add(nozzleBell)

      const coil = new THREE.Mesh(new THREE.TorusGeometry(bellRadius * 1.1, 0.012, 8, 16), cyanCoil)
      coil.rotation.x = Math.PI * 0.5
      coil.position.set(nx, 0.74, nz)
      group.add(coil)

      // 准直白金光芯
      const rayMesh = new THREE.Mesh(singleCoreGeo, coreRayMat)
      rayMesh.position.set(nx, 0, nz)
      plumeAssembly.add(rayMesh)
    })

    // 中央巨型主等离子炽热核 (Primary Volumetric Core Column)
    const primaryCoreGeo = new THREE.CylinderGeometry(0.32, 0.65, plumeHeight, 20, 32, true)
    primaryCoreGeo.translate(0, plumeHeight * 0.5, 0)
    plumeAssembly.add(new THREE.Mesh(primaryCoreGeo, coreRayMat))

    // 外围高斯衰减等离子护鞘 (Expanding Volumetric Outer Ion Sheath)
    const sheathGeo = new THREE.CylinderGeometry(0.68, 1.65, plumeHeight * 0.98, 24, 24, true)
    sheathGeo.translate(0, plumeHeight * 0.49, 0)
    plumeAssembly.add(new THREE.Mesh(sheathGeo, sheathMat))

    // 4 向十字交叉大气体积光轴面片 (Crossed Volumetric God-Ray Planes)
    const godRayGeo = new THREE.PlaneGeometry(3.0, plumeHeight, 1, 16)
    godRayGeo.translate(0, plumeHeight * 0.5, 0)
    for (let r = 0; r < 4; r++) {
      const plane = new THREE.Mesh(godRayGeo, godRayMat)
      plane.rotation.y = (r / 4) * Math.PI
      plumeAssembly.add(plane)
    }

    // 喷口星芒光学耀斑 (Nozzle Crown Flare)
    const flareGeo = new THREE.PlaneGeometry(3.6, 3.6)
    const flareMat = new THREE.MeshBasicMaterial({
      map: this.softGlowSprite,
      transparent: true,
      opacity: 0.78,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
    const crownFlareMesh = new THREE.Mesh(flareGeo, flareMat)
    crownFlareMesh.rotation.x = -Math.PI * 0.5
    crownFlareMesh.position.y = 0.05
    plumeAssembly.add(crownFlareMesh)

    // 大气穿透激波环 (Atmospheric Shock Wave Ring)
    const shockRingGeo = new THREE.RingGeometry(0.35, 2.85, 32)
    const shockRingMat = new THREE.MeshBasicMaterial({
      color: 0x60d5ff,
      transparent: true,
      opacity: 0.42,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    })
    const shockRingMesh = new THREE.Mesh(shockRingGeo, shockRingMat)
    shockRingMesh.rotation.x = -Math.PI * 0.5
    shockRingMesh.position.y = plumeHeight * 0.16
    plumeAssembly.add(shockRingMesh)

    // -------------------------------------------------------------------------
    // 7. 高速冲天离子粒子流 (High-Speed Upward Streaming Ions - THREE.Points)
    // -------------------------------------------------------------------------
    const ionCount = 750
    const ionPos = new Float32Array(ionCount * 3)
    const ionVelocities = new Float32Array(ionCount)
    const ionColors = new Float32Array(ionCount * 3)

    for (let i = 0; i < ionCount; i++) {
      const rad = 0.05 + Math.pow(Math.random(), 2.0) * 0.55
      const theta = Math.random() * Math.PI * 2
      const y = Math.random() * plumeHeight

      ionPos[i * 3] = Math.cos(theta) * rad * (1.0 + (y / plumeHeight) * 1.6)
      ionPos[i * 3 + 1] = y
      ionPos[i * 3 + 2] = Math.sin(theta) * rad * (1.0 + (y / plumeHeight) * 1.6)

      ionVelocities[i] = 0.15 + Math.random() * 0.32

      const normY = y / plumeHeight
      ionColors[i * 3] = THREE.MathUtils.lerp(1.0, 0.15, normY)
      ionColors[i * 3 + 1] = THREE.MathUtils.lerp(1.0, 0.78, normY)
      ionColors[i * 3 + 2] = 1.0
    }

    const ionGeo = new THREE.BufferGeometry()
    ionGeo.setAttribute('position', new THREE.BufferAttribute(ionPos, 3))
    ionGeo.setAttribute('color', new THREE.BufferAttribute(ionColors, 3))

    const ionMat = new THREE.PointsMaterial({
      size: 0.16,
      vertexColors: true,
      map: this.softGlowSprite,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
    const ionPoints = new THREE.Points(ionGeo, ionMat)
    plumeAssembly.add(ionPoints)

    // -------------------------------------------------------------------------
    // 8. 滚滚等离子蒸汽云与冰雪升华烟雾群 (Volumetric Billowing Steam Clouds)
    // -------------------------------------------------------------------------
    const vaporSprites: THREE.Sprite[] = []
    const vaporMat = new THREE.SpriteMaterial({
      map: this.denseSteamTex,
      color: 0xd4ecff,
      transparent: true,
      opacity: 0.34,
      depthWrite: false,
      blending: THREE.NormalBlending
    })

    for (let v = 0; v < 18; v++) {
      const sp = new THREE.Sprite(vaporMat)
      const vAng = (v / 18) * Math.PI * 2 + (Math.random() - 0.5) * 0.25
      const vRad = 0.85 + Math.random() * 1.45
      const vY = 0.14 + Math.random() * 0.72
      sp.position.set(Math.cos(vAng) * vRad, vY, Math.sin(vAng) * vRad)
      const s = 1.5 + Math.random() * 2.0
      sp.scale.set(s, s * 0.8, 1)
      group.add(sp)
      vaporSprites.push(sp)
    }

    group.add(plumeAssembly)
    group.scale.setScalar(scale)

    return {
      group,
      plumeAssembly,
      coreRayMat,
      sheathMat,
      godRayMat,
      ionPoints,
      ionVelocities,
      vaporSprites,
      shockRingMesh,
      crownFlareMesh,
      strobes
    }
  }

  // ============================================================================
  // 3B. NODE 3: EQUATORIAL STEERING ARRAY (HEAVY DUAL-TRUNNION GIMBAL CRADLES)
  // ============================================================================
  public buildGimbalSteeringEngineUnit(scale = 1.0, plumeLength = 16.5): BrutalistEngineRig {
    const group = new THREE.Group()

    const darkSteel = new THREE.MeshStandardMaterial({
      color: 0x1f2633,
      map: this.pbrMaps.map,
      bumpMap: this.pbrMaps.bumpMap,
      bumpScale: 0.02,
      metalness: 0.88,
      roughness: 0.3,
      envMapIntensity: 1.8
    })
    const hydMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.92, roughness: 0.18 })

    // 1. 赤道装甲峡谷壕沟基座 (Armored Trench Foundation)
    const trenchBase = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.22, 1.35), darkSteel)
    trenchBase.position.y = 0.11
    group.add(trenchBase)

    // 2. U 型双耳轴万向节主支架 (U-Shaped Dual-Trunnion Gimbal Support Yoke)
    for (const s of [-0.68, 0.68]) {
      const arm = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.82, 0.48), darkSteel)
      arm.position.set(s, 0.48, 0)
      group.add(arm)

      const pivotBearing = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.28, 16), hydMat)
      pivotBearing.rotation.z = Math.PI * 0.5
      pivotBearing.position.set(s > 0 ? s - 0.08 : s + 0.08, 0.72, 0)
      group.add(pivotBearing)
    }

    // 双向巨型液压俯仰致动器 (Massive Hydraulic Pitch Actuators)
    const actuatorL = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.65, 8), hydMat)
    actuatorL.position.set(-0.52, 0.38, 0.32)
    actuatorL.rotation.x = -0.45
    const actuatorR = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.65, 8), hydMat)
    actuatorR.position.set(0.52, 0.38, 0.32)
    actuatorR.rotation.x = -0.45
    group.add(actuatorL, actuatorR)

    // 尾部方形平衡配重块 (Rear Counterweight Block)
    const counterweight = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.45, 0.42), darkSteel)
    counterweight.position.set(0, 0.35, -0.48)
    group.add(counterweight)

    // 内部安装的 22° 切向仰角喷口本体 (22° Tangential Tilt along the Equator)
    const engineRig = this.buildBrutalistPlanetaryEngine(0.88, plumeLength, 0.0)
    engineRig.group.position.set(0, 0.46, 0)
    // 22° above horizontal tangent: 90° - 22° = 68° = ~1.186 rad from vertical
    engineRig.group.rotation.x = Math.PI * 0.5 - 0.384
    group.add(engineRig.group)

    group.scale.setScalar(scale)
    return {
      group,
      plumeAssembly: engineRig.plumeAssembly,
      coreRayMat: engineRig.coreRayMat,
      sheathMat: engineRig.sheathMat,
      shockRingMesh: engineRig.shockRingMesh,
      crownFlareMesh: engineRig.crownFlareMesh,
      strobes: engineRig.strobes
    }
  }

  // ============================================================================
  // 3C. NODE 4: EQUATORIAL ANCHOR & AEROSPACE CLIMBER TRAINS (NO OVEREXPOSURE)
  // ============================================================================
  public buildEquatorialAnchorComplex(tetherLength = 42.0): {
    group: THREE.Group
    climberTrains: THREE.Group[]
  } {
    const group = new THREE.Group()
    const climberTrains: THREE.Group[] = []

    const fortressArmor = new THREE.MeshStandardMaterial({
      color: 0x334155,
      map: this.pbrMaps.map,
      bumpMap: this.pbrMaps.bumpMap,
      bumpScale: 0.022,
      roughnessMap: this.pbrMaps.roughnessMap,
      emissiveMap: this.pbrMaps.emissiveMap,
      // 严格钳制基座自发光强度 <= 0.7，彻底解决过曝大白球！
      emissive: new THREE.Color(0xffffff),
      emissiveIntensity: 0.55,
      metalness: 0.84,
      roughness: 0.32,
      envMapIntensity: 1.8
    })

    const latticeSteel = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      metalness: 0.88,
      roughness: 0.25,
      envMapIntensity: 1.8
    })

    const trainHullMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.92,
      roughness: 0.18,
      envMapIntensity: 2.0
    })

    const cyanTrackMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff })
    const warningAmber = new THREE.MeshBasicMaterial({ color: 0xffaa44 })

    // 1. 冰架海面上的多级八角要塞基座 (Tiered Octagonal Sea-Base Fortress)
    const baseOct = new THREE.Mesh(new THREE.CylinderGeometry(3.6, 4.2, 0.5, 8), fortressArmor)
    baseOct.position.y = 0.25
    const topOct = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.9, 0.6, 8), fortressArmor)
    topOct.position.y = 0.8
    group.add(baseOct, topOct)

    // 2. 6 座高耸交叉桁架垂直发射脐带塔 (6 Tall Lattice Launch Umbilical Towers)
    for (let i = 0; i < 6; i++) {
      const ang = (i / 6) * Math.PI * 2
      const tower = new THREE.Group()
      tower.rotation.y = ang

      const mast = new THREE.Mesh(new THREE.BoxGeometry(0.3, 6.2, 0.38), fortressArmor)
      mast.position.set(0, 3.1, 2.1)
      mast.rotation.x = -0.07
      tower.add(mast)

      // 交叉斜撑与维修吊车横梁 (Crane Gantries)
      for (let h = 0; h < 7; h++) {
        const brace = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.08, 0.72), latticeSteel)
        brace.position.set(0, 0.9 + h * 0.75, 1.88 - h * 0.05)
        brace.rotation.x = h % 2 === 0 ? 0.38 : -0.38
        tower.add(brace)
      }

      // 顶部悬挑起重机桁架臂 (Crane Boom)
      const craneArm = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.16, 1.4), latticeSteel)
      craneArm.position.set(0, 6.1, 1.4)
      tower.add(craneArm)

      // 垂直电磁发射感应轨 (Magnetic Induction Launch Rail)
      const magRail = new THREE.Mesh(new THREE.BoxGeometry(0.06, 5.8, 0.06), cyanTrackMat)
      magRail.position.set(0, 3.1, 1.76)
      magRail.rotation.x = -0.07
      tower.add(magRail)

      group.add(tower)
    }

    // 3. 3 根细编织碳纳米管天梯缆索 (Braided Carbon-Nanotube Tethers)
    const tetherMat = new THREE.MeshStandardMaterial({
      color: 0xc8d8ea,
      metalness: 0.92,
      roughness: 0.15,
      envMapIntensity: 2.0
    })
    for (let c = 0; c < 3; c++) {
      const cAng = (c / 3) * Math.PI * 2
      const cableGeo = new THREE.CylinderGeometry(0.035, 0.035, tetherLength, 8)
      cableGeo.translate(0, tetherLength * 0.5, 0)
      const cable = new THREE.Mesh(cableGeo, tetherMat)
      cable.position.set(Math.cos(cAng) * 0.45, 0.6, Math.sin(cAng) * 0.45)
      group.add(cable)
    }

    // 4. 高精气动造型太空电梯攀爬列车 (Detailed Aerospace Climber Trains)
    for (let p = 0; p < 3; p++) {
      const train = new THREE.Group()
      train.position.y = 2.2 + p * 2.8

      // 八角形细长货运机身 (Elongated Octagonal Cargo Module)
      const fuselage = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.52, 1.15, 8), trainHullMat)
      // 上下流线型锥形气动减阻鼻锥 (Tapered Aerodynamic Nosecones)
      const noseTop = new THREE.Mesh(new THREE.ConeGeometry(0.52, 0.42, 8), trainHullMat)
      noseTop.position.y = 0.78
      const noseBot = new THREE.Mesh(new THREE.ConeGeometry(0.52, 0.35, 8), trainHullMat)
      noseBot.position.y = -0.75
      noseBot.rotation.x = Math.PI
      train.add(fuselage, noseTop, noseBot)

      // 外附散热百叶板 (Thermal Radiator Fins)
      for (let r = 0; r < 4; r++) {
        const rAng = (r / 4) * Math.PI * 2
        const radFin = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.92, 0.28), latticeSteel)
        radFin.position.set(Math.cos(rAng) * 0.62, 0, Math.sin(rAng) * 0.62)
        radFin.rotation.y = -rAng
        train.add(radFin)
      }

      // 磁悬浮驱动夹钳与警示频闪光环 (Magnetic Drive Clamps & Strobe Ring)
      const driveClamp = new THREE.Mesh(new THREE.TorusGeometry(0.58, 0.035, 6, 16), warningAmber)
      driveClamp.rotation.x = Math.PI * 0.5
      train.add(driveClamp)

      group.add(train)
      climberTrains.push(train)
    }

    return { group, climberTrains }
  }

  // ============================================================================
  // 3D. NODE 5: TIANZHU APEX STATION (GEO ARK: LATTICE TRUSS + GOLD KAPTON + ISS WINGS)
  // ============================================================================
  public buildTianzhuApexStation(): {
    group: THREE.Group
    ringUpper: THREE.Group
    ringLower: THREE.Group
    strobes: THREE.Mesh[]
  } {
    const group = new THREE.Group()
    const strobes: THREE.Mesh[] = []

    const brushedTitanium = new THREE.MeshStandardMaterial({
      color: 0xc0c8d4,
      map: this.pbrMaps.map,
      bumpMap: this.pbrMaps.bumpMap,
      bumpScale: 0.015,
      metalness: 0.85,
      roughness: 0.25,
      envMapIntensity: 2.0
    })

    const openTrussMat = new THREE.MeshStandardMaterial({
      color: 0x3b4759,
      metalness: 0.9,
      roughness: 0.28,
      envMapIntensity: 1.8
    })

    // 真实褶皱质感金箔 Kapton 隔热膜 (Crinkled Gold Kapton Foil)
    const kaptonGoldFoil = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      bumpMap: this.pbrMaps.bumpMap,
      bumpScale: 0.06,
      metalness: 0.9,
      roughness: 0.25,
      envMapIntensity: 2.4
    })

    const darkSiliconMat = new THREE.MeshStandardMaterial({
      map: this.solarWingMaps.map,
      bumpMap: this.solarWingMaps.bump,
      bumpScale: 0.02,
      color: 0x091526,
      metalness: 0.92,
      roughness: 0.12,
      envMapIntensity: 2.0,
      side: THREE.DoubleSide
    })

    const windowStrips = new THREE.MeshBasicMaterial({
      map: this.pbrMaps.emissiveMap,
      color: 0xffe6b3
    })

    // 1. 中央开放式航空桁架主脊柱 (Open-Frame Aerospace Lattice Spine)
    for (let i = -8; i <= 8; i++) {
      const y = i * 0.58
      // 内部圆柱形生命保障加压舱
      const habMod = new THREE.Mesh(
        new THREE.CylinderGeometry(0.24, 0.24, 0.52, 12),
        Math.abs(i) % 3 === 1 ? kaptonGoldFoil : brushedTitanium
      )
      habMod.position.y = y
      group.add(habMod)

      // 外部四角工字开放式保护桁架笼 (Lattice Box Cage)
      for (let c = 0; c < 4; c++) {
        const cAng = (c / 4) * Math.PI * 2 + Math.PI / 4
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.56, 0.045), openTrussMat)
        leg.position.set(Math.cos(cAng) * 0.38, y, Math.sin(cAng) * 0.38)
        group.add(leg)
      }

      // 交叉加固环梁
      const ringCollar = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.06, 0.64), openTrussMat)
      ringCollar.position.y = y + 0.26
      group.add(ringCollar)

      // 两侧球形低温聚变推进剂贮箱 (Spherical Cryo-Propellant Tanks with Gold Kapton)
      if (i % 2 === 0) {
        for (const s of [-0.48, 0.48]) {
          const tank = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), kaptonGoldFoil)
          tank.position.set(s, y, 0)
          group.add(tank)
        }
      }
    }

    // 2. 16 舱段双层反向旋转离心重力环 (16-Segment Curved Centrifuge Rings with Bellows)
    const buildSegmentedCentrifuge = (radius: number) => {
      const ringG = new THREE.Group()

      for (let m = 0; m < 16; m++) {
        const ang = (m / 16) * Math.PI * 2
        // 弧形居住舱段
        const segment = new THREE.Mesh(
          new THREE.BoxGeometry(0.38, 0.36, 0.62),
          m % 4 === 0 ? kaptonGoldFoil : brushedTitanium
        )
        segment.position.set(Math.cos(ang) * radius, 0, Math.sin(ang) * radius)
        segment.rotation.y = -ang
        ringG.add(segment)

        // 柔性过渡膨胀风琴节 (Flexible Bellows)
        const bellow = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.12, 12), openTrussMat)
        bellow.rotation.z = Math.PI * 0.5
        bellow.rotation.y = -ang
        bellow.position.set(Math.cos(ang + Math.PI / 16) * radius, 0, Math.sin(ang + Math.PI / 16) * radius)
        ringG.add(bellow)

        // 外部百叶式辐射散热片 (Exterior Radiator Panels)
        if (m % 2 === 0) {
          const rad = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.02, 0.32), brushedTitanium)
          rad.position.set(Math.cos(ang) * (radius + 0.42), 0, Math.sin(ang) * (radius + 0.42))
          rad.rotation.y = -ang
          ringG.add(rad)
        }
      }

      // 观察舷窗发光带
      const winRing = new THREE.Mesh(new THREE.TorusGeometry(radius - 0.12, 0.05, 8, 64), windowStrips)
      winRing.rotation.x = Math.PI * 0.5
      ringG.add(winRing)

      // 8 根辐射状钛合金交通辐条
      for (let s = 0; s < 8; s++) {
        const spoke = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.048, radius * 2, 8), openTrussMat)
        spoke.rotation.z = Math.PI * 0.5
        spoke.rotation.y = (s / 8) * Math.PI
        ringG.add(spoke)
      }
      return ringG
    }

    const ringUpper = buildSegmentedCentrifuge(2.55)
    ringUpper.position.y = 1.35
    const ringLower = buildSegmentedCentrifuge(2.55)
    ringLower.position.y = -1.35
    group.add(ringUpper, ringLower)

    // 3. 8 幅 ISS 级双折蓝宝石硅光伏翼板 (Articulated Deployable Photovoltaic Wings)
    const mainBoom = new THREE.Mesh(new THREE.BoxGeometry(11.8, 0.22, 0.22), openTrussMat)
    group.add(mainBoom)

    for (const side of [-1, 1]) {
      for (let idx = 1; idx <= 2; idx++) {
        const x = side * (3.1 + idx * 1.7)
        // 旋转式双轴驱动万向铰链座 (Solar Alpha Rotary Joint)
        const sarj = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.42, 12), kaptonGoldFoil)
        sarj.position.set(x, 0, 0)
        group.add(sarj)

        for (const zDir of [-1, 1]) {
          // 4 块独立铰接子电池翼板 (4 Sub-Panels per Wing = 32 Total)
          for (let p = 0; p < 2; p++) {
            const pX = x + (p === 0 ? -0.42 : 0.42)
            const pZ = zDir * 1.65
            const wingBlanket = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.024, 2.85), darkSiliconMat)
            wingBlanket.position.set(pX, 0, pZ)
            wingBlanket.rotation.x = 0.12 * zDir
            group.add(wingBlanket)

            // 太阳翼背部轻量化展开三角桁架 (Deployment Mast)
            const mastFrame = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 2.9, 4), openTrussMat)
            mastFrame.position.set(pX, 0.03, pZ)
            mastFrame.rotation.x = Math.PI * 0.5 + 0.12 * zDir
            group.add(mastFrame)
          }
        }
      }
    }

    // 4. 空间站高频导航频闪灯 (Red Collision Avoidance Strobes)
    for (const pos of [
      new THREE.Vector3(0, 5.2, 0),
      new THREE.Vector3(0, -5.2, 0),
      new THREE.Vector3(6.2, 0.2, 0),
      new THREE.Vector3(-6.2, 0.2, 0)
    ]) {
      const strobe = new THREE.Mesh(
        new THREE.SphereGeometry(0.08, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xff2a4d })
      )
      strobe.position.copy(pos)
      group.add(strobe)
      strobes.push(strobe)
    }

    return { group, ringUpper, ringLower, strobes }
  }

  // ============================================================================
  // 3E. NODE 6: HABITAT RING AURORA (SPRAWLING ZERO-G SPACEPORT & BIOSPHERE)
  // ============================================================================
  public buildHabitatRingAurora(): THREE.Group {
    const aurora = new THREE.Group()

    const beveledTitanium = new THREE.MeshStandardMaterial({
      color: 0xd8e2ec,
      map: this.pbrMaps.map,
      bumpMap: this.pbrMaps.bumpMap,
      bumpScale: 0.02,
      roughnessMap: this.pbrMaps.roughnessMap,
      metalness: 0.82,
      roughness: 0.24,
      envMapIntensity: 2.0
    })

    const darkAlloy = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.88,
      roughness: 0.28,
      envMapIntensity: 1.8
    })

    const goldMirrorMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.94,
      roughness: 0.15,
      envMapIntensity: 2.2
    })

    const warmCityLights = new THREE.MeshBasicMaterial({
      map: this.pbrMaps.emissiveMap,
      color: 0xffe6b3
    })

    // 1. 斯坦福主圆环外装甲与内环生物圈玻璃穹顶 (Outer Armored Ring & Inner Biosphere Valley)
    const mainTorus = new THREE.Mesh(new THREE.TorusGeometry(5.4, 0.48, 24, 96), beveledTitanium)
    const subTorus = new THREE.Mesh(new THREE.TorusGeometry(3.6, 0.28, 20, 72), darkAlloy)
    const cityStrip = new THREE.Mesh(new THREE.TorusGeometry(4.95, 0.18, 12, 96), warmCityLights)
    aurora.add(mainTorus, subTorus, cityStrip)

    // 2. 24 组倒角重装生活舱段与轴向太阳反射镜 (Axial Mirror Reflectors)
    for (let i = 0; i < 24; i++) {
      const ang = (i / 24) * Math.PI * 2
      const block = new THREE.Mesh(new THREE.BoxGeometry(0.62, 1.15, 1.05), beveledTitanium)
      block.position.set(Math.cos(ang) * 5.4, Math.sin(ang) * 5.4, 0)
      block.rotation.z = ang
      aurora.add(block)

      // 轴向镀金折射反光板 (Axial Mirrors directing sunlight to interior valley)
      if (i % 3 === 0) {
        const mirror = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.02, 1.4), goldMirrorMat)
        mirror.position.set(Math.cos(ang) * 4.4, Math.sin(ang) * 4.4, 0.45)
        mirror.rotation.z = ang
        mirror.rotation.x = 0.35
        aurora.add(mirror)
      }
    }

    // 3. 12 根张紧桁架电梯辐条与发光轿厢 (12 Tensioned Lattice Elevator Spokes)
    for (let s = 0; s < 12; s++) {
      const ang = (s / 12) * Math.PI
      const spoke = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.085, 10.8, 8), darkAlloy)
      spoke.rotation.z = ang
      aurora.add(spoke)

      // 沿辐条上下运行的发光穿梭客运舱
      for (const dist of [-2.4, 2.4]) {
        const pod = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.32, 0.24), beveledTitanium)
        pod.position.set(Math.cos(ang) * dist, Math.sin(ang) * dist, 0)
        aurora.add(pod)
      }
    }

    // 4. 中央零重力太空港中枢 (Sprawling Zero-G Spaceport Core: Hubs + Dishes + Antennas)
    const zeroGHub = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 4.8, 24), beveledTitanium)
    zeroGHub.rotation.x = Math.PI * 0.5
    aurora.add(zeroGHub)

    for (const zDir of [-1, 1]) {
      // 旋转抛物面通信雷达天线 (Communications Antenna Dishes)
      const dish = new THREE.Mesh(new THREE.ConeGeometry(0.68, 0.32, 24, 1, true), goldMirrorMat)
      dish.position.z = zDir * 2.6
      dish.rotation.x = zDir > 0 ? -Math.PI * 0.5 : Math.PI * 0.5
      aurora.add(dish)

      // 多轴停泊码头臂架 (Multi-Axis Docking Hub Arms)
      for (let a = 0; a < 4; a++) {
        const aAng = (a / 4) * Math.PI * 2
        const dockArm = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 1.6, 8), darkAlloy)
        dockArm.position.set(Math.cos(aAng) * 1.35, Math.sin(aAng) * 1.35, zDir * 1.5)
        dockArm.rotation.z = aAng + Math.PI * 0.5
        aurora.add(dockArm)
      }
    }

    return aurora
  }

  // ============================================================================
  // 3F. NODE 7: DEEP SPACE ARRAY (FLEET OF 5 JWST LASER RELAYS)
  // ============================================================================
  public buildDeepSpaceRelayFleet(): {
    group: THREE.Group
    laserShaderMat: THREE.ShaderMaterial
  } {
    const fleet = new THREE.Group()

    const goldBeryllium = new THREE.MeshStandardMaterial({
      color: 0xffcc33,
      metalness: 0.96,
      roughness: 0.08,
      envMapIntensity: 2.4
    })
    const silverShield = new THREE.MeshStandardMaterial({
      color: 0xcbd5e1,
      metalness: 0.88,
      roughness: 0.22,
      envMapIntensity: 1.8,
      side: THREE.DoubleSide
    })
    const kaptonGold = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.86,
      roughness: 0.26,
      envMapIntensity: 1.8,
      side: THREE.DoubleSide
    })
    const darkBus = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.85, roughness: 0.3 })

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
          float pulse = pow(0.5 + 0.5 * sin(vUv.y * 42.0 - uTime * 18.0), 6.0);
          vec3 col = mix(vec3(0.0, 0.82, 1.0), vec3(1.0, 1.0, 1.0), pulse);
          gl_FragColor = vec4(col, 0.24 + pulse * 0.45);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    const buildJWSTObservatory = (scale = 1.0) => {
      const obs = new THREE.Group()

      // 18 片正六边形蜂窝镀金铍主反射镜 (18-Segment Gold Beryllium Primary Mirror)
      const hexR = 0.28
      const hexGeo = new THREE.CylinderGeometry(hexR * 0.94, hexR * 0.94, 0.045, 6)
      hexGeo.rotateX(Math.PI * 0.5)

      const coords: [number, number][] = [[0, 0]]
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2
        coords.push([Math.cos(a) * hexR * 1.74, Math.sin(a) * hexR * 1.74])
      }
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2
        coords.push([Math.cos(a) * hexR * 3.42, Math.sin(a) * hexR * 3.42])
      }
      coords.forEach(([hx, hy]) => {
        const seg = new THREE.Mesh(hexGeo, goldBeryllium)
        seg.position.set(hx, hy, 0)
        obs.add(seg)
      })

      // 碳素桁架次镜支撑臂与圆形次镜 (Secondary Mirror Lattice Booms)
      for (let b = 0; b < 3; b++) {
        const a = (b / 3) * Math.PI * 2 + Math.PI / 6
        const boom = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 1.35, 6), darkBus)
        boom.position.set(Math.cos(a) * 0.48, Math.sin(a) * 0.48, 0.65)
        boom.lookAt(0, 0, 1.25)
        boom.rotateX(Math.PI * 0.5)
        obs.add(boom)
      }
      const secM = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.06, 6), goldBeryllium)
      secM.rotation.x = Math.PI * 0.5
      secM.position.z = 1.25
      obs.add(secM)

      // 5 层菱形张力太阳帆隔热屏 (5-Layer Diamond Sunshield)
      for (let l = 0; l < 5; l++) {
        const shield = new THREE.Mesh(
          new THREE.BoxGeometry(2.4 - l * 0.07, 1.45 - l * 0.05, 0.012),
          l % 2 === 0 ? silverShield : kaptonGold
        )
        shield.position.set(0, -0.62 - l * 0.08, -0.26)
        shield.rotation.x = Math.PI * 0.47
        shield.rotation.z = Math.PI * 0.25
        obs.add(shield)
      }

      // 探测器服务舱与激光光通讯发射机
      const bus = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.55, 0.55), darkBus)
      bus.position.set(0, -0.28, -0.42)
      obs.add(bus)

      const ionThruster = new THREE.Mesh(
        new THREE.ConeGeometry(0.12, 0.72, 16),
        new THREE.MeshBasicMaterial({ color: 0x00d8ff, transparent: true, opacity: 0.72, blending: THREE.AdditiveBlending })
      )
      ionThruster.rotation.x = -Math.PI * 0.5
      ionThruster.position.set(0, -0.28, -0.85)
      obs.add(ionThruster)

      obs.scale.setScalar(scale)
      return obs
    }

    const fleetPos = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-3.8, 1.25, -2.4),
      new THREE.Vector3(4.0, -1.05, -2.2),
      new THREE.Vector3(-6.8, -1.4, -5.5),
      new THREE.Vector3(7.2, 1.6, -5.4)
    ]
    fleetPos.forEach((pos, idx) => {
      const probe = buildJWSTObservatory(idx === 0 ? 1.25 : 0.92)
      probe.position.copy(pos)
      probe.rotation.y = 0.22
      fleet.add(probe)
    })

    // 星际准直脉冲激光通信网络 (Inter-Satellite Laser Comms Grid)
    const links: [number, number][] = [
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 4]
    ]
    links.forEach(([a, b]) => {
      const pA = fleetPos[a]
      const pB = fleetPos[b]
      const dist = pA.distanceTo(pB)
      const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, dist, 6), laserShaderMat)
      beam.position.copy(pA).lerp(pB, 0.5)
      beam.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), pB.clone().sub(pA).normalize())
      fleet.add(beam)
    })

    return { group: fleet, laserShaderMat }
  }

  // ============================================================================
  // 3G. NODE 8: LUNA & EXILE ENGINES (NO WHITEOUT + ENHANCED RIM LIGHTING)
  // ============================================================================
  public buildPhotorealisticLuna(moonRadius = 27.0): {
    group: THREE.Group
    lunarRigs: BrutalistEngineRig[]
  } {
    const group = new THREE.Group()
    const lunarRigs: BrutalistEngineRig[] = []

    // 严控月球材质漫反射与高光反照率，杜绝太阳直射白曝 (No Blown-out White Sphere!)
    const moonMat = new THREE.MeshStandardMaterial({
      map: this.moonRegolithTex,
      bumpMap: this.moonRegolithTex,
      bumpScale: 1.8,
      color: 0x7a8088,
      roughness: 0.94,
      metalness: 0.02
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

    // 在静海表面部署 3 座巨型核聚变放逐发动机
    const engineNormals = [
      new THREE.Vector3(0.35, 0.22, 0.91).normalize(),
      new THREE.Vector3(0.48, 0.35, 0.80).normalize(),
      new THREE.Vector3(0.20, 0.12, 0.97).normalize()
    ]

    engineNormals.forEach((n, idx) => {
      const rig = this.buildBrutalistPlanetaryEngine(idx === 0 ? 1.85 : 1.45, 13.5, 0.0)
      rig.group.position.copy(n.clone().multiplyScalar(moonRadius - 0.1))
      rig.group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), n)

      // 增加环绕式挖掘脚手架与泛光轮廓灯，消除黑色剪影！
      const scaffoldRing = new THREE.Mesh(
        new THREE.TorusGeometry(1.4, 0.05, 8, 24),
        new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.85, roughness: 0.3 })
      )
      scaffoldRing.rotation.x = Math.PI * 0.5
      scaffoldRing.position.y = 0.2
      rig.group.add(scaffoldRing)

      // 局部暖金辅助轮廓光源
      const localRimLight = new THREE.PointLight(0xffaa44, 2.5, 18)
      localRimLight.position.set(0, 1.2, 0.8)
      rig.group.add(localRimLight)

      group.add(rig.group)
      lunarRigs.push(rig)
    })

    // 月壤喷射碎屑粒子云
    const dustCount = 420
    const dPos = new Float32Array(dustCount * 3)
    const center = engineNormals[0].clone().multiplyScalar(moonRadius + 1.5)
    for (let i = 0; i < dustCount; i++) {
      dPos[i * 3] = center.x + (Math.random() - 0.5) * 14
      dPos[i * 3 + 1] = center.y + (Math.random() - 0.5) * 14
      dPos[i * 3 + 2] = center.z + (Math.random() - 0.5) * 14
    }
    const dustGeo = new THREE.BufferGeometry()
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dPos, 3))
    group.add(
      new THREE.Points(
        dustGeo,
        new THREE.PointsMaterial({
          color: 0xdbeafe,
          size: 0.48,
          map: this.softGlowSprite,
          transparent: true,
          opacity: 0.6,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        })
      )
    )

    return { group, lunarRigs }
  }
}
