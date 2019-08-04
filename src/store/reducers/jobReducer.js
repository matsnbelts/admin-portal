const initState = {
}

const jobReducer = (state = initState, action) => {
    switch(action.type) {
        case 'JOBS_LIST':
            //console.log('Jobs List', action.jobs);
            return {
                ...state,
                action
            }
        case 'GET_JOB_DETAILS':
            return {
                ...state,
                action
            }
        default:
            return state;
    }
}
export default jobReducer