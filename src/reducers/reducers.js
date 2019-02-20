const initialState = {
    goals: [
        {
            title: 'Change Sheets!',
            description: 'Make sure to keep that bed neat and fresh! Twice in two weeks!',
            days: 7,
            progress: 1,
            target: 2,
            reward: 'you have the satisfaction of clean sheets!',
            complete: false
        },
        {
            title: 'Change Sheets!',
            description: 'Make sure to keep that bed neat and fresh! Twice in two weeks!',
            days: 7,
            progress: 2,
            target: 2,
            reward: 'you have the satisfaction of clean sheets',
            complete: true
        }
    ]
}

export const appReducer = (state=initialState) => {
    return state
}