import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import NavBar from './components/layout/NavBar'
import AddCustomer from './components/collections/AddCustomer';
import AddAssociate from './components/collections/AddAssociate';
import AssociateList from './components/collections/AssociateList';
import CustomerList from './components/collections/CustomerList';
import UpdateSingleCustomer from './components/collections/UpdateCustomer'
import UpdateSingleAssociate from './components/collections/UpdateAssociate'


class App extends Component {
  render() {
    return (
      <BrowserRouter>        
          <NavBar />
          <Switch>
            <Route path='/add_customer' component={AddCustomer} />
            <Route path='/add_associate' component={AddAssociate} />
            <Route path='/view_associates' component={AssociateList} />
            <Route path='/view_customers' component={CustomerList} />
            <Route path='/customer/:id' component={UpdateSingleCustomer} />
            <Route path='/associate/:id' component={UpdateSingleAssociate} />
          </Switch>
      </BrowserRouter>
    )
  }
}
export default App;
