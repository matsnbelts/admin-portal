import firebase from 'firebase'

export const addAssociate = (associate) => {
    return (dispatch, getState, {getFirebase, getFirestore }) => {
        associate.doj = (!associate.doj) ? null : new firebase.firestore.Timestamp.fromDate(new Date(associate.doj));

        // make async call to database
        const firestore = getFirestore();
        firestore.collection('associates').doc('+91' + associate.mobile).set({
            ...associate,
            totalCustomersRated: 0,
            totalScores: 0,
            serviceArea: '',
            active: true,
            email: ''
        }).then(() => {
            dispatch({ type: 'ADD_ASSOCIATE', associate });

        }).catch((err) => {
            dispatch({type: 'ADD_ASSOCIATE_ERROR', err });
        })
    }
};

export const getAssociateAction = (associateId) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore()
        firestore.collection('associates').doc(associateId).get().then((doc) => {
            if (doc.exists) {
                const associate = doc.data()
                dispatch({ type: 'GET_ASSOCIATE', associate })
            } else {
                console.log(associateId + ' does not exist')
            }
        })
    }
};

export const updateAssociateAction = (updatedAssociate, associateId) => {
    return (dispatch, getState, { getFirestore }) => {
        updatedAssociate.doj = (!updatedAssociate.doj) ? null : new firebase.firestore.Timestamp.fromDate(new Date(updatedAssociate.doj));
        const firestore = getFirestore()
        firestore.collection('associates').doc(associateId).update({
            ...updatedAssociate
        })
    }
}