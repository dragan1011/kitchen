/* eslint-disable no-lone-blocks */
import React, {useState} from 'react'

import classes from './NarudžbaTabela.module.css'

import styles from './Narudžba.module.css'
import { DIjetaRed } from './NarudžbaRed'

export default function DijetaTabela(props) {

  const [edit, setEdit] = useState(false)
  const [modalData, setModalData] = useState([])


  const openModalHandler = (data) => {
    setModalData(data)
    setEdit(true)
  }
let datum = `${props.datum.slice(6,10)}-${props.datum.slice(0,2)}-${props.datum.slice(3,5)}`

return (
    <div className={classes.dijeteWrapper}>
      {props.data.map(item =>

datum === item.date ?   <DIjetaRed key={Math.random()} {...item} open={openModalHandler}></DIjetaRed> : ''
         )}
           <div className={styles.row_footer}>
  </div>
    </div>
  )
}
