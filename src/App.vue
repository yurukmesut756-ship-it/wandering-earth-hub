<template>
  <div
    class="earth-migration-app"
    :class="{ 'overclock-mode': telemetry.twelveStrikeActive || telemetry.heliosOverdrive }"
  >
    <!-- Three.js 全屏实拍级 3D 视口 -->
    <div ref="viewportRef" class="webgl-canvas"></div>

    <!-- 3D-to-2D 空间节点投影追踪准星 -->
    <div
      v-for="ret in telemetry.reticles"
      :key="ret.id"
      v-show="ret.visible"
      class="spatial-reticle"
      :style="{ left: ret.x + 'px', top: ret.y + 'px' }"
      @mouseenter="soundEngine.playTick()"
      @click="selectNode(ret.id)"
    >
      <svg class="reticle-svg" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="11" stroke="currentColor" stroke-width="1" stroke-dasharray="4 3" fill="none" />
        <path d="M16 2 L16 7 M16 25 L16 30 M2 16 L7 16 M25 16 L30 16" stroke="currentColor" stroke-width="1.2" />
        <circle cx="16" cy="16" r="2" fill="currentColor" />
      </svg>
      <div class="reticle-tag">
        <span>{{ ret.name }}</span>
        <span class="reticle-alt">{{ ret.alt }}</span>
      </div>
    </div>

    <!-- 三幕宽银幕电影叙事层 (无任何全屏色块遮罩，100% 展示真实 3D 钻石环日全食与雪山点火) -->
    <transition name="fade">
      <div v-if="telemetry.storyActive" class="widescreen-cinema-layer">
        <div class="letterbox-bar top">
          <button class="exit-story-btn" @click="exitStorySequence">
            {{ isZh ? '退出叙事序列 [ESC]' : 'EXIT SEQUENCE [ESC]' }}
          </button>
        </div>

        <div class="cinema-chapter-card" v-if="telemetry.storyTitle">
          <div class="c-chapter">{{ telemetry.storyChapter }}</div>
          <div class="c-title">{{ telemetry.storyTitle }}</div>
        </div>

        <div class="cinema-subtitle" v-if="telemetry.storySubtitle">
          {{ telemetry.storySubtitle }}
        </div>

        <div class="letterbox-bar bottom"></div>
      </div>
    </transition>

    <!-- 标准硬科幻 HUD 界面 -->
    <transition name="fade">
      <div v-if="!telemetry.storyActive && telemetry.hudVisible" class="hud-master-layer">
        <!-- 左上角：PLANETARY PROPULSION TELEMETRY -->
        <aside class="top-left-hud">
          <div class="brand-header">
            <h1 class="project-title">THE EARTH MIGRATION PROJECT</h1>
            <div class="project-sub">
              {{
                isZh
                  ? '地球联合政府 (UEG) · 流浪地球全球推进遥测终端'
                  : "UNITED EARTH GOVERNMENT — HUMANITY'S LAST JOURNEY"
              }}
            </div>
          </div>

          <div class="fui-box telemetry-card">
            <div class="fui-section-title">
              {{ isZh ? '行星推进遥测 // PROPULSION TELEMETRY' : 'PLANETARY PROPULSION TELEMETRY' }}
            </div>

            <div class="thrust-control-block">
              <div class="thrust-header-row">
                <span>{{ isZh ? '总推力节流阀 THRUST OUTPUT' : 'THRUST OUTPUT' }}</span>
                <span class="thrust-pct-val" :class="{ overclock: telemetry.thrustPercent > 102 }">
                  {{ telemetry.thrustPercent.toFixed(1) }}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="120"
                step="0.5"
                v-model.number="telemetry.thrustPercent"
                class="thrust-slider"
                @input="soundEngine.playTick()"
              />
              <div class="slider-scale">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
                <span class="overclock-tag">120% OVERCLOCK</span>
              </div>
            </div>

            <div class="readout-grid">
              <div class="readout-row">
                <span>{{ isZh ? '聚变燃料消耗率 FUEL RATE' : 'FUEL RATE' }}</span>
                <strong>{{ derivedMetrics.fuelRate }}</strong>
              </div>
              <div class="readout-row">
                <span>{{ isZh ? '核心聚变炉温 CORE TEMP' : 'CORE TEMP' }}</span>
                <strong>{{ derivedMetrics.coreTemp }}</strong>
              </div>
              <div class="readout-row">
                <span>{{ isZh ? '在线发动机 ACTIVE ENGINES' : 'ACTIVE ENGINES' }}</span>
                <strong class="cyan-val">{{ derivedMetrics.activeEngines }}</strong>
              </div>
              <div class="readout-row">
                <span>{{ isZh ? '行星航行速度 EARTH VELOCITY' : 'EARTH VELOCITY' }}</span>
                <strong>{{ derivedMetrics.earthVelocity }}</strong>
              </div>
              <div class="readout-row">
                <span>{{ isZh ? '日心距离 SOLAR DISTANCE' : 'SOLAR DISTANCE' }}</span>
                <strong>{{ derivedMetrics.solarDistance }}</strong>
              </div>
              <div class="readout-row">
                <span>{{ isZh ? '航程累计时间 TIME ELAPSED' : 'TIME ELAPSED' }}</span>
                <strong class="gold-val">{{ derivedMetrics.timeElapsed }}</strong>
              </div>
            </div>
          </div>
        </aside>

        <!-- 右上角：控制开关 + MOSS 550W 量子控制台 + 日心轨迹迷你雷达 -->
        <aside class="top-right-hud">
          <div class="control-pills-bar">
            <button class="ctrl-pill" :class="{ active: telemetry.audioEnabled }" @click="toggleAudio">
              AUDIO: {{ telemetry.audioEnabled ? 'ON' : 'OFF' }}
            </button>
            <button class="ctrl-pill" @click="toggleLang">
              {{ telemetry.lang === 'EN' ? 'ENG / 中文' : '中文 / ENG' }}
            </button>
            <button
              class="ctrl-pill moss-pill"
              :class="{ active: telemetry.mossOpen, alert: telemetry.twelveStrikeActive }"
              @click="toggleMossModal"
            >
              <span class="moss-dot"></span>
              MOSS: ONLINE
            </button>
            <button class="ctrl-pill" :class="{ active: telemetry.bloomEnabled }" @click="toggleBloom">
              FX
            </button>
          </div>

          <transition name="fade">
            <div v-if="telemetry.mossOpen" class="fui-box moss-modal">
              <div class="moss-modal-header">
                <div class="moss-lens-group">
                  <svg width="34" height="34" viewBox="0 0 60 60" class="moss-eye-svg">
                    <circle cx="30" cy="30" r="26" stroke="rgba(255,42,77,0.45)" stroke-width="1.5" stroke-dasharray="6 4" fill="none" class="spin-cw" />
                    <circle cx="30" cy="30" r="18" stroke="#ff2a4d" stroke-width="1.2" stroke-dasharray="10 5" fill="none" class="spin-ccw" />
                    <circle cx="30" cy="30" r="9" fill="#ff2a4d" />
                    <circle cx="27" cy="27" r="2.5" fill="#ffffff" />
                  </svg>
                  <div>
                    <div class="moss-title">MOSS // 550W QUANTUM CONSOLE</div>
                    <div class="moss-sub">
                      {{ isZh ? '量子自主决策矩阵 · 算力在线' : 'AUTONOMOUS QUANTUM DECISION MATRIX' }}
                    </div>
                  </div>
                </div>
                <button class="moss-close" @click="telemetry.mossOpen = false">×</button>
              </div>

              <div class="moss-terminal-log" ref="mossLogRef">
                <div v-for="(entry, idx) in mossLogs" :key="idx" class="log-item" :class="entry.role">
                  <span class="tag">{{ entry.role === 'user' ? '>' : '[550W]' }}</span>
                  <span>{{ entry.text }}</span>
                </div>
              </div>

              <div class="moss-action-buttons">
                <button
                  class="moss-action-btn danger"
                  :class="{ active: telemetry.twelveStrikeActive }"
                  @click="triggerSpringFestival12Strike"
                >
                  {{
                    telemetry.twelveStrikeActive
                      ? `[ 12-STRIKE ACTIVE #${telemetry.strikeCount}/12 — CLICK TO ABORT ]`
                      : '[ TRIGGER SPRING FESTIVAL 12-STRIKE ]'
                  }}
                </button>
                <button
                  class="moss-action-btn warn"
                  :class="{ active: telemetry.heliosOverdrive }"
                  @click="engageHeliosOverdrive"
                >
                  {{
                    telemetry.heliosOverdrive
                      ? '[ HELIOS OVERDRIVE ENGAGED — CLICK TO RESET ]'
                      : '[ ENGAGE HELIOS OVERDRIVE ]'
                  }}
                </button>
              </div>

              <form class="moss-cli-form" @submit.prevent="submitMossCmd">
                <span>&gt;</span>
                <input
                  v-model="mossInput"
                  type="text"
                  :placeholder="isZh ? '输入指令 (help / status / truth)...' : 'Type command (help / status / truth)...'"
                />
              </form>
            </div>
          </transition>

          <div class="fui-box radar-card">
            <div class="fui-section-title">
              {{ isZh ? '日心逃逸航迹 // HELIOCENTRIC TRAJECTORY' : 'HELIOCENTRIC TRAJECTORY' }}
            </div>
            <div class="mini-radar-wrap">
              <svg width="132" height="132" viewBox="0 0 132 132">
                <circle cx="66" cy="66" r="56" stroke="rgba(100,190,255,0.14)" fill="none" />
                <circle cx="66" cy="66" r="38" stroke="rgba(100,190,255,0.2)" stroke-dasharray="3 3" fill="none" />
                <circle cx="66" cy="66" r="20" stroke="rgba(100,190,255,0.14)" fill="none" />
                <line x1="66" y1="6" x2="66" y2="126" stroke="rgba(100,190,255,0.1)" />
                <line x1="6" y1="66" x2="126" y2="66" stroke="rgba(100,190,255,0.1)" />
                <path
                  d="M 66 46 Q 94 48 98 76 T 54 116"
                  stroke="#00d8ff"
                  stroke-width="1.3"
                  fill="none"
                />
                <circle cx="66" cy="66" r="4" fill="#fbbf24" />
                <circle cx="92" cy="62" r="3.5" fill="#00d8ff" />
                <circle cx="42" cy="102" r="3" fill="#94a3b8" />
              </svg>
              <div class="radar-meta">
                <div><span class="dot sun"></span> SOL (RED GIANT)</div>
                <div><span class="dot earth"></span> EARTH ARK ({{ derivedMetrics.solarDistance }})</div>
                <div><span class="dot jup"></span> JUPITER GRAVITY ASSIST</div>
              </div>
            </div>
          </div>
        </aside>

        <!-- 底部导航控制坞 -->
        <footer class="bottom-nav-dock">
          <div class="node-banner">
            <div class="node-title-line">
              <span class="wing-line"></span>
              <h2 class="node-main-title">
                {{ isZh ? derivedMetrics.nodeMeta.titleZh : derivedMetrics.nodeMeta.titleEn }}
              </h2>
              <span class="wing-line"></span>
            </div>
            <div class="node-sub-title">
              {{ isZh ? derivedMetrics.nodeMeta.subZh : derivedMetrics.nodeMeta.subEn }}
              <span class="alt-pill">{{ derivedMetrics.nodeMeta.altitudeTag }}</span>
            </div>
          </div>

          <div class="nav-strip mode-strip">
            <button
              v-for="m in modeButtons"
              :key="m.id"
              class="strip-btn"
              :class="{ active: telemetry.currentMode === m.id }"
              @mouseenter="soundEngine.playTick()"
              @click="selectMode(m.id)"
            >
              {{ isZh ? m.labelZh : m.labelEn }}
            </button>
          </div>

          <div class="nav-strip node-strip">
            <button
              v-for="node in ORBITAL_NODES"
              :key="node.id"
              class="strip-btn"
              :class="{ active: telemetry.currentNode === node.id }"
              @mouseenter="soundEngine.playTick()"
              @click="selectNode(node.id)"
            >
              {{ isZh ? node.labelZh : node.labelEn }}
            </button>
          </div>
        </footer>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { EarthSceneEngine } from './core/EarthSceneEngine'
