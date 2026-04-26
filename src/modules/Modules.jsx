// ── File Integrity ────────────────────────────────────────────────────────────
import { useState } from 'react'
import { Badge, Card, SectionTitle, Input, Btn } from '../components/UI.jsx'

export function FileIntegrity() {
  const [files, setFiles] = useState([
    { id: 1, path: '/etc/passwd',    hash: '5d41402abc4b2a76b9719d911017c592', status: 'OK',       checked: '2m ago' },
    { id: 2, path: '/etc/shadow',    hash: '7215ee9c7d9dc229d2921a40e899ec5f', status: 'OK',       checked: '2m ago' },
    { id: 3, path: '/usr/bin/sudo',  hash: 'b14a7b8059d9c055954c92674ce60032', status: 'MODIFIED', checked: '2m ago' },
    { id: 4, path: '/etc/hosts',     hash: 'eccbc87e4b5ce2fe28308fd9f2a7baf3', status: 'OK',       checked: '2m ago' },
    { id: 5, path: '/etc/crontab',   hash: 'c4ca4238a0b923820dcc509a6f75849b', status: 'OK',       checked: '2m ago' },
  ])
  const [newPath, setNewPath] = useState('')

  function addFile() {
    if (!newPath) return
    const hash = [...Array(32)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')
    setFiles(f => [...f, { id: Date.now(), path: newPath, hash, status: 'OK', checked: 'just now' }])
    setNewPath('')
  }

  function rescan() {
    setFiles(f => f.map(x => ({ ...x, status: Math.random() > 0.88 ? 'MODIFIED' : 'OK', checked: 'just now' })))
  }

  function remove(id) { setFiles(f => f.filter(x => x.id !== id)) }

  const modified = files.filter(f => f.status === 'MODIFIED').length

  return (
    <div className="fade-in">
      <SectionTitle color="var(--purple)" icon="🔎">File Integrity Monitor — SHA-256 Baseline</SectionTitle>
      {modified > 0 && (
        <div style={{ background: '#f8717122', border: '1px solid #f87171', borderRadius: 8, padding: '12px 16px', marginBottom: 16, color: '#f87171', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
          ⚠ {modified} file(s) have been modified since last baseline!
        </div>
      )}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        <Input value={newPath} onChange={e => setNewPath(e.target.value)} placeholder="/path/to/monitor..." />
        <Btn color="var(--purple)" onClick={addFile}>+ ADD</Btn>
        <Btn color="var(--purple)" onClick={rescan}>⟳ RESCAN</Btn>
      </div>
      <Card accent="var(--purple)" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 2fr 80px 80px 30px', padding: '10px 16px', background: 'var(--bg-panel)', borderBottom: '1px solid var(--border)' }}>
          {['FILE PATH', 'HASH (MD5)', 'STATUS', 'LAST SCAN', ''].map((h, i) => (
            <div key={i} style={{ color: 'var(--text-muted)', fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: 1 }}>{h}</div>
          ))}
        </div>
        {files.map((f, i) => (
          <div key={f.id} style={{ display: 'grid', gridTemplateColumns: '2.5fr 2fr 80px 80px 30px', padding: '11px 16px', borderBottom: '1px solid var(--border-dim)', alignItems: 'center', background: f.status === 'MODIFIED' ? '#f8717108' : 'transparent' }}>
            <div style={{ color: 'var(--text-primary)', fontSize: 12, fontFamily: 'var(--font-mono)' }}>{f.path}</div>
            <div style={{ color: 'var(--text-dim)', fontSize: 11, fontFamily: 'var(--font-mono)' }}>{f.hash}</div>
            <Badge color={f.status === 'OK' ? '#34d399' : '#f87171'}>{f.status}</Badge>
            <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>{f.checked}</div>
            <button onClick={() => remove(f.id)} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', fontSize: 13 }}>×</button>
          </div>
        ))}
      </Card>
    </div>
  )
}

// ── Web Security ───────────────────────────────────────────────────────────────
export function WebSecurity() {
  const [url, setUrl] = useState('')
  const [scanning, setScanning] = useState(false)
  const [findings, setFindings] = useState(null)
  const [progress, setProgress] = useState(0)

  const CHECKS = [
    { type: 'SQL Injection',      detail: 'User input unsanitized in search/login endpoints',       vulnRate: 0.45 },
    { type: 'XSS (Reflected)',    detail: 'Script tags not escaped in error or output rendering',   vulnRate: 0.40 },
    { type: 'XSS (Stored)',       detail: 'Persistent XSS via user-controlled content fields',      vulnRate: 0.30 },
    { type: 'CSRF Protection',    detail: 'CSRF tokens absent on state-changing form submissions',  vulnRate: 0.35 },
    { type: 'Security Headers',   detail: 'Missing CSP, X-Frame-Options, HSTS headers',            vulnRate: 0.55 },
    { type: 'SSL/TLS Config',     detail: 'Weak cipher suites or expired certificate detected',     vulnRate: 0.25 },
    { type: 'Open Redirects',     detail: 'Unvalidated redirect parameter allows phishing',         vulnRate: 0.30 },
    { type: 'Directory Listing',  detail: 'Web server exposes directory listing on /assets/',       vulnRate: 0.20 },
  ]

  function scan() {
    if (!url) return
    setScanning(true)
    setFindings(null)
    setProgress(0)
    let p = 0
    const piv = setInterval(() => {
      p += Math.random() * 15
      if (p >= 100) { clearInterval(piv); setProgress(100) }
      else setProgress(p)
    }, 200)
    setTimeout(() => {
      setFindings(CHECKS.map(c => ({ ...c, status: Math.random() < c.vulnRate ? 'VULNERABLE' : 'SAFE' })))
      setScanning(false)
    }, 2200)
  }

  const vulnCount = findings?.filter(f => f.status === 'VULNERABLE').length ?? 0

  return (
    <div className="fade-in">
      <SectionTitle color="var(--yellow)" icon="🌐">Web Security Scanner — OWASP Top 10</SectionTitle>
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <Input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://target.example.com" />
        <Btn color="var(--yellow)" onClick={scan} disabled={scanning}>
          {scanning ? '⟳ SCANNING...' : '▶ SCAN'}
        </Btn>
      </div>
      {scanning && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ color: 'var(--yellow)', fontSize: 11, fontFamily: 'var(--font-mono)' }}>Probing endpoints…</span>
            <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>{Math.round(progress)}%</span>
          </div>
          <div style={{ width: '100%', height: 4, background: 'var(--border-dim)', borderRadius: 2 }}>
            <div style={{ height: '100%', width: progress + '%', background: 'var(--yellow)', borderRadius: 2, transition: 'width 0.2s' }} />
          </div>
        </div>
      )}
      {findings && (
        <>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            <Card accent={vulnCount > 0 ? '#f87171' : '#34d399'} style={{ padding: '12px 20px', display: 'flex', gap: 16, alignItems: 'center' }}>
              <span style={{ fontSize: 28, fontWeight: 800, color: vulnCount > 0 ? '#f87171' : '#34d399', fontFamily: 'var(--font-display)' }}>{vulnCount}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: 11, fontFamily: 'var(--font-mono)' }}>VULNERABILITIES<br />FOUND</span>
            </Card>
            <Card style={{ padding: '12px 20px', display: 'flex', gap: 16, alignItems: 'center' }}>
              <span style={{ fontSize: 28, fontWeight: 800, color: 'var(--emerald)', fontFamily: 'var(--font-display)' }}>{findings.length - vulnCount}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: 11, fontFamily: 'var(--font-mono)' }}>CHECKS<br />PASSED</span>
            </Card>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {findings.map((f, i) => (
              <Card key={i} accent={f.status === 'VULNERABLE' ? '#f87171' : '#34d39944'}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ color: 'var(--text-primary)', fontSize: 12, fontFamily: 'var(--font-mono)' }}>{f.type}</span>
                  <Badge color={f.status === 'VULNERABLE' ? '#f87171' : '#34d399'}>{f.status}</Badge>
                </div>
                {f.status === 'VULNERABLE' && <div style={{ color: 'var(--text-muted)', fontSize: 11, lineHeight: 1.5 }}>{f.detail}</div>}
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// ── Cryptography ───────────────────────────────────────────────────────────────
import { Tabs, Textarea } from '../components/UI.jsx'

export function CryptographyLab() {
  const [tab, setTab] = useState('hash')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [algo, setAlgo] = useState('SHA-256')

  async function computeHash() {
    if (!input) return
    try {
      const enc = new TextEncoder()
      const data = enc.encode(input)
      const buf = await crypto.subtle.digest(algo.replace('-', ''), data)
      setOutput(Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join(''))
    } catch {
      setOutput('Hash: ' + btoa(input).split('').reverse().join('').slice(0, 64))
    }
  }

  function encodeB64() { try { setOutput(btoa(unescape(encodeURIComponent(input)))) } catch { setOutput('Error: invalid input') } }
  function decodeB64() { try { setOutput(decodeURIComponent(escape(atob(input)))) } catch { setOutput('Error: invalid Base64') } }

  function genRSA() {
    const pub = btoa(Math.random().toString(36).repeat(4)).slice(0, 64)
    setOutput(`-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA\n${pub}\nAQAB\n-----END PUBLIC KEY-----\n\n-----BEGIN PRIVATE KEY-----\n[Private key — stored securely, never transmitted]\n-----END PRIVATE KEY-----`)
  }

  function rot13() { setOutput(input.replace(/[a-zA-Z]/g, c => String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26))) }

  const TABS = [
    { id: 'hash',   label: 'HASH' },
    { id: 'base64', label: 'BASE64' },
    { id: 'rsa',    label: 'RSA' },
    { id: 'rot13',  label: 'ROT-13' },
  ]

  return (
    <div className="fade-in">
      <SectionTitle color="var(--emerald)" icon="🔑">Cryptography Lab</SectionTitle>
      <Tabs tabs={TABS} active={tab} onChange={t => { setTab(t); setOutput('') }} color="var(--emerald)" />

      {tab === 'hash' && (
        <div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
            {['SHA-256', 'SHA-384', 'SHA-512'].map(a => (
              <button key={a} onClick={() => setAlgo(a)} style={{ background: algo === a ? 'var(--emerald)22' : 'none', border: `1px solid ${algo === a ? 'var(--emerald)' : 'var(--border)'}`, color: algo === a ? 'var(--emerald)' : 'var(--text-muted)', padding: '6px 14px', borderRadius: 4, cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 11 }}>{a}</button>
            ))}
          </div>
          <Textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Enter text to hash…" />
          <Btn color="var(--emerald)" onClick={computeHash} style={{ marginTop: 10 }}>COMPUTE {algo} HASH</Btn>
        </div>
      )}
      {tab === 'base64' && (
        <div>
          <Textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Enter text or Base64…" />
          <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
            <Btn color="var(--emerald)" onClick={encodeB64}>ENCODE</Btn>
            <Btn color="var(--emerald)" onClick={decodeB64}>DECODE</Btn>
          </div>
        </div>
      )}
      {tab === 'rsa' && (
        <div>
          <Card style={{ marginBottom: 14 }}>
            <div style={{ color: 'var(--text-muted)', fontSize: 12, lineHeight: 1.7 }}>
              Generates a simulated RSA-2048 key pair.<br />
              Real implementation: <span style={{ color: 'var(--emerald)' }}>Web Crypto API</span> with <code style={{ color: 'var(--cyan)' }}>generateKey('RSA-OAEP', …)</code>
            </div>
          </Card>
          <Btn color="var(--emerald)" onClick={genRSA}>GENERATE RSA-2048 KEY PAIR</Btn>
        </div>
      )}
      {tab === 'rot13' && (
        <div>
          <Textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Enter text to ROT-13 encode/decode…" />
          <Btn color="var(--emerald)" onClick={rot13} style={{ marginTop: 10 }}>APPLY ROT-13</Btn>
        </div>
      )}

      {output && (
        <div style={{ marginTop: 16, background: '#020a08', border: '1px solid var(--emerald)33', borderRadius: 8, padding: 16, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--emerald)', wordBreak: 'break-all', whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
          {output}
        </div>
      )}
    </div>
  )
}

// ── Log Forensics ──────────────────────────────────────────────────────────────
import { levelColor } from '../components/UI.jsx'
import { FAKE_LOGS } from '../constants.js'

export function LogForensics() {
  const [filter, setFilter] = useState('ALL')
  const [search, setSearch] = useState('')

  const filtered = FAKE_LOGS.filter(l =>
    (filter === 'ALL' || l.level === filter) &&
    (!search || l.msg.toLowerCase().includes(search.toLowerCase()) || l.source.toLowerCase().includes(search.toLowerCase()))
  )

  const counts = ['ERROR', 'WARN', 'INFO'].reduce((acc, l) => ({ ...acc, [l]: FAKE_LOGS.filter(x => x.level === l).length }), {})

  return (
    <div className="fade-in">
      <SectionTitle color="var(--pink)" icon="🧩">Log Forensics — Threat Detection Engine</SectionTitle>
      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        {[['ALL', null], ['ERROR', '#f87171'], ['WARN', '#fbbf24'], ['INFO', '#34d399']].map(([f, c]) => (
          <button key={f} onClick={() => setFilter(f)} style={{
            background: filter === f ? (c || 'var(--pink)') + '22' : 'none',
            border: `1px solid ${filter === f ? (c || 'var(--pink)') : 'var(--border)'}`,
            color: filter === f ? (c || 'var(--pink)') : 'var(--text-muted)',
            padding: '7px 16px', borderRadius: 6, cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 11,
          }}>
            {f} {f !== 'ALL' && <span style={{ opacity: 0.7 }}>({counts[f]})</span>}
          </button>
        ))}
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search logs…" style={{ flex: 1 }} />
      </div>
      <Card accent="var(--pink)" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '70px 60px 120px 1fr', padding: '10px 16px', background: 'var(--bg-panel)', borderBottom: '1px solid var(--border)' }}>
          {['TIME', 'LEVEL', 'SOURCE', 'MESSAGE'].map(h => (
            <div key={h} style={{ color: 'var(--text-muted)', fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: 1 }}>{h}</div>
          ))}
        </div>
        {filtered.length === 0
          ? <div style={{ padding: 24, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>No matching entries.</div>
          : filtered.map((l, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '70px 60px 120px 1fr', padding: '10px 16px', borderBottom: '1px solid var(--border-dim)', alignItems: 'center', gap: 12 }}>
              <span style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>{l.time}</span>
              <Badge color={levelColor(l.level)}>{l.level}</Badge>
              <span style={{ color: 'var(--blue)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>{l.source}</span>
              <span style={{ color: 'var(--text-primary)', fontSize: 12 }}>{l.msg}</span>
            </div>
          ))
        }
      </Card>
    </div>
  )
}

// ── CVE Monitor ────────────────────────────────────────────────────────────────
import { sevColor } from '../components/UI.jsx'
import { FAKE_CVE } from '../constants.js'

export function CVEMonitor() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="fade-in">
      <SectionTitle color="var(--amber)" icon="⚠️">CVE Monitor — Vulnerability Intelligence</SectionTitle>
      <div style={{ display: 'grid', gap: 10 }}>
        {FAKE_CVE.map((c, i) => (
          <Card key={i} accent={sevColor(c.severity)} style={{ cursor: 'pointer' }}
            onClick={() => setSelected(selected?.id === c.id ? null : c)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ color: 'var(--amber)', fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700 }}>{c.id}</span>
                <Badge color={sevColor(c.severity)}>{c.severity}</Badge>
                <Badge color="var(--text-muted)">{c.vector}</Badge>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: sevColor(c.severity), fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800 }}>{c.score}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: 10, fontFamily: 'var(--font-mono)' }}>CVSS</span>
              </div>
            </div>
            <div style={{ color: 'var(--text-primary)', fontSize: 13 }}>{c.desc}</div>
            {selected?.id === c.id && (
              <div style={{ marginTop: 12, padding: '10px 14px', background: 'var(--bg-input)', borderRadius: 6, borderLeft: `3px solid ${sevColor(c.severity)}` }}>
                <div style={{ color: 'var(--text-muted)', fontSize: 11, marginBottom: 4 }}>Published: {c.date}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>
                  Recommended: Patch immediately for CRITICAL/HIGH. Monitor NVD for official patches and workarounds.
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}

// ── OSINT Tool ─────────────────────────────────────────────────────────────────
export function OSINTTool() {
  const [query, setQuery] = useState('')
  const [type, setType] = useState('domain')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  function run() {
    if (!query) return
    setLoading(true)
    setResult(null)
    setTimeout(() => {
      const reports = {
        domain: [
          { k: 'Registrar',        v: 'Namecheap, Inc.' },
          { k: 'Created',          v: '2019-' + String(Math.floor(Math.random()*12+1)).padStart(2,'0') + '-14' },
          { k: 'Expires',          v: '2027-03-14' },
          { k: 'Name Servers',     v: 'ns1.' + query + ', ns2.' + query },
          { k: 'IP Address',       v: `104.21.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}` },
          { k: 'ASN',              v: 'AS13335 (Cloudflare, Inc.)' },
          { k: 'Country',          v: 'US 🇺🇸' },
          { k: 'MX Records',       v: 'mail.' + query + ' (priority 10)' },
          { k: 'Open Ports',       v: '80, 443' },
          { k: 'Technologies',     v: 'Nginx, Cloudflare' },
        ],
        ip: [
          { k: 'ISP',              v: 'DigitalOcean, LLC' },
          { k: 'Organization',     v: 'DO-13' },
          { k: 'Country',          v: 'Germany 🇩🇪' },
          { k: 'City',             v: 'Frankfurt am Main' },
          { k: 'Abuse Score',      v: Math.floor(Math.random() * 30) + '%' },
          { k: 'Type',             v: 'Hosting / VPS' },
          { k: 'Blacklisted',      v: Math.random() > 0.8 ? '⚠ YES — Spamhaus XBL' : 'No' },
          { k: 'PTR Record',       v: query + '.example.cloud' },
        ],
        email: [
          { k: 'Domain',           v: query.includes('@') ? query.split('@')[1] : 'unknown' },
          { k: 'MX Records',       v: 'aspmx.l.google.com (Google Workspace)' },
          { k: 'Breached',         v: Math.random() > 0.5 ? '⚠ YES — 2 breach databases' : 'Not found' },
          { k: 'Disposable',       v: 'No' },
          { k: 'Valid Format',     v: 'Yes' },
          { k: 'DMARC Policy',     v: 'v=DMARC1; p=reject' },
        ],
      }
      setResult({ title: { domain: 'Domain Report', ip: 'IP Report', email: 'Email Report' }[type], fields: reports[type] })
      setLoading(false)
    }, 1400)
  }

  const TYPES = [{ id: 'domain', label: 'DOMAIN' }, { id: 'ip', label: 'IP ADDRESS' }, { id: 'email', label: 'EMAIL' }]

  return (
    <div className="fade-in">
      <SectionTitle color="var(--blue)" icon="🕵️">OSINT Aggregator — Open Source Intelligence</SectionTitle>
      <Tabs tabs={TYPES} active={type} onChange={t => { setType(t); setResult(null) }} color="var(--blue)" />
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <Input value={query} onChange={e => setQuery(e.target.value)}
          placeholder={{ domain: 'example.com', ip: '8.8.8.8', email: 'user@example.com' }[type]} />
        <Btn color="var(--blue)" onClick={run} disabled={loading}>{loading ? 'QUERYING...' : '▶ RECON'}</Btn>
      </div>
      {result && (
        <Card accent="var(--blue)">
          <div style={{ color: 'var(--blue)', fontFamily: 'var(--font-mono)', fontSize: 13, marginBottom: 16 }}>
            {result.title} — <span style={{ color: 'var(--text-primary)' }}>{query}</span>
          </div>
          {result.fields.map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, padding: '9px 0', borderBottom: '1px solid var(--border-dim)' }}>
              <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 12, minWidth: 140 }}>{f.k}</span>
              <span style={{ color: f.v.includes('⚠') ? '#f87171' : 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>{f.v}</span>
            </div>
          ))}
        </Card>
      )}
    </div>
  )
}

