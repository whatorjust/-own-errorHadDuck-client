import React from 'react';
import Nav from '../Nav';
import BoardThumbNail from './BoardThumbNail';

export default function Overview() {
  return (
    <div>
      <Nav />
      <BoardThumbNail />
      <BoardThumbNail />
      <BoardThumbNail />
    </div>
  );
}
