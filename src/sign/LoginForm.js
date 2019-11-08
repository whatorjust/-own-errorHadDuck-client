import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, message, Skeleton, Row, Col } from 'antd';
import axios from 'axios';
import logos from '../img/logo.png';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoding: false };
  }

  handleSubmit = e => {
    const { handleLoginState, form } = this.props;

    const instance = axios.create({
      withCredentials: true,
      timeout: 1000,
      baseURL: process.env.REACT_APP_API_KEY
    });

    e.preventDefault();
    this.setState({ isLoding: true });

    form.validateFields((err, values) => {
      if (!err) {
        instance
          .post('/users/login', {
            username: values.username,
            password: values.password
          })
          .then(() => {
            localStorage.setItem('isLogin', true);
            handleLoginState();
            this.setState({ isLoding: false });
          })
          .catch(({ response }) => {
            this.setState({ isLoding: false });

            if (response.status === 500) {
              message.error('서버에서 에러가 발생하였습니다');
              return;
            }

            if (response.status === 400) {
              if (response.data.msg === 'username') {
                message.error('존재하지 않는 ID입니다.');
                return;
              }
              if (response.data.msg === 'password') {
                message.error('비밀번호가 틀렸습니다.');
              }
            }
          });
      }
    });
  };

  render() {
    const { isLoding } = this.state;
    const {
      form: { getFieldDecorator }
    } = this.props;

    return (
      <div>
        {isLoding ? (
          <Skeleton active />
        ) : (
          <Form onSubmit={this.handleSubmit} className="login-form">
            <img
              src={logos}
              alt="logo"
              style={{ width: '300px', marginBottom: '50px' }}
            />
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '아이디를 입력해주세요' }]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="아이디"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '비밀번호를 입력해주세요' }]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="비밀번호"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                로그인
              </Button>
              혹은 <Link to="/signup">회원가입</Link>
            </Form.Item>
          </Form>
        )}
      </div>
    );
  }
}

const WrappedLoginForm = Form.create({ name: 'normal_login' })(LoginForm);

export default WrappedLoginForm;
