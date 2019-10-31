import React from 'react';

export default function Login() {
  return (
    <div>
      <div>
        <span>ID</span>
        <input type="text" />
      </div>

      <div>
        <span>PWD</span>
        <input type="text" />
      </div>
      <div>
        <button type="button">로그인</button>
        <button type="button">회원가입</button>
      </div>
    </div>
  );
}
