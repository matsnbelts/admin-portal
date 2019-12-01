import React from 'react'
import { connect } from 'react-redux'
import { Container, Button, TextInput} from 'react-materialize';
import AddCustomer from './AddCustomer';
import M from "materialize-css";
import { checkCustomerAction } from '../../store/actions/customerActions'

class CreateCustomer extends React.Component {
    constructor() {
        super();
        this.state = {
            mobile: '',
            customer_exists: true,
            verified: false
        }
        // this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate(prevProps) {
        console.log('Component Did Update')
        console.log(this.props.customer_exists)
        if (this.props.customer_exists !== prevProps.customer_exists) {
            this.setState({
                ...this.state,
                customer_exists: this.props.customer_exists
            });
        }
    }

    handleChange = (e) => {
        console.log(e.target.id + " :: " + e.target.value)
        this.setState({
          [e.target.id]: e.target.value
        })
      }

    handleMobileAdd = (e) => {
        e.preventDefault();
        console.log(this.state.mobile)
        if (this.state.mobile !== '') {
            this.props.checkCustomerExists(this.state.mobile);
            this.setState({
                ...this.state,
                verified: true
            });
        }
    }

    render() {
        console.log(this.state.customer_exists + " :::: " + this.state.verified)
        const showAddCustomer = (!this.state.customer_exists && this.state.verified) && (
            <div>
                <AddCustomer mobilePropagated={this.state.mobile} />
            </div>
            ) ||
            (this.state.customer_exists && this.state.verified) && (
                <div>
                    <div>Customer exists already</div>
                </div>
            )
        return (
            <div>
                <div className='center'>
                    <h4>Create Customer</h4>
                    <Container>
                        <form onSubmit={this.handleMobileAdd} className="col s12">
                            <TextInput style={(this.state.mobile === '' || this.state.customer_exists) ? {borderColor: 'red'} : {}} required="" aria-required="true" className="input-field col s10" label="Mobile" id="mobile" type="text" onChange={this.handleChange} />
                            <Button className="#000000 black">Next</Button>
                        </form>
                        <div className="divider"></div>
                        <div className="section">
                            {showAddCustomer}
                        </div>
                    </Container >
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkCustomerExists: (customerId) => { dispatch(checkCustomerAction(customerId)) },
    }
}
const mapStateToProps = (state) => {
    if(state.customer.action) {
        console.log(state.customer.action.customer_exists)
        return {
            customer_exists: state.customer.action.customer_exists
        }
    } else {
        return {
            customer_exists: true
        }
    }

    
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateCustomer)
