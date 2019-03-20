import {appReducer} from './app-reducers'
import authReducer from './auth-reducers'
import {
    fetchGoalsSuccess, 
    deleteGoalsSuccess, 
    submitNewGoalSuccess, 
    editGoalSuccess} from '../actions/app-actions'
import {
    setAuthToken,
    clearAuth,
    authRequest,
    authSuccess,
    authError
} from '../actions/auth'

describe('appReducer', () => {
    const goal = {
        id: 56,
        title: 'wooong',
        description: 'wung',
    }
    it('Should set the initial state when nothing is passed in', () => {
        const state = appReducer(undefined, {type: '__UNKNOWN'});
        expect(state).toEqual({
            goals: [],
            newGoal: false,
            editedGoal: false
        })
    })
    describe('fetchGoalsSuccess', () => {
        it('should add a list of goals to the state', () => {
            let state
            state = appReducer(state, fetchGoalsSuccess(goal))
            expect(state.goals).toEqual(goal)
        })
    })
    describe('deleteGoalsSuccess', () => {
        it('should delete a goal in the state based on its id', () => {
            let state
            state = {
                goals: [goal]
            }
            state = appReducer(state, deleteGoalsSuccess(56))
            expect(state.goals).toEqual([])
        })
    })
    describe('submitNewGoalSuccess', () => {
        it('should result in a new goal in the store', () => {
            let state
            state = appReducer(state, submitNewGoalSuccess(goal))
            expect(state.goals).toEqual([goal])
        })
    })
    describe('editGoalSuccess', () => {
        it('should overwrite a goal with an edited version of that goal', () => {
            let state
            state = {
                goals: [goal]
            }
            const newGoal = {
                id: 56,
                title: 'been edited'
            }
            state = appReducer(state, editGoalSuccess(newGoal))
            expect(state.goals[0].title).toEqual(newGoal.title)
        })
    })
})

describe('authReducer', () => {
    const authToken = 7
    const currentUser = 'blumbo'
    describe('setAuthToken', () => {
        it('should set a new auth token into the state', () => {
            let state
            state = authReducer(state, setAuthToken(authToken))
            expect(state.authToken).toEqual(authToken)
        })
    })
    describe('clearAuth', () => {
        it('should remove the authToken and currentUser', () => {
            let state
            state = {
                currentUser: currentUser,
                authToken: authToken
            }
            state = authReducer(state, clearAuth())
            expect(state).toEqual({authToken: null, currentUser: null})
        })
    })
    describe('authRequest', () => {
        it('should set loading to true with no error', () => {
            let state
            state = authReducer(state, authRequest())
            expect(state.loading).toEqual(true)
            expect(state.error).toEqual(null)
        })
    })
    describe('authSuccess', () => {
        it('should set a currentUser and end loading', () => {
            let state
            state ={
                loading: true
            }
            state = authReducer(state, authSuccess(currentUser))
            expect(state.loading).toEqual(false)
            expect(state.currentUser).toEqual(currentUser)
        })
    })
    describe('authError', () => {
        it('should return an error', () => {
            let state
            const error = 'it messed up'
            state = authReducer(state, authError(error))
            expect(state.error).toEqual(error)
            expect(state.loading).toEqual(false)
        })
    })
}) 






