import { Fragment, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import classes from './NamirniceEdit.module.css';
import { db } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore"; 

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalOverlay = (props) => {

  const sifraRef = useRef();
  const nazivRef = useRef();
  const grupaRef = useRef();
  const jmRef = useRef();
  const jestiviDioRef = useRef();
  const naStanjuRef = useRef();
  const napomenaRef = useRef();

  const [nazivIsValid, setNazivIsValid] = useState(false)
  const [jmIsValid, setJmIsValid] = useState(false)
  const [jestiviDioIsValid, setJestiviDioIsValid] = useState(false)
  const [naStanjuIsValid, setNaStanjuIsValid] = useState(false)
  const [napomenaIsValid, setNapomenaIsValid] = useState(false)

  const notify = () => {
    toast.success('Uspješno izmijenjeno!', {
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


    const editData = async(e) => {
    e.preventDefault();

    if (nazivRef.current.value.trim() === '' || nazivRef.current.value.trim() === null) {
      return setNazivIsValid(true)
     }
     if(nazivRef.current.value.trim().length>0&&nazivRef.current.value.trim().length<2)
     {
      return setNazivIsValid(true)
     }
     if (jmRef.current.value.trim() === '' || jmRef.current.value.trim() === null) {
      return setJmIsValid(true)
     }
      if (jestiviDioRef.current.value.trim() === '' || jestiviDioRef.current.value.trim() === null) {
      return setJestiviDioIsValid(true)
     }
     if (naStanjuRef.current.value.trim() === '' || naStanjuRef.current.value.trim() === null) {
      return setNaStanjuIsValid(true)
     }
     if (napomenaRef.current.value.trim() === '' || napomenaRef.current.value.trim() === null) {
      return setNapomenaIsValid(true)
     }

     notify();

     setTimeout( async()=> {
     await setDoc(doc(db, "namirnice", `${sifraRef.current.value}`), {
      
      sifra:sifraRef.current.value,
      naziv:nazivRef.current.value,
      grupa:grupaRef.current.value,
      jm:jmRef.current.value,
      jestiviDio:jestiviDioRef.current.value,
      naStanju:naStanjuRef.current.value,
      napomena:napomenaRef.current.value

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
      <div onClick={() => {props.closeModal(false)}} className={classes.backdrop} />
      <div className={`${classes.modal} ${classes.card}`}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
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
     {nazivIsValid&&nazivRef.current.value.trim().length>0&&nazivRef.current.value.trim().length<2 ? <label className={classes.labelUpozorenja}>Morate unijeti više od tri karaktera!</label>:""}
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Grupa</label>
    <select ref={grupaRef} defaultValue={props.data.grupa} className={classes.input} type="text" >
      <option className={classes.option}>Začini, mirodije i industrijske juhe</option>
      <option className={classes.option}>Povrće i proizvodi</option>
      <option className={classes.option}>Leguminoze i žitarice i proizvodi</option>
      <option className={classes.option}>Pića i napici</option>
      </select>
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>JM</label>
    <input ref={jmRef} defaultValue={props.data.jm} className={classes.input} type="text" />
    {jmIsValid&&jmRef.current.value.trim().length<=0 ? <label className={classes.labelUpozorenja}>Ovo je polje ne može biti prazno!</label>:""}
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Jestivi dio</label>
    <input ref={jestiviDioRef }  defaultValue={props.data.jestiviDio} className={classes.input} type="text" />
    {jestiviDioIsValid&&jestiviDioRef.current.value.trim().length<=0 ? <label className={classes.labelUpozorenja}>Ovo je polje ne može biti prazno!</label>:""}
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Na stanju</label>
    <input ref={naStanjuRef }  defaultValue={props.data.naStanju} className={classes.input} type="text" />
    {naStanjuIsValid&&naStanjuRef.current.value.trim().length<=0 ? <label className={classes.labelUpozorenja}>Ovo je polje ne može biti prazno!</label>:""}
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Napomena</label>
    <input ref={napomenaRef} defaultValue={props.data.napomena} className={classes.input} type="text" />
    {napomenaIsValid&&napomenaRef.current.value.trim().length<=0 ? <label className={classes.labelUpozorenja}>Ovo je polje ne može biti prazno!</label>:""}
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