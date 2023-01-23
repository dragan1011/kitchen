import { Fragment, useRef } from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.css';

import { db } from "../../../firebase";
import { addDoc, doc } from 'firebase/firestore' 

const ModalOverlay = (props) => {

   

  const sifraRef = useRef();
  const nazivRef = useRef();
  const detaljiRef = useRef();
  const opisRef = useRef();
  const brojObrokaRef = useRef();
  const napomenaRef = useRef();

   const addNewData = async (e) => {
    e.preventDefault();
  

  
    const data = {
      sifra:sifraRef.current.value,
      naziv:nazivRef.current.value,
      detalji_dijete:detaljiRef.current.value,
      opis:opisRef.current.value,
      broj_obroka:brojObrokaRef.current.value,
      napomena:napomenaRef.current.value
    };

    await addDoc(doc(db, 'namirnice'), data)

 close();
 
  } 

  const close = () => {
    props.closeModal(false)
    document.body.style.overflow = 'visible'
   } 

  return (
    <div>
      <div onClick={close} className={classes.backdrop} />
      <div className={`${classes.modal} ${classes.card}`}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
        <form onSubmit={addNewData} className={classes.modalWrapper}>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Šifra dijete</label>
    <input ref={sifraRef} className={classes.input} type="text" />
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Naziv</label>
    <input ref={nazivRef} className={classes.input} type="text" />
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Grupa</label>
    <input ref={detaljiRef} className={classes.input} type="text" />
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>JM</label>
    <input ref={opisRef} className={classes.input} type="text" />
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Jestivi dio</label>
    <input ref={brojObrokaRef} className={classes.input} type="text" />
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Na stanju</label>
    <input ref={brojObrokaRef} className={classes.input} type="text" />
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Napomena</label>
    <input ref={napomenaRef} className={classes.input} type="text" />
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