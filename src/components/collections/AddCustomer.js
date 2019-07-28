import React, { Component } from 'react'
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.css';
import { Container, Button, TextInput, Row } from 'react-materialize';
import { connect } from 'react-redux'
import { addCustomer } from '../../store/actions/customerActions'
import M from "materialize-css";


class AddCustomer extends Component {
  constructor() {
    super();
    this.state = {
      Cars: [],
      name: '',
      mobile: '',
      apartmentNo: '',
      apartment: '',
      area: '',
      email: '',
      staffMobile: '',
      submitted: false
    }
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    let selects = document.querySelectorAll('select');
    M.FormSelect.init(selects, {});
    if (this.props.customer !== prevProps.customer) {
      this.setState({ submitted: this.props.customer.submitted });
    }
    console.log('ComponDidUpdate' + this.props.customer.submitted + ":"
      + this.state.submitted)
  }

  handleAddCar = () => {
    let car = {}
    car.no = '';
    car.model = '';
    car.type = '';
    car.pack = 'full';
    car.promocode = '';
    car.promoexpiry = '';

    let Cars = [...this.state.Cars, car];
    this.setState({
      Cars: Cars
    });
    console.log("handle ADD Car " + car.no);
  }

  handleRemoveCar = (index, e) => {
    e.preventDefault();
    let Cars = [...this.state.Cars];
    if (index !== -1) {
      Cars.splice(index, 1);
    }
    this.setState({ Cars });
    this.state.Cars.map((car_form, index) => {
      for (let [carModel, value] of Object.entries(car_form)) {
        console.log("iiii " + index + "  : " + carModel + " : " + value);
      }
    });
  }

