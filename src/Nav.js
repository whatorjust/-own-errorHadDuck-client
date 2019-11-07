import React from 'react';
import { ReactDOM, Link } from 'react-router-dom';

// export default function Nav({ handleLogout }) {
//   return (
//     <div>
//       <div className="nametab">navigation</div>
//       <div className="category">
//         <Link to="/overview">
//           <button type="button">overview</button>
//         </Link>
//         <Link to="/singleview">
//           <button type="button">새글 쓰기</button>
//         </Link>
//         <Link to="/boardlist/entire">
//           <button type="button">전체목록</button>
//         </Link>
//         <Link to="/boardlist/completed">
//           <button type="button">해결목록</button>
//         </Link>
//         <Link to="/boardlist/incompleted">
//           <button type="button">미해결목록</button>
//         </Link>
//         <Link to="/chatbot">
//           <button type="button">챗봇</button>
//         </Link>
//         <Link to="/">
//           <button type="button" onClick={handleLogout}>
//             로그아웃
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// }

import 'antd/dist/antd.css';
import { Menu, Icon } from 'antd';
import './App.css';

const { SubMenu } = Menu;

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'mail'
    };
  }

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key
    });
  };

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="overview">
          <Icon type="mail" />
          overview
        </Menu.Item>
        <Menu.Item key="/singleview">
          <Icon type="mail" />새 글 쓰기
        </Menu.Item>
        <SubMenu
          title={
            <span className="submenu-title-wrapper">
              <Icon type="setting" />
              내가 쓴 글
            </span>
          }
        >
          <Menu.Item key="/boardlist/entire">전체목록</Menu.Item>
          <Menu.Item key="/boardlist/completed">해결목록</Menu.Item>
          <Menu.Item key="/boardlist/incompleted">미해결목록</Menu.Item>
        </SubMenu>
        <Menu.Item key="/chatbot">
          <Icon type="mail" />
          러버덕과 대화하기
        </Menu.Item>
        <SubMenu
          title={
            <span className="submenu-title-wrapper">
              <Icon type="setting" />
              로그아웃
            </span>
          }
        >
          <Menu.Item key="/boardlist/entire">로그아웃</Menu.Item>
          <Menu.Item key="" disabled>
            회원정보
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}
