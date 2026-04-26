import { useState } from 'react'
import { Card } from '../components/Card.jsx'
import { Badge } from '../components/Badge.jsx'
import { Button } from '../components/Button.jsx'
import { Textarea } from '../components/Input.jsx'
import { SectionTitle } from '../components/SectionTitle.jsx'

const RULES = [
  { pattern:/urgent|immediately|account.{0,20}suspend|verify.{0,20}now|act now/i,          label:'Urgency language',        weight:20 },
  { pattern:/click here|click.*link|http:\/\//i,                                            label:'Suspicious link present', weight:25 },
  { pattern:/dear customer|dear user|valued customer|dear account/i,                        label:'Generic salutation',      weight:15 },
  { pattern:/password|credential|login detail|verify.*account/i,                            label:'Credential harvesting',   weight:30 },
  { pattern:/\$[\d,]+|won.*prize|lottery|reward|free gift|congratulation/i,                 label:'Prize / money lure',      weight:25 },
  { pattern:/paypal|bank.{0,10}account|amazon|apple.{0,10}id|microsoft|netflix/i,           label:'Brand impersonation',     weight:20 },
  { pattern:/update.*information|confirm.*detail|verify.*identity/i,                        label:'Info verification request',weight:20 },
  { pattern:/will be (deleted|suspended|closed|terminated)/i,                               label:'Account threat',          weight:25 },
  { pattern:/\.ru|\.tk|\.xyz|bit\.ly|tinyurl|goo\.gl/i,                                    label:'Suspicious domain/TLD',   weight:30 },
]

const SAMPLES = [
  { label: 'Phishing Email', text: 'Dear Customer,\n\nYour PayPal account has been suspended due to suspicious activity. You must verify your credentials immediately or your account will be permanently deleted.\n\nClick here: http://paypal-verify.ru/login\n\nAct now — your account expires in 24 hours.' },
  { label: 'Legit Email',    text: 'Hi Sarah,\n\nJust a quick reminder that our team meeting is scheduled for Thursday at 3pm. Please review the agenda document I sent last week.\n\nSee you then,\nMark' },
]

export default function PhishingDetector() {
  const [text,   setText]   = useState('')
  const [result, setResult] = useState(null)

  function analyze() {
    if (!text) return
    const hits = RULES.filter(r => r.pattern.test(text))
    const score = Math.min(hits.reduce((s,r) => s+r.weight, 0), 100)
    setResult({ score, flags: hits, verdict: score > 60 ? 'PHISHING' : score > 25 ? 'SUSPICIOUS' : 'LIKELY SAFE' })
  }

  const V_COLOR = { PHISHING: 'var(--accent-red)', SUSPICIOUS: 'var(--accent-yellow)', 'LIKELY SAFE': 'var(--accent-teal)' }

  return (
    <div className="animate-fade">
      <SectionTitle color="var(--accent-green)" icon="🎣">PHISHING DETECTOR — EMAIL THREAT ANALYZER</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 20 }}>
        <div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            {SAMPLES.map(s => (
              <button key={s.label} onClick={() => { setText(s.text); setResult(null) }} style={{
                background: 'var(--bg-raised)', border: '1px solid var(--border)', color: 'var(--text-secondary)',
                padding: '5px 12px', borderRadius: 4, cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 10,
              }}>Load: {s.label}</button>
            ))}
          </div>
          <Textarea value={text} onChange={e => { setText(e.target.value); setResult(null) }} placeholder={'Paste email content here...\n\nThe analyzer checks for urgency language, suspicious links, brand impersonation, credential requests, and 9 other phishing indicators.'} rows={11} accent="var(--accent-green)" />
          <div style={{ marginTop: 12 }}>
            <Button onClick={analyze} accent="var(--accent-green)">▶ ANALYZE EMAIL</Button>
          </div>
        </div>
        <div>
          {!result && (
            <Card style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center', color: 'var(--text-dim)' }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🎣</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>Paste an email and click Analyze</div>
              </div>
            </Card>
          )}
          {result && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Card accent={V_COLOR[result.verdict]} style={{ textAlign: 'center', padding: 20 }}>
                <div style={{ fontSize: 52, fontWeight: 700, color: V_COLOR[result.verdict], fontFamily: 'var(--font-mono)', lineHeight: 1 }}>{result.score}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 10, margin: '6px 0 12px', letterSpacing: 1 }}>THREAT SCORE / 100</div>
                <Badge color={V_COLOR[result.verdict]} size="lg">{result.verdict}</Badge>
                <div style={{ marginTop: 14, height: 8, background: 'var(--bg-hover)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: result.score+'%', background: V_COLOR[result.verdict], transition: 'width 0.5s', borderRadius: 4 }} />
                </div>
              </Card>
              <Card accent={V_COLOR[result.verdict]}>
                <div style={{ color: 'var(--text-secondary)', fontSize: 10, fontFamily: 'var(--font-mono)', marginBottom: 12, letterSpacing: 1 }}>
                  RED FLAGS ({result.flags.length} / {RULES.length})
                </div>
                {result.flags.length === 0
                  ? <div style={{ color: 'var(--accent-teal)', fontSize: 12 }}>✓ No red flags detected.</div>
                  : result.flags.map((f, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid var(--border-dim)' }}>
                      <span style={{ color: 'var(--accent-red)', fontSize: 12 }}>⚑ {f.label}</span>
                      <span style={{ color: 'var(--accent-orange)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>+{f.weight}</span>
                    </div>
                  ))
                }
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
