import React from 'react';
import errimg from './img/err404.jpg';

export default function Err404() {
  return (
    <div>
      <img src={errimg} alt="err page" style={{ height: '500px' }} />
    </div>
  );
}
