import React from 'react'
import { Collapsible, CollapsibleItem } from 'react-materialize';
import './CustomerList.css'

class JobAssociateFilterItems extends React.Component {
  
    render() {
      const showJobs = this.props.data.length > 0 ? this.props.data.map((job, index) => (
        <CollapsibleItem key={job.carId} header={
          <div>
          <div className='spann'>{job.carId}</div>
          <div className='spann'>{job.customerId}</div>
          <div className='spann'>{job.associateName}</div>
        </div>} icon='filter_drama'>

        <table className='table'>
              <tbody>
              <tr className='tr'>
                <td className='td'> Car Number </td>
                <td className='td'> {job.carId} </td>
              </tr>
              <tr className='tr'>
                <td className='td'> Customer Mobile </td>
                <td className='td'> {job.customerId} </td>
              </tr>
              <tr className='tr'>
                <td className='td'> Associate Mobile </td>
                <td className='td'> {job.associateId} </td>
              </tr>
              <tr className='tr'>
                <td className='td'> Associate Name </td>
                <td className='td'> {job.associateName} </td>
              </tr>
              <tr className='tr'>
                <td className='td'> Cleaning Status </td>
                <td className='td'> {job.cleaningStatus} </td>
              </tr>
              <tr className='tr'>
                <td className='td'> Customer Availability </td>
                <td className='td'> {job.customerAvailability ? "Available": "Not Available"} </td>
              </tr>
              <tr className='tr'>
                <td className='td'> Service Type </td>
                <td className='td'> {job.serviceType} </td>
              </tr>
              <tr className='tr'>
                <td className='td'> Associate Feedback </td>
                <td className='td'> {job.associateFeedback} </td>
              </tr>
              <tr className='tr'>
                <td className='td'> Customer Feedback </td>
                <td className='td'> {job.customerFeedback} </td>
              </tr>
              </tbody>
            </table>
        </CollapsibleItem>
    )) : (
        <div>No Cars assigned yet</div>
    );
        return (
          <Collapsible> 

            {/* {this.props.data.map((job) => {
              return (
                // <div className="filter-item">{job.associateName}</div>
              );
            })} */}
            {showJobs}

            </Collapsible>
          );
    }
}
export default JobAssociateFilterItems
