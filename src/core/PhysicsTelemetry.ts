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
  | 'IGNITION_NODE'

export type ModeId = 'CINEMATIC' | 'EXPLORE' | 'FIRST_PERSON' | 'JOURNEY'

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
    titleEn: 'EARTH',
    titleZh: '地球 · 行星方舟',
    subEn: 'HOME — EN ROUTE TO ALPHA CENTAURI',
    subZh: '人类家园 · 正在驶向 4.2 光年外的半人马座 α 星',
    altitudeTag: 'ALT: GLOBAL ORBIT'
  },
  {
    id: 'ENGINE_ARRAY',
    labelEn: 'ENGINES',
    labelZh: '推进阵列',
    titleEn: 'ENGINE ARRAY 01',
    titleZh: '一号行星发动机阵列',
    subEn: 'PLANETARY THRUST UNIT — NORTHERN CAP',
    subZh: '北半球重元素聚变推进单元 · 11 公里级等离子巨塔',
    altitudeTag: 'ALT: 11.2 KM MSL'
  },
  {
    id: 'EQUATORIAL',
    labelEn: 'STEERING',
    labelZh: '赤道转向',
    titleEn: 'EQUATORIAL STEERING ARRAY',
    titleZh: '赤道转向发动机阵列',
    subEn: 'ROTATIONAL TORQUE CONTROL',
    subZh: '行星自转制动扭矩控制阵列 · 切向等离子齐射',
    altitudeTag: 'LAT: 00°00′ EQUATOR'
  },
  {
    id: 'ANCHOR',
    labelEn: 'ELEVATOR',
    labelZh: '太空电梯',
    titleEn: 'EQUATORIAL ANCHOR',
    titleZh: '加蓬太空电梯地面锚点',
    subEn: 'SPACE ELEVATOR BASE STATION — GABON',
    subZh: '太空电梯赤道地面基座 · 电磁导轨与碳纳米管天梯索道',
    altitudeTag: 'ALT: 45 KM STRATOSPHERE'
  },
  {
    id: 'TIANZHU',
    labelEn: 'APEX',
    labelZh: '天柱空间站',
    titleEn: 'TIANZHU APEX STATION',
    titleZh: '“天柱号”同步轨道终端站',
    subEn: 'COUNTERWEIGHT TERMINAL — 35,786 KM',
    subZh: '地球同步轨道配重终端 · 海拔 35,786 公里',
    altitudeTag: 'ALT: 35,786 KM GEO'
  },
  {
    id: 'HABITAT',
    labelEn: 'HABITAT',
    labelZh: '极光殖民环',
    titleEn: 'HABITAT RING AURORA',
    titleZh: '“极光号”双环旋转殖民城',
    subEn: 'ROTATING COLONY — LEO',
    subZh: '近地轨道斯坦福双环旋转生态领航城',
    altitudeTag: 'ORB: 52,400 KM HEO'
  },
  {
    id: 'DEEP_SPACE',
    labelEn: 'DEEP SPACE',
    labelZh: '深空阵列',
    titleEn: 'DEEP SPACE ARRAY',
    titleZh: '深空太阳帆激光中继网',
    subEn: 'SOLAR SAIL RELAY NETWORK',
    subZh: '日心轨道镀金折反射镜与相控阵激光中继阵列',
    altitudeTag: 'DIST: 1.42M KM L1'
  },
  {
    id: 'LUNA',
    labelEn: 'LUNA',
    labelZh: '月球放逐',
    titleEn: 'LUNA',
    titleZh: '月球 · 放逐伴星',
    subEn: 'ABANDONED ORBITAL COMPANION',
    subZh: '静海核聚变放逐阵列 · 已解除地月引力锁定',
    altitudeTag: 'DIST: 384,400 KM'
  },
  {
    id: 'IGNITION_NODE',
    labelEn: 'IGNITION',
    labelZh: '喷口特写',
    titleEn: 'IGNITION',
    titleZh: '苍穹点火 · 主喷口矩阵',
    subEn: 'PRIMARY THRUST NOZZLE MATRIX',
    subZh: '主推进高炉仰视特写 · 等离子光柱刺穿平流层',
    altitudeTag: 'ALT: 2.4 KM SURFACE'
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

  accumulatedVelocityKmS: 29.07,
  accumulatedSolarDistAU: 1.0475,
  sunRecessionUnits: 0.0,

  currentMode: 'CINEMATIC' as ModeId,
  currentNode: 'EARTH' as NodeId,
  storyActive: false,
  storyChapter: '',
  storyTitle: '',
  storySubtitle: '',

  reticles: [] as ProjectedReticle[]
})

