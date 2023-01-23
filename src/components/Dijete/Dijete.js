import React, { useState, useEffect } from 'react'
import DijetaTabela from './DijetaTabela';
import Modal from './AddDijeteModal/AddDijeteModal';

import { db } from "../../firebase";
import { onSnapshot, collection } from "@firebase/firestore"

import classes from './Dijete.module.css'

function Dijete() {

  const [searchTerm, setSearchTerm] = useState('')
  const [isModal, setIsModal] = useState(false)
  const [data, setData] = useState([])

  const modal = () => {
    setIsModal(true)
    document.body.style.overflow = 'hidden'
   }

  const search = (data) => {
    return data.filter(
      (item)=> 
      item.sifra.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.naziv.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.detalji_dijete.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.opis.toLowerCase().includes(searchTerm.toLowerCase())||
      item.broj_obroka.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.napomena.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }


 useEffect(()=> onSnapshot(collection(db, "dijete"), (snapshot) => 
  setData(snapshot.docs.map((doc) => doc.data())) ), [])

  console.log(data)

  return (
   
 <div className={classes.dijeteWrapper}>
  <div className={classes.components}>
    <input type="text" onChange={event => {setSearchTerm(event.target.value)}} placeholder='Brza pretraga...' className={classes.search} />
    <button onClick={modal} className={classes.add}>Dodaj novu dijetu</button>
   { isModal && <Modal closeModal={setIsModal} title="Dodaj novu dijetu" />}
   
        </div>
    <div className={classes.row_heading}>
    <div className={`${classes.heading} ${classes.sifra}`}>Šifra</div>
    <div className={`${classes.heading} ${classes.naziv}`}>Naziv</div>
    <div className={`${classes.heading} ${classes.detalji}`}>Detalji dijete</div>
    <div className={`${classes.heading} ${classes.opis}`}>Opis</div>
    <div className={`${classes.heading} ${classes.broj}`}>Broj obroka | Norma hljeba</div>
    <div className={`${classes.heading} ${classes.napomena}`}>Napomena</div>
  </div>
    <DijetaTabela data={search(data)}  />

</div>
  );
}

export default Dijete