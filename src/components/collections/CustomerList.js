import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Collapsible, CollapsibleItem } from 'react-materialize'
import './CustomerList.css'

const Cars = (props) => {
  console.log('-------------------')
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
const Customers = (props) => {
  console.log(props.customer)
  const { customer } = props
  let customers
  if (customer) {
    customers = (customer.map(g => {
      return (
        <CollapsibleItem key={g.name + " " + g.id} header={
          <div>
            <div className='spann'>{g.name}</div>
            <div className='spann'>{g.id}</div>
            <div className='spann'>{(g.active) ? "Active": "Not Active"}</div>
          </div>
          } icon='filter_drama'>
            <table className='table'>
              <tbody>
              <tr className='tr'>
                <td className='td'> Customer Name </td>
                <td className='td'> {g.name} </td>
              </tr>
              <tr className='tr'>
                <td className='td'> Customer Mobile </td>
                <td className='td'> {g.id} </td>
              </tr>
              <tr className='tr'>
                <td className='td'> Customer Status </td>
                <td className='td'> {(g.active) ? "Active": "Not Active"} </td>
              </tr>
              <tr className='tr'>
                <td className='td'> Apartment </td>
                <td className='td'> {g.apartmentNo} {g.apartment} </td>
              </tr>
              <tr className='tr'>
                <td className='td'> Email </td>
                <td className='td'> {g.email} </td>
              </tr>
              <tr className='tr'>
                <td className='td'> Cleaner Mobile </td>
                <td className='td'> {g.staffMobile} </td>
              </tr>
              <tr className='tr'>
                <td className='td'> { Cars(g.Cars) } </td>
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
        //  <li className="collection-item" key={ g.id } >

        //  </li>
      )
    })
    )
  } else {
    customers = <h4 style={{ textAlign: 'center' }}>Loading...</h4>
  }
  return (
    <div>
      <Collapsible>
        {customers}
      </Collapsible>
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