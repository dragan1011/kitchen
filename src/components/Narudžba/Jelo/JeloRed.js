import React from 'react'
import classes from './JeloTabela.module.css'


export const DIjetaRed = props => {

 const openModalHandler = () => {
    const tempData = {sifra: props.sifra, naziv: props.naziv, grupa: props.grupa, magacin:props.magacin}
    props.open(tempData);
 }


  return (
    <div className={classes.row} key={props.naziv} onDoubleClick={openModalHandler}>
        <div className={`${classes.cell} ${classes.sifra}`}>{props.sifra}</div>
        <div className={`${classes.cell} ${classes.naziv}`}>{props.naziv}</div>
         <div className={`${classes.cell} ${classes.grupa}`}>{props.grupa}</div>
         <div className={`${classes.cell} ${classes.magacin}`}>{props.magacin}</div>
       
    </div>
  )
}
