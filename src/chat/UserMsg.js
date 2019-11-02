import React from 'react';

export default function UserMsg({ value }) {
  return (
    <div style={{ textAlign: 'right' }}>
      <span>유저 이미지 : </span>
      <span>{value}</span>
    </div>
  );
}
