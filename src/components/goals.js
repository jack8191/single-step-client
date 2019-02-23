import React from 'react'
import {connect} from 'react-redux'

import {fetchGoals} from '../actions/actions'

export class Goals extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchGoals())
    }
    
    render() {
        const goalList = this.props.goals.map((goal, index) => {
            if (goal.complete === false) {
                return(
                <div className="goal" key={index}>
                    <h2>{goal.title}</h2>
                    <p>Description: {goal.description}</p>
                    <p>Days Remaining: {goal.days}</p>
                    <p>Progress: {goal.progress}/{goal.target}</p>
                    <button>Increment Total</button>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
                )
            }
            else if (goal.complete === true) {
                return(
                    <div className="goal" key={index}>
                        <h2>{goal.title}</h2>
                            <p>You did it!</p>
                            <p>{goal.reward}</p>
                        <button>Delete</button>
                    </div>
                )
            }
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
    goals: state.goals
})

export default connect(mapStateToProps)(Goals)