import React from 'react'
import classes from '../DijetaTabela.module.css'


export const DIjetaRed = props => {
 const openModalHandler = () => {
    const tempData = {sifra: props.sifra, naziv: props.naziv, 
        detalji_dijete: props.detalji_dijete, opis: props.opis, broj_obroka: props.broj_obroka, napomena: props.napomena}
    props.open(tempData);
 }

  return (
    <div className={classes.row} key={props.sifra} onDoubleClick={openModalHandler}>
        <div className={`${classes.cell} ${classes.sifra}`}>{props.sifra}</div>
        <div className={`${classes.cell} ${classes.naziv}`}>{props.naziv}</div>
        <div className={`${classes.cell} ${classes.detalji}`}>{props.detalji_dijete}</div>
        <div className={`${classes.cell} ${classes.opis}`}>{props.opis}</div>
        <div className={`${classes.cell} ${classes.broj}`}>{props.broj_obroka}</div>
        <div className={`${classes.cell} ${classes.napomena}`}>{props.napomena}</div>
    </div>
  )
}
