import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

import { Layout } from 'antd';

import 'antd/dist/antd.css';
import './sign.css';

import WrappedLoginForm from './LoginForm';

const { Header, Footer, Content } = Layout;
const axios = require('axios');

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idValue: '',
      pwdValue: '',
      noInput: false,
      noid: false,
      nopw: false,
      serverErr: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLoginBtn = this.handleLoginBtn.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleInputChange = (e, stateKey) => {
    this.setState({ [stateKey]: e.target.value });
  };

  handleLoginBtn = () => {
    const { idValue, pwdValue, noid, nopw } = this.state;
    const { handleLoginState } = this.props;
    // 기존 오류 메세지 초기화
    if (noid || nopw) {
      this.setState({ noid: false, nopw: false });
    }

    // 아이디나 비번 미입력시 예외처리
    if (idValue === '' || pwdValue === '') {
      this.setState({ noInput: true });
      return;
    }

    const instance = axios.create({
      timeout: 1000
    });

    instance
      .post('/users/login', { username: idValue, password: pwdValue })
      .then(() => {
        localStorage.setItem('isLogin', true);
        handleLoginState();
      })
      .catch(({ response }) => {
        if (response.status === 500) {
          this.setState({ serverErr: true });
          return;
        }
        if (response.status === 400) {
          if (response.data.msg === 'username') {
            this.setState({ noid: true });
            return;
          }
          if (response.data.msg === 'password') {
            this.setState({ nopw: true });
          }
        }
      });
  };

  render() {
    const { idValue, pwdValue, noInput, noid, nopw, serverErr } = this.state;
    const { isLogin } = this.props;

    return (
      <div>
        <Layout>
          <Header>Header</Header>
          <Content>
            <WrappedLoginForm />
            {isLogin ? (
              <Redirect to="/overview" />
            ) : (
              <div>
                <div>
                  {noInput && (
                    <span>아이디나 비밀번호가 입력되지 않았습니다.</span>
                  )}
                  {noid && <span>아이디가 틀립니다.</span>}
                  {nopw && <span>비밀번호가 틀립니다.</span>}
                  {serverErr && <span>서버에 문제가 있습니다.</span>}
                  <div>
                    <span>ID</span>
                    <input
                      value={idValue}
                      type="text"
                      onChange={e => this.handleInputChange(e, 'idValue')}
                    />
                  </div>
                  <div>
                    <span>PWD</span>
                    <input
                      value={pwdValue}
                      type="password"
                      onChange={e => this.handleInputChange(e, 'pwdValue')}
                    />
                  </div>
                  <div>
                    <button type="button" onClick={this.handleLoginBtn}>
                      로그인
                    </button>
                    <Link to="/signup">
                      <button type="button">회원가입</button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </div>
    );
  }
}
