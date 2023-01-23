import React, { useState, useEffect } from 'react'
import DijetaTabela from './JeloTabela';
import AddNamirniceModal from './AddJeloModal/AddJeloModal';

import { db } from "../../firebase";
import { onSnapshot, collection } from "@firebase/firestore"
import classes from './Jelo.module.css'

function Namirnice() {

  const [searchTerm, setSearchTerm] = useState('')
  const [isModal, setIsModal] = useState(false)
  const [data, setData] = useState([])
  //const [filter, setFilter] = useState('')

  const modal = () => {
    setIsModal(true)
    document.body.style.overflow = 'hidden'
   }

  const search = (data) => {
     return data.filter(
      (item)=> 
      item.sifra.toString().toLowerCase().includes(searchTerm) ||
      item.naziv.toString().toLowerCase().includes(searchTerm) ||
      item.grupa.toString().toLowerCase().includes(searchTerm) ||
      item.magacin.toString().toLowerCase().includes(searchTerm)
    ) 
  }
/* 
  const filterSearch = (value) =>{
     return value.filter((item)=>
     )
 }
   */

 useEffect(()=> onSnapshot(collection(db, "jelo"), (snapshot) =>
  setData(snapshot.docs.map((doc) => doc.data())) ), [])


  return (
   
 <div className={classes.dijeteWrapper}>
{/*  {  <select onChange={event => {setFilter(event.target.value)}} className={classes.search} >
    <option></option>
    <option>Ostalo</option>
    </select> } */}
  <div className={classes.components}>
    <input type="text" onChange={event => {setSearchTerm(event.target.value)}} placeholder='Brza pretraga...' className={classes.search} />
    <button onClick={modal} className={classes.add}>Dodaj novo jelo</button>
   { isModal && <AddNamirniceModal closeModal={setIsModal} title="Dodaj novo jelo" />}

        </div>
    <div className={classes.row_heading}>
    <div className={`${classes.heading} ${classes.naziv}`}>Šifra</div>
    <div className={`${classes.heading} ${classes.sifra}`}>Naziv</div>
    <div className={`${classes.heading} ${classes.grupa}`}>Grupa</div>
    <div className={`${classes.heading} ${classes.magacin}`}>Magacin</div>
  </div>
    <DijetaTabela data={search(data)}  />

</div>
  );
}

export default Namirnice