import React from 'react'
import JobAssociateFilterOptions from './JobAssociateFilterOptions'
import JobAssociateFilterItems from './JobAssociateFilterItems'

class JobAssociateFilterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            parentState: this.props.parentState,
            associate: '',
            multiple: false
        }
        // this.handleChange = this.handleChange.bind(this);
    }
    handleChecked = (e) => {
        this.setState({multiple: e.target.value});
    }
    filterItems =(val) => {
        this.setState({associate: val});
    }
    render() {
        let filteredJobItems = this.props.parentState.jobs;
        let filterValue = this.state.associate;
        if (filterValue) {
            filteredJobItems = filteredJobItems.filter((job) => {
                return job.associateName === filterValue;
              });
        }
        let associateArray = this.props.parentState.jobs.map((job) => {return job.associateName});
        associateArray.unshift('');
        associateArray = new Set(associateArray);

        return (
            <div className="jobContainer">
              <div className='jobFilterBox'>
                <span className='showingJobs'>{'Showing Jobs (' + filteredJobItems.length + ')'}</span>
                <JobAssociateFilterOptions 
                    associate={this.state.associate}
                    associateOptions={associateArray}
                    changeOption={this.filterItems} />
              </div>
              <div className="filter-form">
                <div className="divider"></div>
                <JobAssociateFilterItems data={filteredJobItems} dateData={this.props.parentState.currentDate}/>
              </div>
            </div>
          )
    }
}
export default JobAssociateFilterForm