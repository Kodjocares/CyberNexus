export function Card({ children, accent, style = {} }) {
  return (
    <div style={{
      background: 'var(--bg-raised)', borderRadius: 10, padding: 20,
      border: `1px solid ${accent ? accent + '44' : 'var(--border)'}`,
      ...style
    }}>
      {children}
    </div>
  )
}
