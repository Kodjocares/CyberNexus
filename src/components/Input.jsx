export function Input({ value, onChange, placeholder, accent = 'var(--accent-cyan)', style = {} }) {
  return (
    <input
      value={value} onChange={onChange} placeholder={placeholder}
      style={{
        background: 'var(--bg-raised)', border: `1px solid ${accent}44`,
        borderRadius: 6, padding: '10px 14px', color: 'var(--text-primary)',
        fontFamily: 'var(--font-mono)', fontSize: 12, outline: 'none',
        transition: 'border-color 0.2s', ...style
      }}
      onFocus={e => e.target.style.borderColor = accent}
      onBlur={e  => e.target.style.borderColor = accent + '44'}
    />
  )
}

export function Textarea({ value, onChange, placeholder, rows = 5, accent = 'var(--accent-cyan)' }) {
  return (
    <textarea
      value={value} onChange={onChange} placeholder={placeholder} rows={rows}
      style={{
        width: '100%', background: 'var(--bg-raised)', border: `1px solid ${accent}44`,
        borderRadius: 6, padding: '10px 14px', color: 'var(--text-primary)',
        fontFamily: 'var(--font-mono)', fontSize: 12, outline: 'none', resize: 'vertical',
        transition: 'border-color 0.2s',
      }}
      onFocus={e => e.target.style.borderColor = accent}
      onBlur={e  => e.target.style.borderColor = accent + '44'}
    />
  )
}
