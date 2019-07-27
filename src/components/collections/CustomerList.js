import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Collapsible, CollapsibleItem } from 'react-materialize'

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
  const { customer, deleteGoal } = props
  let customers
  if (customer) {
    customers = (customer.map(g => {
      return (
        <CollapsibleItem key={g.name + " " + g.id} header={g.name + " " + g.id} icon='filter_drama'>
          <div><span>Customer Name: </span><span>{g.name}</span></div>
          <div><span>Customer Mobile: </span><span>{g.id}</span></div>
          <div><span>Customer Status: </span><span>{g.active}</span></div>
          <div><span>Apartment: </span><span>{g.apartmentNo} {g.apartment}</span></div>
          <div><span>Email: </span><span>{g.email}</span></div>
          <div><span>Cleaner Mobile: </span><span>{g.staff}</span></div>
          <div>
            <Collapsible>
              { Cars(g.Cars) }
            </Collapsible>     
          </div>
          <Link className='secondary-content' to='/' onClick={() => deleteGoal(g.id)}>
            <i className='material-icons delete'>delete</i>
          </Link>
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