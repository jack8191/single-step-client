import {API_BASE_URL} from '../config'

export const FETCH_GOALS_SUCCESS = 'FETCH_BOARD_SUCCESS'
export const fetchGoalsSuccess = goals => ({
    type: FETCH_GOALS_SUCCESS,
    goals
})

export const fetchGoals = () => dispatch => {
    fetch(`${API_BASE_URL}/goals`)
        .then(res => {
            if (!res.ok) {
                return Promise.reject(res.statusText)
            }
            console.log(res)
            return res.json()
        })
        .then(goals => { 
            dispatch(fetchGoalsSuccess(goals))
        })
}