import React, { useState, useEffect } from 'react'
import DijetaTabela from './JelovnikTabela';
import JeloTabela from './Jelo/JeloTabela';
import NamirniceTabela from './Namirnice/NamirniceTabela'
import useWindowDimensions from '../Hooks/getWindowDimensions/getWindowDimensions'
import Narudžba from './Narudžba/Narudžba'



import { db } from "../../firebase";
import { onSnapshot, collection } from "@firebase/firestore"

import classes from './Narudžba.module.css'

function Namirnice() {

  let { height, width } = useWindowDimensions();


  //Lista dijeta za prikaz
  useEffect(()=> onSnapshot(collection(db, "dijete"), (snapshot) => 
  setData(snapshot.docs.map((doc) => doc.data())) ), [])
   //Lista jela za prikaz
   useEffect(()=> onSnapshot(collection(db, "jelo"), (snapshot) => 
   setJelo(snapshot.docs.map((doc) => doc.data())) ), [])
   //Lista dijeta za prikaz
   useEffect(()=> onSnapshot(collection(db, "namirnice"), (snapshot) => 
   setDijeta(snapshot.docs.map((doc) => doc.data())) ), [])

  const [searchTermJelovnik, setSearchTermJelovnik] = useState('')
  const [searchTermJelo, setSearchTermJelo] = useState('')
  const [searchTermNamirnice, setSearchTermNamirnice] = useState('')
  const [data, setData] = useState([])
  const [jelo, setJelo] = useState([])
  const [dijeta, setDijeta] = useState([])
  const [prikazNarudžba, setPrikazNarudžba] = useState(true)
  const [prikazJelovnik, setPrikazJelovnik] = useState(false)
  const [prikazJela, setPrikazJela] = useState(false)
  const [prikazNamirnice, setPrikazNamirnice] = useState(false)


  const search = (data) => {
     return data.filter(
      (item)=> 
      item.naziv.toString().toLowerCase().includes(searchTermJelovnik.toLowerCase()) ||
      item.dorucak.toString().toLowerCase().includes(searchTermJelovnik.toLowerCase()) ||
      item.rucak.toString().toLowerCase().includes(searchTermJelovnik.toLowerCase()) ||
      item.vecera.toString().toLowerCase().includes(searchTermJelovnik.toLowerCase())
    ) 
  }

  const searchJelo = (data) => {
    return data.filter(
     (item)=> 
     item.sifra.toString().toLowerCase().includes(searchTermJelo.toLowerCase()) ||
     item.naziv.toString().toLowerCase().includes(searchTermJelo.toLowerCase()) ||
     item.grupa.toString().toLowerCase().includes(searchTermJelo.toLowerCase()) ||
     item.magacin.toString().toLowerCase().includes(searchTermJelo.toLowerCase())
   ) 
 }
 const searchNamirnice = (data) => {
  return data.filter(
   (item)=> 
   item.sifra.toString().toLowerCase().includes(searchTermNamirnice.toLowerCase()) ||
   item.naziv.toString().toLowerCase().includes(searchTermNamirnice.toLowerCase()) ||
   item.naStanju.toString().toLowerCase().includes(searchTermNamirnice.toLowerCase())
 ) 
}
const narudžbaToggle = () =>{
  setPrikazNarudžba(!prikazNarudžba)
}
  const jelovnikToggle = () =>{
    setPrikazJelovnik(!prikazJelovnik)
  }
  const jelaToggle = () =>{
    setPrikazJela(!prikazJela)
  }
  const namirniceToggle = () =>{
    setPrikazNamirnice(!prikazNamirnice)
  }

height = height -225;


  return (
 <div className={classes.dijeteWrapper}>
   <button style={{backgroundColor: `${prikazNarudžba ? '#289944' : '#e94d4d'}` ,border: `1px solid ${prikazNarudžba ? '#289944' : '#e94d4d'}`} } className={classes.toggle} onClick={narudžbaToggle}>Narudžba</button>
  <button style={{backgroundColor: `${prikazJelovnik ? '#289944' : '#e94d4d'}` ,border: `1px solid ${prikazJelovnik ? '#289944' : '#e94d4d'}`} } className={classes.toggle} onClick={jelovnikToggle}>Jelovnik</button>
  <button style={{backgroundColor: `${prikazJela ? '#289944' : '#e94d4d'}` ,border: `1px solid ${prikazJela ? '#289944' : '#e94d4d'}`} } className={classes.toggle} onClick={jelaToggle}>Jela</button>
  <button style={{backgroundColor: `${prikazNamirnice ? '#289944' : '#e94d4d'}` ,border: `1px solid ${prikazNamirnice ? '#289944' : '#e94d4d'}`} } className={classes.toggle} onClick={namirniceToggle}>Namirnice</button>
  <div className={classes.prikazJelovnik}>

  {/* {prikazNarudžba && <div className={classes.dijelovi}>
    <div className={`${classes.components} ${classes.position} `}>
   <input type="text" onChange={event => {setSearchTermNarudžbe(event.target.value)}} placeholder='Brza pretraga...' className={classes.searchJelo} />
   </div>
   <div className={classes.row_heading}>
    <div className={`${classes.heading} ${classes.dijeteNardžba}`}>Dijete</div>
    <div className={`${classes.heading} ${classes.dorucakNardžba}`}>Doručak</div>
    <div className={`${classes.heading} ${classes.rucakNardžba}`}>Ručak</div>
    <div className={`${classes.heading} ${classes.veceraNardžba}`}>Večera</div>
  </div>
    <NarudžbaTabela data={searchNarudžbe(data)}  />
  
    </div>} */}

   { prikazNarudžba &&<Narudžba />}

  { prikazJelovnik &&  <div className={`${classes.dijelovi}`}>
  <div className={`${classes.components} ${classes.position} `}>
    <input type="text" onChange={event => {setSearchTermJelovnik(event.target.value)}} placeholder='Brza pretraga...' className={classes.search} />
        </div>
    <div className={classes.row_heading}>
    <div className={`${classes.heading} ${classes.naziv}`}>Jelovnik</div>
  </div>
  <div className={classes.jelovnik} style={ {height: `${height}px`}}> 
    <DijetaTabela data={search(data)}  />
    </div>
    </div>}
   {prikazJela && <div className={`${classes.dijelovi}`}>
    <div className={`${classes.components} ${classes.position} `}>
   <input type="text" onChange={event => {setSearchTermJelo(event.target.value)}} placeholder='Brza pretraga...' className={classes.searchJelo} />
   </div>
   <div className={classes.row_heading}>
    <div className={`${classes.heading} ${classes.nazivJelo}`}>Šifra</div>
    <div className={`${classes.heading} ${classes.sifraJelo}`}>Naziv</div>
    <div className={`${classes.heading} ${classes.grupaJelo}`}>Grupa</div>
    <div className={`${classes.heading} ${classes.magacinJelo}`}>Magacin</div>
  </div>
    <JeloTabela data={searchJelo(jelo)}  />
    </div>}
    {prikazNamirnice && <div className={classes.dijelovi}>
    <div className={`${classes.components} ${classes.position} `}>
   <input type="text" onChange={event => {setSearchTermNamirnice(event.target.value)}} placeholder='Brza pretraga...' className={classes.searchJelo} />
   </div>
   <div className={classes.row_heading}>
   <div className={`${classes.heading} ${classes.sifraNamirnica}`}>Šifra</div>
    <div className={`${classes.heading} ${classes.nazivNamirnica}`}>Naziv</div>
    <div className={`${classes.heading} ${classes.naStanjuNamirnica}`}>Na stanju</div>
  </div>
    { <NamirniceTabela data={searchNamirnice(dijeta)}  /> }
    </div>}
    </div>
</div>


  );
}

export default Namirnice