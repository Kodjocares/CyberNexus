import { useState, useEffect } from 'react'
import { MODULES } from '../constants.js'

export default function Topbar({ active }) {
  const [time, setTime] = useState(new Date())
  const mod = MODULES.find(m => m.id === active)

  useEffect(() => {
    const iv = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(iv)
  }, [])

  const timeStr = time.toLocaleTimeString('en-GB', { hour12: false })
  const dateStr = time.toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 24px',
      height: 52,
      background: 'var(--bg-panel)',
      borderBottom: '1px solid var(--border)',
      flexShrink: 0,
    }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ color: 'var(--text-dim)', fontSize: 12, fontFamily: 'var(--font-mono)' }}>NEXUS</span>
        <span style={{ color: 'var(--border)', fontSize: 12 }}>›</span>
        <span style={{ fontSize: 16 }}>{mod?.icon}</span>
        <span style={{ color: mod?.color || 'var(--text-primary)', fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600, letterSpacing: 2 }}>
          {mod?.label?.toUpperCase()}
        </span>
      </div>

      {/* Status row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{
            width: 7, height: 7, borderRadius: '50%',
            background: 'var(--green)',
            boxShadow: '0 0 8px var(--green)',
            animation: 'pulse-dot 2s infinite',
          }} />
          <span style={{ color: 'var(--text-dim)', fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: 1 }}>ONLINE</span>
        </div>
        <div style={{ width: 1, height: 14, background: 'var(--border)' }} />
        <div style={{ color: 'var(--text-dim)', fontSize: 11, fontFamily: 'var(--font-mono)' }}>
          {dateStr}
        </div>
        <div style={{ color: 'var(--green)', fontSize: 13, fontFamily: 'var(--font-mono)', fontWeight: 600, minWidth: 70, textAlign: 'right' }}>
          {timeStr}
        </div>
      </div>
    </header>
  )
}
