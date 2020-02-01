import React from 'react'
import JobAssociateFilterOptions from './JobAssociateFilterOptions'
import JobApartmentFilterOptions from './JobApartmentFilterOptions'
import JobCleaningFilterOptions from './JobCleaningFilterOptions'
import JobServiceTypeFilterOptions from './JobServiceTypeFilterOptions'

import JobAssociateFilterItems from './JobAssociateFilterItems'

class JobAssociateFilterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            parentState: this.props.parentState,
            associate: '',
            apartment: '',
            serviceType: 'All',
            cleaningStatus: 'All',
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
    filterApartmentItems =(val) => {
        this.setState({apartment: val});
    }
    filterCleaningItems =(val) => {
        this.setState({cleaningStatus: val});
    }
    filterServiceItems =(val) => {
        this.setState({serviceType: val});
    }
    render() {
        let filteredJobItems = this.props.parentState.jobs;
        if (this.state.associate) {
            filteredJobItems = filteredJobItems.filter((job) => {
                return job.associateName === this.state.associate;
              });
        }
        if (this.state.apartment) {
            filteredJobItems = filteredJobItems.filter((job) => {
                return job.customerApartment === this.state.apartment;
              });
        }
        if (this.state.cleaningStatus !== 'All') {
            filteredJobItems = filteredJobItems.filter((job) => {
                return job.cleaningStatus === this.state.cleaningStatus;
              });
        }
        if (this.state.serviceType !== 'All') {
            filteredJobItems = filteredJobItems.filter((job) => {
                return job.serviceType === this.state.serviceType;
              });
        }
        let associateArray = this.props.parentState.jobs.map((job) => {return job.associateName});
        associateArray.unshift('');
        associateArray = new Set(associateArray);

        let apartmentArray = this.props.parentState.jobs.map((job) => {return job.customerApartment});
        apartmentArray.unshift('');
        apartmentArray = new Set(apartmentArray);

        let cleaningArray = new Set(['NotCleaned', 'Cleaned', 'All']);
        let serviceTypeArray = new Set(['Exterior', 'Interior', 'All']);

        return (
            <div className="jobContainer">
              <div className='jobFilterBox'>
                <span className='showingJobs'>{'Showing Jobs (' + filteredJobItems.length + ')'}</span>
                <JobAssociateFilterOptions 
                    associate={this.state.associate}
                    associateOptions={associateArray}
                    changeOption={this.filterItems} />
                <JobApartmentFilterOptions 
                    apartment={this.state.apartment}
                    apartmentOptions={apartmentArray}
                    changeOption={this.filterApartmentItems} />
                <JobCleaningFilterOptions 
                    cleaning={this.state.cleaningStatus}
                    cleaningOptions={cleaningArray}
                    changeOption={this.filterCleaningItems} />
                <JobServiceTypeFilterOptions 
                    service={this.state.serviceType}
                    serviceOptions={serviceTypeArray}
                    changeOption={this.filterServiceItems} />
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