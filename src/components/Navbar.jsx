import React from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div>
      <nav className='navbar bg-light shadow'>
        <div className='container'>
          <ul className="nav">
            <img src={logo} style={{ height: "40px" }} />
            <li><Link to="/" className='nav-link'>Beranda</Link></li>
            <li><Link to="/buku" className='nav-link'>Manajemen Buku</Link></li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navbar