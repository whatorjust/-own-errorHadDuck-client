import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';

export default function Nav({ handleLogout }) {
  const { SubMenu } = Menu;

  return (
    <Menu mode="horizontal">
      <Menu.Item key="overview">
        <Link to="/overview">
          <Icon type="appstore" />
          메인
        </Link>
      </Menu.Item>

      <Menu.Item key="/singleview">
        <Link to="/singleview">
          <Icon type="edit" />새 글 쓰기
        </Link>
      </Menu.Item>
      <SubMenu
        title={
          <span className="submenu-title-wrapper">
            <Icon type="container" />
            내가 쓴 글
          </span>
        }
      >
        <Menu.Item key="/boardlist/entire">
          <Link to="/boardlist/entire">
            {' '}
            <Icon type="menu" />
            전체
          </Link>
        </Menu.Item>
        <Menu.Item key="/boardlist/completed">
          {' '}
          <Link to="/boardlist/completed">
            <Icon type="check" />
            해결
          </Link>
        </Menu.Item>
        <Menu.Item key="/boardlist/incompleted">
          {' '}
          <Link to="/boardlist/incompleted">
            <Icon type="question" />
            미해결
          </Link>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key="/chatbot">
        {' '}
        <Link to="/chatbot">
          <Icon type="message" />
          러버덕과 대화하기
        </Link>
      </Menu.Item>
      <SubMenu
        title={
          <span className="submenu-title-wrapper">
            <Icon type="logout" />
            로그아웃
          </span>
        }
      >
        <Menu.Item key="/" onClick={handleLogout}>
          <Link to="/">
            <Icon type="logout" />
            로그아웃
          </Link>
        </Menu.Item>
        <Menu.Item key="" disabled>
          <Icon type="user" /> 회원정보
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
}
