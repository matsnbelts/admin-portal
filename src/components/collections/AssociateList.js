import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Collapsible, CollapsibleItem } from 'react-materialize'

const Associates = (props) => {
  console.log(props.associate)
  const { associate } = props
  let associates
  if (associate) {
    associates = (associate.map(g => {
      return (
        <CollapsibleItem header={g.name + " " + g.id} icon='filter_drama'>
          <div><span>Associate Name: </span><span>{g.name}</span></div>
          <div><span>Associate Mobile: </span><span>{g.id}</span></div>
          <div><span>Associate Status: </span><span>{g.active ? "Active" : "Not Active"}</span></div>
          {/* <div><span>Date of Joining: </span><span>{(g.doj) ? new Date(new Date(g.doj) - (new Date()).getTimezoneOffset() * 60000).toISOString().substr(0, 10) : ""}</span></div> */}
          <div><span>Email: </span><span>{g.email}</span></div>
          <div><span>Associate ID: </span><span>{g.idProof}</span></div>
          <div><span>Service Area: </span><span>{g.serviceArea}</span></div>
          <div><span>Total Customers Rated: </span><span>{g.totalCustomersRated}</span></div>
          <div><span>Total Scores: </span><span>{g.totalScores}</span></div>

          {/* <Link className='secondary-content' to='/' onClick={() => deleteGoal(g.id)}>
            <i className='material-icons delete'>delete</i>
          </Link> */}
          <Link className='secondary-content' to={`associate/${g.id}`}>
            <i className='material-icons edit'>edit</i>
          </Link>
        </CollapsibleItem>
      )
    })
    )
  } else {
    associates = <h4 style={{ textAlign: 'center' }}>Loading...</h4>
  }
  return (
    <div>
      <Collapsible>
        {associates}
      </Collapsible>
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    associate: state.firestoreDocs.ordered.associates
  }
}
export default compose(
  connect(mapStateToProps, null),
  firestoreConnect([
    { collection: 'associates' }
  ])
)(Associates)