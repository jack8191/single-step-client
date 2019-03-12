import React from 'react'
import {Field, reduxForm, focus} from 'redux-form'
import {connect} from 'react-redux'
import Input from './input'
import {editGoal} from '../actions/app-actions'
import {notToday, notZero} from '../validators'

export class GoalEditForm extends React.Component { 
    whenSubmit(values) {
        const {title, description, targetDate, target, reward} = values
        const editedGoal = {title, description, targetDate, target, reward}
        // const newGoal = {}
        // for (const key in values) {
        //     if(values.key !== '') {
        //         newGoal.key = values.key
        //     }
        // }
        console.log(editedGoal, this.props.goalId, this.props.authToken)
        return this.props.dispatch(editGoal(editedGoal, this.props.goalId))
    }

    render() {
        return (
            <form
                className="edit-goal-form"
                onSubmit={this.props.handleSubmit(values => this.whenSubmit(values))}>
                <label htmlFor="title">Title</label>
                <Field
                    component={Input}
                    type="text"
                    name="title"
                    //validate={[isTrimmed]}
                />
                <label htmlFor="description">Description</label>
                <Field
                    component={Input}
                    type="text"
                    name="description"
                    //validate={[isTrimmed]}
                />
                <label htmlFor="targetDate">Completion Date</label>
                <Field
                    component={Input}
                    type="date"
                    name="targetDate"
                    //validate={[notToday]}
                />
                <label htmlFor="progress">Current Progress</label>
                <Field
                    component={Input}
                    type="number"
                    name="progress"
                    validate={[]}
                />
                <label htmlFor="target">How Many Times?</label>
                <Field
                    component={Input}
                    type="number"
                    name="target"
                    validate={[notZero]}
                />
                <label htmlFor="reward">Name Your New Reward!</label>
                <Field 
                    component={Input}
                    type="text"
                    name="reward"
                    //validate={[isTrimmed]}
                />
                <button type="submit">Submit</button>
            </form>
        )
    }
}

// const mapStateToProps = (state, props) => {
//     const goalId = props.match.params.goalId
//     const goal = state.app.goals.find(goal => goal.id === goalId)

//     return {
//         goalId: goal.id
//     }
// }

// GoalEditForm = connect(
//     mapStateToProps
// )(GoalEditForm)

export default reduxForm({
    form: 'goalEdit',
    // onSubmitFail: (errors, dispatch) =>
    //     dispatch(focus('goalEdit', Object.keys(errors)[0]))
})(GoalEditForm)