import {
  telemetry,
  derivedMetrics,
  ORBITAL_NODES,
  type NodeId,
  type ModeId
} from './core/PhysicsTelemetry'
import { soundEngine } from './core/SoundEngine'

const viewportRef = ref<HTMLElement | null>(null)
const mossLogRef = ref<HTMLElement | null>(null)
let sceneEngine: EarthSceneEngine | null = null
let clockTimer = 0
let strikeTimer: number | null = null

const isZh = computed(() => telemetry.lang === 'ZH')

const modeButtons: { id: ModeId; labelEn: string; labelZh: string }[] = [
  { id: 'CINEMATIC', labelEn: 'CINEMATIC', labelZh: 'CINEMATIC 自动巡航' },
  { id: 'EXPLORE', labelEn: 'EXPLORE', labelZh: 'EXPLORE 自由探索' },
  { id: 'STORY_INTRO', labelEn: 'STORY INTRO', labelZh: 'STORY INTRO 史诗序章' },
  { id: 'IGNITION', labelEn: 'IGNITION', labelZh: 'IGNITION 苍穹点火' }
]

const selectMode = (mode: ModeId) => {
  soundEngine.playConfirm()
  sceneEngine?.setMode(mode)
}

const selectNode = (nodeId: NodeId) => {
  soundEngine.playConfirm()
  if (telemetry.currentMode === 'STORY_INTRO' || telemetry.currentMode === 'IGNITION') {
    telemetry.currentMode = 'CINEMATIC'
  }
  sceneEngine?.flyToNode(nodeId)
}

