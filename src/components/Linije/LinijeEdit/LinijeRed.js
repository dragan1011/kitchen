import React from 'react'
import classes from '../LinijeTabela.module.css'


export const DIjetaRed = props => {

  let key = 0;
  key++;

 const openModalHandler = () => {
    const tempData = {naziv: props.naziv, lokacija: props.lokacija, odjel: props.odjel}
    props.open(tempData);
 }

  return (
    <div className={classes.row} key={key} onDoubleClick={openModalHandler}>
        <div className={`${classes.cell} ${classes.naziv}`}>{props.naziv}</div>
        <div className={`${classes.cell} ${classes.lokacija}`}>{props.lokacija}</div>
         <div className={`${classes.cell} ${classes.odjel}`}>{props.odjel}</div>
       
    </div>
  )
}
