import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Collapsible, CollapsibleItem, Button, Modal, TextInput, Textarea } from 'react-materialize'
import './CustomerList.css'
import sendMsgTopic from './SendFCMTopic'
import { updateCustomerDueAction, deleteCustomerAction } from '../../store/actions/customerActions'
import FilterPaidOptions from './FilterPaidOptions'
import FilterActiveOptions from './FilterActiveOptions'
import * as FormData from 'form-data';
import M from "materialize-css";

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
            paidStatus: 'All',
            activeStatus: 'All',
            generateInvoiceDone: false,
            batchUpdated: false,
            csvfile: undefined,
            invoiceDate: undefined,
            dueDate: undefined,
            invoiceDate: undefined
        }
    }

    componentDidMount() {
        console.log('Component Did Mount')
    }

    componentDidUpdate(prevProps) {
        console.log('Component Did Update')
        if(this.state.generateInvoiceDone) {
            this.setState({
                ...this.state,
                generateInvoiceDone: false
            })
            this.props.history.push('/')
        }
        // if(this.props )
        //     console.log('Component Did Update' + this.props.batchUpdated + " :: " + this.prevProps.batchUpdated)

    }

    handleSearch = (e) => {
        e.preventDefault()
    }

    handleInvoiceRedirectionAction = () => {
        this.setState({
            ...this.state,
            generateInvoiceDone: true
        })
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

    sendMessage = (e) => {
        e.preventDefault()
        console.log(this.selectedCustomers.keys())
        console.log(this.state.msgTitle);
        console.log(this.state.msgBody);

        this.selectedCustomers.forEach((value, key, map) => {
            let topic = 'msg-' + key.substring(10)
            console.log('hiiiii: ' + topic)
            let postData = {
                "notification": {
                    "title": this.state.msgTitle,
                    "body": this.state.msgBody,
                    "image": 'https://firebasestorage.googleapis.com/v0/b/matsnbelts.appspot.com/o/11-10-2019%2FTN09IU8393.jpg?alt=media&token=9cf17318-091e-4f05-bd8b-9aeaf4a416ad'
                },
                "to": "/topics/" + topic
            }
            sendMsgTopic(postData)
        });
    }

    publishInvoice = async (e) => {
        e.preventDefault()
        const form = new FormData();
        form.append('file', this.state.csvfile);
        form.append('invoice-date', this.state.invoiceDate);
        form.append('due-date', this.state.dueDate);
        form.append('output', this.state.invoiceOutput);
        form.append('invoice-month', this.state.invMonth);
        form.append('send-mail', false);
        console.log('hiiiii: ' + this.state.invoiceOutput + " " + this.state.dueDate
        + " : " + this.state.invoiceDate + " : " + this.state.csvfile)

        const response = await fetch('http://localhost:8080/admin/generate/', {
            method: 'POST',
            body: form,
        });
        const data = await response.json();
        if(data.status && data.status !== 200) {
            M.toast({html: 'Error Generating Invoice ' + data.message, completeCallback: this.handleInvoiceRedirectionAction});
        } else {
            M.toast({html: 'Invoice Generated successfully ' + data, completeCallback: this.handleInvoiceRedirectionAction});
        }
        this.setState(
            { 
                ...this.state,
                invoiceDate: undefined,
                dueDate: undefined,
                invoiceOutput: undefined 
            });

    }

    selectChange = (e) => {
        console.log(e.target.checked + " : id: " + e.target.id)
        if (!e.target.checked) {
            this.selectedCustomers.delete(e.target.id)
        } else {
            this.selectedCustomers.set(e.target.id, e.target.checked)
        }
        if (this.selectedCustomers.size > 0) {
            this.enableActionButtons()
        } else {
            this.disableActionButtons()
        }
    }

    disableActionButtons = () => {
        this.refs.sendInvoiceMessage.disabled = true
        this.refs.sendInvoiceMessage.style['cursor'] = 'not-allowed'
        this.refs.sendMessage.disabled = true
        this.refs.sendMessage.style['cursor'] = 'not-allowed'
        this.refs.markAsPaid.disabled = true
        this.refs.markAsPaid.style['cursor'] = 'not-allowed'
        this.refs.markAsDue.disabled = true
        this.refs.markAsDue.style['cursor'] = 'not-allowed'
        this.refs.deleteCus.disabled = true
        this.refs.deleteCus.style['cursor'] = 'not-allowed'
    }

    enableActionButtons = () => {
        this.refs.sendInvoiceMessage.disabled = false
        this.refs.sendInvoiceMessage.style['cursor'] = 'pointer'
        this.refs.sendMessage.disabled = false
        this.refs.sendMessage.style['cursor'] = 'pointer'
        this.refs.markAsPaid.disabled = false
        this.refs.markAsPaid.style['cursor'] = 'pointer'
        this.refs.markAsDue.disabled = false
        this.refs.markAsDue.style['cursor'] = 'pointer'
        this.refs.deleteCus.disabled = false
        this.refs.deleteCus.style['cursor'] = 'pointer'
    }

    selectAllChange = (e) => {
        console.log(e.target.checked)
        this.selectAll = e.target.checked
        this.filteredCustomers.map(g => {
            this.refs['select-' + g.id].checked = this.refs.selectAll.checked
            if (this.refs['select-' + g.id].checked) {
                this.selectedCustomers.set('select-' + g.id, this.refs['select-' + g.id].checked)
            } else {
                this.selectedCustomers.delete('select-' + g.id)
            }
        })
        if (this.selectedCustomers.size > 0) {
            this.enableActionButtons()
        } else {
            this.disableActionButtons()
        }
    }

    handleInputFileChange = event => {
        this.setState({
            csvfile: event.target.files[0]
        });
    };

    handleMark = (status, e) => {
        e.preventDefault()
        this.props.updateCustomer(this.selectedCustomers, status)
        this.selectedCustomers = new Map();
        this.filteredCustomers.map(g => {
            this.refs['select-' + g.id].checked = false
        })
        this.refs.selectAll.checked = false
        this.disableActionButtons()
        // this.props.history.push('/view_customers')
    }

    handleDelete= (status, e) => {
        e.preventDefault()
        this.props.deleteCustomer(this.selectedCustomers, status)
        this.selectedCustomers = new Map();
        this.filteredCustomers.map(g => {
            this.refs['select-' + g.id].checked = false
        })
        this.refs.selectAll.checked = false
        this.disableActionButtons()
        // this.props.history.push('/view_customers')
    }

    filterPaidItems = (val) => {
        this.setState({ paidStatus: val });
    }

    filterActiveItems = (val) => {
        this.setState({ activeStatus: val });
    }

    handleInvoiceFieldChange = (e) => {
        console.log(e.target.id + " : " + e.target.value)
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        const select_style = {
            'display': 'inline-block',
            'color': 'white',
            'backgroundColor': '#000000',
            'width': '20%'
        }

        const Cars = (props) => {
            if (props)
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

        const sendInvoiceMessageElement = () => {
            return <span className='customerActionButtons'>
                <Modal
                    id='modalInvoice'
                    header='Invoice Generation'
                    trigger={<button id='sendInvoiceMessage' ref='sendInvoiceMessage' aria-label="" style={getSearchButtonStyle()}> <span>Publish Invoice</span> </button>}
                >
                    <select style={select_style} required aria-required="true" id={"invMonth"} onChange={this.handleInvoiceFieldChange}>
                            <option value="" disabled >Month</option>
                            <option value="January">January</option>
                            <option value="February">February</option>
                            <option value="March">March</option>
                            <option value="April">April</option>
                            <option value="May">May</option>
                            <option value="June">June</option>
                            <option value="July">July</option>
                            <option value="August">August</option>
                            <option value="September">September</option>
                            <option value="October">October</option>
                            <option value="November">November</option>
                            <option value="December">December</option>
                        </select>
                    <input
                        className="csv-input"
                        type="file"
                        ref={input => {
                            this.filesInput = input;
                        }}
                        name="file"
                        placeholder={null}
                        onChange={this.handleInputFileChange}
                    />
                    <TextInput style={(!this.state.invoiceDate) ? {borderColor: 'red'} : {}} required="" aria-required="true" className="input-field col s10" label="Invoice Date(01-Oct-2019)" id="invoiceDate" type="text" onChange={this.handleInvoiceFieldChange}/>
                    <TextInput style={(!this.state.dueDate) ? {borderColor: 'red'} : {}} required="" aria-required="true" className="input-field col s10" label="Due Date(01-Oct-2019)" id="dueDate" type="text"  onChange={this.handleInvoiceFieldChange}/>
                    <TextInput style={(!this.state.invoiceOutput) ? {borderColor: 'red'} : {}} required="" aria-required="true" className="input-field col s10" label="Output Folder(C:\\Users\john\Desktop\invoices)" id="invoiceOutput" type="text"  onChange={this.handleInvoiceFieldChange}/>

                    <Button className="col s2 #000000 black" onClick={this.publishInvoice}>Publish</Button>
                </Modal>
            </span>
        }

        const sendMessageElement = () => {
            return <span className='customerActionButtons'>
                <Modal
                    header='Send Message to Customers'
                    trigger={<button id='sendMessage' ref='sendMessage' aria-label="" style={getSearchButtonStyle()}> <span>Send Message</span> </button>}
                >
                    <TextInput required="" aria-required="true" className="input-field col s10" label="Title" id="msgTitle" ref="msgTitle" type="text" onChange={this.handleInvoiceFieldChange}/>
                    <Textarea required="" aria-required="true" className="input-field col s10" label="Message" id="msgBody" ref="msgBody" type="text" onChange={this.handleInvoiceFieldChange}/>

                    <Button className="col s2 #000000 black" onClick={this.sendMessage}>Send</Button>
                </Modal>
            </span>
        }

        const Customers = () => {
            const { customer } = this.props;
            let paidArray = new Set(['Not Paid', 'Paid', 'All']);
            let activeArray = new Set(['Not Active', 'Active', 'All']);
            let customers;
            if (customer) {
                if (this.state.searchCustomerName !== 'all#') {
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
                if (this.state.paidStatus !== 'All') {
                    this.filteredCustomers = this.filteredCustomers.filter((c) => {
                        return c.paid === (this.state.paidStatus === 'Paid');
                    });
                }
                if (this.state.activeStatus !== 'All') {
                    this.filteredCustomers = this.filteredCustomers.filter((c) => {
                        return c.active === (this.state.activeStatus === 'Active');
                    });
                }
                customers = (this.filteredCustomers.map(g => {
                    return (
                        <CollapsibleItem key={g.name + " " + g.id} header={
                            <div>
                                <label className='spann'>
                                    <input type="checkbox" id={'select-' + g.id} ref={'select-' + g.id} onChange={(e) => this.selectChange(e)} className="filled-in" />
                                    <span></span>
                                </label>
                                {/* <div className='spann'>
            <input type="button" id="myBtn" onClick={this.startJobScheduler} value="..."></input>
            </div> */}
                                <div className='spann'>{g.name}</div>
                                <div className='spann'>{g.customerId ? g.customerId : 'N/A'}</div>
                                <div className='spann'>{g.apartmentNo ? g.apartmentNo : 'N/A'}</div>
                                <div className='spann'>{g.apartment ? g.apartment : 'N/A'}</div>
                                <div className='spann'>{g.id ? g.id : 'N/A'}</div>
                                <div className='spann'>{(g.active) ? "Active" : "Not Active"}</div>
                                <div className='spann'>{(g.paid) ? "Paid" : "Not Paid"}</div>
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
                        {sendMessageElement()}
                        {sendInvoiceMessageElement()}
                        <span className='customerActionButtons'>
                            <form onSubmit={(e) => this.handleMark('due', e)} className="col s12">
                                <button id='markAsDue' ref='markAsDue' aria-label="" style={getSearchButtonStyle()} tabIndex="0" disabled> <span>Mark as Due</span> </button>
                            </form>
                        </span>
                        <span className='customerActionButtons'>
                            <form onSubmit={(e) => this.handleMark('paid', e)} className="col s12">
                                <button id='markAsPaid' ref='markAsPaid' aria-label="" style={getSearchButtonStyle()} tabIndex="0" disabled> <span>Mark as paid</span> </button>
                            </form>
                        </span>
                        <span className='customerActionButtons'>
                            <form onSubmit={(e) => this.handleDelete('delete', e)} className="col s12">
                                <button id='deleteCus' ref='deleteCus' aria-label="" style={getSearchButtonStyle()} tabIndex="0" disabled> <span>Remove Customer</span> </button>
                            </form>
                        </span>
                        <div className='floatRight'>
                            <form onSubmit={this.handleSearch} className="col s12">
                                <input aria-invalid="false" id='searchCustomerName' onChange={this.handleSearchChange} style={getStylesSearch()} className="MuiInputBase-input-28 MuiInput-input-13" placeholder="Search" type="text" />
                            </form>
                        </div>
                    </div>
                    <div className='custFilterBox'>
                        <FilterPaidOptions
                            paid={this.state.paidStatus}
                            paidOptions={paidArray}
                            changeOption={this.filterPaidItems} />
                        <FilterActiveOptions
                            active={this.state.activeStatus}
                            activeOptions={activeArray}
                            changeOption={this.filterActiveItems} />
                    </div>
                    <div className='spannHeaderContainer'>
                        <label className='spannHeader'>
                            <input type="checkbox" id='select-all' ref='selectAll' className="filled-in" onChange={(e) => this.selectAllChange(e)} />
                            <span></span>
                        </label>
                        <div className='spannHeader'>Customer Name</div>
                        <div className='spannHeader'>Customer Id</div>
                        <div className='spannHeader'>ApartmentNo</div>
                        <div className='spannHeader'>Apartment</div>
                        <div className='spannHeader'>Mobile</div>
                        <div className='spannHeader'>Status</div>
                        <div className='spannHeader'>Paid Status</div>
                    </div>

                    <div className='sectionRoot'>
                        <div className='dividerWidth'>
                            <div className="divider" style={getStyles()}></div>
                        </div>
                        <div className="section" style={getSectionStyles()}>
                            <Collapsible>
                                {customers}
                            </Collapsible>
                        </div>
                    </div>
                </div>
            )
        }
        return (<div>{Customers()}</div>)
    }
}
const mapStateToProps = (state) => {
    return {
        customer: state.firestoreDocs.ordered.customers,
        batchUpdated: (state.customer.batchUpdated) ? state.customer.batchUpdated : false
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCustomer: (selectedCustomers, status) => dispatch(updateCustomerDueAction(selectedCustomers, status)),
        deleteCustomer: (selectedCustomers, status) => dispatch(deleteCustomerAction(selectedCustomers))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'customers' }
    ])
)(CustList)