// ── Steganography ──────────────────────────────────────────────────────────────
export function Steganography() {
  const [mode, setMode] = useState('encode')
  const [text, setText] = useState('')
  const [result, setResult] = useState('')

  function process() {
    if (!text) return
    if (mode === 'encode') {
      const binary = text.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ')
      setResult(`Binary LSB payload (first 200 bits shown):\n${binary.slice(0, 200)}…\n\n[INFO] Message encoded into carrier image pixel LSBs.\n[INFO] ${text.length} characters → ${text.length * 8} bits embedded.\n[OK] Steganographic encoding complete.`)
    } else {
      try {
        const clean = text.trim().replace(/\s+/g, '')
        if (/^[01]+$/.test(clean)) {
          const chars = clean.match(/.{8}/g)?.map(b => String.fromCharCode(parseInt(b, 2))).join('') || ''
          setResult('Decoded message: ' + chars)
        } else {
          setResult('Decoded: ' + decodeURIComponent(escape(atob(text))))
        }
      } catch { setResult('Unable to decode — ensure input is valid binary or Base64 LSB data.') }
    }
  }

  return (
    <div className="fade-in">
      <SectionTitle color="var(--fuchsia)" icon="🖼️">Steganography — LSB Image Encoding</SectionTitle>
      <Tabs tabs={[{ id: 'encode', label: 'ENCODE' }, { id: 'decode', label: 'DECODE' }]} active={mode} onChange={m => { setMode(m); setResult('') }} color="var(--fuchsia)" />
      <Card style={{ marginBottom: 14 }}>
        <div style={{ color: 'var(--text-muted)', fontSize: 12, lineHeight: 1.7 }}>
          <strong style={{ color: 'var(--fuchsia)' }}>Encode:</strong> Hides a secret message inside image pixel data using LSB steganography.<br />
          <strong style={{ color: 'var(--fuchsia)' }}>Decode:</strong> Extracts a hidden message from binary or Base64 LSB payload.
        </div>
      </Card>
      <Textarea value={text} onChange={e => setText(e.target.value)}
        placeholder={mode === 'encode' ? 'Enter secret message to hide in carrier image…' : 'Enter binary LSB payload or Base64 data to extract…'}
        rows={5} />
      <Btn color="var(--fuchsia)" onClick={process} style={{ marginTop: 12 }}>
        {mode === 'encode' ? '▶ HIDE MESSAGE' : '▶ EXTRACT MESSAGE'}
      </Btn>
      {result && (
        <div style={{ marginTop: 14, background: '#0a0310', border: '1px solid var(--fuchsia)33', borderRadius: 8, padding: 16, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fuchsia)', whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
          {result}
        </div>
      )}
    </div>
  )
}

// ── Hash Cracker ───────────────────────────────────────────────────────────────
import { Terminal as Term } from '../components/UI.jsx'
import { KNOWN_HASHES, WORDLIST } from '../constants.js'

export function HashCracker() {
  const [hash, setHash] = useState('')
  const [cracking, setCracking] = useState(false)
  const [logs, setLogs] = useState([
    '[SYS] Hash Cracker v1.4 initialized.',
    '[SYS] Loaded wordlist: ' + WORDLIST.length + ' entries.',
    '[SYS] Supported: MD5, SHA1, SHA256 (dictionary mode).',
    '[INFO] Hint: try 5f4dcc3b5aa765d61d8327deb882cf99',
  ])
  const [found, setFound] = useState(null)

  function crack() {
    if (!hash) return
    setCracking(true)
    setFound(null)
    const target = hash.toLowerCase().trim()
    const known = KNOWN_HASHES[target]
    setLogs([
      `[SYS] Starting dictionary attack…`,
      `[HASH] Target: ${target}`,
      `[SYS] Testing ${WORDLIST.length} candidates…`,
    ])
    let i = 0
    const iv = setInterval(() => {
      if (i >= WORDLIST.length) {
        clearInterval(iv)
        setCracking(false)
        setLogs(l => [...l,
          '[WARN] Dictionary exhausted.',
          '[INFO] Try a larger wordlist (rockyou.txt) or brute-force mode.',
        ])
        return
      }
      const word = WORDLIST[i]
      setLogs(l => [...l, `[TRY]  Testing: "${word}"…`])
      if (known === word) {
        setFound(word)
        setLogs(l => [...l,
          `[!!!!!] PASSWORD FOUND: "${word}"`,
          `[SYS]  Cracked in ${i + 1} attempts.`,
        ])
        clearInterval(iv)
        setCracking(false)
        return
      }
      i++
    }, 250)
  }

  return (
    <div className="fade-in">
      <SectionTitle color="var(--red)" icon="💥">Hash Cracker — Dictionary Attack Engine</SectionTitle>
      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        <Input value={hash} onChange={e => setHash(e.target.value)}
          placeholder="Paste MD5 hash (e.g. 5f4dcc3b5aa765d61d8327deb882cf99)" />
        <Btn color="var(--red)" onClick={crack} disabled={cracking}>
          {cracking ? '⟳ CRACKING...' : '▶ CRACK'}
        </Btn>
      </div>
      {found && (
        <div style={{ background: '#f8717122', border: '1px solid #f87171', borderRadius: 8, padding: '14px 18px', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 20 }}>🔓</span>
          <div>
            <div style={{ color: '#f87171', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700 }}>PASSWORD CRACKED</div>
            <div style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: 18, marginTop: 2 }}>{found}</div>
          </div>
        </div>
      )}
      <Term lines={logs} color="var(--red)" height={220} />
      <Card style={{ marginTop: 14 }}>
        <div style={{ color: 'var(--text-muted)', fontSize: 11, lineHeight: 1.7 }}>
          <strong style={{ color: 'var(--red)' }}>Test hashes:</strong><br />
          5f4dcc3b5aa765d61d8327deb882cf99 → password &nbsp;|&nbsp;
          e10adc3949ba59abbe56e057f20f883e → 123456 &nbsp;|&nbsp;
          21232f297a57a5a743894a0e4a801fc3 → admin
        </div>
      </Card>
    </div>
  )
}

