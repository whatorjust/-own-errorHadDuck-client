import React from 'react';
import Nav from '../Nav';
import BotMsg from './BotMsg';
import UserMsg from './UserMsg';

export default function ChatBot() {
  return (
    <div>
      <Nav />

      <div />

      <div>
        <input type="text" />
        <BotMsg />
        <UserMsg />
        <button type="button">전송</button>
      </div>
      <div />
    </div>
  );
}
