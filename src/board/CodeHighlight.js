import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Prism from 'prismjs';
import './prism.css';

export default class CodeHighlight extends Component {
  componentDidMount() {
    setTimeout(() => Prism.highlightAll(), 0);
  }

  render() {
    const { postcode } = this.props;

    return (
      <Row>
        <Col span="20" offset={2}>
          <pre>
            <code className="language-js">{postcode}</code>
          </pre>
        </Col>
      </Row>
    );
  }
}
