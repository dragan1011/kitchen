import { Fragment, useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

import classes from './AddJeloModal.module.css';

import { db } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore"; 

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalOverlay = (props) => {

  
  const [sifra, setSifra] = useState('')
  const [naziv, setNaziv] = useState('')
  const [grupa, setGrupa] = useState('')
  const [magacin, setMagacin] = useState('')
  const [sifraIsValid, setSifraIsValid] = useState(false)
  const [nazivIsValid, setNazivIsValid] = useState(false)
  const [grupaIsValid, setGrupaIsValid] = useState(false)
  const [magacinIsValid, setMagacinIsValid] = useState(false)


  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);
  const input5Ref = useRef(null);


  
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
  
    if (input1Ref.current === document.activeElement) {
      input2Ref.current.focus();
    } else if (input2Ref.current === document.activeElement) {
      input3Ref.current.focus();
    } else if (input3Ref.current === document.activeElement && grupa !== 'Izaberite grupu') {
      input4Ref.current.focus();
    } else if (input4Ref.current === document.activeElement) {
      
    }

    
    if (sifra.trim() == '' || sifra.trim().length == 0 || sifra.length>0&&sifra.length<3) {
      return setSifraIsValid(true)
    }
    if (naziv.trim() == '' || naziv.trim().length == 0 || naziv.length>0&&naziv.length<3) {
      return setNazivIsValid(true)
    }
    if (grupa === ''|| grupa === null || grupa === 'Izaberite grupu') {
      return setGrupaIsValid(true)
    }
    if (magacin.trim() == '' || magacin.trim().length == 0) {
      return setMagacinIsValid(true)
    }
   
    notify();

    setTimeout( async()=> {


    await setDoc(doc(db, "jelo", `${sifra}`), {
      sifra:sifra,
      naziv:naziv,
      grupa:grupa,
      magacin: magacin
    });
 close();
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
        <form onSubmit={addNewData} className={classes.modalWrapper} autoComplete="off">
   <div className={classes.smallWrapper}>
   <label htmlFor='sifra' className={classes.label}>Šifra</label>
    <input ref={input1Ref}  id='sifra' onChange={e => setSifra(e.target.value)} className={classes.input} type="number" />
    {sifraIsValid&&sifra.length<=0 ? <label className={classes.labelUpozorenja}>Ovo je polje obavezno i ne može biti prazno!</label>:""}
     {sifraIsValid&&sifra.length>0&&sifra.length<3 ? <label className={classes.labelUpozorenja}>Morate unijeti više od tri karaktera!</label>:""}
   </div>
   <div className={classes.smallWrapper}>
   <label htmlFor='naziv'className={classes.label}>Naziv</label>
    <input ref={input2Ref}  id='naziv' onChange={e => setNaziv(e.target.value)}  className={classes.input} type="text" />
    {nazivIsValid&&naziv.length<=0 ? <label className={classes.labelUpozorenja}>Ovo je polje obavezno i ne može biti prazno!</label>:""}
     {nazivIsValid&&naziv.length>0&&naziv.length<3 ? <label className={classes.labelUpozorenja}>Morate unijeti više od tri karaktera!</label>:""}
   </div>
   <div className={classes.smallWrapper}>
   <label htmlFor='grupa' className={classes.label}>Grupa</label>
    <select ref={input3Ref}  id='grupa' onChange={e => setGrupa(e.target.value)} className={classes.select} type="text" >
      <option className={classes.option}>Izaberite grupu</option>
      <option className={classes.option}>Namazi</option>
      <option className={classes.option}>Voće</option>
      <option className={classes.option}>Pića i napici</option>
      <option className={classes.option}>Glavna jela</option>
      <option className={classes.option}>Ostalo</option>
      </select>

      {grupaIsValid&&grupa==='Izaberite grupu' ? <label className={classes.labelUpozorenja}>Morate izabrati grupu namirnica!</label>:""}
      {grupaIsValid&&grupa==='' ? <label className={classes.labelUpozorenja}>Morate izabrati grupu namirnica!</label>:""}
      {grupaIsValid&&grupa===null ? <label className={classes.labelUpozorenja}>Morate izabrati grupu namirnica!</label>:""}

   </div>
   <div className={classes.smallWrapper}>
   <label htmlFor='magacin' className={classes.label}>Magacin</label>
    <input ref={input4Ref}  id='magacin' onChange={e => setMagacin(e.target.value)} className={classes.input} type="number" />
    {magacinIsValid&&magacin.length<=0 ? <label className={classes.labelUpozorenja}>Ovo je polje ne može biti prazno!</label>:""}
  
   </div>
   <footer className={classes.actions}>
          <button ref={input5Ref} type='submit' className={classes.button}>Dodaj jelo</button>
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