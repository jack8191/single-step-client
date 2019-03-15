import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config'
import {normalizeResponseErrors} from './utils';

export const FETCH_GOALS_SUCCESS = 'FETCH_GOALS_SUCCESS'
export const fetchGoalsSuccess = goals => ({
    type: FETCH_GOALS_SUCCESS,
    goals
})

export const DELETE_GOALS_SUCCESS = 'DELETE_GOALS_SUCCESS'
export const deleteGoalsSuccess = (goalId) => ({
    type: DELETE_GOALS_SUCCESS,
    goalId
})

export const SUBMIT_NEW_GOAL_SUCCESS = 'SUBMIT_NEW_GOAL_SUCCESS'
export const submitNewGoalSuccess = (goal) => ({
    type: SUBMIT_NEW_GOAL_SUCCESS,
    goal
})

export const EDIT_GOAL_SUCCESS = 'EDIT_GOAL_SUCCESS'
export const editGoalSuccess = (goal) => ({
    type: EDIT_GOAL_SUCCESS,
    goal
})


// export const NAVIGATE_TO_GOAL_EDIT = 'NAVIGATE_TO_GOAL_EDIT'
// export const navigateToGoalEdit = preEditGoal => ({
//     type: NAVIGATE_TO_GOAL_EDIT,
//     preEditGoal
// })

export const deleteGoal = (goalId) => (dispatch, getState) => {
    const authToken = getState().auth.authToken
   return  fetch(`${API_BASE_URL}/goals/${goalId}`, {
        method: 'delete',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(res.statusText)
            }
            return res
        })
        .then(res => {
            dispatch(deleteGoalsSuccess(goalId))
        })
}

export const fetchGoals = (currentUser) => (dispatch) => {
    const authToken = localStorage.authToken
    return fetch(`${API_BASE_URL}/goals/${currentUser}`, {
        method: 'get',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(res.statusText)
            }
            //console.log(res.json())
            return res.json()
        })
        .then(goals => { 
            dispatch(fetchGoalsSuccess(goals))
        })
}

export const submitNewGoal = (newGoal, isOwnedBy) => (dispatch, getState) => {
    const authToken = getState().auth.authToken
    const thisStartDate = Date.now()
    const goalBody = { 
        title: newGoal.title, 
        description: newGoal.description,
        targetDate: newGoal.targetDate,
        target: newGoal.target,
        reward: newGoal.reward,
        startDate: thisStartDate,
        ownedBy: isOwnedBy
    }
    console.log(JSON.stringify(goalBody))
    return fetch(`${API_BASE_URL}/goals`, {
        method: 'post',
        headers: {
            Authorization: `Bearer ${authToken}`,
            'content-type': 'application/json'
        },
        body: JSON.stringify(goalBody)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(res => dispatch(submitNewGoalSuccess(res)))
        .catch(err => {
            const {reason, message, location} = err;
            if (reason === 'ValidationError') {
                // Convert ValidationErrors into SubmissionErrors for Redux Form
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            }
        })
}

export const editGoal = (editedGoal, goalId) => (dispatch, getState) => {
    const authToken = getState().auth.authToken
    return fetch(`${API_BASE_URL}/goals/${goalId}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${authToken}`,
            'content-type': 'application/json'
        },
        body: JSON.stringify(editedGoal)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(res => dispatch(editGoalSuccess(res)))
        .catch(err => {
            const {reason, message, location} = err;
            if (reason === 'ValidationError') {
                // Convert ValidationErrors into SubmissionErrors for Redux Form
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            }
        })
}