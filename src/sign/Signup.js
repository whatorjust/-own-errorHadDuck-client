import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Signup(props) {
  const signupEndPoint = 'http://13.125.254.202:5000/users/signup';
  // .env 파일로 숨겨서 작업

  function addUsersData() {
    const userData = document.getElementsByClassName('userdata');
    return userData;
    // userdata.map()
  }
  const handleNext = () => {
    props.history.push('/');
  };

  function postData() {
    const usersData = addUsersData();
    console.log('유저데이터야', usersData);

    return axios
      .post(signupEndPoint, {
        username: usersData[0].value,
        password: usersData[1].value,
        email: usersData[2].value
      })
      .then(res => {
        console.log('res', res);
        console.log('res.data', res.data);
        alert('회원가입을 축하드립니다! 잠시 후 로그인 페이지로 이동합니다.');
        setTimeout(handleNext, 2000);
        // 로그인 페이지로 이동+++++++++++++++++ redirect(state), history.push <-- 서칭
      })
      .catch(error => {
        console.log('이건에러야', error);
        if (error.response.data.msg === 'email') {
          // 이메일이 중복이라는 알림+++++++++++++++++ 아라님 코드 확인
          alert('email이 존재합니다.');
          //   // 빨간글자로 중복표시
          // 아이디와 이메일이 둘다 중복이면 이메일중복이 먼저온다.
          // 그렇다면 이메일 중복 응답의 경우=> 이메일 중복 // 이메일 중복 + 아이디중복
          // 아이디중복 응답의 경우 => 아이디 중복++++++++++++++++++ 아라님 코드 확인
        } else if (error.response.data.msg === 'username') {
          alert('id가 존재합니다.');
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
