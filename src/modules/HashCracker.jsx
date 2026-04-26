import { useState } from 'react'
import { Button } from '../components/Button.jsx'
import { Input } from '../components/Input.jsx'
import { Terminal } from '../components/Terminal.jsx'
import { SectionTitle } from '../components/SectionTitle.jsx'
import { Badge } from '../components/Badge.jsx'

const DICTIONARY = ['password','123456','admin','letmein','qwerty','password123','welcome','monkey','dragon','master','secret','abc123','iloveyou','sunshine','princess','football','shadow','superman','login','trustno1','hello','charlie','donald','batman','access','solo','michael','jordan','harley','rangers','666666','passw0rd']

const KNOWN = {
  '5f4dcc3b5aa765d61d8327deb882cf99':'password',
  'e10adc3949ba59abbe56e057f20f883e':'123456',
  '21232f297a57a5a743894a0e4a801fc3':'admin',
  '0d107d09f5bbe40cade3de5c71e9e9b7':'letmein',
  'd8578edf8458ce06fbc5bb76a58c5ca4':'qwerty',
  '482c811da5d5b4bc6d497ffa98491e38':'password123',
}

export default function HashCracker() {
  const [hash,     setHash]     = useState('')
  const [cracking, setCracking] = useState(false)
  const [found,    setFound]    = useState(null)
  const [logs,     setLogs]     = useState(['[SYS] Hash Cracker initialized.','[SYS] Dictionary: '+DICTIONARY.length+' words loaded.','[SYS] Tip: try 5f4dcc3b5aa765d61d8327deb882cf99'])
  const [progress, setProgress] = useState(0)

  function crack() {
    if (!hash.trim() || cracking) return
    setCracking(true); setFound(null); setProgress(0)
    setLogs([`[SYS] Starting dictionary attack...`, `[HASH] Target: ${hash.toLowerCase().trim()}`, `[SYS] Testing ${DICTIONARY.length} common passwords...`])
    const target = hash.toLowerCase().trim()
    let i = 0
    const iv = setInterval(() => {
      if (i < DICTIONARY.length) {
        setLogs(l => [...l, `[TRY] ${DICTIONARY[i].padEnd(18)} → hashing...`])
        setProgress(Math.round(((i+1)/DICTIONARY.length)*100))
        if (KNOWN[target] === DICTIONARY[i]) {
          setFound(DICTIONARY[i])
          setLogs(l => [...l, ``, `[SUCCESS] ✓ PASSWORD CRACKED: "${DICTIONARY[i]}"`])
          clearInterval(iv); setCracking(false); setProgress(100); return
        }
        i++
      } else {
        setLogs(l => [...l, `[INFO] Dictionary exhausted. Hash not found in wordlist.`])
        clearInterval(iv); setCracking(false); setProgress(100)
      }
    }, 100)
  }

  const EXAMPLES = [
    { hash:'5f4dcc3b5aa765d61d8327deb882cf99', label:'MD5 "password"' },
    { hash:'e10adc3949ba59abbe56e057f20f883e', label:'MD5 "123456"'   },
    { hash:'21232f297a57a5a743894a0e4a801fc3', label:'MD5 "admin"'    },
  ]

  return (
    <div className="animate-fade">
      <SectionTitle color="var(--accent-red)" icon="💥">HASH CRACKER — DICTIONARY ATTACK ENGINE</SectionTitle>
      <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
        <Input value={hash} onChange={e => setHash(e.target.value)} placeholder="Paste MD5/SHA hash here..." accent="var(--accent-red)" style={{ flex: 1 }} />
        <Button onClick={crack} disabled={cracking} accent="var(--accent-red)">{cracking ? `CRACKING ${progress}%` : '▶ CRACK HASH'}</Button>
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <span style={{ color: 'var(--text-dim)', fontSize: 10, fontFamily: 'var(--font-mono)', alignSelf: 'center' }}>TRY:</span>
        {EXAMPLES.map(e => (
          <button key={e.hash} onClick={() => setHash(e.hash)} style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)', color: 'var(--text-secondary)', padding: '4px 10px', borderRadius: 4, cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 10 }}>
            {e.label}
          </button>
        ))}
      </div>
      {cracking && (
        <div style={{ marginBottom: 12 }}>
          <div style={{ height: 4, background: 'var(--bg-hover)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: 'var(--accent-red)', transition: 'width 0.1s', borderRadius: 2 }} />
          </div>
        </div>
      )}
      {found && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'var(--accent-red)11', border: '1px solid var(--accent-red)', borderRadius: 8, padding: '14px 18px', marginBottom: 14 }}>
          <span style={{ fontSize: 24 }}>🔓</span>
          <div>
            <div style={{ color: 'var(--accent-red)', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 1, marginBottom: 4 }}>PASSWORD CRACKED</div>
            <div style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 700 }}>{found}</div>
          </div>
          <Badge color="var(--accent-red)" size="lg">VULNERABLE</Badge>
        </div>
      )}
      <Terminal lines={logs} color="var(--accent-red)" height={220} />
    </div>
  )
}
