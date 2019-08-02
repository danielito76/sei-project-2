//for Navigation bar links

import React from 'react'
import { Link, withRouter } from 'react-router-dom'


class Navbar extends React.Component {

  constructor(){
    super()
    this.toggleNavbar=this.toggleNavbar.bind(this)

    this.state={
      navbarOpen: false // set this to false
    }
  }

  toggleNavbar(){
    this.setState({ navbarOpen: !this.state.navbarOpen}) //to toggle the navbar and navbar menu
  }

  componentDidUpdate(prevProps){
    if (prevProps.location.pathname !== this.props.location.pathname){ // this is to hide the menu bar once you open the navbar
      this.setState({navbarOpen: false})
    }
  }
  render (){
    return(
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">📡</Link>

            <a
              role="button"
              className={`navbar-burger ${this.state.navbarOpen ? 'is-active' : ''}`}
              onClick={this.toggleNavbar}
            >

              <span aria-hidden = "true"></span>
              <span aria-hidden = "true"></span>
              <span aria-hidden = "true"></span>
            </a>


          </div>


          <div className={`navbar-menu ${this.state.navbarOpen ? 'is-active' : ''}`}>
            <div className="navbar-brand">
              <Link to="/news" className="navbar-item">Browse</Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(Navbar)
