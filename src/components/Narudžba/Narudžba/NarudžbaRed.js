import React from 'react'
import classes from './NarudžbaTabela.module.css'
import { useState } from 'react';
export const DIjetaRed = props => {

  
  let key = 0;
  key++;

  const [isModal, setIsModal] = useState(false)

 const openModalHandler = () => {
    const tempData = {dijeta: props.dijeta, odjel: props.odjel, dorucak: props.dorucak, rucak: props.rucak, vecera: props.vecera}
    props.open(tempData);
 }
 const modal = () => {
  setIsModal(true)
  document.body.style.overflow = 'hidden'
 }

  return (
    <div className={classes.velikiRed}>
    <div className={classes.row} key={Math.random()}>
        <div className={`${classes.cell} ${classes.prvi}`}>{props.odjel}</div>
        <div className={`${classes.cell} ${classes.prvi}`}>{props.dijeta}</div>
        <div className={`${classes.cell} ${classes.naziv}`}>{props.dorucak}</div>
        <div className={`${classes.cell} ${classes.naziv}`}>{props.rucak}</div>
        <div className={`${classes.cell} ${classes.naziv}`}>{props.vecera}</div>
    </div>
    </div>
  )
}
