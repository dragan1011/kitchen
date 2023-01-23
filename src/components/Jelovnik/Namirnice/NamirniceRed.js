import React from 'react'
import classes from './NamirniceTabela.module.css'


export const DIjetaRed = props => {
 const openModalHandler = () => {
    const tempData = {sifra: props.sifra, naziv: props.naziv, 
        grupa: props.grupa, jm: props.jm, jestiviDio: props.jestiviDio,naStanju:props.naStanju ,napomena: props.napomena}
    props.open(tempData);
 }

  return (
    <div className={classes.row} key={props.sifra} onDoubleClick={openModalHandler}>
        <div className={`${classes.cell} ${classes.sifraNamirnica}`}>{props.sifra}</div>
        <div className={`${classes.cell} ${classes.nazivNamirnica}`}>{props.naziv}</div>
        <div className={`${classes.cell} ${classes.brojNamirnica}`}>{props.naStanju}</div>
    </div>
  )
}