export function stepNewtonianPhysics(dtSeconds: number) {
  const ratio = telemetry.thrustPercent / 100
  const boost = telemetry.twelveStrikeActive ? 1.45 : telemetry.heliosOverdrive ? 1.25 : 1.0
  const netThrust = ratio * boost

  if (netThrust > 0.02) {
    telemetry.accumulatedVelocityKmS = Math.min(
      85.0,
      telemetry.accumulatedVelocityKmS + netThrust * 0.045 * dtSeconds
    )
  } else {
    telemetry.accumulatedVelocityKmS = Math.max(
      12.0,
      telemetry.accumulatedVelocityKmS - 0.015 * dtSeconds
    )
  }

  const speedFactor = (telemetry.accumulatedVelocityKmS / 29.07) * netThrust
  telemetry.accumulatedSolarDistAU += speedFactor * 0.00038 * dtSeconds
  telemetry.sunRecessionUnits = (telemetry.sunRecessionUnits + speedFactor * 9.5 * dtSeconds) % 320.0
}

export const derivedMetrics = computed(() => {
  const ratio = telemetry.thrustPercent / 100
  const overdriveBoost = telemetry.twelveStrikeActive ? 1.25 : telemetry.heliosOverdrive ? 1.15 : 1.0

  const fuelRateVal = (128.4 * ratio * overdriveBoost + (ratio > 0 ? telemetry.jitter * 0.35 : 0)).toFixed(1)
  const fuelRate = `${fuelRateVal} MT/s`

  const coreTempVal = (4.85 * ratio * overdriveBoost + (ratio > 0 ? telemetry.jitter * 0.01 : 0)).toFixed(3)
  const coreTemp = `${coreTempVal}e8 K`

  const activeCount = telemetry.thrustPercent < 2 ? 0 : Math.min(10000, Math.round(9985 + ratio * 15))
  const activeEngines =
    telemetry.twelveStrikeActive || telemetry.heliosOverdrive
      ? '10,000 / 10,000 [120% OVERCLOCK]'
      : `${activeCount.toLocaleString()} / 10,000`

  const torqueBalance = Math.min(99.99, 99.84 + telemetry.jitter * 0.02).toFixed(2) + '%'
  const velVal = (telemetry.accumulatedVelocityKmS + telemetry.jitter * 0.01).toFixed(2)
  const earthVelocity = `${velVal} km/s`
  const solarDistance = telemetry.accumulatedSolarDistAU.toFixed(4) + ' AU'

  const totalSec = telemetry.elapsedSeconds
  const days = Math.floor(totalSec / 86400)
  const hrs = String(Math.floor((totalSec % 86400) / 3600)).padStart(2, '0')
  const mins = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0')
  const secs = String(totalSec % 60).padStart(2, '0')
  const timeElapsed = `Y04 D${days} ${hrs}:${mins}:${secs}`

  const escapeProgress = Math.min(1.0, (telemetry.accumulatedSolarDistAU - 1.0475) / 0.12)
  const angle = -0.25 + escapeProgress * 1.85
  const radius = 24 + escapeProgress * 30
  const radarEarthX = 66 + Math.cos(angle) * radius
  const radarEarthY = 66 + Math.sin(angle) * radius

  const nodeMeta = ORBITAL_NODES.find((n) => n.id === telemetry.currentNode) || ORBITAL_NODES[0]

  return {
    fuelRate,
    coreTemp,
    activeEngines,
    torqueBalance,
    earthVelocity,
    solarDistance,
    timeElapsed,
    radarEarthX,
    radarEarthY,
    nodeMeta
  }
})
