import moment from 'moment';

export const getJobsAction = (currentDate) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore()
        let associateMap = {}
        firestore.collection('associates').get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                const associate = doc.data()
                associateMap[doc.id] = associate.name;
            });
        });

        let jobs = [];
        firestore.collection('job_allocation').doc('' + currentDate.getFullYear())
        .collection('' + (currentDate.getMonth() + 1)).doc('' + currentDate.getDate())
        .collection("cars").get().then(
            function(querySnapshot) {
                let job;
                querySnapshot.forEach(function(doc) {
                    job = doc.data();
                    job.carId = doc.id;
                    job.associateName = associateMap[job.associateId];
                    jobs.push(job);
                })
                dispatch({ type: 'JOBS_LIST', jobs })
            }
        )
        .catch(function(error) {
            console.log("Error getting job documents: ", error);
        });
    }
}

export const getJobDetailsAction = (carId, dateToNavigate) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore()
        dateToNavigate = new Date(dateToNavigate)
        console.log('' + dateToNavigate.getFullYear() + (dateToNavigate.getMonth() + 1) +
        dateToNavigate.getDate() + carId)
        firestore.collection('job_allocation').doc('' + dateToNavigate.getFullYear())
        .collection('' + (dateToNavigate.getMonth() + 1)).doc('' + dateToNavigate.getDate())
            .collection("cars").doc('' + carId).get().then((doc) => {
                console.log(doc.data())
                if (doc.exists) {
                    const job = doc.data()
                    dispatch({ type: 'GET_JOB_DETAILS', job })
                } else {
                    console.log(carId + ' does not exist')
                }
            }
        )
        .catch(function(error) {
            console.log("Error getting job document: ", error);
        });
    }
}
export const updateJobAction = (updatedJob, carId, dateToNavigate) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore()
        let currentDate = new Date(dateToNavigate)
        firestore.collection('job_allocation').doc('' + currentDate.getFullYear())
                                .collection('' + (currentDate.getMonth() + 1)).doc('' + currentDate.getDate())
                                .collection("cars").doc(carId).update({
                                    'associateId': updatedJob.mobile,
                                    'serviceType': updatedJob.serviceType
                                }
                                );
    }
}

export const reassignJobAction = (currentDate, associateFrom, associateTo) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore()
        // let currentDate = new Date(dateToNavigate)
        let carsCollectionRef = firestore.collection('job_allocation').doc('' + currentDate.getFullYear())
        .collection('' + (currentDate.getMonth() + 1)).doc('' + currentDate.getDate())
            .collection("cars")
        carsCollectionRef.where('associateId', '==', associateFrom) 
        .get()
        .then(
            function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    let carNo = doc.id;
                    let carInfo = doc.data();
                    carInfo.associateId = associateTo;
                    firestore.collection('job_allocation').doc('' + currentDate.getFullYear())
                                .collection('' + (currentDate.getMonth() + 1)).doc('' + currentDate.getDate())
                                .collection("cars").doc(carNo).set(carInfo, {merge: true});
                })
            })
            .catch(function(error) {
                console.log("Error getting active customer documents: ", error);
                const reassigned = true;
                dispatch({ type: 'REASSIGN_JOB_ERROR',  reassigned});
            });
            const reassigned = true;
            dispatch({ type: 'REASSIGN_JOB',  reassigned});
    }
}

export const scheduleJobAction = (currentDate) => {
    
    function getCarMap(customerId, associateId, serviceType, customerName) {
        return {
          associateFeedback: "",
          associateId: associateId,
          cleaningStatus: "NotCleaned",
          customerAvailability: true,
          customerFeedback: "",
          customerId: customerId,
          serviceType: serviceType,
          supervisorFeedback: "",
          supervisorId: "",
          customerName: customerName
        };
      }

    function isInteriorAvailed(todate, carModel, firestore, customerApartment, customerId, associateId, customerName) {
        let interServiceDate = firestore.collection('interior_service_dates').doc(customerApartment).collection('Dates').doc(todate)
                                        .get();
        interServiceDate.then((interServiceDateDoc) => {
            console.log(interServiceDateDoc.exists, customerApartment, todate)
            if(!interServiceDateDoc.exists) {
                firestore.collection('job_allocation').doc('' + currentDate.getFullYear())
                .collection('' + (currentDate.getMonth() + 1)).doc('' + currentDate.getDate())
                .collection("cars").doc(carModel).set(getCarMap(customerId, associateId, 'Exterior', customerName), {merge: false});
                return;
            }
            let interiorCarsList = interServiceDateDoc.data.Cars;
            console.log(interiorCarsList)
            let serviceType = interiorCarsList.includes(carModel) ? 'Interior' : 'Exterior';
            firestore.collection('job_allocation').doc('' + currentDate.getFullYear())
            .collection('' + (currentDate.getMonth() + 1)).doc('' + currentDate.getDate())
            .collection("cars").doc(carModel).set(getCarMap(customerId, associateId, serviceType, customerName), {merge: false});
        })
    }

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        let customersRef = firestore.collection('customers');
        customersRef.where('active', '==', true)
            .get()
            .then(
                function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        // doc.data() is never undefined for query doc snapshots
                        let customerId = doc.id;
                        let customerInfo = doc.data()
                        /** */
                        let customerApartment = customerInfo.apartment;
                        let carsMap = customerInfo.Cars;
                        let associateId = customerInfo.staffMobile;
                        let customerName = customerInfo.name;
                        for(let [carModel, value] of Object.entries(carsMap)) {
                            if(!value.status) {
                              continue;
                            }
                            //TODO: check if today customer is available - {currentDate, carModel}
                            let todate = moment(currentDate).get("date") + '-' + (moment(currentDate).get("month") + 1) + '-' +moment(currentDate).get("year");
                            let customerUnavailabilityDate = firestore.collection('customer_unavailability').doc(customerApartment).collection('Dates').doc(todate)
                                .get();
                            customerUnavailabilityDate.then((customerUnavailabilityDateDoc) => {
                                if(!customerUnavailabilityDateDoc.exists) {
                                    isInteriorAvailed(todate, carModel, firestore, customerApartment, customerId, associateId, customerName);
                                    return;
                                }
                                let customerUnavailabilityCarsList = customerUnavailabilityDateDoc.data.Cars;
                                if(!customerUnavailabilityCarsList.includes(carModel)) {
                                   // TODO: check if today customer has scheduled for interior cleaning from
                                    //    interior_service_availability
                                    isInteriorAvailed(todate, carModel, firestore, customerApartment, customerId, associateId, customerName);
                                }
                            })
                          }
                    });
                })
                .catch(function(error) {
                    console.log("Error getting active customer documents: ", error);
                });
    }
}