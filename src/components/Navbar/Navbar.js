import React, {useState, useEffect} from 'react'

import MenuButton from '../UI/MenuButton/MenuButton'

import classes from './Navbar.module.css'

import SyncLoader from 'react-spinners/SyncLoader'

import Dijete from '../Dijete/Dijete'
import Jelovnik from '../Jelovnik/Jelovnik'
import Jelo from '../Jelo/Jelo'
import Namirnice from '../Namirnice/Namirnice'
import Linije from '../Linije/Linije'
import Izvještaji from '../Izvještaji/Izvještaji'
import Narudžba from '../Narudžba/Narudžba'


function Navbar() {


  const [active, setActive] = useState('Narudžba')
  const [loading, setLoading] = useState(false)
  const [loadingApp, setLoadingApp]  = useState(true)
 
  const setSelectedHandler = naziv => {
    setActive(naziv);
    setLoading(true)
    setTimeout(() => {
        setLoading(false)
    }, 1000)
  }

  useEffect(()=> {
    setLoadingApp(true)
    setTimeout(()=> {
        setLoadingApp(false)
    }, 1000)
  }, [])


  return (
    <div>
       { loadingApp ? (<SyncLoader
        color={'#289944'}
        loading={loadingApp}
        cssOverride={{position: 'absolute', top:'45%', left:'48%'}}
      />) : (<div>

<div className={classes.navigation}>
            <MenuButton name={"Narudžba"} activ={active} select={setSelectedHandler}>
                <img className={classes.img} src='./utilities/clipboard.png' alt='orders' />
                <p className={classes.title}>Narudžba</p>
            </MenuButton>
            <MenuButton name={"Jelovnik"} activ={active} select={setSelectedHandler}>
                <img src='./utilities/menu.png' alt='orders' />
                <p className={classes.title}>Jelovnik</p>
            </MenuButton>
            <MenuButton name={"Jelo"} activ={active} select={setSelectedHandler}>
                <img src='./utilities/dinner.png' alt='orders' />
                <p className={classes.title}>Jelo</p>
            </MenuButton >
            <MenuButton  name={"Dijete"} activ={active} select={setSelectedHandler}>
                <img src='./utilities/diet.png' alt='orders' />
                <p className={classes.title}>Dijete</p>
            </MenuButton>
            <MenuButton name={"Namirnice"} activ={active} select={setSelectedHandler}>
                <img src='./utilities/grocery.png' alt='orders' />
                <p className={classes.title}>Namirnice</p>
            </MenuButton>
            <MenuButton name={"Linije"} activ={active} select={setSelectedHandler}>
                <img src='./utilities/line.png' alt='orders' />
                <p className={classes.title}>Linije</p>
            </MenuButton>
            <MenuButton name={"Izvještaji"} activ={active} select={setSelectedHandler}>
                <img src='./utilities/report.png' alt='orders' />
                <p className={classes.title}>Izvještaji</p>
            </MenuButton>
        </div>

        
    {loading && 
    (<div><SyncLoader
        color={'#289944'}
        loading={loading}
        cssOverride={{position: 'absolute', top:'45%', left:'50%'}}
      /> </div> ) }
    {!loading && ( active === "Narudžba" && <Narudžba />)}
    {!loading && (active === "Jelovnik"  && <Jelovnik />) }
    {!loading && ( active === "Jelo"  && <Jelo /> )}
    {!loading && ( active === "Dijete"  && <Dijete /> )}
    {!loading && ( active === "Namirnice"  && <Namirnice /> )}
    {!loading && (active === "Linije"  && <Linije />) }
    {!loading && (active === "Izvještaji"  && <Izvještaji />) }
   
    </div>)}
    </div>
  )
}

export default Navbar