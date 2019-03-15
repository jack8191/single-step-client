import React from 'react'
import {connect} from 'react-redux'

import {fetchGoals, deleteGoal, navigateToGoalEdit, editGoal} from '../actions/app-actions'
import {Redirect, Link} from 'react-router-dom'

export class Goals extends React.Component {
    
    componentDidMount() {
        console.log(this.props)
        this.props.dispatch(fetchGoals(this.props.currentUser))
        console.log(this.props)
       // window.addEventListener('beforeunload', this.handleRefresh.bind(this))
    }
    
    // componentWillUnmount() {
    //     window.removeEventListener('beforeunload', this.handleRefresh.bind(this))
    // }

    // handleRefresh() {
    //     this.props.dispatch(fetchGoals(this.props.c))
    // }

    onDeleteClick(goalId) {
        this.props.dispatch(deleteGoal(goalId))
            // .then(() =>
            // this.props.dispatch(fetchGoals()))
    }

    onIncrementClick(currentProgress, goalId) {
        const incrementedProgress = ++currentProgress
        console.log({progress: incrementedProgress})
        this.props.dispatch(editGoal({progress: incrementedProgress}, goalId))
    }

    // onEditClick(goalId) {
    //     <Redirect to={`/goaledit/${goalId}`} />
    // }
    
    
    render() {
        const goalList = this.props.goals.map((goal, index) => {
            if (goal.progress >= goal.target) {
                return (
                    <div className="goal" key={index}>
                        <h2>Congratulations!</h2>
                        <p>You've completed {goal.title}!</p>
                        <p>Here's your reward! {goal.reward}</p>
                        <button onClick={(e) => this.onDeleteClick(goal.id)}>Delete</button>
                    </div>
                )
            }
            else if (goal.targetDate >= Date.now()) {
                const targetDate = new Date(goal.targetDate)
                const readableDate = targetDate.toDateString()
                return (
                    <div className="goal" key={index}>
                    <h2>{goal.title}</h2>
                    <p>Description: {goal.description}</p>
                    <p>To be finished by: {readableDate}</p>
                    <p>Looks like you've missed your target date. No worries! 
                        Keep adding to that progress and your reward waits regardless!
                    </p>
                    <p>Progress: {goal.progress}/{goal.target}</p>
                    <button onClick={(e) => this.onIncrementClick(goal.progress, goal.id)}>Single Step!</button>
                    <button><Link to={`/goaledit/${goal.id}`}>Edit</Link></button>
                    <button onClick={(e) => this.onDeleteClick(goal.id)}>Delete</button>
                </div>
                )
            }
            else {
                const targetDate = new Date(goal.targetDate)
                const readableDate = targetDate.toDateString()
                return(
                    <div className="goal" key={index}>
                        <h2>{goal.title}</h2>
                        <p>Description: {goal.description}</p>
                        <p>To be finished by: {readableDate}</p>
                        <p>Progress: {goal.progress}/{goal.target}</p>
                        <button onClick={(e) => this.onIncrementClick(goal.progress, goal.id)}>Single Step!</button>
                        <button><Link to={`/goaledit/${goal.id}`}>Edit</Link></button>
                        <button onClick={(e) => this.onDeleteClick(goal.id)}>Delete</button>
                    </div>
                )
            }
        })
            return (
                <div className="goal-list">
                    {goalList}
                </div>
            )
    }
}


const mapStateToProps = state => ({
    goals: state.app.goals,
    currentUser: state.auth.currentUser.username
})

//pass in full user object in props
//pass through loading

export default connect(mapStateToProps)(Goals)