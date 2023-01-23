import { Fragment, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import classes from './DijeteEdit.module.css';
import { db } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore"; 

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalOverlay = (props) => {

  const sifraRef = useRef();
  const nazivRef = useRef();
  const detaljiRef = useRef();
  const opisRef = useRef();
  const brojObrokaRef = useRef();
  const napomenaRef = useRef();

  const [nazivIsValid, setNazivIsValid] = useState(false)
  const [detaljiIsValid, setDetaljiIsValid] = useState(false)
  const [opisIsValid, setOpisIsValid] = useState(false)
  const [brojObrokaIsValid, setBrojObrokaIsValid] = useState(false)
  const [napomenaIsValid, setNapomenaIsValid] = useState(false)

  const notify = () => {
    toast.success('Uspješno!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
      
  }


    const editData = async (e) => {
    e.preventDefault();
    document.body.style.overflow = 'visible'
    if (nazivRef.current.value.trim() === '' || nazivRef.current.value.trim() === null) {
      return setNazivIsValid(true)
     }
     if(nazivRef.current.value.trim().length>0&&nazivRef.current.value.trim().length<3)
     {
      return setNazivIsValid(true)
     }
     if (detaljiRef.current.value.trim() === '' || detaljiRef.current.value.trim() === null) {
      return setDetaljiIsValid(true)
     }
     if(detaljiRef.current.value.trim().length>0&&detaljiRef.current.value.trim().length<3)
     {
      return setDetaljiIsValid(true)
     }
     if (opisRef.current.value.trim() === '' || opisRef.current.value.trim() === null) {
      return setOpisIsValid(true)
     }
     if(opisRef.current.value.trim().length>0&&opisRef.current.value.trim().length<3)
     {
      return setOpisIsValid(true)
     }

     if (brojObrokaRef.current.value.trim() === '' || brojObrokaRef.current.value.trim() === null) {
      return setBrojObrokaIsValid(true)
     }
     if(brojObrokaRef.current.value.trim().length>0&&brojObrokaRef.current.value.trim().length<3)
     {
      return setBrojObrokaIsValid(true)
     }
     if (napomenaRef.current.value.trim() === '' || napomenaRef.current.value.trim() === null) {
      return setNapomenaIsValid(true)
     }
     notify();
        
     setTimeout(async() => {
    await setDoc(doc(db, "dijete", `${sifraRef.current.value}`), {
      sifra:sifraRef.current.value,
      naziv:nazivRef.current.value,
      detalji_dijete:detaljiRef.current.value,
      opis:opisRef.current.value,
      broj_obroka:brojObrokaRef.current.value,
      napomena:napomenaRef.current.value
    });
    close()
  }, 1000)
  }
  

       const close = () => {
        props.closeModal(false)
        document.body.style.overflow = 'visible'
       } 

  return (
    <div>
      <div onClick={() => {props.closeModal(false)}} className={classes.backdrop} />
      <div className={`${classes.modal} ${classes.card}`}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div style={{position:'absolute'}}>
        <ToastContainer />
        </div>
        <div className={classes.content}>
        <form  onSubmit={editData} className={classes.modalWrapper}>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Šifra dijete</label>
    <input readOnly ref={sifraRef} value={props.data.sifra} className={classes.input} type="text" />
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Naziv</label>
    <input ref={nazivRef} defaultValue={props.data.naziv} className={classes.input} type="text" />
    {nazivIsValid&&nazivRef.current.value.trim().length<=0 ? <label className={classes.labelUpozorenja}>Ovo je polje obavezno i ne može biti prazno!</label>:""}
     {nazivIsValid&&nazivRef.current.value.trim().length>0&&nazivRef.current.value.trim().length<3 ? <label className={classes.labelUpozorenja}>Morate unijeti više od tri karaktera!</label>:""}
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Detalji dijete</label>
    <input ref={detaljiRef} defaultValue={props.data.detalji_dijete} className={classes.input} type="text" />
    {detaljiIsValid&&detaljiRef.current.value.trim().length<=0 ? <label className={classes.labelUpozorenja}>Ovo je polje obavezno i ne može biti prazno!</label>:""}
     {detaljiIsValid&&detaljiRef.current.value.trim().length>0&&detaljiRef.current.value.trim().length<3 ? <label className={classes.labelUpozorenja}>Morate unijeti više od tri karaktera!</label>:""}
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Opis</label>
    <input ref={opisRef} defaultValue={props.data.opis} className={classes.input} type="text" />
    {opisIsValid&&opisRef.current.value.trim().length<=0 ? <label className={classes.labelUpozorenja}>Ovo je polje obavezno i ne može biti prazno!</label>:""}
     {opisIsValid&&opisRef.current.value.trim().length>0&&opisRef.current.value.trim().length<3 ? <label className={classes.labelUpozorenja}>Morate unijeti više od tri karaktera!</label>:""}
  
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Broj obroka | Norma hljeba</label>
    <input ref={brojObrokaRef }  defaultValue={props.data.broj_obroka} className={classes.input} type="text" />
    {brojObrokaIsValid&&brojObrokaRef.current.value.trim().length<=0 ? <label className={classes.labelUpozorenja}>Ovo je polje obavezno i ne može biti prazno!</label>:""}
     {brojObrokaIsValid&&brojObrokaRef.current.value.trim().length>0&&brojObrokaRef.current.value.trim().length<3 ? <label className={classes.labelUpozorenja}>Morate unijeti više od tri karaktera!</label>:""}
  
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Napomena</label>
    <input ref={napomenaRef} defaultValue={props.data.napomena} className={classes.input} type="text" />
    {napomenaIsValid&&napomenaRef.current.value.trim().length<=0 ? <label className={classes.labelUpozorenja}>Ovo je polje obavezno i ne može biti prazno!</label>:""}  
   </div>
   <footer className={classes.actions}>
          <button type='submit' className={classes.button}>Dodaj izmjene</button>
          <button  onClick={() => {props.closeModal(false)}} className={classes.close}>Otkaži</button>
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
        <ModalOverlay data={props.data} closeModal={props.closeModal} title={props.title}>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;