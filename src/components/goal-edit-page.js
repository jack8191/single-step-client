import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {fetchGoals} from '../actions/app-actions'

import GoalEditForm from './goal-edit-form'

export class GoalEditPage extends React.Component {
    static defaultProps = {
        goalToEdit: {}
    }
    componentDidMount() {
        this.props.dispatch(fetchGoals(this.props.currentUser.username))
    }
    render() {
        const targetDate = new Date(this.props.goalToEdit.targetDate)
        const readableDate = targetDate.toDateString()
        if (this.props.goalEditSuccessful) {
            return <Redirect to="/goals"/>
        }
        return (
            <section className="goalEdit">
                <div className="preEditGoal goal">
                    <p className="app-speak">Title: </p>
                    <p>{this.props.goalToEdit.title}</p>
                    <p className="app-speak">Description: </p>
                    <p>{this.props.goalToEdit.description}</p>
                    <p className="app-speak">To be completed by: {readableDate}</p>
                    <p>Current progress: {this.props.goalToEdit.progress}</p>
                    <p>Completion goal: {this.props.goalToEdit.target}</p>
                    <p className="app-speak">Reward: </p>
                    {this.props.goalToEdit.reward}
                </div>
                <p>Enter changes to as many items as you want.</p>
                <GoalEditForm goalId={this.props.goalToEdit.id} authToken={this.props.authToken}/>
            </section>
        )
    }
}

const mapStateToProps = (state, props) => {
    const goalId = props.match.params.goalId
    const goal = state.app.goals.find(goal => goal.id === goalId)
    return {
        authToken: state.auth.authToken,
        currentUser: state.auth.currentUser,
        goalToEdit: goal,
        goals: state.app.goals,
        goalEditSuccessful: state.app.editedGoal === true
    }
    
}

export default connect(mapStateToProps)(GoalEditPage)