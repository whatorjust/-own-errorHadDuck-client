import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Signup(props) {
  const signupEndPoint = `${process.env.REACT_APP_API_KEY}/users/signup`;

  function addUsersData() {
    const userData = document.getElementsByClassName('userdata');
    return userData;
  }
  const handleNext = () => {
    props.history.push('/');
  };

  function postData() {
    const usersData = addUsersData();

    return axios
      .post(signupEndPoint, {
        username: usersData[0].value,
        password: usersData[1].value,
        email: usersData[2].value
      })
      .then(() => {
        document.getElementById('chicken').innerHTML =
          '회원가입을 축하드립니다! 잠시 후 로그인 페이지로 이동합니다.';

        setTimeout(handleNext, 2000);
      })
      .catch(error => {
        if (error.response.data.msg === 'email') {
          document.getElementById('chicken').innerHTML = 'email이 존재합니다.';
        } else if (error.response.data.msg === 'username') {
          document.getElementById('chicken').innerHTML = '아이디가 존재합니다.';
        }
      });
  }

  function InputData({ idval, typestyle }) {
    return (
      <input
        type={typestyle}
        className="userdata"
        id={idval}
        minLength="4"
        maxLength="8"
        size="10"
      />
    );
  }

  return (
    <div>
      <div>회원가입</div>
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
      </div>
    </div>
  );
}
