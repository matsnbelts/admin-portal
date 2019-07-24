const initState = {
    submitted: false
    //doj: admin.firestore.Timestamp.fromDate(new Date('June 01, 2019')),
  }

  const associateReducer = (state = initState, action) => {
    switch(action.type) {
        case 'ADD_ASSOCIATE':
            console.log('Added associate', action.associate);
            return {
                ...state,
                ...state.submitted = true,
                action
            }
        case 'ADD_ASSOCIATE_ERROR':
            console.log('add associate error', action.err);
            return state;
        case 'UPDATE_ASSOCIATE':
            console.log('Updated associate', action.associate);
            return {
                ...state,
                ...state.submitted = true,
                action
            }
        case 'UPDATE_ASSOCIATE_ERROR':
            console.log('update associate error', action.err);
            return state;
        case 'GET_ASSOCIATE':
            console.log('Get associate', action);
            return {
                ...state,
                action
            }
        case 'GET_ASSOCIATE_ERROR':
            console.log('get associate error', action.err);
            return state;
        default:
            return state;
    }
}

export default associateReducer