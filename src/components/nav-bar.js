import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import {Link, Redirect} from 'react-router-dom'

export class NavBar extends React.Component {
    logOut() {
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }

    render() {
        // Only render the log out button if we are logged in
        let logOutButton
        let navLinks
        if (this.props.authToken !== null) {
            logOutButton = (
                <button onClick={(e) => this.logOut()}>Log out</button>
                );
            navLinks = (
                <div className='nav-links'>
                    <button><Link to={'/goals'}>Goal List</Link></button>
                    <button><Link to={'/create'}>Create a New Goal</Link></button>
                </div>
            )
            return (
                <div className="nav-bar">
                <h1>Single Step</h1>
                {logOutButton}
                {navLinks}
                </div>
            )
        }
        else if (this.props.authToken === null) {
            return <Redirect to='/' />
        }
        else { 
            return null
        }
    }
}

const mapStateToProps = state => ({
    //loggedIn: state.auth.currentUser !== null,
    authToken: state.auth.authToken
});

export default connect(mapStateToProps)(NavBar);