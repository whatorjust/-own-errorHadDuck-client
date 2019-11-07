import React from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import './sign.css';
import WrappedRegistrationForm from './SignupForm';

const { Header, Footer, Content } = Layout;

export default function Signup(props) {
  // const signupEndPoint = `${process.env.REACT_APP_API_KEY}/users/signup`;

  // const handleNext = () => {
  //   props.history.push('/');
  // };

  // function postData() {

  //     const username = document.getElementsByClassName('userdata')[0];
  //     const password = document.getElementsByClassName('userdata')[1];
  //     const email = document.getElementsByClassName('userdata')[2];

  //   const [username, password, email] = document.getElementsByClassName(
  //     'userdata'
  //   );

  //   axios
  //     .post(signupEndPoint, {
  //       username: username.value,
  //       password: password.value,
  //       email: email.value
  //     })
  //     .then(() => {
  //       document.getElementById('chicken').innerHTML =
  //         '회원가입을 축하드립니다! 잠시 후 로그인 페이지로 이동합니다.';
  //       setTimeout(handleNext, 2000);
  //     })
  //     .catch(({ response: { data: { msg } } }) => {
  //       if (msg === 'email') {
  //         document.getElementById('chicken').innerHTML = 'email이 존재합니다.';
  //       } else if (msg === 'username') {
  //         document.getElementById('chicken').innerHTML = '아이디가 존재합니다.';
  //       }
  //     });
  // }

  // function InputData({ idval, typestyle }) {
  //   return (
  //     <input
  //       type={typestyle}
  //       className="userdata"
  //       id={idval}
  //       minLength="4"
  //       maxLength="8"
  //       size="10"
  //     />
  //   );
  // }

  return (
    <div>
      <Layout>
        <Header>Header</Header>
        <Content>
          <WrappedRegistrationForm />
          {/* <div>회원가입</div>
          <p>
            <label htmlFor="id">아이디</label>
            <InputData idval="id" typestyle="text" />
          </p>
          <p>
            <label htmlFor="pwd">비밀번호</label>
            <InputData idval="pwd" typestyle="password" />
          </p>
          <p>
            <label htmlFor="email">이메일</label>
            <InputData idval="email" typestyle="text" />
          </p>
          <div id="chicken">
            <br />
          </div>
          <div>
            <button onClick={postData} type="button">
              확인
            </button>
            <Link to="/">
              <button type="button">취소</button>
            </Link>
          </div> */}
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </div>
  );
}
