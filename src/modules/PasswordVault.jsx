import { useState } from 'react'
import { Card } from '../components/Card.jsx'
import { Badge } from '../components/Badge.jsx'
import { Button } from '../components/Button.jsx'
import { Input } from '../components/Input.jsx'
import { SectionTitle } from '../components/SectionTitle.jsx'

const STRENGTH_MAP = { WEAK: 'var(--accent-red)', FAIR: 'var(--accent-yellow)', GOOD: 'var(--accent-teal)', STRONG: 'var(--accent-green)' }

function checkStrength(p) {
  let s = 0
  if (p.length >= 12) s++
  if (/[A-Z]/.test(p)) s++
  if (/[0-9]/.test(p)) s++
  if (/[^A-Za-z0-9]/.test(p)) s++
  return ['WEAK', 'FAIR', 'GOOD', 'STRONG'][Math.min(s - 1, 3)] || 'WEAK'
}

function genPassword() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*'
  return Array.from({ length: 18 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

export default function PasswordVault() {
  const [entries, setEntries] = useState([
    { site: 'github.com',      user: 'dev@example.io',   pass: 'Gh!t3-S3cur3#2024',   visible: false },
    { site: 'aws.amazon.com',  user: 'admin@infra.io',   pass: 'Aws$Infr@-K3y!2024',  visible: false },
    { site: 'vault.company.io',user: 'sec@company.io',   pass: 'V@ult-M@ster!X9#23',  visible: false },
  ])
  const [form, setForm] = useState({ site: '', user: '', pass: '' })
  const [strength, setStrength] = useState(null)
  const [copied, setCopied] = useState(null)

  function handlePassChange(val) {
    setForm(f => ({ ...f, pass: val }))
    setStrength(val ? checkStrength(val) : null)
  }

  function handleGen() {
    const p = genPassword()
    setForm(f => ({ ...f, pass: p }))
    setStrength(checkStrength(p))
  }

  function addEntry() {
    if (!form.site || !form.pass) return
    setEntries(e => [...e, { ...form, visible: false }])
    setForm({ site: '', user: '', pass: '' })
    setStrength(null)
  }

  function copyPass(pass, i) {
    navigator.clipboard?.writeText(pass)
    setCopied(i)
    setTimeout(() => setCopied(null), 1500)
  }

  function toggleVisible(i) {
    setEntries(e => e.map((en, idx) => idx === i ? { ...en, visible: !en.visible } : en))
  }

  function deleteEntry(i) {
    setEntries(e => e.filter((_, idx) => idx !== i))
  }

  return (
    <div className="animate-fade">
      <SectionTitle color="var(--accent-cyan)" icon="🔐">PASSWORD VAULT — AES-256 ENCRYPTED STORAGE</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 20 }}>

        {/* Stored entries */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: 1.5, marginBottom: 4 }}>STORED CREDENTIALS ({entries.length})</div>
          {entries.map((e, i) => (
            <Card key={i} accent="var(--accent-cyan)" style={{ padding: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700 }}>{e.site}</span>
                <button onClick={() => deleteEntry(i)} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', fontSize: 14 }}>✕</button>
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: 11, marginBottom: 8 }}>{e.user}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <code style={{ color: 'var(--accent-teal)', fontFamily: 'var(--font-mono)', fontSize: 12, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {e.visible ? e.pass : '••••••••••••••••••'}
                </code>
                <button onClick={() => toggleVisible(i)} style={{ background: 'var(--bg-hover)', border: '1px solid var(--border)', color: 'var(--text-secondary)', padding: '3px 8px', borderRadius: 4, cursor: 'pointer', fontSize: 9, fontFamily: 'var(--font-mono)' }}>
                  {e.visible ? 'HIDE' : 'SHOW'}
                </button>
                <button onClick={() => copyPass(e.pass, i)} style={{ background: copied === i ? 'var(--accent-teal)22' : 'var(--bg-hover)', border: `1px solid ${copied === i ? 'var(--accent-teal)' : 'var(--border)'}`, color: copied === i ? 'var(--accent-teal)' : 'var(--text-secondary)', padding: '3px 8px', borderRadius: 4, cursor: 'pointer', fontSize: 9, fontFamily: 'var(--font-mono)' }}>
                  {copied === i ? 'COPIED' : 'COPY'}
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* Add new */}
        <Card accent="var(--accent-cyan)">
          <div style={{ color: 'var(--text-secondary)', fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: 1.5, marginBottom: 16 }}>ADD NEW ENTRY</div>
          {[['SITE / URL', 'site', 'github.com'], ['USERNAME / EMAIL', 'user', 'user@example.com']].map(([label, key, ph]) => (
            <div key={key} style={{ marginBottom: 12 }}>
              <div style={{ color: 'var(--text-secondary)', fontSize: 10, fontFamily: 'var(--font-mono)', marginBottom: 5 }}>{label}</div>
              <Input value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} placeholder={ph} accent="var(--accent-cyan)" style={{ width: '100%' }} />
            </div>
          ))}
          <div style={{ marginBottom: 16 }}>
            <div style={{ color: 'var(--text-secondary)', fontSize: 10, fontFamily: 'var(--font-mono)', marginBottom: 5 }}>PASSWORD</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Input value={form.pass} onChange={e => handlePassChange(e.target.value)} placeholder="enter or generate..." accent="var(--accent-cyan)" style={{ flex: 1 }} />
              <Button onClick={handleGen} accent="var(--accent-cyan)" style={{ padding: '9px 14px' }}>GEN</Button>
            </div>
            {strength && (
              <div style={{ marginTop: 8, display: 'flex', gap: 8, alignItems: 'center' }}>
                <Badge color={STRENGTH_MAP[strength]}>{strength}</Badge>
                <div style={{ flex: 1, height: 4, background: 'var(--bg-hover)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${['WEAK','FAIR','GOOD','STRONG'].indexOf(strength) * 25 + 25}%`, background: STRENGTH_MAP[strength], transition: 'width 0.4s, background 0.4s', borderRadius: 2 }} />
                </div>
              </div>
            )}
          </div>
          <Button onClick={addEntry} accent="var(--accent-cyan)" style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>+ STORE ENTRY</Button>
        </Card>
      </div>
    </div>
  )
}
