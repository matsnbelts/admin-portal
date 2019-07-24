import firebase from 'firebase'

export const addCustomer = (c) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        let customer = {};
        customer.name = c.name;
        customer.mobile = c.mobile;
        customer.apartment = c.apartment;
        customer.apartmentNo = c.apartmentNo;
        customer.area = c.area;
        customer.apartmentNo = c.apartmentNo;
        customer.active = true;
        customer.staff = c.staff;
        customer.email = c.email;
        let cars_list = c.Cars;
        let Cars = {};
        cars_list.map((car) => {
            car.active = true;
            car.startDate = (!car.startDate) ? null : new firebase.firestore.Timestamp.fromDate(new Date(car.startDate));
            car.promoExpiry = (!car.promoExpiry) ? null : new firebase.firestore.Timestamp.fromDate(new Date(car.promoExpiry));
            Cars[car.no] = car;
        });
        customer.Cars = Cars;
        firestore.collection('customers').doc(customer.mobile).set({
            ...customer
        }).then(() => {
            dispatch({ type: 'ADD_CUSTOMER', customer });

        }).catch((err) => {
            dispatch({ type: 'ADD_CUSTOMER_ERROR', err });
        })
    }
}

export const getCustomerAction = (customerId) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore()
        firestore.collection('customers').doc(customerId).get().then((doc) => {
            if (doc.exists) {
                const customer = doc.data()
                dispatch({ type: 'GET_CUSTOMER', customer })
            } else {
                console.log(customerId + ' does not exist')
            }
        })
    }
}

export const updateCustomerAction = (c, customerId) => {
    return (dispatch, getState, { getFirestore }) => {
        let customer = {};
        customer.name = c.name;
        customer.mobile = c.mobile;
        customer.apartment = c.apartment;
        customer.apartmentNo = c.apartmentNo;
        customer.area = c.area;
        customer.apartmentNo = c.apartmentNo;
        customer.active = true;
        customer.staff = c.staff;
        customer.email = c.email;
        let cars_list = c.Cars;
        let Cars = {};
        cars_list.map((car) => {
            car.active = true;
            car.startDate = (!car.startDate) ? null : new firebase.firestore.Timestamp.fromDate(new Date(car.startDate));
            Cars[car.no] = car;

        });
        customer.Cars = Cars;
        const firestore = getFirestore()
        firestore.collection('customers').doc(customerId).update({
            ...customer
        })
    }
}