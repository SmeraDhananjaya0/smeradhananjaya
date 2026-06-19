import React, { useState, useEffect, useRef } from 'react'
import {
  PanelLeft, Plus, MessagesSquare, Settings,
  Code2, Palette, Download, ChevronDown,
  X, Pen, GraduationCap, Coffee,
  Activity, ArrowUpDown, Bell, Ghost,
  Check, Info, ChevronRight, Terminal,
  Copy, Play, ThumbsUp, ThumbsDown, RotateCw
} from 'lucide-react'

// ─── SVG Primitives ──────────────────────────────────────────────────────────

function AppleLogo() {
  return (
    <svg viewBox="0 0 384 512" fill="#fff" style={{ width: 14, height: 16, display: 'block' }}>
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-162c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
    </svg>
  )
}

/** Google Gemini multicolor four-point star */
function GeminiIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <defs>
        <linearGradient id="gemini-grad" x1="2" y1="3" x2="22" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#4796E3" />
          <stop offset="0.45" stopColor="#9177C7" />
          <stop offset="0.7" stopColor="#D56F76" />
          <stop offset="1" stopColor="#F4B400" />
        </linearGradient>
      </defs>
      <path
        fill="url(#gemini-grad)"
        d="M12 1.5c.4 4.7.8 6.8 2.2 8.3 1.5 1.4 3.6 1.8 8.3 2.2-4.7.4-6.8.8-8.3 2.2-1.4 1.5-1.8 3.6-2.2 8.3-.4-4.7-.8-6.8-2.2-8.3-1.5-1.4-3.6-1.8-8.3-2.2 4.7-.4 6.8-.8 8.3-2.2 1.4-1.5 1.8-3.6 2.2-8.3z"
      />
    </svg>
  )
}

// ─── Live clock hook ──────────────────────────────────────────────────────────