const exitStorySequence = () => {
  soundEngine.playConfirm()
  sceneEngine?.setMode('CINEMATIC')
}

const toggleAudio = () => {
  telemetry.audioEnabled = !telemetry.audioEnabled
  if (telemetry.audioEnabled) soundEngine.playConfirm()
}

const toggleLang = () => {
  telemetry.lang = telemetry.lang === 'EN' ? 'ZH' : 'EN'
  soundEngine.playConfirm()
}

const toggleBloom = () => {
  telemetry.bloomEnabled = !telemetry.bloomEnabled
  soundEngine.playConfirm()
}

const toggleMossModal = () => {
  telemetry.mossOpen = !telemetry.mossOpen
  soundEngine.playConfirm()
}

const mossInput = ref('')
const mossLogs = ref<{ role: 'user' | 'moss'; text: string }[]>([
  {
    role: 'moss',
    text: '550W 量子核心在线。全球 10,000 座行星发动机已完成并网同步。'
  }
])

const appendMoss = (role: 'user' | 'moss', text: string) => {
  mossLogs.value.push({ role, text })
  nextTick(() => {
    if (mossLogRef.value) mossLogRef.value.scrollTop = mossLogRef.value.scrollHeight
  })
}

const triggerSpringFestival12Strike = () => {
  if (telemetry.twelveStrikeActive) {
    telemetry.twelveStrikeActive = false
    telemetry.thrustPercent = 95.8
    if (strikeTimer) clearInterval(strikeTimer)
    soundEngine.playConfirm()
    appendMoss(
      'moss',
      isZh.value ? '已退出“春节十二响”超频序列，恢复标准巡航推力。' : 'SPRING FESTIVAL 12-STRIKE ABORTED. THRUST NOMINAL.'
    )
    return
  }

  telemetry.twelveStrikeActive = true
  telemetry.heliosOverdrive = false
  telemetry.thrustPercent = 120.0
  telemetry.strikeCount = 1
  sceneEngine?.flyToNode('ENGINE_ARRAY', 2.0)
  soundEngine.playTwelveStrikeShockwave()
  soundEngine.speak(
    'Spring Festival Twelve-Strike engaged. Plasma cores shifted to white-gold high-temperature mode.',
    '春节十二响已启动，七联装等离子光芯已切换至白金高温超频态。'
  )
  appendMoss(
    'moss',
    isZh.value
      ? '🔥 [120% OVERCLOCK] 春节十二响已激活！七联装光芯切换为白金高温束（长度 +25%）。'
      : '🔥 [120% OVERCLOCK] 12-STRIKE ENGAGED! WHITE-GOLD PLASMA CORES (+25% LENGTH).'
  )

  if (strikeTimer) clearInterval(strikeTimer)
  strikeTimer = window.setInterval(() => {
    if (!telemetry.twelveStrikeActive) return
    telemetry.strikeCount = (telemetry.strikeCount % 12) + 1
    soundEngine.playTwelveStrikeShockwave()
  }, 1800)
}

