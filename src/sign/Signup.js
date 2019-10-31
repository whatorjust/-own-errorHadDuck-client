import React from 'react';

export default function Signup() {
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
        <button>제출</button>
      </div>
    </div>
  );
}
