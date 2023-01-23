import React, {useState} from 'react'


import classes from './NamirniceTabela.module.css'
import { DIjetaRed } from './NamirniceRed'

export default function DijetaTabela(props) {

  const [edit, setEdit] = useState(false)
  const [modalData, setModalData] = useState([])

  const openModalHandler = (data) => {
    setModalData(data)
    setEdit(true)
  }


  return (
    <div className={classes.dijeteWrapper}>
      {props.data.sort((a,b) => +a.sifra > +b.sifra ? 1 : -1).map(item =>
         <DIjetaRed key={item.sifra} {...item} open={openModalHandler}></DIjetaRed>)}
    </div>
  )
}
