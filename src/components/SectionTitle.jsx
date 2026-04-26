export function SectionTitle({ color, icon, children }) {
  return (
    <div style={{
      color, fontFamily: 'var(--font-mono)', letterSpacing: 2,
      fontSize: 12, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8,
    }}>
      <span>{icon}</span> {children}
    </div>
  )
}
