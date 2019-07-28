const getAssociateName = (associateId, firestore) => {
    firestore.collection('associates').doc(associateId).get().then((doc) => {
        if (doc.exists) {
            const associate = doc.data()
            console.log(associate.name)
            return associate.name;
        } else {
            console.log(associateId + ' does not exist')
            return null;
        }
    })
}
export const getJobsAction = (currentDate) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore()
        let associateMap = {}
        firestore.collection('associates').get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                const associate = doc.data()
                console.log(associate.name)
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
                    //console.log(job.associateId);
                    job.associateName = associateMap[job.associateId];
                    console.log(job.associateId + " - " + job.associateName);
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
                        let associateId = customerInfo.staffMobile;
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