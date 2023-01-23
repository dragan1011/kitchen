import { Fragment, useRef } from 'react';
import ReactDOM from 'react-dom';

import classes from './LinijeEdit.module.css';
import { db } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore"; 

const ModalOverlay = (props) => {

  const nazivRef = useRef();
  const lokacijaRef = useRef();
  const odjelRef = useRef();

  


    const editData = async(e) => {
    e.preventDefault();

    
    await setDoc(doc(db, "linije", `${nazivRef.current.value}`), {
      naziv:nazivRef.current.value,
      lokacija:lokacijaRef.current.value,
      odjel: odjelRef.current.value

    });

    close();

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
    <input ref={nazivRef} value={props.data.naziv} className={classes.input} type="text" />
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Lokacija</label>
    <select ref={lokacijaRef} defaultValue={props.data.lokacija} className={classes.input} type="text" >
    <option className={classes.option}>Klinički centar</option>
      </select>
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Grupa</label>
    <select ref={odjelRef} defaultValue={props.data.odjel} className={classes.input} type="text" >
    <option className={classes.option}>1070 - Klinika za dječiju hirurgiju</option>
      </select>
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