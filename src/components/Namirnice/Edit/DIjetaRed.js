import React from 'react'
import classes from '../NamirniceTabela.module.css'


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
        <div className={`${classes.cell} ${classes.detalji}`}>{}</div>
        <div className={`${classes.cell} ${classes.opis}`}>{}</div>
        <div className={`${classes.cell} ${classes.broj}`}>{}</div>
        <div className={`${classes.cell} ${classes.broj}`}>{}</div>
        <div className={`${classes.cell} ${classes.napomena}`}>{}</div>
    </div>
  )
}
