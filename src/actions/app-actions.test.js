import {
    FETCH_GOALS_SUCCESS, 
    fetchGoalsSuccess, 
    DELETE_GOALS_SUCCESS, 
    deleteGoalsSuccess,
    SUBMIT_NEW_GOAL_SUCCESS,
    submitNewGoalSuccess,
    EDIT_GOAL_SUCCESS,
    editGoalSuccess,
    deleteGoal,
    fetchGoals,
    submitNewGoal,
    editGoal
} 
from './app-actions'

import {API_BASE_URL} from '../config'

import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)


describe('fetchGoalsSuccess', () => {
    it('should return the action', () => {
        const goals = 'some goals'
        const action = fetchGoalsSuccess(goals)
        expect(action.type).toEqual(FETCH_GOALS_SUCCESS)
        expect(action.goals).toEqual(goals)
    })
})

describe('deleteGoalsSuccess', () => {
    it('should return the action', () => {
        const goalId = 5
        const action = deleteGoalsSuccess(goalId)
        expect(action.type).toEqual(DELETE_GOALS_SUCCESS)
        expect(action.goalId).toEqual(goalId)
    })
})

describe('submitNewGoalSuccess', () => {
    it('should return the action', () => {
        const goal = 5
        const action = submitNewGoalSuccess(goal)
        expect(action.type).toEqual(SUBMIT_NEW_GOAL_SUCCESS)
        expect(action.goal).toEqual(goal)
    })
})

describe('editGoalSuccess', () => {
    it('should return the action', () => {
        const goal = 5
        const action = editGoalSuccess(goal)
        expect(action.type).toEqual(EDIT_GOAL_SUCCESS)
        expect(action.goal).toEqual(goal)
    })
})

describe('deleteGoal', () => {
    it('should dispatch deleteGoalSuccess', () => {
        const goalId = 5
        const store = mockStore({auth: {authToken: 7}})

        global.fetch = jest.fn().mockImplementation(() => 
            Promise.resolve({
                ok: true
            })
        )
        const dispatch = jest.fn()
        const getState = store.getState 
        return deleteGoal(goalId)(dispatch, getState).then(() => {
            expect(dispatch).toHaveBeenCalledWith(deleteGoalsSuccess(goalId))
        })
    })
})

describe('fetchGoals', () => {
    it('should dispatch fetchGoalsSuccess', () => {
        const currentUser = 'wingus'
        const store = mockStore({auth: {authToken: 7}})
        const goalList = {goal: 'goal'}
        global.fetch = jest.fn().mockImplementation(() => 
            Promise.resolve({
                ok: true,
                json() {
                    return goalList
                }
            })
        )
        const dispatch = jest.fn()
        const getState = store.getState
        return fetchGoals(currentUser)(dispatch, getState).then(() => {
            expect(dispatch).toHaveBeenCalledWith(fetchGoalsSuccess(goalList))
        })
    })
})

describe('submitNewGoal', () => {
    it('should dispatch submitNewGoalSuccess', () => {
        const newGoal = {title: 'newGoal'}
        const isOwnedBy = 'wingus'
        const store = mockStore({auth: {authToken: 7}})
        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json() {
                    return newGoal
                }
            })
        )
        const dispatch = jest.fn()
        const getState = store.getState
        return submitNewGoal(newGoal, isOwnedBy)(dispatch, getState).then(() => {
            expect(dispatch).toHaveBeenCalledWith(submitNewGoalSuccess(newGoal))
        })
    })
})

describe('editGoal', () => {
    it('should dispatch editGoalSuccess', () => {
        const editedGoal = {title: 'six'}
        const goalId = 5
        const store = mockStore({auth: {authToken: 7}})
        global.fetch = jest.fn().mockImplementation(() => 
        Promise.resolve({
            ok: true,
            json() {
                return editedGoal
            }
            })
        )
        const dispatch = jest.fn()
        const getState = store.getState
        return editGoal(editedGoal, goalId)(dispatch, getState).then(() => {
            expect(dispatch).toHaveBeenCalledWith(editGoalSuccess(editedGoal))
        })
    })
})
