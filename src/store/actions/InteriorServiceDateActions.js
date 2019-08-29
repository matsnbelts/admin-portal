import firebase from 'firebase'
import moment from 'moment'

const getInteriorDates = async (firestore, apartment) => {
    let dates = []
    await firestore.collection('interior_service_dates').doc(apartment).collection('Dates').get().then(
        function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                let dateString = doc.id
                let convertedDateString = new Date(dateString).toDateString()
                dates.push(convertedDateString);
            })
        }
    );
    return dates
}

export const getInteriorServiceAvailabilityAction = (apartment) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore()
        let dates = []
    firestore.collection('interior_service_dates').doc(apartment).collection('Dates').get().then(
        function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                let dateString = doc.id
                let convertedDateString = new Date(dateString).toDateString()
                dates.push(convertedDateString);
            })
            dispatch({ type: 'GET_INTERIOR_SERVICE_DATES', dates })
        }
    );
    }
}

export const updateInteriorServiceAvailabilityAction = (apartment, datess) => {
    return async (dispatch, getState, { getFirestore }) => {
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December']
        const firestore = getFirestore()
        let timeStampDates = [];
        var fireStoreDates = await getInteriorDates(firestore, apartment)
        var uiDates = Array.from(datess)
        console.log(fireStoreDates +"----" + uiDates)
        // filter newly added dates and create documents in the firestore
        const filteredUIDatesToCreateDoc = uiDates.filter(number => !fireStoreDates.includes(number));

          filteredUIDatesToCreateDoc.forEach((interior_date) => {
            let momentDate = moment(new Date(interior_date))
            let fireStoreDateDocFormat = momentDate.date() + '-' + months[momentDate.month()] + '-' + momentDate.year()
            console.log(fireStoreDateDocFormat + " ;;; " + momentDate.month())
            let cars = {'Cars': []}
            firestore.collection('interior_service_dates').doc(apartment).collection('Dates').doc(fireStoreDateDocFormat).set(cars)
            // const timeStampDate = new firebase.firestore.Timestamp.fromDate(new Date(interior_date));
            // timeStampDates.push(timeStampDate)
        });
        // dates = timeStampDates;
        // firestore.collection('interior_service_dates').doc(apartment).update({
        //     dates
        // })

        // delete documents corresponding to dates removed from UI
        const filteredFireStoreDatesToDeleteDoc = fireStoreDates.filter(number => !uiDates.includes(number));
        if(filteredFireStoreDatesToDeleteDoc.length == 0) {
            var dates = await getInteriorDates(firestore, apartment);
            dispatch({ type: 'GET_INTERIOR_SERVICE_DATES', dates });
        } else {
            filteredFireStoreDatesToDeleteDoc.forEach((interior_date) => {
            let momentDate = moment(new Date(interior_date))
            let fireStoreDateDocFormat = momentDate.date() + '-' + months[momentDate.month()] + '-' + momentDate.year()
            console.log(fireStoreDateDocFormat + " ;;; " + momentDate.month())
            let cars = {'Cars': []}
            firestore.collection('interior_service_dates').doc(apartment).collection('Dates').doc(fireStoreDateDocFormat).delete().then(
                async function() {
                    console.log('deleted doc successfully ' + fireStoreDateDocFormat);
                    var dates = await getInteriorDates(firestore, apartment);
                    dispatch({ type: 'GET_INTERIOR_SERVICE_DATES', dates })
                }
            )
            // const timeStampDate = new firebase.firestore.Timestamp.fromDate(new Date(interior_date));
            // timeStampDates.push(timeStampDate)
        });
      }
    }
}