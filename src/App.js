import 'antd/dist/antd.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Layout, Icon, BackTop } from 'antd';
import unload from 'unload';
import cookie from 'react-cookies';
import { Login, SignSuccess, Signup } from './sign/sign';
// import Login from './sign/Login';
// import SignSuccess from './sign/SignSuccess';
// import Signup from './sign/Signup';
import { BoardList, Overview, SingleView } from './board/board';
// import BoardList from './board/BoardList';
// import Overview from './board/Overview';
// import SingleView from './board/SingleView';
import ChatBot from './chat/ChatBot';
import { Nav, Err404, Err500 } from './src';
// import Nav from './Nav';
// import Err404 from './Err404';
// import Err500 from './Err500';
import './App.css';

unload.add(() => {
  cookie.remove('oreo');
  localStorage.clear();
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLogin: false };
    this.handleLogout = this.handleLogout.bind(this);
    this.handleLoginState = this.handleLoginState.bind(this);
  }

  componentDidMount() {
    if (JSON.parse(localStorage.getItem('isLogin'))) {
      this.setState({ isLogin: true });
    }
  }

  handleLoginState() {
    this.setState({ isLogin: true });
  }

  handleLogout() {
    localStorage.setItem('isLogin', false);
    localStorage.setItem('chats', null);

    this.setState({ isLogin: false });
  }

  render() {
    const { isLogin } = this.state;
    const { Header, Footer, Content } = Layout;
    return (
      <Router>
        <Layout>
          <Header>{isLogin && <Nav handleLogout={this.handleLogout} />}</Header>
          <Content>
            <div className="container">
              <Switch>
                <Route path="/404page" exact component={Err404} />
                <Route path="/500page" exact component={Err500} />
                <Route
                  path="/"
                  exact
                  component={() => (
                    <Login
                      isLogin={isLogin}
                      handleLoginState={this.handleLoginState}
                    />
                  )}
                />
                <Route path="/signupsuccess" exact component={SignSuccess} />
                <Route path="/signup" exact component={Signup} />
                <Route
                  path="/boardList/:mode"
                  render={props => (
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    <BoardList key={props.match.params.mode} {...props} />
                  )}
                />

                <Route path="/overview" exact component={Overview} />

                {/* only write mode */}
                <Route
                  path="/singleview"
                  exact
                  component={() => <SingleView isLogin={isLogin} />}
                />

                {/* update, delete, read mode */}
                <Route
                  path="/singleview/:postid"
                  exact
                  component={SingleView}
                />
                <Route
                  path="/chatbot"
                  exact
                  component={() => <ChatBot isLogin={isLogin} />}
                />
              </Switch>
            </div>
            <BackTop />
          </Content>
          <Footer>
            <p>
              <Icon type="number" /> TEAM QUACK
            </p>
            <p>
              <Icon type="team" /> 이해준, 조아라, 박강호
            </p>
            <p>Copyright (c) 2019 에러해결했덕</p>
          </Footer>
        </Layout>
      </Router>
    );
  }
}
