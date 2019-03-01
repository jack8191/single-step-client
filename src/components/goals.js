import React from 'react'
import {connect} from 'react-redux'

import {fetchGoals, deleteGoal} from '../actions/app-actions'

export class Goals extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchGoals(this.props.currentUser))
        console.log(this.props)
    }
    
    onClick(e) {
        e.preventDefault()
        this.props.dispatch(deleteGoal(e.target.className))
        this.props.dispatch(fetchGoals(this.props.currentUser))
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
                    <button className={goal.id} onClick={(e) => this.onClick(e)}>Delete</button>
                </div>
                )
        })
        console.log(goalList)
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