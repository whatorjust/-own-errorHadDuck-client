import React from 'react';
import errimg from './img/err500.jpg';

export default function Err500() {
  return (
    <div>
      <img src={errimg} alt="err page" style={{ height: '500px' }} />
    </div>
  );
}
