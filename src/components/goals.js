import React from 'react'
import {connect} from 'react-redux'

import {fetchGoals, deleteGoal} from '../actions/app-actions'

export class Goals extends React.Component {
    
    componentDidMount() {
        console.log(this.props)
        this.props.dispatch(fetchGoals(this.props.currentUser))
        console.log(this.props)
        window.addEventListener('beforeunload', this.handleRefresh.bind(this))
    }
    
    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.handleRefresh.bind(this))
    }

    handleRefresh() {
        this.props.dispatch(fetchGoals(this.props.c))
    }

    onClick(goalId) {
        this.props.dispatch(deleteGoal(goalId))
            .then(() =>
            this.props.dispatch(fetchGoals()))
    }

    render() {
        const goalList = this.props.goals.map((goal, index) => {
                return(
                <div className="goal" key={index}>
                    <h2>{goal.title}</h2>
                    <p>Description: {goal.description}</p>
                    <p>Days Remaining: {goal.days}</p>
                    <p>Progress: {goal.progress}/{goal.target}</p>
                    <button>Increment Total</button>
                    <button>Edit</button>
                    <button onClick={(e) => this.onClick(goal.id)}>Delete</button>
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

export default connect(mapStateToProps)(Goals)