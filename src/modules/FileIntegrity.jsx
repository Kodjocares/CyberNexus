import { useState } from 'react'
import { Card } from '../components/Card.jsx'
import { Badge } from '../components/Badge.jsx'
import { Button } from '../components/Button.jsx'
import { Input } from '../components/Input.jsx'
import { SectionTitle } from '../components/SectionTitle.jsx'

function randHash() { return Array.from({length:64},()=>Math.floor(Math.random()*16).toString(16)).join('') }

const INIT = [
  { path:'/etc/passwd',   hash:'5d41402abc4b2a76b9719d91'+randHash().slice(0,16), status:'OK',       checked:'2 min ago' },
  { path:'/etc/shadow',   hash:'7215ee9c7d9dc229d29214a0'+randHash().slice(0,16), status:'OK',       checked:'2 min ago' },
  { path:'/usr/bin/sudo', hash:'b14a7b8059d9c055954c9267'+randHash().slice(0,16), status:'MODIFIED', checked:'2 min ago' },
  { path:'/etc/hosts',    hash:'eccbc87e4b5ce2fe28308fd9'+randHash().slice(0,16), status:'OK',       checked:'2 min ago' },
  { path:'/etc/crontab',  hash:'c4ca4238a0b923820dcc509a'+randHash().slice(0,16), status:'OK',       checked:'2 min ago' },
]

export default function FileIntegrity() {
  const [files,   setFiles]   = useState(INIT)
  const [newPath, setNewPath] = useState('')
  const [scanning,setScanning]= useState(false)

  function addFile() {
    if (!newPath) return
    setFiles(f => [...f, { path: newPath, hash: randHash(), status: 'OK', checked: 'just now' }])
    setNewPath('')
  }

  function rescan() {
    setScanning(true)
    setTimeout(() => {
      setFiles(f => f.map(file => ({ ...file, status: Math.random() > 0.85 ? 'MODIFIED' : 'OK', checked: 'just now' })))
      setScanning(false)
    }, 1200)
  }

  function removeFile(i) { setFiles(f => f.filter((_,idx) => idx !== i)) }

  const modified = files.filter(f => f.status === 'MODIFIED').length

  return (
    <div className="animate-fade">
      <SectionTitle color="var(--accent-purple)" icon="🔎">FILE INTEGRITY MONITOR — SHA-256 HASH BASELINE</SectionTitle>
      <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
        {[
          { label: 'Total Monitored', value: files.length,  color: 'var(--accent-purple)' },
          { label: 'Intact',          value: files.length - modified, color: 'var(--accent-teal)'   },
          { label: 'Modified',        value: modified,       color: 'var(--accent-red)'    },
        ].map(s => (
          <Card key={s.label} accent={s.color} style={{ flex: 1, textAlign: 'center', padding: 14 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: s.color, fontFamily: 'var(--font-mono)' }}>{s.value}</div>
            <div style={{ fontSize: 10, color: 'var(--text-secondary)', letterSpacing: 1 }}>{s.label.toUpperCase()}</div>
          </Card>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        <Input value={newPath} onChange={e => setNewPath(e.target.value)} placeholder="/path/to/monitor..." accent="var(--accent-purple)" style={{ flex: 1 }} />
        <Button onClick={addFile} accent="var(--accent-purple)">+ ADD FILE</Button>
        <Button onClick={rescan}  accent="var(--accent-purple)" disabled={scanning}>{scanning ? 'SCANNING...' : '⟳ RESCAN ALL'}</Button>
      </div>

      <Card>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 2.5fr 90px 100px 32px', padding: '8px 14px', background: 'var(--bg-surface)', borderRadius: 6, marginBottom: 8 }}>
          {['FILE PATH','SHA-256 HASH','STATUS','LAST CHECK',''].map((h,i) => (
            <div key={i} style={{ color: 'var(--text-dim)', fontSize: 9, fontFamily: 'var(--font-mono)', letterSpacing: 1 }}>{h}</div>
          ))}
        </div>
        {files.map((f, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 2.5fr 90px 100px 32px', padding: '10px 14px', borderBottom: '1px solid var(--border-dim)', alignItems: 'center', gap: 4 }}>
            <span style={{ color: f.status === 'MODIFIED' ? 'var(--accent-red)' : 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.path}</span>
            <span style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', fontSize: 10, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.hash}</span>
            <Badge color={f.status === 'OK' ? 'var(--accent-teal)' : 'var(--accent-red)'}>{f.status}</Badge>
            <span style={{ color: 'var(--text-secondary)', fontSize: 11 }}>{f.checked}</span>
            <button onClick={() => removeFile(i)} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', fontSize: 13, padding: 0 }}>✕</button>
          </div>
        ))}
      </Card>
    </div>
  )
}
