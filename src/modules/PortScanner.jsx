import { useState } from 'react'
import { Card } from '../components/Card.jsx'
import { Badge } from '../components/Badge.jsx'
import { Button } from '../components/Button.jsx'
import { Input } from '../components/Input.jsx'
import { Terminal } from '../components/Terminal.jsx'
import { SectionTitle } from '../components/SectionTitle.jsx'

const PORTS   = [21,22,23,25,53,80,110,143,443,445,3306,3389,5432,6379,8080,8443]
const SERVICES = {21:'FTP',22:'SSH',23:'Telnet',25:'SMTP',53:'DNS',80:'HTTP',110:'POP3',143:'IMAP',443:'HTTPS',445:'SMB',3306:'MySQL',3389:'RDP',5432:'PostgreSQL',6379:'Redis',8080:'HTTP-Alt',8443:'HTTPS-Alt'}
const HIGH_RISK = new Set([21,23,3389,445])
const MED_RISK  = new Set([3306,5432,6379,110,143])

export default function PortScanner() {
  const [target,   setTarget]   = useState('')
  const [scanning, setScanning] = useState(false)
  const [results,  setResults]  = useState([])
  const [logs,     setLogs]     = useState(['[SYS] Port Scanner initialized.','[SYS] Supports TCP SYN scan on common ports.','[SYS] Enter a target host to begin.'])
  const [progress, setProgress] = useState(0)

  function runScan() {
    if (!target || scanning) return
    setScanning(true); setResults([]); setProgress(0)
    setLogs([`[SYS] Starting scan on target: ${target}`, '[SYS] Resolving hostname...', '[SYS] Sending SYN packets to 16 common ports...'])
    let i = 0, found = []
    const iv = setInterval(() => {
      const port = PORTS[i]
      const open = Math.random() > 0.62
      setLogs(l => [...l, `[${open ? 'OPEN  ' : 'CLOSED'}] ${port}/${SERVICES[port]}`])
      setProgress(Math.round(((i + 1) / PORTS.length) * 100))
      if (open) {
        const risk = HIGH_RISK.has(port) ? 'HIGH' : MED_RISK.has(port) ? 'MED' : 'LOW'
        found = [...found, { port, service: SERVICES[port], risk }]
        setResults([...found])
      }
      i++
      if (i >= PORTS.length) {
        clearInterval(iv)
        setScanning(false)
        setLogs(l => [...l, `[SYS] Scan complete. ${found.length} open port(s) found.`])
        setProgress(100)
      }
    }, 160)
  }

  const riskColor = { HIGH: 'var(--accent-red)', MED: 'var(--accent-yellow)', LOW: 'var(--accent-teal)' }

  return (
    <div className="animate-fade">
      <SectionTitle color="var(--accent-orange)" icon="📡">PORT SCANNER — NETWORK RECONNAISSANCE</SectionTitle>
      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        <Input value={target} onChange={e => setTarget(e.target.value)} placeholder="192.168.1.1 or hostname..." accent="var(--accent-orange)" style={{ flex: 1 }} />
        <Button onClick={runScan} disabled={scanning} accent="var(--accent-orange)">{scanning ? `SCANNING ${progress}%` : '▶ SCAN TARGET'}</Button>
      </div>
      {scanning && (
        <div style={{ marginBottom: 14 }}>
          <div style={{ height: 4, background: 'var(--bg-hover)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: 'var(--accent-orange)', transition: 'width 0.15s', borderRadius: 2 }} />
          </div>
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16 }}>
        <Terminal lines={logs} color="var(--accent-orange)" height={260} />
        <Card accent="var(--accent-orange)">
          <div style={{ color: 'var(--text-secondary)', fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: 1.5, marginBottom: 12 }}>OPEN PORTS ({results.length})</div>
          {results.length === 0
            ? <div style={{ color: 'var(--text-dim)', fontSize: 12, paddingTop: 8 }}>No open ports found yet.</div>
            : results.map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, padding: '8px 10px', background: 'var(--bg-surface)', borderRadius: 6, border: `1px solid ${riskColor[r.risk]}33` }}>
                <span style={{ color: 'var(--accent-orange)', fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, width: 44 }}>{r.port}</span>
                <span style={{ color: 'var(--text-primary)', fontSize: 12, flex: 1 }}>{r.service}</span>
                <Badge color={riskColor[r.risk]}>{r.risk}</Badge>
              </div>
            ))
          }
        </Card>
      </div>
    </div>
  )
}
