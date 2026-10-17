import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

export interface BrutalistEngineRig {
  group: THREE.Group
  plumeAssembly: THREE.Group
  coreColumnMat: THREE.ShaderMaterial
  godRayPlanesMat: THREE.ShaderMaterial
  ionParticlesMat: THREE.ShaderMaterial
  strobes: THREE.Mesh[]
}

export class MegaStructuresBuilder {
  public gunmetalAlbedo: THREE.CanvasTexture
  public gunmetalBump: THREE.CanvasTexture
  public orangeGantryTex: THREE.CanvasTexture
  public champagneHullTex: THREE.CanvasTexture
  public bronzeSolarTex: THREE.CanvasTexture
  public frozenEarthDayTex: THREE.CanvasTexture
  public frozenEarthBumpTex: THREE.CanvasTexture
  public frozenEarthNightTex: THREE.CanvasTexture
  public fluffyCloudsTex: THREE.CanvasTexture
  public moonRegolithTex: THREE.CanvasTexture
  public softGlowSprite: THREE.CanvasTexture
  public mistSpriteTex: THREE.CanvasTexture

  constructor() {
    const gm = this.createDarkGunmetalTextures()
    this.gunmetalAlbedo = gm.albedo
    this.gunmetalBump = gm.bump
    this.orangeGantryTex = this.createWarmOrangeGantryTexture()
    this.champagneHullTex = this.createChampagneBevelTexture()
    this.bronzeSolarTex = this.createBronzeGoldSolarTexture()
    const earthTex = this.createFrozenWanderingEarthTextures()
    this.frozenEarthDayTex = earthTex.day
    this.frozenEarthBumpTex = earthTex.bump
    this.frozenEarthNightTex = earthTex.night
    this.fluffyCloudsTex = this.createFluffyCloudsTexture()
    this.moonRegolithTex = this.createApolloLunarRegolithTexture()
    this.softGlowSprite = this.createSoftRadialGlowSprite()
    this.mistSpriteTex = this.createVolumetricMistTexture()
  }

  // ============================================================================
  // 1. 高动态太空/大气反射 HDR 环境贴图
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
          vec3 zenith = vec3(0.08, 0.14, 0.26);
          vec3 earthBounce = vec3(0.16, 0.48, 0.95);
          vec3 base = mix(earthBounce, zenith, smoothstep(-0.6, 0.6, d.y));
          float sunSpec = pow(max(0.0, dot(d, normalize(vec3(0.68, 0.35, 0.64)))), 20.0);
          base += vec3(1.8, 1.65, 1.4) * sunSpec;
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
    g.addColorStop(0.24, 'rgba(165, 240, 255, 0.85)')
    g.addColorStop(0.58, 'rgba(0, 195, 255, 0.22)')
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
    g.addColorStop(0, 'rgba(155, 210, 250, 0.36)')
    g.addColorStop(0.5, 'rgba(70, 130, 195, 0.14)')
    g.addColorStop(1, 'rgba(0, 0, 0, 0.0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 256, 128)
    return new THREE.CanvasTexture(c)
  }

  // 深枪灰与板岩工业装甲纹理 (#1c222b 基底)
  private createDarkGunmetalTextures() {
    const c = document.createElement('canvas')
    c.width = 512
    c.height = 512
    const ctx = c.getContext('2d')!
    ctx.fillStyle = '#1c222b'
    ctx.fillRect(0, 0, 512, 512)

    ctx.strokeStyle = '#0d1016'
    ctx.lineWidth = 2.5
    for (let y = 0; y < 512; y += 48) {
      for (let x = 0; x < 512; x += 64) {
        const shift = ((y / 48) % 2) * 32
        ctx.fillStyle = (x + y) % 96 === 0 ? '#232a36' : '#171c24'
        ctx.fillRect(x + shift + 2, y + 2, 60, 44)
        ctx.strokeRect(x + shift, y, 64, 48)
      }
    }
    const tex = new THREE.CanvasTexture(c)
    tex.wrapS = THREE.RepeatWrapping
    tex.wrapT = THREE.RepeatWrapping
    tex.repeat.set(4, 4)
    return { albedo: tex, bump: tex }
  }

  // 暖橙色高炉走廊与微窗灯带贴图 (#ff8811)
  private createWarmOrangeGantryTexture(): THREE.CanvasTexture {
    const c = document.createElement('canvas')
    c.width = 512
    c.height = 128
    const ctx = c.getContext('2d')!
    ctx.fillStyle = '#090c12'
    ctx.fillRect(0, 0, 512, 128)
    for (let row = 16; row < 112; row += 20) {
      for (let col = 6; col < 504; col += 10) {
        if (Math.random() > 0.22) {
          ctx.fillStyle = Math.random() > 0.2 ? '#ff8811' : '#ffbb55'
          ctx.fillRect(col, row, 6, 4)
        }
      }
    }
    const tex = new THREE.CanvasTexture(c)
    tex.wrapS = THREE.RepeatWrapping
    tex.wrapT = THREE.RepeatWrapping
    tex.repeat.set(8, 1)
    return tex
  }

