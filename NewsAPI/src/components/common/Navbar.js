//for Navigation bar links

import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return(
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/news" className="navbar-item">📡</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
