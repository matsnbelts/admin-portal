import React from 'react';
import Papa from 'papaparse';
import { connect } from 'react-redux'
import { customerSheetUploadAction } from '../../store/actions/customerActions'

class CustomerSheetUpload extends React.Component {
    constructor() {
      super();
      this.state = {
        csvfile: undefined,
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
      this.props.history.push('/view_customers');
    }
  
    render() {
      console.log(this.state.csvfile);
      return (
        <div className="App">
          <h2>Import CSV File!</h2>
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
          <button onClick={this.importCSV}> Upload now!</button>
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
        customer_exists: state.customer_exists
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerSheetUpload)
