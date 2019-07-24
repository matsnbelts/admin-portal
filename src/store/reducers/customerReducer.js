const initState = {
    submitted: false
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
        default:
            return state;
    }
}

export default customerReducer