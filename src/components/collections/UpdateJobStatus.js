import React from 'react'
import { connect } from 'react-redux'
import { Container, Button, TextInput, Row, Switch } from 'react-materialize';
import { updateJobAction, getJobDetailsAction } from '../../store/actions/scheduleJobActions'

class UpdateJobStatus extends React.Component {
    constructor() {
        super();
        this.state = {
            serviceType: '',
            mobile: ''
        }
    }
    componentDidMount() {
        let { carId, dateToNavigate } = this.props.match.params
        console.log(this.props.match.params)
        this.props.getJob(carId, dateToNavigate)
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.getJobData !== prevProps.getJobData) {
            console.log('Job Action Data' + this.props.getJobData.action.job)
            const jobActionData = this.props.getJobData.action.job
            this.setState({
                ...this.state,
                serviceType: jobActionData.serviceType,
                mobile: jobActionData.associateId,
                // idProof: associateActionData.idProof,
                // doj: doj,
                // serviceArea: associateActionData.serviceArea,
                // email: associateActionData.email,
                // active: associateActionData.active,
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
    updateJobDetails = e => {
        e.preventDefault()
        this.props.updateJob(this.state, this.props.match.params.carId, this.props.match.params.dateToNavigate)
        this.props.history.push('/assign_jobs')
    }
    render() {
        return (
            <div>
                <div className='center'>
                    <h4>Update Job Status</h4>
                    <Container>
                        <Row>
                            <form onSubmit={this.updateJobDetails} className="col s12">
                                <Row>
                                    <TextInput required="" aria-required="true" className="input-field col s10" label="Cleaning Type" id="name" type="text" onChange={this.handleChange} value={this.state.serviceType} />
                                    <TextInput required="" aria-required="true" className="input-field col s10" label="Associate Mobile" id="mobile" type="text" onChange={this.handleChange} value={this.state.mobile} />
                                </Row>

                                {/* <Row>
                    <span className="col s4">Customer Availability</span>
                    <Switch className="col s6" onLabel="On" offLabel="Off" id="customerStatus" checked={this.state.active} onChange={this.handleAssociateSwitchChange} />
                </Row> */}
                                <Button className="#000000 black">Update Job</Button>
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
        getJob: (carId, dateToNavigate) => { dispatch(getJobDetailsAction(carId, dateToNavigate)) },
        updateJob: (updatedJob, carId, dateToNavigate) => { dispatch(updateJobAction(updatedJob, carId, dateToNavigate)) }
    }
}
const mapStateToProps = (state) => {
    console.log(state.jobs)
    return {
        getJobData: state.jobs
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(UpdateJobStatus)