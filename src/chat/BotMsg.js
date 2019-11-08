import React from 'react';
import { Row, Col } from 'antd';
import rubber from '../img/rubber-duck.png';
import randomItemOut from './DuckReady';

export default function BotMsg() {
  return (
    <Row type="flex">
      <Col>
        <img src={rubber} alt="rubber-duck" style={{ width: '80px' }} />
      </Col>
      <Col style={{ paddingLeft: '10px' }}>
        <h4>러버덕</h4>
        <p>{randomItemOut()}</p>
      </Col>
    </Row>
  );
}
