import { Fragment, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import classes from './AddNamirniceModal.module.css';

import { db } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore"; 

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ModalOverlay = (props) => {

  
  const [sifra, setSifra] = useState('')
  const [naziv, setNaziv] = useState('')
  const [grupa, setGrupa] = useState('')
  const [jm, setJm] = useState('')
  const [jestiviDio, setjestiviDio] = useState('')
  const [naStanju, setNaStanju] = useState('')
  const [napomena, setNapomena] = useState('')
  const [sifraIsValid, setSifraIsValid] = useState(false)
  const [nazivIsValid, setNazivIsValid] = useState(false)
  const [grupaIsValid, setGrupaIsValid] = useState(false)
  const [jmIsValid, setJmIsValid] = useState(false)
  const [jestiviDioIsValid, setJestiviDioIsValid] = useState(false)
  const [naStanjuIsValid, setNaStanjuIsValid] = useState(false)
  const [napomenaIsValid, setNapomenaIsValid] = useState(false)

  
  useEffect(()=> {
    document.addEventListener('keydown', hideOnEscape, true)
  }, [])

   const hideOnEscape = (e) =>{
    if (e.key === "Escape") {
      close();
    }
  } 

  const notify = () => {
    toast.success('Uspješno dodano!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
      
  }

   const addNewData = async (e) => {
    e.preventDefault();


    if (sifra.trim() == '' || sifra.trim().length == 0) {
      return setSifraIsValid(true)
    }
    if (naziv.trim() == '' || naziv.trim().length == 0 || naziv.length>0&&naziv.length<2) {
      return setNazivIsValid(true)
    }
    if (grupa === ''|| grupa === null || grupa === 'Izaberite grupu') {
      return setGrupaIsValid(true)
    }
    if (jm.trim() == '' || jm.trim().length == 0) {
      return setJmIsValid(true)
    }
    if (jestiviDio.trim() == '' || jestiviDio.trim().length == 0) {
      return setJestiviDioIsValid(true)
    }
    if (naStanju.trim() == '' || naStanju.trim().length == 0) {
      return setNaStanjuIsValid(true)
    }
    if (napomena.trim() == '' || napomena.trim().length == 0 || napomena.length>0&&napomena.length<2) {
      return setNapomenaIsValid(true)
    }


    notify();

    setTimeout( async()=> {
    
    await setDoc(doc(db, "namirnice", `${sifra}`), {
      sifra:sifra,
      naziv:naziv,
      grupa:grupa,
      jm:jm,
      jestiviDio:jestiviDio,
      naStanju:naStanju,
      napomena:napomena
    });
 
 close();
}, 1000)
  } 

  const close = () => {
    props.closeModal(false)
    document.body.style.overflow = 'visible'
   } 

  return (
    <div>
       <ToastContainer />
      <div onClick={close} className={classes.backdrop} />
      <div className={`${classes.modal} ${classes.card}`}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
        <form onSubmit={addNewData} className={classes.modalWrapper}>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Šifra namirnice</label>
    <input onChange={e => setSifra(e.target.value)} className={classes.input} type="text" />
    {sifraIsValid&&sifra.length<=0 ? <label className={classes.labelUpozorenja}>Ovo je polje obavezno i ne može biti prazno!</label>:""}
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Naziv</label>
    <input onChange={e => setNaziv(e.target.value)} className={classes.input} type="text" />
    {nazivIsValid&&naziv.length<=0 ? <label className={classes.labelUpozorenja}>Ovo je polje obavezno i ne može biti prazno!</label>:""}
     {nazivIsValid&&naziv.length>0&&naziv.length<2 ? <label className={classes.labelUpozorenja}>Morate unijeti više od dva karaktera!</label>:""}
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Grupa</label>
    <select  onChange={e => setGrupa(e.target.value)} className={classes.select} type="text" >
      <option className={classes.option}>Izaberite grupu</option>
      <option className={classes.option}>Začini, mirodije i industrijske juhe</option>
      <option className={classes.option}>Povrće i proizvodi</option>
      <option className={classes.option}>Leguminoze i žitarice i proizvodi</option>
      <option className={classes.option}>Pića i napici</option>
      </select>
      {grupaIsValid&&grupa==='Izaberite grupu' ? <label className={classes.labelUpozorenja}>Morate izabrati grupu namirnica!</label>:""}
      {grupaIsValid&&grupa==='' ? <label className={classes.labelUpozorenja}>Morate izabrati grupu namirnica!</label>:""}
      {grupaIsValid&&grupa===null ? <label className={classes.labelUpozorenja}>Morate izabrati grupu namirnica!</label>:""}
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>JM</label>
    <input onChange={e => setJm(e.target.value)} className={classes.input} type="text" />
    {jmIsValid&&jm.length<=0 ? <label className={classes.labelUpozorenja}>Ovo je polje obavezno i ne može biti prazno!</label>:""}
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Jestivi dio</label>
    <input onChange={e => setjestiviDio(e.target.value)} className={classes.input} type="text" />
    {jestiviDioIsValid&&jestiviDio.length<=0 ? <label className={classes.labelUpozorenja}>Ovo je polje obavezno i ne može biti prazno!</label>:""}
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Na stanju</label>
    <input onChange={e => setNaStanju(e.target.value)} className={classes.input} type="text" />
    {naStanjuIsValid&&naStanju.length<=0 ? <label className={classes.labelUpozorenja}>Ovo je polje obavezno i ne može biti prazno!</label>:""}
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Napomena</label>
    <input onChange={e => setNapomena(e.target.value)} className={classes.input} type="text" />
    {napomenaIsValid&&napomena.length<=0 ? <label className={classes.labelUpozorenja}>Ovo je polje obavezno i ne može biti prazno!</label>:""}
   </div>
   <footer className={classes.actions}>
          <button type='submit' className={classes.button}>Dodaj namirnicu</button>
          <button onClick={close} className={classes.close}>Otkaži</button>
        </footer>
    </form>
        </div>
       
      </div>
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <ModalOverlay submitData={props.submitData} closeModal={props.closeModal} title={props.title}>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;