import {API_BASE_URL} from '../config'

export const FETCH_GOALS_SUCCESS = 'FETCH_GOALS_SUCCESS'
export const fetchGoalsSuccess = goals => ({
    type: FETCH_GOALS_SUCCESS,
    goals
})

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