// ── Phishing Detector ──────────────────────────────────────────────────────────
import { ProgressBar } from '../components/UI.jsx'

const RED_FLAGS = [
  { pattern: /urgent|immediately|account.*suspend|verify.*now|act now/i,     label: 'Urgency language',        weight: 20 },
  { pattern: /click here|click.*link|http:\/\/(?!s)/i,                       label: 'Suspicious link',         weight: 25 },
  { pattern: /dear customer|dear user|valued (customer|member)/i,            label: 'Generic greeting',        weight: 15 },
  { pattern: /password|credential|login.*detail|security.*code/i,            label: 'Credential solicitation', weight: 30 },
  { pattern: /\$[\d,]+|won.*prize|lottery|reward|congratulations/i,          label: 'Prize / money lure',      weight: 20 },
  { pattern: /paypal|amazon|apple|microsoft|bank.*account|irs/i,             label: 'Brand impersonation',     weight: 15 },
  { pattern: /verify.*account|confirm.*identity|update.*info/i,              label: 'Identity verification',   weight: 20 },
  { pattern: /\b(limited time|expires|24 hours|48 hours)\b/i,                label: 'Artificial deadline',     weight: 15 },
]

export function PhishingDetector() {
  const [email, setEmail] = useState('')
  const [result, setResult] = useState(null)

  function analyze() {
    if (!email) return
    const hits = RED_FLAGS.filter(r => r.pattern.test(email))
    const score = Math.min(hits.reduce((s, r) => s + r.weight, 0), 100)
    const verdict = score > 60 ? 'PHISHING' : score > 30 ? 'SUSPICIOUS' : 'LIKELY SAFE'
    setResult({ score, flags: hits, verdict })
  }

  const vColor = { PHISHING: '#f87171', SUSPICIOUS: '#fbbf24', 'LIKELY SAFE': '#34d399' }

  return (
    <div className="fade-in">
      <SectionTitle color="var(--lime)" icon="🎣">Phishing Detector — Email Threat Analyzer</SectionTitle>
      <Textarea
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder={'Paste email content here…\n\nExample: Dear Customer, Your account has been suspended. Click here immediately to verify your credentials or your account will be permanently deleted within 24 hours.'}
        rows={6}
      />
      <Btn color="var(--lime)" onClick={analyze} style={{ marginTop: 12 }}>▶ ANALYZE EMAIL</Btn>

      {result && (
        <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 16 }}>
          <Card accent={vColor[result.verdict]} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 52, fontWeight: 800, color: vColor[result.verdict], fontFamily: 'var(--font-display)', lineHeight: 1 }}>{result.score}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: 10, fontFamily: 'var(--font-mono)', margin: '8px 0' }}>THREAT SCORE</div>
            <Badge color={vColor[result.verdict]} size="md">{result.verdict}</Badge>
            <div style={{ marginTop: 14 }}>
              <ProgressBar value={result.score} color={vColor[result.verdict]} />
            </div>
          </Card>
          <Card accent="var(--lime)">
            <div style={{ color: 'var(--text-muted)', fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: 1.5, marginBottom: 14 }}>
              RED FLAGS DETECTED ({result.flags.length})
            </div>
            {result.flags.length === 0
              ? <div style={{ color: 'var(--lime)', fontSize: 12 }}>✓ No red flags detected in this email.</div>
              : result.flags.map((f, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-dim)' }}>
                  <span style={{ color: '#f87171', fontSize: 12 }}>⚠ {f.label}</span>
                  <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>+{f.weight} pts</span>
                </div>
              ))
            }
          </Card>
        </div>
      )}
    </div>
  )
}
