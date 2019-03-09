import * as actions from '../actions/app-actions'

const initialState = {
    goals: [],
    newGoal: false,
}


export const appReducer = (state=initialState, action) => {
    if (action.type === actions.FETCH_GOALS_SUCCESS) {
        return {
            ...state,
            goals: action.goals,
            newGoal: false,
        }
    }
    else if (action.type === actions.DELETE_GOALS_SUCCESS) {
        return null
    }
    else if (action.type === actions.SUBMIT_NEW_GOAL_SUCCESS) {
        return {
            ...state,
            goals:[...state.goals, action.goal],
            newGoal: true
        }
    }
    // else if(action.type === actions.NAVIGATE_TO_GOAL_EDIT) {
    //     return {
    //         ...state        }
    // }
    return state
}