import React from 'react'

import './MenuButton.css'

function MenuButton(props) {

  function handleClick(){
    props.select(props.name)
  }

  return (
    <button onClick={handleClick} className={`menuButton${props.activ === props.name ? " active" : ''}`}>{props.children}</button>
  )
}

export default MenuButton