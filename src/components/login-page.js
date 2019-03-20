import React from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'

import LoginForm from './login-form'

export function LoginPage(props) {
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/goals" />
    }
    else if (props.loggedOut) {
        return (
            <div className="home">
            <h2>Log in here!</h2>
            <LoginForm />
            <Link to="/register">No account?</Link>
        </div>
    )}
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    loggedOut: state.auth.currentUser === null
})

export default connect(mapStateToProps)(LoginPage)