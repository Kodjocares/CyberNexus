import { useEffect, useRef } from 'react'

export function Terminal({ lines = [], height = 180, color = 'var(--accent-green)' }) {
  const ref = useRef()
  useEffect(() => { if (ref.current) ref.current.scrollTop = ref.current.scrollHeight }, [lines])
  return (
    <div ref={ref} style={{
      background: '#020810', border: `1px solid ${color}33`, borderRadius: 8,
      padding: '14px 16px', fontFamily: 'var(--font-mono)', fontSize: 12,
      color, minHeight: height, maxHeight: height, overflowY: 'auto', lineHeight: 1.7,
    }}>
      {lines.map((l, i) => <div key={i}>{l}</div>)}
      <span style={{ animation: 'blink 1s infinite' }}>█</span>
    </div>
  )
}
