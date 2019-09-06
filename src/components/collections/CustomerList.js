import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Collapsible, CollapsibleItem, Button, TextInput } from 'react-materialize'
import './CustomerList.css'
import Input from '@material-ui/core/Input';
import { TextField } from '@material-ui/core';

const Cars = (props) => {
  for(let [carNo, car] of Object.entries(props)) {
    console.log(carNo + " : " + car.model)
    return (
      // <CollapsibleItem id={carNo} key={carNo} header={carNo} icon='filter_drama'>
      <div>
        <div> { carNo } </div>
        <div> { car.model }</div>
      </div>

      // </CollapsibleItem>
    )
  } 
}
const getStyles = () => {
  return Object.assign(
    {},
    {
      width: "100%"
    }
  );
}
const getStylesSearch = () => {
  return Object.assign(
    {},
    {
      width: "50%",
      height: "2rem",
      margin: '10px'
    }
  );
}
const Customers = (props) => {
  const { customer } = props
  let customers
  if (customer) {
    customers = (customer.map(g => {
      return (
        <CollapsibleItem key={g.name + " " + g.id} header={
          <div>
            <div className='spann'>{g.name}</div>
            <div className='spann'>{g.customerId}</div>
            <div className='spann'>{g.apartmentNo}</div>
            <div className='spann'>{g.apartment}</div>
            <div className='spann'>{g.id}</div>
            <div className='spann'>{(g.active) ? "Active": "Not Active"}</div>
          </div>
          }>
            <table className='.custable'>
              <tbody className='custbody'>
              <tr className='custr'>
                <td className='custd'> Customer Name </td>
                <td className='custd'> {g.name} </td>
              </tr>
              <tr className='custr'>
                <td className='custd'> Customer Mobile </td>
                <td className='custd'> {g.id} </td>
              </tr>
              <tr className='custr'>
                <td className='custd'> Customer Status </td>
                <td className='custd'> {(g.active) ? "Active": "Not Active"} </td>
              </tr>
              <tr className='custr'>
                <td className='custd'> Apartment </td>
                <td className='custd'> {g.apartmentNo} {g.apartment} </td>
              </tr>
              <tr className='custr'>
                <td className='custd'> Email </td>
                <td className='custd'> {g.email} </td>
              </tr>
              <tr className='custr'>
                <td className='custd'> Cleaner Mobile </td>
                <td className='custd'> {g.staffMobile} </td>
              </tr>
              <tr className='custr'>
                <td className='custd'> { Cars(g.Cars) } </td>
              </tr>
              </tbody>
            </table>
          {/* <div>
  
          </div> */}
          {/* <Link className='secondary-content' to='/' onClick={() => deleteGoal(g.id)}>
            <i className='material-icons delete'>delete</i>
          </Link> */}
          <Link className='secondary-content' to={`customer/${g.id}`}>
            <i className='material-icons edit'>edit</i>
          </Link>
        </CollapsibleItem>
      )
    })
    )
  } else {
    //customers = <h4 style={{ textAlign: 'center' }}>Loading...</h4>
    customers = <div class="progress">
    <div class="indeterminate"></div>
</div>
  }
  return (
      <div>
        <div className='spannHeaderContainer'>
           <div className='floatLeft'>Showing ({customers.length})</div>
           <div className='floatRight'>
              <form onSubmit='{}' className="col s12">
              <input aria-invalid="false" style={getStylesSearch()} class="MuiInputBase-input-28 MuiInput-input-13" placeholder="Search" type="text" value="" />
        {/* <Button className="#000000 black">Search</Button> */}
        <button aria-label="" tabindex="0"> <span>Search</span> </button>
                </form>
           </div>

        </div>
        <div className='spannHeaderContainer'>
          <div className='spannHeader'>Customer Name</div>
          <div className='spannHeader'>Customer Id</div>
          <div className='spannHeader'>apartmentNo</div>
          <div className='spannHeader'>Apartment</div>
          <div className='spannHeader'>Mobile</div>
          <div className='spannHeader'>Status</div>
      </div>

    <div className='sectionRoot'>
      <div className='dividerWidth'>
        <div className="divider" style={getStyles()}></div>
      </div>
       <div className="section">
      <Collapsible>
        {customers}
      </Collapsible>
    </div>
    </div>
    </div>
  )
}
// const mapDispatchToProps = (dispatch) => {
//  return {
//   deleteGoal: (id) => { dispatch(deleteGoal(id))},
//   getAGoal: (id) => { dispatch(getAGoal(id))}
//  }
// }
const mapStateToProps = (state) => {
  return {
    customer: state.firestoreDocs.ordered.customers
  }
}
export default compose(
  // connect(mapStateToProps, mapDispatchToProps),
  connect(mapStateToProps, null),
  firestoreConnect([
    { collection: 'customers' }
  ])
)(Customers)