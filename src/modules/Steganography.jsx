import { useState } from 'react'
import { Card } from '../components/Card.jsx'
import { Button } from '../components/Button.jsx'
import { Textarea } from '../components/Input.jsx'
import { SectionTitle } from '../components/SectionTitle.jsx'

export default function Steganography() {
  const [mode,   setMode]   = useState('encode')
  const [text,   setText]   = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  function encode() {
    if (!text) return
    try {
      const b64 = btoa(unescape(encodeURIComponent(text)))
      const binary = b64.split('').map(c => c.charCodeAt(0).toString(2).padStart(8,'0')).join(' ')
      setOutput(`STEGANOGRAPHIC PAYLOAD REPORT\n${'─'.repeat(50)}\n\nMethod:    LSB (Least Significant Bit)\nCarrier:   carrier_image.png (simulated)\nPayload:   ${text.length} character(s)\nEncoded:   ${b64.length} bytes\nAlgorithm: Base64 → Binary → LSB injection\n\nBINARY STREAM (first 160 bits):\n${binary.slice(0,160)}...\n\n✓ Message embedded successfully.\n  Use same tool with DECODE mode + payload to extract.`)
    } catch { setOutput('Encoding error.') }
  }

  function decode() {
    if (!text) return
    try {
      const clean = text.replace(/\s/g,'')
      if (/^[01]+$/.test(clean)) {
        const bytes = clean.match(/.{8}/g) || []
        const chars = bytes.map(b => String.fromCharCode(parseInt(b,2))).join('')
        setOutput('Decoded (binary→ASCII): ' + decodeURIComponent(escape(atob(chars))))
      } else {
        setOutput('Extracted message: ' + (text.length > 20 ? decodeURIComponent(escape(atob(text.trim()))) : text.split('').reverse().join('')))
      }
    } catch { setOutput('Extraction failed: invalid or non-steganographic data.') }
  }

  function copy() { navigator.clipboard?.writeText(output); setCopied(true); setTimeout(()=>setCopied(false),1500) }

  return (
    <div className="animate-fade">
      <SectionTitle color="#e879f9" icon="🖼️">STEGANOGRAPHY — LSB IMAGE ENCODING</SectionTitle>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {['encode','decode'].map(m => (
          <button key={m} onClick={() => { setMode(m); setOutput('') }} style={{
            background: mode === m ? '#e879f922' : 'none', border: `1px solid ${mode === m ? '#e879f9' : 'var(--border)'}`,
            color: mode === m ? '#e879f9' : 'var(--text-secondary)', padding: '7px 24px',
            borderRadius: 6, cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 1,
          }}>{m.toUpperCase()}</button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div>
          <div style={{ color: 'var(--text-secondary)', fontSize: 10, fontFamily: 'var(--font-mono)', marginBottom: 6 }}>
            {mode === 'encode' ? 'SECRET MESSAGE TO HIDE' : 'ENCODED PAYLOAD TO EXTRACT'}
          </div>
          <Textarea value={text} onChange={e => setText(e.target.value)}
            placeholder={mode === 'encode' ? 'Enter your secret message here...' : 'Paste Base64 or binary payload here...'} rows={7} accent="#e879f9" />
          <div style={{ marginTop: 12 }}>
            <Button onClick={mode === 'encode' ? encode : decode} accent="#e879f9">
              {mode === 'encode' ? '▶ HIDE MESSAGE IN IMAGE' : '▶ EXTRACT MESSAGE'}
            </Button>
          </div>
          <Card style={{ marginTop: 16, background: 'var(--bg-surface)' }}>
            <div style={{ color: 'var(--text-secondary)', fontSize: 11, lineHeight: 1.7 }}>
              <div style={{ color: '#e879f9', fontSize: 10, fontFamily: 'var(--font-mono)', marginBottom: 8 }}>HOW IT WORKS</div>
              LSB steganography embeds data in the least significant bits of image pixels. Each pixel's last bit is overwritten with one bit of the secret message — invisible to the human eye but recoverable by the decoder.
            </div>
          </Card>
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: 10, fontFamily: 'var(--font-mono)' }}>OUTPUT</span>
            {output && <Button onClick={copy} accent="#e879f9" style={{ padding: '2px 10px', fontSize: 9 }}>{copied ? 'COPIED ✓' : 'COPY'}</Button>}
          </div>
          <div style={{ background: '#020810', border: '1px solid #e879f933', borderRadius: 8, padding: 16, fontFamily: 'var(--font-mono)', fontSize: 11, color: '#e879f9', minHeight: 260, whiteSpace: 'pre-wrap', wordBreak: 'break-all', lineHeight: 1.7 }}>
            {output || <span style={{ color: 'var(--text-dim)' }}>Output will appear here...</span>}
          </div>
        </div>
      </div>
    </div>
  )
}
