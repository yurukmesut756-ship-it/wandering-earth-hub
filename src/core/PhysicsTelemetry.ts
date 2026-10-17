import { reactive, computed } from 'vue'

export type NodeId =
  | 'EARTH'
  | 'ENGINE_ARRAY'
  | 'EQUATORIAL'
  | 'ANCHOR'
  | 'TIANZHU'
  | 'HABITAT'
  | 'DEEP_SPACE'
  | 'LUNA'

export type ModeId = 'CINEMATIC' | 'EXPLORE' | 'STORY_INTRO' | 'IGNITION'

export interface NodeMeta {
  id: NodeId
  labelEn: string
  labelZh: string
  titleEn: string
  titleZh: string
  subEn: string
  subZh: string
  altitudeTag: string
}

export const ORBITAL_NODES: NodeMeta[] = [
  {
    id: 'EARTH',
    labelEn: 'EARTH',
    labelZh: '地球全景',
    titleEn: 'EARTH // PLANETARY ARK',
    titleZh: '地球 · 行星方舟全景',
    subEn: '10,000 HEAVY-FUSION ENGINES — EN ROUTE TO ALPHA CENTAURI',
    subZh: '10,000 座重元素聚变发动机全功率推进 · 目标半人马座 α 星',
    altitudeTag: 'ALT: GLOBAL ORBIT'
  },
  {
    id: 'ENGINE_ARRAY',
    labelEn: 'ENGINE ARRAY',
    labelZh: '推进阵列',
    titleEn: 'ENGINE ARRAY 01',
    titleZh: '一号行星发动机集群',
    subEn: 'NORTHERN CRUST THRUST MATRIX — 11 KM BRUTALIST PLASMA TOWERS',
    subZh: '喜马拉雅冰封山脉推进矩阵 · 11 公里级七联装等离子聚变巨塔',
    altitudeTag: 'ALT: 11.2 KM MSL'
  },
  {
    id: 'EQUATORIAL',
    labelEn: 'EQUATORIAL',
    labelZh: '赤道转向',
    titleEn: 'EQUATORIAL STEERING ARRAY',
    titleZh: '赤道转向发动机阵列',
    subEn: 'GIMBAL-MOUNTED TORQUE NOZZLES — PLANETARY ROTATION BRAKE',
    subZh: '赤道装甲峡谷万向节转向阵列 · 20° 切向高准直等离子光束',
    altitudeTag: 'LAT: 00°00′ EQUATOR'
  },
  {
    id: 'ANCHOR',
    labelEn: 'ANCHOR',
    labelZh: '电梯基座',
    titleEn: 'EQUATORIAL ANCHOR',
    titleZh: '加蓬太空电梯地面锚点',
    subEn: 'ORBITAL TETHER MEGA-PLATFORM — 8 UMBILICAL LAUNCH TOWERS',
    subZh: '赤道冰架八角重装要塞 · 8 座桁架脐带塔与电磁线性导轨',
    altitudeTag: 'ALT: 45 KM STRATOSPHERE'
  },
  {
    id: 'TIANZHU',
    labelEn: 'TIANZHU',
    labelZh: '天柱空间站',
    titleEn: 'TIANZHU APEX STATION',
    titleZh: '“天柱号”同步轨道配重空间站',
    subEn: 'GEOSTATIONARY COUNTERWEIGHT ARK — ALTITUDE 35,786 KM',
    subZh: '地球同步轨道天梯终端 · 16 舱段双离心环与双折硅光翼阵列',
    altitudeTag: 'ALT: 35,786 KM GEO'
  },
  {
    id: 'HABITAT',
    labelEn: 'HABITAT',
    labelZh: '极光殖民环',
    titleEn: 'HABITAT RING AURORA',
    titleZh: '“极光号”斯坦福圆环轨道城',
    subEn: 'STANFORD-TORUS CENTRIFUGE METROPOLIS — 1.2M ORBITAL CITIZENS',
    subZh: '高轨双环旋转生态大都会 · 12 辐条交通网与零重力船坞中枢',
    altitudeTag: 'ORB: 52,400 KM HEO'
  },
  {
    id: 'DEEP_SPACE',
    labelEn: 'DEEP SPACE',
    labelZh: '深空阵列',
    titleEn: 'DEEP SPACE ARRAY',
    titleZh: '深空预警与激光中继舰队',
    subEn: 'HELIOCENTRIC 18-SEGMENT GOLD MIRROR & LASER RELAY FLEET',
    subZh: '日心轨道 5 层菱形遮阳帆 · 18 镜片镀金折反射激光中继网',
    altitudeTag: 'DIST: 1.42M KM L1'
  },
  {
    id: 'LUNA',
    labelEn: 'LUNA',
    labelZh: '月球放逐',
    titleEn: 'LUNA // EXILE PROTOCOL',
    titleZh: '月球 · 核聚变凸轮放逐工程',
    subEn: 'MARE TRANQUILLITATIS NUCLEAR CAVITATION ENGINES',
    subZh: '静海三联核聚变放逐阵列 · 地月洛希极限引力解耦推进',
    altitudeTag: 'DIST: 384,400 KM'
  }
]

