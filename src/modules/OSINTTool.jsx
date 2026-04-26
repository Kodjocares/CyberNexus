import { useState } from 'react'
import { Card } from '../components/Card.jsx'
import { Badge } from '../components/Badge.jsx'
import { Button } from '../components/Button.jsx'
import { Input } from '../components/Input.jsx'
import { SectionTitle } from '../components/SectionTitle.jsx'

function randIP() { return `${Math.floor(Math.random()*220)+10}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*254)+1}` }

function getDomainReport(q) { return [
  { k:'Registrar',     v:'Namecheap, Inc.' },
  { k:'Created',       v:'2018-03-14' },
  { k:'Expires',       v:'2026-03-14' },
  { k:'Name Servers',  v:'ns1.'+q+', ns2.'+q },
  { k:'IP Address',    v:randIP() },
  { k:'ASN',           v:'AS13335 (Cloudflare, Inc.)' },
  { k:'Country',       v:'United States 🇺🇸' },
  { k:'Open Ports',    v:'80 (HTTP), 443 (HTTPS)' },
  { k:'Subdomains',    v:'www, mail, ftp, api, dev (5 found)' },
  { k:'Technologies',  v:'Nginx 1.24, React, Cloudflare CDN' },
]}

function getIPReport() { return [
  { k:'ISP',           v:'DigitalOcean LLC' },
  { k:'Organization',  v:'DO-13 (Hosting / VPS)' },
  { k:'Country',       v:'Germany 🇩🇪' },
  { k:'City',          v:'Frankfurt am Main' },
  { k:'Latitude/Long', v:'50.1109° N, 8.6821° E' },
  { k:'Abuse Score',   v: Math.floor(Math.random()*30)+'% ('+( Math.random()>0.7?'SUSPICIOUS':'CLEAN')+')' },
  { k:'Blacklisted',   v: Math.random()>0.8?'YES — Spamhaus, SORBS':'NO' },
  { k:'Reverse DNS',   v:'ip-'+randIP().replace(/\./g,'-')+'.host.example.com' },
  { k:'Open Ports',    v:'22 (SSH), 80 (HTTP), 443 (HTTPS)' },
]}

function getEmailReport(q) { return [
  { k:'Domain',        v: q.includes('@') ? q.split('@')[1] : q },
  { k:'MX Records',    v:'mail.google.com (priority 10)' },
  { k:'SPF Record',    v:'v=spf1 include:_spf.google.com ~all' },
  { k:'DMARC',         v:'v=DMARC1; p=quarantine; rua=mailto:dmarc@'+( q.includes('@')?q.split('@')[1]:'domain.com') },
  { k:'Disposable',    v:'No (reputable domain)' },
  { k:'Valid Format',  v:'Yes' },
  { k:'Breached',      v: Math.random()>0.5?'YES — found in 2 known breach databases':'NOT FOUND in known breaches' },
  { k:'First Seen',    v:'2019-07-23 (breach monitoring)' },
]}

export default function OSINTTool() {
  const [type,    setType]    = useState('domain')
  const [query,   setQuery]   = useState('')
  const [result,  setResult]  = useState(null)
  const [loading, setLoading] = useState(false)

  function runOSINT() {
    if (!query) return
    setLoading(true); setResult(null)
    setTimeout(() => {
      const fields = type === 'domain' ? getDomainReport(query) : type === 'ip' ? getIPReport() : getEmailReport(query)
      setResult({ title: type === 'domain' ? 'Domain Intelligence' : type === 'ip' ? 'IP Address Intelligence' : 'Email Intelligence', fields })
      setLoading(false)
    }, 1400)
  }

  const PLACEHOLDERS = { domain: 'example.com', ip: '8.8.8.8', email: 'user@example.com' }

  return (
    <div className="animate-fade">
      <SectionTitle color="var(--accent-blue)" icon="🕵️">OSINT AGGREGATOR — OPEN SOURCE INTELLIGENCE</SectionTitle>
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        {['domain','ip','email'].map(t => (
          <button key={t} onClick={() => { setType(t); setResult(null) }} style={{
            background: type === t ? 'var(--accent-blue)22' : 'none',
            border: `1px solid ${type === t ? 'var(--accent-blue)' : 'var(--border)'}`,
            color: type === t ? 'var(--accent-blue)' : 'var(--text-secondary)',
            padding: '7px 20px', borderRadius: 6, cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 1,
          }}>{t.toUpperCase()}</button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <Input value={query} onChange={e => setQuery(e.target.value)} placeholder={PLACEHOLDERS[type]} accent="var(--accent-blue)" style={{ flex: 1 }} />
        <Button onClick={runOSINT} disabled={loading} accent="var(--accent-blue)">{loading ? 'QUERYING...' : '▶ RECON'}</Button>
      </div>
      {loading && <div style={{ color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)', fontSize: 12, padding: 20, textAlign: 'center' }}>Gathering intelligence on {query}...</div>}
      {result && (
        <Card accent="var(--accent-blue)">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>{result.title}</span>
            <Badge color="var(--accent-blue)">{query}</Badge>
          </div>
          {result.fields.map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: 20, padding: '9px 0', borderBottom: '1px solid var(--border-dim)' }}>
              <span style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', fontSize: 11, width: 150, flexShrink: 0 }}>{f.k}</span>
              <span style={{ color: f.v.includes('YES') || f.v.includes('SUSPICIOUS') ? 'var(--accent-red)' : 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>{f.v}</span>
            </div>
          ))}
        </Card>
      )}
    </div>
  )
}
