import React, { Component } from 'react';

// TODO: dotenv 적용
// const path = require('path');
// const dotenv = require('dotenv');
const axios = require('axios');

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { idValue: '', pwdValue: '' };
    this.handleLoginBtn = this.handleInputChange.bind(this);
    this.handleLoginBtn = this.handleLoginBtn.bind(this);
  }

  handleInputChange = (e, stateKey) => {
    this.setState({ [stateKey]: e.target.value });
  };

  render() {
    const { idValue, pwdValue } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {' '}
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
        </form>
      </div>
    );
  }
}
