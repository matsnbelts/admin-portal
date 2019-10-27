import React from 'react'
import { Link } from 'react-router-dom'
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.css';
import { Dropdown, NavItem } from 'react-materialize'

const NavBar = () => {

  return (
    <nav className="nav-wrapper #000000 black darken-3">
      <div className="container">
        <Link to='/' className="brand-logo">MATS AND BELTS</Link>
        
        <Dropdown className="#000000 black" trigger={<div className="right hide-on-med-and-down">Customer<i className="material-icons right">arrow_drop_down</i></div>}>
          <NavItem href="/upload">CSV Upload</NavItem>
          <NavItem href="/create_customer">Add Customer</NavItem>
          <NavItem href="/view_customers">View Customers</NavItem>
        </Dropdown>
        <Dropdown className="#000000 black darken-3" trigger={<div className="right hide-on-med-and-down">Associate<i className="material-icons right">arrow_drop_down</i></div>}>
          <NavItem href="/add_associate">        
            Add Associate
          </NavItem>
          <NavItem href="/view_associates">View Associates</NavItem>
        </Dropdown>
        <Dropdown className="#000000 black darken-3" trigger={<div className="right hide-on-med-and-down">Admin<i className="material-icons right">arrow_drop_down</i></div>}>
          <NavItem href="/assign_jobs">        
            Assign Job
          </NavItem>
          <NavItem href="/interior_availability">        
            Interior
          </NavItem>
          <NavItem href="/exterior_unavailability">        
            Exterior
          </NavItem>
        </Dropdown>
      </div>
    </nav>
  )
}

export default NavBar