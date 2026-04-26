export function Badge({ color, children, size = 'sm' }) {
  const pad = size === 'sm' ? '2px 8px' : '4px 14px'
  const fs  = size === 'sm' ? 10 : 12
  return (
    <span style={{
      background: color + '22', border: `1px solid ${color}55`,
      color, padding: pad, borderRadius: 3, fontSize: fs,
      fontFamily: 'var(--font-mono)', letterSpacing: 1, whiteSpace: 'nowrap',
    }}>{children}</span>
  )
}