  // 极光号香槟钛金属装甲板纹理 (#d6d3cd)
  private createChampagneBevelTexture(): THREE.CanvasTexture {
    const c = document.createElement('canvas')
    c.width = 512
    c.height = 512
    const ctx = c.getContext('2d')!
    ctx.fillStyle = '#d6d3cd'
    ctx.fillRect(0, 0, 512, 512)
    ctx.strokeStyle = '#8c8881'
    ctx.lineWidth = 2
    for (let y = 0; y < 512; y += 64) {
      for (let x = 0; x < 512; x += 96) {
        ctx.fillStyle = (x + y) % 128 === 0 ? '#dedbd5' : '#cac6be'
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

  // 天柱号暗古铜/炭黑配细金网格太阳能电池毯纹理 (#3d352e + #b48a48，对齐参考视频 00:06-00:07)
  private createBronzeGoldSolarTexture(): THREE.CanvasTexture {
    const c = document.createElement('canvas')
    c.width = 512
    c.height = 512
    const ctx = c.getContext('2d')!
    ctx.fillStyle = '#3d352e'
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
    // 细金铜色汇流线 (#b48a48)
    ctx.strokeStyle = '#b48a48'
    ctx.lineWidth = 3
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

  // 阿波罗月球中灰高对比度陨石坑纹理 (杜绝死白过曝)
  private createApolloLunarRegolithTexture(): THREE.CanvasTexture {
    const c = document.createElement('canvas')
    c.width = 1024
    c.height = 512
    const ctx = c.getContext('2d')!
    ctx.fillStyle = '#7c8087'
    ctx.fillRect(0, 0, 1024, 512)

    const mares = [
      { x: 340, y: 200, r: 125 },
      { x: 490, y: 235, r: 110 },
      { x: 660, y: 215, r: 90 },
      { x: 245, y: 315, r: 82 }
    ]
    mares.forEach((m) => {
      const g = ctx.createRadialGradient(m.x, m.y, 10, m.x, m.y, m.r)
      g.addColorStop(0, '#3a3e45')
      g.addColorStop(0.7, '#555961')
      g.addColorStop(1, 'rgba(124, 128, 135, 0)')
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2)
      ctx.fill()
    })

    for (let i = 0; i < 1400; i++) {
      const x = Math.random() * 1024
      const y = Math.random() * 512
      const r = 1.5 + Math.pow(Math.random(), 3) * 34
      ctx.strokeStyle = 'rgba(205, 210, 218, 0.55)'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.stroke()
      ctx.fillStyle = 'rgba(28, 31, 36, 0.65)'
      ctx.beginPath()
      ctx.arc(x + 0.9, y + 0.9, r * 0.84, 0, Math.PI * 2)
      ctx.fill()
    }
    return new THREE.CanvasTexture(c)
  }

  // ============================================================================
  // 2. 四层体积 + GPU 粒子尾焰着色器组 (1.马赫环内芯 + 2.高斯十字神光面 + 3.900颗GPU上升粒子)
  // ============================================================================
  public createCoreColumnVolumetricShader(ignitionThreshold = 0.0): THREE.ShaderMaterial {
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

        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
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

          // 强菲涅尔边缘柔化 pow(abs(dot(vNormal, vViewDir)), 2.5)，彻底消灭生硬边缘
          float fresnelSoft = pow(abs(dot(normalize(vNormal), normalize(vViewDir))), 2.5);

          // 下方 35% 区域内呈现 8 个锐利的超音速马赫震波菱形环 (8 Crisp Mach Shock Diamonds)
          float machWave = sin(vUv.y * 72.0 - uTime * 22.0);
          float shockDiamonds = exp(-pow(machWave, 2.0) * 12.0) * smoothstep(0.38, 0.0, vUv.y) * fresnelSoft;

          // 向上翻涌的等离子湍流纹理
          vec2 flowUv = vec2(vUv.x * 5.0, vUv.y * 14.0 - uTime * 6.5);
          float turb = noise(flowUv) * 0.65 + noise(flowUv * 2.3 + 1.9) * 0.35;

          float vFade = pow(max(0.0, 1.0 - vUv.y), 1.35) * smoothstep(0.0, 0.018, vUv.y);
          float growMask = smoothstep(vUv.y, vUv.y - 0.12, ig);

          vec3 coreCyan = mix(vec3(0.05, 0.78, 1.0), vec3(1.15, 1.4, 1.65), fresnelSoft * 0.8 + shockDiamonds * 0.6);
          vec3 coreGold = mix(vec3(1.0, 0.55, 0.08), vec3(1.4, 1.3, 1.0), fresnelSoft * 0.8 + shockDiamonds * 0.6);
          vec3 finalCol = mix(coreCyan, coreGold, uOverclock) * (0.82 + turb * 0.32);

          float alpha = clamp((fresnelSoft * 0.78 + shockDiamonds * 0.55) * vFade * growMask * clamp(uThrust, 0.25, 1.15), 0.0, 0.88);
          gl_FragColor = vec4(finalCol, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    })
  }

  public createGodRayPlanesShader(ignitionThreshold = 0.0): THREE.ShaderMaterial {
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

          // 高斯横向衰减 exp(-pow((vUv.x - 0.5) * 4.2, 2.0)) 与纵向羽化 smoothstep(1.0, 0.15, vUv.y)
          float gaussX = exp(-pow((vUv.x - 0.5) * 4.2, 2.0));
          float featherY = smoothstep(1.0, 0.15, vUv.y) * smoothstep(0.0, 0.03, vUv.y);
          float growMask = smoothstep(vUv.y, vUv.y - 0.12, ig);

          float streak = 0.85 + 0.15 * sin((vUv.x - 0.5) * 35.0 + vUv.y * 16.0 - uTime * 14.0);

          vec3 colBlue = mix(vec3(0.0, 0.65, 1.0), vec3(0.75, 0.96, 1.0), gaussX);
          vec3 colGold = mix(vec3(1.0, 0.48, 0.05), vec3(1.0, 0.92, 0.75), gaussX);
          vec3 col = mix(colBlue, colGold, uOverclock) * streak;

          float alpha = clamp(gaussX * featherY * growMask * 0.26 * clamp(uThrust, 0.25, 1.15), 0.0, 0.32);
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
          // 随高度略微湍流扩散
          float spread = 1.0 + life * 1.35 + 0.15 * sin(life * 18.0 + aOffset * 20.0);
          pos.x *= spread * aRadial;
          pos.z *= spread * aRadial;

          vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = clamp((1.0 - life * 0.65) * (58.0 / -mvPos.z), 1.5, 9.5);
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
          // 喷口处纯白 (#ffffff) -> 中段电光青 (#00d8ff) -> 深空淡出
          vec3 normalCol = mix(vec3(1.0, 1.0, 1.0), vec3(0.0, 0.85, 1.0), smoothstep(0.0, 0.35, vLife));
          vec3 overCol = mix(vec3(1.0, 1.0, 0.9), vec3(1.0, 0.55, 0.1), smoothstep(0.0, 0.35, vLife));
          vec3 col = mix(normalCol, overCol, uOverclock);

          float alpha = tex.a * pow(1.0 - vLife, 1.3) * 0.82 * ig;
          gl_FragColor = vec4(col, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  }

  // ============================================================================
  // 3. FIX 1: 重工业高炉级行星发动机 (36根冷却肋 + 24道青色狭缝散热口 + 8座飞扶壁 + 4层体积粒子尾焰)
  // ============================================================================
  public buildBrutalistPlanetaryEngine(
    scale = 1.0,
    plumeHeight = 14.5,
    ignitionThreshold = 0.0
  ): BrutalistEngineRig {
    const group = new THREE.Group()
    const strobes: THREE.Mesh[] = []

    // 深枪灰与板岩工业装甲 (#1c222b, metalness: 0.85, roughness: 0.38)
    const darkGunmetalMat = new THREE.MeshStandardMaterial({
      color: 0x1c222b,
      map: this.gunmetalAlbedo,
      bumpMap: this.gunmetalBump,
      bumpScale: 0.03,
      metalness: 0.85,
      roughness: 0.38,
      envMapIntensity: 1.8
    })
    const slateArmorMat = new THREE.MeshStandardMaterial({
      color: 0x141820,
      metalness: 0.88,
      roughness: 0.34,
      envMapIntensity: 1.8
    })
    const hydraulicRamMat = new THREE.MeshStandardMaterial({
      color: 0xcbd5e1,
      metalness: 0.94,
      roughness: 0.16,
      envMapIntensity: 2.0
    })
    const orangeWindowMat = new THREE.MeshBasicMaterial({
      map: this.orangeGantryTex,
      color: 0xff8811
    })
    const furnaceGlowMat = new THREE.MeshBasicMaterial({
      color: 0xff6a00,
      transparent: true,
      opacity: 0.85
    })
    const cyanSlitMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff })
    const redStrobeMat = new THREE.MeshBasicMaterial({ color: 0xff2a4d })

    // 1. 宽阔八角形地下防爆基座围裙 + 高炉内部暖橙火光 (Octagonal Subterranean Blast Apron + Furnace Glow)
    const blastApron = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.92, 0.14, 8), slateArmorMat)
    blastApron.position.y = 0.07
    group.add(blastApron)

