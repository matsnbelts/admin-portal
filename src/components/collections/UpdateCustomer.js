import React from 'react'
import { connect } from 'react-redux'
import { Container, Button, TextInput, Row, Switch, Collapsible, CollapsibleItem} from 'react-materialize';
import { getCustomerAction, updateCustomerAction } from '../../store/actions/customerActions'
import M from "materialize-css";

class UpdateSingleCustomer extends React.Component {
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
            active: true,
            car_form_data: {}
        }
    }
    componentDidMount() {
        let { id } = this.props.match.params
        this.props.getCustomer(id)
    }

    componentDidUpdate(prevProps) {
        let selects = document.querySelectorAll('select');
        M.FormSelect.init(selects, {});

        // Typical usage (don't forget to compare props):
        if (this.props.getCustomerData !== prevProps.getCustomerData) {
            const customerActionData = this.props.getCustomerData.action.customer
            if(!customerActionData.Cars) {
                return;
            }
            let Cars = []
            for(let [key, value] of Object.entries(customerActionData.Cars)) {
                let car_map = {}
                car_map['no'] = key
                car_map['loaded_from_db'] = true
                for(let [car_key, car_value] of Object.entries(value)) {
                    if(car_key === 'startDate' || car_key === 'promoExpiry') {
                        car_map[car_key] = (car_value && typeof car_value == 'object') ? car_value.toDate().toDateString() : ""
                    } else {
                        car_map[car_key] = car_value
                    }
                }
                Cars.push(car_map)
                console.log(key + ":" +value)
            }
            this.setState({
                ...this.state,
                name: customerActionData.name,
                mobile: customerActionData.mobile,
                apartmentNo: customerActionData.apartmentNo,
                apartment: customerActionData.apartment,
                area: customerActionData.area,
                email: customerActionData.email,
                staffMobile: customerActionData.staffMobile,
                active: customerActionData.active,
                Cars: Cars
            }, function() {
                console.log(this.state)
            })
        }
    }
    handleCancel() {
        window.location.reload();
    }
    handleChange = (e) => {
        this.setState({
          ...this.state,
          [e.target.id]: e.target.value
        })
    }
    handleCustomerSwitchChange = (e) => {
        this.setState({
            ...this.state,
            active: !this.state.active
        })
    }

    updateCustomer = e => {
        e.preventDefault()
        if (this.state.mobile !== '' && this.state.name !== '' && this.state.apartmentNo !== ''
        && this.state.apartment !== '' && this.state.email !== '')
            this.props.updateCustomer(this.state, this.props.match.params.id)
        this.props.history.push('/view_customers')
    }
    handleCarFieldChange = (index, attr, e) => {
        e.preventDefault();
        // 1. Make a shallow copy of the items
        let Cars_ = this.state.Cars;
        // 2. Make a shallow copy of the item you want to mutate
        let car = Cars_[index];

        switch (attr) {
          case 'model':
            // 3. Replace the property you're intested in
            car.model = e.target.value;
            break;
          case 'no':
            car.no = e.target.value;
            break;
          case 'status':
            car.status = !car.status;
            console.log("status: " + car.status)
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
            break;
          default:
        }
        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
        Cars_[index] = car;
        // 5. Set the state to our new copy
        this.setState({ 
            ...this.state,
            Cars: Cars_
        }, function() {
            console.log(this.state.Cars)
        });
      }
    handleAddCar = (e) => {
        e.preventDefault();
        let car = {}
        car.no = '';
        car.model = '';
        car.type = '';
        car.startDate = '';
        car.pack = 'Full';
        car.promocode = '';
        car.promoexpiry = '';
        car.status = true;
        car.loaded_from_db = false;
    
        let cars_list = this.state.Cars;
        cars_list.push(car)
        this.setState({
          ...this.state,
          Cars: cars_list
        });
        console.log("handle ADD Car " + car.no);
    }
    handleStopCar = (index, e) => {
        e.preventDefault();
        // 1. Make a shallow copy of the items
        let Cars_ = this.state.Cars;
        // 2. Make a shallow copy of the item you want to mutate
        let car = Cars_[index];
        car.status = !car.status;
        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
        Cars_[index] = car;
        // 5. Set the state to our new copy
        this.setState({ 
            ...this.state,
            Cars: Cars_ 
        }, function() {
            console.log(this.state.Cars)
        });
    }
    handleRemoveCar = (index, e) => {
        e.preventDefault();
        let Cars = [...this.state.Cars];
        if (index !== -1) {
            Cars.splice(index, 1);
        }
        this.setState({                 
            ...this.state,
            Cars
         });
    }
    getPromoCode = promocode => {
        return (!promocode) ? "": promocode
    }
    render() {
        const showRemoveButton = (index, loaded_from_db, status) => {
            if(loaded_from_db) {
                return (
                <Button id={index + "stop"} onClick={(e) => this.handleStopCar(index, e)} className="#000000 black">{status ? "Deactivate Car":"Activate Car"}</Button>
                )
            } else {
                return (
                    <Button id={index + "remove"} onClick={(e) => this.handleRemoveCar(index, e)} className="#000000 black">Remove Car</Button>
                )
            }
        }

        const addCars = this.state.Cars.map((car_form, index) => (
            <CollapsibleItem id={index + "container"} key={index + "container"} header={car_form["no"]}>
              <div className="divider"></div>
              <div className="section">
                <Row>
                    <TextInput style={(car_form.no === '') ? {borderColor: 'red'} : {}} required="" aria-required="true" className="input-field col s10" label="Car No." id={index + "id"} type="text" onChange={(e) => this.handleCarFieldChange(index, "id", e)} value={car_form.id} />
                    <TextInput style={(car_form.model === '') ? {bnorderColor: 'red'} : {}} disabled={!car_form.status} required="" className="validate input-field col s12" label="Model" id={index + "model"} type="text" value={car_form.model} onChange={(e) => this.handleCarFieldChange(index, "model", e)} />
                    <TextInput style={(car_form.startDate === '') ? {borderColor: 'red'} : {}} disabled={!car_form.status} label="Start Date" id={index + "startDate"} type="date" value={(car_form.startDate) ? new Date(new Date(car_form["startDate"]) - (new Date()).getTimezoneOffset() * 60000).toISOString().substr(0, 10) : ""} onChange={(e) => this.handleCarFieldChange(index, "startDate", e)} />
               </Row>
                <Row>
                    <div className="input-field col s6">
                        <select disabled={!car_form.status} required aria-required="true" id={index + "type"} value={car_form.type} onChange={(e) => this.handleCarFieldChange(index, "type", e)}>
                            <option value="" disabled >Choose your option</option>
                            <option value="Sedan">Sedan</option>
                            <option value="Hatchback">Hatchback</option>
                            <option value="SUV">SUV</option>
                            <option value="Small Car">Small Car</option>
                            <option value="bike">Bike</option>
                        </select>

                        <label>Type</label>
                    </div>
                  <div className="input-field col s6">
                    <select disabled={!car_form.status} id={index + "pack"} value={car_form.pack} onChange={(e) => this.handleCarFieldChange(index, "pack", e)}>
                      <option className="#000000 black white-text text-darken-2" value="" disabled>Choose your option</option>
                      <option className="#000000 black" value="Full">Full</option>
                      <option className="#000000 black white-text text-darken-2" value="Mini">Mini</option>
                    </select>
                    <label>Pack</label>
                  </div>
                  </Row>
                <Row>
                  <div className="input-field col s3">
                    <select disabled={!car_form.status} className="#000000 black white-text text-darken-2" id={index + "promocode"} value={this.getPromoCode(car_form.promocode)} onChange={(e) => this.handleCarFieldChange(index, "promocode", e)}>
                      <option value="" disabled>Choose</option>
                      <option value="Promo100">Promo100</option>
                      <option value="Promo200">Promo200</option>
                      <option value="Promo20%">Promo20%</option>
                    </select>
                    <label>PromoCode</label>
                  </div>
                  <TextInput disabled={!car_form.status} className="input-field col s12" label="Promo Expiry" id={index + "promoExpiry"} type="date" value={(car_form.promoexpiry) ? new Date(new Date(car_form.promoexpiry) - (new Date()).getTimezoneOffset() * 60000).toISOString().substr(0, 10) : ""} onChange={(e) => this.handleCarFieldChange(index, "promoExpiry", e)} />
                </Row>
                <Row>
                    <label className="col s2">Car Status</label>
                    <Switch className="col s6" onLabel="On" disabled offLabel="Off"checked={car_form.status} id={index + "status"} onChange={(e) => this.handleCarFieldChange(index, "status", e)} />
                </Row>
                <Row>
                    {showRemoveButton(index, car_form.loaded_from_db, car_form.status)}
                </Row>
              </div>
            </CollapsibleItem>
          ));
        return (         
            <div>
                <div className='center'>
                    <h4>Update Customer Details</h4>
                    <Container>
            <Row>
                <form onSubmit={this.updateCustomer} className="col s12">
                    <Row>
                        <TextInput style={(this.state.name === '') ? {borderColor: 'red'} : {}} required="" aria-required="true" className="input-field col s10" label="Name" id="name" type="text" onChange={this.handleChange} value={this.state.name} />
                        <TextInput style={(this.state.mobile === '') ? {borderColor: 'red'} : {}} required="" aria-required="true" className="input-field col s10" label="Mobile" id="mobile" type="text" onChange={this.handleChange} value={this.state.mobile} />
                    </Row>
                    <Row>
                        <TextInput style={(this.state.apartmentNo === '') ? {borderColor: 'red'} : {}} required="" aria-required="true" className="input-field col s12" label="Apartment No" id="apartmentNo" type="text" onChange={this.handleChange} value={this.state.apartmentNo} />
                        <TextInput style={(this.state.apartment === '') ? {borderColor: 'red'} : {}} required="" aria-required="true" className="input-field col s12" label="Apartment" id="apartment" type="text" onChange={this.handleChange}  value={this.state.apartment}/>
                        <TextInput required="" aria-required="true" className="input-field col s12" label="Area" id="area" type="text" onChange={this.handleChange}  value={this.state.area}/>
                    </Row>
                    <Row>
                        <TextInput style={(this.state.email === '') ? {borderColor: 'red'} : {}} className="input-field col s12" label="Email" id="email" type="text" onChange={this.handleChange}  value={this.state.email}/>
                        <TextInput className="input-field col s12" label="Staff Mobile" id="staffMobile" type="text" onChange={this.handleChange} value={this.state.staffMobile} />
                    </Row>
                    <Row>
                        <span className="col s4">Customer Status</span>
                        <Switch className="col s6" onLabel="On" offLabel="Off" id="customerStatus" checked={this.state.active} onChange={this.handleCustomerSwitchChange} />
                    </Row>
                    <Collapsible>
                        {addCars}
                    </Collapsible>
                    <div className="row">
                        <div className="input-field col s12">
                            <Button onClick={this.handleAddCar} className="#000000 black">Add Car</Button>
                        </div>
                    </div>
                    <Row>
                    <Button className="col s2 #000000 black" onClick={this.handleCancel}>Cancel</Button>
                    <div className="col s2"></div>
                    <Button className="col s2 #000000 black">Update Customer</Button>
                    </Row>

                </form>
            </Row>
            {this.state.submitted &&
                <div>Updated successfully</div>
            }
        </Container >
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getCustomer: (id) => { dispatch(getCustomerAction(id)) },
        updateCustomer: (updatedCustomer, id) => { dispatch(updateCustomerAction(updatedCustomer, id)) }
    }
}
const mapStateToProps = (state) => {
    return {
        getCustomerData: state.customer
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UpdateSingleCustomer)