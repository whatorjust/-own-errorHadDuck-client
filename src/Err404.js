import React, { Component } from 'react';
import errimg from './img/err404.jpg';

export default class Err404 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setTimeout(this.handleNext, 5000);
  }

  handleNext = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div>
        <img src={errimg} alt="err page" style={{ height: '500px' }} />
      </div>
    );
  }
}
