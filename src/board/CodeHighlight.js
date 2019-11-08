import React, { Component } from 'react';
import Prism from 'prismjs';
import './prism.css';
import { Row, Col } from 'antd';

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