    const furnaceCore = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.58, 0.18, 16), furnaceGlowMat)
    furnaceCore.position.y = 0.14
    group.add(furnaceCore)

    // 2. 双曲面冷却塔主锥体 + 6 层 #ff8811 暖橙检修环廊
    const lowerCone = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.64, 0.36, 36, 1, true), darkGunmetalMat)
    lowerCone.position.y = 0.28
    const upperCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.42, 0.24, 36, 1, true), darkGunmetalMat)
    upperCollar.position.y = 0.56
    group.add(lowerCone, upperCollar)

    for (let t = 0; t < 6; t++) {
      const r = 0.61 - t * 0.042
      const y = 0.15 + t * 0.082
      const gantryWin = new THREE.Mesh(new THREE.CylinderGeometry(r, r + 0.008, 0.02, 24, 1, true), orangeWindowMat)
      gantryWin.position.y = y
      const ringGirder = new THREE.Mesh(new THREE.TorusGeometry(r + 0.016, 0.01, 6, 36), slateArmorMat)
      ringGirder.rotation.x = Math.PI * 0.5
      ringGirder.position.y = y + 0.012
      group.add(gantryWin, ringGirder)
    }

    // 3. 36 根锐利垂直冷却塔肋片 (36 Sharp Vertical Cooling Ribs)
    for (let i = 0; i < 36; i++) {
      const ang = (i / 36) * Math.PI * 2
      const rib = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.56, 0.095), darkGunmetalMat)
      rib.position.set(Math.cos(ang) * 0.48, 0.38, Math.sin(ang) * 0.48)
      rib.rotation.y = -ang
      rib.rotation.x = -0.28
      group.add(rib)
    }

    // 4. 24 道上领圈内嵌式青色垂直狭缝散热口 (24 Vertical Cyan Slit Vents matching reference 00:28!)
    for (let i = 0; i < 24; i++) {
      const ang = (i / 24) * Math.PI * 2
      const slit = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.14, 0.02), cyanSlitMat)
      slit.position.set(Math.cos(ang) * 0.392, 0.56, Math.sin(ang) * 0.392)
      slit.rotation.y = -ang
      slit.rotation.x = -0.18
      group.add(slit)
    }

    // 5. 8 座飞扶壁梯形主支撑巨塔 + 侧向加强肋 + 液压减震柱 + 横向联络桁架桥
    for (let i = 0; i < 8; i++) {
      const ang = (i / 8) * Math.PI * 2
      const pylonGroup = new THREE.Group()
      pylonGroup.rotation.y = ang

      // 梯形主飞扶壁斜柱
      const mainPylon = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.72, 0.16), darkGunmetalMat)
      mainPylon.position.set(0, 0.31, 0.64)
      mainPylon.rotation.x = -0.74
      pylonGroup.add(mainPylon)

      // 侧向三角加强肋板 (Lateral Gusset Ribs)
      for (const side of [-0.06, 0.06]) {
        const gusset = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.55, 0.22), slateArmorMat)
        gusset.position.set(side, 0.26, 0.68)
        gusset.rotation.x = -0.74
        pylonGroup.add(gusset)

        // 内嵌式镀铬液压减震作动筒
        const shockRam = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.02, 0.48, 8), hydraulicRamMat)
        shockRam.position.set(side * 0.85, 0.24, 0.74)
        shockRam.rotation.x = -0.74
        pylonGroup.add(shockRam)
      }

      // 横向联络桁架桥 (Horizontal Cross-Tie Lattice Bridge)
      const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.045, 0.065), slateArmorMat)
      bridge.position.set(0, 0.22, 0.58)
      pylonGroup.add(bridge)

      // 岩床重装锚定靴与红闪航空灯
      const foot = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.09, 0.28), slateArmorMat)
      foot.position.set(0, 0.045, 0.92)
      pylonGroup.add(foot)

      const strobe = new THREE.Mesh(new THREE.SphereGeometry(0.022, 8, 8), redStrobeMat)
      strobe.position.set(0, 0.12, 1.02)
      pylonGroup.add(strobe)
      strobes.push(strobe)

      group.add(pylonGroup)
    }

    // 6. 4km 喷口火山口边缘上层建筑：16 座雉堞机械舱 + 4 座悬臂龙门吊 (4km Caldera Rim Superstructure)
    for (let i = 0; i < 16; i++) {
      const ang = (i / 16) * Math.PI * 2
      const housing = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.085, 0.09), slateArmorMat)
      housing.position.set(Math.cos(ang) * 0.37, 0.69, Math.sin(ang) * 0.37)
      housing.rotation.y = -ang
      group.add(housing)
    }
    for (let c = 0; c < 4; c++) {
      const ang = (c / 4) * Math.PI * 2 + Math.PI * 0.25
      const craneBoom = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.025, 0.22), darkGunmetalMat)
      craneBoom.position.set(Math.cos(ang) * 0.34, 0.75, Math.sin(ang) * 0.34)
      craneBoom.rotation.y = -ang
      craneBoom.rotation.x = 0.25
      group.add(craneBoom)
    }

    // 喷口炽白喉道发光盘
    const nozzleMouth = new THREE.Mesh(
      new THREE.CircleGeometry(0.33, 32),
      new THREE.MeshBasicMaterial({ color: 0xe6faff })
    )
    nozzleMouth.rotation.x = -Math.PI * 0.5
    nozzleMouth.position.y = 0.65
    group.add(nozzleMouth)

    // =========================================================================
    // 7. 四层体积 + GPU 粒子尾焰组装 (True 4-Layer Volumetric + GPU Particle Plume)
    // =========================================================================
    const plumeAssembly = new THREE.Group()
    plumeAssembly.position.y = 0.64

    const coreColumnMat = this.createCoreColumnVolumetricShader(ignitionThreshold)
    const godRayPlanesMat = this.createGodRayPlanesShader(ignitionThreshold)
    const ionParticlesMat = this.createRisingIonParticlesShader(plumeHeight, ignitionThreshold)

    // Layer 1: 内部炽白马赫环核心等离子柱
    const coreGeo = new THREE.CylinderGeometry(0.24, 0.32, plumeHeight, 32, 32, true)
    coreGeo.translate(0, plumeHeight * 0.5, 0)
    plumeAssembly.add(new THREE.Mesh(coreGeo, coreColumnMat))

    // Layer 2: 4 张 0°, 45°, 90°, 135° 高斯羽化交叉体积神光平面 (彻底消除任何角度的几何硬边)
    const planeGeo = new THREE.PlaneGeometry(1.1, plumeHeight, 1, 24)
    planeGeo.translate(0, plumeHeight * 0.5, 0)
    for (let p = 0; p < 4; p++) {
      const plane = new THREE.Mesh(planeGeo, godRayPlanesMat)
      plane.rotation.y = (p * Math.PI) / 4
      plumeAssembly.add(plane)
    }

    // Layer 3: 900 颗高速上升 GPU 电离火花粒子流 (THREE.Points)
    const pCount = 900
    const pPos = new Float32Array(pCount * 3)
    const pOffset = new Float32Array(pCount)
    const pSpeed = new Float32Array(pCount)
    const pRadial = new Float32Array(pCount)

    for (let i = 0; i < pCount; i++) {
      const a = Math.random() * Math.PI * 2
      const r = 0.04 + Math.random() * 0.28
      pPos[i * 3] = Math.cos(a) * r
      pPos[i * 3 + 1] = 0
      pPos[i * 3 + 2] = Math.sin(a) * r
      pOffset[i] = Math.random()
      pSpeed[i] = 0.45 + Math.random() * 0.65
      pRadial[i] = 0.7 + Math.random() * 0.6
    }
    const ptsGeo = new THREE.BufferGeometry()
    ptsGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    ptsGeo.setAttribute('aOffset', new THREE.BufferAttribute(pOffset, 1))
    ptsGeo.setAttribute('aSpeed', new THREE.BufferAttribute(pSpeed, 1))
    ptsGeo.setAttribute('aRadial', new THREE.BufferAttribute(pRadial, 1))
    plumeAssembly.add(new THREE.Points(ptsGeo, ionParticlesMat))

    // Layer 4: 24 组底座战壕与火山口边缘翻涌蒸汽/冰雾 Billboard Sprites
    const baseMistMat = new THREE.SpriteMaterial({
      map: this.mistSpriteTex,
      color: 0x8cd2ff,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
    for (let m = 0; m < 24; m++) {
      const sp = new THREE.Sprite(baseMistMat)
      const a = (m / 24) * Math.PI * 2 + Math.random() * 0.2
      const dist = m < 12 ? 0.45 + Math.random() * 0.2 : 0.85 + Math.random() * 0.35
      const h = m < 12 ? 0.68 + Math.random() * 0.25 : 0.12 + Math.random() * 0.18
      sp.position.set(Math.cos(a) * dist, h, Math.sin(a) * dist)
      sp.scale.set(0.85, 0.42, 1)
      group.add(sp)
    }

    group.add(plumeAssembly)
    group.scale.setScalar(scale)

    return {
      group,
      plumeAssembly,
      coreColumnMat,
      godRayPlanesMat,
      ionParticlesMat,
      strobes
    }
  }

  // 赤道 30° 倾角切向转向发动机单元 (对齐参考视频 00:04 & 00:28)
  public buildGimbalSteeringEngineUnit(
    scale = 1.0,
    plumeLength = 16.0
  ): BrutalistEngineRig {
    const group = new THREE.Group()

    const slateMat = new THREE.MeshStandardMaterial({
      color: 0x1c222b,
      map: this.gunmetalAlbedo,
      metalness: 0.86,
      roughness: 0.35,
      envMapIntensity: 1.8
    })

    // U 型双耳轴万向节底座支架
    const cradleBase = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.16, 1.15), slateMat)
    cradleBase.position.y = 0.08
    group.add(cradleBase)

    for (const xSide of [-0.58, 0.58]) {
      const pylon = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.78, 0.45), slateMat)
      pylon.position.set(xSide, 0.44, 0)
      group.add(pylon)
    }

    // 30° 仰角切向倾角发动机本体 (完美展现 36 根垂直肋片与 24 道青色狭缝散热口)
    const innerRig = this.buildBrutalistPlanetaryEngine(0.92, plumeLength, 0.0)
    innerRig.group.position.set(0, 0.36, 0)
    innerRig.group.rotation.x = Math.PI * 0.5 - 0.52 // 30° tilt above horizontal tangent
    group.add(innerRig.group)

    group.scale.setScalar(scale)
    return {
      group,
      plumeAssembly: innerRig.plumeAssembly,
      coreColumnMat: innerRig.coreColumnMat,
      godRayPlanesMat: innerRig.godRayPlanesMat,
      ionParticlesMat: innerRig.ionParticlesMat,
      strobes: innerRig.strobes
    }
  }

  // ============================================================================
  // 4. FIX 2: 重写 TIANZHU APEX STATION (删除黄球与蓝板，对齐 00:06-00:07 钛桁架 + 暗古铜金网格太阳翼)
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
      metalness: 0.86,
      roughness: 0.28,
      envMapIntensity: 1.8
    })
    const pressurizedNodeMat = new THREE.MeshStandardMaterial({
      color: 0xcbd5e1,
      map: this.champagneHullTex,
      metalness: 0.78,
      roughness: 0.26,
      envMapIntensity: 1.7
    })
    // 哑光暗金多层隔热带 (#a17c38, roughness: 0.35 — 绝无卡通黄球)
    const mliBandMat = new THREE.MeshStandardMaterial({
      color: 0xa17c38,
      metalness: 0.75,
      roughness: 0.35,
      envMapIntensity: 1.6
    })
    // 参考视频 00:06-00:07 的暗古铜/炭黑配细金网格太阳能电池毯 (#3d352e + #b48a48)
    const bronzeSolarMat = new THREE.MeshStandardMaterial({
      map: this.bronzeSolarTex,
      bumpMap: this.bronzeSolarTex,
      bumpScale: 0.012,
      color: 0xb48a48,
      metalness: 0.85,
      roughness: 0.22,
      envMapIntensity: 1.9,
      side: THREE.DoubleSide
    })
    const fineWindowMat = new THREE.MeshBasicMaterial({
      map: this.orangeGantryTex,
      color: 0xffebb3
    })

    // 1. 14 单位修长开放式钛金属桁架主脊柱 (Linear Open-Frame Truss Spine: length 14, width 0.32)
    const spineLength = 14.0
    const cornerOffsets = [
      [-0.16, -0.16],
      [0.16, -0.16],
      [-0.16, 0.16],
      [0.16, 0.16]
    ]
    cornerOffsets.forEach(([cx, cz]) => {
      const longeron = new THREE.Mesh(
        new THREE.CylinderGeometry(0.018, 0.018, spineLength, 8),
        titaniumStrutMat
      )
      longeron.position.set(cx, 0, cz)
      group.add(longeron)
    })

    // 桁架交叉斜撑与圆柱形加压对接舱段
    for (let i = -13; i <= 13; i++) {
      const y = i * 0.5
      const batten = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.02, 0.34), titaniumStrutMat)
      batten.position.y = y
      group.add(batten)

      if (i % 3 === 0) {
        const dockModule = new THREE.Mesh(
          new THREE.CylinderGeometry(0.14, 0.14, 0.65, 16),
          pressurizedNodeMat
        )
        dockModule.position.y = y
        // 纤薄的暗金隔热环带
        const mliWrap = new THREE.Mesh(
          new THREE.CylinderGeometry(0.145, 0.145, 0.12, 16),
          mliBandMat
        )
        mliWrap.position.y = y + 0.18
        group.add(dockModule, mliWrap)
      }
    }

    // 2. 8 幅修长纤薄的暗古铜/金网格太阳翼 (8 Long, Razor-Thin Solar Array Wings: width 0.55, length 4.2)
    const crossTruss = new THREE.Mesh(new THREE.BoxGeometry(10.6, 0.08, 0.08), titaniumStrutMat)
    crossTruss.position.y = 0.6
    group.add(crossTruss)

    for (const side of [-1, 1]) {
      for (let wIdx = 0; wIdx < 2; wIdx++) {
        const xPos = side * (1.65 + wIdx * 1.45)
        const gimbalJoint = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.22, 12), mliBandMat)
        gimbalJoint.position.set(xPos, 0.6, 0)
        group.add(gimbalJoint)

        for (const zDir of [-1, 1]) {
          // 中心张力桅杆
          const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 4.2, 8), titaniumStrutMat)
          mast.rotation.x = Math.PI * 0.5
          mast.position.set(xPos, 0.6, zDir * 2.25)
          group.add(mast)

          // 左右对称超薄光伏毯叶片 (总宽 0.55, 长 4.2)
          for (const stripOffset of [-0.15, 0.15]) {
            const blanket = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.008, 4.1), bronzeSolarMat)
            blanket.position.set(xPos + stripOffset, 0.6, zDir * 2.25)
            blanket.rotation.z = 0.06
            group.add(blanket)
          }
        }
      }
    }

    // 3. 纤薄低剖面配重离心环 (Sleek Counterweight Centrifuge Ring: radius 1.8, tube 0.08 + 6 根细张力辐条)
    const buildSleekCentrifuge = (radius: number) => {
      const rGroup = new THREE.Group()
      const ringHull = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.08, 16, 72), pressurizedNodeMat)
      ringHull.rotation.x = Math.PI * 0.5
      ringHull.scale.set(1, 1, 0.65)
      rGroup.add(ringHull)

      const winTrack = new THREE.Mesh(new THREE.TorusGeometry(radius - 0.065, 0.022, 8, 72), fineWindowMat)
      winTrack.rotation.x = Math.PI * 0.5
      rGroup.add(winTrack)

      // 8 处精密环形对接环箍 (绝无粗大齿轮块)
      for (let c = 0; c < 8; c++) {
        const a = (c / 8) * Math.PI * 2
        const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.095, 0.14, 12), titaniumStrutMat)
        collar.position.set(Math.cos(a) * radius, 0, Math.sin(a) * radius)
        collar.rotation.z = Math.PI * 0.5
        collar.rotation.y = -a + Math.PI * 0.5
        rGroup.add(collar)
      }

      // 6 根纤细张力辐条
      for (let s = 0; s < 6; s++) {
        const spoke = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, radius * 2, 8), titaniumStrutMat)
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

    // 4. 沿主脊柱分布的星芒光学导航信标 Sprites
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
  // 5. FIX 3: 重写 HABITAT RING AURORA (删除中央粗水泥管，对齐 00:08-00:11 宽扁倒角香槟钛双环 + 扁平圆盘中枢)
  // ============================================================================
  public buildHabitatRingAurora(): THREE.Group {
    const aurora = new THREE.Group()

    // 香槟钛金属材质 (#d6d3cd, metalness: 0.82, roughness: 0.24)
    const champagneTitaniumMat = new THREE.MeshStandardMaterial({
      color: 0xd6d3cd,
      map: this.champagneHullTex,
      bumpMap: this.champagneHullTex,
      bumpScale: 0.012,
      metalness: 0.82,
      roughness: 0.24,
      envMapIntensity: 1.85
    })
    const slateTrimMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      metalness: 0.86,
      roughness: 0.28,
      envMapIntensity: 1.8
    })
    const warmBiosphereMat = new THREE.MeshBasicMaterial({
      map: this.orangeGantryTex,
      color: 0xffebb3
    })

    // 1. 宽扁倒角外环 (radius: 4.8) 与内同心环 (radius: 3.35)，通过 scale(1, 1, 0.32) 形成优雅扁平碟环截面！
    const outerBevelRing = new THREE.Mesh(
      new THREE.TorusGeometry(4.8, 0.58, 24, 96),
      champagneTitaniumMat
    )
    outerBevelRing.scale.set(1, 1, 0.32)

    const outerTrimRing = new THREE.Mesh(
      new THREE.TorusGeometry(5.32, 0.08, 12, 96),
      slateTrimMat
    )
    outerTrimRing.scale.set(1, 1, 0.4)

    const innerBevelRing = new THREE.Mesh(
      new THREE.TorusGeometry(3.35, 0.38, 20, 80),
      champagneTitaniumMat
    )
    innerBevelRing.scale.set(1, 1, 0.32)

    aurora.add(outerBevelRing, outerTrimRing, innerBevelRing)

    // 2. 内环壁连续暖金白 (#ffebb3) 生态圈与城市灯带
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

    // 3. 8 根纤细径向张力辐条 (radius: 0.03，连接内环与中央扁平圆盘中枢)
    for (let i = 0; i < 8; i++) {
      const ang = (i / 8) * Math.PI
      const spoke = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.03, 9.6, 8),
        slateTrimMat
      )
      spoke.rotation.z = ang
      aurora.add(spoke)
    }

    // 4. 流线型扁平圆盘零重力中枢 (radius: 0.65, height: 0.45) + 轴向细长天线针 (彻底消灭粗大水泥管！)
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

    // 纤细轴向通信天线针
    const axialNeedle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.012, 0.025, 2.6, 8),
      champagneTitaniumMat
    )
    axialNeedle.rotation.x = Math.PI * 0.5
    aurora.add(axialNeedle)

    return aurora
  }

  // ============================================================================
  // 6. FIX 4A: EQUATORIAL ANCHOR (零过曝、3 根 0.018 极细金属天梯带 + 2 艘流线型攀爬舱)
  // ============================================================================
  public buildEquatorialAnchorComplex(tetherLength = 42.0): {
    group: THREE.Group
    climberPods: THREE.Group[]
  } {
    const group = new THREE.Group()
    const climberPods: THREE.Group[] = []

    const darkArmorMat = new THREE.MeshStandardMaterial({
      color: 0x1e2530,
      map: this.gunmetalAlbedo,
      bumpMap: this.gunmetalBump,
      bumpScale: 0.02,
      metalness: 0.85,
      roughness: 0.32,
      envMapIntensity: 1.7
    })
    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.88,
      roughness: 0.25,
      envMapIntensity: 1.8
    })
    const subtleCyanMat = new THREE.MeshBasicMaterial({ color: 0x00c8ff })
    const subtleAmberMat = new THREE.MeshBasicMaterial({ color: 0xff9922 })

    // 低剖面八角要塞基座 + 6 座导轨桁架塔 (无任何过曝散光块)
    const baseRing = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 2.3, 0.32, 8), darkArmorMat)
    baseRing.position.y = 0.16
    group.add(baseRing)

    for (let i = 0; i < 6; i++) {
      const ang = (i / 6) * Math.PI * 2
      const tower = new THREE.Group()
      tower.rotation.y = ang

      const mast = new THREE.Mesh(new THREE.BoxGeometry(0.16, 3.8, 0.22), darkArmorMat)
      mast.position.set(0, 1.9, 0.85)
      mast.rotation.x = -0.06
      tower.add(mast)

      const trackLine = new THREE.Mesh(new THREE.BoxGeometry(0.025, 3.6, 0.025), subtleCyanMat)
      trackLine.position.set(0, 1.9, 0.72)
      trackLine.rotation.x = -0.06
      tower.add(trackLine)

      group.add(tower)
    }

    // 3 根发丝级紧绷碳纳米管金属天梯带 (radius: 0.018)
    const ribbonMat = new THREE.MeshStandardMaterial({
      color: 0xcbd5e1,
      emissive: 0x0369a1,
      emissiveIntensity: 0.35,
      metalness: 0.9,
      roughness: 0.2
    })
    for (let c = 0; c < 3; c++) {
      const a = (c / 3) * Math.PI * 2
      const ribbonGeo = new THREE.CylinderGeometry(0.018, 0.018, tetherLength, 8)
      ribbonGeo.translate(0, tetherLength * 0.5, 0)
      const ribbon = new THREE.Mesh(ribbonGeo, ribbonMat)
      ribbon.position.set(Math.cos(a) * 0.26, 0.2, Math.sin(a) * 0.26)
      group.add(ribbon)
    }

    // 2 艘流线型攀爬运输舱 (带精致青色/琥珀色追踪信标，绝不泛白过曝)
    for (let p = 0; p < 2; p++) {
      const pod = new THREE.Group()
      pod.position.y = 1.6 + p * 2.8

      const carriage = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.36, 0.68, 12), titaniumMat)
      pod.add(carriage)

      for (let b = 0; b < 4; b++) {
        const ba = (b / 4) * Math.PI * 2
        const beacon = new THREE.Mesh(
          new THREE.SphereGeometry(0.028, 8, 8),
          b % 2 === 0 ? subtleCyanMat : subtleAmberMat
        )
        beacon.position.set(Math.cos(ba) * 0.36, 0, Math.sin(ba) * 0.36)
        pod.add(beacon)
      }

      group.add(pod)
      climberPods.push(pod)
    }

    return { group, climberPods }
  }

  // ============================================================================
  // 7. FIX 4B: DEEP SPACE ARRAY (十字形金属相控阵太阳翼 + 中心星芒激光收发器 + 轨道网格线，对齐 00:12)
  // ============================================================================
  public buildDeepSpaceRelayFleet(): {
    group: THREE.Group
    laserShaderMat: THREE.ShaderMaterial
  } {
    const fleet = new THREE.Group()

    const titaniumWingMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      map: this.bronzeSolarTex,
      metalness: 0.88,
      roughness: 0.2,
      envMapIntensity: 1.9,
      side: THREE.DoubleSide
    })
    const busMat = new THREE.MeshStandardMaterial({
      color: 0xcbd5e1,
      metalness: 0.9,
      roughness: 0.18,
      envMapIntensity: 1.9
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
          gl_FragColor = vec4(col, 0.18 + pulse * 0.35);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    const buildRelayProbe = (scale = 1.0) => {
      const probe = new THREE.Group()

      // 中央八角收发总线舱
      const coreBus = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.52, 8), busMat)
      coreBus.rotation.x = Math.PI * 0.5
      probe.add(coreBus)

      // 4 片修长十字形金属相控阵太阳翼 (Cross-Shaped Metallic Solar/Phased-Array Wings)
      for (let w = 0; w < 4; w++) {
        const ang = (w / 4) * Math.PI * 2 + Math.PI * 0.25
        const wingGroup = new THREE.Group()
        wingGroup.rotation.z = ang

        const boom = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 2.2, 6), busMat)
        boom.position.y = 1.15
        const panel = new THREE.Mesh(new THREE.BoxGeometry(0.28, 1.95, 0.01), titaniumWingMat)
        panel.position.y = 1.18
        wingGroup.add(boom, panel)
        probe.add(wingGroup)
      }

      // 中心星芒光学激光收发器 (Central Star-Flare Optical Laser Transceiver)
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

    // 星间脉冲激光束与微光轨道基准线
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

  // ============================================================================
  // 8. FIX 4C: LUNA (修复死白过曝：0x686c73 阿波罗中灰对比度 + 0.35 行星比例月球发动机)
  // ============================================================================
  public buildPhotorealisticLuna(moonRadius = 27.0): {
    group: THREE.Group
    lunarRigs: BrutalistEngineRig[]
  } {
    const group = new THREE.Group()
    const lunarRigs: BrutalistEngineRig[] = []

    // 严格按要求改为 0x686c73, roughness: 0.95, metalness: 0.02, bumpScale: 0.65，彻底根治过曝死白！
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

    // 3 座月球核聚变放逐发动机，严格缩放到 scale: 0.35，呈现真实行星级工程比例！
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
