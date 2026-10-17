import { telemetry } from './PhysicsTelemetry'

export class SoundEngine {
  private ctx: AudioContext | null = null

  private ensureContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      this.ctx = new AudioCtx()
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  public playTick() {
    if (!telemetry.audioEnabled) return
    this.ensureContext()
    if (!this.ctx) return

    const now = this.ctx.currentTime
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.type = 'square'
    osc.frequency.setValueAtTime(1120, now)
    gain.gain.setValueAtTime(0.016, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.022)
    osc.connect(gain)
    gain.connect(this.ctx.destination)
    osc.start(now)
    osc.stop(now + 0.022)
  }

  public playConfirm() {
    if (!telemetry.audioEnabled) return
    this.ensureContext()
    if (!this.ctx) return

    const now = this.ctx.currentTime
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(760, now)
    osc.frequency.setValueAtTime(1220, now + 0.045)
    gain.gain.setValueAtTime(0.048, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.13)
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
    sub.type = 'sawtooth'
    sub.frequency.setValueAtTime(82 + pitchOffset * 5, now)
    sub.frequency.exponentialRampToValueAtTime(24, now + 0.9)

    gain.gain.setValueAtTime(0.16, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.95)

    sub.connect(gain)
    gain.connect(this.ctx.destination)
    sub.start(now)
    sub.stop(now + 0.95)
  }

  public playTwelveStrikeShockwave() {
    if (!telemetry.audioEnabled) return
    this.ensureContext()
    if (!this.ctx) return

    this.playIgnitionBoom(3)
    const now = this.ctx.currentTime
    const alarm = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    alarm.type = 'triangle'
    alarm.frequency.setValueAtTime(540, now)
    alarm.frequency.linearRampToValueAtTime(920, now + 0.3)
    alarm.frequency.linearRampToValueAtTime(480, now + 0.62)

    gain.gain.setValueAtTime(0.055, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.65)

    alarm.connect(gain)
    gain.connect(this.ctx.destination)
    alarm.start(now)
    alarm.stop(now + 0.65)
  }

  public speak(textEn: string, textZh: string) {
    if (!telemetry.audioEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const text = telemetry.lang === 'ZH' ? textZh : textEn
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = telemetry.lang === 'ZH' ? 'zh-CN' : 'en-US'
    utter.rate = 0.95
    utter.pitch = 0.74
    window.speechSynthesis.speak(utter)
  }
}

export const soundEngine = new SoundEngine()
