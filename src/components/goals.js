import React from 'react'
import {connect} from 'react-redux'

import {fetchGoals, deleteGoal, navigateToGoalEdit} from '../actions/app-actions'
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
            .then(() =>
            this.props.dispatch(fetchGoals()))
    }

    // onEditClick(goalId) {
    //     <Redirect to={`/goaledit/${goalId}`} />
    // }
    
    
    render() {
        const goalList = this.props.goals.map((goal, index) => {
            return(
                <div className="goal" key={index}>
                <h2>{goal.title}</h2>
                <p>Description: {goal.description}</p>
                <p>Days Remaining: {goal.days}</p>
                <p>Progress: {goal.progress}/{goal.target}</p>
                <button>Increment Total</button>
                <button><Link to={`/goaledit/${goal.id}`}>Edit</Link></button>
                <button onClick={(e) => this.onDeleteClick(goal.id)}>Delete</button>
            </div>
            )
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