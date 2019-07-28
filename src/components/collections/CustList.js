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