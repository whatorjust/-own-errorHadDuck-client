import React, { Component } from 'react';
import axios from 'axios';
import Makelist from './Makelist';

export default class BoardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: ['목록을 불러오는 중입니다.']
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { history } = this.props;
    const instance = axios.create({
      timeout: 1000
    });

    if (match.params.mode === 'entire') {
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
    } else if (match.params.mode === 'incompleted') {
      instance
        .get('/posts?iscomplete=false')
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
    } else if (match.params.mode === 'completed') {
      instance
        .get('/posts?iscomplete=true')
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
  }

  render() {
    const { list } = this.state;
    return (
      <div>
        {list.map(ele => {
          return (
            <Makelist
              key={ele.id + 1}
              created={ele.createdAt}
              postname={ele.postname}
              id={ele.id}
              iscomplete={ele.iscomplete}
            />
          );
        })}
      </div>
    );
  }
}
