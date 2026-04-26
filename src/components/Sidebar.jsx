import { useState } from 'react'

const MODULES = [
  { id:'dashboard',     label:'Command Center',    icon:'⬡',  color:'var(--accent-green)'  },
  { id:'vault',         label:'Password Vault',    icon:'🔐', color:'var(--accent-cyan)'   },
  { id:'scanner',       label:'Port Scanner',      icon:'📡', color:'var(--accent-orange)' },
  { id:'integrity',     label:'File Integrity',    icon:'🔎', color:'var(--accent-purple)' },
  { id:'web',           label:'Web Security',      icon:'🌐', color:'var(--accent-yellow)' },
  { id:'crypto',        label:'Cryptography',      icon:'🔑', color:'var(--accent-teal)'   },
  { id:'forensics',     label:'Log Forensics',     icon:'🧩', color:'var(--accent-pink)'   },
  { id:'cve',           label:'CVE Monitor',       icon:'⚠️', color:'var(--accent-orange)' },
  { id:'osint',         label:'OSINT Tool',        icon:'🕵️', color:'var(--accent-blue)'   },
  { id:'steganography', label:'Steganography',     icon:'🖼️', color:'#e879f9'              },
  { id:'hash',          label:'Hash Cracker',      icon:'💥', color:'var(--accent-red)'    },
  { id:'phishing',      label:'Phishing Detector', icon:'🎣', color:'var(--accent-green)'  },
]

export default function Sidebar({ active, setActive }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside style={{
      width: collapsed ? 58 : 220, background: 'var(--bg-surface)',
      borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column',
      transition: 'width 0.25s ease', overflow: 'hidden', flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: collapsed ? '18px 13px' : '18px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10, height: 64 }}>
        <div style={{ width: 30, height: 30, background: 'var(--accent-green)15', border: '1px solid var(--accent-green)44', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-green)', fontSize: 15, flexShrink: 0 }}>⬡</div>
        {!collapsed && (
          <div>
            <div style={{ color: 'var(--accent-green)', fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, letterSpacing: 2 }}>CYBERNEXUS</div>
            <div style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: 1 }}>COMMAND CENTER v1.0</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '8px 0' }}>
        {MODULES.map(m => (
          <button key={m.id} onClick={() => setActive(m.id)} title={collapsed ? m.label : ''} style={{
            display: 'flex', alignItems: 'center', gap: 11, width: '100%',
            padding: collapsed ? '11px 14px' : '11px 16px',
            background: active === m.id ? m.color + '15' : 'none',
            border: 'none', borderLeft: `2px solid ${active === m.id ? m.color : 'transparent'}`,
            color: active === m.id ? m.color : 'var(--text-secondary)',
            cursor: 'pointer', textAlign: 'left', fontSize: 12,
            fontFamily: 'var(--font-ui)', fontWeight: active === m.id ? 600 : 400,
            transition: 'all 0.15s', whiteSpace: 'nowrap',
          }}
            onMouseEnter={e => { if (active !== m.id) { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'var(--bg-hover)' }}}
            onMouseLeave={e => { if (active !== m.id) { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'none' }}}
          >
            <span style={{ fontSize: 16, flexShrink: 0 }}>{m.icon}</span>
            {!collapsed && m.label}
          </button>
        ))}
      </nav>

      {/* Collapse toggle */}
      <div style={{ padding: 10, borderTop: '1px solid var(--border)' }}>
        <button onClick={() => setCollapsed(!collapsed)} style={{
          width: '100%', background: 'none', border: '1px solid var(--border)', color: 'var(--text-dim)',
          padding: '6px', borderRadius: 4, cursor: 'pointer', fontSize: 11, fontFamily: 'var(--font-mono)',
        }}>
          {collapsed ? '▶' : '◀ COLLAPSE'}
        </button>
      </div>
    </aside>
  )
}
