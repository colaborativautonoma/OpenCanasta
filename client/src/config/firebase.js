import firebase from 'firebase';

/**
 * @function
 * @name initApp
 * @description firebase initialization
 */
export const initApp = () => {
  const config = {
    apiKey: 'AIzaSyA4fX4f86dBezpexTCGR73lB0qHYK8pe6s',
    authDomain: 'open-canasta.firebaseapp.com',
    databaseURL: 'https://open-canasta.firebaseio.com',
    projectId: 'open-canasta',
    storageBucket: 'open-canasta.appspot.com',
    messagingSenderId: '931256855008',
  };
  firebase.initializeApp(config);
};

/**
 * @function
 * @name setDataOnReference
 * @description set specific register by reference name
 */
export const updateRegister = (name, id, newData, callback) => {
  firebase.database().ref().child(name).child(id).set(newData, error => callback(error));
};

/**
 * @function
 * @name removeRegister
 * @description remove register by reference and id
 */
export const removeRegister = (name, id) => {
  firebase.database().ref().child(name).child(id).remove();
};

/**
 * @function
 * @name addRegister
 * @description add new register
 */
export const addRegister = (name, newRegister, callback) => {
  firebase.database().ref().child(name).push(newRegister, error => callback(error))
};

/**
 * @function
 * @name addProductToSaler
 * @description add new product
 */
export const addProductToSaler = (idSaler, newProduct, callback) => {
  firebase.database().ref().child('salers').child(idSaler).child('products').push(newProduct, error => callback(error))
};

/**
 * @function
 * @name onAuthStateChanged
 * @description listen event
 */
export const onAuthStateChanged = (callback) => {
  firebase.auth().onAuthStateChanged(user => callback(user));
};

/**
 * @function
 * @name signIn
 */
export const signIn = ({ email, password, callbacks }) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      if (callbacks && callbacks.then) callbacks.then();
    })
    .catch((error) => {
      if (callbacks && callbacks.catch) callbacks.catch(error);
    });
};

/**
 * @function
 * @name logOut
 */
export const logOut = (callbacks) => {
  firebase.auth().signOut()
    .then(() => {
      if (callbacks && callbacks.then) callbacks.then();
    })
    .catch((error) => {
      if (callbacks && callbacks.catch) callbacks.catch(error);
    });
};

export const getRegisters = (name, callback) => {
  const ref = firebase.database().ref().child(name);
  ref.on('value', snapshot => callback(snapshot));
}

export const buyProduct = (idSaler, idProduct, lastQ, newQ, client) => {
  const refBuy = firebase.database().ref().child('salers').child(idSaler).child('products').child(idProduct);
  const refReserve = firebase.database().ref().child('reserves');
  // console.log('FIREBASE', idSaler, idProduct, quantity, ref);
  refBuy.update({ number: lastQ - newQ });
  refReserve.push({ client, quantity: newQ }, () => null);
  // Add info to buys object

  // Modify product number (-1)
};
