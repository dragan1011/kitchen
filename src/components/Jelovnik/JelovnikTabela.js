import React, {useState} from 'react'

import NamirniceEdit from './LinijeEdit/LinijeEdit'

import classes from './JelovnikTabela.module.css'
import { DIjetaRed } from './LinijeEdit/LinijeRed'

export default function DijetaTabela(props) {

  const [edit, setEdit] = useState(false)
  const [modalData, setModalData] = useState([])


  const openModalHandler = (data) => {
    setModalData(data)
    setEdit(true)
  }

  return (
    <div className={classes.dijeteWrapper}>
    {/*   {edit && <NamirniceEdit title="Izmjena jelovnika" data={modalData} closeModal={()=> setEdit(false)} />} */}
      {props.data.sort((a,b) => +a.sifra > +b.sifra ? 1 : -1).map(item =>
         <DIjetaRed key={item.sifra} {...item} open={openModalHandler}></DIjetaRed>
         )}
    </div>
  )
}
