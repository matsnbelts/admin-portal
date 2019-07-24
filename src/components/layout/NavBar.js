import React from 'react'
import { Link } from 'react-router-dom'
//import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
//import ProjectDropDowns from './ProjectDropDowns'
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.css';
import { Dropdown, NavItem } from 'react-materialize'

const NavBar = () => {
  //let showCustomerForm = <AddCustomer />;

  return (
    <nav className="nav-wrapper #000000 black darken-3">
      {/* <ul id="manage-dropdown" className="dropdown-content">
        <li><a href="#!">Exterior Services</a></li>
        <li><a href="#!">Interior Services</a></li>
        <li className="divider"></li>
        <li><a href="#!">three</a></li>
      </ul>
      <ul id="customer-dropdown" className="dropdown-content">
        <li><a href="#!">Add Customer</a></li>
        <li><a href="#!">View Customers</a></li>
        <li className="divider"></li>
        <li><a href="#!">three</a></li>
      </ul>
      <ul id="associate-dropdown" className="dropdown-content">
        <li><a href="#!">Add  Associate</a></li>
        <li><a href="#!">View Associates</a></li>
        <li className="divider"></li>
        <li><a href="#!">three</a></li>
      </ul> */}
      <div className="container">
        <Link to='/' className="brand-logo">MATS AND BELTS</Link>
        {/* <Container className="right hide-on-med-and-down">
        <Dropdown trigger={<div>Customer<i className="material-icons right">arrow_drop_down</i></div>}>
          <NavItem onClick={ showCustomerForm }>Add Customer</NavItem>
          <NavItem>View Customers</NavItem>
          <NavItem divider />
          <NavItem>AGP</NavItem>
        </Dropdown>
        <Dropdown trigger={<div>Associate<i className="material-icons right">arrow_drop_down</i></div>}>
          <NavItem onClick={ showAssociateForm }>Add Associate</NavItem>
          <NavItem>View Associates</NavItem>
          <NavItem divider />
          <NavItem>AGP</NavItem>
        </Dropdown>
      </Container> */}
        {/* <ul className="right hide-on-med-and-down">
          <li><a className="dropdown-trigger" href="#!" data-target="customer-dropdown">Customer<i className="material-icons right">arrow_drop_down</i></a></li>
          <li><a className="dropdown-trigger" href="#!" data-target="associate-dropdown">Associate<i className="material-icons right">arrow_drop_down</i></a></li>
          <li><a className="dropdown-trigger" href="#!" data-target="manage-dropdown">Admin<i className="material-icons right">arrow_drop_down</i></a></li>
        </ul> */}
        <Dropdown trigger={<div className="right hide-on-med-and-down">Customer<i className="material-icons right">arrow_drop_down</i></div>}>
          <NavItem href="/add_customer">Add Customer</NavItem>
          <NavItem href="/view_customers">View Customers</NavItem>
        </Dropdown>
        <Dropdown trigger={<div className="right hide-on-med-and-down">Associate<i className="material-icons right">arrow_drop_down</i></div>}>
          <NavItem href="/add_associate">        
            Add Associate
          </NavItem>
          <NavItem href="/view_associates">View Associates</NavItem>
        </Dropdown>
      </div>
    </nav>

    // <nav className="nav-wrapper grey darken-3">
    //     <div className="container">
    //         <Link to='/' className="brand-logo">Mats And Belts</Link>
    //         <ProjectDropDowns />
    //     </div>
    // </nav>
  )
}

export default NavBar