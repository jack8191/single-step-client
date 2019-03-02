import {API_BASE_URL} from '../config'

export const FETCH_GOALS_SUCCESS = 'FETCH_GOALS_SUCCESS'
export const fetchGoalsSuccess = goals => ({
    type: FETCH_GOALS_SUCCESS,
    goals
})

export const DELETE_GOALS_SUCCESS = 'DELETE_GOALS_SUCCESS'
export const deleteGoalsSuccess = () => ({
    type: DELETE_GOALS_SUCCESS
})

export const deleteGoal = (goalId) => (dispatch, getState) => {
    const authToken = getState().auth.authToken
    fetch(`${API_BASE_URL}/goals/${goalId}`, {
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

export const fetchGoals = (currentUser) => (dispatch, getState) => {
    const authToken = getState().auth.authToken
    fetch(`${API_BASE_URL}/goals/${currentUser}`, {
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