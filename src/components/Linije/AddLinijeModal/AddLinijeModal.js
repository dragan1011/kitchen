import { Fragment, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import classes from './AddLinijeModal.module.css';

import { db } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore"; 

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalOverlay = (props) => {

   

  const [naziv, setNaziv] = useState('')
  const [lokacija, setLokacija] = useState('')
  const [odjel, setOdjel] = useState('')
  const [nazivIsValid, setNazivIsValid] = useState(false)
  const [lokacijaIsValid, setLokacijaIsValid] = useState(false)
  const [odjelIsValid, setOdjelIsValid] = useState(false)


  
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

    if (naziv.trim() == '' || naziv.trim().length == 0 || naziv.length>0&&naziv.length<3) {
      return setNazivIsValid(true)
    }
    if (lokacija === ''|| lokacija === null || lokacija === 'Izaberite lokaciju') {
      return setLokacijaIsValid(true)
    }
    if (odjel === ''|| odjel === null || odjel === 'Izaberite odjel') {
      return setOdjelIsValid(true)
    }

    notify();

     setTimeout( async()=> {

    await setDoc(doc(db, "linije", `${naziv}`), {
      naziv:naziv,
      lokacija:lokacija,
      odjel: odjel
    });

 close() 
}, 1000);
 
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
   <label className={classes.label}>Naziv</label>
    <input onChange={e => setNaziv(e.target.value)}  className={classes.input} type="text" />
    {nazivIsValid&&naziv.length<=0 ? <label className={classes.labelUpozorenja}>Ovo je polje obavezno i ne može biti prazno!</label>:""}
     {nazivIsValid&&naziv.length>0&&naziv.length<3 ? <label className={classes.labelUpozorenja}>Morate unijeti više od tri karaktera!</label>:""}
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Lokacija</label>
    <select onChange={e => setLokacija(e.target.value)}  className={classes.input} type="text" >
    <option className={classes.option}>Izaberite lokaciju</option>
      <option className={classes.option}>Klinički centar</option>
      </select>
      {lokacijaIsValid&&lokacija==='Izaberite grupu' ? <label className={classes.labelUpozorenja}>Morate izabrati grupu namirnica!</label>:""}
      {lokacijaIsValid&&lokacija==='' ? <label className={classes.labelUpozorenja}>Morate izabrati grupu namirnica!</label>:""}
      {lokacijaIsValid&&lokacija===null ? <label className={classes.labelUpozorenja}>Morate izabrati grupu namirnica!</label>:""}
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Odjel</label>
    <select onChange={e => setOdjel(e.target.value)} className={classes.input} type="text" >
    <option className={classes.option}>Izaberite odjel</option>
      <option className={classes.option}>1070 - Klinika za dječiju hirurgiju</option>
      </select>
      {odjelIsValid&&odjel==='Izaberite grupu' ? <label className={classes.labelUpozorenja}>Morate izabrati grupu namirnica!</label>:""}
      {odjelIsValid&&odjel==='' ? <label className={classes.labelUpozorenja}>Morate izabrati grupu namirnica!</label>:""}
      {odjelIsValid&&odjel===null ? <label className={classes.labelUpozorenja}>Morate izabrati grupu namirnica!</label>:""}
   </div>
   <footer className={classes.actions}>
          <button type='submit' className={classes.button}>Dodaj liniju</button>
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