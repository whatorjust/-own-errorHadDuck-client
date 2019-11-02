import React, { Component } from 'react';
import BotMsg from './BotMsg';
import UserMsg from './UserMsg';

export default class ChatBot extends Component {
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

  handleInputChange = e => {
    this.setState({ input: e.target.value });
  };

  handleSendClick = () => {
    const { input, chats } = this.state;
    const newChats = [...chats, <UserMsg value={input} />, <BotMsg />];

    // save to localStorage
    const prevChatsItems = JSON.parse(localStorage.getItem('chats'));
    const newChatsItems = prevChatsItems ? [...prevChatsItems, input] : [input];
    localStorage.setItem('chats', JSON.stringify(newChatsItems));

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
