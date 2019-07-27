import associateReducer from './associateReducer'
import customerReducer from './customerReducer'
import jobReducer from './jobReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'

const rootReducer = combineReducers({
    firestoreDocs: firestoreReducer,
    associate: associateReducer,
    customer: customerReducer,
    jobs: jobReducer
})

export default rootReducer