import React, { Component } from 'react';
import axios from 'axios';
import BoardThumbNail from './BoardThumbNail';

export default class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = { list: [null] };
  }

  componentDidMount() {
    const { history } = this.props;
    const instance = axios.create({
      withCredentials: true,
      timeout: 1000,
      baseURL: process.env.REACT_APP_API_KEY
    });

    instance
      .get('/posts')
      .then(({ data }) => {
        this.setState(prev => {
          const oldObj = { ...prev };
          oldObj.list = data;
          return oldObj;
        });
      })
      .catch(() => {
        history.push('/404page');
      });
  }

  render() {
    const { list } = this.state;
    if (list[0] === null) {
      return '목록을 불러오는 중입니다.';
    }
    const entireData = list;
    const incompletedData = list.filter(ele => {
      return ele.iscomplete === false;
    });
    const completedData = list.filter(ele => {
      return ele.iscomplete === true;
    });
    return (
      <div>
        <BoardThumbNail Data={entireData.reverse()} type="entire" />
        <BoardThumbNail Data={incompletedData.reverse()} type="incompleted" />
        <BoardThumbNail Data={completedData.reverse()} type="completed" />
      </div>
    );
  }
}
