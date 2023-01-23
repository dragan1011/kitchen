import React from 'react'
import classes from '../JelovnikTabela.module.css'
import { useState } from 'react';
import AddNamirniceModal from '../AddJelovnikModal/AddJelovnikModal'
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
    <div className={classes.velikiRed}>
    <div className={classes.row} key={props.sifra} onDoubleClick={openModalHandler}>
        <div className={`${classes.cell} ${classes.naziv}`}>{props.naziv}</div>
    </div>
    <div className={classes.row}>
      <div className={classes.obrok}>Doručak</div>
      <div className={classes.obrok}>Užina I</div>
      <div className={classes.obrok}>Ručak</div>
      <div className={classes.obrok}>Užina II</div>
      <div className={classes.obrok}>Večera</div>
      <div className={classes.zadnji}>Užina III</div>
    </div>
    <div className={`${classes.row} ${classes.border}`}>
      <div onClick={modal} className={classes.obrok}>{props.dorucak}</div>
      {isModal && <AddNamirniceModal closeModal={setIsModal} title="Dodaj jelo" />}
      <div className={classes.obrok}>/</div>
      <div onClick={modal} className={classes.obrok}>{props.rucak}</div>
      <div className={classes.obrok}>/</div>
      <div onClick={modal} className={classes.obrok}>{props.vecera}</div>
      <div className={classes.zadnji}>/</div>
    </div>
    <div className={classes.border_bottom}>
    <div className={classes.row}>
      <div className={classes.obrok}>Šifra</div>
      <div className={classes.obrok}>JM</div>
      <div className={classes.obrok}>OD</div>
      <div className={classes.obrok}>DO</div>
      <div className={classes.obrok}>U dijeti</div>
      <div className={classes.zadnji}>Kcal%</div>
    </div>
    <div className={classes.row}>
      <div className={classes.obrok}>KCAL</div>
      <div className={classes.obrok}>kCal</div>
      <div className={classes.obrok}>{props.detalji_dijete.slice(0,4)}</div>
      <div className={classes.obrok}>{props.detalji_dijete.slice(5,9)}</div>
      <div className={classes.obrok}></div>
      <div className={classes.zadnji}></div>
    </div>
    <div className={classes.row}>
      <div className={classes.obrok}>PROT</div>
      <div className={classes.obrok}>%</div>
      <div className={classes.obrok}></div>
      <div className={classes.obrok}></div>
      <div className={classes.obrok}></div>
      <div className={classes.zadnji}></div>
    </div>
    <div className={classes.row}>
      <div className={classes.obrok}>FAT</div>
      <div className={classes.obrok}>%</div>
      <div className={classes.obrok}></div>
      <div className={classes.obrok}></div>
      <div className={classes.obrok}></div>
      <div className={classes.zadnji}></div>
    </div>
    <div className={classes.row}>
      <div className={classes.obrok}>CARB</div>
      <div className={classes.obrok}>%</div>
      <div className={classes.obrok}></div>
      <div className={classes.obrok}></div>
      <div className={classes.obrok}></div>
      <div className={classes.zadnji}></div>
    </div>
    </div>
    <div className={classes.row}>
      <div className={classes.normaLijevo}>Norma hljeba</div>
      <div className={classes.normaDesno}>{props.broj_obroka}</div>
    </div>
    </div>
  )
}
