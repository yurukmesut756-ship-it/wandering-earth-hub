import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

export interface BrutalistEngineRig {
  group: THREE.Group
  plumeAssembly: THREE.Group
  coreRayMat: THREE.ShaderMaterial
  sheathMat: THREE.ShaderMaterial
  strobes: THREE.Mesh[]
}

export class MegaStructuresBuilder {
  public armorAlbedo: THREE.CanvasTexture
  public armorBump: THREE.CanvasTexture
  public walkwayLightsTex: THREE.CanvasTexture
  public solarArrayTex: THREE.CanvasTexture
  public frozenEarthDayTex: THREE.CanvasTexture
  public frozenEarthBumpTex: THREE.CanvasTexture
  public frozenEarthNightTex: THREE.CanvasTexture
  public fluffyCloudsTex: THREE.CanvasTexture
  public moonRegolithTex: THREE.CanvasTexture
  public softGlowSprite: THREE.CanvasTexture
  public mistSpriteTex: THREE.CanvasTexture

  constructor() {
    const armor = this.createBrutalistArmorTextures()
    this.armorAlbedo = armor.albedo
    this.armorBump = armor.bump
    this.walkwayLightsTex = this.createWarmWalkwayWindowsTexture()
    this.solarArrayTex = this.createSapphireSolarCellTexture()
    const earthTex = this.createFrozenWanderingEarthTextures()
    this.frozenEarthDayTex = earthTex.day
    this.frozenEarthBumpTex = earthTex.bump
    this.frozenEarthNightTex = earthTex.night
    this.fluffyCloudsTex = this.createFluffyCloudsTexture()
    this.moonRegolithTex = this.createSharpLunarCraterTexture()
    this.softGlowSprite = this.createSoftRadialGlowSprite()
    this.mistSpriteTex = this.createVolumetricMistTexture()
  }

