import React from 'react';
import penguin from '../img/penguin.png';

export default function UserMsg({ value }) {
  return (
    <div className="media p-1">
      <div className="media-body text-right">
        <h4>펭수</h4>
        <p>{value}</p>
      </div>
      <img
        src={penguin}
        alt="user"
        className="ml-3 mt-3 rounded-circle"
        style={{ width: '60px' }}
      />
    </div>
  );
}
