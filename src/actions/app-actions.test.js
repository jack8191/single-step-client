import {FETCH_GOALS_SUCCESS, 
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

import API_BASE_URL from '../config'

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
        const state = mockStore({auth: {authToken: 7}})

        global.fetch = jest.fn().mockImplementation(() => 
            Promise.resolve({
                ok: true
            })
        )
        const dispatch = jest.fn()
        const getState = state.getState 
        return deleteGoal(goalId)(dispatch, getState).then(() => {
            expect(dispatch).toHaveBeenCalledWith(deleteGoalsSuccess(goalId))
        })
    })
})