export interface ProjectedReticle {
  id: NodeId
  name: string
  alt: string
  x: number
  y: number
  visible: boolean
}

export const telemetry = reactive({
  lang: 'ZH' as 'EN' | 'ZH',
  audioEnabled: true,
  hudVisible: true,
  bloomEnabled: true,
  mossOpen: false,

  thrustPercent: 95.8,
  twelveStrikeActive: false,
  heliosOverdrive: false,
  strikeCount: 0,
  elapsedSeconds: 4829104,
  jitter: 0,

  currentMode: 'CINEMATIC' as ModeId,
  currentNode: 'EARTH' as NodeId,
  storyActive: false,
  storyChapter: '',
  storyTitle: '',
  storySubtitle: '',

  reticles: [] as ProjectedReticle[]
})

export const derivedMetrics = computed(() => {
  const ratio = telemetry.thrustPercent / 100
  const overdriveBoost = telemetry.twelveStrikeActive ? 1.25 : telemetry.heliosOverdrive ? 1.15 : 1.0

  const fuelRateVal = (128.4 * ratio * overdriveBoost + telemetry.jitter * 0.35).toFixed(1)
  const fuelRate = `${fuelRateVal} MT/s`

  const coreTempVal = (4.85 * ratio * overdriveBoost + telemetry.jitter * 0.01).toFixed(3)
  const coreTemp = `${coreTempVal}e8 K`

  const activeCount = telemetry.thrustPercent < 5 ? 0 : Math.min(10000, Math.round(9985 + ratio * 15))
  const activeEngines =
    telemetry.twelveStrikeActive || telemetry.heliosOverdrive
      ? '10,000 / 10,000 [120% OVERCLOCK]'
      : `${activeCount.toLocaleString()} / 10,000`

  const velVal = (29.07 + (ratio - 0.95) * 9.4 + (overdriveBoost - 1.0) * 6.5 + telemetry.jitter * 0.01).toFixed(2)
  const earthVelocity = `${velVal} km/s`

  const solarDistance = (1.0475 + (telemetry.elapsedSeconds % 10000) * 0.00001).toFixed(4) + ' AU'

  const totalSec = telemetry.elapsedSeconds
  const days = Math.floor(totalSec / 86400)
  const hrs = String(Math.floor((totalSec % 86400) / 3600)).padStart(2, '0')
  const mins = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0')
  const secs = String(totalSec % 60).padStart(2, '0')
  const timeElapsed = `Y04 D${days} ${hrs}:${mins}:${secs}`

  const nodeMeta = ORBITAL_NODES.find((n) => n.id === telemetry.currentNode) || ORBITAL_NODES[0]

  return {
    fuelRate,
    coreTemp,
    activeEngines,
    earthVelocity,
    solarDistance,
    timeElapsed,
    nodeMeta
  }
})
