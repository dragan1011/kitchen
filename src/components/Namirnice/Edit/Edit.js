import { Fragment, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

import classes from './Edit.module.css';
import { uid } from 'uid';
import { db } from "../../../firebase";
import { updateDoc, collection } from 'firebase/firestore'

const ModalOverlay = (props) => {

  const sifraRef = useRef();
  const nazivRef = useRef();
  const detaljiRef = useRef();
  const opisRef = useRef();
  const brojObrokaRef = useRef();
  const napomenaRef = useRef();

  

  useEffect(()=> {
    document.addEventListener('keydown', hideOnEscape, true)
  }, [])

   const hideOnEscape = (e) =>{
    if (e.key === "Escape") {
      close();
    }
  } 

    const editData = async(e) => {
    e.preventDefault();
  
     console.log(sifraRef.current.value)
     console.log(nazivRef.current.value)
     console.log(detaljiRef.current.value)
     console.log(opisRef.current.value)
     console.log(brojObrokaRef.current.value)
     console.log(napomenaRef.current.value)
  
      
   
      let data = {
      sifra:sifraRef.current.value,
      naziv:nazivRef.current.value,
      detalji_dijete:detaljiRef.current.value,
      opis:opisRef.current.value,
      broj_obroka:brojObrokaRef.current.value,
      napomena:napomenaRef.current.value
    }  
    const uuid = uid();
    await updateDoc(collection(db, `namirnice/${uuid}`), data)

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
        <div className={classes.content}>
        <form  onSubmit={editData} className={classes.modalWrapper}>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Šifra dijete</label>
    <input ref={sifraRef} defaultValue={props.data.sifra} className={classes.input} type="text" />
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Naziv</label>
    <input ref={nazivRef} defaultValue={props.data.naziv} className={classes.input} type="text" />
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Detalji dijete</label>
    <input ref={detaljiRef} defaultValue={props.data.detalji_dijete} className={classes.input} type="text" />
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Opis</label>
    <input ref={opisRef} defaultValue={props.data.opis} className={classes.input} type="text" />
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Broj obroka | Norma hljeba</label>
    <input ref={brojObrokaRef }  defaultValue={props.data.broj_obroka} className={classes.input} type="text" />
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Napomena</label>
    <input ref={napomenaRef} defaultValue={props.data.napomena} className={classes.input} type="text" />
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