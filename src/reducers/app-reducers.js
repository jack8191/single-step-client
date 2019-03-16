import * as actions from '../actions/app-actions'

const initialState = {
    goals: [],
    newGoal: false,
    editedGoal: false
}


export const appReducer = (state=initialState, action) => {
    if (action.type === actions.FETCH_GOALS_SUCCESS) {
        return {
            ...state,
            goals: action.goals,
            newGoal: false,
            editedGoal: false
        }
    }
    else if (action.type === actions.DELETE_GOALS_SUCCESS) {
        console.log(state)

        const newGoalList = state.goals.filter(function(el) {
            return el.id !== action.goalId
        })
        return {
            ...state,
            goals: newGoalList
        }
    }
    else if (action.type === actions.SUBMIT_NEW_GOAL_SUCCESS) {
        return {
            ...state,
            goals:[...state.goals, action.goal],
            newGoal: true
        }
    }
    else if(action.type === actions.EDIT_GOAL_SUCCESS) {
        const newGoalList = state.goals.map(function(goal) {
            if (goal.id === action.goal.id) {
                console.log(goal)
                return action.goal
            }
            else {
                return goal
            }
            console.log(newGoalList)
        })
        return {
            ...state,
            goals: newGoalList,
            editedGoal: true      
        }
    }
    return state
}