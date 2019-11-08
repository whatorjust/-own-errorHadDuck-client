import React, { Component } from 'react';
import { Divider } from 'antd';
import axios from 'axios';
import BoardThumbNail from './BoardThumbNail';

export default class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = { list: [null], isErr: false };
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
        this.setState({ isErr: true });
      });
  }

  render() {
    const { list, isErr } = this.state;
    if (list[0] === null || isErr) {
      return (
        <Divider>작성한 글이 하나도 없네요. 새로운 글을 작성해보세요!</Divider>
      );
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
