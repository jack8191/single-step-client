import React from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'

import RegistrationForm from './registration-form'

export function RegistrationPage(props) {
    if (props.loggedIn) {
        return <Redirect to="/goals" />
    }
    return (
        <section className="register">
            <h2>Account Creation</h2>
            <RegistrationForm />
            <Link to="/login">Already have an account?</Link>
        </section>
    )
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
})

export default connect(mapStateToProps)(RegistrationPage)