  // ============================================================================
  // 1. 生成高动态 Studio/Space HDR 环境贴图 (解决金属材质死黑问题！)
  // ============================================================================
  public static createStudioSpaceHDRI(renderer: THREE.WebGLRenderer): THREE.Texture {
    const pmrem = new THREE.PMREMGenerator(renderer)
    pmrem.compileEquirectangularShader()

    // 融合 RoomEnvironment 的高光反射盒子与太空冷蓝/暖阳多光源球体
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
    g.addColorStop(0, 'rgba(185, 225, 255, 0.42)')
    g.addColorStop(0.5, 'rgba(120, 185, 245, 0.18)')
    g.addColorStop(1, 'rgba(0, 0, 0, 0.0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 256, 128)
    return new THREE.CanvasTexture(c)
  }

  // 高反照率冰封地球贴图（冰川白/冰晶蓝大陆 + 深蓝宝石海洋 + 暗夜金色地下城脉络）
  private createFrozenWanderingEarthTextures() {
    const dayC = document.createElement('canvas')
    dayC.width = 2048
    dayC.height = 1024
    const dCtx = dayC.getContext('2d')!

    // 深宝石蓝冰海基底
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

    // 冰封大陆与高对比度雪山山脉
    const landmasses = [
      { x: 1240, y: 290, rx: 420, ry: 175 }, // 亚欧冰原大陆
      { x: 1060, y: 540, rx: 165, ry: 195 }, // 非洲大陆
      { x: 450, y: 310, rx: 250, ry: 155 },  // 北美冰原大陆
      { x: 610, y: 660, rx: 120, ry: 190 },  // 南美大陆
      { x: 1590, y: 690, rx: 130, ry: 95 }   // 澳洲大陆
    ]

    landmasses.forEach((m) => {
      for (let i = 0; i < 95; i++) {
        const ang = (i / 95) * Math.PI * 2
        const jitter = 0.55 + 0.45 * Math.sin(i * 4.3) * Math.cos(i * 2.7)
        const cx = m.x + Math.cos(ang) * m.rx * jitter
        const cy = m.y + Math.sin(ang) * m.ry * jitter
        const rad = 35 + (i % 45)

        const landG = dCtx.createRadialGradient(cx, cy, 4, cx, cy, rad)
        landG.addColorStop(0, '#eef6ff')     // 极高反照率雪峰
        landG.addColorStop(0.55, '#a8c7e6')  // 冰川蓝冻土
        landG.addColorStop(0.9, '#4c6d8c')   // 海岸冰架
        landG.addColorStop(1, 'rgba(23, 63, 115, 0)')
        dCtx.fillStyle = landG
        dCtx.beginPath()
        dCtx.arc(cx, cy, rad, 0, Math.PI * 2)
        dCtx.fill()

        // 凹凸山脊高程图
        bCtx.fillStyle = 'rgba(235, 235, 235, 0.35)'
        bCtx.beginPath()
        bCtx.arc(cx * 0.5, cy * 0.5, rad * 0.4, 0, Math.PI * 2)
        bCtx.fill()
      }

      // 夜半球金色地下城灯网与工业动脉连线
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

  private createBrutalistArmorTextures() {
    const c = document.createElement('canvas')
    c.width = 512
    c.height = 512
    const ctx = c.getContext('2d')!
    ctx.fillStyle = '#384354'
    ctx.fillRect(0, 0, 512, 512)

    ctx.strokeStyle = '#181e29'
    ctx.lineWidth = 2.5
    for (let y = 0; y < 512; y += 48) {
      for (let x = 0; x < 512; x += 64) {
        const shift = ((y / 48) % 2) * 32
        ctx.fillStyle = (x + y) % 96 === 0 ? '#445166' : '#2f3947'
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

  private createWarmWalkwayWindowsTexture(): THREE.CanvasTexture {
    const c = document.createElement('canvas')
    c.width = 512
    c.height = 128
    const ctx = c.getContext('2d')!
    ctx.fillStyle = '#0c111a'
    ctx.fillRect(0, 0, 512, 128)
    for (let row = 14; row < 114; row += 18) {
      for (let col = 6; col < 504; col += 10) {
        if (Math.random() > 0.18) {
          ctx.fillStyle = Math.random() > 0.15 ? '#ffaa33' : '#ffe6b3'
          ctx.fillRect(col, row, 6, 5)
        }
      }
    }
    const tex = new THREE.CanvasTexture(c)
    tex.wrapS = THREE.RepeatWrapping
    tex.wrapT = THREE.RepeatWrapping
    tex.repeat.set(8, 1)
    return tex
  }

  private createSapphireSolarCellTexture(): THREE.CanvasTexture {
    const c = document.createElement('canvas')
    c.width = 512
    c.height = 512
    const ctx = c.getContext('2d')!
    ctx.fillStyle = '#0f2d5e'
    ctx.fillRect(0, 0, 512, 512)

    // 蓝硅晶格 + 亮铜色汇流母线 (Copper Busbars)
    ctx.strokeStyle = '#255799'
    ctx.lineWidth = 2
    for (let i = 0; i <= 512; i += 32) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, 512)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(512, i)
      ctx.stroke()
    }
    ctx.strokeStyle = '#d97706'
    ctx.lineWidth = 4
    for (let i = 64; i < 512; i += 128) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, 512)
      ctx.stroke()
    }
    const tex = new THREE.CanvasTexture(c)
    tex.wrapS = THREE.RepeatWrapping
    tex.wrapT = THREE.RepeatWrapping
    tex.repeat.set(2, 1)
    return tex
  }

  private createSharpLunarCraterTexture(): THREE.CanvasTexture {
    const c = document.createElement('canvas')
    c.width = 1024
    c.height = 512
    const ctx = c.getContext('2d')!
    ctx.fillStyle = '#b8bcc2'
    ctx.fillRect(0, 0, 1024, 512)

    // 静海与风暴洋暗色玄武岩盆地
    const mares = [
      { x: 340, y: 200, r: 120 },
      { x: 490, y: 235, r: 105 },
      { x: 660, y: 215, r: 85 },
      { x: 245, y: 315, r: 78 }
    ]
    mares.forEach((m) => {
      const g = ctx.createRadialGradient(m.x, m.y, 12, m.x, m.y, m.r)
      g.addColorStop(0, '#5a6069')
      g.addColorStop(0.7, '#79808a')
      g.addColorStop(1, 'rgba(184, 188, 194, 0)')
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2)
      ctx.fill()
    })

    for (let i = 0; i < 1200; i++) {
      const x = Math.random() * 1024
      const y = Math.random() * 512
      const r = 1.5 + Math.pow(Math.random(), 3) * 32
      ctx.strokeStyle = 'rgba(245, 248, 252, 0.55)'
      ctx.lineWidth = 1.4
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.stroke()
      ctx.fillStyle = 'rgba(55, 60, 68, 0.48)'
      ctx.beginPath()
      ctx.arc(x + 0.8, y + 0.8, r * 0.84, 0, Math.PI * 2)
      ctx.fill()
    }
    return new THREE.CanvasTexture(c)
  }

  // ============================================================================
  // 2. 高准直 7 束独立激光等离子柱着色器 (严控透明度与超载白金/暖橙渐变，绝不糊屏！)
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
          float corePin = pow(cosView, 2.2);

          // 纵向高频等离子纤维丝与喷口马赫震波环
          float filaments = 0.82 + 0.18 * sin(vUv.x * 38.0 + sin(vUv.y * 20.0 - uTime * 16.0));
          float machRings = exp(-vUv.y * 5.5) * smoothstep(0.25, 1.0, sin(vUv.y * 65.0 - uTime * 24.0)) * 0.45;
          float heightFade = pow(max(0.0, 1.0 - vUv.y), 1.45) * smoothstep(0.0, 0.02, vUv.y);
          float growMask = smoothstep(vUv.y, vUv.y - 0.12, ig);

          // 常规态：高锐度冰晶蓝 (#00d8ff) -> 纯白光芯 (#e6faff)
          vec3 nominalCol = mix(vec3(0.0, 0.85, 1.0), vec3(1.15, 1.35, 1.5), corePin);
          // 120% 超载态：优雅切换为高温白金核心 (#fff2cc) 与暖橙边沿 (#ff8800)，绝不糊成白紫色块！
          vec3 overclockCol = mix(vec3(1.0, 0.53, 0.0), vec3(1.35, 1.25, 0.95), corePin);
          vec3 finalCol = mix(nominalCol, overclockCol, uOverclock) * filaments;

          float alpha = clamp((corePin * 0.62 + machRings) * heightFade * growMask * clamp(uThrust, 0.2, 1.15), 0.0, 0.68);
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

        void main() {
          float ig = clamp((uIgnitionProgress - uIgnitionThreshold) * 4.5, 0.0, 1.0);
          if (ig <= 0.01 || uThrust <= 0.01) discard;

          float softRim = pow(abs(dot(normalize(vNormal), normalize(vViewDir))), 2.6);
          float vFade = pow(max(0.0, 1.0 - vUv.y), 1.9) * smoothstep(0.0, 0.04, vUv.y);
          float wave = 0.8 + 0.2 * sin(vUv.y * 18.0 - uTime * 9.0);

          vec3 colBlue = vec3(0.08, 0.58, 1.0);
          vec3 colGold = vec3(1.0, 0.53, 0.05);
          vec3 col = mix(colBlue, colGold, uOverclock);

          float alpha = clamp(softRim * vFade * wave * ig * 0.26, 0.0, 0.28);
          gl_FragColor = vec4(col, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    })
  }

  // ============================================================================
  // 3A. 重工业野兽派 11km 行星发动机 (24根垂直肋片 + 6层暖黄走廊 + 6条液压巨腿 + 7联装高准直激光束)
  // ============================================================================
  public buildBrutalistPlanetaryEngine(
    scale = 1.0,
    plumeHeight = 14.0,
    ignitionThreshold = 0.0
  ): BrutalistEngineRig {
    const group = new THREE.Group()
    const strobes: THREE.Mesh[] = []

    const armorMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      map: this.armorAlbedo,
      bumpMap: this.armorBump,
      bumpScale: 0.025,
      metalness: 0.82,
      roughness: 0.32,
      envMapIntensity: 1.8
    })
    const darkSteelMat = new THREE.MeshStandardMaterial({
      color: 0x263040,
      metalness: 0.86,
      roughness: 0.28,
      envMapIntensity: 1.8
    })
    const chromePistonMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.94,
      roughness: 0.14,
      envMapIntensity: 2.0
    })
    const walkwayMat = new THREE.MeshBasicMaterial({
      map: this.walkwayLightsTex,
      color: 0xffaa33
    })
    const cyanCoilMat = new THREE.MeshBasicMaterial({ color: 0x00d8ff })
    const redStrobeMat = new THREE.MeshBasicMaterial({ color: 0xff2a4d })

    // 1. 底层重装岩床基座与 6 层暖黄照明检修走廊 (`#ffaa33` micro-window strips)
    const foundation = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.78, 0.14, 24), darkSteelMat)
    foundation.position.y = 0.07
    group.add(foundation)

    const towerBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.36, 0.58, 0.54, 24, 1, true),
      armorMat
    )
    towerBody.position.y = 0.34
    group.add(towerBody)

    for (let tier = 0; tier < 6; tier++) {
      const r = 0.56 - tier * 0.036
      const y = 0.14 + tier * 0.078
      // 暖黄灯光走廊环
      const lightGallery = new THREE.Mesh(new THREE.CylinderGeometry(r, r + 0.01, 0.022, 24, 1, true), walkwayMat)
      lightGallery.position.y = y
      group.add(lightGallery)

      // 水平加固环形钢梁
      const girder = new THREE.Mesh(new THREE.TorusGeometry(r + 0.018, 0.01, 6, 24), darkSteelMat)
      girder.rotation.x = Math.PI * 0.5
      girder.position.y = y + 0.014
      group.add(girder)
    }

    // 2. 24 根重型垂直冷却塔式结构扶壁肋片 (24 Heavy Vertical Structural Buttress Fins)
    for (let i = 0; i < 24; i++) {
      const ang = (i / 24) * Math.PI * 2
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.56, 0.14), armorMat)
      fin.position.set(Math.cos(ang) * 0.48, 0.33, Math.sin(ang) * 0.48)
      fin.rotation.y = -ang
      fin.rotation.x = -0.35
      group.add(fin)
    }

    // 3. 6 条巨型液压减震斜撑三脚架支腿 + 航空红闪信标 (6 Colossal Angled Hydraulic Struts)
    for (let i = 0; i < 6; i++) {
      const ang = (i / 6) * Math.PI * 2
      const legGroup = new THREE.Group()
      legGroup.rotation.y = ang

      const upperStrut = new THREE.Mesh(new THREE.BoxGeometry(0.095, 0.68, 0.12), darkSteelMat)
      upperStrut.position.set(0, 0.28, 0.62)
      upperStrut.rotation.x = -0.78
      legGroup.add(upperStrut)

      // 镀铬双液压活塞杆
      for (const side of [-0.055, 0.055]) {
        const piston = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.52, 8), chromePistonMat)
        piston.position.set(side, 0.24, 0.68)
        piston.rotation.x = -0.78
        legGroup.add(piston)
      }

      // 锚定山体的巨型脚垫与红色防撞频闪灯
      const footpad = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.08, 0.26), armorMat)
      footpad.position.set(0, 0.04, 0.88)
      legGroup.add(footpad)

      const strobe = new THREE.Mesh(new THREE.SphereGeometry(0.024, 8, 8), redStrobeMat)
      strobe.position.set(0, 0.11, 0.96)
      legGroup.add(strobe)
      strobes.push(strobe)

      group.add(legGroup)
    }

    // 4. 喷口火山口内腔：7 联装独立等离子加速喷嘴 + 青色磁约束线圈环 (Inner 7-Nozzle Fusion Injector Core)
    const craterRim = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.032, 10, 32), darkSteelMat)
    craterRim.rotation.x = Math.PI * 0.5
    craterRim.position.y = 0.61
    group.add(craterRim)

    const magCoil = new THREE.Mesh(new THREE.TorusGeometry(0.31, 0.012, 8, 32), cyanCoilMat)
    magCoil.rotation.x = Math.PI * 0.5
    magCoil.position.y = 0.58
    group.add(magCoil)

    const nozzleOffsets: [number, number][] = [[0, 0]]
    for (let k = 0; k < 6; k++) {
      const a = (k / 6) * Math.PI * 2
      nozzleOffsets.push([Math.cos(a) * 0.165, Math.sin(a) * 0.165])
    }

    // 5. 7 束独立高准直激光等离子柱 + 1 层柔和外电离气鞘 (Collimated Multi-Ray Plasma Pillar)
    const plumeAssembly = new THREE.Group()
    plumeAssembly.position.y = 0.56
    const coreRayMat = this.createCollimatedCoreRayShader(ignitionThreshold)
    const sheathMat = this.createOuterIonSheathShader(ignitionThreshold)

    const singleRayGeo = new THREE.CylinderGeometry(0.042, 0.055, plumeHeight, 12, 24, true)
    singleRayGeo.translate(0, plumeHeight * 0.5, 0)

    nozzleOffsets.forEach(([nx, nz]) => {
      // 喷口金属加速环
      const injectorBell = new THREE.Mesh(
        new THREE.CylinderGeometry(0.062, 0.048, 0.09, 12, 1, true),
        chromePistonMat
      )
      injectorBell.position.set(nx, 0.54, nz)
      group.add(injectorBell)

      const coreDisk = new THREE.Mesh(
        new THREE.CircleGeometry(0.052, 16),
        new THREE.MeshBasicMaterial({ color: 0xd8f8ff })
      )
      coreDisk.rotation.x = -Math.PI * 0.5
      coreDisk.position.set(nx, 0.56, nz)
      group.add(coreDisk)

      // 准直垂直等离子光芯柱
      const rayMesh = new THREE.Mesh(singleRayGeo, coreRayMat)
      rayMesh.position.set(nx, 0, nz)
      plumeAssembly.add(rayMesh)
    })

    // 外围半透明电离空气护套
    const sheathGeo = new THREE.CylinderGeometry(0.42, 0.29, plumeHeight * 0.95, 24, 16, true)
    sheathGeo.translate(0, plumeHeight * 0.475, 0)
    plumeAssembly.add(new THREE.Mesh(sheathGeo, sheathMat))

    group.add(plumeAssembly)
    group.scale.setScalar(scale)

    return {
      group,
      plumeAssembly,
      coreRayMat,
      sheathMat,
      strobes
    }
  }

  // ============================================================================
  // 3B. 赤道万向节转向发动机单元 (U型双耳轴万向支架 + 配重桁架 + 20° 倾角切向喷口)
  // ============================================================================
  public buildGimbalSteeringEngineUnit(
    scale = 1.0,
    plumeLength = 16.0
  ): BrutalistEngineRig {
    const group = new THREE.Group()

    const steelMat = new THREE.MeshStandardMaterial({
      color: 0x3b4758,
      map: this.armorAlbedo,
      metalness: 0.85,
      roughness: 0.3,
      envMapIntensity: 1.8
    })

    // U 型双耳轴万向节底座支架 (U-Shaped Dual-Trunnion Gimbal Cradle)
    const cradleBase = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.14, 1.1), steelMat)
    cradleBase.position.y = 0.07
    group.add(cradleBase)

    for (const xSide of [-0.55, 0.55]) {
      const pylon = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.75, 0.42), steelMat)
      pylon.position.set(xSide, 0.42, 0)
      group.add(pylon)
    }

    // 内部挂载的 20° 切向倾角发动机本体 (70° from vertical = 20° above horizontal)
    const innerRig = this.buildBrutalistPlanetaryEngine(0.85, plumeLength, 0.0)
    innerRig.group.position.set(0, 0.38, 0)
    innerRig.group.rotation.x = Math.PI * 0.5 - 0.35 // 20° above horizontal equatorial tangent
    group.add(innerRig.group)

    group.scale.setScalar(scale)
    return {
      group,
      plumeAssembly: innerRig.plumeAssembly,
      coreRayMat: innerRig.coreRayMat,
      sheathMat: innerRig.sheathMat,
      strobes: innerRig.strobes
    }
  }

  // ============================================================================
  // 3C. 赤道太空电梯锚点要塞 (冰封洋面八角平台 + 8座桁架发射脐带塔 + 3艘攀爬轿厢)
  // ============================================================================
  public buildEquatorialAnchorComplex(tetherLength = 42.0): {
    group: THREE.Group
    climberPods: THREE.Group[]
  } {
    const group = new THREE.Group()
    const climberPods: THREE.Group[] = []

    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      map: this.armorAlbedo,
      bumpMap: this.armorBump,
      bumpScale: 0.02,
      metalness: 0.84,
      roughness: 0.28,
      envMapIntensity: 1.8
    })
    const trussMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.88,
      roughness: 0.24,
      envMapIntensity: 1.8
    })
    const railGlowMat = new THREE.MeshBasicMaterial({ color: 0x00d8ff })
    const warmWindowMat = new THREE.MeshBasicMaterial({ map: this.walkwayLightsTex, color: 0xffaa33 })

    // 1. 底部冰架海面与多级八角重装平台 (Tiered Octagonal Industrial Mega-Platform)
    const iceShelf = new THREE.Mesh(
      new THREE.CylinderGeometry(9.5, 10.0, 0.18, 32),
      new THREE.MeshStandardMaterial({ color: 0x9bb8d9, roughness: 0.45, metalness: 0.2 })
    )
    iceShelf.position.y = -0.05
    group.add(iceShelf)

    const tier1 = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 3.8, 0.45, 8), titaniumMat)
    tier1.position.y = 0.22
    const tier2 = new THREE.Mesh(new THREE.CylinderGeometry(2.1, 2.7, 0.55, 8), titaniumMat)
    tier2.position.y = 0.68
    const walkRing = new THREE.Mesh(new THREE.CylinderGeometry(2.75, 2.75, 0.14, 16, 1, true), warmWindowMat)
    walkRing.position.y = 0.48
    group.add(tier1, tier2, walkRing)

    // 2. 8 座高耸交叉金属桁架发射脐带塔 (8 Towering Vertical Lattice Launch Umbilical Towers)
    for (let i = 0; i < 8; i++) {
      const ang = (i / 8) * Math.PI * 2
      const tower = new THREE.Group()
      tower.rotation.y = ang

      // 主立柱与交叉斜撑桁架
      const mainMast = new THREE.Mesh(new THREE.BoxGeometry(0.28, 5.8, 0.36), titaniumMat)
      mainMast.position.set(0, 2.9, 1.85)
      mainMast.rotation.x = -0.08
      tower.add(mainMast)

      for (let h = 0; h < 8; h++) {
        const cross = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.06, 0.65), trussMat)
        cross.position.set(0, 0.8 + h * 0.65, 1.65 - h * 0.04)
        cross.rotation.x = h % 2 === 0 ? 0.45 : -0.45
        tower.add(cross)
      }

      // 发光线性电磁感应导轨 (Glowing Electromagnetic Linear-Induction Rails)
      const rail = new THREE.Mesh(new THREE.BoxGeometry(0.06, 5.6, 0.06), railGlowMat)
      rail.position.set(0, 2.9, 1.52)
      rail.rotation.x = -0.08
      tower.add(rail)

      group.add(tower)
    }

    // 3. 3 根直达同步轨道天柱空间站的编织碳纳米管天梯缆索
    const ribbonMat = new THREE.MeshStandardMaterial({
      color: 0xdbeafe,
      emissive: 0x0284c7,
      emissiveIntensity: 0.45,
      metalness: 0.9,
      roughness: 0.15
    })
    for (let c = 0; c < 3; c++) {
      const cAng = (c / 3) * Math.PI * 2
      const ribbonGeo = new THREE.CylinderGeometry(0.03, 0.03, tetherLength, 8)
      ribbonGeo.translate(0, tetherLength * 0.5, 0)
      const ribbon = new THREE.Mesh(ribbonGeo, ribbonMat)
      ribbon.position.set(Math.cos(cAng) * 0.42, 0.5, Math.sin(cAng) * 0.42)
      group.add(ribbon)
    }

    // 4. 3 艘流线型金属太空电梯攀爬轿厢 (3 Sleek Space Elevator Climber Pods)
    for (let p = 0; p < 3; p++) {
      const pod = new THREE.Group()
      pod.position.y = 1.8 + p * 2.2

      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.62, 0.95, 12), trussMat)
      const cabinWin = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.58, 0.28, 12, 1, true), warmWindowMat)
      pod.add(body, cabinWin)

      for (let j = 0; j < 6; j++) {
        const jAng = (j / 6) * Math.PI * 2
        const thruster = new THREE.Mesh(
          new THREE.ConeGeometry(0.08, 0.45, 10),
          new THREE.MeshBasicMaterial({
            color: 0x00d8ff,
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending
          })
        )
        thruster.rotation.x = Math.PI
        thruster.position.set(Math.cos(jAng) * 0.48, -0.68, Math.sin(jAng) * 0.48)
        pod.add(thruster)
      }

      group.add(pod)
      climberPods.push(pod)
    }

    return { group, climberPods }
  }

  // ============================================================================
  // 3D. 天柱号同步轨道空间站 (100+ 部件：拉丝钛桁架 + 球形贮箱 + 金箔 Kapton + 16舱段双环 + 8幅蓝硅光翼)
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
      color: 0xc8d2dc,
      map: this.armorAlbedo,
      metalness: 0.85,
      roughness: 0.25,
      envMapIntensity: 1.8
    })
    const darkTrussMat = new THREE.MeshStandardMaterial({
      color: 0x3b4759,
      metalness: 0.88,
      roughness: 0.28,
      envMapIntensity: 1.8
    })
    const kaptonGoldMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.92,
      roughness: 0.18,
      envMapIntensity: 2.0
    })
    const solarWingMat = new THREE.MeshStandardMaterial({
      map: this.solarArrayTex,
      bumpMap: this.solarArrayTex,
      bumpScale: 0.015,
      color: 0x3b82f6,
      emissive: 0x0b1e3b,
      emissiveIntensity: 0.35,
      metalness: 0.82,
      roughness: 0.16,
      envMapIntensity: 1.9,
      side: THREE.DoubleSide
    })
    const cabinWinMat = new THREE.MeshBasicMaterial({ map: this.walkwayLightsTex, color: 0xffe6b3 })

    // 1. 八角形中央主桁架脊柱 + 球形推进剂贮箱 + 金箔隔热舱段
    for (let i = -8; i <= 8; i++) {
      const y = i * 0.55
      const coreMod = new THREE.Mesh(
        new THREE.CylinderGeometry(0.28, 0.28, 0.48, 8),
        Math.abs(i) % 3 === 1 ? kaptonGoldMat : brushedTitanium
      )
      coreMod.position.y = y
      group.add(coreMod)

      // 两侧球形聚变燃料贮箱 (Spherical Propellant Tanks)
      if (i % 2 === 0) {
        for (const s of [-0.46, 0.46]) {
          const tank = new THREE.Mesh(
            new THREE.SphereGeometry(0.16, 16, 16),
            i % 4 === 0 ? kaptonGoldMat : brushedTitanium
          )
          tank.position.set(s, y, 0)
          group.add(tank)
        }
      }
    }

    // 2. 分割为 16 个弧形增压舱段的双层反向旋转重力环 + 外部散热翼片
    const buildSegmentedGravityRing = (radius: number) => {
      const rGroup = new THREE.Group()
      const baseTorus = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.14, 16, 64), darkTrussMat)
      baseTorus.rotation.x = Math.PI * 0.5
      rGroup.add(baseTorus)

      const winStrip = new THREE.Mesh(new THREE.TorusGeometry(radius - 0.12, 0.06, 8, 64), cabinWinMat)
      winStrip.rotation.x = Math.PI * 0.5
      rGroup.add(winStrip)

      for (let m = 0; m < 16; m++) {
        const ang = (m / 16) * Math.PI * 2
        const mod = new THREE.Mesh(
          new THREE.BoxGeometry(0.36, 0.34, 0.58),
          m % 4 === 0 ? kaptonGoldMat : brushedTitanium
        )
        mod.position.set(Math.cos(ang) * radius, 0, Math.sin(ang) * radius)
        mod.rotation.y = -ang
        rGroup.add(mod)

        // 外部白色散热百叶鳍片
        if (m % 2 === 0) {
          const radiator = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.02, 0.28), brushedTitanium)
          radiator.position.set(Math.cos(ang) * (radius + 0.38), 0, Math.sin(ang) * (radius + 0.38))
          radiator.rotation.y = -ang
          rGroup.add(radiator)
        }
      }

      for (let s = 0; s < 8; s++) {
        const spoke = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, radius * 2, 8), brushedTitanium)
        spoke.rotation.z = Math.PI * 0.5
        spoke.rotation.y = (s / 8) * Math.PI
        rGroup.add(spoke)
      }
      return rGroup
    }

    const ringUpper = buildSegmentedGravityRing(2.45)
    ringUpper.position.y = 1.25
    const ringLower = buildSegmentedGravityRing(2.45)
    ringLower.position.y = -1.25
    group.add(ringUpper, ringLower)

    // 3. 8 幅 ISS 级双折蓝宝石硅光伏阵列翼 (Articulated Double-Folding Solar Array Wings)
    const crossBoom = new THREE.Mesh(new THREE.BoxGeometry(11.2, 0.22, 0.22), brushedTitanium)
    group.add(crossBoom)

    for (const side of [-1, 1]) {
      for (let idx = 1; idx <= 2; idx++) {
        const x = side * (2.9 + idx * 1.65)
        const goldGimbal = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.38, 12), kaptonGoldMat)
        goldGimbal.position.set(x, 0, 0)
        group.add(goldGimbal)

        for (const zDir of [-1, 1]) {
          // 双折主副翼板 + 中央金属支撑横梁
          const wingFrame = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.06, 2.9), brushedTitanium)
          wingFrame.position.set(x, 0, zDir * 1.55)
          group.add(wingFrame)

          for (const subX of [-0.36, 0.36]) {
            const blanket = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.025, 2.75), solarWingMat)
            blanket.position.set(x + subX, 0, zDir * 1.55)
            blanket.rotation.z = 0.08
            group.add(blanket)
          }
        }
      }
    }

    // 4. 导航信标灯
    for (const p of [
      new THREE.Vector3(0, 4.8, 0),
      new THREE.Vector3(0, -4.8, 0),
      new THREE.Vector3(5.6, 0.2, 0),
      new THREE.Vector3(-5.6, 0.2, 0)
    ]) {
      const s = new THREE.Mesh(
        new THREE.SphereGeometry(0.09, 10, 10),
        new THREE.MeshBasicMaterial({ color: 0xff2a4d })
      )
      s.position.copy(p)
      group.add(s)
      strobes.push(s)
    }

    return { group, ringUpper, ringLower, strobes }
  }

  // ============================================================================
  // 3E. 极光号斯坦福圆环轨道城 (亮白钛合金倒角装甲 + 12根辐条穿梭机 + 船坞护卫舰 + 暖金内城)
  // ============================================================================
  public buildHabitatRingAurora(): THREE.Group {
    const aurora = new THREE.Group()

    const whiteTitanium = new THREE.MeshStandardMaterial({
      color: 0xd8e2ec,
      map: this.armorAlbedo,
      bumpMap: this.armorBump,
      bumpScale: 0.018,
      metalness: 0.78,
      roughness: 0.22,
      envMapIntensity: 1.8
    })
    const gunmetalMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.86,
      roughness: 0.28,
      envMapIntensity: 1.8
    })
    const kaptonMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.9,
      roughness: 0.2,
      envMapIntensity: 1.9
    })
    const cityscapeMat = new THREE.MeshBasicMaterial({
      map: this.walkwayLightsTex,
      color: 0xffe6b3
    })

    // 1. 斯坦福主环与内生态穹顶环
    const outerRing = new THREE.Mesh(new THREE.TorusGeometry(5.2, 0.45, 24, 96), whiteTitanium)
    const innerRing = new THREE.Mesh(new THREE.TorusGeometry(3.4, 0.26, 20, 72), gunmetalMat)
    const cityInterior = new THREE.Mesh(new THREE.TorusGeometry(4.78, 0.18, 12, 96), cityscapeMat)
    const subCityInterior = new THREE.Mesh(new THREE.TorusGeometry(3.16, 0.1, 12, 72), cityscapeMat)
    aurora.add(outerRing, innerRing, cityInterior, subCityInterior)

    // 2. 24 组倒角装甲居住区模块
    for (let i = 0; i < 24; i++) {
      const ang = (i / 24) * Math.PI * 2
      const bay = new THREE.Mesh(
        new THREE.BoxGeometry(0.55, 1.05, 0.98),
        i % 4 === 0 ? kaptonMat : whiteTitanium
      )
      bay.position.set(Math.cos(ang) * 5.2, Math.sin(ang) * 5.2, 0)
      bay.rotation.z = ang
      aurora.add(bay)
    }

    // 3. 12 根辐射状天梯辐条与发光穿梭列车
    for (let i = 0; i < 12; i++) {
      const ang = (i / 12) * Math.PI
      const spoke = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 10.4, 10), gunmetalMat)
      spoke.rotation.z = ang
      aurora.add(spoke)
    }

    // 4. 中央零重力船坞中枢与停泊护卫舰
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.78, 0.78, 4.4, 24), whiteTitanium)
    hub.rotation.x = Math.PI * 0.5
    aurora.add(hub)

    for (let c = 0; c < 4; c++) {
      const cAng = (c / 4) * Math.PI * 2
      const corvette = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.95, 8), whiteTitanium)
      corvette.position.set(Math.cos(cAng) * 1.25, Math.sin(cAng) * 1.25, 1.6)
      corvette.rotation.x = Math.PI * 0.5
      aurora.add(corvette)
    }

    return aurora
  }

  // ============================================================================
  // 3F. 深空预警与激光中继舰队 (5艘 JWST 18镜片镀金折反射镜 + 5层菱形遮阳帆 + 蓝光激光束)
  // ============================================================================
  public buildDeepSpaceRelayFleet(): {
    group: THREE.Group
    laserShaderMat: THREE.ShaderMaterial
  } {
    const fleet = new THREE.Group()

    const goldBerylliumMat = new THREE.MeshStandardMaterial({
      color: 0xffcc33,
      metalness: 0.95,
      roughness: 0.1,
      envMapIntensity: 2.2
    })
    const silverShieldMat = new THREE.MeshStandardMaterial({
      color: 0xcbd5e1,
      metalness: 0.88,
      roughness: 0.2,
      envMapIntensity: 1.8,
      side: THREE.DoubleSide
    })
    const kaptonLayerMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.85,
      roughness: 0.25,
      envMapIntensity: 1.8,
      side: THREE.DoubleSide
    })
    const carbonStrutMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.8,
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
          float pulse = pow(0.5 + 0.5 * sin(vUv.y * 40.0 - uTime * 16.0), 6.0);
          vec3 col = mix(vec3(0.0, 0.78, 1.0), vec3(0.9, 0.98, 1.0), pulse);
          gl_FragColor = vec4(col, 0.22 + pulse * 0.42);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    const buildJWSTSatellite = (scale = 1.0) => {
      const sat = new THREE.Group()

      // 18 片六角镀金铍反射主镜
      const hexR = 0.26
      const hexGeo = new THREE.CylinderGeometry(hexR * 0.95, hexR * 0.95, 0.045, 6)
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
      coords.forEach(([x, y]) => {
        const m = new THREE.Mesh(hexGeo, goldBerylliumMat)
        m.position.set(x, y, 0)
        sat.add(m)
      })

      // 碳纤维次镜三脚支撑臂
      for (let b = 0; b < 3; b++) {
        const a = (b / 3) * Math.PI * 2 + Math.PI / 6
        const strut = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 1.25, 6), carbonStrutMat)
        strut.position.set(Math.cos(a) * 0.45, Math.sin(a) * 0.45, 0.58)
        strut.lookAt(0, 0, 1.15)
        strut.rotateX(Math.PI * 0.5)
        sat.add(strut)
      }
      const secMirror = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.06, 6), goldBerylliumMat)
      secMirror.rotation.x = Math.PI * 0.5
      secMirror.position.z = 1.15
      sat.add(secMirror)

      // 5 层银色/金箔菱形太阳帆隔热膜 (5-Layer Silver/Kapton Diamond Sunshield)
      for (let l = 0; l < 5; l++) {
        const membrane = new THREE.Mesh(
          new THREE.BoxGeometry(2.2 - l * 0.06, 1.35 - l * 0.04, 0.012),
          l % 2 === 0 ? silverShieldMat : kaptonLayerMat
        )
        membrane.position.set(0, -0.58 - l * 0.075, -0.25)
        membrane.rotation.x = Math.PI * 0.47
        membrane.rotation.z = Math.PI * 0.25
        sat.add(membrane)
      }

      sat.scale.setScalar(scale)
      return sat
    }

    const nodes = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-3.4, 1.15, -2.2),
      new THREE.Vector3(3.6, -0.95, -2.0),
      new THREE.Vector3(-6.2, -1.3, -5.2),
      new THREE.Vector3(6.4, 1.5, -5.0)
    ]
    nodes.forEach((p, idx) => {
      const s = buildJWSTSatellite(idx === 0 ? 1.2 : 0.88)
      s.position.copy(p)
      s.rotation.y = 0.22
      fleet.add(s)
    })

    // 准直光学激光束网
    const pairs: [number, number][] = [
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 4]
    ]
    pairs.forEach(([a, b]) => {
      const pA = nodes[a]
      const pB = nodes[b]
      const len = pA.distanceTo(pB)
      const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, len, 6), laserShaderMat)
      beam.position.copy(pA).lerp(pB, 0.5)
      beam.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), pB.clone().sub(pA).normalize())
      fleet.add(beam)
    })

    return { group: fleet, laserShaderMat }
  }

  // ============================================================================
  // 3G. 高对比度陨石坑月球与静海 3 座巨型月球核聚变放逐发动机
  // ============================================================================
  public buildPhotorealisticLuna(moonRadius = 27.0): {
    group: THREE.Group
    lunarRigs: BrutalistEngineRig[]
  } {
    const group = new THREE.Group()
    const lunarRigs: BrutalistEngineRig[] = []

    const moonMat = new THREE.MeshStandardMaterial({
      map: this.moonRegolithTex,
      bumpMap: this.moonRegolithTex,
      bumpScale: 0.45,
      color: 0xd0d5dd,
      roughness: 0.88,
      metalness: 0.04
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

    // 在正对太阳与相机的静海表面部署 3 座月球核聚变放逐发动机
    const engineNormals = [
      new THREE.Vector3(0.32, 0.24, 0.91).normalize(),
      new THREE.Vector3(0.46, 0.36, 0.81).normalize(),
      new THREE.Vector3(0.18, 0.12, 0.97).normalize()
    ]
    engineNormals.forEach((n, idx) => {
      const rig = this.buildBrutalistPlanetaryEngine(idx === 0 ? 1.85 : 1.45, 13.0, 0.0)
      rig.group.position.copy(n.clone().multiplyScalar(moonRadius - 0.1))
      rig.group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), n)
      group.add(rig.group)
      lunarRigs.push(rig)
    })

    // 被照亮的喷射月尘粒子云
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
