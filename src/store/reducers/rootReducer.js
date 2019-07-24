import associateReducer from './associateReducer'
import customerReducer from './customerReducer'

import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'

const rootReducer = combineReducers({
    firestoreDocs: firestoreReducer,
    associate: associateReducer,
    customer: customerReducer,
})

export default rootReducer