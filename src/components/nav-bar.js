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
        let logOutButton
        let navLinks
        if (this.props.authToken !== null) {
            logOutButton = (
                <button onClick={(e) => this.logOut()}>Log Out</button>
                );
            navLinks = (
                <div className='nav-links'>
                    <Link to={'/goals'}>Goal List</Link>
                    <Link to={'/create'}>Create Goal</Link>
                </div>
            )
            return (
                <div className="nav-bar">
                    <h1>Single Step</h1>
                    {navLinks}
                    {logOutButton}
                </div>
            )
        }
        else if (this.props.authToken === null) {
            return (
                <header>
                    <h1>Single Step</h1>
                    <Redirect to='/' />
                </header>
            )
        }
        else { 
            return null
        }
    }
}

const mapStateToProps = state => ({
    authToken: state.auth.authToken
});

export default connect(mapStateToProps)(NavBar);