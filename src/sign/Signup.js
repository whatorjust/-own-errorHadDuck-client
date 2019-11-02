import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Signup(props) {
  const signupEndPoint = 'http://13.125.254.202:5000/users/signup';
  // .env 파일로 숨겨서 작업

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

  function InputData({ idval }) {
    return (
      <input
        type="text"
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
        <InputData idval="id" />
      </p>
      <p>
        <label htmlFor="pwd">비밀번호</label>
        <InputData idval="pwd" />
      </p>
      <p>
        <label htmlFor="email">이메일</label>
        <InputData idval="email" />
      </p>
      <div id="chicken">
        <br />
      </div>
      <div>
        <button onClick={postData} type="button">
          확인
        </button>
        <Link to="/">
          <button type="button">로그인</button>
        </Link>
      </div>
    </div>
  );
}
