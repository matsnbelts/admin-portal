import React from 'react'
import { connect } from 'react-redux'
import JobAssociateFilterForm from './JobAssociateFilterForm'
import { Container, Button, TextInput, Modal} from 'react-materialize';
import {getJobsAction, scheduleJobAction, reassignJobAction} from '../../store/actions/scheduleJobActions'
import M from "materialize-css";
import './AssignJobs.css'

class AssignJobs extends React.Component {
    constructor() {
        super();
        this.toggle = this.toggle.bind(this);
        this.state = {
            jobs: [],
            associate_from: '',
            currentDate: new Date(),
            showCollapsible: false,
            popoverOpen: false,
            triggerProgress: false,
            fetchJobClicked: false
        }
        // this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {

    }

    componentDidUpdate(prevProps) {
        if (this.props.getJobsData !== prevProps.getJobsData) {
            const jobActionData = this.props.getJobsData.action.jobs
            this.setState({
                ...this.state,
                jobs: jobActionData,
                showCollapsible: true,
                triggerProgress: false
            });
        }
    }

    toggle() {
        this.setState({
          popoverOpen: !this.state.popoverOpen
        });
    }

    handleDateChange = (e) => {
        console.log(e.target.value)
        this.setState({
            ...this.state,
            showCollapsible: false,
            triggerProgress: false,
            currentDate: new Date(e.target.value)
        }, function() {
        });
    }
    handleGetJobButton = () => {
        this.props.getJobs(this.state.currentDate);
        this.setState({
            ...this.state,
            triggerProgress: true,
            fetchJobClicked: true
        });
    }
    startJobScheduler = () => {
        this.props.scheduleJob(this.state.currentDate);

        this.setState({
            ...this.state,
            showCollapsible: true,
            triggerProgress: true,
            fetchJobClicked: false
        });
        this.props.history.push('/assign_jobs');
        //window.location.reload(); 
    }
    showCurrentDate = () => {
        let todayTime = this.state.currentDate;
        let month = todayTime.getMonth() + 1;
        let day = todayTime.getDate();
        if(month < 10) {
            month = '0' + month
        }
        if(day < 10) {
            day = '0' + day
        }
        let year = todayTime.getFullYear();
        return year + "-" + month + "-" + day;
    }

    handleFromAssociateChange = (e) => {
        e.preventDefault();
        this.setState({
            ...this.state,
            associate_from: e.target.value
        })
    }

    handleToAssociateChange = (e) => {
        e.preventDefault();
        this.setState({
            ...this.state,
            associate_to: e.target.value
        })
    }

    createOptions = (options) => {
        let opts = []
        options.forEach((key,value, set) => {
            if(typeof key == 'string')
                opts.push(<option key={key} value={key}>{key}</option>);
        }
        );
        return opts
    }

    createOptionsTo = (options) => {
        let opts = []
        options.forEach((key,value, set) => {
            if(typeof key == 'string' && key !== this.state.associate_from)
                opts.push(<option key={key} value={key}>{key}</option>);
        }
        );
        console.log(opts)
        return opts
    }

    reassignButton = () => {
        let associateFromId;
        let associateToId;
        this.state.jobs.map((job) => {
            if(job.associateName === this.state.associate_from) {
                associateFromId = job.associateId;
            }
            if(job.associateName === this.state.associate_to) {
                associateToId = job.associateId;
            }
        });
        console.log(associateFromId + " :: " + associateToId);
        this.props.reassignJob(this.state.currentDate, associateFromId, associateToId);
        console.log(this.props.reassigned);
        M.toast({html: 'Reassigned successfully', completeCallback: this.handleGetJobButton});
    }

    render() {
        const showCollapsible = () => {
            if(this.state.showCollapsible && this.state.jobs) {
                return <div>
                            <JobAssociateFilterForm parentState={this.state} />
                        </div>
            } else if(this.state.triggerProgress){
                return <div className="progress">
                    <div className="indeterminate"></div>
                </div>
            }
        }
        const startJob = () => {
            if( this.state.currentDate.getDate() >= new Date().getDate() &&
            this.state.currentDate.getMonth() >= new Date().getMonth() &&
            this.state.currentDate.getFullYear() >= new Date().getFullYear() ) {
                let associateArray = this.state.jobs.map((job) => {return job.associateName});
                associateArray.unshift('');
                associateArray = new Set(associateArray);
                return <div className='jobButtonsContainer'>
                {this.state.fetchJobClicked && 
                    <Button className="startJob" onClick={this.startJobScheduler}>Start Job Scheduler</Button>
                }
                {associateArray.size > 1 && 
                    <Modal
                    header='Reassign Associate'
                    trigger={<Button className="reassignAssociate" >Reassign Associate</Button>}
                    >
                        <label>From</label>
                        <div className="input-field col s6">
                            <select className='associate-filter' id="associate-from" value={this.state.associate_from} onChange={(e) => this.handleFromAssociateChange(e)}>
                                {this.createOptions(associateArray)}
                            </select>
                        </div>
                        <label>To</label>
                        <div className="input-field col s6">
                            <select className='associate-filter' id="associate-to" value={this.state.associate_to} onChange={(e) => this.handleToAssociateChange(e)}>
                                {this.createOptionsTo(associateArray)}
                            </select>
                            </div>
                            <Button className="col s2 #000000 black" onClick={this.reassignButton}>Reassign</Button>
                        </Modal>
                }
                </div>
            }
        }
        return (
            <div>
                <div className='center'>
                    <h4>Job Details</h4>
                    <Container>
                        <div className='fetchJob'>
                        <TextInput label="Pick Date" id="jobdate" type="date" value={this.showCurrentDate()} onChange={(e) => this.handleDateChange(e)} />
                        {
                            ( this.state.currentDate.getDate() <= new Date().getDate() &&
                            this.state.currentDate.getMonth() <= new Date().getMonth() &&
                            this.state.currentDate.getFullYear() <= new Date().getFullYear() ) && 
                            <Button className="col s2 #000000 black" onClick={this.handleGetJobButton}>Fetch Job History</Button>
                        }
                        </div>
                        <div className='jobButtons'>
                            {this.state.jobs && startJob()}
                        </div>
                        {/* <div className="section">  </div> */}
                        <div className="divider"></div>
                        <div className="section">
                            {showCollapsible()}
                        </div>
                        
                    </Container >
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getJobs: (currentDate) => { dispatch(getJobsAction(currentDate)) },
        scheduleJob: (currentDate) => { dispatch(scheduleJobAction(currentDate)) },
        reassignJob: (currentDate, associateFrom, associateTo) => { dispatch(reassignJobAction(currentDate, associateFrom, associateTo)) }
    }
}
const mapStateToProps = (state) => {
    return {
        getJobsData: state.jobs,
        reassigned: state.reassigned
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AssignJobs)
