import {
    SET_AUTH_TOKEN,
    setAuthToken,
    CLEAR_AUTH,
    clearAuth,
    AUTH_REQUEST,
    authRequest,
    AUTH_SUCCESS,
    authSuccess,
    AUTH_ERROR,
    authError,
    refreshAuthToken
}
from './auth'

import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('setAuthToken', () => {
    it('should return the action', () => {
        const authToken = 'authToken'
        const action = setAuthToken(authToken)
        expect(action.type).toEqual(SET_AUTH_TOKEN)
        expect(action.authToken).toEqual(authToken)
    })
})

describe('clearAuth', () => {
    it('should return the action', () => {
        const action = clearAuth()
        expect(action.type).toEqual(CLEAR_AUTH)
    })
})

describe('authRequest', () => {
    it('should return the action', () => {
        const action = authRequest()
        expect(action.type).toEqual(AUTH_REQUEST)
    })
})

describe('authSuccess', () => {
    it('should return the action', () => {
        const currentUser = 'wingus'
        const action = authSuccess(currentUser)
        expect(action.type).toEqual(AUTH_SUCCESS)
        expect(action.currentUser).toEqual(currentUser)
    })
})

describe('authError', () => {
    it('should return the action', () => {
        const error = 'you messed up'
        const action = authError(error)
        expect(action.type).toEqual(AUTH_ERROR)
        expect(action.error).toEqual(error)
    })
})

describe('refreshAuthToken', () => {
    it('should dispatch the correct action', () => {
        const store = mockStore({auth: {authToken: 7}})
        const dispatch = jest.fn()
        const getState = store.getState
        global.fetch = jest.fn().mockImplementation(() => 
            Promise.resolve({
                ok: true,
                json() {
                    return {
                        authToken: store.auth.authToken
                    }
                }
            })
        )
        return refreshAuthToken()(dispatch, getState).then(() => {
            expect(dispatch).toHaveBeenCalledWith(clearAuth())
        })
    })
})




