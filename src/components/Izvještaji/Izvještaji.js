import React, { useState, useEffect, useRef } from 'react'
import NarudžbaTabela from './IzvještajiTabela'
import { useReactToPrint } from 'react-to-print'
import { db } from "../../firebase";
import { onSnapshot, collection } from "@firebase/firestore"
import { saveAs } from 'file-saver';
import ReactDOM from 'react-dom'
import classes from './Izvještaji.module.css'
function Izvjestaji() {

  //Lista dijeta za prikaz
  useEffect(()=> onSnapshot(collection(db, "dijete"), (snapshot) => 
  setData(snapshot.docs.map((doc) => doc.data())) ), [])

  const [searchTermNarudžbe, setSearchTermNarudžbe] = useState('')
  const [data, setData] = useState([])

  const searchNarudžbe = (data) => {
    return data.filter(
     (item)=> 
     item.naziv.toString().toLowerCase().includes(searchTermNarudžbe.toLowerCase()) ||
     item.dorucak.length.toString().toLowerCase().includes(searchTermNarudžbe.toLowerCase()) ||
     item.rucak.length.toString().toLowerCase().includes(searchTermNarudžbe.toLowerCase()) ||
     item.vecera.length.toString().toLowerCase().includes(searchTermNarudžbe.toLowerCase()) ||
     item.dorucak.toString().toLowerCase().includes(searchTermNarudžbe.toLowerCase()) ||
     item.rucak.toString().toLowerCase().includes(searchTermNarudžbe.toLowerCase()) ||
     item.vecera.toString().toLowerCase().includes(searchTermNarudžbe.toLowerCase())
   ) 
 }

 const componentRef = useRef();
 const handlePrint = useReactToPrint({
  content: () => componentRef.current,
 })

 const saveFile = () => {

  const node = document.getElementById('content').textContent;
  console.log(node)

  const blob = new Blob([node], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, 'content.txt');

 
}



  return (
 <div className={classes.dijeteWrapper}>
   <div className={classes.prikazJelovnik}>

  <div className={classes.dijelovi}>
    <div className={`${classes.components} ${classes.position} `}>
   <input type="text" onChange={event => {setSearchTermNarudžbe(event.target.value)}} placeholder='Brza pretraga...' className={classes.searchJelo} />
    
 <button onClick={handlePrint} className={classes.add}>Štampaj izvještaj</button>
 <button onClick={saveFile} className={classes.print}>Štampaj tekstualni dokument</button>
   </div>
   <div id='content' ref={componentRef}>
   <div className={classes.row_heading}>
    <div className={`${classes.heading} ${classes.dijeteNardžba}`}>Dijete</div>
    <div className={`${classes.heading} ${classes.dorucakNardžba}`}>Doručak</div>
    <div className={`${classes.heading} ${classes.rucakNardžba}`}>Ručak</div>
    <div className={`${classes.heading} ${classes.veceraNardžba}`}>Večera</div>
  </div>
    <NarudžbaTabela data={searchNarudžbe(data)}  />
    </div>
    </div>
    </div>
</div>


  );
}

export default Izvjestaji