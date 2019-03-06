import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config'
import {normalizeResponseErrors} from './utils';

export const FETCH_GOALS_SUCCESS = 'FETCH_GOALS_SUCCESS'
export const fetchGoalsSuccess = goals => ({
    type: FETCH_GOALS_SUCCESS,
    goals
})

export const DELETE_GOALS_SUCCESS = 'DELETE_GOALS_SUCCESS'
export const deleteGoalsSuccess = () => ({
    type: DELETE_GOALS_SUCCESS
})

export const SUBMIT_NEW_GOAL_SUCCESS = 'SUBMIT_NEW_GOAL_SUCCESS'
export const submitNewGoalSuccess = (goal) => ({
    type: SUBMIT_NEW_GOAL_SUCCESS,
    goal
})

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
            dispatch(deleteGoalsSuccess())
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

export const submitNewGoal = (newGoal) => (dispatch, localStorage) => {
    const authToken = localStorage.auth.authToken
    const thisStartDate = Date.now()
    const isOwnedBy = localStorage.auth.currentUser.username
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