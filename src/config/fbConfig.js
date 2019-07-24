  import firebase from 'firebase/app'
  import 'firebase/firestore'
  import 'firebase/auth'

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBrLdQ4-fsDtmq5OcZAkZA30AaThdvIRyI",
    authDomain: "matsnbelts.firebaseapp.com",
    databaseURL: "https://matsnbelts.firebaseio.com",
    projectId: "matsnbelts",
    storageBucket: "matsnbelts.appspot.com",
    messagingSenderId: "618255723391",
    appId: "1:618255723391:web:47d33675f85b4cd3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true});
export default firebase;