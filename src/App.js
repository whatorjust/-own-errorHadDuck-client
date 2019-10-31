import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './sign/Login';
import SignSuccess from './sign/SignSuccess';
import Signup from './sign/Signup';
import BoardList from './board/BoardList';
import NewErrorLog from './board/NewErrorLog';
import Overview from './board/Overview';
import SingleView from './board/SingleView';
import ChatBot from './ChatBot';
import Nav from './Nav';

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/signupsuccess" exact component={SignSuccess} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/boardList/:mode" exact component={BoardList} />
          <Route path="/newerrorlog/" exact component={NewErrorLog} />
          <Route path="/newerrorlog/:postid" exact component={NewErrorLog} />
          <Route path="/overview" exact component={Overview} />
          <Route path="/singleview/:postid" exact component={SingleView} />
          <Route path="/chatbot" exact component={ChatBot} />
        </Switch>
      </div>
    </Router>
  );
}
