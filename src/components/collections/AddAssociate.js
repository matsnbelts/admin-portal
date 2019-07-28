import React, { Component } from 'react'
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.css';
import { Container, Button, TextInput, Row } from 'react-materialize';
import { connect } from 'react-redux'
import { addAssociate } from '../../store/actions/associateActions'


class AddAssociate extends Component {
    
    constructor() {
        super();
        this.state = {
            name: '',
            mobile: '',
            idProof: '',
            doj: '',
            submitted: false
        }
    }
    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):

        if (this.props.associate !== prevProps.associate) {
          this.setState({ submitted: this.props.associate.submitted });
        }
        console.log('ComponDidUpdate' + this.props.associate.submitted + ":"
        + this.state.submitted)
      }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleAdd = (e) => {
        e.preventDefault();
        console.log("Associate State after added: " + this.state);
        if (this.state.mobile !== '' && this.state.name !== '' && this.state.doj !== '')
          this.props.addAssociate(this.state);
          this.props.history.push('/view_associates');
    }
    render() {
        return (
            <Container>
                <Row>
    <form onSubmit={this.handleAdd} className="col s12">
      <Row>
      <TextInput style={(this.state.name === '') ? {borderColor: 'red'} : {}} required="" aria-required="true" className="input-field col s10" label="Name" id="name" type="text" onChange={this.handleChange} />
      <TextInput style={(this.state.mobile === '') ? {borderColor: 'red'} : {}} required="" aria-required="true" className="input-field col s10" label="Mobile" id="mobile" type="text" onChange={this.handleChange} />
      </Row>
      <Row>
      <TextInput required="" aria-required="true" className="input-field col s10" label="ID Proof" id="idProof" type="text" onChange={this.handleChange} />
      <TextInput required="" aria-required="true" className="input-field col s10" label="Service Area" id="serviceArea" type="text" onChange={this.handleChange} />
      </Row>
      <Row>
      <TextInput style={(this.state.doj === '') ? {borderColor: 'red'} : {}} className="input-field col s12" label="Date of Join" id="doj" type="date"  onChange={this.handleChange} />
      <TextInput className="input-field col s12" label="Email" id="email" type="text" onChange={this.handleChange} />
      </Row>

      <Button className="#000000 black">Add Associate</Button>
    </form>
  </Row>
        {this.state.submitted &&
            <div>Associate Added successfully</div>
        }
            </Container >
        )
    }
}

const mapStateToProps = (state) => {
    console.log('Map state to props--------')
    console.log(state.associate)
    console.log("err: " + state.err)

    return {
        associate: state.associate
    }
   }

const mapDispatchToProps = (dispatch) => {
    return {
        addAssociate: (associate) => dispatch(addAssociate(associate))
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (AddAssociate)