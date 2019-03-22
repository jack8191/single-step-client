import React from 'react'
import {Field, reduxForm} from 'redux-form'
import Input from './input'
import {editGoal} from '../actions/app-actions'
import {notZero} from '../validators'

export class GoalEditForm extends React.Component { 
    whenSubmit(values) {
        //const {title, description, targetDate, target, reward} = values
        const editedGoal = values
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



export default reduxForm({
    form: 'goalEdit',
    // onSubmitFail: (errors, dispatch) =>
    //     dispatch(focus('goalEdit', Object.keys(errors)[0]))
})(GoalEditForm)