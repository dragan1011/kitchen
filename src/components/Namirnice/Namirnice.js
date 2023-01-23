import React, { useState, useEffect } from 'react'
import DijetaTabela from './NamirniceTabela';
import AddNamirniceModal from './AddNamirniceModal/AddNamirniceModal';

import { db } from "../../firebase";
import { onSnapshot, collection } from "@firebase/firestore"

//import  MOCK_DATA  from '../../MOCK_DATA.json'
import classes from './Namirnice.module.css'

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
      item.sifra.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.naziv.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.grupa.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.jm.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.jestiviDio.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.naStanju.toString().includes(searchTerm.toLowerCase())||
      item.napomena.toString().toLowerCase().includes(searchTerm.toLowerCase())
    ) 
  }


 useEffect(()=> onSnapshot(collection(db, "namirnice"), (snapshot) => 
  setData(snapshot.docs.map((doc) => doc.data())) ), [])


  return (
   
 <div className={classes.dijeteWrapper}>
  <div className={classes.components}>
    <input type="text" onChange={event => {setSearchTerm(event.target.value)}} placeholder='Brza pretraga...' className={classes.search} />
    <button onClick={modal} className={classes.add}>Dodaj novu namirnicu</button>
   { isModal && <AddNamirniceModal closeModal={setIsModal} title="Dodaj novu namirnicu" />}
        </div>
    <div className={classes.row_heading}>
    <div className={`${classes.heading} ${classes.sifra}`}>Šifra</div>
    <div className={`${classes.heading} ${classes.naziv}`}>Naziv</div>
    <div className={`${classes.heading} ${classes.detalji}`}>Grupa</div>
    <div className={`${classes.heading} ${classes.opis}`}>JM</div>
    <div className={`${classes.heading} ${classes.broj}`}>Jestivi dio</div>
    <div className={`${classes.heading} ${classes.broj}`}>Na stanju</div>
    <div className={`${classes.heading} ${classes.napomena}`}>Napomena</div>
  </div>
    <DijetaTabela data={search(data)}  />

</div>
  );
}

export default Namirnice