import React from 'react';
import { Link } from 'react-router-dom';

const MenuItem = ({ active, children, to }) => (
  <Link to={to} className="menu-item">
    {children}
  </Link>
);

export default function Nav() {
  return (
    <div>
      <div className="nametab">navigation</div>
      <div className="category">
        <MenuItem to="/overview">
          <button>overview</button>
        </MenuItem>
        <MenuItem to="/newerrorlog">
          <button>newerrorlog</button>
        </MenuItem>
        <MenuItem to="/boardlist/:mode">
          <button>전체목록</button>
        </MenuItem>
        <MenuItem to="/boardlist/:mode">
          <button>해결목록</button>
        </MenuItem>
        <MenuItem to="/boardlist/:mode">
          <button>미해결목록</button>
        </MenuItem>
        <MenuItem to="/chatbot">
          <button>챗봇</button>
        </MenuItem>
      </div>
    </div>
  );
}
