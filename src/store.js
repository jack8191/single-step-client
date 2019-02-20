import {createStore} from 'redux';

import {appReducer} from './reducers/reducers'

export default createStore(appReducer)