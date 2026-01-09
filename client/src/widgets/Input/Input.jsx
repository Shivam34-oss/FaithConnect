import React, { forwardRef } from 'react'
import './Input.css'

const Input = forwardRef(({
  label,
  error,
  helperText,
  fullWidth = false,
  className = '',
  ...props
}, ref) => {
  const classes = [
    'input-wrapper',
    fullWidth && 'input-full-width',
    error && 'input-error',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      {label && <label className="input-label">{label}</label>}
      <input ref={ref} className="input" {...props} />
      {error && <span className="input-error-text">{error}</span>}
      {helperText && !error && (
        <span className="input-helper-text">{helperText}</span>
      )}
    </div>
  )
})

export default Input
