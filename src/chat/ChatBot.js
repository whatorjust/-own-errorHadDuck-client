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

  componentDidUpdate() {
    this.scrollToBottom();
  }

  handleInputChange = e => {
    this.setState({ input: e.target.value });
  };

  handleSendClick = () => {
    const { input, chats } = this.state;
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
    const { input, chats } = this.state;

    return (
      <div className="mx-auto container col-8 m-3">
        <div className="p-3" style={{ overflowY: 'scroll', height: '600px' }}>
          {chats}

          {/* for auto scroll down */}
          <div
            ref={element => {
              this.chatBottom = element;
            }}
          />
        </div>

        <div className="d-flex justify-content-center mx-auto form-group row m-3">
          <input
            className="form-control col-10"
            type="text"
            value={input}
            onChange={this.handleInputChange}
            onKeyDown={this.handleEnter}
          />

          <button
            type="button"
            className="btn btn-outline-warning btn-md"
            onClick={this.handleSendClick}
          >
            전송
          </button>
        </div>
      </div>
    );
  }
}