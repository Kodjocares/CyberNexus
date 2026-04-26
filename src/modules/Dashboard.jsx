import { Card } from '../components/Card.jsx'
import { Badge } from '../components/Badge.jsx'
import { SectionTitle } from '../components/SectionTitle.jsx'

const STATS = [
  { label: 'Modules Active',   value: 11, color: 'var(--accent-green)'  },
  { label: 'Threats Detected', value: 3,  color: 'var(--accent-red)'    },
  { label: 'CVEs Monitored',   value: 5,  color: 'var(--accent-orange)' },
  { label: 'Files Monitored',  value: 8,  color: 'var(--accent-teal)'   },
]

const CVE_FEED = [
  { id: 'CVE-2024-1234', sev: 'CRITICAL', score: 9.8 },
  { id: 'CVE-2024-5678', sev: 'HIGH',     score: 7.5 },
  { id: 'CVE-2024-9101', sev: 'HIGH',     score: 8.1 },
]

const LOG_FEED = [
  { level: 'ERROR', msg: 'SQL error: unescaped input detected in query' },
  { level: 'WARN',  msg: 'Failed SSH login from 192.168.1.105 (3 attempts)' },
  { level: 'WARN',  msg: 'Port scan detected from 203.0.113.56' },
]

const MODULES = [
  { id: 'vault',         label: 'Password Vault',    icon: '🔐', color: 'var(--accent-cyan)'   },
  { id: 'scanner',       label: 'Port Scanner',      icon: '📡', color: 'var(--accent-orange)' },
  { id: 'integrity',     label: 'File Integrity',    icon: '🔎', color: 'var(--accent-purple)' },
  { id: 'web',           label: 'Web Security',      icon: '🌐', color: 'var(--accent-yellow)' },
  { id: 'crypto',        label: 'Cryptography',      icon: '🔑', color: 'var(--accent-teal)'   },
  { id: 'forensics',     label: 'Log Forensics',     icon: '🧩', color: 'var(--accent-pink)'   },
  { id: 'cve',           label: 'CVE Monitor',       icon: '⚠️', color: 'var(--accent-orange)' },
  { id: 'osint',         label: 'OSINT Tool',        icon: '🕵️', color: 'var(--accent-blue)'   },
  { id: 'steganography', label: 'Steganography',     icon: '🖼️', color: '#e879f9'              },
  { id: 'hash',          label: 'Hash Cracker',      icon: '💥', color: 'var(--accent-red)'    },
  { id: 'phishing',      label: 'Phishing Detector', icon: '🎣', color: 'var(--accent-green)'  },
]

const sevColor = { CRITICAL: 'var(--accent-red)', HIGH: 'var(--accent-orange)', MEDIUM: 'var(--accent-yellow)' }
const lvlColor = { ERROR: 'var(--accent-red)',    WARN: 'var(--accent-yellow)', INFO: 'var(--accent-teal)'     }

export default function Dashboard({ setActive }) {
  return (
    <div className="animate-fade">
      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 24 }}>
        {STATS.map(s => (
          <Card key={s.label} accent={s.color}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 38, fontWeight: 700, color: s.color, fontFamily: 'var(--font-mono)', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 10, color: 'var(--text-secondary)', marginTop: 6, letterSpacing: 1.5, fontFamily: 'var(--font-mono)' }}>{s.label.toUpperCase()}</div>
            </div>
          </Card>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        {/* CVE Feed */}
        <Card>
          <SectionTitle color="var(--accent-orange)" icon="⚠️">LIVE CVE FEED</SectionTitle>
          {CVE_FEED.map(c => (
            <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <Badge color={sevColor[c.sev]}>{c.sev}</Badge>
              <span style={{ color: 'var(--text-primary)', fontSize: 13, fontFamily: 'var(--font-mono)', flex: 1 }}>{c.id}</span>
              <span style={{ color: sevColor[c.sev], fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{c.score}</span>
            </div>
          ))}
          <button onClick={() => setActive('cve')} style={{ marginTop: 8, background: 'none', border: '1px solid var(--accent-orange)44', color: 'var(--accent-orange)', padding: '5px 12px', borderRadius: 4, cursor: 'pointer', fontSize: 10, fontFamily: 'var(--font-mono)' }}>
            VIEW ALL CVEs →
          </button>
        </Card>

        {/* Log Feed */}
        <Card>
          <SectionTitle color="var(--accent-pink)" icon="🧩">THREAT LOG FEED</SectionTitle>
          {LOG_FEED.map((l, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
              <Badge color={lvlColor[l.level]}>{l.level}</Badge>
              <span style={{ color: 'var(--text-secondary)', fontSize: 11 }}>{l.msg}</span>
            </div>
          ))}
          <button onClick={() => setActive('forensics')} style={{ marginTop: 8, background: 'none', border: '1px solid var(--accent-pink)44', color: 'var(--accent-pink)', padding: '5px 12px', borderRadius: 4, cursor: 'pointer', fontSize: 10, fontFamily: 'var(--font-mono)' }}>
            VIEW ALL LOGS →
          </button>
        </Card>
      </div>

      {/* Module Grid */}
      <Card>
        <SectionTitle color="var(--accent-cyan)" icon="⬡">ALL MODULES</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 10 }}>
          {MODULES.map(m => (
            <button key={m.id} onClick={() => setActive(m.id)} style={{
              background: m.color + '11', border: `1px solid ${m.color}44`, borderRadius: 8,
              padding: '14px 6px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = m.color + '25'; e.currentTarget.style.borderColor = m.color + '88' }}
              onMouseLeave={e => { e.currentTarget.style.background = m.color + '11'; e.currentTarget.style.borderColor = m.color + '44' }}
            >
              <div style={{ fontSize: 20 }}>{m.icon}</div>
              <div style={{ color: m.color, fontSize: 9, fontFamily: 'var(--font-mono)', marginTop: 6, letterSpacing: 0.5 }}>{m.label.toUpperCase()}</div>
            </button>
          ))}
        </div>
      </Card>
    </div>
  )
}
