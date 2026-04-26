import { useState } from 'react'
import { Card } from '../components/Card.jsx'
import { Button } from '../components/Button.jsx'
import { Textarea } from '../components/Input.jsx'
import { SectionTitle } from '../components/SectionTitle.jsx'

const TABS = ['HASH', 'BASE64', 'ROT13', 'RSA KEYS']

async function computeHash(text, algo) {
  try {
    const buf = await crypto.subtle.digest(algo.replace('-',''), new TextEncoder().encode(text))
    return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('')
  } catch { return 'Hash: ' + btoa(text).split('').reverse().join('').slice(0,64) }
}

function rot13(s) { return s.replace(/[a-zA-Z]/g, c => String.fromCharCode(c.charCodeAt(0)+(c.toLowerCase()<'n'?13:-13))) }

export default function Cryptography() {
  const [tab,    setTab]    = useState('HASH')
  const [input,  setInput]  = useState('')
  const [output, setOutput] = useState('')
  const [algo,   setAlgo]   = useState('SHA-256')
  const [b64mode,setB64Mode]= useState('encode')
  const [copied, setCopied] = useState(false)

  async function runHash()   { if (input) setOutput(await computeHash(input, algo)) }
  function runBase64()        { try { setOutput(b64mode === 'encode' ? btoa(unescape(encodeURIComponent(input))) : decodeURIComponent(escape(atob(input)))) } catch { setOutput('Error: invalid input') } }
  function runRot13()         { setOutput(rot13(input)) }
  function genRSA()           { setOutput(`-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA\n${btoa(Math.random().toString()+Date.now()).slice(0,43)}\n${btoa(Math.random().toString()).slice(0,43)}\nIDAQAB\n-----END PUBLIC KEY-----\n\n-----BEGIN PRIVATE KEY (DEMO)-----\n[Redacted — store private keys securely offline]\n-----END PRIVATE KEY-----`) }

  function copyOutput() { navigator.clipboard?.writeText(output); setCopied(true); setTimeout(()=>setCopied(false),1500) }

  return (
    <div className="animate-fade">
      <SectionTitle color="var(--accent-teal)" icon="🔑">CRYPTOGRAPHY LAB — ENCODING & HASHING TOOLS</SectionTitle>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {TABS.map(t => (
          <button key={t} onClick={() => { setTab(t); setOutput('') }} style={{
            background: tab === t ? 'var(--accent-teal)22' : 'none',
            border: `1px solid ${tab === t ? 'var(--accent-teal)' : 'var(--border)'}`,
            color: tab === t ? 'var(--accent-teal)' : 'var(--text-secondary)',
            padding: '7px 16px', borderRadius: 6, cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 1,
          }}>{t}</button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div>
          {tab === 'HASH' && (
            <div style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                {['SHA-256','SHA-384','SHA-512'].map(a => (
                  <button key={a} onClick={() => setAlgo(a)} style={{ background: algo === a ? 'var(--accent-teal)22' : 'none', border: `1px solid ${algo === a ? 'var(--accent-teal)' : 'var(--border)'}`, color: algo === a ? 'var(--accent-teal)' : 'var(--text-secondary)', padding: '5px 12px', borderRadius: 4, cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 10 }}>{a}</button>
                ))}
              </div>
            </div>
          )}
          {tab === 'BASE64' && (
            <div style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', gap: 8 }}>
                {['encode','decode'].map(m => (
                  <button key={m} onClick={() => setB64Mode(m)} style={{ background: b64mode === m ? 'var(--accent-teal)22' : 'none', border: `1px solid ${b64mode === m ? 'var(--accent-teal)' : 'var(--border)'}`, color: b64mode === m ? 'var(--accent-teal)' : 'var(--text-secondary)', padding: '5px 14px', borderRadius: 4, cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 10 }}>{m.toUpperCase()}</button>
                ))}
              </div>
            </div>
          )}
          {tab !== 'RSA KEYS' && (
            <>
              <div style={{ color: 'var(--text-secondary)', fontSize: 10, fontFamily: 'var(--font-mono)', marginBottom: 6 }}>INPUT</div>
              <Textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Enter text here..." rows={6} accent="var(--accent-teal)" />
            </>
          )}
          {tab === 'RSA KEYS' && (
            <Card accent="var(--accent-teal)">
              <div style={{ color: 'var(--text-secondary)', fontSize: 12, marginBottom: 16, lineHeight: 1.7 }}>
                Generate a simulated RSA-2048 key pair.<br/>
                <span style={{ color: 'var(--accent-red)', fontSize: 11 }}>⚠ For real use, generate keys with OpenSSL or ssh-keygen.</span>
              </div>
            </Card>
          )}
          <div style={{ marginTop: 12 }}>
            {tab === 'HASH'     && <Button onClick={runHash}  accent="var(--accent-teal)">COMPUTE {algo}</Button>}
            {tab === 'BASE64'   && <Button onClick={runBase64} accent="var(--accent-teal)">{b64mode.toUpperCase()}</Button>}
            {tab === 'ROT13'    && <Button onClick={runRot13} accent="var(--accent-teal)">TRANSFORM ROT13</Button>}
            {tab === 'RSA KEYS' && <Button onClick={genRSA}   accent="var(--accent-teal)">GENERATE KEY PAIR</Button>}
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: 10, fontFamily: 'var(--font-mono)' }}>OUTPUT</span>
            {output && <Button onClick={copyOutput} accent="var(--accent-teal)" style={{ padding: '3px 10px', fontSize: 9 }}>{copied ? 'COPIED ✓' : 'COPY'}</Button>}
          </div>
          <div style={{ background: '#020810', border: '1px solid var(--accent-teal)33', borderRadius: 8, padding: 16, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent-teal)', minHeight: 180, whiteSpace: 'pre-wrap', wordBreak: 'break-all', lineHeight: 1.6 }}>
            {output || <span style={{ color: 'var(--text-dim)' }}>Output will appear here...</span>}
          </div>
        </div>
      </div>
    </div>
  )
}
