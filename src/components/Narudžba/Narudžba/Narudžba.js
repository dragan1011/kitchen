import React, { useState, useRef , useEffect} from 'react'
import NarudžbaTabela from './NarudžbaTabela'
import useWindowDimensions from '../../Hooks/getWindowDimensions/getWindowDimensions'
import { db } from "../../../firebase";
import { doc, setDoc, collection, onSnapshot } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import { Calendar } from 'react-date-range';
import format from 'date-fns/format';

import classes from './Narudžba.module.css'
import 'react-toastify/dist/ReactToastify.css';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 


import "react-datepicker/dist/react-datepicker.css";
import { setDate } from 'date-fns';



function Namirnice() {

let { height } = useWindowDimensions();
height = height -225;

const [searchTermNarudžbe, setSearchTermNarudžbe] = useState('')
const [data, setData] = useState([]) 
const [dijetaLista, setDijetaLista] = useState([]) 
const [startDate, setStartDate] = useState(new Date());
const [odjel, setOdjel] = useState('')
const [dijeta, setDijeta] = useState('')
const [dorucak, setDorucak] = useState('')
const [rucak, setRucak] = useState('')
const [vecera, setVecera] = useState('')
const [datum, setDatum] = useState('')
const [odjelIsValid, setOdjelIsValid] = useState(false)
const [dijetasValid, setDijetaIsValid] = useState(false)
const [dorucakIsValid, setDorucakIsValid] = useState(false)
const [rucakIsValid, setRucakIsValid] = useState(false)
const [veecraIsValid, setVeceraIsValid] = useState(false)
const [showDate, setShowDate] = useState(false)

const input1Ref = useRef(null);
const input2Ref = useRef(null);
const input3Ref = useRef(null);
const input4Ref = useRef(null);
const input5Ref = useRef(null);
const refCloseCalendar = useRef(null)

useEffect(()=> onSnapshot(collection(db, "narudžba"), (snapshot) => 
setData(snapshot.docs.map((doc) => doc.data())) ), [])

useEffect(()=> onSnapshot(collection(db, "dijete"), (snapshot) => 
setDijetaLista(snapshot.docs.map((doc) => doc.data())) ), [])

const searchNarudžbe = (data) => {
  return data.filter(
   (item)=> 
   item.odjel.toString().toLowerCase().includes(searchTermNarudžbe.toLowerCase()) ||
   item.dijeta.toString().toLowerCase().includes(searchTermNarudžbe.toLowerCase()) ||
   item.dorucak.toString().toLowerCase().includes(searchTermNarudžbe.toLowerCase()) ||
   item.rucak.toString().toLowerCase().includes(searchTermNarudžbe.toLowerCase()) ||
   item.vecera.toString().toLowerCase().includes(searchTermNarudžbe.toLowerCase())
 ) 
}

const notify = () => {
  toast.success('Uspješno dodana narudžba!', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
    
}


const addNewData = async (e) => {
e.preventDefault()
  
   if (selectedOption.trim() == '' || selectedOption.trim().length == 0) {
    return setOdjelIsValid(true)
  }  
  if (input1Ref.current === document.activeElement) {
    input2Ref.current.focus();
  }
   if (selectedOptionDijeta.trim() == '' || selectedOptionDijeta.trim().length == 0) {
    return setDijetaIsValid(true)
  } 
  if (input2Ref.current === document.activeElement) {
    input3Ref.current.focus();
  } 
   if (dorucak.trim() == '' || dorucak.trim().length == 0) {
    return setDorucakIsValid(true)
  } 
  if (input3Ref.current === document.activeElement) {
    input4Ref.current.focus();
  } 
 if (rucak.trim() == '' || rucak.trim().length == 0) {
    return setRucakIsValid(true)
  }
  if (input4Ref.current === document.activeElement) {
    input5Ref.current.focus();
  }
   if (vecera.trim() == '' || vecera.trim().length == 0) {
    return setVeceraIsValid(true)
  } 
  notify();

    await setDoc(doc(db, "narudžba", `${Math.random()}`), {
      odjel:selectedOption,
      dijeta:selectedOptionDijeta,
      dorucak:dorucak,
      rucak:rucak,
      vecera:vecera,
      date: `${datum.slice(6,10)}-${datum.slice(0,2)}-${datum.slice(3,5)}`
    });
   
    input2Ref.current.focus()
    setShowListDijeta(true)
    setSelectedOptionDijeta('')
    setDorucak('')
    setRucak('')
    setVecera('')

} 

useEffect(()=> {
  setDatum(format(new Date(), 'MM/dd/yyyy'))
  document.addEventListener('keydown', hideOnEscape, true)
  document.addEventListener('click', hideOnClickOutside, true)
  if (input1Ref.current === document.activeElement) {
    setShowList(true);
    setShowListDijeta(false)
  } else if (input2Ref.current === document.activeElement) {
    setShowList(false)
    setShowListDijeta(true)
  }
}, [])

const hideOnEscape = (e) =>{
  if (e.key === "Escape") {
    setShowDate(false)
    setShowList(false)
    setShowListDijeta(false)
  }
} 

const hideOnClickOutside = (e) => {
if (refCloseCalendar.current && !refCloseCalendar.current.contains(e.target)) {
  setShowDate(false)
}
}





const enteredDate = (e) => {
  setShowDate(!showDate )

}

const handleSelect = (date) => {
setDatum(format(date, 'MM/dd/yyyy'))
} 
 
const options = ['1070 - Klinika za dječiju hirurgiju', '1060 - Klinika za nefrologiju', '1050 Klinika za unutrašnje bolesti'];
const optionsDijeta = ["Opšta dijeta", "Dijeta", "Lagana dijeta", "Hiperkalorična dijeta", "Dijeta individualna", "Posna dijeta", "Lagana dijeta", "Tonzili", "Dijeta" , "Posna dijeta"];
  const [selectedOption, setSelectedOption] = useState('');
  const [highlightedOption, setHighlightedOption] = useState(-1);
  const [selectedOptionDijeta, setSelectedOptionDijeta] = useState('');
  const [highlightedOptionDijeta, setHighlightedOptionDijeta] = useState(-1);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  }
  const handleChangeDijeta = (event) => {
    setSelectedOptionDijeta(event.target.value);
  }

  
  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const nextOption = highlightedOption + 1;
      if (nextOption < options.length) {
        setHighlightedOption(nextOption);
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const prevOption = highlightedOption - 1;
      if (prevOption >= 0) {
        setHighlightedOption(prevOption);
      }
    } else if (event.key === 'Enter' && highlightedOption !== -1) {
      setSelectedOption(options[highlightedOption]);
      setShowList(false)
      input2Ref.current.focus();
      setShowListDijeta(true)
    }
  }

  const handleKeyDownDijeta = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const nextOptionDijeta = highlightedOptionDijeta + 1;
      if (nextOptionDijeta < dijetaLista.length) {
        setHighlightedOptionDijeta(nextOptionDijeta);
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const prevOptionDijeta = highlightedOptionDijeta - 1;
      if (prevOptionDijeta >= 0) {
        setHighlightedOptionDijeta(prevOptionDijeta);
      }
    } else if (event.key === 'Enter' && highlightedOptionDijeta !== -1) {
      setSelectedOptionDijeta(optionsDijeta[highlightedOptionDijeta]);
      setShowListDijeta(false)
      input3Ref.current.focus();
    }
  }

  const [showList, setShowList] = useState(false)
  const [showListDijeta, setShowListDijeta] = useState(false)

  const showListFunc = () => {
    setShowList(!showList)
    setShowListDijeta(false)
  }

  const showListFuncDijeta = () => {
    setShowListDijeta(!showListDijeta)
    setShowList(false)
  }


  const searchOdjel = (data) => {
    return data.filter(
     (item)=> 
     item.odjel.toString().toLowerCase().includes(searchTermNarudžbe.toLowerCase()) ||
     item.dijeta.toString().toLowerCase().includes(searchTermNarudžbe.toLowerCase()) ||
     item.dorucak.toString().toLowerCase().includes(searchTermNarudžbe.toLowerCase()) ||
     item.rucak.toString().toLowerCase().includes(searchTermNarudžbe.toLowerCase()) ||
     item.vecera.toString().toLowerCase().includes(searchTermNarudžbe.toLowerCase())
   ) 
  }




  
  return (
  <div className={classes.prikazJelovnik}>
<ToastContainer />
   <div className={classes.dijelovi}>
    <div className={`${classes.components} ${classes.position} `}>
   <input type="text"  onChange={event => {setSearchTermNarudžbe(event.target.value)}}  placeholder='Brza pretraga...' className={classes.searchJelo} />
   </div>
    <div className={classes.dateWrapper}>
     
  <input defaultValue={datum} onClick={(e) =>enteredDate(e.target.value) }  placeholder='Datum' className={classes.input} />
    <div ref={refCloseCalendar}>
    {showDate && <Calendar className={classes.Calendar}
        date={new Date()}
        onChange={handleSelect}
        value={datum}
      />}
      </div> 
   </div>  


   <form className={classes.forma} onSubmit={addNewData}>
 
   
    <div className={classes.smallInputWrapper}>
    <div>
    <div className={classes.listOption2}>
      <input className={`${classes.input} ${odjelIsValid&&selectedOption===''  ? classes.border : 'nista'} ${odjelIsValid&&selectedOption===null  ? classes.border : 'nista'}`}
        type="text"
        value={selectedOption.length > 25 ? selectedOption.slice(0,25) + '...' : selectedOption}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onClick={showListFunc}
        placeholder="Odjel"
        ref={input1Ref}
      />
       {showList && <div className={classes.options}>
        {options.map((option, index) => (
          <div
            key={Math.random()}
            style={{ backgroundColor: index === highlightedOption ? 'lightgray' : 'white' }}
          >
            {option}
          </div>
        ))}
      </div>}
   
      <input className={`${classes.input} ${dijetasValid&&selectedOptionDijeta===''  ? classes.border : 'nista'} ${dijetasValid&&selectedOptionDijeta===null  ? classes.border : 'nista'}`}
        type="text"
        value={selectedOptionDijeta.length > 25 ? selectedOptionDijeta.slice(0,25) + '...' : selectedOptionDijeta}
        onChange={handleChangeDijeta}
        onKeyDown={handleKeyDownDijeta}
        onClick={showListFuncDijeta}
        placeholder="Dijeta"
        ref={input2Ref}
        
      />
      {showListDijeta && <div className={classes.options2}>
        {optionsDijeta.map((option, index) => (
          <div
            key={Math.random()}
            style={{ backgroundColor: index === highlightedOptionDijeta ? 'lightgray' : 'white' }}
          >
            {option}
          </div>
        ))}
      </div>}
    
    
   <input ref={input3Ref} type="number" min={0} value={dorucak} onChange={e => setDorucak(e.target.value)}  placeholder='Doručak' className={`${classes.input} ${dorucakIsValid&&dorucak===''  ? classes.border : 'nista'} ${dorucakIsValid&&dorucak===null  ? classes.border : 'nista'}`} />
 
   <input ref={input4Ref} type="number" min={0} value={rucak} onChange={e => setRucak(e.target.value)}  placeholder='Ručak' className={`${classes.input} ${rucakIsValid&&rucak===''  ? classes.border : 'nista'} ${rucakIsValid&&rucak===null  ? classes.border : 'nista'}`} />
   
   <input ref={input5Ref} type="number" min={0} value={vecera} onChange={e => setVecera(e.target.value)}  placeholder='Večera' className={`${classes.input} ${veecraIsValid&&vecera===''  ? classes.border : 'nista'} ${veecraIsValid&&vecera===null  ? classes.border : 'nista'}`} />
 
   </div>
   <button type='submit' onClick={(e) => addNewData(e)} className={classes.add}>Dodaj</button>
   </div>

      
  </div>
 
   </form>
 
   
   <div className={classes.row_heading}>
    <div className={`${classes.heading} ${classes.dijeteNardžba}`}>Odjel</div>
    <div className={`${classes.heading} ${classes.dijeteNardžba}`}>Dijeta</div>
    <div className={`${classes.heading} ${classes.dorucakNardžba}`}>Doručak</div>
    <div className={`${classes.heading} ${classes.rucakNardžba}`}>Ručak</div>
    <div className={`${classes.heading} ${classes.veceraNardžba}`}>Večera</div>
  </div>


  


  <NarudžbaTabela key={Math.random()} data={searchNarudžbe(data)} datum={datum} />
  
 

    </div>
    </div>


  );
}

export default Namirnice