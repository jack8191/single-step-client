import React from 'react'
import {connect} from 'react-redux'

import {fetchGoals, deleteGoal, editGoal} from '../actions/app-actions'
import {Link} from 'react-router-dom'

export class Goals extends React.Component {
    
    componentDidMount() {
        if(this.props.currentUser !== null) {
            this.props.dispatch(fetchGoals(this.props.currentUser.username))
        }
    }

    onDeleteClick(goalId) {
        this.props.dispatch(deleteGoal(goalId))
    }

    onIncrementClick(currentProgress, goalId) {
        const incrementedProgress = ++currentProgress
        console.log({progress: incrementedProgress})
        this.props.dispatch(editGoal({progress: incrementedProgress}, goalId))
    }
    
    
    render() {
        const goalList = this.props.goals.map((goal, index) => {
            if (goal.progress >= goal.target) {
                return (
                    <div className="goal" key={index}>
                        <p className="app-speak">Congratulations!</p>
                        <p>You've completed {goal.title}!</p>
                        <p className="app-speak">Your reward awaits!</p> 
                        <p>{goal.reward}</p>
                        <button onClick={(e) => this.onDeleteClick(goal.id)}>Delete</button>
                    </div>
                )
            }
            else if (goal.targetDate >= Date.now()) {
                const targetDate = new Date(goal.targetDate)
                const readableDate = targetDate.toDateString()
                return (
                    <div className="goal" key={index}>
                        <p className="app-speak">Title: </p>
                        <p>{goal.title}</p>
                        <p className="app-speak">Description: </p>
                        <p>{goal.description}</p>
                        <p className="app-speak">To be completed by: </p>
                        <p>{readableDate}</p>
                        <p className="app-speak">Looks like you've missed your target date. No worries! 
                            Keep adding to that progress and your reward waits regardless!
                        </p>
                        <p>Progress: {goal.progress}/{goal.target}</p>
                        <button className="single-step" onClick={(e) => this.onIncrementClick(goal.progress, goal.id)}>Single Step!</button>
                        <Link to={`/goaledit/${goal.id}`}>Edit</Link>
                        <button onClick={(e) => this.onDeleteClick(goal.id)}>Delete</button>
                    </div>
                )
            }
            else {
                const targetDate = new Date(goal.targetDate)
                const readableDate = targetDate.toDateString()
                return(
                    <div className="goal" key={index}>
                        <p className="app-speak">Title: </p>
                        <p>{goal.title}</p>
                        <p className="app-speak">Description: </p>
                        <p>{goal.description}</p>
                        <p className="app-speak">To be finished by: </p>
                        <p>{readableDate}</p>
                        <p>Progress: {goal.progress}/{goal.target}</p>
                        <button className="single-step" onClick={(e) => this.onIncrementClick(goal.progress, goal.id)}>Single Step!</button>
                        <Link to={`/goaledit/${goal.id}`}>Edit</Link>
                        <button onClick={(e) => this.onDeleteClick(goal.id)}>Delete</button>
                    </div>
                )
            }
        })
        // if (this.props.loggedOut) {
        //     return <Redirect to='/' />
        // }
            return (
                <section className="goal-list">
                    {goalList}
                </section>
            )
    }
}


const mapStateToProps = state => ({
    goals: state.app.goals,
    currentUser: state.auth.currentUser,
    //loggedOut: state.auth.currentUser === null
})

//pass in full user object in props
//pass through loading

export default connect(mapStateToProps)(Goals)