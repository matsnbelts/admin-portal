export const getJobsAction = (currentDate) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore()
        let jobs = [];
        firestore.collection('job_allocation').doc('' + currentDate.getFullYear())
        .collection('' + (currentDate.getMonth() + 1)).doc('' + currentDate.getDate())
        .collection("cars").get().then(
            function(querySnapshot) {
                let job;
                querySnapshot.forEach(function(doc) {
                    job = doc.data();
                    job.carId = doc.id;
                    console.log(job.carId);
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

export const scheduleJobAction = (currentDate) => {
    console.log("ScheduleJobAction: " + currentDate.getFullYear())
    
    function getCarMap(customerId, associateId) {
        return {
          associateFeedback: "",
          associateId: associateId,
          cleaningStatus: "NotCleaned",
          customerAvailability: true,
          customerFeedback: "",
          customerId: customerId,
          serviceType: "Exterior",
          supervisorFeedback: "",
          supervisorId: ""
        };
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
                        console.log(doc.id, " => ", doc.data());
                        /** */
                        let carsMap = customerInfo.Cars;
                        let associateId = customerInfo.staff;
                        for(let [carModel, value] of Object.entries(carsMap)) {
                            if(!value.status) {
                              continue;
                            }
                            // TODO: check if today customer has scheduled for interior cleaning from
                            //    interior_service_availability
                            // TODO: check if today exterior service available from admin logic
                            firestore.collection('job_allocation').doc('' + currentDate.getFullYear())
                                .collection('' + (currentDate.getMonth() + 1)).doc('' + currentDate.getDate())
                                .collection("cars").doc(carModel).set(getCarMap(customerId, associateId), {merge: false});
                          }
                          /** */

                    });
                })
                .catch(function(error) {
                    console.log("Error getting active customer documents: ", error);
                });
    }
}