import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {FaBars, FaTimes} from 'react-icons/fa'
import './NavbarStyles.css'

const Navbar = () => {
    const[click, setClick] = useState(false)
    const handleClick = () => setClick(!click)




  return (
    <div className='header'>
        <Link to='/'><h1>UVSmart</h1></Link>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li>
                <Link to='/'>Home</Link>
            </li>
            <li>
                <Link to='/measures'>Protection Measures</Link>
            </li>
            <li>
                <Link to='/reminders'>Reminders</Link>
            </li>
            <li>
                <Link to='/impact'>UV Impact</Link>
            </li>
        </ul>
        <div className='hamburger' onClick={handleClick}>
            {click ? (<FaTimes size={20} style={{color: '#000'}}/>) : (<FaBars size={20} style={{color: '#000'}}/>)}



            
        </div>
    </div>
  )
}

export default Navbar