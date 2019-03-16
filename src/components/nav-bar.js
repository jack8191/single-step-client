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
        let logOutButton;
        let navLinks
        if (this.props.loggedIn) {
            logOutButton = (
                <button onClick={(e) => this.logOut()}>Log out</button>
                );
            navLinks = (
                <div className='nav-links'>
                    <button><Link to={'/goals'}>Goal List</Link></button>
                    <button><Link to={'/create'}>Create a New Goal</Link></button>
                </div>
            )
        }
        else if (this.props.unauthorized) {
            return <Redirect to={'/'} />
        }
        return (
            <div className="nav-bar">
            <h1>Single Step</h1>
            {logOutButton}
            {navLinks}
        </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    unauthorized: state.auth.authToken === null
});

export default connect(mapStateToProps)(NavBar);