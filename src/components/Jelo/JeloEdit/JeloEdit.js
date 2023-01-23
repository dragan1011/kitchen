import { Fragment, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import classes from './LinijeEdit.module.css';
import { db } from "../../../firebase";
import { doc, setDoc, deleteDoc } from "firebase/firestore"; 
import TabButton from '../../UI/TabButton/TabButton'
import { onSnapshot, collection } from "@firebase/firestore"


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalOverlay = (props) => {

  const [active, setActive] = useState('Izmjena')
  const [data, setData] = useState([])
  const [recept, setRecept] = useState([])

  
  useEffect(()=> {
    document.addEventListener('keydown', hideOnEscape, true)
  }, [])

   const hideOnEscape = (e) =>{
    if (e.key === "Escape") {
      close();
    }
  } 

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


  const notifyAdd = () => {
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

  const notifyDelete = () => {
    toast.success('Uspješno obrisano!', {
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

  //Lista namirnica
  useEffect(()=> onSnapshot(collection(db, "namirnice"), (snapshot) => 
  setData(snapshot.docs.map((doc) => doc.data())) ), [])

  const [kolicinaIsValid , setKolicinaIsValid] = useState(false)
  const [namirnicaIsValid, setNamirnicaIsValid] = useState(false)
  let [kolicina, setKolicina] = useState('')
  let [namirnica, setNamirnica] = useState('')
  //Dodavanje recepta
  const addNewRecept = async (e) => {
    e.preventDefault();

    if (namirnica === ''|| namirnica === null || namirnica === 'Izaberite grupu') {
      return setNamirnicaIsValid(true)
    }
    if (kolicina.trim() == '' || kolicina.trim().length == 0) {
      return setKolicinaIsValid(true)
    }

    
    notifyAdd();

    setTimeout( async()=> {
    await setDoc(doc(db, "recept", `${sifraJelaRef.current.value}`), {
      sifra:sifraJelaRef.current.value,
      namirnica:[...[namirnica]],
      kolicina:[...kolicina]

    });
 
    kolicina = '';
    namirnica = 'Izaberite namirnicu'
  }, 1000);
  } 

  //Brisanje namirnice
  const deleteNamirnica = async (e) => {
    e.preventDefault();
  
    notifyDelete();
    await deleteDoc(doc(db, "recept", `${sifraJelaRef.current.value}`));
    

  } 

  //Prikaz dodanih namirnica
  useEffect(()=> onSnapshot(collection(db, "recept"), (snapshot) => 
  setRecept(snapshot.docs.map((doc) => doc.data())) ), [])

  //Promjena tabova
  const setSelectedHandler = name => {
    setActive(name)
  }


  const sifraRef = useRef();
  const nazivRef = useRef();
  const grupaRef = useRef();
  const magacinRef = useRef();
  const sifraJelaRef = useRef();
  const [nazivIsValid, setNazivIsValid] = useState(false)
  const [magacinIsValid, setMagacinIsValid] = useState(false)

  const editData = async(e) => {
    e.preventDefault();
    if (nazivRef.current.value.trim() === '' || nazivRef.current.value.trim() === null) {
        return setNazivIsValid(true)
    }
    if(nazivRef.current.value.trim().length>0&&nazivRef.current.value.trim().length<3)
    {
      return setNazivIsValid(true)
    }
    if (magacinRef.current.value.trim() === '' || magacinRef.current.value.trim() === null)
      {
        return  setMagacinIsValid(true)
      }

      notify();

    setTimeout( async()=> {
      await setDoc(doc(db, "jelo", `${sifraRef.current.value}`), {
      sifra:sifraRef.current.value,
      naziv:nazivRef.current.value,
      grupa:grupaRef.current.value,
      magacin: magacinRef.current.value

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
      <div onClick={() => {props.closeModal(false)}} className={classes.backdrop} />
           <div className={`${classes.modal} ${classes.card}`}>
            
        <header className={classes.header}>
        <TabButton name={"Izmjena"} activ={active} select={setSelectedHandler}>{props.title}</TabButton>
       <TabButton name={"Recept"} activ={active}  select={setSelectedHandler}>Recept</TabButton>
        </header>
       {  active === 'Izmjena' && <div className={classes.content}>
        <form  onSubmit={editData} className={classes.modalWrapper}>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Šifra jela</label>
    <input readOnly ref={sifraRef} value={props.data.sifra} className={classes.input} type="text" />
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Naziv</label>
    <input ref={nazivRef} defaultValue={props.data.naziv} className={classes.input} type="text" />
     {nazivIsValid&&nazivRef.current.value.trim().length<=0 ? <label className={classes.labelUpozorenja}>Ovo je polje obavezno i ne može biti prazno!</label>:""}
     {nazivIsValid&&nazivRef.current.value.trim().length>0&&nazivRef.current.value.trim().length<3 ? <label className={classes.labelUpozorenja}>Morate unijeti više od tri karaktera!</label>:""}
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Grupa</label>
    <select ref={grupaRef} defaultValue={props.data.grupa} className={classes.input} type="text" >
      <option className={classes.option}>Namazi</option>
      <option className={classes.option}>Voće</option>
      <option className={classes.option}>Pića i napici</option>
      <option className={classes.option}>Glavna jela</option>
      <option className={classes.option}>Ostalo</option>
      </select>
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Magacin</label>
    <input ref={ magacinRef} defaultValue={props.data.magacin} className={classes.input} type="number" />
    {magacinIsValid&&magacinRef.current.value.trim().length<=0 ? <label className={classes.labelUpozorenja}>Ovo je polje ne može biti prazno!</label>:""}
   </div>
   <footer className={classes.actions}>
          <button type='submit' className={classes.button}>Sačuvaj</button>
          <button  onClick={() => {props.closeModal(false)}} className={classes.close}>Otkaži</button>
        </footer>
    </form>
        </div> }
        {active === 'Recept' && <div className={classes.content}>
        <form  onSubmit={addNewRecept} className={classes.modalWrapper}>
        <div className={classes.smallWrapper}>
   <label className={classes.label}>Šifra jela</label>
    <input ref={sifraJelaRef} value={props.data.sifra} className={classes.input} type="text" />
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Namirnica</label>
    <select onChange={e => setNamirnica(e.target.value)} className={classes.input} type="text" >
      <option>Izaberite namirnicu</option>
      {data.map((item) => (
        <option>{item.naziv}</option>
        ))}
       </select>
       {namirnicaIsValid&&namirnica==='Izaberite grupu' ? <label className={classes.labelUpozorenja}>Morate izabrati grupu namirnica!</label>:""}
      {namirnicaIsValid&&namirnica==='' ? <label className={classes.labelUpozorenja}>Morate izabrati grupu namirnica!</label>:""}
      {namirnicaIsValid&&namirnica===null ? <label className={classes.labelUpozorenja}>Morate izabrati grupu namirnica!</label>:""}
   </div>
   <div className={classes.smallWrapper}>
   <label className={classes.label}>Količina</label>
    <input onChange={e => setKolicina(e.target.value)}  className={classes.input} type="number" />
    {kolicinaIsValid&&kolicina.length<=0 ? <label className={classes.labelUpozorenja}>Ovo je polje obavezno i ne može biti prazno!</label>:""}
   </div>
   <div className={classes.receptNamirnice}>
    <div className={classes.receptRed}>    <h3>Namirnica </h3> <h3>Količina</h3> <h3>Opcije</h3></div></div>
   <div className={classes.receptNamirnice}>{recept.map((item) =>(
    <div className={classes.receptRed}>    <h3>{
      item.sifra === props.data.sifra ? item.namirnica : ""} </h3><span> <b>{item.sifra === props.data.sifra ? item.kolicina : ``}</b></span> <span onClick={deleteNamirnica} className={classes.brisiNamirnicuRecept}>{item.sifra === props.data.sifra ? 'Obriši' : ""}</span> </div>

   ))}</div>
   <footer className={classes.actions}>
          <button type='submit' className={classes.button}>Dodaj</button>
          <button  onClick={() => {props.closeModal(false)}} className={classes.close}>Otkaži</button>
        </footer>
    </form>
        </div>}
       
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