import { useState } from 'react'
import { Card } from '../components/Card.jsx'
import { Badge } from '../components/Badge.jsx'
import { Button } from '../components/Button.jsx'
import { Input } from '../components/Input.jsx'
import { SectionTitle } from '../components/SectionTitle.jsx'

const CHECKS = [
  { type: 'SQL Injection',      detail: 'User input not sanitized in search/login endpoints' },
  { type: 'XSS (Reflected)',    detail: 'Script payloads not escaped in error messages' },
  { type: 'CSRF Protection',    detail: 'Form submissions checked for anti-CSRF tokens' },
  { type: 'Security Headers',   detail: 'CSP, HSTS, X-Frame-Options header analysis' },
  { type: 'SSL/TLS Config',     detail: 'Certificate validity, cipher suites, protocol version' },
  { type: 'Open Redirects',     detail: 'Redirect parameter destination validation' },
  { type: 'Directory Listing',  detail: 'Exposed directory indexes on web server' },
  { type: 'Sensitive Exposure', detail: '.env, .git, backup files publicly accessible' },
]

export default function WebSecurity() {
  const [url,      setUrl]      = useState('')
  const [scanning, setScanning] = useState(false)
  const [findings, setFindings] = useState(null)
  const [progress, setProgress] = useState(0)
  const [currentCheck, setCurrentCheck] = useState('')

  function scan() {
    if (!url || scanning) return
    setScanning(true); setFindings(null); setProgress(0)
    let i = 0
    const iv = setInterval(() => {
      if (i < CHECKS.length) {
        setCurrentCheck(`Testing: ${CHECKS[i].type}...`)
        setProgress(Math.round(((i + 1) / CHECKS.length) * 100))
        i++
      } else {
        clearInterval(iv)
        setCurrentCheck('')
        setFindings(CHECKS.map(c => ({ ...c, status: Math.random() > 0.5 ? 'VULNERABLE' : 'SAFE' })))
        setScanning(false)
        setProgress(100)
      }
    }, 280)
  }

  const vulnCount = findings?.filter(f => f.status === 'VULNERABLE').length || 0

  return (
    <div className="animate-fade">
      <SectionTitle color="var(--accent-yellow)" icon="🌐">WEB SECURITY SCANNER — OWASP TOP 10</SectionTitle>
      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        <Input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://target.example.com" accent="var(--accent-yellow)" style={{ flex: 1 }} />
        <Button onClick={scan} disabled={scanning} accent="var(--accent-yellow)">{scanning ? `SCANNING ${progress}%` : '▶ SCAN URL'}</Button>
      </div>
      {scanning && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ height: 4, background: 'var(--bg-hover)', borderRadius: 2, overflow: 'hidden', marginBottom: 8 }}>
            <div style={{ height: '100%', width: `${progress}%`, background: 'var(--accent-yellow)', transition: 'width 0.25s', borderRadius: 2 }} />
          </div>
          <div style={{ color: 'var(--accent-yellow)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>{currentCheck}</div>
        </div>
      )}
      {findings && (
        <>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            {[
              { label: 'Checks Run',   value: findings.length, color: 'var(--accent-yellow)' },
              { label: 'Vulnerable',   value: vulnCount,        color: 'var(--accent-red)'    },
              { label: 'Safe',         value: findings.length - vulnCount, color: 'var(--accent-teal)' },
            ].map(s => (
              <Card key={s.label} accent={s.color} style={{ flex: 1, textAlign: 'center', padding: 12 }}>
                <div style={{ fontSize: 26, fontWeight: 700, color: s.color, fontFamily: 'var(--font-mono)' }}>{s.value}</div>
                <div style={{ fontSize: 9, color: 'var(--text-secondary)', letterSpacing: 1 }}>{s.label.toUpperCase()}</div>
              </Card>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {findings.map((f, i) => (
              <div key={i} style={{ background: 'var(--bg-raised)', border: `1px solid ${f.status === 'VULNERABLE' ? 'var(--accent-red)' : 'var(--accent-teal)'}33`, borderRadius: 8, padding: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>{f.type}</span>
                  <Badge color={f.status === 'VULNERABLE' ? 'var(--accent-red)' : 'var(--accent-teal)'}>{f.status}</Badge>
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 11 }}>{f.detail}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