  handleCarFieldChange = (index, attr, e) => {
    e.preventDefault();
    // 1. Make a shallow copy of the items
    let Cars = [...this.state.Cars];
    // 2. Make a shallow copy of the item you want to mutate
    let car = { ...Cars[index] };
    switch (attr) {
      case 'model':
        // 3. Replace the property you're intested in
        car.model = e.target.value;
        break;
      case 'no':
        car.no = e.target.value;
        break;
      case 'type':
        car.type = e.target.value;
        break;
      case 'pack':
        car.pack = e.target.value;
        console.log(index + " attr: " + car.pack)
        break;
      case 'promocode':
        car.promocode = e.target.value;
        console.log(index + " promocode: " + car.promocode)
        break;
      case 'promoExpiry':
        car.promoexpiry = e.target.value;
        console.log(index + " promoexpiry: " + car.promoexpiry)
        break;
      case 'startDate':
        car.startDate = e.target.value;
        console.log("ssssss: " + car.startDate)
        break;
      case 'status':
        car.status = e.target.value;
        break;
      default:

    }
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    car.status = true;
    Cars[index] = car;
    // 5. Set the state to our new copy
    this.setState({ Cars });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleAdd = (e) => {
    e.preventDefault();
    console.log("Customer State after added: " + this.state);
    if (this.state.mobile !== '' && this.state.name !== '' && this.state.apartmentNo !== ''
    && this.state.apartment !== '' && this.state.email !== '') {
      this.props.addCustomer(this.state)
      this.props.history.push('/view_customers')
    }
  }
  render() {
    const addCars = this.state.Cars.map((car_form, index) => (

      <Container id={index + "container"} key={index + "container"}>
        <div className="divider"></div>
        <div className="section">
          <Row>
            <TextInput style={(car_form.no === '') ? {borderColor: 'red'} : {}} required="" className="validate input-field col s12" label="number" id={index + "no"} type="text" value={car_form.no} onChange={(e) => this.handleCarFieldChange(index, "no", e)} />
            <TextInput style={(car_form.model === '') ? {borderColor: 'red'} : {}} required="" className="validate input-field col s12" label="Model" id={index + "model"} type="text" value={car_form.model} onChange={(e) => this.handleCarFieldChange(index, "model", e)} />
            <TextInput style={(car_form.startDate === '') ? {borderColor: 'red'} : {}} label="Start Date" id={index + "startDate"} type="date" value={(car_form["startDate"]) ? new Date(new Date(car_form.startDate) - (new Date()).getTimezoneOffset() * 60000).toISOString().substr(0, 10) : ""} onChange={(e) => this.handleCarFieldChange(index, "startDate", e)} />
          </Row>
          <Row>
          <div className="input-field col s6">
              <select required aria-required="true" id={index + "type"} value={car_form["type"]} onChange={(e) => this.handleCarFieldChange(index, "type", e)}>
                <option value="" disabled selected>Choose your option</option>
                <option value="sedan">Sedan</option>
                <option value="hatchback">Hatchback</option>
                <option value="suv">SUV</option>
                <option value="smallcar">SmallCar</option>
              </select>
              <label>Type</label>
            </div>
            <div className="input-field col s6">
              <select id={index + "pack"} value={car_form["pack"]} onChange={(e) => this.handleCarFieldChange(index, "pack", e)}>
                <option value="" disabled selected>Choose your option</option>
                <option value="full">Full</option>
                <option value="mini">Mini</option>
              </select>
              <label>Pack</label>
            </div>
            </Row>

          <Row>
            <div className="input-field col s3">
              <select id={index + "promocode"} value={car_form.promocode} onChange={(e) => this.handleCarFieldChange(index, "promocode", e)}>
                <option value="" disabled selected>Choose</option>
                <option value="Promo100">Promo100</option>
                <option value="Promo200">Promo200</option>
                <option value="Promo20%">Promo20%</option>
              </select>
              <label>PromoCode</label>
            </div>
            <TextInput className="input-field col s12" label="Promo Expiry" id={index + "promoExpiry"} type="date" value={(car_form.promoexpiry) ? new Date(new Date(car_form.promoexpiry) - (new Date()).getTimezoneOffset() * 60000).toISOString().substr(0, 10) : ""} onChange={(e) => this.handleCarFieldChange(index, "promoExpiry", e)} />
          </Row>
          <Row>
            <Button id={index + "remove"} onClick={(e) => this.handleRemoveCar(index, e)} className="#000000 black">Remove Car</Button>
          </Row>
        </div>
      </Container>
    ));
    return (
      <Container>
        <Row>
          <form onSubmit={this.handleAdd} className="col s12">
            <Row>
              <TextInput style={(this.state.name === '') ? {borderColor: 'red'} : {}} required="" aria-required="true" className="input-field col s10" label="Name" id="name" type="text" onChange={this.handleChange} />
              <TextInput style={(this.state.mobile === '') ? {borderColor: 'red'} : {}} required="" aria-required="true" className="input-field col s10" label="Mobile" id="mobile" type="text" onChange={this.handleChange} />
            </Row>
            <Row>
              <TextInput style={(this.state.apartmentNo === '') ? {borderColor: 'red'} : {}} required="" aria-required="true" className="input-field col s12" label="Apartment No" id="apartmentNo" type="text" onChange={this.handleChange} />
              <TextInput style={(this.state.apartment === '') ? {borderColor: 'red'} : {}} required="" aria-required="true" className="input-field col s12" label="Apartment" id="apartment" type="text" onChange={this.handleChange} />
              <TextInput required="" aria-required="true" className="input-field col s12" label="Area" id="area" type="text" onChange={this.handleChange} />
            </Row>
            <Row>
              <TextInput style={(this.state.email === '') ? {borderColor: 'red'} : {}} className="input-field col s12" label="Email" id="email" type="text" onChange={this.handleChange} />
              <TextInput className="input-field col s12" label="Staff Mobile" id="staffMobile" type="text" onChange={this.handleChange} />
            </Row>
            <div>
              {addCars}
            </div>
            <div className="row">
              <div className="input-field col s12">
                <Button onClick={this.handleAddCar} className="#000000 black">Add Car</Button>
              </div>
            </div>
            <Button className="#000000 black">Add Customer</Button>
          </form>
        </Row>
        {this.state.submitted &&
          <div>Added successfully</div>
        }
      </Container >
    )
  }
}

const mapStateToProps = (state) => {
  console.log('Map Customer state to props--------')
  console.log(state.customer)
  return {
    customer: state.customer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCustomer: (customer) => dispatch(addCustomer(customer))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddCustomer)