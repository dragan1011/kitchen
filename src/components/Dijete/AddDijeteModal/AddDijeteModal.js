import { Fragment, useState } from 'react';
import ReactDOM from 'react-dom';

import classes from './AddDijeteModal.module.css';
import { db } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore"; 

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalOverlay = (props) => {

  const [sifra, setSifra] = useState('')
  const [naziv, setNaziv] = useState('')
  const [detalji, setDetalji] = useState('')
  const [opis, setOpis] = useState('')
  const [brojObroka, setBrojObroka] = useState('')
  const [napomena, setNapomena] = useState('')
  const [sifraIsValid, setSifraIsValid] = useState(false)
  const [nazivIsValid, setNazivIsValid] = useState(false)
  const [detaljiIsValid, setDetajiIsValid] = useState(false)
  const [opisIsValid, setOpisIsValid] = useState(false)
  const [brojObrokaIsValid, setBrojObrokaIsValid] = useState(false)
  const [napomenaIsValid, setNapomenaIsValid] = useState(false)



  const notify = () => {
    toast.success('Uspješno!', {
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
    if (naziv.trim() == '' || naziv.trim().length == 0 || naziv.length>0&&naziv.length<3) {
      return setNazivIsValid(true)
    }
    if (detalji.trim() == '' || detalji.trim().length == 0 || detalji.length>0&&detalji.length<3) {
      return setDetajiIsValid(true)
    }
    if (opis.trim() == '' || opis.trim().length == 0 || opis.length>0&&opis.length<3) {
      return setOpisIsValid(true)
    }
    if (brojObroka.trim() == '' || brojObroka.trim().length == 0 || brojObroka.length>0&&brojObroka.length<3) {
      return setBrojObrokaIsValid(true)
    }
    if (napomena.trim() == '' || napomena.trim().length == 0 || napomena.length>0&&napomena.length<2) {
      return setNapomenaIsValid(true)
    }
    notify();
   
    setTimeout( async()=> {
      await setDoc(doc(db, "dijete", `${sifra}`), {
        sifra:sifra,
        naziv:naziv,
        detalji_dijete:detalji,
        opis:opis,
        broj_obroka:brojObroka,
        napomena:napomena,
        dorucak:'',
        rucak:'',
        vecera:''
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
         <form onSubmit={addNewData} className={classes.modalWrapper} autoComplete="off" >
   <div className={classes.smallWrapper}>
   <label htmlFor='sifra' className={classes.label}>Šifra dijete</label>
    <input id='sifra' onChange={e => setSifra(e.target.value)} className={classes.input} type="number" />
    {sifraIsValid&&sifra.trim().length<=0 ? <label className={classes.labelUpozorenja}>Ovo ne može biti prazno, morate unijeti bar jedan karakter!</label>:""}
   </div>
   <div className={classes.smallWrapper}>
   <label htmlFor='naziv' className={classes.label}>Naziv</label>
    <input id='naziv' onChange={e => setNaziv(e.target.value)} className={classes.input} type="text" />
    {nazivIsValid&&naziv.trim().length<=0 ? <label className={classes.labelUpozorenja}>Ovo ne može biti prazno!</label>:""}
     {nazivIsValid&&naziv.trim().length>0&&naziv.trim().length<3 ? <label className={classes.labelUpozorenja}>Morate unijeti više od tri karaktera!</label>:""}
   </div>
   <div className={classes.smallWrapper}>
   <label htmlFor='detalji_dijete' className={classes.label}>Detalji dijete</label>
    <input id='detalji_dijete' onChange={e => setDetalji(e.target.value)}className={classes.input} type="text" />
    {detaljiIsValid&&detalji.trim().length<=0 ? <label className={classes.labelUpozorenja}>Ovo ne može biti prazno!</label>:""}
     {detaljiIsValid&&detalji.trim().length>0&&detalji.trim().length<3 ? <label className={classes.labelUpozorenja}>Morate unijeti više od tri karaktera!</label>:""}
   </div>
   <div className={classes.smallWrapper}>
   <label htmlFor="opis" className={classes.label}>Opis</label>
    <input id='opis' onChange={e => setOpis(e.target.value)} className={classes.input} type="text" />
    {opisIsValid&&opis.trim().length<=0 ? <label className={classes.labelUpozorenja}>Ovo ne može biti prazno!</label>:""}
     {opisIsValid&&opis.trim().length>0&&opis.trim().length<3 ? <label className={classes.labelUpozorenja}>Morate unijeti više od tri karaktera!</label>:""}
   </div>
   <div className={classes.smallWrapper}>
   <label htmlFor='broj_obroka' className={classes.label}>Broj obroka | Norma hljeba</label>
    <input id='broj_obroka' onChange={e => setBrojObroka(e.target.value)} className={classes.input} type="text" />
    {brojObrokaIsValid&&brojObroka.trim().length<=0 ? <label className={classes.labelUpozorenja}>Ovo ne može biti prazno!</label>:""}
     {brojObrokaIsValid&&brojObroka.trim().length>0&&brojObroka.trim().length<3 ? <label className={classes.labelUpozorenja}>Morate unijeti više od dva karaktera!</label>:""}
  
   </div>
   <div className={classes.smallWrapper}>
   <label htmlFor='napomena' className={classes.label}>Napomena</label>
    <input id='napomena' onChange={e => setNapomena(e.target.value)} className={classes.input} type="text" />
    {napomenaIsValid&&napomena.trim().length<=0 ? <label className={classes.labelUpozorenja}>Ovo ne može biti prazno!</label>:""}
     {napomenaIsValid&&napomena.trim().length>0&&napomena.trim().length<2 ? <label className={classes.labelUpozorenja}>Morate unijeti minimalno dva karaktera!</label>:""}
  
   </div>
   <footer className={classes.actions}>
          <button type='submit' className={classes.button}>Dodaj dijetu</button>
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