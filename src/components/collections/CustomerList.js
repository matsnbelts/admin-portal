import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Collapsible, CollapsibleItem, Container } from 'react-materialize'
import './CustomerList.css'

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

const Customers = (props) => {
  console.log(props.customer)
  const { customer } = props
  let customers
  if (customer) {
    customers = (customer.map(g => {
      return (
        <CollapsibleItem key={g.name + " " + g.customerId} header={
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
           Showing ({customers.length})
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