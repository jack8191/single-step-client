import React, { Component } from 'react';
import {connect} from 'react-redux';
import {refreshAuthToken} from '../actions/auth';
import './styles.css'

import {
  Route,
  withRouter
} from 'react-router-dom'

import Goals from './goals'
import GoalCreationPage from './goal-creation-page'
import RegistrationPage from './registration-page';
import LoginPage from './login-page'
import GoalEditPage from './goal-edit-page'
import LandingPage from './landing'
import NavBar from './nav-bar'

class App extends Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
        this.startPeriodicRefresh();
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
        this.stopPeriodicRefresh();
    }
}

componentWillUnmount() {
    this.stopPeriodicRefresh();
}

startPeriodicRefresh() {
    this.refreshInterval = setInterval(
        () => this.props.dispatch(refreshAuthToken()),
        60 * 60 * 1000 
    );
}

stopPeriodicRefresh() {
    if (!this.refreshInterval) {
        return;
    }

    clearInterval(this.refreshInterval);
}

  render() {
    return (
      <div className="App">
        <nav className="App-nav" aria-live="polite">
          <NavBar />
        </nav>
        <main aria-live="polite">
          <Route exact path="/" component={LandingPage}/>
          <Route exact path="/create" component={GoalCreationPage}/>
          <Route exact path="/goals" component={Goals}/>
          <Route exact path="/login" component={LoginPage}/>
          <Route path="/goaledit/:goalId" component={GoalEditPage}/>
          <Route exact path="/register" component={RegistrationPage} />
        </main>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});


export default withRouter(connect(mapStateToProps)(App));
