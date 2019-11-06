import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav({ handleLogout }) {
  return (
    <div>
      <div className="nametab">navigation</div>
      <div className="category">
        <Link to="/overview">
          <button type="button">overview</button>
        </Link>
        <Link to="/newerrorlog">
          <button type="button">newerrorlog</button>
        </Link>
        <Link to="/boardlist/entire">
          <button type="button">전체목록</button>
        </Link>
        <Link to="/boardlist/completed">
          <button type="button">해결목록</button>
        </Link>
        <Link to="/boardlist/incompleted">
          <button type="button">미해결목록</button>
        </Link>
        <Link to="/chatbot">
          <button type="button">챗봇</button>
        </Link>
        <Link to="/">
          <button type="button" onClick={handleLogout}>
            로그아웃
          </button>
        </Link>
      </div>
    </div>
  );
}
