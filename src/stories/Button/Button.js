import React from 'react'
import './Button.css'

function Button(props) {
  const { variant = 'primary', label, ...rest } = props
  return (
    <button className={`button ${variant}`} {...rest}>
        {label}
    </button>
  )
}

export default Button