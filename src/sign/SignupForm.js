/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Button,
  AutoComplete,
  message
} from 'antd';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

const AutoCompleteOption = AutoComplete.Option;

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: []
    };
  }

  handleSubmit = e => {
    const { history, form } = this.props;
    const signupEndPoint = `${process.env.REACT_APP_API_KEY}/users/signup`;
    const handleNext = () => {
      history.push('/');
    };
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // {email: "aab@naver.com", password: "11", confirm: "11", username: "1"}
        axios
          .post(signupEndPoint, {
            username: values.username,
            password: values.password,
            email: values.email
          })
          .then(() => {
            message.success(
              '회원가입을 축하드립니다! 잠시 후 로그인 페이지로 이동합니다.'
            );
            setTimeout(handleNext, 2000);
          })

          .catch(({ response: { data: { msg } } }) => {
            if (msg === 'email') {
              message.error('email이 존재합니다.');
            } else if (msg === 'username') {
              message.error('아이디가 존재합니다.');
            }
          });
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState(prev => {
      return { confirmDirty: prev.confirmDirty || !!value };
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('입력한 두 비밀번호가 일치하지 않습니다');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { confirmDirty } = this.state;
    const { form } = this.props;
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['@gmail.com', '@naver.com', '@hanmail.net'].map(
        domain => `${value}${domain}`
      );
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    const { autoCompleteResult } = this.state;
    const {
      form: { getFieldDecorator }
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: '유효한 이메일 형식이 아닙니다.!'
              },
              {
                required: true,
                message: '이메일을 입력해 주세요'
              }
            ]
          })(
            <AutoComplete
              dataSource={websiteOptions}
              onChange={this.handleWebsiteChange}
              placeholder="aa@naver.com"
            >
              <Input />
            </AutoComplete>
          )}
        </Form.Item>

        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '비밀번호를 입력해주세요'
              },
              {
                validator: this.validateToNextPassword
              }
            ]
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: '비밀번호를 확인해주세요'
              },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              ID&nbsp;
              <Tooltip title="로그인 할 때 사용할 아이디입니다">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: '아이디를 넣어주세요!',
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            가입하기
          </Button>
          <Link to="/">
            <Button style={{ marginLeft: 8 }}>취소</Button>
          </Link>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(
  withRouter(RegistrationForm)
);

export default WrappedRegistrationForm;
