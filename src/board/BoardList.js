import React, { Component } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import Makelist from './Makelist';
// import Err404 from '../Err404'; 사용하지 않는것 같아 주석처리하였습니다.

//Makelist 컴포넌트를 따로 뺐습니다.
//링크기능은 따로 뺀 컴포넌트에서 구현 부탁드립니다.

// function Makelist(props) {
//   const { id } = props;
//   const { postname } = props;
//   const { created } = props;
//   const { iscomplete } = props;
//   const idNum = `/singleview/${id}`;
//   return (
//     <Link to={idNum}>
//       <div>{iscomplete === true ? 'completed' : 'incompleted'}</div>
//       <div>{postname}</div>
//       <div>{created}</div>
//     </Link>
//   );
// }

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
