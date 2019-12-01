const initState = {
    submitted: false,
  }

  const customerReducer = (state = initState, action) => {
    switch(action.type) {
        case 'ADD_CUSTOMER':
            console.log('Added customer', action.customer);
            return {
                ...state,
                ...state.submitted = true,
                action
            }
        case 'ADD_CUSTOMER_ERROR':
            console.log('add customer error', action.err);
            return state;
        case 'BATCH_UPDATE_SUCCESSFUL':
                console.log('batch update reducer', action.batchUpdated);
                return action
        case 'BATCH_UPLOAD_SUCCESSFUL':
            console.log('batch upload reducer', action.batchUpload);
            return {
                ...state.batchUpload = action.batchUpload,
            }
        case 'UPDATE_CUSTOMER':
            console.log('Updated customer', action.customer);
            return {
                ...state,
                ...state.submitted = true,
                action
            }
        case 'UPDATE_CUSTOMER_ERROR':
            console.log('update customer error', action.err);
            return state;
        case 'GET_CUSTOMER':
            console.log('Get customer', action);
            return {
                ...state,
                action
            }
        case 'GET_CUSTOMER_ERROR':
            console.log('get customer error', action.err);
            return state;
        case 'CUSTOMER_EXISTS':
            console.log('CUSTOMER_EXISTS', action.customer_exists);
            return {
                ...state,
                ...state = action.customer_exists,
                action
            }
        default:
            return state;
    }
}

export default customerReducer