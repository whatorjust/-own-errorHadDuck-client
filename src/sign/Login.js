import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// TODO: dotenv 적용
// const path = require('path');
// const dotenv = require('dotenv');
const axios = require('axios');

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idValue: '',
      pwdValue: '',
      noInput: false,
      noid: false,
      nopw: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLoginBtn = this.handleLoginBtn.bind(this);
  }

  handleInputChange = (e, stateKey) => {
    this.setState({ [stateKey]: e.target.value });
  };

  handleLoginBtn = () => {
    const { idValue, pwdValue, noid, nopw } = this.state;
    const { saveUserid } = this.props;

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
      baseURL: 'http://13.125.254.202:5000',
      timeout: 1000
    });

    instance
      .post('/users/login', { username: idValue, password: pwdValue })
      .then(({ data: { userid } }) => {
        saveUserid(userid);
      })
      .catch(({ response }) => {
        if (response.status === 500) {
          console.log('서버에 문제가 있다!!');
        }

        if (response.status === 400) {
          if (response.data.msg === 'username') {
            this.setState({ noid: true });
          }

          if (response.data.msg === 'password') {
            this.setState({ nopw: true });
          }
        }
      });
  };

  render() {
    const { idValue, pwdValue, noInput, noid, nopw } = this.state;
    const { isLogin } = this.props;

    return (
      <div>
        {isLogin ? (
          <Redirect to="/overview" />
        ) : (
          <div>
            <div>
              {noInput && <span>아이디나 비밀번호가 입력되지 않았습니다.</span>}
              {noid && <span>아이디가 틀립니다.</span>}
              {nopw && <span>비밀번호가 틀립니다.</span>}
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
                <button type="button">회원가입</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
