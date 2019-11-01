import React from 'react';
import axios from 'axios';

export default function Signup() {
  const signupEndPoint = 'http://13.125.254.202:5000/users/signup';

  function postData() {
    return axios
      .post(signupEndPoint, {
        username: 'user',
        password: '5555',
        email: 'ghfflaktmxj@gmail.com'
      })
      .then(res => {
        console.log(res);
      });
  }

  function addUsersData() {
    const arr = [];
    arr.push();
  }

  return (
    <div>
      <div>회원가입</div>
      <p>
        <label htmlFor="id">아이디</label>
        <input type="text" id="id" minLength="4" maxLength="8" size="10" />
      </p>
      <p>
        <label htmlFor="pwd">비밀번호</label>
        <input type="text" id="pwd" minLength="4" maxLength="8" size="10" />
      </p>
      <p>
        <label htmlFor="email">이메일</label>
        <input type="text" id="email" minLength="4" maxLength="8" size="10" />
      </p>
      <div>
        <button onClick={postData} type="button">
          제출
        </button>
      </div>
    </div>
  );
}
