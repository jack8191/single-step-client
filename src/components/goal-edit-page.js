import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {fetchGoals} from '../actions/app-actions'
import {editGoal} from '../actions/app-actions'

import GoalEditForm from './goal-edit-form'

export class GoalEditPage extends React.Component {
    static defaultProps = {
        goalToEdit: {}
    }
    componentDidMount() {
        this.props.dispatch(fetchGoals(this.props.currentUser)) 
    }
    render() {
        // if(this.props.goalEditSuccessful) {
        //     return <Redirect to="/goals"/>
        // }
        // const targetDate = this.props.goalToEdit.targetDate

        // const completionYear = targetDate.getFullYear()
        // const completionMonth = targetDate.getMonth()
        // const completionDay = targetDate.getDate()

        const targetDate = new Date(this.props.goalToEdit.targetDate)
        const readableDate = targetDate.toDateString()
        if (this.props.goalEditSuccessful) {
            return <Redirect to="/goals"/>
        }
        return (
            <div className="goalEdit">
                <div className="preEditGoal goal">
                    <h2>{this.props.goalToEdit.title}</h2>
                    <p>Description: {this.props.goalToEdit.description}</p>
                    <p>To be completed by: {readableDate}</p>
                    <p>Current progress: {this.props.goalToEdit.progress}</p>
                    <p>Completion goal: {this.props.goalToEdit.target}</p>
                    <p>Reward: {this.props.goalToEdit.reward}</p>
                </div>
                <GoalEditForm goalId={this.props.goalToEdit.id} authToken={this.props.authToken}/>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    const goalId = props.match.params.goalId
    const goal = state.app.goals.find(goal => goal.id === goalId)
    // console.log(goalId)
    // console.log(goal)
    return {
        authToken: state.auth.authToken,
        currentUser: state.auth.currentUser.username,
        goalToEdit: goal,
        goals: state.app.goals,
        goalEditSuccessful: state.app.editedGoal === true
    }
    
}

export default connect(mapStateToProps)(GoalEditPage)