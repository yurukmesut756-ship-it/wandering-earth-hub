import { telemetry } from './PhysicsTelemetry'

export class SoundEngine {
  private ctx: AudioContext | null = null
  private lastPlayTime = 0
  public bgmPlaying = false
  private bgmTimer: number | null = null
  private masterBgmGain: GainNode | null = null
  private chordIndex = 0

  private ensureContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      this.ctx = new AudioCtx()
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  // ============================================================================
  // 应景太空史诗背景音乐合成器 (Hans Zimmer / 流浪地球风格：深空管风琴 Pad + 低音 Drone + 星空琶音)
  // ============================================================================
  public toggleBGM(): boolean {
    if (this.bgmPlaying) {
      this.stopBGM()
    } else {
      this.startBGM()
    }
    return this.bgmPlaying
  }

  public startBGM() {
    if (this.bgmPlaying) return
    this.ensureContext()
    if (!this.ctx) return

    this.bgmPlaying = true
    this.masterBgmGain = this.ctx.createGain()
    this.masterBgmGain.gain.setValueAtTime(0.01, this.ctx.currentTime)
    this.masterBgmGain.gain.linearRampToValueAtTime(0.22, this.ctx.currentTime + 2.5)
    this.masterBgmGain.connect(this.ctx.destination)

    // 史诗级小调和弦进行：Dm9 -> Bbmaj7 -> Gm7 -> A7sus4 -> A7
    const chords = [
      { bass: 36.71, notes: [146.83, 174.61, 220.0, 293.66, 329.63] }, // D minor
      { bass: 29.14, notes: [116.54, 174.61, 220.0, 261.63, 349.23] }, // Bb major
      { bass: 49.00, notes: [146.83, 196.00, 233.08, 293.66, 392.00] }, // G minor
      { bass: 55.00, notes: [138.59, 164.81, 220.0, 293.66, 329.63] }  // A7 / Asus4
    ]

    const playChordCycle = () => {
      if (!this.bgmPlaying || !this.ctx || !this.masterBgmGain || !telemetry.audioEnabled) return
      const now = this.ctx.currentTime
      const c = chords[this.chordIndex % chords.length]
      this.chordIndex++

      const duration = 6.0

      // 1. 深空引力重低音 (Sub-Bass Drone)
      const bassOsc = this.ctx.createOscillator()
      const bassFilter = this.ctx.createBiquadFilter()
      const bassGain = this.ctx.createGain()
      bassOsc.type = 'sawtooth'
      bassOsc.frequency.setValueAtTime(c.bass, now)

      bassFilter.type = 'lowpass'
      bassFilter.frequency.setValueAtTime(110, now)
      bassFilter.frequency.linearRampToValueAtTime(160, now + duration * 0.5)
      bassFilter.frequency.linearRampToValueAtTime(95, now + duration)

      bassGain.gain.setValueAtTime(0.001, now)
      bassGain.gain.linearRampToValueAtTime(0.28, now + 1.8)
      bassGain.gain.setValueAtTime(0.28, now + duration - 1.8)
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + duration + 0.5)

      bassOsc.connect(bassFilter)
      bassFilter.connect(bassGain)
      bassGain.connect(this.masterBgmGain)
      bassOsc.start(now)
      bassOsc.stop(now + duration + 0.6)

      // 2. 多声部太空管风琴与铜管弦乐长音 (Warm Brass/Organ Pad)
      c.notes.forEach((freq, idx) => {
        if (!this.ctx || !this.masterBgmGain) return
        const osc1 = this.ctx.createOscillator()
        const osc2 = this.ctx.createOscillator()
        const filter = this.ctx.createBiquadFilter()
        const gain = this.ctx.createGain()

        osc1.type = idx % 2 === 0 ? 'sawtooth' : 'triangle'
        osc2.type = 'sine'
        // 微弱失谐营造宏大交响合唱空间感
        osc1.frequency.setValueAtTime(freq * 0.997, now)
        osc2.frequency.setValueAtTime(freq * 1.003, now)

        filter.type = 'lowpass'
        const boost = telemetry.twelveStrikeActive || telemetry.heliosOverdrive ? 1.6 : 1.0
        filter.frequency.setValueAtTime(320 * boost, now)
        filter.frequency.exponentialRampToValueAtTime(950 * boost, now + duration * 0.55)
        filter.frequency.exponentialRampToValueAtTime(280 * boost, now + duration)

        gain.gain.setValueAtTime(0.001, now)
        gain.gain.linearRampToValueAtTime(0.065, now + 2.0)
        gain.gain.setValueAtTime(0.065, now + duration - 2.0)
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration + 0.8)

        osc1.connect(filter)
        osc2.connect(filter)
        filter.connect(gain)
        gain.connect(this.masterBgmGain)

        osc1.start(now)
        osc2.start(now)
        osc1.stop(now + duration + 0.9)
        osc2.stop(now + duration + 0.9)
      })

