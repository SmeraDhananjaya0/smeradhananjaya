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

// ─── macOS Menu Bar ───────────────────────────────────────────────────────────

const IC: React.CSSProperties = { display:'flex', alignItems:'center', justifyContent:'center', color:'#fff' }

function MacMenuBar() {
  const clock = useClockTime()
  return (
    <div style={{
      flexShrink: 0, height: 30, zIndex: 50, overflow: 'visible',
      display: 'flex', alignItems: 'center', padding: '0 12px 0 16px', color: '#fff',
      background: 'rgba(0,0,0,0.82)',
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
      <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:15 }}>
        {/* Media play */}
        <span style={IC}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.7">
            <circle cx="12" cy="12" r="9"/>
            <path d="M10 8.5l6 3.5-6 3.5z" fill="#fff" stroke="none"/>
          </svg>
        </span>
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
        {/* Live clock */}
        <span style={{ fontSize:13.5, letterSpacing:'.2px', whiteSpace:'nowrap' }}>{clock}</span>
      </div>
    </div>
  )
}

// ─── Chrome Tab Strip ────────────────────────────────────────────────────────

function ChromeTabStrip() {
  return (
    <div style={{ background:'#1d1d1f', height:42, display:'flex', alignItems:'flex-end', padding:'0 8px', flexShrink:0, userSelect:'none' }}>
      {/* Traffic lights */}
      <div style={{ display:'flex', alignItems:'center', gap:8, padding:'0 16px 0 6px', height:42 }}>
        <span style={{ width:12, height:12, borderRadius:'50%', background:'#ff5f57', display:'block' }}/>
        <span style={{ width:12, height:12, borderRadius:'50%', background:'#febc2e', display:'block' }}/>
        <span style={{ width:12, height:12, borderRadius:'50%', background:'#28c840', display:'block' }}/>
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
      <div style={{ display:'flex', alignItems:'center', marginBottom:7, marginLeft:8, flexShrink:0 }}>
        <button style={{ width:28, height:28, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', color:'#b8bcc2', background:'transparent', border:'none', cursor:'pointer' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
        </button>
      </div>

      {/* Ask Gemini — far right */}
      <div style={{ display:'flex', alignItems:'center', marginBottom:7, marginLeft:'auto', flexShrink:0 }}>
        <button style={{ display:'flex', alignItems:'center', gap:7, background:'#3a3a3c', border:'none', padding:'7px 14px', borderRadius:12, fontSize:13.5, fontWeight:500, color:'#fff', cursor:'pointer' }}>
          <GeminiIcon size={16} /> Ask Gemini
        </button>
      </div>
    </div>
  )
}

// ─── Chrome Toolbar ──────────────────────────────────────────────────────────

const TB_BTN: React.CSSProperties = { width:34, height:34, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', color:'#e8eaed', flexShrink:0, background:'transparent', border:'none', cursor:'pointer' }
const SEP: React.CSSProperties   = { width:1, height:22, background:'rgba(255,255,255,.16)', margin:'0 6px', flexShrink:0 }

function ChromeToolbar() {
  return (
    <div style={{ background:'#393a3f', height:46, display:'flex', alignItems:'center', gap:4, padding:'0 10px', flexShrink:0, userSelect:'none' }}>
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

      {/* Omnibox */}
      <div style={{ flex:1, height:34, margin:'0 10px', background:'#171719', borderRadius:18, display:'flex', alignItems:'center', gap:11, padding:'0 16px', color:'#b8bcc2', fontSize:13.5 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
          <path d="M3 7h10M17 7h4"/><circle cx="15" cy="7" r="2.2"/>
          <path d="M3 17h4M11 17h10"/><circle cx="9" cy="17" r="2.2"/>
        </svg>
        <span><span style={{ color:'#e8eaed' }}>claude.ai</span>/chat/78a22cc0-798a-4c76-9347-af8d8a5d902c</span>
      </div>

      {/* Extensions (puzzle piece) */}
      <button style={TB_BTN}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c5c8cd" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
          <path d="M6 6 L9.5 6 A2.5 2.5 0 0 1 14.5 6 L18 6 Q20 6 20 8 L20 9.5 A2.5 2.5 0 0 1 20 14.5 L20 18 Q20 20 18 20 L6 20 Q4 20 4 18 L4 14.5 A2.5 2.5 0 0 0 4 9.5 L4 8 Q4 6 6 6 Z"/>
        </svg>
      </button>
      <div style={SEP}/>
      {/* Avatar */}
      <div style={{ width:27, height:27, borderRadius:'50%', background:'#6e40c9', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, margin:'0 4px', flexShrink:0 }}>S</div>
      {/* New Chrome available + menu (combined pill) */}
      <button style={{ display:'flex', alignItems:'center', gap:10, background:'#2f5c8f', color:'#fff', fontSize:13, padding:'8px 14px', borderRadius:20, whiteSpace:'nowrap', border:'none', cursor:'pointer' }}>
        New Chrome available
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="5"  r="1.7"/>
          <circle cx="12" cy="12" r="1.7"/>
          <circle cx="12" cy="19" r="1.7"/>
        </svg>
      </button>
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
  'Marathon Training Plan',
  'Book Recommendations',
  'Restaurant Recommendations',
]

function ClaudeSidebar({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [activeItem, setActiveItem] = useState('New chat')
  const [activeRecent, setActiveRecent] = useState(0)

  const navItems = [
    { icon: <Plus size={14} />,            label: 'New chat',  view: 'home' },
    { icon: <MessagesSquare size={14} />,  label: 'Chats',     view: 'chats' },
  ]

  return (
    <aside className="flex flex-col w-[248px] min-w-[248px] bg-[#1c1c1c] h-full overflow-hidden border-r border-[#2a2a2a]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <span className="font-lora text-[17px] font-medium text-[#e8e0d4] tracking-[-0.3px]">Claude</span>
      </div>

      {/* Nav */}
      <nav className="px-2 mb-2">
        {navItems.map(({ icon, label, view }) => (
          <button
            key={label}
            onClick={() => { setActiveItem(label); if (view) onNavigate(view) }}
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
          onClick={() => { setActiveItem('Code'); onNavigate('code') }}
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
          onClick={() => { setActiveItem('Who am I?'); onNavigate('whoami') }}
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
                if (chat === 'Marathon Training Plan') onNavigate('marathon')
                else if (chat === 'Book Recommendations') onNavigate('books')
                else if (chat === 'Restaurant Recommendations') onNavigate('restaurants')
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

          {/* panel — compact, opens upward, right-aligned to the pill */}
          <div className="absolute bottom-full right-0 mb-2.5 w-[360px] z-50 p-1.5 rounded-2xl bg-[#2b2a28] border border-[#3a3a38] shadow-[0_20px_50px_rgba(0,0,0,0.55)]">
            {/* Disabled / unavailable */}
            <div className="px-3.5 py-2 rounded-[10px] cursor-default">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <span className="text-[15px] font-[450] leading-[1.3] text-[#67675f]">Myth atp 20</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#33332f] text-[12px] text-[#8a8a85] whitespace-nowrap">
                  <Info size={12} />
                  Currently unavailable until Sept 30t
                </span>
              </div>
              <div className="text-[13px] leading-[1.3] text-[#67675f] mt-px">For your toughest challenges</div>
            </div>

            {/* Selectable models */}
            {MODELS.map(({ name, sub }) => (
              <button
                key={name}
                onClick={() => { setSelected(name); setOpen(false) }}
                className="flex items-center w-full text-left px-3.5 py-2 rounded-[10px] hover:bg-[#34332f] transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-[15px] font-[450] leading-[1.3] text-[#f2f2ef]">{name}</div>
                  <div className="text-[13px] leading-[1.3] text-[#8a8a85] mt-px">{sub}</div>
                </div>
                {selected === name && (
                  <Check size={16} strokeWidth={2.5} className="text-[#4a9eff] flex-shrink-0 ml-2.5" />
                )}
              </button>
            ))}

            <div className="h-px bg-[#3a3a38] my-1" />

            {/* Effort */}
            <button className="flex items-center w-full px-3.5 py-2 rounded-[10px] hover:bg-[#34332f] transition-colors">
              <span className="text-[15px] font-[450] text-[#f2f2ef]">Effort</span>
              <span className="ml-auto flex items-center gap-1.5 text-[#8a8a85] text-[14px]">
                High
                <ChevronRight size={15} />
              </span>
            </button>

            <div className="h-px bg-[#3a3a38] my-1" />

            {/* More models */}
            <button className="flex items-center w-full px-3.5 py-2 rounded-[10px] hover:bg-[#34332f] transition-colors">
              <span className="text-[15px] font-[450] text-[#f2f2ef]">More models</span>
              <ChevronRight size={15} className="ml-auto text-[#8a8a85]" />
            </button>
          </div>
        </>
      )}
    </div>
  )
}

function ClaudeHomeView() {
  const [input, setInput] = useState('')

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
      <div className="flex flex-col items-center justify-center flex-1 px-6 pb-8">
        {/* Asterisk + "smera returns!" */}
        <div className="flex items-center gap-4 mb-10">
          <ClaudeAsterisk size={54} color="#c96442" />
          <h1 className="font-lora text-[42px] font-medium tracking-[-1px] text-[#e8d5c4] leading-none">
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

function TerminalWindow({ onClose }: { onClose: () => void }) {
  const W = 520                       // windowed width
  const IMG_W = 1130, IMG_H = 576     // natural image size
  const cropPct = 0                   // image has no baked-in title bar
  const contentH = Math.round(W * IMG_H / IMG_W)

  const [pos, setPos] = useState({ x: window.innerWidth / 2 - W / 2, y: 140 })
  const [dragging, setDragging] = useState(false)
  const offset = useRef({ x: 0, y: 0 })

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

  const startDrag = (e: React.MouseEvent) => {
    offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y }
    setDragging(true)
  }

  const frameStyle: React.CSSProperties = { position: 'fixed', left: pos.x, top: pos.y, width: W, borderRadius: 12, zIndex: 50 }

  return (
    <div style={frameStyle} className="overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.55)] border border-black/50 select-none">
      {/* title bar (drag handle) */}
      <div
        onMouseDown={startDrag}
        className="relative flex items-center h-7 px-3 bg-gradient-to-b from-[#3b3b3b] to-[#2b2b2b] cursor-grab active:cursor-grabbing"
      >
        <div className="flex items-center gap-2 group">
          {/* red — close */}
          <button onClick={onClose} aria-label="Close" className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff4036] flex items-center justify-center">
            <X size={8} strokeWidth={3} className="text-black/60 opacity-0 group-hover:opacity-100" />
          </button>
          {/* yellow — hide (same as close) */}
          <button onClick={onClose} aria-label="Hide" className="w-3 h-3 rounded-full bg-[#febc2e] hover:bg-[#f5a623] flex items-center justify-center">
            <span className="block w-1.5 h-[1.5px] bg-black/60 opacity-0 group-hover:opacity-100" />
          </button>
          {/* green — inactive */}
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="absolute left-1/2 -translate-x-1/2 text-[12px] text-[#c9c9c4] font-medium pointer-events-none">smeradhananjaya — -zsh</span>
      </div>
      {/* terminal content */}
      <div style={{ height: contentH, overflow: 'hidden', background: '#ff3ff0' }}>
        <img
          src="/terminal.png?v=8"
          alt="Terminal"
          style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain', marginTop: `-${cropPct}%` }}
        />
      </div>
    </div>
  )
}

function ClaudeCodeView() {
  const [showTerminal, setShowTerminal] = useState(false)
  const tools: { icon: React.ReactNode; label: string; href: string; onClick?: () => void }[] = [
    { icon: <Terminal size={15} />,             label: 'Terminal', href: '', onClick: () => setShowTerminal(true) },
    { icon: <CursorIcon size={15} />,           label: 'Cursor',   href: 'https://cursor.com/get-started?utm_source=google_paid&utm_campaign=[Search]%20[Brand]%20[EN]%20[Core%20T1]%20[Broad]%20[VBB]%20Brand&utm_term=cursor&utm_medium=paid&utm_content=798404224783&cc_platform=google&cc_campaignid=23656700841&cc_adgroupid=195242436478&cc_adid=798404224783&cc_keyword=cursor&cc_matchtype=b&cc_device=c&cc_network=g&cc_placement=&cc_location=9061285&cc_adposition=&gad_source=1&gad_campaignid=23656700841&gbraid=0AAAABAkdGgQ0YcfP9_Nkmzgn9gbLVwy2s&gclid=CjwKCAjwxb7RBhA5EiwAQ-AAdJIYUcT6t7fwlwMMmchAW_EzQwkAaiAZMlEXTWxnXTgJY6EW68hVyxoCYdoQAvD_BwE' },
    { icon: <ClaudeAsterisk size={15} color="#d97757" />, label: 'Claude', href: 'https://claude.com/product/claude-code' },
    { icon: <SupabaseIcon size={15} />,         label: 'Supabase', href: 'https://supabase.com/' },
    { icon: <PaperIcon size={15} />,            label: 'Paper',    href: 'https://paper.design/' },
  ]
  return (
    <main className="flex-1 h-full bg-[#1a1a1a] overflow-y-auto">
      <div className="max-w-3xl mx-auto px-8 py-16">
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

      {/* Terminal window */}
      {showTerminal && <TerminalWindow onClose={() => setShowTerminal(false)} />}
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
      <div className="flex items-center gap-1.5 px-6 py-3 flex-shrink-0">
        <span className="text-[15px] text-[#cfcfca]">Marathon Training Plan</span>
      </div>

      {/* Conversation */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[720px] mx-auto px-6 pt-4 pb-40">
          {/* User message */}
          <div className="flex justify-end mb-6">
            <div className="max-w-[80%] rounded-2xl bg-[#2a2a28] px-4 py-2.5 text-[15px] text-[#ececec]">
              Generate a marathon training plan for me
            </div>
          </div>

          {/* Thinking line */}
          <button className="flex items-center gap-1.5 mb-4 text-[13px] text-[#8a8a85] hover:text-[#aaa] transition-colors">
            <span>Synthesized marathon training plan</span>
            <ChevronRight size={14} />
          </button>

          {/* Assistant message */}
          <div className="font-lora text-[16px] leading-relaxed text-[#ece9e2]">
            <p className="font-semibold mb-4">⚠️ Fair warning: Marathon training is gonna be HARD</p>

            <p className="font-semibold mb-3">16-Week Marathon Plan (The Quick Version)</p>

            <p className="font-semibold mb-1">Weeks 1-4: Base Building</p>
            <ul className="list-disc pl-6 mb-4 space-y-0.5">
              <li>Run 20-24 miles/week</li>
              <li>Long run: 6-8 miles</li>
              <li>Mix of easy runs and one speed workout per week</li>
              <li>Rest 1-2 days</li>
            </ul>

            <p className="font-semibold mb-1">Weeks 5-8: Building</p>
            <ul className="list-disc pl-6 mb-4 space-y-0.5">
              <li>Run 25-32 miles/week</li>
              <li>Long run: 10-13 miles</li>
              <li>Add tempo runs, intervals</li>
              <li>Keep 1 rest day</li>
            </ul>

            <p className="font-semibold mb-1">Weeks 9-12: Peak</p>
            <ul className="list-disc pl-6 mb-4 space-y-0.5">
              <li>Run 30-39 miles/week (max effort)</li>
              <li>Long run: 15-18 miles</li>
              <li>Lots of speed work</li>
              <li>Recovery weeks every 4 weeks</li>
            </ul>

            <p className="font-semibold mb-1">Weeks 13-15: Taper Down</p>
            <ul className="list-disc pl-6 mb-4 space-y-0.5">
              <li>Run 14-29 miles/week</li>
              <li>Cut volume in half basically</li>
              <li>Long run: 5-12 miles</li>
              <li>Stay fresh</li>
            </ul>

            <p className="font-semibold mb-1">Week 16: Race Week</p>
            <ul className="list-disc pl-6 mb-4 space-y-0.5">
              <li>Light running only</li>
              <li>Rest up</li>
              <li><strong className="font-semibold">RUN THE MARATHON</strong></li>
            </ul>

            <p className="font-semibold mb-1">Weekly Schedule:</p>
            <ul className="list-disc pl-6 mb-4 space-y-0.5">
              <li>1 long run (Saturday)</li>
              <li>1 speed workout (Tuesday - tempo, intervals, whatever)</li>
              <li>3-4 easy runs</li>
              <li>1-2 rest days</li>
            </ul>

            <p className="font-semibold mb-1">Don't Die Tips:</p>
            <ul className="list-disc pl-6 mb-4 space-y-0.5">
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
            <div className="max-w-[80%] rounded-2xl bg-[#2a2a28] px-4 py-2.5 text-[15px] text-[#ececec] leading-relaxed">
              After I run the marathon, I have a half marathon 15 days later and then another half 2 weeks after that. Do you think that's possible?
            </div>
          </div>

          {/* Assistant message */}
          <div className="font-lora text-[16px] leading-relaxed text-[#ece9e2] mt-6">
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
      <div className="flex items-center gap-1.5 px-6 py-3 flex-shrink-0">
        <span className="text-[15px] text-[#cfcfca]">Who am I?</span>
      </div>

      {/* Conversation */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[720px] mx-auto px-6 pt-4 pb-40">
          {/* User message */}
          <div className="flex justify-end mb-6">
            <div className="max-w-[80%] rounded-2xl bg-[#2a2a28] px-4 py-2.5 text-[15px] text-[#ececec]">
              Who am I?
            </div>
          </div>

          {/* Thinking line */}
          <button className="flex items-center gap-1.5 mb-4 text-[13px] text-[#8a8a85] hover:text-[#aaa] transition-colors">
            <span>Thought about the question</span>
            <ChevronRight size={14} />
          </button>

          {/* Assistant message */}
          <div className="font-lora text-[16px] leading-relaxed text-[#ece9e2]">
            <p className="font-semibold mb-2">About You:</p>
            <p className="mb-1">Smera Dhananjaya 💝</p>
            <p className="mb-1">
              <a href="https://x.com/Northeastern" target="_blank" rel="noopener noreferrer" className="text-[#7aa2e3] hover:underline">@Northeastern</a>
            </p>
            <p className="mb-4">CS, <a href="https://www.gnxl.org/" target="_blank" rel="noopener noreferrer" className="text-[#7aa2e3] hover:underline">STEM education advocate</a>, building w/ intention</p>

            <p className="font-semibold mb-2">Quick Links</p>
            <ul className="list-disc pl-6 space-y-1">
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
      <div className="flex items-center gap-1.5 px-6 py-3 flex-shrink-0">
        <span className="text-[15px] text-[#cfcfca]">Book Recommendations</span>
      </div>

      {/* Conversation */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[720px] mx-auto px-6 pt-4 pb-40">
          {/* User message */}
          <div className="flex justify-end mb-6">
            <div className="max-w-[80%] rounded-2xl bg-[#2a2a28] px-4 py-2.5 text-[15px] text-[#ececec]">
              Give me some book recommendations
            </div>
          </div>

          {/* Thinking line */}
          <button className="flex items-center gap-1.5 mb-4 text-[13px] text-[#8a8a85] hover:text-[#aaa] transition-colors">
            <span>Curated book recommendations</span>
            <ChevronRight size={14} />
          </button>

          {/* Assistant message */}
          <div className="font-lora text-[16px] leading-relaxed text-[#ece9e2]">
            <p className="mb-3">Well knowing you, I understand these books to be your all time favorites Reading List (books u must read!!)</p>
            <ul className="list-disc pl-6 space-y-1">
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
      <div className="flex items-center gap-1.5 px-6 py-3 flex-shrink-0">
        <span className="text-[15px] text-[#cfcfca]">Restaurant Recommendations</span>
      </div>

      {/* Conversation */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[720px] mx-auto px-6 pt-4 pb-40">
          {/* User message */}
          <div className="flex justify-end mb-6">
            <div className="max-w-[80%] rounded-2xl bg-[#2a2a28] px-4 py-2.5 text-[15px] text-[#ececec]">
              Give me some restaurant recommendations
            </div>
          </div>

          {/* Thinking line */}
          <button className="flex items-center gap-1.5 mb-4 text-[13px] text-[#8a8a85] hover:text-[#aaa] transition-colors">
            <span>Curated restaurant recommendations</span>
            <ChevronRight size={14} />
          </button>

          {/* Assistant message */}
          <div className="font-lora text-[16px] leading-relaxed text-[#ece9e2]">
            <p className="mb-3">Well knowing you, here's a few favs from Boston and NY</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>La Boca, NY</li>
              <li>Cafe Zaffri, NY</li>
              <li>Jean's, NY</li>
              <li>Sendo (best takeout sushi!!), NY</li>
              <li>Yvonnes, Boston</li>
              <li>1928 Beacon Hill, Boston</li>
              <li>Springbone / Joe &amp; the Juice (for quick &amp; healthy), NY/Boston</li>
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

function ClaudeChatsView({ onNavigate }: { onNavigate: (v: string) => void }) {
  const chats = [
    { title: 'Who am I?', time: '2 minutes ago', view: 'whoami' },
    { title: 'Marathon Training Plan', time: '27 minutes ago', view: 'marathon' },
    { title: 'Book Recommendations', time: '45 minutes ago', view: 'books' },
    { title: 'Restaurant Recommendations', time: '3 hours ago', view: 'restaurants' },
  ]
  return (
    <main className="flex-1 flex flex-col h-full bg-[#1a1a1a] overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[820px] mx-auto px-8 pt-10 pb-20">
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

export default function App() {
  const [view, setView] = useState('home')

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <MacMenuBar />
      {/* Chrome layers sit on solid dark, hiding the wallpaper beneath them */}
      <div className="flex flex-col flex-shrink-0 bg-[#1d1d1f]">
        <ChromeTabStrip />
        <ChromeToolbar />
        <BookmarksBar />
      </div>

      {/* Claude App */}
      <div className="flex flex-1 overflow-hidden bg-[#1a1a1a]">
        <ClaudeSidebar onNavigate={setView} />
        {view === 'home' && <ClaudeHomeView />}
        {view === 'code' && <ClaudeCodeView />}
        {view === 'marathon' && <ClaudeChatView />}
        {view === 'chats' && <ClaudeChatsView onNavigate={setView} />}
        {view === 'whoami' && <ClaudeChatViewWhoAmI />}
        {view === 'books' && <ClaudeChatViewBooks />}
        {view === 'restaurants' && <ClaudeChatViewRestaurants />}
      </div>
    </div>
  )
}
