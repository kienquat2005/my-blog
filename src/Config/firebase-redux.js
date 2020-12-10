import {combineReducers, createStore} from 'redux';
import {firebaseReducer} from 'react-redux-firebase';
import firebase from 'firebase/app';
import 'firebase/auth';        // for authentication
import 'firebase/storage';     // for storage
import 'firebase/database';    // for realtime database
import 'firebase/firestore';   // for cloud firestore
const rootReducer = combineReducers({
    firebase: firebaseReducer
})

const initialState = {};
const store = createStore(rootReducer, initialState);
const rrfConfig = {

}
const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch
};

export function getReduxStore() {
    return store;
};
export function getRrfProp() {
    return rrfProps;
};