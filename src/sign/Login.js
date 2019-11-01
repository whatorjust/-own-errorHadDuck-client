import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// TODO: dotenv 적용
// const path = require('path');
// const dotenv = require('dotenv');
const axios = require('axios');

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { idValue: '', pwdValue: '', noInput: false };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLoginBtn = this.handleLoginBtn.bind(this);
  }

  handleInputChange = (e, stateKey) => {
    this.setState({ [stateKey]: e.target.value });
  };

  handleLoginBtn = () => {
    const { idValue, pwdValue } = this.state;
    const { saveUserid } = this.props;

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
      .catch(error => {
        // 응답이 안좋으면 아이디가 틀린건지 비번이 틀린건지 보여준다
        console.log('err', error);
      });
  };

  render() {
    const { idValue, pwdValue, noInput } = this.state;
    const { isLogin } = this.props;

    return (
      <div>
        {isLogin ? (
          <Redirect to="/overview" />
        ) : (
          <div>
            <div>
              {noInput && <span>아이디나 비밀번호가 입력되지 않았습니다.</span>}
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
