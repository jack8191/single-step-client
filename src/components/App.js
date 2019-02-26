import React, { Component } from 'react';
import {connect} from 'react-redux';
import {refreshAuthToken} from '../actions/auth';

import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from 'react-router-dom'

import Goals from './goals'
import RegistrationPage from './registration-page';

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
        <header className="App-header">
        </header>
        <main>
          {/* <Route exact path="/" component={Landing}/>
          <Route path="/create" component={GoalCreator}/> */}
          <Route exact path="/goals" component={Goals}/>
          {/* <Route exact path="/login" component={Login}/>
          <Route exact path="/:goalId" component={GoalEdit}/> */}
          <Route exact path="/register" component={RegistrationPage} />
        </main>
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   hasAuthToken: state.auth.authToken !== null,
//   loggedIn: state.auth.currentUser !== null
// });withRouter(connect(mapStateToProps)

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});


export default withRouter(connect(mapStateToProps)(App));
