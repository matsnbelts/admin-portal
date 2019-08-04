import React from 'react'
import { connect } from 'react-redux'
import JobAssociateFilterForm from './JobAssociateFilterForm'
import { Container, Button, TextInput} from 'react-materialize';
import {getJobsAction, scheduleJobAction} from '../../store/actions/scheduleJobActions'

class AssignJobs extends React.Component {
    constructor() {
        super();
        this.state = {
            jobs: [],
            currentDate: new Date(),
            showCollapsible: false,
        }
        // this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        //this.props.getJobs(this.state.currentDate);
        // var elems = document.querySelectorAll('.datepicker');
        // console.log(this.currentDate);
        // let ee;
        // M.Datepicker.init(elems, {
        //     autoClose: true,
        //     onSelect: function(e) {
        //         ee = e
        //     }
        // });
        // console.log(ee);
    }

    componentDidUpdate(prevProps) {
        if (this.props.getJobsData !== prevProps.getJobsData) {
            console.log('Component Did Update')
            const jobActionData = this.props.getJobsData.action.jobs
            this.setState({
                ...this.state,
                jobs: jobActionData,
                showCollapsible: true
            });
            // jobActionData.map((job) => {
            //     console.log(job.carId);
            // })
        }
    }
    handleDateChange = (e) => {
        console.log(e.target.value)
        this.setState({
            ...this.state,
            showCollapsible: false,
            currentDate: new Date(e.target.value)
        }, function() {
            console.log(this.state.currentDate.getMonth() + 1);
            console.log(this.state.currentDate.getFullYear());
            console.log(this.state.currentDate.getDate());
        });
    }
    handleGetJobButton = () => {
        this.props.getJobs(this.state.currentDate);
        this.setState({
            ...this.state,
        });
    }
    startJobScheduler = () => {
        console.log(this.state.currentDate);
        this.props.scheduleJob(this.state.currentDate);
        this.props.getJobs(this.state.currentDate);

        this.setState({
            ...this.state,
            showCollapsible: true,
        });
        //this.props.history.push('/assign_jobs');
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
        console.log(year + "-" + month + "-" + day)
        return year + "-" + month + "-" + day;
    }
    render() {
        console.log(this.state.currentDate + " ;; " + new Date('yyyy-MM-dd'))
        const showCollapsible = this.state.showCollapsible && (
            <div>
                {/* <div className="section">
                            <JobAssociateFilterForm parentState={this.state} />
                        </div> */}
                    <JobAssociateFilterForm parentState={this.state} />

                    {/* {showJobs} */}
            </div>
            );
        return (
            <div>
                <div className='center'>
                    <h4>Job Details</h4>
                    <Container>
                        <TextInput label="Pick Date" id="jobdate" type="date" value={this.showCurrentDate()} onChange={(e) => this.handleDateChange(e)} />
                        {
                            ( this.state.currentDate.getDate() <= new Date().getDate() &&
                            this.state.currentDate.getMonth() <= new Date().getMonth() &&
                            this.state.currentDate.getFullYear() <= new Date().getFullYear() ) && 
                            <Button className="col s2 #000000 black" onClick={this.handleGetJobButton}>Fetch Job History</Button>
                        }
                        {
                            ( this.state.currentDate.getDate() >= new Date().getDate() &&
                            this.state.currentDate.getMonth() >= new Date().getMonth() &&
                            this.state.currentDate.getFullYear() >= new Date().getFullYear() ) &&
                            <Button className="col s2 #000000 black" onClick={this.startJobScheduler}>Start Job Scheduler</Button>
                        }
                        <div className="section">   </div>
                        <div className="divider"></div>
                        <div className="section">
                            {showCollapsible}
                        </div>
                        
                    </Container >
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    console.log('dissssssss');
    return {
        getJobs: (currentDate) => { dispatch(getJobsAction(currentDate)) },
        scheduleJob: (currentDate) => { dispatch(scheduleJobAction(currentDate)) }
    }
}
const mapStateToProps = (state) => {
    return {
        getJobsData: state.jobs
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AssignJobs)
