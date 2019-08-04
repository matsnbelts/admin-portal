import React from 'react'
import { connect } from 'react-redux'
import { Container, Button, TextInput, Row, Switch } from 'react-materialize';
import { getAssociateAction, updateAssociateAction } from '../../store/actions/associateActions'

class UpdateSingleAssociate extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            mobile: '',
            idProof: '',
            serviceArea: '',
            email: '',
            submitted: false,
            active: true
        }
    }
    componentDidMount() {
        let { id } = this.props.match.params
        this.props.getAssociate(id)
    }
    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.getAssociateData !== prevProps.getAssociateData) {
            console.log('Associate Action Data' + this.props.getAssociateData.action.associate)
            const associateActionData = this.props.getAssociateData.action.associate
            const doj = (associateActionData.doj) ? associateActionData.doj.toDate().toDateString() : ""
            this.setState({
                ...this.state,
                name: associateActionData.name,
                mobile: associateActionData.mobile,
                idProof: associateActionData.idProof,
                doj: doj,
                serviceArea: associateActionData.serviceArea,
                email: associateActionData.email,
                active: associateActionData.active,
            }, function () {
                console.log(this.state)
            })
        }
    }

handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
}
handleAssociateSwitchChange = (e) => {
    this.setState({
        ...this.state,
        active: !this.state.active
    })
}
updateAssociate = e => {
    e.preventDefault()
    if (this.state.mobile !== '' && this.state.name !== '' && this.state.doj !== '')
        this.props.updateAssociate(this.state, this.props.match.params.id)
    this.props.history.push('/view_associates')
}

render() {
return (         
    <div>
        <div className='center'>
            <h4>Update Associate Details</h4>
            <Container>
    <Row>
        <form onSubmit={this.updateAssociate} className="col s12">
            <Row>
                <TextInput required="" aria-required="true" className="input-field col s10" label="Name" id="name" type="text" onChange={this.handleChange} value={this.state.name} />
                <TextInput required="" aria-required="true" className="input-field col s10" label="Mobile" id="mobile" type="text" onChange={this.handleChange} value={this.state.mobile} />
            </Row>
            <Row>
                <TextInput required="" aria-required="true" className="input-field col s10" label="ID Proof" id="idProof" type="text" onChange={this.handleChange}  value={this.state.idProof} />
                <TextInput required="" aria-required="true" className="input-field col s10" label="Service Area" id="serviceArea" type="text" onChange={this.handleChange}  value={this.state.serviceArea} />
            </Row>
            <Row>
                <TextInput className="input-field col s12" label="Date of Join" id="doj" type="date" value={(this.state.doj) ? new Date(new Date(this.state.doj) - (new Date()).getTimezoneOffset() * 60000).toISOString().substr(0, 10) : ""} onChange={this.handleChange} />
                <TextInput className="input-field col s12" label="Email" id="email" type="text" onChange={this.handleChange} value={this.state.email} />
            </Row>
            <Row>
                <span className="col s4">Associate Status</span>
                <Switch className="col s6" onLabel="On" offLabel="Off" id="customerStatus" checked={this.state.active} onChange={this.handleAssociateSwitchChange} />
            </Row>
            <Button className="#000000 black">Update Associate</Button>
        </form>
    </Row>
    {this.state.submitted &&
        <div>Updated Associate details successfully</div>
    }
</Container >
        </div>
    </div>
)
}
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAssociate: (id) => { dispatch(getAssociateAction(id)) },
        updateAssociate: (updatedAssociate, id) => { dispatch(updateAssociateAction(updatedAssociate, id)) }
    }
}
const mapStateToProps = (state) => {
    return {
        getAssociateData: state.associate
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UpdateSingleAssociate)