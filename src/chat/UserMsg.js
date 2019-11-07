import React from 'react';
import { Row, Col } from 'antd';
import penguin from '../img/penguin.png';

export default function UserMsg({ value }) {
  return (
    <Row type="flex" justify="end">
      <Col span={8} style={{ textAlign: 'end', paddingRight: '10px' }}>
        <h4>펭이</h4>
        <p>{value}</p>
      </Col>
      <Col>
        <img src={penguin} alt="user" style={{ width: '80px' }} />
      </Col>
    </Row>
  );
}
