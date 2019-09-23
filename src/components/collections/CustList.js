import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Collapsible, CollapsibleItem, Button, TextInput } from 'react-materialize'
import './CustomerList.css'
import sendTopic from  './SendFCMTopic'
import { updateCustomerDueAction } from '../../store/actions/customerActions'


class CustList extends React.Component {
    constructor(props) {
        super(props);
        this.selectedCustomers = new Map();
        this.filteredCustomers = {};
        this.selectAll = false;
        this.state = {
            customers_state: props.customer,
            Cars: [],
            searchCustomerName: 'all#',
            car_form_data: {},
        }
    }

    componentDidMount() {
        console.log('Component Did Mount')
    }

    componentDidUpdate(prevProps) {
        //console.log('Component Did Update')
    }

    handleSearch = (e) => {
        e.preventDefault()
    }


    handleSearchChange = (e) => {
        e.preventDefault()
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value ? e.target.value.toLowerCase() : 'all#'
          }, () => {
            console.log(this.state.searchCustomerName) 
          })  
    }

    handleSendInvoiceMessage = (e) => {
        e.preventDefault()
        console.log(this.selectedCustomers.keys())
        this.selectedCustomers.forEach((value, key, map) => {
            console.log('hiiiii: ' + key)
            sendTopic(key) 
        });
    }

    selectChange = (e) => {
        console.log(e.target.checked + " : id: " + e.target.id)
        if(!e.target.checked) {
            this.selectedCustomers.delete(e.target.id)
        } else {
            this.selectedCustomers.set(e.target.id, e.target.checked)
        }
        if(this.selectedCustomers.size > 0) {
            this.refs.sendInvoiceMessage.disabled = false
            this.refs.sendInvoiceMessage.style['cursor'] = 'pointer'
            this.refs.markAsPaid.disabled = false
            this.refs.markAsPaid.style['cursor'] = 'pointer'
            this.refs.markAsDue.disabled = false
            this.refs.markAsDue.style['cursor'] = 'pointer'
        } else {
            this.refs.sendInvoiceMessage.disabled = true
            this.refs.sendInvoiceMessage.style['cursor'] = 'not-allowed'
            this.refs.markAsPaid.disabled = false
            this.refs.markAsPaid.style['cursor'] = 'pointer'
            this.refs.markAsDue.disabled = false
            this.refs.markAsDue.style['cursor'] = 'pointer'
        } 
        console.log(e.target.checked  + ' :: ' + this.filteredCustomers.length)
    }

    selectAllChange = (e) => {
        console.log(e.target.checked)
        this.selectAll = e.target.checked
        this.filteredCustomers.map(g => {
            this.refs['select' + g.id].checked = this.refs.selectAll.checked
            if(this.refs['select' + g.id].checked) {
                this.selectedCustomers.set('select' + g.id, this.refs['select' + g.id].checked)
            } else {
                this.selectedCustomers.delete('select' + g.id) 
            }
        })
        if(this.selectedCustomers.size > 0) {
            this.refs.sendInvoiceMessage.disabled = false
            this.refs.sendInvoiceMessage.style['cursor'] = 'pointer'
            this.refs.markAsPaid.disabled = false
            this.refs.markAsPaid.style['cursor'] = 'pointer'
            this.refs.markAsDue.disabled = false
            this.refs.markAsDue.style['cursor'] = 'pointer'
        } else {
            this.refs.sendInvoiceMessage.disabled = true
            this.refs.sendInvoiceMessage.style['cursor'] = 'not-allowed'
            this.refs.markAsPaid.disabled = false
            this.refs.markAsPaid.style['cursor'] = 'pointer'
            this.refs.markAsDue.disabled = false
            this.refs.markAsDue.style['cursor'] = 'pointer'
        }
        console.log(this.refs.selectAll.checked  + ' :: ' + this.filteredCustomers.length + " :: " + this.refs.sendInvoiceMessage.disabled)
    }

    handleMark = (status, e) => {
        e.preventDefault()
        console.log(status)
        this.props.updateCustomer(this.selectedCustomers, status)
    }

    render() {
    const Cars = (props) => {
        if(props)
            for (let [carNo, car] of Object.entries(props)) {
                return (
                    <div>
                        <div> {carNo} </div>
                        <div> {car.model}</div>
                    </div>
                )
            }
    }
    const getStyles = () => {
        return Object.assign(
            {},
            {
                width: "100%"
            }
        );
    }

    const getSectionStyles = () => {
        return Object.assign(
            {},
            {
                'marginRight': '10px'
            }
        );
    }
    const getSearchButtonStyle = () => {
        return Object.assign(
            {},
            {
                'backgroundColor': 'black',
                color: 'white',
                'borderRadius': '5px',
                cursor: 'not-allowed',
                padding: '5px 10px'
            }
        );
    }

    const getStylesSearch = () => {
        return Object.assign(
            {},
            {
                width: "50%",
                height: "2rem",
                margin: '10px'
            }
        );
    }

    const Customers = () => {
        const { customer } = this.props;
        let customers;
        if (customer) {
            if(this.state.searchCustomerName !== 'all#') {
                this.filteredCustomers = customer.filter(c => 
                    (c.name && c.name.toLowerCase().includes(this.state.searchCustomerName)) ||
                    (c.customerId && c.customerId.toLowerCase().includes(this.state.searchCustomerName)) ||
                    (c.apartmentNo && c.apartmentNo.toLowerCase().includes(this.state.searchCustomerName)) ||
                    (c.apartment && c.apartment.toLowerCase().includes(this.state.searchCustomerName)) ||
                    (c.id && c.id.toLowerCase().includes(this.state.searchCustomerName))
                );
            } else {
                this.filteredCustomers = customer;
            }
            customers = (this.filteredCustomers.map(g => {
                return (
                    <CollapsibleItem key={g.name + " " + g.id} header={
                        <div>
                            <label className='spann'>
                                <input type="checkbox" id={'select-' + g.id} ref={'select' + g.id} onChange={(e) => this.selectChange(e)} className="filled-in" />
                                <span></span>
                            </label>
      {/* <div className='spann'>
            <input type="button" id="myBtn" onClick={this.startJobScheduler} value="..."></input>
            </div> */}
                            <div className='spann'>{g.name}</div>
                            <div className='spann'>{g.customerId ? g.customerId: 'N/A'}</div>
                            <div className='spann'>{g.apartmentNo ? g.apartmentNo: 'N/A'}</div>
                            <div className='spann'>{g.apartment ? g.apartment: 'N/A'}</div>
                            <div className='spann'>{g.id ? g.id: 'N/A'}</div>
                            <div className='spann'>{(g.active) ? "Active" : "Not Active"}</div>
                        </div>
                    }>
                        <table className='.custable'>
                            <tbody className='custbody'>
                                <tr className='custr'>
                                    <td className='custd'> Customer Name </td>
                                    <td className='custd'> {g.name} </td>
                                </tr>
                                <tr className='custr'>
                                    <td className='custd'> Customer Mobile </td>
                                    <td className='custd'> {g.id} </td>
                                </tr>
                                <tr className='custr'>
                                    <td className='custd'> Customer Status </td>
                                    <td className='custd'> {(g.active) ? "Active" : "Not Active"} </td>
                                </tr>
                                <tr className='custr'>
                                    <td className='custd'> Apartment </td>
                                    <td className='custd'> {g.apartmentNo} {g.apartment} </td>
                                </tr>
                                <tr className='custr'>
                                    <td className='custd'> Email </td>
                                    <td className='custd'> {g.email} </td>
                                </tr>
                                <tr className='custr'>
                                    <td className='custd'> Cleaner Mobile </td>
                                    <td className='custd'> {g.staffMobile} </td>
                                </tr>
                                <tr className='custr'>
                                    <td className='custd'> {Cars(g.Cars)} </td>
                                </tr>
                            </tbody>
                        </table>
                        <Link className='secondary-content' to={`customer/${g.id}`}>
                            <i className='material-icons edit'>edit</i>
                        </Link>
                    </CollapsibleItem>
                )
            })
            )
        } else {
            customers = <div className="progress">
                <div className="indeterminate"></div>
            </div>
        }
        return (
            <div>
                <div className='spannHeaderContainer'>
                    <span className='showingJobsCustomer'>Showing ({customers.length})</span>
                    <span>
                        <form onSubmit={this.handleSendInvoiceMessage} className="col s12">
                            <button id='sendInvoiceMessage' ref='sendInvoiceMessage' aria-label="" style={getSearchButtonStyle()} tabIndex="0" disabled> <span>Send Message</span> </button>
                        </form>
                    </span>
                    <span>
                        <form onSubmit={(e) => this.handleMark('due', e)} className="col s12">
                            <button id='markAsDue' ref='markAsDue' aria-label="" style={getSearchButtonStyle()} tabIndex="0" disabled> <span>Mark as Due</span> </button>
                        </form>
                    </span>
                    <span>
                        <form onSubmit={(e) => this.handleMark('paid', e)} className="col s12">
                            <button id='markAsPaid' ref='markAsPaid' aria-label="" style={getSearchButtonStyle()} tabIndex="0" disabled> <span>Mark as paid</span> </button>
                        </form>
                    </span>
                    <div className='floatRight'>
                        <form onSubmit={this.handleSearch} className="col s12">
                            <input aria-invalid="false" id='searchCustomerName' style={getStylesSearch()} onChange={this.handleSearchChange} style={getStylesSearch()} className="MuiInputBase-input-28 MuiInput-input-13" placeholder="Search" type="text"/>
                        </form>
                    </div>

                </div>
                <div className='spannHeaderContainer'>
                    <label className='spannHeader'>
                        <input type="checkbox" id='select-all' ref='selectAll' className="filled-in" onChange={(e) => this.selectAllChange(e)}/>
                        <span></span>
                    </label>
                    <div className='spannHeader'>Customer Name</div>
                    <div className='spannHeader'>Customer Id</div>
                    <div className='spannHeader'>ApartmentNo</div>
                    <div className='spannHeader'>Apartment</div>
                    <div className='spannHeader'>Mobile</div>
                    <div className='spannHeader'>Status</div>
                </div>

                <div className='sectionRoot'>
                    <div className='dividerWidth'>
                        <div className="divider" style={getStyles()}></div>
                    </div>
                    <div className="section"  style={getSectionStyles()}>
                        <Collapsible>
                            {customers}
                        </Collapsible>
                    </div>
                </div>
            </div>
        )
    }
    return (<div>{Customers()}</div> )
}
}
const mapStateToProps = (state) => {
    return {
        customer: state.firestoreDocs.ordered.customers
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      updateCustomer: (selectedCustomers, status) => dispatch(updateCustomerDueAction(selectedCustomers, status))
    }
  }

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'customers' }
    ])
)(CustList)