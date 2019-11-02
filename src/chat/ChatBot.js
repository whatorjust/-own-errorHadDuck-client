import React, { Component } from 'react';
import BotMsg from './BotMsg';
import UserMsg from './UserMsg';

export default class ChatBot extends Component {
  constructor(props) {
    super(props);
    this.state = { chats: [<BotMsg />], input: '' };
  }

  handleInputChange = e => {
    this.setState({ input: e.target.value });
  };

  handleSendClick = () => {
    const { input, chats } = this.state;
    const newChats = [...chats, <UserMsg value={input} />, <BotMsg />];

    this.setState({
      input: '',
      chats: [...newChats]
    });
  };

  handleEnter = e => {
    if (e.keyCode === 13) this.handleSendClick();
  };

  render() {
    const { input, chats } = this.state;

    return (
      <div>
        <div>{chats}</div>

        <div>
          <input
            type="text"
            value={input}
            onChange={this.handleInputChange}
            onKeyDown={this.handleEnter}
          />

          <button type="button" onClick={this.handleSendClick}>
            전송
          </button>
        </div>
        <div />
      </div>
    );
  }
}
