import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './sign/Login';
import SignSuccess from './sign/SignSuccess';
import Signup from './sign/Signup';
import BoardList from './board/BoardList';
import Overview from './board/Overview';
import SingleView from './board/SingleView';
import ChatBot from './chat/ChatBot';
import Nav from './Nav';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { userid: null, isLogin: false };
    this.saveUserid = this.saveUserid.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    const { userid } = this.state;
    const localid = JSON.parse(localStorage.getItem('userid'));

    if (userid === null && localid !== null) {
      this.setState({ userid: Number(localid), isLogin: true });
    }
  }

  saveUserid(userid) {
    this.setState({ userid, isLogin: true });
  }

  handleLogout() {
    localStorage.setItem('userid', null);
    localStorage.setItem('isLogin', false);
    localStorage.setItem('chats', null);

    this.setState({ isLogin: false, userid: null });
  }

  render() {
    const { userid, isLogin } = this.state;

    return (
      <Router>
        {isLogin && <Nav handleLogout={this.handleLogout} />}

        <div className="container">
          <Switch>
            <Route
              path="/"
              exact
              component={() => (
                <Login saveUserid={this.saveUserid} isLogin={isLogin} />
              )}
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
