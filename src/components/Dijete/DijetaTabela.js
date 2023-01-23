import React, {useState} from 'react'

import DijeteEdit from './DijeteEdit/DijeteEdit'

import classes from './DijetaTabela.module.css'
import { DIjetaRed } from './DijeteEdit/DIjetaRed'

export default function DijetaTabela(props) {

  const [edit, setEdit] = useState(false)
  const [modalData, setModalData] = useState([])

  const openModalHandler = (data) => {
    setModalData(data)
    setEdit(true)
  }


  return (
    <div className={classes.dijeteWrapper}>
      {edit && <DijeteEdit title="Izmjena dijete" data={modalData} closeModal={()=> setEdit(false)} />}
      {props.data.sort((a,b) => +a.sifra > +b.sifra ? 1 : -1).map(item =>
         <DIjetaRed key={item.sifra} {...item} open={openModalHandler}></DIjetaRed>)}
    </div>
  )
}