function useClockTime(): string {
  const [time, setTime] = useState('')
  useEffect(() => {
    const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    const MON  = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    function tick() {
      const d = new Date()
      let h = d.getHours()
      const ampm = h >= 12 ? 'PM' : 'AM'
      h = h % 12 || 12
      const m = String(d.getMinutes()).padStart(2, '0')
      setTime(`${DAYS[d.getDay()]} ${MON[d.getMonth()]} ${d.getDate()}  ${h}:${m}\u202f${ampm}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

// ─── Mobile breakpoint hook (< 768px, matches Tailwind md) ────────────────────

function useIsMobile() {
  const [m, setM] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const fn = () => setM(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])
  return m
}

const CLAUDE_SYMBOL_PATH = "m19.6 66.5 19.7-11 .3-1-.3-.5h-1l-3.3-.2-11.2-.3L14 53l-9.5-.5-2.4-.5L0 49l.2-1.5 2-1.3 2.9.2 6.3.5 9.5.6 6.9.4L38 49.1h1.6l.2-.7-.5-.4-.4-.4L29 41l-10.6-7-5.6-4.1-3-2-1.5-2-.6-4.2 2.7-3 3.7.3.9.2 3.7 2.9 8 6.1L37 36l1.5 1.2.6-.4.1-.3-.7-1.1L33 25l-6-10.4-2.7-4.3-.7-2.6c-.3-1-.4-2-.4-3l3-4.2L28 0l4.2.6L33.8 2l2.6 6 4.1 9.3L47 29.9l2 3.8 1 3.4.3 1h.7v-.5l.5-7.2 1-8.7 1-11.2.3-3.2 1.6-3.8 3-2L61 2.6l2 2.9-.3 1.8-1.1 7.7L59 27.1l-1.5 8.2h.9l1-1.1 4.1-5.4 6.9-8.6 3-3.5L77 13l2.3-1.8h4.3l3.1 4.7-1.4 4.9-4.4 5.6-3.7 4.7-5.3 7.1-3.2 5.7.3.4h.7l12-2.6 6.4-1.1 7.6-1.3 3.5 1.6.4 1.6-1.4 3.4-8.2 2-9.6 2-14.3 3.3-.2.1.2.3 6.4.6 2.8.2h6.8l12.6 1 3.3 2 1.9 2.7-.3 2-5.1 2.6-6.8-1.6-16-3.8-5.4-1.3h-.8v.4l4.6 4.5 8.3 7.5L89 80.1l.5 2.4-1.3 2-1.4-.2-9.2-7-3.6-3-8-6.8h-.5v.7l1.8 2.7 9.8 14.7.5 4.5-.7 1.4-2.6 1-2.7-.6-5.8-8-6-9-4.7-8.2-.5.4-2.9 30.2-1.3 1.5-3 1.2-2.5-2-1.4-3 1.4-6.2 1.6-8 1.3-6.4 1.2-7.9.7-2.6v-.2H49L43 72l-9 12.3-7.2 7.6-1.7.7-3-1.5.3-2.8L24 86l10-12.8 6-7.9 4-4.6-.1-.5h-.3L17.2 77.4l-4.7.6-2-2 .2-3 1-1 8-5.5Z"

function ClaudeAsterisk({ size = 40, color = '#c96442' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <path d={CLAUDE_SYMBOL_PATH} fill={color} />
    </svg>
  )
}

/** Tiny inline asterisk for sidebar logo / tab favicons */
function MiniAsterisk({ size = 10, color = '#c96442' }: { size?: number; color?: string }) {
  return <ClaudeAsterisk size={size} color={color} />
}

/** Projects sidebar icon — trapezoid tray (wider top, narrower bottom) */
/** Small colored square favicon */
function Favicon({ bg, text, textColor = '#fff', size = 14 }: { bg: string; text: string; textColor?: string; size?: number }) {
  return (
    <span style={{ width: size, height: size, background: bg, borderRadius: 2, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.55, color: textColor, fontWeight: 700, flexShrink: 0 }}>
      {text}
    </span>
  )
}

// ─── Now Playing widget ───────────────────────────────────────────────────────

const NP_TRACK = {
  title: 'Three Little Birds',
  artist: 'Bob Marley & The Wailers',
  album: 'Legend - The Best of Bob Marley & The Wailers',
  cover: '/legend-bob-marley.jpeg',
  duration: 180,
}

function fmtTime(s: number) {
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

function NowPlaying({ open, playing, elapsed, duration, onToggle, onSeek }: {
  open: boolean
  playing: boolean
  elapsed: number
  duration: number
  onToggle: () => void
  onSeek: (frac: number) => void
}) {
  const barRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  if (!open) return null
  const pct = duration > 0 ? Math.min(100, (elapsed / duration) * 100) : 0
  // On mobile the menu-bar button sits near the right edge, so anchor the card
  // to the viewport (fixed, full-width minus margins) instead of the button.
  const posStyle: React.CSSProperties = isMobile
    ? { position: 'fixed', top: 39, left: 12, right: 12, width: 'auto', zIndex: 80 }
    : { position: 'absolute', top: 'calc(100% + 9px)', left: 0, width: 320, zIndex: 80 }
  const seek = (e: React.MouseEvent) => {
    const el = barRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    onSeek(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)))
  }
  const ctrlBtn: React.CSSProperties = {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    border: 'none', background: 'transparent', color: 'rgba(225,225,228,0.92)', cursor: 'pointer', padding: 0,
  }
  return (
    <div
      style={{
        ...posStyle,
        borderRadius: 16, padding: 13,
        display: 'flex', alignItems: 'center', gap: 12,
        background: 'rgba(28,28,30,0.9)',
        backdropFilter: 'blur(40px) saturate(1.8)',
        WebkitBackdropFilter: 'blur(40px) saturate(1.8)',
        border: '0.5px solid rgba(255,255,255,0.12)',
        boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
        color: '#fff', cursor: 'default',
      }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {/* Album art */}
      <img
        src={NP_TRACK.cover}
        alt={NP_TRACK.album}
        draggable={false}
        style={{ width: 62, height: 62, borderRadius: 9, objectFit: 'cover', flexShrink: 0, boxShadow: '0 6px 16px rgba(0,0,0,0.45)' }}
      />
      {/* Info + controls */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 13.5, fontWeight: 700, letterSpacing: '.1px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {NP_TRACK.title}
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: 1 }}>
            {NP_TRACK.artist}
          </div>
        </div>
        {/* Progress */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <div
            ref={barRef}
            onClick={seek}
            style={{ position: 'relative', height: 3.5, borderRadius: 4, background: 'rgba(255,255,255,0.2)', cursor: 'pointer' }}
          >
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${pct}%`, borderRadius: 4, background: '#fff' }} />
            <div style={{ position: 'absolute', left: `${pct}%`, top: '50%', width: 9, height: 9, borderRadius: '50%', background: '#fff', transform: 'translate(-50%,-50%)', boxShadow: '0 1px 4px rgba(0,0,0,0.4)' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9.5, color: 'rgba(255,255,255,0.5)', fontVariantNumeric: 'tabular-nums' }}>
            <span>{fmtTime(elapsed)}</span>
            <span>{fmtTime(duration)}</span>
          </div>
        </div>
        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 26, marginTop: 1 }}>
          <button style={ctrlBtn} aria-label="Rewind">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11 6v12l-8.5-6zM21 6v12l-8.5-6z"/></svg>
          </button>
          <button style={ctrlBtn} onClick={onToggle} aria-label={playing ? 'Pause' : 'Play'}>
            {playing
              ? <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
              : <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5l11 7-11 7z"/></svg>}
          </button>
          <button style={ctrlBtn} aria-label="Fast forward">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 6v12l8.5-6zM13 6v12l8.5-6z"/></svg>
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── macOS Menu Bar ───────────────────────────────────────────────────────────

const IC: React.CSSProperties = { display:'flex', alignItems:'center', justifyContent:'center', color:'#fff' }

function MacMenuBar() {
  const clock = useClockTime()
  const isMobile = useIsMobile()
  const audioRef = useRef<HTMLAudioElement>(null)
  const [npOpen, setNpOpen] = useState(false)
  const [npPlaying, setNpPlaying] = useState(false)
  const [npElapsed, setNpElapsed] = useState(0)
  const [npDuration, setNpDuration] = useState(NP_TRACK.duration)
  const togglePlay = () => {
    const a = audioRef.current
    if (!a) return
    if (a.paused) { a.play(); setNpPlaying(true) }
    else { a.pause(); setNpPlaying(false) }
  }
  const openWidget = () => {
    setNpOpen((o) => {
      const next = !o
      const a = audioRef.current
      if (next && a && a.paused) { a.play(); setNpPlaying(true) }
      return next
    })
  }
  const seekTo = (frac: number) => {
    const a = audioRef.current
    const dur = a?.duration || npDuration
    const t = frac * dur
    if (a) a.currentTime = t
    setNpElapsed(t)
  }
  return (
    <div style={{
      flexShrink: 0, height: 30, zIndex: 50, overflow: 'visible',
      display: 'flex', alignItems: 'center', padding: isMobile ? '0 8px' : '0 12px 0 16px', color: '#fff',
      background: 'rgba(0,0,0,0.28)',
      backdropFilter: 'blur(28px) saturate(1.6)',
      WebkitBackdropFilter: 'blur(28px) saturate(1.6)',
      borderBottom: '0.5px solid rgba(255,255,255,0.08)',
      userSelect: 'none',
    }}>
      {/* Left */}
      <div style={{ display:'flex', alignItems:'center', gap:16 }}>
        <AppleLogo />
        <span style={{ fontWeight:700, fontSize:14, letterSpacing:'.1px' }}>Chrome</span>
      </div>
      {/* Right */}
      <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap: isMobile ? 10 : 15 }}>
        {/* Media play */}
        <span style={{ ...IC, position: 'relative' }}>
          <button
            onClick={openWidget}
            aria-label="Now Playing"
            style={{ ...IC, border: 'none', background: 'transparent', padding: 0, cursor: 'pointer' }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.7">
              <circle cx="12" cy="12" r="9"/>
              <path d="M10 8.5l6 3.5-6 3.5z" fill="#fff" stroke="none"/>
            </svg>
          </button>
          <audio
            ref={audioRef}
            src="/three-little-birds.mp3"
            preload="metadata"
            onLoadedMetadata={(e) => setNpDuration(e.currentTarget.duration)}
            onTimeUpdate={(e) => setNpElapsed(e.currentTarget.currentTime)}
            onPlay={() => setNpPlaying(true)}
            onPause={() => setNpPlaying(false)}
            onEnded={() => setNpPlaying(false)}
          />
          <NowPlaying
            open={npOpen}
            playing={npPlaying}
            elapsed={npElapsed}
            duration={npDuration}
            onToggle={togglePlay}
            onSeek={seekTo}
          />
        </span>
        {!isMobile && (
          <>
            {/* A box (input source) */}
            <span style={{ width:21, height:18, borderRadius:5, background:'#f2f2f2', color:'#1d1d1f',
              display:'flex', alignItems:'center', justifyContent:'center', fontWeight:600, fontSize:12 }}>
              A
            </span>
            {/* Do Not Disturb moon */}
            <span style={IC}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>
              </svg>
            </span>
            {/* Battery charging */}
            <span style={IC}>
              <svg width="27" height="16" viewBox="0 0 34 18" fill="none">
                <rect x="1" y="3" width="27" height="12" rx="3.2" stroke="#fff" strokeWidth="1.4" opacity=".55"/>
                <rect x="3" y="5" width="14" height="8" rx="1.5" fill="#fff"/>
                <path d="M19 4.5l-3.5 4.8h2.6L17 13.5l4.2-5.4h-2.7z" fill="#fff"/>
                <rect x="30" y="6.5" width="2.2" height="5" rx="1.1" fill="#fff" opacity=".55"/>
              </svg>
            </span>
            {/* Wi-Fi */}
            <span style={IC}>
              <svg width="19" height="15" viewBox="0 0 24 18" fill="#fff">
                <path d="M12 4.2c3.7 0 7.1 1.5 9.6 3.9.5.5.5 1.2.1 1.7-.5.5-1.2.5-1.7.1A11.1 11.1 0 0 0 12 6.6 11.1 11.1 0 0 0 4 9.9c-.5.4-1.3.4-1.7-.1-.4-.5-.4-1.2.1-1.7C4.9 5.7 8.3 4.2 12 4.2z"/>
                <path d="M12 9c2.1 0 4.1.8 5.6 2.3.5.5.5 1.2 0 1.7s-1.2.5-1.7 0A5.6 5.6 0 0 0 12 11.4a5.6 5.6 0 0 0-3.9 1.6c-.5.5-1.2.5-1.7 0s-.5-1.2 0-1.7A8 8 0 0 1 12 9z"/>
                <circle cx="12" cy="15" r="1.7"/>
              </svg>
            </span>
            {/* Spotlight search */}
            <span style={IC}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round">
                <circle cx="10.5" cy="10.5" r="6.5"/>
                <path d="M15.5 15.5L21 21"/>
              </svg>
            </span>
            {/* Control Centre — two pill sliders */}
            <span style={IC}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <rect x="4" y="4.5"  width="16" height="6.2" rx="3.1" stroke="#fff" strokeWidth="1.4"/>
                <circle cx="16.5" cy="7.6"  r="1.7" fill="#fff"/>
                <rect x="4" y="13.3" width="16" height="6.2" rx="3.1" stroke="#fff" strokeWidth="1.4"/>
                <circle cx="7.5"  cy="16.4" r="1.7" fill="#fff"/>
              </svg>
            </span>
          </>
        )}
        {/* Live clock */}
        <span style={{ fontSize:13.5, letterSpacing:'.2px', whiteSpace:'nowrap' }}>{clock}</span>
      </div>
    </div>
  )
}

// ─── Chrome Tab Strip ────────────────────────────────────────────────────────

function ChromeTabStrip({ onClose, onMinimize, onMaximize, onDragStart }: { onClose: () => void; onMinimize: () => void; onMaximize: () => void; onDragStart?: (e: React.MouseEvent) => void }) {
  const isMobile = useIsMobile()
  const dot = (bg: string): React.CSSProperties => ({ width:12, height:12, borderRadius:'50%', background:bg, display:'block', border:'none', padding:0, cursor:'pointer' })
  return (
    <div onMouseDown={onDragStart} style={{ background:'#1d1d1f', height:42, display:'flex', alignItems:'flex-end', padding: isMobile ? '0 4px' : '0 8px', flexShrink:0, userSelect:'none', cursor: onDragStart ? 'grab' : undefined }}>
      {/* Traffic lights */}
      <div style={{ display:'flex', alignItems:'center', gap:8, padding:'0 16px 0 6px', height:42 }}>
        <button onClick={onClose} aria-label="Close" style={dot('#ff5f57')}/>
        <button onClick={onMinimize} aria-label="Minimize" style={dot('#febc2e')}/>
        <button onClick={onMaximize} aria-label="Maximize" style={dot('#28c840')}/>
      </div>

      {/* Single active tab */}
      <div style={{ display:'flex', alignItems:'flex-end', height:42 }}>
        <div className="chrome-tab-v2">
          {/* 12-spoke Claude asterisk favicon */}
          <span style={{ width:16, height:16, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="15" height="15" viewBox="0 0 100 100">
              <path d={CLAUDE_SYMBOL_PATH} fill="#d97757" />
            </svg>
          </span>
          <span style={{ flex:1, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>Claude</span>
          <span style={{ width:18, height:18, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', color:'#b8bcc2', cursor:'pointer' }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M5 5l14 14M19 5L5 19"/>
            </svg>
          </span>
        </div>
      </div>

      {/* New tab */}
      {!isMobile && (
        <div style={{ display:'flex', alignItems:'center', marginBottom:7, marginLeft:8, flexShrink:0 }}>
          <button style={{ width:28, height:28, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', color:'#b8bcc2', background:'transparent', border:'none', cursor:'pointer' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
          </button>
        </div>
      )}

      {/* Ask Gemini — far right */}
      {!isMobile && (
        <div style={{ display:'flex', alignItems:'center', marginBottom:7, marginLeft:'auto', flexShrink:0 }}>
          <button style={{ display:'flex', alignItems:'center', gap:7, background:'#3a3a3c', border:'none', padding:'7px 14px', borderRadius:12, fontSize:13.5, fontWeight:500, color:'#fff', cursor:'pointer' }}>
            <GeminiIcon size={16} /> Ask Gemini
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Chrome Toolbar ──────────────────────────────────────────────────────────

const TB_BTN: React.CSSProperties = { width:34, height:34, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', color:'#e8eaed', flexShrink:0, background:'transparent', border:'none', cursor:'pointer' }
const SEP: React.CSSProperties   = { width:1, height:22, background:'rgba(255,255,255,.16)', margin:'0 6px', flexShrink:0 }

function ChromeToolbar({ onMenu }: { onMenu?: () => void }) {
  const isMobile = useIsMobile()
  return (
    <div style={{ background:'#393a3f', height:46, display:'flex', alignItems:'center', gap:4, padding: isMobile ? '0 6px' : '0 10px', flexShrink:0, userSelect:'none' }}>
      {/* Hamburger (mobile only) — opens the sidebar drawer */}
      {isMobile && (
        <button onClick={onMenu} aria-label="Open menu" style={TB_BTN}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c5c8cd" strokeWidth="1.8" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
        </button>
      )}

      {!isMobile && (
        <>
          {/* Back */}
          <button style={TB_BTN}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c5c8cd" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>
          </button>
          {/* Forward (dimmed) */}
          <button style={{ ...TB_BTN, opacity:.38 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c5c8cd" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </button>
          {/* Reload */}
          <button style={TB_BTN}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#c5c8cd" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-2.6-6.4M21 3v5h-5"/></svg>
          </button>
        </>
      )}

      {/* Omnibox */}
      <div style={{ flex:1, minWidth:0, height:34, margin:'0 10px', background:'#171719', borderRadius:18, display:'flex', alignItems:'center', gap: isMobile ? 7 : 11, padding: isMobile ? '0 12px' : '0 16px', color:'#b8bcc2', fontSize:13.5, overflow:'hidden' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" style={{ flexShrink:0 }}>
          <path d="M3 7h10M17 7h4"/><circle cx="15" cy="7" r="2.2"/>
          <path d="M3 17h4M11 17h10"/><circle cx="9" cy="17" r="2.2"/>
        </svg>
        <span style={{ whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}><span style={{ color:'#e8eaed' }}>claude.ai</span>/chat/78a22cc0-798a-4c76-9347-af8d8a5d902c</span>
      </div>

      {!isMobile && (
        <>
          {/* Extensions (puzzle piece) */}
          <button style={TB_BTN}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c5c8cd" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
              <path d="M6 6 L9.5 6 A2.5 2.5 0 0 1 14.5 6 L18 6 Q20 6 20 8 L20 9.5 A2.5 2.5 0 0 1 20 14.5 L20 18 Q20 20 18 20 L6 20 Q4 20 4 18 L4 14.5 A2.5 2.5 0 0 0 4 9.5 L4 8 Q4 6 6 6 Z"/>
            </svg>
          </button>
          <div style={SEP}/>
        </>
      )}
      {/* Avatar */}
      <div style={{ width:27, height:27, borderRadius:'50%', background:'#6e40c9', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, margin:'0 4px', flexShrink:0 }}>S</div>
      {/* New Chrome available + menu (combined pill) */}
      {!isMobile && (
        <button style={{ display:'flex', alignItems:'center', gap:10, background:'#2f5c8f', color:'#fff', fontSize:13, padding:'8px 14px', borderRadius:20, whiteSpace:'nowrap', border:'none', cursor:'pointer' }}>
          New Chrome available
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5"  r="1.7"/>
            <circle cx="12" cy="12" r="1.7"/>
            <circle cx="12" cy="19" r="1.7"/>
          </svg>
        </button>
      )}
    </div>
  )
}

// ─── Bookmarks Bar ───────────────────────────────────────────────────────────

function GenxlIcon({ size = 16 }: { size?: number }) {
  return (
    <img src="/genxl_logo.png" alt="Genxl" width={size} height={size} style={{ flexShrink:0, objectFit:'contain', display:'block' }} />
  )
}

const BMS: { bg: string; letter: string; label: string; textColor?: string; icon?: React.ReactNode; href?: string }[] = [
  { bg:'#7c4dff', letter:'G', label:'Genxl', icon:<GenxlIcon />, href:'https://www.gnxl.org/' },
  { bg:'#34c759', letter:'N', label:'Northeastern', icon:<img src="/northeastern_logo.png" alt="Northeastern" width={16} height={16} style={{ flexShrink:0, objectFit:'contain', display:'block' }} />, href:'https://www.northeastern.edu/' },
  { bg:'#444',    letter:'\u2325', label:'GitHub', href:'https://github.com/SmeraDhananjaya0', icon:(
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff" style={{ flexShrink:0, display:'block' }}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  ) },
  { bg:'#0a84ff', letter:'C', label:'Citrini', href:'https://www.citrini.com/', icon:(
    <span style={{ width:16, height:16, borderRadius:4, background:'#fff', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <img src="/citrini_logo.png" alt="Citrini" width={12} height={12} style={{ objectFit:'contain', display:'block' }} />
    </span>
  ) },
  { bg:'#d97757', letter:'\u2731', label:'Research \\ Anthropic', href:'https://www.anthropic.com/research', icon:(
    <span style={{ width:16, height:16, borderRadius:4, background:'#fff', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <img src="/anthropic_logo.png" alt="Anthropic" width={12} height={12} style={{ objectFit:'contain', display:'block' }} />
    </span>
  ) },
  { bg:'#10a37f', letter:'O', label:'OpenAI Research', href:'https://openai.com/research/', icon:(
    <span style={{ width:16, height:16, borderRadius:4, background:'#fff', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <img src="/openai_logo.png" alt="OpenAI" width={13} height={13} style={{ objectFit:'contain', display:'block' }} />
    </span>
  ) },
]

const BM_STYLE: React.CSSProperties = { display:'flex', alignItems:'center', gap:7, padding:'5px 9px', borderRadius:7, fontSize:12.5, color:'#b8bcc2', whiteSpace:'nowrap', background:'transparent', border:'none', cursor:'pointer' }

function BookmarksBar() {
  return (
    <div style={{ background:'#1d1d1f', height:36, display:'flex', alignItems:'center', gap:2, padding:'0 8px', overflow:'hidden', flexShrink:0, userSelect:'none' }}>
      {/* Grid icon */}
      <button style={{ ...BM_STYLE, padding:'5px 6px' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3"  y="3"  width="7" height="7" rx="1"/>
          <rect x="14" y="3"  width="7" height="7" rx="1"/>
          <rect x="3"  y="14" width="7" height="7" rx="1"/>
          <rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
      </button>
      {/* Separator */}
      <div style={SEP}/>
      {BMS.map(({ bg, letter, label, textColor, icon, href }) => {
        const mark = icon ?? (
          <span style={{ width:16, height:16, borderRadius:4, background:bg, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:700, color: textColor ?? '#fff' }}>
            {letter}
          </span>
        )
        return href ? (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ ...BM_STYLE, textDecoration:'none' }}>
            {mark}
            {label}
          </a>
        ) : (
          <button key={label} style={BM_STYLE}>
            {mark}
            {label}
          </button>
        )
      })}
    </div>
  )
}

// ─── Claude Sidebar ───────────────────────────────────────────────────────────

const RECENTS = [
  'Fav Things',
  'Principles I live by',
  'Marathon Training Plan',
  'Book Recommendations',
  'Restaurant Recommendations',
]

function ClaudeSidebar({ onNavigate, isMobile = false, open = false, onClose }: { onNavigate: (view: string) => void; isMobile?: boolean; open?: boolean; onClose?: () => void }) {
  const [activeItem, setActiveItem] = useState('New chat')
  const [activeRecent, setActiveRecent] = useState(0)

  const navItems = [
    { icon: <Plus size={14} />,            label: 'New chat',  view: 'home' },
    { icon: <MessagesSquare size={14} />,  label: 'Chats',     view: 'chats' },
  ]

  const close = () => { if (isMobile) onClose?.() }

  const asideClass = isMobile
    ? `fixed left-0 top-0 bottom-0 z-[61] w-[270px] max-w-[82vw] flex flex-col bg-[#1c1c1c] overflow-hidden border-r border-[#2a2a2a] transition-transform duration-200 ${open ? 'translate-x-0' : '-translate-x-full'}`
    : 'flex flex-col w-[248px] min-w-[248px] bg-[#1c1c1c] h-full overflow-hidden border-r border-[#2a2a2a]'

  return (
    <>
    {isMobile && open && (
      <div className="fixed inset-0 z-[60] bg-black/50" onClick={onClose} />
    )}
    <aside className={asideClass}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <span className="font-lora text-[17px] font-medium text-[#e8e0d4] tracking-[-0.3px]">Claude</span>
      </div>

      {/* Nav */}
      <nav className="px-2 mb-2">
        {navItems.map(({ icon, label, view }) => (
          <button
            key={label}
            onClick={() => { setActiveItem(label); if (view) onNavigate(view); close() }}
            className={`flex items-center gap-2.5 w-full px-3 py-1.5 rounded-md text-[13px] text-left transition-colors mb-0.5
              ${activeItem === label ? 'bg-[#2e2e2e] text-[#e0e0e0]' : 'text-[#888] hover:bg-[#242424] hover:text-[#ccc]'}`}
          >
            <span className="opacity-70">{icon}</span>
            {label}
          </button>
        ))}
      </nav>

      {/* Products section */}
      <div className="px-2 mb-3">
        <p className="px-3 py-1 text-[10px] font-semibold text-[#555] uppercase tracking-widest">Products</p>
        <button
          onClick={() => { setActiveItem('Code'); onNavigate('code'); close() }}
          className={`flex items-center gap-2.5 w-full px-3 py-1.5 rounded-md text-[13px] transition-colors mb-0.5
            ${activeItem === 'Code' ? 'bg-[#2e2e2e] text-[#e0e0e0]' : 'text-[#888] hover:bg-[#242424] hover:text-[#ccc]'}`}
        >
          <Code2 size={14} className="opacity-70" />
          Code
        </button>
      </div>

      {/* Starred */}
      <div className="px-2 mb-3">
        <p className="px-3 py-1 text-[10px] font-semibold text-[#555] uppercase tracking-widest">Starred</p>
        <button
          onClick={() => { setActiveItem('Who am I?'); onNavigate('whoami'); close() }}
          className={`flex items-center gap-2 w-full px-3 py-1.5 rounded-md text-[12px] transition-colors truncate
            ${activeItem === 'Who am I?' ? 'bg-[#2e2e2e] text-[#ddd]' : 'text-[#888] hover:bg-[#242424] hover:text-[#ccc]'}`}
        >
          <span className="truncate">Who am I?</span>
        </button>
      </div>

      {/* Recents */}
      <div className="px-2 flex flex-col flex-1 min-h-0">
        <div className="flex items-center justify-between px-3 py-1 mb-0.5">
          <p className="text-[10px] font-semibold text-[#555] uppercase tracking-widest">Recents</p>
        </div>
        <div className="recents-scroll flex-1 min-h-0">
          {RECENTS.map((chat, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveRecent(i)
                if (chat === 'Fav Things') onNavigate('favthings')
                else if (chat === 'Principles I live by') onNavigate('principles')
                else if (chat === 'Marathon Training Plan') onNavigate('marathon')
                else if (chat === 'Book Recommendations') onNavigate('books')
                else if (chat === 'Restaurant Recommendations') onNavigate('restaurants')
                close()
              }}
              className={`flex w-full px-3 py-1.5 rounded-md text-[12px] text-left truncate transition-colors mb-0.5
                ${activeRecent === i ? 'bg-[#2e2e2e] text-[#ddd]' : 'text-[#777] hover:bg-[#242424] hover:text-[#bbb]'}`}
            >
              <span className="truncate">{chat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* User card */}
      <div className="flex items-center gap-2.5 px-3 py-3 border-t border-[#2a2a2a] mt-1 flex-shrink-0">
        <div className="w-7 h-7 rounded-full bg-[#c8c5b8] flex items-center justify-center text-[#1d1d1f] text-[11px] font-bold flex-shrink-0">S</div>
        <div className="flex flex-col flex-1 min-w-0">
          <span className="text-[12px] text-[#ccc] font-medium leading-tight">smera</span>
          <span className="text-[10px] text-[#666]">Max plan</span>
        </div>
      </div>
    </aside>
    </>
  )
}

// ─── Claude Main Area – Home ──────────────────────────────────────────────────

// ─── Model Selector Dropdown ──────────────────────────────────────────────────

const MODELS = [
  { name: 'Nasty 19',  sub: 'For complex tasks' },
  { name: 'M4 18',     sub: 'Most efficient for everyday tasks' },
  { name: 'Mark l 17', sub: 'Training Wheels Protocol' },
]

function ModelSelector() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState('Nasty 19')

  return (
    <div className="relative">
      {/* Trigger pill: model name + effort + chevron */}
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1a1a18] hover:bg-[#242421] border border-[#34342f] transition-colors"
      >
        <span className="text-[14px] font-medium text-[#f5f5f3]">{selected}</span>
        <span className="text-[14px] text-[#8a8a85]">High</span>
        <ChevronDown size={15} className="text-[#8a8a85]" />
      </button>

      {open && (
        <>
          {/* click-away overlay */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          {/* panel — compact, opens upward, right-aligned to the pill; size/height adapt so it never gets cut off */}
          <div className="absolute bottom-full right-0 mb-2 w-[420px] max-w-[calc(100vw-24px)] max-h-[calc(100vh-110px)] overflow-y-auto z-50 p-1 rounded-xl bg-[#2b2a28] border border-[#3a3a38] shadow-[0_20px_50px_rgba(0,0,0,0.55)]">
            {/* Disabled / unavailable */}
            <div className="px-3 py-1.5 rounded-[10px] cursor-default">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <span className="text-[13.5px] font-[450] leading-[1.25] text-[#67675f]">Myth atp 20</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#33332f] text-[11.5px] text-[#8a8a85] whitespace-nowrap">
                  <Info size={11} />
                  Currently unavailable until Sept 30th 2026
                </span>
              </div>
              <div className="text-[12px] leading-[1.25] text-[#67675f] mt-px">For your toughest challenges</div>
            </div>

            {/* Selectable models */}
            {MODELS.map(({ name, sub }) => (
              <button
                key={name}
                onClick={() => { setSelected(name); setOpen(false) }}
                className="flex items-center w-full text-left px-3 py-1.5 rounded-[10px] hover:bg-[#34332f] transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-[13.5px] font-[450] leading-[1.25] text-[#f2f2ef]">{name}</div>
                  <div className="text-[12px] leading-[1.25] text-[#8a8a85] mt-px">{sub}</div>
                </div>
                {selected === name && (
                  <Check size={15} strokeWidth={2.5} className="text-[#4a9eff] flex-shrink-0 ml-2.5" />
                )}
              </button>
            ))}

            <div className="h-px bg-[#3a3a38] my-0.5" />

            {/* Effort */}
            <button className="flex items-center w-full px-3 py-1.5 rounded-[10px] hover:bg-[#34332f] transition-colors">
              <span className="text-[13.5px] font-[450] text-[#f2f2ef]">Effort</span>
              <span className="ml-auto flex items-center gap-1.5 text-[#8a8a85] text-[13px]">
                High
                <ChevronRight size={14} />
              </span>
            </button>

            <div className="h-px bg-[#3a3a38] my-0.5" />

            {/* More models */}
            <button className="flex items-center w-full px-3 py-1.5 rounded-[10px] hover:bg-[#34332f] transition-colors">
              <span className="text-[13.5px] font-[450] text-[#f2f2ef]">More models</span>
              <ChevronRight size={14} className="ml-auto text-[#8a8a85]" />
            </button>
          </div>
        </>
      )}
    </div>
  )
}

function ClaudeHomeView() {
  const [input, setInput] = useState('')
  const isMobile = useIsMobile()

  const suggestions = [
    { icon: <Pen size={16} />,             label: 'Write' },
    { icon: <GraduationCap size={16} />,   label: 'Learn' },
    { icon: <Code2 size={16} />,           label: 'Code' },
    { icon: <Coffee size={16} />,          label: 'Life stuff' },
    { icon: <GmailIcon />,                 label: 'From Gmail' },
  ]

  return (
    <main className="flex-1 flex flex-col h-full bg-[#1a1a1a] overflow-hidden">
      {/* Hero – centered vertically in remaining space */}
      <div className="flex flex-col items-center justify-center flex-1 px-4 md:px-6 pb-8">
        {/* Asterisk + "smera returns!" */}
        <div className="flex items-center gap-3 mb-6 md:gap-4 md:mb-10">
          <ClaudeAsterisk size={isMobile ? 38 : 54} color="#c96442" />
          <h1 className="font-lora text-[28px] md:text-[42px] font-medium tracking-[-1px] text-[#e8d5c4] leading-none">
            smera returns!
          </h1>
        </div>

        {/* Input card */}
        <div className="w-full max-w-2xl rounded-2xl bg-[#252525] border border-[#333] shadow-xl">
          {/* Unavailability banner */}
          <div className="px-4 py-2.5 border-b border-[#333] bg-[#222] rounded-t-2xl">
            <span className="text-[12px] text-[#888]">Myth atp 20 is currently unavailable until Sept 30th 2026.</span>
          </div>

          {/* Input */}
          <div className="relative px-4 pt-4 pb-2">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Stalk me to get to know me"
              className="w-full bg-transparent border-none outline-none resize-none text-[15px] text-[#ccc] placeholder-[#555] min-h-[52px] max-h-36 leading-relaxed"
              rows={2}
            />
          </div>

          {/* Bottom toolbar */}
          <div className="flex items-center justify-end px-3 pb-3 pt-1">
            <ModelSelector />
          </div>
        </div>

        {/* Suggestion pills */}
        <div className="flex items-center gap-2 mt-4 flex-wrap justify-center">
          {suggestions.map(({ icon, label }) => (
            <button
              key={label}
              onClick={label === 'From Gmail' ? () => { window.location.href = 'mailto:smerad06@gmail.com' } : undefined}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#252525] hover:bg-[#2e2e2e] border border-[#333] text-white text-[13px] transition-colors"
            >
              <span className="text-[#888]">{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </div>
    </main>
  )
}

// ─── Claude Code Setup View ───────────────────────────────────────────────────

function CursorIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path fill="#6b6b6b" d="M12 2 3 7v10l9 5z"/>
      <path fill="#9a9a9a" d="M12 2 21 7v10l-9 5z"/>
      <path fill="#cfcfcf" d="M3 7l9 5 9-5-9 5z"/>
      <path fill="#e8e8e8" d="M12 12 21 7v10z" opacity="0.5"/>
    </svg>
  )
}

function SupabaseIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path fill="#3ECF8E" d="M13.2 2.3c.5-.6 1.5-.3 1.5.5v8h5.4c1 0 1.5 1.1.9 1.9l-8.2 9.9c-.5.6-1.5.3-1.5-.5v-8H5.9c-1 0-1.5-1.1-.9-1.9z"/>
    </svg>
  )
}

function PaperIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M39 24H24V6H6V24H24V39H0V6H6V0H39V24Z" fill="#81ACEC"/>
    </svg>
  )
}

/* Light code-editor screenshot mockup that bleeds off the card's right edge */
function ContributionGraph() {
  const WEEKS = 53
  const DAYS = 7
  const months = ['Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun']
  const levelColors = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']

  // Sparse contribution data matching reference — [week, day, level]
  // day: 0=Sun 1=Mon 2=Tue 3=Wed 4=Thu 5=Fri 6=Sat
  const greens: [number, number, number][] = [
    // Jun (start)
    [1, 3, 3],
    // Aug cluster
    [8, 5, 4], [8, 6, 2],
    [9, 0, 2], [9, 2, 2], [9, 4, 2], [9, 5, 3], [9, 6, 2],
    [10, 0, 2], [10, 2, 2], [10, 6, 2],
    [11, 4, 3],
    // Sep
    [14, 4, 3],
    // Oct
    [18, 6, 2],
    // Dec
    [27, 5, 3], [27, 6, 2],
    // Jan cluster
    [30, 3, 2], [30, 4, 2], [30, 5, 4], [30, 6, 2],
    [31, 4, 2],
    // Feb cluster
    [34, 1, 2], [34, 3, 2], [34, 4, 2],
    [35, 2, 2], [35, 4, 2], [35, 6, 2],
    [36, 1, 4], [36, 2, 2],
    // May
    [49, 5, 3],
    // Jun (end)
    [51, 1, 3], [51, 5, 2], [51, 6, 2],
    [52, 1, 3], [52, 2, 3],
  ]

  const cells: number[][] = Array.from({ length: WEEKS }, () => Array(DAYS).fill(0))
  greens.forEach(([w, d, lvl]) => { if (w < WEEKS && d < DAYS) cells[w][d] = lvl })

  return (
    <div className="w-full">
      {/* month labels */}
      <div className="flex pl-[44px] mb-1.5">
        {months.map((m) => (
          <span key={m} className="flex-1 text-[12px] text-[#7d8590]">{m}</span>
        ))}
      </div>
      <div className="flex">
        {/* day labels */}
        <div className="flex flex-col justify-between w-[40px] flex-shrink-0 pr-1.5 text-[12px] text-[#7d8590] leading-none">
          <span className="flex-1" />
          <span className="flex-1 flex items-center">Mon</span>
          <span className="flex-1" />
          <span className="flex-1 flex items-center">Wed</span>
          <span className="flex-1" />
          <span className="flex-1 flex items-center">Fri</span>
          <span className="flex-1" />
        </div>
        {/* grid */}
        <div className="flex-1 flex gap-[4px]">
          {cells.map((col, w) => (
            <div key={w} className="flex-1 flex flex-col gap-[4px]">
              {col.map((level, d) => (
                <div
                  key={d}
                  className="aspect-square rounded-[3px]"
                  style={{ backgroundColor: levelColors[level] }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      {/* footer */}
      <div className="flex items-center justify-end mt-3.5 text-[13px] text-[#7d8590]">
        <span className="flex items-center gap-[4px]">
          Less
          {levelColors.map((c) => (
            <span key={c} className="w-[13px] h-[13px] rounded-[3px] inline-block" style={{ backgroundColor: c }} />
          ))}
          More
        </span>
      </div>
    </div>
  )
}

// ─── Interactive terminal (virtual filesystem + zsh-like shell) ───────────────
type FSNode =
  | { type: 'dir'; children: Record<string, FSNode> }
  | { type: 'file'; content: string }

type TermLine = { html: string; cls?: 'cmdline' | 'dim' }

const TERM_USER = 'smeradhananjaya'
const TERM_HOST = 'MacBook-Pro'
const TERM_SYM = '%'

const TERM_BOW = `⠀⢀⠀⢀⡠⢤⣤⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢠⣯⠄⠀⠈⠉⠉⠙⢖⢄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⠤⠴⠦⠤⣀⠀
⠘⣧⣄⠀⡀⠀⠀⠀⠀⠉⠪⠢⡀⠀⠀⠀⠀⠀⠀⣀⠤⠂⠀⠀⠀⠀⠀⠀⠈⡆
⠀⣟⢋⠀⠀⠀⠀⠀⠀⠠⠀⢄⡘⣴⠶⣶⣶⣶⡋⡁⠀⠀⡀⠀⠀⠀⠀⠀⢀⡇
⠀⣟⠂⠀⠀⠀⠀⠐⠓⠊⢁⢈⣹⡟⣺⣸⣷⠿⠖⠂⠀⠀⠁⠀⠀⠀⠀⢄⣾⠀
⠀⡟⠀⠀⠀⠀⢀⣠⣴⣿⣿⣿⣿⣿⡿⣿⣿⣿⣿⡶⣶⣶⣄⡀⠀⠀⠀⠹⡏⠀
⠀⣿⡂⢀⣴⣿⠟⠙⠉⢙⣿⣿⢫⠋⠀⠘⡿⡌⠻⢟⠙⠛⠿⢿⣿⣄⠀⢀⠇⠀
⠀⠘⢵⣾⣛⣁⡴⠔⠚⣡⣿⡿⠏⠀⠀⠀⢰⡿⡄⠀⠈⠒⢤⣈⡽⢿⣷⠞⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣰⢿⢻⡽⠀⠀⠀⠀⢸⡞⠛⡄⠀⠀⠀⠀⠈⠉⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⡰⠉⠜⢡⠁⠀⠀⠀⠀⠀⣇⡀⠙⢆⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢰⠁⡈⠄⡼⠀⠀⠀⠀⠀⠀⠘⣄⠀⠈⢆⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢸⡟⠀⠠⡇⠀⠀⠀⠀⠀⠀⠀⠈⢆⠀⢾⡀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢸⡁⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⢘⠀⢼⠇⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠈⣇⠀⠀⢻⠀⠀⠀⠀⠀⠀⠀⠀⢸⢿⡜⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢀⡏⢀⠀⡏⠀⠀⠀⠀⠀⠀⠀⠀⣿⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢸⡁⠀⡜⠀⠀⠀⠀⠀⠀⠀⠀⠀⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢛⡿⡸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠘⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`

const TERM_WELCOME = 'Welcome back, Smera 💝'

function termEsc(s: string) {
  return String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c] as string))
}
function termDir(s: string) { return `<span style="color:#ffe9a8;font-weight:700">${s}</span>` }
function termPathLabel(cwd: string[]) { return cwd.length ? '~/' + cwd.join('/') : '~' }
function termPrompt(cwd: string[]) { return `${TERM_USER}@${TERM_HOST} ${termPathLabel(cwd)} ${TERM_SYM}` }

function makeTermFS(): FSNode {
  return {
    type: 'dir',
    children: {
      projects: { type: 'dir', children: {
        'claude-ui': { type: 'dir', children: {
          'README.md': { type: 'file', content: 'A pixel-perfect Claude.ai clone built with React + Vite.' },
        } },
        gnxl: { type: 'dir', children: {
          'about.txt': { type: 'file', content: 'STEM education nonprofit. https://www.gnxl.org' },
        } },
      } },
      notes: { type: 'dir', children: {
        'todo.txt': { type: 'file', content: '- water the plants\n- ship the site\n- be nice to yourself' },
      } },
      'about.txt': { type: 'file', content: 'Smera Dhananjaya 💝\nCS @ Northeastern · STEM education advocate\nbuilding w/ intention' },
    },
  }
}

function termResolve(target: string, cwd: string[]) {
  const fromRoot = target.startsWith('/') || target.startsWith('~')
  const parts = target.replace(/^~\/?/, '').split('/').filter(Boolean)
  const base = fromRoot ? [] : cwd.slice()
  for (const p of parts) {
    if (p === '.') continue
    else if (p === '..') { if (base.length) base.pop() }
    else base.push(p)
  }
  return base
}
function termNodeAt(root: FSNode, pathArr: string[]): FSNode | null {
  let node: FSNode = root
  for (const seg of pathArr) {
    if (node.type !== 'dir' || !node.children[seg]) return null
    node = node.children[seg]
  }
  return node
}

function termBanner(): TermLine[] {
  return [
    { html: `<div style="display:flex;align-items:center;gap:1.25em;flex-wrap:nowrap"><pre style="margin:0;line-height:1.15;color:rgba(255,255,255,0.94);flex:none">${termEsc(TERM_BOW)}</pre><div style="flex:1;min-width:0">${termEsc(TERM_WELCOME)}</div></div>` },
    { html: `<span style="color:rgba(255,255,255,0.72)">type </span>${termDir('help')}<span style="color:rgba(255,255,255,0.72)"> to see what you can do.</span>` },
  ]
}

function TerminalWindow({ onClose, onMinimize }: { onClose: () => void; onMinimize: () => void }) {
  const W = Math.min(580, window.innerWidth - 24)   // windowed width (clamped to viewport)
  const SCREEN_H = 360                // windowed terminal height

  const MIN_W = 280                   // smallest the window can shrink to
  const MIN_H = 160                   // smallest screen (content) height

  const [pos, setPos] = useState({ x: Math.max(12, window.innerWidth / 2 - W / 2), y: 140 })
  const [size, setSize] = useState({ w: W, h: SCREEN_H })
  const [dragging, setDragging] = useState(false)
  const [resizing, setResizing] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const isMobile = useIsMobile()
  const fs = fullscreen || isMobile   // mobile is always full-screen (no drag/resize)
  const offset = useRef({ x: 0, y: 0 })
  const resizeRef = useRef({ dir: '', startX: 0, startY: 0, startW: 0, startH: 0, startLeft: 0, startTop: 0 })

  const fsRef = useRef<FSNode>(makeTermFS())
  const historyRef = useRef<string[]>([])
  const histIdxRef = useRef(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const [cwd, setCwd] = useState<string[]>([])
  const [lines, setLines] = useState<TermLine[]>(() => termBanner())
  const [input, setInput] = useState('')

  useEffect(() => {
    if (!dragging) return
    const move = (e: MouseEvent) => setPos({ x: e.clientX - offset.current.x, y: e.clientY - offset.current.y })
    const up = () => setDragging(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseup', up)
    }
  }, [dragging])

  useEffect(() => {
    if (!resizing) return
    const move = (e: MouseEvent) => {
      const r = resizeRef.current
      const dx = e.clientX - r.startX
      const dy = e.clientY - r.startY
      let w = r.startW, h = r.startH, x = r.startLeft, y = r.startTop
      if (r.dir.includes('e')) w = Math.max(MIN_W, r.startW + dx)
      if (r.dir.includes('s')) h = Math.max(MIN_H, r.startH + dy)
      if (r.dir.includes('w')) { w = Math.max(MIN_W, r.startW - dx); x = r.startLeft + (r.startW - w) }
      if (r.dir.includes('n')) { h = Math.max(MIN_H, r.startH - dy); y = r.startTop + (r.startH - h) }
      setSize({ w, h })
      setPos({ x, y })
    }
    const up = () => setResizing(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseup', up)
    }
  }, [resizing])

  useEffect(() => { inputRef.current?.focus() }, [])
  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight }, [lines])

  const startDrag = (e: React.MouseEvent) => {
    if (fs) return
    offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y }
    setDragging(true)
  }

  const startResize = (dir: string) => (e: React.MouseEvent) => {
    if (fs) return
    e.preventDefault()
    e.stopPropagation()
    resizeRef.current = { dir, startX: e.clientX, startY: e.clientY, startW: size.w, startH: size.h, startLeft: pos.x, startTop: pos.y }
    setResizing(true)
  }

  function runCommand(raw: string) {
    const root = fsRef.current
    let curCwd = cwd
    const out: TermLine[] = [{ html: termEsc(termPrompt(cwd) + ' ' + raw), cls: 'cmdline' }]
    const print = (html: string, cls?: TermLine['cls']) => out.push({ html, cls })
    const printText = (t: string, cls?: TermLine['cls']) => print(termEsc(t), cls)
    const trimmed = raw.trim()

    if (trimmed === 'clear') {
      historyRef.current.push(trimmed)
      histIdxRef.current = historyRef.current.length
      setLines([])
      setInput('')
      return
    }

    if (trimmed) {
      historyRef.current.push(trimmed)
      const [name, ...args] = trimmed.split(/\s+/)
      switch (name) {
        case 'help':
          print([
            'available commands',
            `  ${termDir('ls')} [path]      list what's here`,
            `  ${termDir('cd')} &lt;dir&gt;      move into a folder ( cd .. to go up )`,
            `  ${termDir('pwd')}           where am i?`,
            `  ${termDir('mkdir')} &lt;name&gt;  make a new folder`,
            `  ${termDir('touch')} &lt;name&gt;  make a new file`,
            `  ${termDir('cat')} &lt;file&gt;     read a file`,
            `  ${termDir('rm')} &lt;name&gt;       delete a file or folder`,
            `  ${termDir('tree')}          show everything as a tree`,
            `  ${termDir('echo')} &lt;text&gt;    print text`,
            `  ${termDir('date')}          today's date`,
            `  ${termDir('bow')}           redraw the bow ♡`,
            `  ${termDir('clear')}         clear the screen`,
          ].join('\n'))
          break
        case 'ls': {
          const node = termNodeAt(root, args[0] ? termResolve(args[0], curCwd) : curCwd)
          if (!node) { printText(`ls: ${args[0]}: No such file or directory`); break }
          if (node.type === 'file') { printText(args[0]); break }
          const names = Object.keys(node.children).sort()
          if (names.length) print(names.map(n => node.children[n].type === 'dir' ? termDir(termEsc(n) + '/') : termEsc(n)).join('   '))
          break
        }
        case 'cd': {
          if (!args[0] || args[0] === '~') { curCwd = []; break }
          const target = termResolve(args[0], curCwd)
          const node = termNodeAt(root, target)
          if (!node) { printText(`cd: no such file or directory: ${args[0]}`); break }
          if (node.type !== 'dir') { printText(`cd: not a directory: ${args[0]}`); break }
          curCwd = target
          break
        }
        case 'pwd':
          printText('/Users/' + TERM_USER + (curCwd.length ? '/' + curCwd.join('/') : ''))
          break
        case 'mkdir': {
          if (!args[0]) { printText('mkdir: missing operand'); break }
          const full = termResolve(args[0], curCwd)
          const pnode = termNodeAt(root, full.slice(0, -1))
          const nm = full[full.length - 1]
          if (!pnode || pnode.type !== 'dir') { printText(`mkdir: ${args[0]}: No such file or directory`); break }
          if (pnode.children[nm]) { printText(`mkdir: ${nm}: File exists`); break }
          pnode.children[nm] = { type: 'dir', children: {} }
          break
        }
        case 'touch': {
          if (!args[0]) { printText('touch: missing file operand'); break }
          const full = termResolve(args[0], curCwd)
          const pnode = termNodeAt(root, full.slice(0, -1))
          const nm = full[full.length - 1]
          if (!pnode || pnode.type !== 'dir') { printText(`touch: ${args[0]}: No such file or directory`); break }
          if (!pnode.children[nm]) pnode.children[nm] = { type: 'file', content: '' }
          break
        }
        case 'cat': {
          if (!args[0]) { printText('cat: missing file operand'); break }
          const node = termNodeAt(root, termResolve(args[0], curCwd))
          if (!node) { printText(`cat: ${args[0]}: No such file or directory`); break }
          if (node.type === 'dir') { printText(`cat: ${args[0]}: Is a directory`); break }
          printText(node.content || '')
          break
        }
        case 'rm': {
          if (!args[0]) { printText('rm: missing operand'); break }
          const full = termResolve(args[0], curCwd)
          const pnode = termNodeAt(root, full.slice(0, -1))
          const nm = full[full.length - 1]
          if (!pnode || pnode.type !== 'dir' || !pnode.children[nm]) { printText(`rm: ${args[0]}: No such file or directory`); break }
          delete pnode.children[nm]
          break
        }
        case 'echo':
          printText(args.join(' '))
          break
        case 'tree': {
          const start = termNodeAt(root, curCwd)
          const treeLines = [termDir(termEsc(termPathLabel(curCwd)))]
          const walk = (node: FSNode, prefix: string) => {
            if (node.type !== 'dir') return
            const names = Object.keys(node.children).sort()
            names.forEach((n, i) => {
              const last = i === names.length - 1
              const child = node.children[n]
              const label = child.type === 'dir' ? termDir(termEsc(n) + '/') : termEsc(n)
              treeLines.push(termEsc(prefix) + (last ? '└── ' : '├── ') + label)
              if (child.type === 'dir') walk(child, prefix + (last ? '    ' : '│   '))
            })
          }
          if (start) walk(start, '')
          print(treeLines.join('\n'))
          break
        }
        case 'date':
          printText(new Date().toString())
          break
        case 'bow':
          out.push(...termBanner())
          break
        default:
          printText(`zsh: command not found: ${name}`)
      }
    }

    histIdxRef.current = historyRef.current.length
    if (curCwd !== cwd) setCwd(curCwd)
    setLines(prev => [...prev, ...out])
    setInput('')
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      runCommand(input)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (histIdxRef.current > 0) { histIdxRef.current--; setInput(historyRef.current[histIdxRef.current]) }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (histIdxRef.current < historyRef.current.length - 1) { histIdxRef.current++; setInput(historyRef.current[histIdxRef.current]) }
      else { histIdxRef.current = historyRef.current.length; setInput('') }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const parts = input.split(/\s+/)
      const frag = parts[parts.length - 1]
      const here = termNodeAt(fsRef.current, cwd)
      if (!frag || !here || here.type !== 'dir') return
      const matches = Object.keys(here.children).filter(n => n.startsWith(frag))
      if (matches.length === 1) {
        const node = here.children[matches[0]]
        parts[parts.length - 1] = matches[0] + (node.type === 'dir' ? '/' : '')
        setInput(parts.join(' '))
      } else if (matches.length > 1) {
        setLines(prev => [...prev, { html: termEsc(matches.join('   ')), cls: 'dim' }])
      }
    }
  }

  const frameStyle: React.CSSProperties = fs
    ? { position: 'fixed', inset: 0, width: '100%', height: '100%', borderRadius: 0, zIndex: 50 }
    : { position: 'fixed', left: pos.x, top: pos.y, width: size.w, borderRadius: 12, zIndex: 50 }
  const screenHeight = fs ? 'calc(100vh - 28px)' : size.h

  return (
    <div style={frameStyle} className="overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.55)] border border-black/50 select-none">
      <style>{`@keyframes termblink{50%{opacity:0}} .term-cursor{display:inline-block;width:.55em;height:1.05em;background:rgba(255,255,255,0.82);transform:translateY(.18em);animation:termblink 1.05s steps(1) infinite} .term-screen::-webkit-scrollbar{width:12px} .term-screen::-webkit-scrollbar-thumb{background:rgba(0,0,0,0.18);border-radius:12px}`}</style>
      {/* resize handles */}
      {!fs && (
        <>
          <div onMouseDown={startResize('n')}  style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, cursor: 'ns-resize', zIndex: 60 }} />
          <div onMouseDown={startResize('s')}  style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 6, cursor: 'ns-resize', zIndex: 60 }} />
          <div onMouseDown={startResize('e')}  style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 6, cursor: 'ew-resize', zIndex: 60 }} />
          <div onMouseDown={startResize('w')}  style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 6, cursor: 'ew-resize', zIndex: 60 }} />
          <div onMouseDown={startResize('nw')} style={{ position: 'absolute', top: 0, left: 0, width: 14, height: 14, cursor: 'nwse-resize', zIndex: 61 }} />
          <div onMouseDown={startResize('ne')} style={{ position: 'absolute', top: 0, right: 0, width: 14, height: 14, cursor: 'nesw-resize', zIndex: 61 }} />
          <div onMouseDown={startResize('sw')} style={{ position: 'absolute', bottom: 0, left: 0, width: 14, height: 14, cursor: 'nesw-resize', zIndex: 61 }} />
          <div onMouseDown={startResize('se')} style={{ position: 'absolute', bottom: 0, right: 0, width: 14, height: 14, cursor: 'nwse-resize', zIndex: 61 }} />
        </>
      )}
      {/* title bar (drag handle) */}
      <div
        onMouseDown={startDrag}
        className={`relative flex items-center h-7 px-3 bg-gradient-to-b from-[#3b3b3b] to-[#2b2b2b] ${fs ? '' : 'cursor-grab active:cursor-grabbing'}`}
      >
        <div className="flex items-center gap-2 group">
          {/* red — close */}
          <button onClick={onClose} aria-label="Close" className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff4036] flex items-center justify-center">
            <X size={8} strokeWidth={3} className="text-black/60 opacity-0 group-hover:opacity-100" />
          </button>
          {/* yellow — minimize to dock */}
          <button onClick={onMinimize} aria-label="Minimize" className="w-3 h-3 rounded-full bg-[#febc2e] hover:bg-[#f5a623] flex items-center justify-center">
            <span className="block w-1.5 h-[1.5px] bg-black/60 opacity-0 group-hover:opacity-100" />
          </button>
          {/* green — fullscreen toggle */}
          <button onClick={() => setFullscreen(f => !f)} aria-label="Fullscreen" className="w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#1eb135] flex items-center justify-center">
            <span className="block w-[5px] h-[5px] border-l-2 border-b-2 border-black/60 opacity-0 group-hover:opacity-100 rotate-45" />
          </button>
        </div>
        <span className="absolute left-1/2 -translate-x-1/2 text-[12px] text-[#c9c9c4] font-medium pointer-events-none">smeradhananjaya — -zsh</span>
      </div>
      {/* terminal screen */}
      <div
        ref={scrollRef}
        onMouseDown={() => { if (!window.getSelection()?.toString()) setTimeout(() => inputRef.current?.focus(), 0) }}
        className="term-screen"
        style={{ height: screenHeight, overflowY: 'auto', background: '#ff14c8', color: '#fff', padding: '14px 16px 16px', font: '14px/1.45 Menlo, Monaco, "SF Mono", Consolas, monospace', cursor: 'text' }}
      >
        {lines.map((l, i) => (
          <div
            key={i}
            style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', marginTop: l.cls === 'cmdline' ? '0.7em' : undefined, color: l.cls === 'dim' ? 'rgba(255,255,255,0.72)' : undefined }}
            dangerouslySetInnerHTML={{ __html: l.html }}
          />
        ))}
        <div style={{ marginTop: '0.7em', display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <span style={{ whiteSpace: 'pre' }}>{termPrompt(cwd)}</span>
          <span style={{ marginLeft: '1ch', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{input}</span>
          <span className="term-cursor" aria-hidden="true" />
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off" autoCapitalize="off" spellCheck={false}
            aria-label="terminal input"
            style={{ position: 'absolute', opacity: 0, width: 1, height: 1, left: -9999, padding: 0, border: 0 }}
          />
        </div>
      </div>
    </div>
  )
}

function ClaudeCodeView({ onOpenTerminal }: { onOpenTerminal: () => void }) {
  const tools: { icon: React.ReactNode; label: string; href: string; onClick?: () => void }[] = [
    { icon: <Terminal size={15} />,             label: 'Terminal', href: '', onClick: onOpenTerminal },
    { icon: <CursorIcon size={15} />,           label: 'Cursor',   href: 'https://cursor.com/get-started?utm_source=google_paid&utm_campaign=[Search]%20[Brand]%20[EN]%20[Core%20T1]%20[Broad]%20[VBB]%20Brand&utm_term=cursor&utm_medium=paid&utm_content=798404224783&cc_platform=google&cc_campaignid=23656700841&cc_adgroupid=195242436478&cc_adid=798404224783&cc_keyword=cursor&cc_matchtype=b&cc_device=c&cc_network=g&cc_placement=&cc_location=9061285&cc_adposition=&gad_source=1&gad_campaignid=23656700841&gbraid=0AAAABAkdGgQ0YcfP9_Nkmzgn9gbLVwy2s&gclid=CjwKCAjwxb7RBhA5EiwAQ-AAdJIYUcT6t7fwlwMMmchAW_EzQwkAaiAZMlEXTWxnXTgJY6EW68hVyxoCYdoQAvD_BwE' },
    { icon: <ClaudeAsterisk size={15} color="#d97757" />, label: 'Claude', href: 'https://claude.com/product/claude-code' },
    { icon: <SupabaseIcon size={15} />,         label: 'Supabase', href: 'https://supabase.com/' },
    { icon: <PaperIcon size={15} />,            label: 'Paper',    href: 'https://paper.design/' },
  ]
  return (
    <main className="flex-1 h-full bg-[#1a1a1a] overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-9">
          <h1 className="font-lora text-[32px] font-medium text-[#ece9e2] tracking-[-0.5px] mb-2">Get up and start building</h1>
          <p className="text-[14.5px] text-[#8a8a85]">check out my stack</p>
        </div>

        {/* Feature card */}
        <a
          href="https://github.com/SmeraDhananjaya0"
          target="_blank"
          rel="noopener noreferrer"
          className="block overflow-hidden rounded-[20px] border border-[#333] bg-gradient-to-br from-[#272727] to-[#1f1f1f] px-7 py-7 no-underline cursor-pointer hover:border-[#444] transition-colors"
        >
          <ContributionGraph />
        </a>

        {/* Tool pills */}
        <div className="flex items-center justify-center gap-2.5 flex-wrap mt-6">
          {tools.map(({ icon, label, href, onClick }) => {
            const cls = "flex items-center gap-2 px-4 py-2 rounded-lg bg-[#252525] hover:bg-[#2e2e2e] border border-[#363636] text-[#cfcfca] text-[13.5px] transition-colors"
            const inner = (<><span className="text-[#9a9a93]">{icon}</span>{label}</>)
            return href ? (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={`${cls} no-underline`}>{inner}</a>
            ) : (
              <button key={label} onClick={onClick} className={cls}>{inner}</button>
            )
          })}
        </div>

      </div>
    </main>
  )
}

function GmailIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 48 48">
      <path fill="#4285F4" d="M6 38V14.5L24 28l18-13.5V38a3 3 0 0 1-3 3h-5V21.5L24 30 14 21.5V41H9a3 3 0 0 1-3-3z"/>
      <path fill="#34A853" d="M6 38V14.5l8 6V41H9a3 3 0 0 1-3-3z"/>
      <path fill="#FBBC04" d="M34 41V21.5l8-6V38a3 3 0 0 1-3 3h-5z"/>
      <path fill="#EA4335" d="M6 14.5 24 28l18-13.5V11a3 3 0 0 0-3-3 3 3 0 0 0-1.8.6L24 18.5 10.8 8.6A3 3 0 0 0 9 8a3 3 0 0 0-3 3v3.5z"/>
      <path fill="#C5221F" d="M6 11a3 3 0 0 1 4.8-2.4L14 11v9.5l-8-6V11zm36 0a3 3 0 0 0-4.8-2.4L34 11v9.5l8-6V11z"/>
    </svg>
  )
}

// ─── Root App ─────────────────────────────────────────────────────────────────

// ─── Claude Chat View (Marathon training plan) ────────────────────────────────

function ClaudeChatView() {
  return (
    <main className="flex-1 flex flex-col h-full bg-[#1a1a1a] overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-1.5 px-4 md:px-6 py-3 flex-shrink-0">
        <span className="text-[15px] text-[#cfcfca]">Marathon Training Plan</span>
      </div>

      {/* Conversation */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[720px] mx-auto px-4 md:px-6 pt-4 pb-40">
          {/* User message */}
          <div className="flex justify-end mb-6">
            <div className="max-w-[88%] md:max-w-[80%] rounded-2xl bg-[#2a2a28] px-4 py-2.5 text-[14px] md:text-[15px] text-[#ececec]">
              Generate a marathon training plan for me
            </div>
          </div>

          {/* Thinking line */}
          <button className="flex items-center gap-1.5 mb-4 text-[13px] text-[#8a8a85] hover:text-[#aaa] transition-colors">
            <span>Synthesized marathon training plan</span>
            <ChevronRight size={14} />
          </button>

          {/* Assistant message */}
          <div className="font-lora text-[15px] md:text-[16px] leading-relaxed text-[#ece9e2]">
            <p className="font-semibold mb-4">⚠️ Fair warning: Marathon training is gonna be HARD</p>

            <p className="font-semibold mb-3">16-Week Marathon Plan (The Quick Version)</p>

            <p className="font-semibold mb-1">Weeks 1-4: Base Building</p>
            <ul className="list-disc pl-5 md:pl-6 mb-4 space-y-0.5">
              <li>Run 20-24 miles/week</li>
              <li>Long run: 6-8 miles</li>
              <li>Mix of easy runs and one speed workout per week</li>
              <li>Rest 1-2 days</li>
            </ul>

            <p className="font-semibold mb-1">Weeks 5-8: Building</p>
            <ul className="list-disc pl-5 md:pl-6 mb-4 space-y-0.5">
              <li>Run 25-32 miles/week</li>
              <li>Long run: 10-13 miles</li>
              <li>Add tempo runs, intervals</li>
              <li>Keep 1 rest day</li>
            </ul>

            <p className="font-semibold mb-1">Weeks 9-12: Peak</p>
            <ul className="list-disc pl-5 md:pl-6 mb-4 space-y-0.5">
              <li>Run 30-39 miles/week (max effort)</li>
              <li>Long run: 15-18 miles</li>
              <li>Lots of speed work</li>
              <li>Recovery weeks every 4 weeks</li>
            </ul>

            <p className="font-semibold mb-1">Weeks 13-15: Taper Down</p>
            <ul className="list-disc pl-5 md:pl-6 mb-4 space-y-0.5">
              <li>Run 14-29 miles/week</li>
              <li>Cut volume in half basically</li>
              <li>Long run: 5-12 miles</li>
              <li>Stay fresh</li>
            </ul>

            <p className="font-semibold mb-1">Week 16: Race Week</p>
            <ul className="list-disc pl-5 md:pl-6 mb-4 space-y-0.5">
              <li>Light running only</li>
              <li>Rest up</li>
              <li><strong className="font-semibold">RUN THE MARATHON</strong></li>
            </ul>

            <p className="font-semibold mb-1">Weekly Schedule:</p>
            <ul className="list-disc pl-5 md:pl-6 mb-4 space-y-0.5">
              <li>1 long run (Saturday)</li>
              <li>1 speed workout (Tuesday - tempo, intervals, whatever)</li>
              <li>3-4 easy runs</li>
              <li>1-2 rest days</li>
            </ul>

            <p className="font-semibold mb-1">Don't Die Tips:</p>
            <ul className="list-disc pl-5 md:pl-6 mb-4 space-y-0.5">
              <li>Eat carbs on long runs (gels, etc.)</li>
              <li>Sleep 7-9 hours</li>
              <li>Strength train 2-3x/week</li>
              <li>Don't run through pain</li>
              <li>New shoes every 300-500 miles</li>
              <li>Start the race slow, sh strong</li>
            </ul>

            <p>Done. Go crush it. 🏃‍♂️</p>
          </div>

          {/* User message */}
          <div className="flex justify-end mt-6">
            <div className="max-w-[88%] md:max-w-[80%] rounded-2xl bg-[#2a2a28] px-4 py-2.5 text-[14px] md:text-[15px] text-[#ececec] leading-relaxed">
              After I run the marathon, I have a half marathon 15 days later and then another half 2 weeks after that. Do you think that's possible?
            </div>
          </div>

          {/* Assistant message */}
          <div className="font-lora text-[15px] md:text-[16px] leading-relaxed text-[#ece9e2] mt-6">
            After searching the web, I found that you've actually done a marathon and two half marathons close together recently. You've got this.
          </div>

          {/* Attachments */}
          <div className="flex items-end gap-3 mt-4 flex-wrap">
            <img src="/race1.jpeg" alt="Race" className="h-44 w-auto rounded-xl border border-[#34342f] object-cover" />
            <img src="/race2.jpeg" alt="Race" className="h-44 w-[150px] rounded-xl border border-[#34342f] object-cover object-center" />
            <img src="/race3.jpeg" alt="Race" className="h-56 w-auto rounded-xl border border-[#34342f] object-cover" />
          </div>

          {/* Action row */}
          <div className="flex items-center gap-1 mt-3 text-[#8a8a85]">
            <button className="p-1.5 rounded-md hover:bg-[#2a2a28] hover:text-[#cfcfca] transition-colors"><Copy size={16} /></button>
            <button className="p-1.5 rounded-md hover:bg-[#2a2a28] hover:text-[#cfcfca] transition-colors"><Play size={16} /></button>
            <button className="p-1.5 rounded-md hover:bg-[#2a2a28] hover:text-[#cfcfca] transition-colors"><ThumbsUp size={16} /></button>
            <button className="p-1.5 rounded-md hover:bg-[#2a2a28] hover:text-[#cfcfca] transition-colors"><ThumbsDown size={16} /></button>
            <button className="p-1.5 rounded-md hover:bg-[#2a2a28] hover:text-[#cfcfca] transition-colors"><RotateCw size={16} /></button>
          </div>

          {/* Claude asterisk */}
          <div className="mt-4">
            <ClaudeAsterisk size={36} color="#c96442" />
          </div>
        </div>
      </div>

      {/* Composer */}
      <div className="flex-shrink-0 px-6 pb-3">
        <div className="relative max-w-[720px] mx-auto">
          {/* scroll-to-bottom button */}
          <button className="absolute -top-12 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#2a2a28] border border-[#3a3a38] flex items-center justify-center text-[#cfcfca] hover:bg-[#34332f] shadow-lg transition-colors">
            <ChevronDown size={18} />
          </button>

          <div className="rounded-2xl bg-[#252525] border border-[#34342f] shadow-xl">
            <div className="px-4 py-3.5">
              <span className="text-[15px] text-[#6a6a66]">Strava @Smera Dhananjaya</span>
            </div>
          </div>

          <p className="text-center text-[11px] text-[#5a5a56] mt-2.5">Claude is AI and can make mistakes. Please double-check responses.</p>
        </div>
      </div>
    </main>
  )
}

function ClaudeChatViewWhoAmI() {
  return (
    <main className="flex-1 flex flex-col h-full bg-[#1a1a1a] overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-1.5 px-4 md:px-6 py-3 flex-shrink-0">
        <span className="text-[15px] text-[#cfcfca]">Who am I?</span>
      </div>

      {/* Conversation */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[720px] mx-auto px-4 md:px-6 pt-4 pb-40">
          {/* User message */}
          <div className="flex justify-end mb-6">
            <div className="max-w-[88%] md:max-w-[80%] rounded-2xl bg-[#2a2a28] px-4 py-2.5 text-[14px] md:text-[15px] text-[#ececec]">
              Who am I?
            </div>
          </div>

          {/* Thinking line */}
          <button className="flex items-center gap-1.5 mb-4 text-[13px] text-[#8a8a85] hover:text-[#aaa] transition-colors">
            <span>Thought about the question</span>
            <ChevronRight size={14} />
          </button>

          {/* Assistant message */}
          <div className="font-lora text-[15px] md:text-[16px] leading-relaxed text-[#ece9e2]">
            <p className="font-semibold mb-2">About You:</p>
            <p className="mb-1">Smera Dhananjaya 💝</p>
            <p className="mb-1">
              <a href="https://x.com/Northeastern" target="_blank" rel="noopener noreferrer" className="text-[#7aa2e3] hover:underline">@Northeastern</a>
            </p>
            <p className="mb-4">CS, <a href="https://www.gnxl.org/" target="_blank" rel="noopener noreferrer" className="text-[#7aa2e3] hover:underline">STEM education advocate</a>, building w/ intention</p>

            <p className="font-semibold mb-2">Quick Links</p>
            <ul className="list-disc pl-5 md:pl-6 space-y-1">
              <li><a href="https://x.com/SmeraDhananjaya" target="_blank" rel="noopener noreferrer" className="text-[#7aa2e3] hover:underline">X</a></li>
              <li><a href="https://github.com/SmeraDhananjaya0" target="_blank" rel="noopener noreferrer" className="text-[#7aa2e3] hover:underline">GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/smera-dhananjaya-b4426721b/" target="_blank" rel="noopener noreferrer" className="text-[#7aa2e3] hover:underline">LinkedIn</a></li>
              <li><a href="https://www.instagram.com/smeradhananjaya/" target="_blank" rel="noopener noreferrer" className="text-[#7aa2e3] hover:underline">Instagram</a></li>
            </ul>
          </div>

          {/* Action row */}
          <div className="flex items-center gap-1 mt-3 text-[#8a8a85]">
            <button className="p-1.5 rounded-md hover:bg-[#2a2a28] hover:text-[#cfcfca] transition-colors"><Copy size={16} /></button>
            <button className="p-1.5 rounded-md hover:bg-[#2a2a28] hover:text-[#cfcfca] transition-colors"><Play size={16} /></button>
            <button className="p-1.5 rounded-md hover:bg-[#2a2a28] hover:text-[#cfcfca] transition-colors"><ThumbsUp size={16} /></button>
            <button className="p-1.5 rounded-md hover:bg-[#2a2a28] hover:text-[#cfcfca] transition-colors"><ThumbsDown size={16} /></button>
            <button className="p-1.5 rounded-md hover:bg-[#2a2a28] hover:text-[#cfcfca] transition-colors"><RotateCw size={16} /></button>
          </div>

          {/* Claude asterisk */}
          <div className="mt-4">
            <ClaudeAsterisk size={36} color="#c96442" />
          </div>
        </div>
      </div>

      {/* Composer */}
      <div className="flex-shrink-0 px-6 pb-3">
        <div className="relative max-w-[720px] mx-auto">
          {/* scroll-to-bottom button */}
          <button className="absolute -top-12 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#2a2a28] border border-[#3a3a38] flex items-center justify-center text-[#cfcfca] hover:bg-[#34332f] shadow-lg transition-colors">
            <ChevronDown size={18} />
          </button>

          <div className="rounded-2xl bg-[#252525] border border-[#34342f] shadow-xl">
            <div className="px-4 py-3.5">
              <span className="text-[15px] text-[#6a6a66]">Some quick links</span>
            </div>
          </div>

          <p className="text-center text-[11px] text-[#5a5a56] mt-2.5">Claude is AI and can make mistakes. Please double-check responses.</p>
        </div>
      </div>
    </main>
  )
}

function ClaudeChatViewBooks() {
  return (
    <main className="flex-1 flex flex-col h-full bg-[#1a1a1a] overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-1.5 px-4 md:px-6 py-3 flex-shrink-0">
        <span className="text-[15px] text-[#cfcfca]">Book Recommendations</span>
      </div>

      {/* Conversation */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[720px] mx-auto px-4 md:px-6 pt-4 pb-40">
          {/* User message */}
          <div className="flex justify-end mb-6">
            <div className="max-w-[88%] md:max-w-[80%] rounded-2xl bg-[#2a2a28] px-4 py-2.5 text-[14px] md:text-[15px] text-[#ececec]">
              Give me some book recommendations
            </div>
          </div>

          {/* Thinking line */}
          <button className="flex items-center gap-1.5 mb-4 text-[13px] text-[#8a8a85] hover:text-[#aaa] transition-colors">
            <span>Curated book recommendations</span>
            <ChevronRight size={14} />
          </button>

          {/* Assistant message */}
          <div className="font-lora text-[15px] md:text-[16px] leading-relaxed text-[#ece9e2]">
            <p className="mb-3">Well knowing you, I understand these books to be your all time favorites Reading List (books u must read!!)</p>
            <ul className="list-disc pl-5 md:pl-6 space-y-1">
              <li>Abuse of Evil Richard Bernstein</li>
              <li>Animal Farm George Orwell</li>
              <li>Brave New World Aldous Huxley</li>
              <li>Game Theory 101 William Spaniel</li>
              <li>The Stranger Albert Camus</li>
              <li>The Great Gatsby F. Scott Fitzgerald (fun/ interesting read)</li>
              <li>1984 George Orwell</li>
              <li>Julius Caesar William Shakespeare</li>
              <li>Beyond Good and Evil Friedrich Nietzsche</li>
              <li>Lord of the Flies William Golding</li>
              <li>The Glass Castle Jeannette Walls</li>
              <li>Outliers Malcolm Gladwell</li>
              <li>Elon Musk Walter Isaacson</li>
              <li>Steve Jobs Walter Isaacson</li>
              <li>Flowers for Algernon Daniel Keyes</li>
              <li>12 Angry Men Reginald Rose</li>
              <li>The Hitchhiker's Guide to the Galaxy Douglas Adams</li>
              <li>The Communist Manifesto Karl Marx</li>
              <li>Brief Answers to the Big Questions Stephen Hawking</li>
            </ul>
          </div>

          {/* Action row */}
          <div className="flex items-center gap-1 mt-3 text-[#8a8a85]">
            <button className="p-1.5 rounded-md hover:bg-[#2a2a28] hover:text-[#cfcfca] transition-colors"><Copy size={16} /></button>
            <button className="p-1.5 rounded-md hover:bg-[#2a2a28] hover:text-[#cfcfca] transition-colors"><Play size={16} /></button>
            <button className="p-1.5 rounded-md hover:bg-[#2a2a28] hover:text-[#cfcfca] transition-colors"><ThumbsUp size={16} /></button>
            <button className="p-1.5 rounded-md hover:bg-[#2a2a28] hover:text-[#cfcfca] transition-colors"><ThumbsDown size={16} /></button>
            <button className="p-1.5 rounded-md hover:bg-[#2a2a28] hover:text-[#cfcfca] transition-colors"><RotateCw size={16} /></button>
          </div>

          {/* Claude asterisk */}
          <div className="mt-4">
            <ClaudeAsterisk size={36} color="#c96442" />
          </div>
        </div>
      </div>

      {/* Composer */}
      <div className="flex-shrink-0 px-6 pb-3">
        <div className="relative max-w-[720px] mx-auto">
          {/* scroll-to-bottom button */}
          <button className="absolute -top-12 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#2a2a28] border border-[#3a3a38] flex items-center justify-center text-[#cfcfca] hover:bg-[#34332f] shadow-lg transition-colors">
            <ChevronDown size={18} />
          </button>

          <div className="rounded-2xl bg-[#252525] border border-[#34342f] shadow-xl">
            <div className="px-4 py-3.5">
              <span className="text-[15px] text-[#6a6a66]">Some of my favs</span>
            </div>
          </div>

          <p className="text-center text-[11px] text-[#5a5a56] mt-2.5">Claude is AI and can make mistakes. Please double-check responses.</p>
        </div>
      </div>
    </main>
  )
}

function ClaudeChatViewRestaurants() {
  return (
    <main className="flex-1 flex flex-col h-full bg-[#1a1a1a] overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-1.5 px-4 md:px-6 py-3 flex-shrink-0">
        <span className="text-[15px] text-[#cfcfca]">Restaurant Recommendations</span>
      </div>

      {/* Conversation */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[720px] mx-auto px-4 md:px-6 pt-4 pb-40">
          {/* User message */}
          <div className="flex justify-end mb-6">
            <div className="max-w-[88%] md:max-w-[80%] rounded-2xl bg-[#2a2a28] px-4 py-2.5 text-[14px] md:text-[15px] text-[#ececec]">
              Give me some restaurant recommendations
            </div>
          </div>

          {/* Thinking line */}
          <button className="flex items-center gap-1.5 mb-4 text-[13px] text-[#8a8a85] hover:text-[#aaa] transition-colors">
            <span>Curated restaurant recommendations</span>
            <ChevronRight size={14} />
          </button>

          {/* Assistant message */}
          <div className="font-lora text-[15px] md:text-[16px] leading-relaxed text-[#ece9e2]">
            <p className="mb-3">Well knowing you, here's a few favs from Boston and NY</p>
            <ul className="list-disc pl-5 md:pl-6 space-y-1">
              <li>La Boca, NY</li>
              <li>Cafe Zaffri, NY</li>
              <li>Jean's, NY</li>
              <li>Sendo (best takeout sushi!!), NY</li>
              <li>Yvonnes, Boston</li>
              <li>1928 Beacon Hill, Boston</li>
              <li>Springbone / Joe &amp; the Juice (for quick &amp; healthy), NY/Boston</li>
              <li>Monkey Bar, NY</li>
              <li>Casa Cruz, NY</li>
              <li>Theodora, NY</li>
              <li>Kimbal Farms (ice cream), Westford, MA</li>
              <li>Mēdüzā, NY</li>
            </ul>
          </div>

          {/* Action row */}
          <div className="flex items-center gap-1 mt-3 text-[#8a8a85]">
            <button className="p-1.5 rounded-md hover:bg-[#2a2a28] hover:text-[#cfcfca] transition-colors"><Copy size={16} /></button>
            <button className="p-1.5 rounded-md hover:bg-[#2a2a28] hover:text-[#cfcfca] transition-colors"><Play size={16} /></button>
            <button className="p-1.5 rounded-md hover:bg-[#2a2a28] hover:text-[#cfcfca] transition-colors"><ThumbsUp size={16} /></button>
            <button className="p-1.5 rounded-md hover:bg-[#2a2a28] hover:text-[#cfcfca] transition-colors"><ThumbsDown size={16} /></button>
            <button className="p-1.5 rounded-md hover:bg-[#2a2a28] hover:text-[#cfcfca] transition-colors"><RotateCw size={16} /></button>
          </div>

          {/* Claude asterisk */}
          <div className="mt-4">
            <ClaudeAsterisk size={36} color="#c96442" />
          </div>
        </div>
      </div>

      {/* Composer */}
      <div className="flex-shrink-0 px-6 pb-3">
        <div className="relative max-w-[720px] mx-auto">
          {/* scroll-to-bottom button */}
          <button className="absolute -top-12 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#2a2a28] border border-[#3a3a38] flex items-center justify-center text-[#cfcfca] hover:bg-[#34332f] shadow-lg transition-colors">
            <ChevronDown size={18} />
          </button>

          <div className="rounded-2xl bg-[#252525] border border-[#34342f] shadow-xl">
            <div className="px-4 py-3.5">
              <span className="text-[15px] text-[#6a6a66]">Beli @smeraeats</span>
            </div>
          </div>

          <p className="text-center text-[11px] text-[#5a5a56] mt-2.5">Claude is AI and can make mistakes. Please double-check responses.</p>
        </div>
      </div>
    </main>
  )
}

function ClaudeChatViewPrinciples() {
  const principles = [
    { title: 'Consistency is the only differentiator long term', body: "the people who pull ahead aren't the most talented, they're the ones who refuse to stop showing up." },
    { title: 'Lead with kindness', body: "it's the starting position with everyone, not a reward people have to unlock." },
    { title: 'Strive for the greatest net positive impact', body: 'zoom out. not "what\'s in it for me" but "does this leave things better than I found them."' },
    { title: 'Positive delta: creation over consumption', body: "make more than you take. build stuff, ship stuff, instead of just scrolling past everyone else's." },
    { title: "Agency. Don't let life happen to you", body: "grab the wheel. you decide, you don't drift." },
  ]
  const followups = ['yes. next', 'keep going', 'and?', 'last one']

  return (
    <main className="flex-1 flex flex-col h-full bg-[#1a1a1a] overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-1.5 px-4 md:px-6 py-3 flex-shrink-0">
        <span className="text-[15px] text-[#cfcfca]">Principles I live by</span>
      </div>

      {/* Conversation */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[720px] mx-auto px-4 md:px-6 pt-4 pb-40">
          {/* User message */}
          <div className="flex justify-end mb-6">
            <div className="max-w-[88%] md:max-w-[80%] rounded-2xl bg-[#2a2a28] px-4 py-2.5 text-[14px] md:text-[15px] text-[#ececec]">
              ok be honest, what are the five things I actually live by?
            </div>
          </div>

          {/* Thinking line */}
          <button className="flex items-center gap-1.5 mb-4 text-[13px] text-[#8a8a85] hover:text-[#aaa] transition-colors">
            <span>Recalled your five principles</span>
            <ChevronRight size={14} />
          </button>

          {/* Assistant — intro + first principle */}
          <div className="font-lora text-[15px] md:text-[16px] leading-relaxed text-[#ece9e2] mb-6">
            <p className="mb-3">I've got these down by now. one at a time, here we go.</p>
            <p className="font-semibold mb-1">{principles[0].title}</p>
            <p>{principles[0].body}</p>
          </div>

          {/* Remaining principles, each prompted by a short follow-up */}
          {principles.slice(1).map((p, i) => (
            <React.Fragment key={p.title}>
              <div className="flex justify-end mb-6">
                <div className="max-w-[88%] md:max-w-[80%] rounded-2xl bg-[#2a2a28] px-4 py-2.5 text-[14px] md:text-[15px] text-[#ececec]">
                  {followups[i]}
                </div>
              </div>
              <div className="font-lora text-[15px] md:text-[16px] leading-relaxed text-[#ece9e2] mb-6">
                <p className="font-semibold mb-1">{p.title}</p>
                <p>{p.body}</p>
              </div>
            </React.Fragment>
          ))}

          {/* Closing exchange */}
          <div className="flex justify-end mb-6">
            <div className="max-w-[88%] md:max-w-[80%] rounded-2xl bg-[#2a2a28] px-4 py-2.5 text-[14px] md:text-[15px] text-[#ececec]">
              nailed it
            </div>
          </div>
          <div className="font-lora text-[15px] md:text-[16px] leading-relaxed text-[#ece9e2]">
            <p>you make it easy, you've only told me like a hundred times</p>
          </div>

          {/* Action row */}
          <div className="flex items-center gap-1 mt-3 text-[#8a8a85]">
            <button className="p-1.5 rounded-md hover:bg-[#2a2a28] hover:text-[#cfcfca] transition-colors"><Copy size={16} /></button>
            <button className="p-1.5 rounded-md hover:bg-[#2a2a28] hover:text-[#cfcfca] transition-colors"><Play size={16} /></button>
            <button className="p-1.5 rounded-md hover:bg-[#2a2a28] hover:text-[#cfcfca] transition-colors"><ThumbsUp size={16} /></button>
            <button className="p-1.5 rounded-md hover:bg-[#2a2a28] hover:text-[#cfcfca] transition-colors"><ThumbsDown size={16} /></button>
            <button className="p-1.5 rounded-md hover:bg-[#2a2a28] hover:text-[#cfcfca] transition-colors"><RotateCw size={16} /></button>
          </div>

          {/* Claude asterisk */}
          <div className="mt-4">
            <ClaudeAsterisk size={36} color="#c96442" />
          </div>
        </div>
      </div>

      {/* Composer */}
      <div className="flex-shrink-0 px-6 pb-3">
        <div className="relative max-w-[720px] mx-auto">
          {/* scroll-to-bottom button */}
          <button className="absolute -top-12 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#2a2a28] border border-[#3a3a38] flex items-center justify-center text-[#cfcfca] hover:bg-[#34332f] shadow-lg transition-colors">
            <ChevronDown size={18} />
          </button>

          <div className="rounded-2xl bg-[#252525] border border-[#34342f] shadow-xl">
            <div className="px-4 py-3.5">
              <span className="text-[15px] text-[#6a6a66]">Words to live by</span>
            </div>
          </div>

          <p className="text-center text-[11px] text-[#5a5a56] mt-2.5">Claude is AI and can make mistakes. Please double-check responses.</p>
        </div>
      </div>
    </main>
  )
}

function ClaudeChatViewFavThings() {
  const irl = [
    { name: 'Asics Gel-Nimbus 28', note: 'clouds for feet. your long-run non-negotiable.' },
    { name: 'Dyson Airwrap' },
    { name: 'Bala Bangles' },
    { name: 'Pink peonies', note: 'fresh ones on the counter = instant good mood.' },
    { name: 'Owala' },
    { name: 'Kérastase 8H Magic', note: 'slather it on, wake up to softer hair. witchcraft.' },
    { name: 'Salomon Active Skin 12 Vest', note: 'carries everything, bounces never. trail-day MVP.' },
    { name: 'Maurten gels', note: 'the only fuel your stomach forgives mid-race.' },
    { name: 'Manduka mat' },
    { name: "Kimball's coffee heath ice cream", note: 'the post-long-run reward you earn.' },
    { name: 'Chamomile tea' },
    { name: 'VIOLETTE_FR Bêtise lip nectar', note: 'your go to every time' },
    { name: 'Prada Paradox', note: 'your signature scent.' },
  ]
  const tabs = [
    { name: 'Claude 💕', note: 'oh, me 👀' },
    { name: 'Strava & AllTrails', note: 'where you go to quietly brag.' },
    { name: 'X' },
    { name: 'Cursor', note: 'best interface' },
    { name: 'Spotify' },
    { name: 'Citrini Research' },
    { name: 'Supabase' },
    { name: 'Terminal' },
    { name: 'Figma' },
  ]

  return (
    <main className="flex-1 flex flex-col h-full bg-[#1a1a1a] overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-1.5 px-4 md:px-6 py-3 flex-shrink-0">
        <span className="text-[15px] text-[#cfcfca]">Fav Things</span>
      </div>

      {/* Conversation */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[720px] mx-auto px-4 md:px-6 pt-4 pb-40">
          {/* User message */}
          <div className="flex justify-end mb-6">
            <div className="max-w-[88%] md:max-w-[80%] rounded-2xl bg-[#2a2a28] px-4 py-2.5 text-[14px] md:text-[15px] text-[#ececec]">
              k be honest — what do I actually reach for?
            </div>
          </div>

          {/* Thinking line */}
          <button className="flex items-center gap-1.5 mb-4 text-[13px] text-[#8a8a85] hover:text-[#aaa] transition-colors">
            <span>Recalled your favorites</span>
            <ChevronRight size={14} />
          </button>

          {/* Assistant — In Real Life */}
          <div className="font-lora text-[15px] md:text-[16px] leading-relaxed text-[#ece9e2] mb-6">
            <p className="mb-3"><span className="font-semibold">In Real Life</span> — the stuff that lives in your hands:</p>
            <ul className="list-disc pl-5 md:pl-6 space-y-1.5">
              {irl.map((item) => (
                <li key={item.name}>
                  <span className="font-semibold">{item.name}</span>{item.note ? `: ${item.note}` : ''}
                </li>
              ))}
            </ul>
          </div>

          {/* User follow-up */}
          <div className="flex justify-end mb-6">
            <div className="max-w-[88%] md:max-w-[80%] rounded-2xl bg-[#2a2a28] px-4 py-2.5 text-[14px] md:text-[15px] text-[#ececec]">
              yes. next
            </div>
          </div>

          {/* Assistant — In Your Tabs */}
          <div className="font-lora text-[15px] md:text-[16px] leading-relaxed text-[#ece9e2] mb-6">
            <p className="mb-3"><span className="font-semibold">In Your Tabs</span> — the stuff that earns a permanent open tab:</p>
            <ul className="list-disc pl-5 md:pl-6 space-y-1.5">
              {tabs.map((item) => (
                <li key={item.name}>
                  <span className="font-semibold">{item.name}</span>{item.note ? `: ${item.note}` : ''}
                </li>
              ))}
            </ul>
          </div>

          {/* Closing */}
          <div className="flex justify-end mb-6">
            <div className="max-w-[88%] md:max-w-[80%] rounded-2xl bg-[#2a2a28] px-4 py-2.5 text-[14px] md:text-[15px] text-[#ececec]">
              Wow. S-tier list right there.
            </div>
          </div>

          {/* Action row */}
          <div className="flex items-center gap-1 mt-3 text-[#8a8a85]">
            <button className="p-1.5 rounded-md hover:bg-[#2a2a28] hover:text-[#cfcfca] transition-colors"><Copy size={16} /></button>
            <button className="p-1.5 rounded-md hover:bg-[#2a2a28] hover:text-[#cfcfca] transition-colors"><Play size={16} /></button>
            <button className="p-1.5 rounded-md hover:bg-[#2a2a28] hover:text-[#cfcfca] transition-colors"><ThumbsUp size={16} /></button>
            <button className="p-1.5 rounded-md hover:bg-[#2a2a28] hover:text-[#cfcfca] transition-colors"><ThumbsDown size={16} /></button>
            <button className="p-1.5 rounded-md hover:bg-[#2a2a28] hover:text-[#cfcfca] transition-colors"><RotateCw size={16} /></button>
          </div>

          {/* Claude asterisk */}
          <div className="mt-4">
            <ClaudeAsterisk size={36} color="#c96442" />
          </div>
        </div>
      </div>

      {/* Composer */}
      <div className="flex-shrink-0 px-6 pb-3">
        <div className="relative max-w-[720px] mx-auto">
          {/* scroll-to-bottom button */}
          <button className="absolute -top-12 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#2a2a28] border border-[#3a3a38] flex items-center justify-center text-[#cfcfca] hover:bg-[#34332f] shadow-lg transition-colors">
            <ChevronDown size={18} />
          </button>

          <div className="rounded-2xl bg-[#252525] border border-[#34342f] shadow-xl">
            <div className="px-4 py-3.5">
              <span className="text-[15px] text-[#6a6a66]">A few of my favorite things</span>
            </div>
          </div>

          <p className="text-center text-[11px] text-[#5a5a56] mt-2.5">Claude is AI and can make mistakes. Please double-check responses.</p>
        </div>
      </div>
    </main>
  )
}

function ClaudeChatsView({ onNavigate }: { onNavigate: (v: string) => void }) {
  const chats = [
    { title: 'Who am I?', time: '2 minutes ago', view: 'whoami' },
    { title: 'Fav Things', time: '5 minutes ago', view: 'favthings' },
    { title: 'Principles I live by', time: '8 minutes ago', view: 'principles' },
    { title: 'Marathon Training Plan', time: '27 minutes ago', view: 'marathon' },
    { title: 'Book Recommendations', time: '45 minutes ago', view: 'books' },
    { title: 'Restaurant Recommendations', time: '3 hours ago', view: 'restaurants' },
  ]
  return (
    <main className="flex-1 flex flex-col h-full bg-[#1a1a1a] overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[820px] mx-auto px-4 md:px-8 pt-10 pb-20">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-lora text-[28px] text-[#ece9e2]">Chats</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('home')}
                className="px-3 py-1.5 rounded-lg bg-white text-[13px] text-[#1a1a1a] font-medium hover:bg-[#ececec] transition-colors"
              >
                New chat
              </button>
            </div>
          </div>

          {/* Chat list */}
          <div>
            {chats.map((c, i) => (
              <button
                key={i}
                onClick={() => onNavigate(c.view)}
                className="flex items-center justify-between w-full px-3 py-3.5 text-left border-b border-[#262624] hover:bg-[#222220] transition-colors"
              >
                <span className="text-[14px] text-[#d4d2cc]">{c.title}</span>
                <span className="text-[13px] text-[#6a6a66] flex-shrink-0 ml-4">{c.time}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

function ChromeLogo({ size = 40 }: { size?: number }) {
  return <img src="/chrome-icon.png" width={size} height={size} alt="Google Chrome" draggable={false} style={{ display: 'block' }} />
}

function Dock({ running, minimized, onOpenChrome, onRestore, onOpenTerminal, terminalRunning, terminalMinimized, onRestoreTerminal }: { running: boolean; minimized: boolean; onOpenChrome: () => void; onRestore: () => void; onOpenTerminal: () => void; terminalRunning: boolean; terminalMinimized: boolean; onRestoreTerminal: () => void }) {
  return (
    <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', zIndex: 60 }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6, padding: '4px 8px',
        background: 'rgba(255,255,255,0.16)', border: '1px solid rgba(255,255,255,0.22)',
        borderRadius: 16, backdropFilter: 'blur(28px) saturate(1.6)', WebkitBackdropFilter: 'blur(28px) saturate(1.6)',
        boxShadow: '0 12px 34px rgba(0,0,0,0.38)',
      }}>
        {/* Chrome app */}
        <button
          onClick={onOpenChrome}
          title="Google Chrome"
          aria-label="Google Chrome"
          className="group"
          style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}
        >
          <span
            className="transition-transform duration-150 group-hover:-translate-y-1 group-hover:scale-105"
            style={{ width: 44, height: 44, borderRadius: 11, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 8px rgba(0,0,0,0.18)' }}
          >
            <ChromeLogo size={38} />
          </span>
          <span style={{ width: 3.5, height: 3.5, borderRadius: '50%', background: running ? 'rgba(255,255,255,0.92)' : 'transparent' }} />
        </button>

        {/* Terminal app */}
        <button
          onClick={onOpenTerminal}
          title="Terminal"
          aria-label="Terminal"
          className="group"
          style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}
        >
          <span
            className="transition-transform duration-150 group-hover:-translate-y-1 group-hover:scale-105"
            style={{ width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 8px rgba(0,0,0,0.18)', overflow: 'hidden' }}
          >
            <img src="/terminal-icon.png" width={48} height={48} alt="Terminal" draggable={false} style={{ display: 'block', width: 48, height: 48, objectFit: 'cover' }} />
          </span>
          <span style={{ width: 3.5, height: 3.5, borderRadius: '50%', background: terminalRunning ? 'rgba(255,255,255,0.92)' : 'transparent' }} />
        </button>

        {/* Minimized windows — appear to the right, past a divider */}
        {(minimized || terminalMinimized) && (
          <span style={{ width: 1, height: 38, background: 'rgba(255,255,255,0.32)', margin: '0 2px' }} />
        )}
        {minimized && (
          <button
            onClick={onRestore}
            title="Claude — Google Chrome"
            aria-label="Restore window"
            className="group"
            style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}
          >
            <span
              className="transition-transform duration-150 group-hover:-translate-y-1 group-hover:scale-105"
              style={{ width: 44, height: 44, borderRadius: 11, background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 8px rgba(0,0,0,0.18)' }}
            >
              <svg width="24" height="24" viewBox="0 0 100 100"><path d={CLAUDE_SYMBOL_PATH} fill="#d97757" /></svg>
            </span>
          </button>
        )}
        {terminalMinimized && (
          <button
            onClick={onRestoreTerminal}
            title="Terminal — -zsh"
            aria-label="Restore terminal"
            className="group"
            style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}
          >
            <span
              className="transition-transform duration-150 group-hover:-translate-y-1 group-hover:scale-105"
              style={{ width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 8px rgba(0,0,0,0.18)', overflow: 'hidden' }}
            >
              <img src="/terminal-icon.png" width={48} height={48} alt="Terminal" draggable={false} style={{ display: 'block', width: 48, height: 48, objectFit: 'cover' }} />
            </span>
          </button>
        )}
      </div>
    </div>
  )
}

export default function App() {
  const [view, setView] = useState('home')
  const [windowOpen, setWindowOpen] = useState(true)
  const [minimized, setMinimized] = useState(false)
  const [maximized, setMaximized] = useState(false)
  const isMobile = useIsMobile()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [showTerminal, setShowTerminal] = useState(false)
  const [terminalMinimized, setTerminalMinimized] = useState(false)
  const openTerminal = () => { setShowTerminal(true); setTerminalMinimized(false) }
  const fullScreen = maximized || isMobile

  // Floating-window geometry (coords relative to the desktop area below the menu bar).
  const MENUBAR_H = 30                 // menu bar height (also the desktop area's top offset)
  const DOCK_RESERVED = 70             // vertical space the dock occupies at the bottom
  const MIN_W = 520, MIN_H = 380
  const maxBottom = () => window.innerHeight - MENUBAR_H - DOCK_RESERVED  // window bottom can't pass this
  // Proportional geometry that keeps the whole mock window inside the viewport.
  const defaultGeom = () => {
    const w = Math.max(MIN_W, Math.round(window.innerWidth * 0.94))
    const h = Math.max(MIN_H, Math.min(Math.round(window.innerHeight * 0.90), maxBottom() - 14))
    return { w, h, x: Math.round((window.innerWidth - w) / 2), y: 6 }
  }
  const [winSize, setWinSize] = useState(() => { const g = defaultGeom(); return { w: g.w, h: g.h } })
  const [winPos, setWinPos] = useState(() => { const g = defaultGeom(); return { x: g.x, y: g.y } })
  const [resizing, setResizing] = useState(false)
  const [dragging, setDragging] = useState(false)
  const resizeRef = useRef({ dir: '', startX: 0, startY: 0, startW: 0, startH: 0, startLeft: 0, startTop: 0 })
  const dragRef = useRef({ offX: 0, offY: 0 })

  useEffect(() => {
    if (!resizing) return
    const move = (e: MouseEvent) => {
      const r = resizeRef.current
      const dx = e.clientX - r.startX
      const dy = e.clientY - r.startY
      const right = r.startLeft + r.startW
      const bottom = r.startTop + r.startH
      const botLimit = maxBottom()
      let w = r.startW, h = r.startH, x = r.startLeft, y = r.startTop
      if (r.dir.includes('e')) w = Math.min(window.innerWidth - r.startLeft, Math.max(MIN_W, r.startW + dx))
      if (r.dir.includes('s')) h = Math.min(botLimit - r.startTop, Math.max(MIN_H, r.startH + dy))
      if (r.dir.includes('w')) { w = Math.max(MIN_W, r.startW - dx); x = right - w; if (x < 0) { x = 0; w = right } }
      if (r.dir.includes('n')) { h = Math.max(MIN_H, r.startH - dy); y = bottom - h; if (y < 0) { y = 0; h = bottom } }
      setWinSize({ w, h })
      setWinPos({ x, y })
    }
    const up = () => setResizing(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseup', up)
    }
  }, [resizing])

  useEffect(() => {
    if (!dragging) return
    const move = (e: MouseEvent) => {
      const botLimit = maxBottom()
      let x = e.clientX - dragRef.current.offX
      let y = e.clientY - dragRef.current.offY
      x = Math.max(0, Math.min(x, window.innerWidth - winSize.w))
      y = Math.max(0, Math.min(y, botLimit - winSize.h))
      setWinPos({ x, y })
    }
    const up = () => setDragging(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseup', up)
    }
  }, [dragging, winSize])

  // Keep the floating window fitted to the viewport as the browser is resized.
  useEffect(() => {
    if (maximized || isMobile) return  // full-screen branch fills the viewport on its own
    const onResize = () => {
      const g = defaultGeom()
      setWinSize({ w: g.w, h: g.h })
      setWinPos({ x: g.x, y: g.y })
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [maximized, isMobile])

  const startResize = (dir: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    resizeRef.current = { dir, startX: e.clientX, startY: e.clientY, startW: winSize.w, startH: winSize.h, startLeft: winPos.x, startTop: winPos.y }
    setResizing(true)
  }

  const startDrag = (e: React.MouseEvent) => {
    if (maximized || isMobile) return
    if ((e.target as HTMLElement).closest('button, a, input')) return  // don't drag when hitting controls
    dragRef.current = { offX: e.clientX - winPos.x, offY: e.clientY - winPos.y }
    setDragging(true)
  }

  // The browser window: Chrome chrome + the Claude app.
  const navigate = (v: string) => { setView(v); setDrawerOpen(false) }

  const windowChrome = (
    <>
      <div className="flex flex-col flex-shrink-0 bg-[#1d1d1f]">
        <ChromeTabStrip
          onClose={() => { setMinimized(false); setWindowOpen(false) }}
          onMinimize={() => setMinimized(true)}
          onMaximize={() => setMaximized(m => !m)}
          onDragStart={startDrag}
        />
        <ChromeToolbar onMenu={() => setDrawerOpen(true)} />
        <BookmarksBar />
      </div>

      {/* Claude App */}
      <div className="flex flex-1 overflow-hidden bg-[#1a1a1a]">
        <ClaudeSidebar onNavigate={navigate} isMobile={isMobile} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        {view === 'home' && <ClaudeHomeView />}
        {view === 'code' && <ClaudeCodeView onOpenTerminal={openTerminal} />}
        {view === 'marathon' && <ClaudeChatView />}
        {view === 'chats' && <ClaudeChatsView onNavigate={navigate} />}
        {view === 'principles' && <ClaudeChatViewPrinciples />}
        {view === 'favthings' && <ClaudeChatViewFavThings />}
        {view === 'whoami' && <ClaudeChatViewWhoAmI />}
        {view === 'books' && <ClaudeChatViewBooks />}
        {view === 'restaurants' && <ClaudeChatViewRestaurants />}
      </div>
    </>
  )

  const resizeHandles = (
    <>
      <div onMouseDown={startResize('n')}  style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, cursor: 'ns-resize', zIndex: 40 }} />
      <div onMouseDown={startResize('s')}  style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 6, cursor: 'ns-resize', zIndex: 40 }} />
      <div onMouseDown={startResize('e')}  style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 6, cursor: 'ew-resize', zIndex: 40 }} />
      <div onMouseDown={startResize('w')}  style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 6, cursor: 'ew-resize', zIndex: 40 }} />
      <div onMouseDown={startResize('nw')} style={{ position: 'absolute', top: 0, left: 0, width: 16, height: 16, cursor: 'nwse-resize', zIndex: 41 }} />
      <div onMouseDown={startResize('ne')} style={{ position: 'absolute', top: 0, right: 0, width: 16, height: 16, cursor: 'nesw-resize', zIndex: 41 }} />
      <div onMouseDown={startResize('sw')} style={{ position: 'absolute', bottom: 0, left: 0, width: 16, height: 16, cursor: 'nesw-resize', zIndex: 41 }} />
      <div onMouseDown={startResize('se')} style={{ position: 'absolute', bottom: 0, right: 0, width: 16, height: 16, cursor: 'nwse-resize', zIndex: 41 }} />
    </>
  )

  return (
    <div
      className="flex flex-col h-screen w-screen overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: 'url(/sequoia-sunrise.jpeg)' }}
    >
      <MacMenuBar />

      <div className="relative flex-1 overflow-hidden">
        {windowOpen && !minimized ? (
          fullScreen ? (
            <div className="absolute inset-0 flex flex-col overflow-hidden">
              {windowChrome}
            </div>
          ) : (
            <div
              className="absolute flex flex-col overflow-hidden rounded-[10px] border border-black/40 shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
              style={{ left: winPos.x, top: winPos.y, width: winSize.w, height: winSize.h }}
            >
              {windowChrome}
              {resizeHandles}
            </div>
          )
        ) : !windowOpen ? (
          // Screensaver: wallpaper shows through; click anywhere to reopen the window.
          <button
            onClick={() => setWindowOpen(true)}
            aria-label="Open window"
            className="absolute inset-0 w-full h-full cursor-default"
          />
        ) : null}

        {/* Desktop: dock always shows. Mobile: only when the window is exed out
            (or a terminal is minimized and needs restoring). */}
        {(!isMobile || !windowOpen || (showTerminal && terminalMinimized)) && (
          <Dock
            running={windowOpen}
            minimized={windowOpen && minimized}
            onOpenChrome={() => { setMinimized(false); setWindowOpen(true) }}
            onRestore={() => { setMinimized(false); setWindowOpen(true) }}
            onOpenTerminal={openTerminal}
            terminalRunning={showTerminal}
            terminalMinimized={showTerminal && terminalMinimized}
            onRestoreTerminal={() => setTerminalMinimized(false)}
          />
        )}

        {showTerminal && !terminalMinimized && (
          <TerminalWindow
            onClose={() => { setShowTerminal(false); setTerminalMinimized(false) }}
            onMinimize={() => setTerminalMinimized(true)}
          />
        )}
      </div>
    </div>
  )
}
