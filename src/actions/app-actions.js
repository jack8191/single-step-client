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

export const deleteGoal = (goalId) => dispatch => {
    fetch(`${API_BASE_URL}/goals/${goalId}`, {
        method: 'delete'
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

export const fetchGoals = (currentUser) => dispatch => {
    fetch(`${API_BASE_URL}/goals/${currentUser}`)
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