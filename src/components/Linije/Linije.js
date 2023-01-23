import React, { useState, useEffect } from 'react'
import DijetaTabela from './LinijeTabela';
import AddNamirniceModal from './AddLinijeModal/AddLinijeModal';

import { db } from "../../firebase";
import { onSnapshot, collection } from "@firebase/firestore"

import classes from './Linije.module.css'

function Namirnice() {

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
      item.naziv.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.lokacija.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.odjel.toString().toLowerCase().includes(searchTerm.toLowerCase())
    ) 
  }


 useEffect(()=> onSnapshot(collection(db, "linije"), (snapshot) => 
  setData(snapshot.docs.map((doc) => doc.data())) ), [])


  return (
   
 <div className={classes.dijeteWrapper}>
  <div className={classes.components}>
    <input type="text" onChange={event => {setSearchTerm(event.target.value)}} placeholder='Brza pretraga...' className={classes.search} />
    <button onClick={modal} className={classes.add}>Dodaj novu liniju</button>
   { isModal && <AddNamirniceModal closeModal={setIsModal} title="Dodaj novu namirnicu" />}
        </div>
    <div className={classes.row_heading}>
    <div className={`${classes.heading} ${classes.naziv}`}>Naziv</div>
    <div className={`${classes.heading} ${classes.lokacija}`}>Lokacija</div>
    <div className={`${classes.heading} ${classes.odjel}`}>Odjel</div>
  </div>
    <DijetaTabela data={search(data)}  />

</div>
  );
}

export default Namirnice