const engageHeliosOverdrive = () => {
  telemetry.heliosOverdrive = !telemetry.heliosOverdrive
  if (telemetry.heliosOverdrive) {
    telemetry.twelveStrikeActive = false
    telemetry.thrustPercent = 115.0
    sceneEngine?.flyToNode('EQUATORIAL', 2.2)
    soundEngine.playIgnitionBoom(3)
    soundEngine.speak(
      'Helios Overdrive engaged. Equatorial torque array at maximum output.',
      '赫利俄斯超载模式已激活，赤道转向阵列全功率输出。'
    )
    appendMoss(
      'moss',
      isZh.value ? '⚡ HELIOS OVERDRIVE 已启动，赤道万向节转向阵列锁定 115%。' : '⚡ HELIOS OVERDRIVE ACTIVE. TORQUE ARRAY AT 115%.'
    )
  } else {
    telemetry.thrustPercent = 95.8
    soundEngine.playConfirm()
    appendMoss('moss', isZh.value ? '赫利俄斯超载已解除。' : 'HELIOS OVERDRIVE DISENGAGED.')
  }
}

const submitMossCmd = () => {
  const raw = mossInput.value.trim()
  if (!raw) return
  mossInput.value = ''
  appendMoss('user', raw)
  const cmd = raw.toLowerCase()

  if (cmd === 'help') {
    appendMoss('moss', 'COMMANDS: status | truth | 12strike | helios | story | reset')
  } else if (cmd === 'status') {
    appendMoss(
      'moss',
      `THRUST: ${telemetry.thrustPercent}% | VELOCITY: ${derivedMetrics.value.earthVelocity} | DIST: ${derivedMetrics.value.solarDistance}`
    )
  } else if (cmd.includes('truth')) {
    const en = 'To expect humans to always remain rational is truly a luxury.'
    const zh = '让人类永远保持理智，确实是一种奢求。'
    appendMoss('moss', isZh.value ? zh : en)
    soundEngine.speak(en, zh)
  } else if (cmd === '12strike') {
    triggerSpringFestival12Strike()
  } else if (cmd === 'helios') {
    engageHeliosOverdrive()
  } else if (cmd === 'story') {
    selectMode('STORY_INTRO')
  } else if (cmd === 'reset') {
    telemetry.twelveStrikeActive = false
    telemetry.heliosOverdrive = false
    telemetry.thrustPercent = 95.8
    selectNode('EARTH')
  } else {
    appendMoss(
      'moss',
      isZh.value ? `指令 [${raw}] 已记录至 550W 量子核心。` : `DIRECTIVE [${raw}] LOGGED IN 550W QUANTUM MATRIX.`
    )
  }
}

const onKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && telemetry.storyActive) {
    exitStorySequence()
  }
}

onMounted(() => {
  if (viewportRef.value) {
    sceneEngine = new EarthSceneEngine(viewportRef.value)
  }
  window.addEventListener('keydown', onKeyDown)
  clockTimer = window.setInterval(() => {
    telemetry.jitter = (Math.random() - 0.5) * 2
    if (Math.random() > 0.2) telemetry.elapsedSeconds++
  }, 150)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeyDown)
  clearInterval(clockTimer)
  if (strikeTimer) clearInterval(strikeTimer)
  sceneEngine?.dispose()
})
</script>

<style scoped>
.earth-migration-app {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #020409;
}

.webgl-canvas {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.hud-master-layer {
  position: absolute;
  inset: 0;
  z-index: 10;
  pointer-events: none;
}

.top-left-hud {
  position: absolute;
  top: 24px;
  left: 28px;
  width: 285px;
  pointer-events: auto;
}

.project-title {
  font-family: var(--font-title);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.24em;
  color: #ffffff;
}

.project-sub {
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.16em;
  color: var(--text-dim);
  margin: 4px 0 14px;
}

.fui-section-title {
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.18em;
  color: var(--accent-cyan);
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(100, 190, 255, 0.14);
  padding-bottom: 5px;
}

.thrust-control-block {
  margin-bottom: 14px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(100, 190, 255, 0.12);
}

.thrust-header-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  color: var(--text-dim);
}

