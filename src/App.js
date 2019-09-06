import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import NavBar from './components/layout/NavBar'
import AddCustomer from './components/collections/AddCustomer';
import CreateCustomer from './components/collections/CreateCustomer';
import AddAssociate from './components/collections/AddAssociate';
import AssociateList from './components/collections/AssociateList';
import CustomerList from './components/collections/CustomerList';
import CustList from './components/collections/CustList';
import UpdateSingleCustomer from './components/collections/UpdateCustomer'
import CustomerSheetUpload from './components/collections/CustomerSheetUpload'
import UpdateSingleAssociate from './components/collections/UpdateAssociate'
import UpdateJobStatus from './components/collections/UpdateJobStatus'
import AssignJobs from './components/collections/AssignJobs'
import Test from './components/collections/test'
import InteriorServiceDates from './components/collections/InteriorServiceDates';


class App extends Component {
  render() {
    return (
      <BrowserRouter>        
          <NavBar />
          <Switch>
            <Route path='/add_customer' component={AddCustomer} />
            <Route path='/create_customer' component={CreateCustomer} />
            <Route path='/add_associate' component={AddAssociate} />
            <Route path='/view_associates' component={AssociateList} />
            <Route path='/view' component={CustomerList} />
            <Route path='/upload' component={CustomerSheetUpload} />
            <Route path='/view_customers' component={CustList} />
            <Route path='/customer/:id' component={UpdateSingleCustomer} />
            <Route path='/associate/:id' component={UpdateSingleAssociate} />
            <Route path='/assign_jobs' component={AssignJobs} />
            <Route path='/test' component={Test} />
            <Route path='/job/:carId/:dateToNavigate' component={UpdateJobStatus} />
            <Route path='/interior_availability' component={InteriorServiceDates} />
            <Route path='/exterior_unavailability' component={AssignJobs} />

          </Switch>
      </BrowserRouter>
    )
  }
}
export default App;
