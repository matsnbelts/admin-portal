export const addCustomer = (customer) => {
    return (dispatch, getState, {getFirebase, getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        firestore.collection('customers').doc(customer.mobile).set({
            ...customer,
            totalCustomersRated: 0,
            totalScores: 0,
            serviceArea: '',
            email: ''
        }).then(() => {
            dispatch({ type: 'ADD_CUSTOMER', customer });

        }).catch((err) => {
            dispatch({type: 'ADD_CUSTOMER_ERROR', err });
        })
    }
};