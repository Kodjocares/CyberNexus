import { useState } from 'react'
import { Card } from '../components/Card.jsx'
import { Badge } from '../components/Badge.jsx'
import { Input } from '../components/Input.jsx'
import { SectionTitle } from '../components/SectionTitle.jsx'

const CVE_DATA = [
  { id:'CVE-2024-1234', sev:'CRITICAL', score:9.8, desc:'Remote code execution in OpenSSL 3.x via heap buffer overflow in PKCS12 processing', date:'2024-12-01', vendor:'OpenSSL', product:'libssl 3.x', vector:'Network' },
  { id:'CVE-2024-5678', sev:'HIGH',     score:7.5, desc:'SQL injection vulnerability in popular CMS admin panel search parameter', date:'2024-11-28', vendor:'WordPress', product:'Core < 6.4', vector:'Network' },
  { id:'CVE-2024-9101', sev:'HIGH',     score:8.1, desc:'Authentication bypass in enterprise VPN gateway via malformed JWT token', date:'2024-11-25', vendor:'Cisco',  product:'AnyConnect 4.x', vector:'Network' },
  { id:'CVE-2024-3322', sev:'MEDIUM',   score:5.4, desc:'Stored XSS in React component library v2.1 via unsanitized dangerouslySetInnerHTML', date:'2024-11-20', vendor:'NPM', product:'react-quill 2.1', vector:'Network' },
  { id:'CVE-2024-7755', sev:'LOW',      score:2.3, desc:'Information disclosure via verbose debug endpoint in development mode', date:'2024-11-18', vendor:'Express.js', product:'< 4.18.3', vector:'Local' },
  { id:'CVE-2024-8823', sev:'CRITICAL', score:9.3, desc:'Privilege escalation in Linux kernel io_uring subsystem via UAF vulnerability', date:'2024-11-15', vendor:'Linux', product:'Kernel < 6.6.2', vector:'Local' },
]

const SEV_COLOR = { CRITICAL:'var(--accent-red)', HIGH:'var(--accent-orange)', MEDIUM:'var(--accent-yellow)', LOW:'var(--accent-teal)' }

export default function CVEMonitor() {
  const [search,    setSearch]    = useState('')
  const [filterSev, setFilterSev] = useState('ALL')

  const filtered = CVE_DATA.filter(c =>
    (filterSev === 'ALL' || c.sev === filterSev) &&
    (search === '' || c.id.toLowerCase().includes(search.toLowerCase()) || c.desc.toLowerCase().includes(search.toLowerCase()) || c.vendor.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="animate-fade">
      <SectionTitle color="var(--accent-orange)" icon="⚠️">CVE MONITOR — VULNERABILITY INTELLIGENCE FEED</SectionTitle>

      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        {['ALL','CRITICAL','HIGH','MEDIUM','LOW'].map(s => (
          <button key={s} onClick={() => setFilterSev(s)} style={{
            background: filterSev === s ? (SEV_COLOR[s] || 'var(--accent-orange)') + '22' : 'none',
            border: `1px solid ${filterSev === s ? (SEV_COLOR[s] || 'var(--accent-orange)') : 'var(--border)'}`,
            color: filterSev === s ? (SEV_COLOR[s] || 'var(--accent-orange)') : 'var(--text-secondary)',
            padding: '6px 14px', borderRadius: 6, cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1,
          }}>{s}</button>
        ))}
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search CVE ID, vendor, description..." accent="var(--accent-orange)" style={{ flex: 1 }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map((c, i) => (
          <Card key={i} accent={SEV_COLOR[c.sev]}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ color: 'var(--accent-orange)', fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700 }}>{c.id}</span>
                <Badge color={SEV_COLOR[c.sev]}>{c.sev}</Badge>
                <Badge color="var(--accent-blue)">{c.vector}</Badge>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: SEV_COLOR[c.sev], fontFamily: 'var(--font-mono)', fontSize: 24, fontWeight: 700, lineHeight: 1 }}>{c.score}</div>
                <div style={{ color: 'var(--text-dim)', fontSize: 9, letterSpacing: 1 }}>CVSS SCORE</div>
              </div>
            </div>
            <div style={{ color: 'var(--text-primary)', fontSize: 13, marginBottom: 8, lineHeight: 1.5 }}>{c.desc}</div>
            <div style={{ display: 'flex', gap: 16 }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: 11 }}>Vendor: <span style={{ color: 'var(--text-primary)' }}>{c.vendor}</span></span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 11 }}>Product: <span style={{ color: 'var(--text-primary)' }}>{c.product}</span></span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 11 }}>Published: <span style={{ color: 'var(--text-primary)' }}>{c.date}</span></span>
            </div>
          </Card>
        ))}
        {filtered.length === 0 && <div style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', fontSize: 12, padding: 20 }}>No CVEs match your filter.</div>}
      </div>
    </div>
  )
}
