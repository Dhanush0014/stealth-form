import React from 'react';
import  style from './Button.module.css';

function Button(props) {
  return (
    <button
      className={style.button}
      onClick={props.onClick}
      type={props.type || 'button'}
    >{props.children} </button>
  )
}

export default Button