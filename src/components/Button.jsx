export function Button({ onClick, disabled, accent = 'var(--accent-green)', children, variant = 'outline', style = {} }) {
  const base = {
    border: `1px solid ${accent}`, borderRadius: 6, padding: '9px 20px',
    fontSize: 11, letterSpacing: 1, fontFamily: 'var(--font-mono)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.15s', opacity: disabled ? 0.5 : 1, ...style
  }
  const styles = variant === 'solid'
    ? { ...base, background: accent, color: '#030b14' }
    : { ...base, background: accent + '18', color: accent }
  return (
    <button onClick={disabled ? undefined : onClick} style={styles}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.background = accent + (variant === 'solid' ? 'dd' : '30') }}
      onMouseLeave={e => { if (!disabled) e.currentTarget.style.background = accent + (variant === 'solid' ? '' : '18') }}
    >{children}</button>
  )
}
