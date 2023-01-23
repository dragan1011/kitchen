import React from 'react'
import classes from './IzvještajiTabela.module.css'
import { useState } from 'react';
export const DIjetaRed = props => {

  
  let key = 0;
  key++;

  const [isModal, setIsModal] = useState(false)

 const openModalHandler = () => {
    const tempData = {sifra:props.sifra, naziv: props.naziv, dorucak: props.dorucak, rucak: props.rucak, vecera: props.vecera}
    props.open(tempData);
 }
 const modal = () => {
  setIsModal(true)
  document.body.style.overflow = 'hidden'
 }

  return (
    <div className={`${classes.velikiRed} ${props.sifra / 2 % 1 ?classes.drugiRed : ''} ${props.sifra === "1" ? classes.prviRed : ''}`}>
    <div className={classes.row} key={props.sifra} onDoubleClick={openModalHandler}>
        <div className={`${classes.cell} ${classes.prvi}`}>{props.naziv}</div>
        <div className={`${classes.cell} ${classes.naziv}`}>{props.dorucak === '' ? '-' : props.dorucak}</div>
        <div className={`${classes.cell} ${classes.naziv}`}>{props.rucak === '' ? '-' : props.rucak}</div>
        <div className={`${classes.cell} ${classes.naziv}`}>{props.vecera === '' ? '-' : props.vecera}</div>
    </div>
    </div>
  )
}
