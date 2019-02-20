import React, { Component } from 'react';
import {connect} from 'react-redux';

import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from 'react-router-dom'

import Goals from './goals'

class App extends Component {
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
        </main>
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   hasAuthToken: state.auth.authToken !== null,
//   loggedIn: state.auth.currentUser !== null
// });withRouter(connect(mapStateToProps)


export default (App);
