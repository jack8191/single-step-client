import * as actions from '../actions/app-actions'

const initialState = {
    goals: [
    ]
}

export const appReducer = (state=initialState, action) => {
    if (action.type === actions.FETCH_GOALS_SUCCESS) {
        return Object.assign({}, state, {
            ...state,
            goals: action.goals
        })
    }
    return state
}