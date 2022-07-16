import React from 'react'
import style from './form.module.css'

function Card(props) {
  return (
    <div className={`${style.form} ${props.className}`}>
      {props.children}
    </div>
  )
}

export default Card