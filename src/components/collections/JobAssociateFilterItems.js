import React from 'react'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import { Collapsible, CollapsibleItem } from 'react-materialize';
import './CustomerList.css'
import moment from 'moment';

class JobAssociateFilterItems extends React.Component {
  
    render() {
      const getImgUrl = async (imgPath) => {
        let storage = firebase.storage();
        var gsReference = storage.refFromURL('gs://matsnbelts.appspot.com/03-10-2019/TN11EE2221.jpg')
        let iurl = '';
        await gsReference.getDownloadURL().then((url) => {
          console.log(<img src={url} alt="Smiley face" height="200" width="200" />)
          iurl = <img src={url} alt="Smiley face" height="200" width="200" />
          return iurl
        }).catch(function (error) {
          return <a href={''} alt="N/A" height="42" width="42" />
        });
        console.log(iurl)
        return iurl
      }
      const dateToNavigate = this.props.dateData
      console.log(dateToNavigate.getMonth() + 1);
      console.log(dateToNavigate.getFullYear());
      console.log(dateToNavigate.getDate());
      const today = moment().format('DD-MM-YYYY');

      const showJobs = this.props.data.length > 0 ? this.props.data.map((job, index) => (
        <CollapsibleItem key={job.carId} header={
          <div>
          <div className='spann'>{job.carId ? job.carId: 'N/A'}</div>
          <div className='spann'>{job.customerName ? job.customerName: 'N/A'}</div>
          <div className='spann'>{job.customerId ? job.customerId: 'N/A'}</div>
          <div className='spann'>{job.associateName ? job.associateName: 'N/A'}</div>
          <div className='spann'>{job.serviceType ? job.serviceType: 'N/A'}</div>
          <div className='spann'>{job.cleaningStatus ? job.cleaningStatus: 'N/A'}</div>
          {/* <div className='spann'>{getImgUrl(today + '/' + job.carId)}</div> */}

        </div>} icon='filter_drama'>

        <table className='table'>
              <tbody className='custbody'>
              <tr className='custr'>
                <td className='custd'> Car Number </td>
                <td className='custd'> {job.carId} </td>
              </tr>
              <tr className='custr'>
                <td className='custd'> Customer Name </td>
                <td className='custd'> {job.customerName} </td>
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
              <tr className='custr'>
                <td className='custd'> Cleaner Image </td>
                {/* <td className='custd'> {getImgUrl(today + '/' + job.carId)} </td> */}
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
              <div className='spann'>Customer Name</div>
              <div className='spann'>Customer Mobile</div>
              <div className='spann'>Associate Name</div>
              <div className='spann'>Service Type</div>
              <div className='spann'>Cleaning Status</div>
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