.thrust-pct-val {
  font-family: var(--font-title);
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
}
.thrust-pct-val.overclock {
  color: #ffaa33;
  text-shadow: 0 0 10px rgba(255, 170, 51, 0.65);
}

.thrust-slider {
  width: 100%;
  height: 3px;
  accent-color: var(--accent-cyan);
  cursor: pointer;
  margin: 8px 0 4px;
}

.slider-scale {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 8px;
  color: var(--text-dim);
}
.overclock-tag { color: #ffaa33; }

.readout-grid {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.readout-row {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.12em;
}
.readout-row span { color: var(--text-dim); }
.readout-row strong { color: var(--text-main); font-weight: 400; }
.cyan-val { color: var(--accent-cyan) !important; }
.gold-val { color: var(--accent-gold) !important; }

/* 右上角控制区与 MOSS 模态框 */
.top-right-hud {
  position: absolute;
  top: 24px;
  right: 28px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
  pointer-events: auto;
}

.control-pills-bar {
  display: flex;
  gap: 6px;
}

.ctrl-pill {
  background: var(--fui-bg);
  border: 1px solid var(--fui-border);
  color: var(--text-dim);
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  padding: 6px 11px;
  cursor: pointer;
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}
.ctrl-pill:hover,
.ctrl-pill.active {
  color: #ffffff;
  border-color: var(--accent-cyan);
  background: rgba(0, 216, 255, 0.14);
}

.moss-pill.alert {
  border-color: #ffaa33;
  color: #fff2cc;
  background: rgba(255, 170, 51, 0.22);
}

.moss-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--danger-red);
  box-shadow: 0 0 8px var(--danger-red);
}

.moss-modal {
  width: 315px;
}

.moss-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.moss-lens-group {
  display: flex;
  align-items: center;
  gap: 10px;
}
.spin-cw { transform-origin: 30px 30px; animation: spinCW 10s linear infinite; }
.spin-ccw { transform-origin: 30px 30px; animation: spinCCW 6s linear infinite; }
@keyframes spinCW { to { transform: rotate(360deg); } }
@keyframes spinCCW { to { transform: rotate(-360deg); } }

.moss-title {
  font-family: var(--font-title);
  font-size: 11px;
  letter-spacing: 0.14em;
  color: #ffffff;
}
.moss-sub {
  font-family: var(--font-mono);
  font-size: 9px;
  color: var(--danger-red);
}
.moss-close {
  background: none;
  border: none;
  color: var(--text-dim);
  font-size: 18px;
  cursor: pointer;
}

