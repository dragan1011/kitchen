import { Fragment, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import classes from './AddJelovnikModal.module.css';

import { db } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore"; 
import { onSnapshot, collection } from "@firebase/firestore"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalOverlay = (props) => {

   //Lista namirnica za unos jelovnika
  useEffect(()=> onSnapshot(collection(db, "namirnice"), (snapshot) => 
  setData(snapshot.docs.map((doc) => doc.data())) ), [])
   //Lista obroka za unos jelovnika
   useEffect(()=> onSnapshot(collection(db, "jelo"), (snapshot) => 
   setObroci(snapshot.docs.map((doc) => doc.data())) ), [])
   //Lista dijeta za skladištenje
   useEffect(()=> onSnapshot(collection(db, "dijeta"), (snapshot) => 
   setDijeta(snapshot.docs.map((doc) => doc.data())) ), [])

  const [naziv, setNaziv] = useState('')
  const [nazivIsValid, setNazivIsValid] = useState(false)
  const [data, setData] = useState([])
  const [obroci, setObroci] = useState([])
  const [dijeta, setDijeta] = useState([])



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

    console.log(naziv)

    if (naziv === ''|| naziv === null || naziv === 'Izaberite namirnicu') {
      return setNazivIsValid(true)
    }

    notify();

    setTimeout( async()=> {

     await setDoc(doc(db, "jelovnk", `${naziv}`), {
      naziv:naziv,
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
        <form onSubmit={addNewData} className={classes.modalWrapper}>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Naziv</label>
    <select onChange={e => setNaziv(e.target.value)}  className={classes.input} type="text" >
      <option>Izaberite namirnicu</option>
      {obroci.map(item => (
        <option key={item.sifra}>{item.naziv}</option>
      ))}
      </select>
      {nazivIsValid&&naziv==='Izaberite namirnicu' ? <label className={classes.labelUpozorenja}>Morate izabrati namirnicu!</label>:""}
      {nazivIsValid&&naziv==='' ? <label className={classes.labelUpozorenja}>Morate izabrati namirnicu!</label>:""}
      {nazivIsValid&&naziv===null ? <label className={classes.labelUpozorenja}>Morate izabrati namirnicu!</label>:""}
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