import { useState, useMemo } from 'react'
import { Card } from '../components/Card.jsx'
import { Badge } from '../components/Badge.jsx'
import { Input } from '../components/Input.jsx'
import { SectionTitle } from '../components/SectionTitle.jsx'

const LOGS = [
  { time:'14:23:01', level:'WARN',  source:'auth.log',     msg:'Failed SSH login from 192.168.1.105 (3 attempts)' },
  { time:'14:22:47', level:'INFO',  source:'access.log',   msg:'GET /admin HTTP/1.1 200 — from 10.0.0.42' },
  { time:'14:22:33', level:'ERROR', source:'app.log',      msg:'SQL error: unescaped input detected in user query' },
  { time:'14:21:59', level:'WARN',  source:'firewall.log', msg:'Port scan detected from 203.0.113.56' },
  { time:'14:21:44', level:'INFO',  source:'auth.log',     msg:'User admin logged in successfully from 10.0.0.1' },
  { time:'14:20:12', level:'ERROR', source:'app.log',      msg:'XSS payload in form: <script>alert(document.cookie)</script>' },
  { time:'14:19:55', level:'WARN',  source:'auth.log',     msg:'Brute force blocked from 198.51.100.23 (10 attempts)' },
  { time:'14:18:30', level:'INFO',  source:'access.log',   msg:'POST /api/login HTTP/1.1 401 — invalid credentials' },
  { time:'14:17:22', level:'ERROR', source:'firewall.log', msg:'Outbound connection to known malicious IP: 185.220.101.45' },
  { time:'14:16:05', level:'WARN',  source:'app.log',      msg:'Unusual file access: /etc/passwd read by process www-data' },
  { time:'14:15:50', level:'INFO',  source:'auth.log',     msg:'Password changed for user: john.doe' },
  { time:'14:14:33', level:'ERROR', source:'app.log',      msg:'Directory traversal attempt: ../../../../etc/shadow' },
]

const LEVEL_COLOR = { INFO:'var(--accent-teal)', WARN:'var(--accent-yellow)', ERROR:'var(--accent-red)' }

export default function LogForensics() {
  const [filter, setFilter] = useState('ALL')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() =>
    LOGS.filter(l =>
      (filter === 'ALL' || l.level === filter) &&
      (search === '' || l.msg.toLowerCase().includes(search.toLowerCase()) || l.source.includes(search))
    ), [filter, search])

  const counts = { INFO: LOGS.filter(l=>l.level==='INFO').length, WARN: LOGS.filter(l=>l.level==='WARN').length, ERROR: LOGS.filter(l=>l.level==='ERROR').length }

  return (
    <div className="animate-fade">
      <SectionTitle color="var(--accent-pink)" icon="🧩">LOG FORENSICS — THREAT DETECTION & ANALYSIS</SectionTitle>
      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        {[
          { k:'ALL', color:'var(--accent-pink)', count: LOGS.length },
          { k:'ERROR', color:'var(--accent-red)',    count: counts.ERROR },
          { k:'WARN',  color:'var(--accent-yellow)', count: counts.WARN  },
          { k:'INFO',  color:'var(--accent-teal)',   count: counts.INFO  },
        ].map(f => (
          <button key={f.k} onClick={() => setFilter(f.k)} style={{
            background: filter === f.k ? f.color + '22' : 'none',
            border: `1px solid ${filter === f.k ? f.color : 'var(--border)'}`,
            color: filter === f.k ? f.color : 'var(--text-secondary)',
            padding: '7px 16px', borderRadius: 6, cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 1,
          }}>
            {f.k} <span style={{ opacity: 0.6 }}>({f.count})</span>
          </button>
        ))}
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search logs..." accent="var(--accent-pink)" style={{ flex: 1 }} />
      </div>

      <Card>
        <div style={{ display: 'grid', gridTemplateColumns: '75px 60px 120px 1fr', padding: '7px 14px', background: 'var(--bg-surface)', borderRadius: 6, marginBottom: 8, gap: 12 }}>
          {['TIME','LEVEL','SOURCE','MESSAGE'].map(h => (
            <div key={h} style={{ color: 'var(--text-dim)', fontSize: 9, fontFamily: 'var(--font-mono)', letterSpacing: 1 }}>{h}</div>
          ))}
        </div>
        <div style={{ maxHeight: 400, overflowY: 'auto' }}>
          {filtered.map((l, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '75px 60px 120px 1fr', padding: '9px 14px', borderBottom: '1px solid var(--border-dim)', alignItems: 'center', gap: 12, transition: 'background 0.1s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>{l.time}</span>
              <Badge color={LEVEL_COLOR[l.level]}>{l.level}</Badge>
              <span style={{ color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>{l.source}</span>
              <span style={{ color: l.level === 'ERROR' ? '#ffaaaa' : l.level === 'WARN' ? '#ffe4a0' : 'var(--text-primary)', fontSize: 12 }}>{l.msg}</span>
            </div>
          ))}
          {filtered.length === 0 && <div style={{ padding: '20px 14px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>No matching entries.</div>}
        </div>
      </Card>
    </div>
  )
}
