import { useRef, useEffect } from 'react'

/* ── Badge ── */
export function Badge({ color, children, size = 'sm' }) {
  const pad = size === 'sm' ? '2px 9px' : '4px 14px'
  const fs  = size === 'sm' ? 10 : 12
  return (
    <span style={{
      background: color + '20',
      border: `1px solid ${color}55`,
      color,
      padding: pad,
      borderRadius: 3,
      fontSize: fs,
      fontFamily: 'var(--font-mono)',
      letterSpacing: 1,
      whiteSpace: 'nowrap',
      display: 'inline-block',
    }}>{children}</span>
  )
}

/* ── Terminal ── */
export function Terminal({ lines, color = 'var(--green)', height = 180 }) {
  const ref = useRef()
  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight
  }, [lines])
  return (
    <div ref={ref} style={{
      background: '#030a10',
      border: `1px solid ${color}33`,
      borderRadius: 8,
      padding: '14px 16px',
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color,
      minHeight: height,
      maxHeight: height,
      overflowY: 'auto',
      lineHeight: 1.7,
    }}>
      {lines.map((l, i) => <div key={i}>{l}</div>)}
      <span style={{ animation: 'blink 1s step-end infinite' }}>█</span>
    </div>
  )
}

/* ── Card ── */
export function Card({ children, accent, style = {} }) {
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: `1px solid ${accent ? accent + '44' : 'var(--border)'}`,
      borderRadius: 10,
      padding: 20,
      ...style,
    }}>
      {children}
    </div>
  )
}

/* ── Section Title ── */
export function SectionTitle({ color, icon, children }) {
  return (
    <div style={{
      color,
      fontFamily: 'var(--font-display)',
      fontSize: 16,
      fontWeight: 700,
      letterSpacing: 3,
      marginBottom: 20,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      textTransform: 'uppercase',
    }}>
      <span>{icon}</span>
      <span>{children}</span>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${color}44, transparent)`, marginLeft: 6 }} />
    </div>
  )
}

/* ── Input ── */
export function Input({ value, onChange, placeholder, style = {} }) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        background: 'var(--bg-input)',
        border: '1px solid var(--border)',
        borderRadius: 6,
        padding: '9px 14px',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        outline: 'none',
        width: '100%',
        ...style,
      }}
      onFocus={e => e.target.style.borderColor = '#2a5f9a'}
      onBlur={e => e.target.style.borderColor = 'var(--border)'}
    />
  )
}

/* ── Textarea ── */
export function Textarea({ value, onChange, placeholder, rows = 4, style = {} }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      style={{
        background: 'var(--bg-input)',
        border: '1px solid var(--border)',
        borderRadius: 6,
        padding: '10px 14px',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        outline: 'none',
        width: '100%',
        resize: 'none',
        lineHeight: 1.6,
        ...style,
      }}
      onFocus={e => e.target.style.borderColor = '#2a5f9a'}
      onBlur={e => e.target.style.borderColor = 'var(--border)'}
    />
  )
}

/* ── Button ── */
export function Btn({ color, onClick, disabled, children, variant = 'outline', style = {} }) {
  const base = {
    padding: '9px 20px',
    borderRadius: 6,
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: 'var(--font-mono)',
    fontSize: 12,
    letterSpacing: 1,
    transition: 'all 0.15s',
    whiteSpace: 'nowrap',
    ...style,
  }
  const styles = variant === 'solid'
    ? { ...base, background: color, border: `1px solid ${color}`, color: '#030b14', fontWeight: 700 }
    : { ...base, background: disabled ? 'transparent' : color + '18', border: `1px solid ${disabled ? 'var(--border)' : color}`, color: disabled ? 'var(--text-muted)' : color }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={styles}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.background = color + '30' }}
      onMouseLeave={e => { if (!disabled) e.currentTarget.style.background = disabled ? 'transparent' : color + '18' }}
    >
      {children}
    </button>
  )
}

/* ── Tab group ── */
export function Tabs({ tabs, active, onChange, color }) {
  return (
    <div style={{ display: 'flex', gap: 6, marginBottom: 18, flexWrap: 'wrap' }}>
      {tabs.map(t => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          style={{
            background: active === t.id ? color + '22' : 'none',
            border: `1px solid ${active === t.id ? color : 'var(--border)'}`,
            color: active === t.id ? color : 'var(--text-muted)',
            padding: '7px 16px',
            borderRadius: 6,
            cursor: 'pointer',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: 1,
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => { if (active !== t.id) e.currentTarget.style.color = 'var(--text-primary)' }}
          onMouseLeave={e => { if (active !== t.id) e.currentTarget.style.color = 'var(--text-muted)' }}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}

/* ── Progress bar ── */
export function ProgressBar({ value, max = 100, color }) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div style={{ width: '100%', height: 6, background: 'var(--border-dim)', borderRadius: 3, overflow: 'hidden' }}>
      <div style={{ height: '100%', width: pct + '%', background: color, borderRadius: 3, transition: 'width 0.6s ease' }} />
    </div>
  )
}

/* ── Severity color helper ── */
export function sevColor(sev) {
  return { CRITICAL: '#f87171', HIGH: '#fb923c', MEDIUM: '#fbbf24', LOW: '#34d399', INFO: '#60a5fa' }[sev] || '#8899aa'
}

/* ── Level color ── */
export function levelColor(level) {
  return { ERROR: '#f87171', WARN: '#fbbf24', INFO: '#34d399', DEBUG: '#60a5fa' }[level] || '#8899aa'
}
