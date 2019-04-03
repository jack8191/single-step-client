import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import {loadAuthToken} from './local-storage';
import authReducer from './reducers/auth-reducers';
import {storeAuthInfo} from './actions/auth';
import {appReducer} from './reducers/app-reducers'

const store = createStore(
    combineReducers({
        form: formReducer,
        auth: authReducer,
        app: appReducer
    }), composeWithDevTools(
    applyMiddleware(thunk)
))

const authToken = loadAuthToken();
if (authToken) {
    //const token = authToken;
    storeAuthInfo(authToken, store.dispatch)
}

export default store