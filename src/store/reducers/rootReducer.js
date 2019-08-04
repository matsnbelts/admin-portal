import associateReducer from './associateReducer'
import customerReducer from './customerReducer'
import interiorServiceReducer from './interiorServiceReducer'
import jobReducer from './jobReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'

const rootReducer = combineReducers({
    firestoreDocs: firestoreReducer,
    associate: associateReducer,
    customer: customerReducer,
    jobs: jobReducer,
    interiorService: interiorServiceReducer
})

export default rootReducer