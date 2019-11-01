import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './sign/Login';
import SignSuccess from './sign/SignSuccess';
import Signup from './sign/Signup';
import BoardList from './board/BoardList';
import Overview from './board/Overview';
import SingleView from './board/SingleView';
import ChatBot from './chat/ChatBot';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { userid: null };
    this.saveUserid = this.saveUserid.bind(this);
  }

  saveUserid(userid) {
    this.setState({ userid });
  }

  render() {
    const { userid } = this.state;
    return (
      <Router>
        <div>
          <Switch>
            <Route
              path="/"
              exact
              component={() => <Login saveUserid={this.saveUserid} />}
            />
            <Route path="/signupsuccess" exact component={SignSuccess} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/boardList/:mode" exact component={BoardList} />
            <Route path="/overview" exact component={Overview} />

            {/* only write mode */}
            <Route
              path="/singleview"
              exact
              component={() => <SingleView userid={userid} />}
            />

            {/* update, delete, read mode */}
            <Route path="/singleview/:postid" exact component={SingleView} />
            <Route path="/chatbot" exact component={ChatBot} />
          </Switch>
        </div>
      </Router>
    );
  }
}
