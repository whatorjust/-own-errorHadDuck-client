import React from 'react';
import rubber from '../img/rubber-duck.png';

export default function BotMsg() {
  return (
    <div className="media p-3">
      <img
        src={rubber}
        alt="rubber-duck"
        className="mr-3 mt-3 rounded-circle"
        style={{ width: '60px' }}
      />
      <div className="media-body">
        <h4>러버덕</h4>
        <span>꽥꽥!</span>
      </div>
    </div>
  );
}
