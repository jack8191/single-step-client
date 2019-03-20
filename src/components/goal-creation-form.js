import React from 'react'
import {Field, reduxForm, focus} from 'redux-form'
import Input from './input'
import {connect} from 'react-redux'
import {submitNewGoal} from '../actions/app-actions'
import {required, nonEmpty, isTrimmed, notZero} from '../validators'

export class GoalCreationForm extends React.Component {
    onSubmit(values) {
        const {title, description, targetDate, target, reward} = values
        const newGoal = {title, description, targetDate, target, reward}
        return this.props.dispatch(submitNewGoal(newGoal, this.props.username))
    }

    render() {
        return (
            <form
                className="new-goal-form"
                onSubmit={this.props.handleSubmit(values => this.onSubmit(values)
            )}>
                <label htmlFor="title">Title</label>
                <Field
                    component={Input}
                    type="text"
                    name="title"
                    validate={[required, nonEmpty, isTrimmed]}
                />
                <label htmlFor="description">Description</label>
                <Field
                    component={Input}
                    type="text"
                    name="description"
                    validate={[required, nonEmpty, isTrimmed]}
                />
                <label htmlFor="targetDate">Completion Date</label>
                <Field
                    component={Input}
                    type="date"
                    name="targetDate"
                    validate={[required, nonEmpty]}
                />
                <label htmlFor="target">How Many Times?</label>
                <Field
                    component={Input}
                    type="number"
                    name="target"
                    validate={[required, nonEmpty, notZero]}
                />
                <label htmlFor="reward">Name Your Reward!</label>
                <Field 
                    component={Input}
                    type="text"
                    name="reward"
                    validate={[required, nonEmpty, isTrimmed]}
                />
                <button type="submit">Submit</button>
            </form>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        userId: state.auth.currentUser.userId,
        username: state.auth.currentUser.username
    }
}

GoalCreationForm = connect(
    mapStateToProps
)(GoalCreationForm)

export default reduxForm({
    form: 'goalCreation',
    // onSubmitFail: (errors, dispatch) =>
    //     dispatch(focus('goalCreation', Object.keys(errors)[0]))
})(GoalCreationForm)