      // 3. 星际穿越风格高音水晶钟琴琶音 (Celestial Arpeggio Pulse)
      const arpSteps = 8
      const stepTime = duration / arpSteps
      for (let s = 0; s < arpSteps; s++) {
        const noteFreq = c.notes[s % c.notes.length] * 2.0
        const startT = now + s * stepTime
        const arpOsc = this.ctx.createOscillator()
        const arpGain = this.ctx.createGain()

        arpOsc.type = 'sine'
        arpOsc.frequency.setValueAtTime(noteFreq, startT)

        arpGain.gain.setValueAtTime(0.0001, startT)
        arpGain.gain.linearRampToValueAtTime(0.032, startT + 0.04)
        arpGain.gain.exponentialRampToValueAtTime(0.0001, startT + stepTime * 1.4)

        arpOsc.connect(arpGain)
        arpGain.connect(this.masterBgmGain)
        arpOsc.start(startT)
        arpOsc.stop(startT + stepTime * 1.5)
      }
    }

    playChordCycle()
    this.bgmTimer = window.setInterval(playChordCycle, 5600)
  }

  public stopBGM() {
    this.bgmPlaying = false
    if (this.bgmTimer) {
      clearInterval(this.bgmTimer)
      this.bgmTimer = null
    }
    if (this.ctx && this.masterBgmGain) {
      const now = this.ctx.currentTime
      this.masterBgmGain.gain.setValueAtTime(this.masterBgmGain.gain.value, now)
      this.masterBgmGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8)
    }
  }

  public playTick() {
    // 保持静音，杜绝悬停杂音
  }

  public playConfirm() {
    if (!telemetry.audioEnabled) return
    const nowMs = performance.now()
    if (nowMs - this.lastPlayTime < 120) return
    this.lastPlayTime = nowMs

    this.ensureContext()
    if (!this.ctx) return

    const now = this.ctx.currentTime
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(680, now)
    osc.frequency.exponentialRampToValueAtTime(1080, now + 0.08)

    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.linearRampToValueAtTime(0.035, now + 0.015)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12)

    osc.connect(gain)
    gain.connect(this.ctx.destination)
    osc.start(now)
    osc.stop(now + 0.13)
  }

  public playIgnitionBoom(pitchOffset = 0) {
    if (!telemetry.audioEnabled) return
    this.ensureContext()
    if (!this.ctx) return

    const now = this.ctx.currentTime
    const sub = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    sub.type = 'sine'
    sub.frequency.setValueAtTime(65 + pitchOffset * 4, now)
    sub.frequency.exponentialRampToValueAtTime(28, now + 0.75)

    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.linearRampToValueAtTime(0.12, now + 0.04)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8)

    sub.connect(gain)
    gain.connect(this.ctx.destination)
    sub.start(now)
    sub.stop(now + 0.82)
  }

  public playTwelveStrikeShockwave() {
    if (!telemetry.audioEnabled) return
    this.playIgnitionBoom(2)
  }

  public speak(textEn: string, textZh: string) {
    if (!telemetry.audioEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const text = telemetry.lang === 'ZH' ? textZh : textEn
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = telemetry.lang === 'ZH' ? 'zh-CN' : 'en-US'
    utter.rate = 0.95
    utter.pitch = 0.76
    window.speechSynthesis.speak(utter)
  }
}

export const soundEngine = new SoundEngine()
