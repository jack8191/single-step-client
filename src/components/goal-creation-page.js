import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import GoalCreationForm from './goal-creation-form'

export function GoalCreationPage(props) {
    if(props.goalSubmissionSuccessful) {
        return <Redirect to="/goals" />
    }
    return (
        <div className="goalSubmission">
            <h2>Ready to make a new goal?</h2>
            <GoalCreationForm />
        </div>
    )
}

const mapStateToProps = state => ({
    goals: state.app.goals,
    goalSubmissionSuccessful: state.app.newGoal === true
})

export default connect(mapStateToProps)(GoalCreationPage)
