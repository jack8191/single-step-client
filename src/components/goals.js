import React from 'react'
import {connect} from 'react-redux'

export class Goals extends React.Component {
    render() {
        const goalList = this.props.goals.map((goal, index) => {
            if (goal.complete === false) {
                return(
                <div className="goal">
                    <h2>{goal.title}</h2>
                    <ul>
                        <li>Description: {goal.description}</li>
                        <li>Days Remaining: {goal.days}</li>
                        <li>Progress: {goal.progress}/{goal.target}</li>
                    </ul>
                    <button>Increment Total</button>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
                )
            }
            else if (goal.complete === true) {
                return(
                    <div class="goal">
                        <h2>{goal.title}</h2>
                        <ul>
                            <li>You did it!</li>
                            <li>{goal.reward}</li>
                        </ul>
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