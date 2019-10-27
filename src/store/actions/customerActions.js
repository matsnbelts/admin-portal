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
        customer.staffMobile = c.staffMobile;
        customer.email = c.email;
        let cars_list = c.Cars;
        let Cars = {};
        cars_list.map((car) => {
            car.status = true;
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
                dispatch({ type: 'GET_CUSTOMER_ERROR', customerId })
            }
        })
    }
}

export const customerSheetUploadAction = (csvData) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore()
        for(let [id, customerData] of Object.entries(csvData)) {
            let carN = customerData.CarNo.replace(/(\s|-)/g, "");
            if(!customerData.Mobile || !carN) {
                continue;
            }
            const customerId = '+91' + customerData.Mobile;
            firestore.collection('customers').doc(customerId).get().then((doc) => {
                let customer = {};
                let staffMobile = customerData.StaffMobile ? '+91' + customerData.StaffMobile: '';
                if(!doc.exists) {
                    //////
                    customer.active = (customerData.Active === 'Y');
                    customer.staffMobile = staffMobile;
                    customer.apartment = customerData.Apartment ? customerData.Apartment : '';
                    customer.apartmentNo = customerData.ApartmentNo ? customerData.ApartmentNo : '';
                    customer.name = customerData.ContactName ? customerData.ContactName : '';
                    customer.mobile = customerId;
                    customer.email = customerData.EmailAddress ? customerData.EmailAddress : '';
                    customer.customerId = customerData.CustomerId ? customerData.CustomerId : '';

                    let car = {};
                    let Cars = {};
                        car.no = carN;
                        car.model = customerData.Car ? customerData.Car : '';
                        car.status = (customerData.Active === 'Y');
                        car.startDate = (!customerData.StartDate) ? null : new firebase.firestore.Timestamp.fromDate(new Date(customerData.StartDate));
                        car.promoCode = customerData.Promocode ? customerData.Promocode : '';
                        car.pack = customerData.Pack ? customerData.Pack : '';
                        Cars[car.no] = car;
                        console.log(customerData)
                        customer.Cars = Cars;
                    //////
                } else {
                    customer = doc.data();
                    //////
                    customer.active = ((customerData.Active !== 'Y' && customer.active) || (customerData.Active === 'Y' && !customer.active)) ? !customer.active : customer.active;
                    customer.staffMobile = (customer.staffMobile !== staffMobile) ? staffMobile : customer.staffMobile;
                    customer.apartment = (customerData.Apartment && customer.apartment !== customerData.Apartment) ? customerData.Apartment : customer.apartment;
                    customer.apartmentNo = (customerData.ApartmentNo && customer.apartmentNo !== customerData.ApartmentNo) ? customerData.ApartmentNo : customer.apartmentNo;
                    customer.email = (customerData.EmailAddress && customer.email !== customerData.EmailAddress) ? customerData.EmailAddress : customer.email;
                    customer.customerId = (customerData.CustomerId && customer.customerId !== customerData.CustomerId) ? customerData.CustomerId : customer.customerId;
                    //////
                    const cars_list = customer.Cars;
                    let Cars = {};
                    if(!(carN in cars_list) || !cars_list[carN]) {
                        let car = {};
                        car.no = carN;
                        car.model = customerData.Car ? customerData.Car : '';
                        car.status = (customerData.Active === 'Y');
                        car.startDate = (!customerData.StartDate) ? null : new firebase.firestore.Timestamp.fromDate(new Date(customerData.StartDate));
                        car.promoCode = customerData.Promocode ? customerData.Promocode : '';
                        car.pack = customerData.Pack ? customerData.Pack : '';
                        Cars[car.no] = car;
                        customer.Cars = Cars;
                    } else {
                        // look for potential fields to update
                        let car = cars_list[carN];
                        console.log(carN);
                        console.log(car);
                        car.model = (car.model !== customerData.Car) ? customerData.Car : car.model;
                        car.model = (car.model) ? car.model : '';
                        car.status = car.status ? car.status : true;
                        car.status = ((customerData.Active !== 'Y' && car.status) || (customerData.Active === 'Y' && !car.status)) ? !car.status : car.status;
                        car.promoCode = (car.promoCode !== customerData.Promocode) ? customerData.Promocode : car.promoCode;
                        Cars[car.no] = car;
                        customer.Cars = Cars;
                    }
                }
                console.log(customer);
                firestore.collection('customers').doc(customerId).set({
                    ...customer
                }, {merge: true});
            })
        }
    }
}

export const updateCustomerDueAction = (selectedCustomers, status) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore()
        var batch = firestore.batch();
        selectedCustomers.forEach((value, key, map) => {
            let paid = (status == 'paid') ? true: false
            console.log(key + "::" + key.substring(7))
            var docRef = firestore.collection("customers").doc(key.substring(7));
            batch.update(docRef, {"paid": paid});
        });
        // Commit the batch
        batch.commit().then(function () {
            console.log('Batch write successful!!!')
            const batchUpdated = true
            dispatch({ type: 'BATCH_UPDATE_SUCCESSFUL', batchUpdated })
        });
    }
}

export const deleteCustomerAction = (selectedCustomers) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore()
        var batch = firestore.batch();
        selectedCustomers.forEach((value, key, map) => {
            firestore.collection("customers").doc(key.substring(7)).delete().then(function() {
                console.log("Document successfully deleted!");
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
        });
    }
}

export const checkCustomerAction = (customerId) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore()
        firestore.collection('customers').doc(customerId).get().then((doc) => {
            const customer_exists = doc.exists
            dispatch({ type: 'CUSTOMER_EXISTS', customer_exists })
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
        customer.active = c.active;
        customer.staffMobile = c.staffMobile;
        customer.email = c.email;
        let cars_list = c.Cars;
        let Cars = {};
        cars_list.map((car) => {
            car.startDate = (!car.startDate) ? null : new firebase.firestore.Timestamp.fromDate(new Date(car.startDate));
            delete car.loaded_from_db;
            Cars[car.no] = car;
        });
        customer.Cars = Cars;
        const firestore = getFirestore()
        firestore.collection('customers').doc(customerId).update({
            ...customer
        })
    }
}