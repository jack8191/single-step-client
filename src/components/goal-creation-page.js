import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import GoalCreationForm from './goal-creation-form'

export function GoalCreationPage(props) {
    if(props.goalSubmissionSuccessful) {
        return <Redirect to="/goals" />
    }
    
    else {
        return (
            <section className="goalSubmission">
                <h2>Ready to make a new goal? All fields are required.</h2>
                <GoalCreationForm />
            </section>
        )}
}

const mapStateToProps = state => ({
    goals: state.app.goals,
    goalSubmissionSuccessful: state.app.newGoal === true,
    currentUser: state.auth.currentUser
})

export default connect(mapStateToProps)(GoalCreationPage)
