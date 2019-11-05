import React from 'react';
import Papa from 'papaparse';
import { connect } from 'react-redux'
import { customerSheetUploadAction } from '../../store/actions/customerActions'
import M from "materialize-css";

import './CustomerList.css'

class CustomerSheetUpload extends React.Component {
    constructor() {
      super();
      this.state = {
        csvfile: undefined,
        updated: undefined
      };
      this.updateData = this.updateData.bind(this);
    }
  
    handleChange = event => {
      this.setState({
        csvfile: event.target.files[0]
      });
    };
  
    importCSV = () => {
      const { csvfile } = this.state;
      Papa.parse(csvfile, {
        complete: this.updateData,
        header: true
      });
    };
  
    updateData(result) {
      var data = result.data;
      this.setState({
        ...this.state,
      });
      this.props.customerSheetUpload(data);
      M.toast({html: 'Uploaded successfully... Your db is being updated...'});

      //this.props.history.push('/view_customers');
    }
  
    render() {
      return (
        <div className="App">
          <h2>Upload Customer CSV File in the below table format with same header names</h2>
          <table className='.uplcustable'>
                            <tbody className='uplcustbody'>
                                <tr className='custr'>
                                    <td className='custd'> Active </td>
                                    <td className='custd'> CustomerId </td>
                                    <td className='custd'> Pack </td>
                                    <td className='custd'> Apartment </td>
                                    <td className='custd'> ContactName </td>
                                    <td className='custd'> ApartmentNo </td>
                                    <td className='custd'> Car </td>
                                    <td className='custd'> CarNo </td>
                                    <td className='custd'> CarType </td>
                                    <td className='custd'> StartDate </td>
                                    <td className='custd'> Mobile </td>
                                    <td className='custd'> EmailAddress </td>
                                    <td className='custd'> Staff </td>
                                    <td className='custd'> StaffMobile </td>
                                    <td className='custd'> Promocode </td>
                                    <td className='custd'> CustomerStatus </td>
                                </tr>
                                <tr className='custr'>
                                    <td className='custd'> Y </td>
                                    <td className='custd'> Dec-04 </td>
                                    <td className='custd'> Full </td>
                                    <td className='custd'> Deccan </td>
                                    <td className='custd'> Vinod </td>
                                    <td className='custd'> B-107 </td>
                                    <td className='custd'> Maruti Swift </td>
                                    <td className='custd'> TN-09 BA 9165 </td>
                                    <td className='custd'> Hatchback </td>
                                    <td className='custd'> 2019-05-01 </td>
                                    <td className='custd'> 9884277610 </td>
                                    <td className='custd'> vinod.ramadoss129@gmail.com </td>
                                    <td className='custd'> Raegen </td>
                                    <td className='custd'> 7010733004 </td>
                                    <td className='custd'> PromoHundred </td>
                                    <td className='custd'> Y </td>
                                </tr>
                            </tbody>
                        </table>
          <input
            className="csv-input"
            type="file"
            ref={input => {
              this.filesInput = input;
            }}
            name="file"
            placeholder={null}
            onChange={this.handleChange}
          />
          <p />
          <button onClick={this.importCSV} className='custbutton'> Upload Now</button>
        </div>
      );
    }
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
        customerSheetUpload: (csvData) => { dispatch(customerSheetUploadAction(csvData)) },
    }
}

const mapStateToProps = (state) => {
    return {
      batchUpload: state.batchUpload
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerSheetUpload)
