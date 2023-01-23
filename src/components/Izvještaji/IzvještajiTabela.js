import React, {useState} from 'react'
import classes from './IzvještajiTabela.module.css'

import styles from './Izvještaji.module.css'
import { DIjetaRed } from './IzvještajiRed'

export default function DijetaTabela(props) {

  const [edit, setEdit] = useState(false)
  const [modalData, setModalData] = useState([])


  const openModalHandler = (data) => {
    setModalData(data)
    setEdit(true)
  }
  let dorucak = 0
  let rucak = 0
  let vecera = 0

  {props.data.map(item => (
    dorucak += item.dorucak.length
  ))}
  {props.data.map(item => (
    rucak += item.rucak.length
  ))}
  {props.data.map(item => (
    vecera += item.vecera.length
  ))}

  return (
    <div className={classes.dijeteWrapper}>
      {props.data.sort((a,b) => +a.sifra > +b.sifra ? 1 : -1).map(item =>
         <DIjetaRed key={item.sifra} {...item} open={openModalHandler}></DIjetaRed>
         )}
           <div className={styles.row_footer}>
    <div className={`${styles.heading} ${styles.dijeteNardžba}`}>Ukupno</div>
    <div className={`${styles.heading} ${styles.dorucakNardžba}`}>{dorucak}</div>
    <div className={`${styles.heading} ${styles.rucakNardžba}`}>{rucak}</div>
    <div className={`${styles.heading} ${styles.veceraNardžba}`}>{vecera}</div>
  </div>
    </div>
  )
}