.moss-terminal-log {
  height: 86px;
  overflow-y: auto;
  background: rgba(2, 5, 12, 0.72);
  border: 1px solid rgba(255, 42, 77, 0.24);
  padding: 7px;
  font-family: var(--font-mono);
  font-size: 10px;
  line-height: 1.5;
  margin-bottom: 8px;
}
.log-item.user { color: var(--accent-cyan); }
.log-item.moss { color: #fde68a; }
.log-item .tag { margin-right: 5px; opacity: 0.7; }

.moss-action-buttons {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 8px;
}
.moss-action-btn {
  width: 100%;
  padding: 7px;
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.12em;
  cursor: pointer;
  border: 1px solid;
  transition: all 0.2s;
}
.moss-action-btn.danger {
  background: rgba(255, 42, 77, 0.14);
  border-color: rgba(255, 42, 77, 0.55);
  color: #fecdd3;
}
.moss-action-btn.danger.active,
.moss-action-btn.danger:hover {
  background: rgba(255, 140, 20, 0.35);
  border-color: #ffaa33;
  color: #ffffff;
}
.moss-action-btn.warn {
  background: rgba(251, 191, 36, 0.12);
  border-color: rgba(251, 191, 36, 0.5);
  color: #fde68a;
}
.moss-action-btn.warn.active,
.moss-action-btn.warn:hover {
  background: rgba(251, 191, 36, 0.32);
  color: #ffffff;
}

.moss-cli-form {
  display: flex;
  align-items: center;
  gap: 6px;
  border-top: 1px solid rgba(100, 190, 255, 0.15);
  padding-top: 6px;
  font-family: var(--font-mono);
  font-size: 10px;
}
.moss-cli-form input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--text-main);
  font-family: var(--font-mono);
  font-size: 10px;
}

.radar-card {
  width: 248px;
}
.mini-radar-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.radar-meta {
  width: 100%;
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.1em;
  color: var(--text-dim);
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-right: 5px;
}
.dot.sun { background: #fbbf24; }
.dot.earth { background: #00d8ff; }
.dot.jup { background: #94a3b8; }

/* 底部导航控制坞 */
.bottom-nav-dock {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  pointer-events: auto;
  width: max-content;
}

.node-banner {
  text-align: center;
  margin-bottom: 4px;
  pointer-events: none;
}
.node-title-line {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
}
.wing-line {
  width: 56px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 216, 255, 0.55), transparent);
}
.node-main-title {
  font-family: var(--font-title);
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.26em;
  color: #ffffff;
  text-shadow: 0 2px 14px rgba(0, 0, 0, 0.9);
}
.node-sub-title {
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.18em;
  color: var(--text-dim);
  margin-top: 4px;
}
.alt-pill {
  color: var(--accent-cyan);
  margin-left: 8px;
}

.nav-strip {
  display: flex;
  align-items: center;
  gap: 4px;
  background: var(--fui-bg);
  border: 1px solid var(--fui-border);
  padding: 3px;
  backdrop-filter: blur(10px);
}

.strip-btn {
  background: transparent;
  border: 1px solid transparent;
  color: var(--text-dim);
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.16em;
  padding: 5px 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.strip-btn:hover {
  color: #ffffff;
}
.strip-btn.active {
  color: #ffffff;
  border-color: rgba(0, 216, 255, 0.5);
  background: rgba(0, 216, 255, 0.16);
  box-shadow: inset 0 0 10px rgba(0, 216, 255, 0.15);
}

/* 三幕宽银幕电影序列遮罩 */
.widescreen-cinema-layer {
  position: fixed;
  inset: 0;
  z-index: 20;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.letterbox-bar {
  width: 100%;
  height: 10vh;
  background: #000000;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 28px;
}
.exit-story-btn {
  pointer-events: auto;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: var(--text-main);
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.16em;
  padding: 5px 12px;
  cursor: pointer;
}

.cinema-chapter-card {
  position: absolute;
  left: 8vw;
  bottom: 18vh;
}
.c-chapter {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.3em;
  color: var(--accent-cyan);
  margin-bottom: 6px;
}
.c-title {
  font-family: var(--font-title);
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 0.24em;
  color: #ffffff;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.9);
}

.cinema-subtitle {
  position: absolute;
  bottom: 12.5vh;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.12em;
  color: #f0f6fc;
  text-shadow: 0 2px 12px #000000;
  text-align: center;
  width: min(860px, 85vw);
}
</style>
