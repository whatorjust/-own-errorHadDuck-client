import React, { Component } from 'react';
import { Button, Input, Row, Col } from 'antd';
import { withRouter } from 'react-router-dom';

import BotMsg from './BotMsg';
import UserMsg from './UserMsg';

class ChatBot extends Component {
  constructor(props) {
    super(props);
    this.state = { chats: [<BotMsg />], input: '' };
  }

  componentDidMount() {
    const { chats } = this.state;
    const userChats = JSON.parse(localStorage.getItem('chats'));
    // get prev chats from localStorage & save to the state
    if (chats.length === 1 && userChats !== null) {
      const arr = [];

      userChats.forEach(user => {
        arr.push(<UserMsg value={user} />);
        arr.push(<BotMsg />);
      });

      this.setState({ chats: [<BotMsg />, ...arr] });
    }
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  handleInputChange = e => {
    this.setState({ input: e.target.value });
  };

  handleSendClick = () => {
    const { input, chats } = this.state;

    if (input === '') return;

    const newChats = [...chats, <UserMsg value={input} />];

    // save to localStorage
    const prevChatsItems = JSON.parse(localStorage.getItem('chats'));
    const newChatsItems = prevChatsItems ? [...prevChatsItems, input] : [input];
    localStorage.setItem('chats', JSON.stringify(newChatsItems));

    this.setState({
      input: '',
      chats: [...newChats]
    });

    // duck will answer after 300ms
    setTimeout(() => {
      this.setState({
        input: '',
        chats: [...newChats, <BotMsg />]
      });
    }, 300);
  };

  handleEnter = e => {
    if (e.keyCode === 13) this.handleSendClick();
  };

  scrollToBottom() {
    this.chatBottom.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    const { history } = this.props;
    if (!JSON.parse(localStorage.getItem('isLogin'))) {
      history.push('/');
    }
    const { input, chats } = this.state;
    return (
      <div>
        <Row type="flex" justify="center">
          <Col span={14} style={{ overflowY: 'scroll', height: '50vh' }}>
            {chats}

            {/* for auto scroll down */}
            <div
              ref={element => {
                this.chatBottom = element;
              }}
            />
          </Col>
        </Row>

        <Row type="flex" justify="center" style={{ margin: '5px 0 0 15px' }}>
          <Col span={13}>
            <Input
              size="large"
              value={input}
              onChange={this.handleInputChange}
              onKeyDown={this.handleEnter}
            />
          </Col>
          <Col span={2}>
            <Button type="primary" size="large" onClick={this.handleSendClick}>
              전송
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(ChatBot);
