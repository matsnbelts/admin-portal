import React from 'react'
import { Link } from 'react-router-dom'

import { Collapsible, CollapsibleItem } from 'react-materialize';
import './CustomerList.css'

class JobAssociateFilterItems extends React.Component {
  
    render() {
      const dateToNavigate = this.props.dateData
      console.log(dateToNavigate.getMonth() + 1);
      console.log(dateToNavigate.getFullYear());
      console.log(dateToNavigate.getDate());
      const showJobs = this.props.data.length > 0 ? this.props.data.map((job, index) => (
        <CollapsibleItem key={job.carId} header={
          <div>
          <div className='spann'>{job.carId ? job.carId: 'N/A'}</div>
          <div className='spann'>{job.customerId ? job.customerId: 'N/A'}</div>
          <div className='spann'>{job.associateName ? job.associateName: 'N/A'}</div>
          <div className='spann'>{job.serviceType ? job.serviceType: 'N/A'}</div>
        </div>} icon='filter_drama'>

        <table className='table'>
              <tbody className='custbody'>
              <tr className='custr'>
                <td className='custd'> Car Number </td>
                <td className='custd'> {job.carId} </td>
              </tr>
              <tr className='custr'>
                <td className='custd'> Customer Mobile </td>
                <td className='custd'> {job.customerId} </td>
              </tr>
              <tr className='custr'>
                <td className='custd'> Associate Mobile </td>
                <td className='custd'> {job.associateId} </td>
              </tr>
              <tr className='custr'>
                <td className='custd'> Associate Name </td>
                <td className='custd'> {job.associateName} </td>
              </tr>
              <tr className='custr'>
                <td className='custd'> Cleaning Status </td>
                <td className='custd'> {job.cleaningStatus} </td>
              </tr>
              <tr className='custr'>
                <td className='custd'> Customer Availability </td>
                <td className='custd'> {job.customerAvailability ? "Available": "Not Available"} </td>
              </tr>
              <tr className='custr'>
                <td className='custd'> Service Type </td>
                <td className='custd'> {job.serviceType} </td>
              </tr>
              <tr className='custr'>
                <td className='custd'> Associate Feedback </td>
                <td className='custd'> {job.associateFeedback} </td>
              </tr>
              <tr className='custr'>
                <td className='custd'> Customer Feedback </td>
                <td className='custd'> {job.customerFeedback} </td>
              </tr>
              </tbody>
            </table>
            {
              ( new Date(dateToNavigate).getDate() >= new Date().getDate() ) &&
              <Link className='secondary-content' to={`job/${job.carId}/${dateToNavigate}`}>
                <i className='material-icons edit'>edit</i>
              </Link>
            }
        </CollapsibleItem>
    )) : (
        <div>No Cars assigned yet</div>
    );
        return (
          <div className='collapsibleContainer'>
            <div className='itemsHeader'>
              <div className='spann'>Car Number</div>
              <div className='spann'>Customer Mobile</div>
              <div className='spann'>Associate Name</div>
              <div className='spann'>Service Type</div>
            </div>
            <Collapsible> 

              {/* {this.props.data.map((job) => {
                return (
                  // <div className="filter-item">{job.associateName}</div>
                );
              })} */}
              {showJobs}

              </Collapsible>
            </div>
          );
    }
}
export default JobAssociateFilterItems
