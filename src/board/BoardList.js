import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Makelist(props) {
  return (
    <Link to="/">
      <div>{props.val}</div>
    </Link>
  );
}

export default class BoardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: ['목록을 불러오는 중입니다.']
    };
  }

  componentDidMount() {
    const { match } = this.props;

    console.log('이것은 매치', match.params.mode);

    const instance = axios.create({
      timeout: 1000
    });

    // 주소 어떻게 아는지?
    // setstate안에 함수...?
    // 네비에서 눌러서 넘어왔을때..

    // 전체글 : entire
    // 미해결글 : incompleted
    // 해결글 : completed

    // mode가 entire면 전체글 보여줭..
    if (match.params.mode === ':entire') {
      instance
        .get('/posts')
        .then(({ data }) => {
          console.log('이것은 enitre 데이터', data);
          const newList = data.map(obj => {
            return obj.postname;
          });
          this.setState(prev => {
            const oldObj = { ...prev };
            oldObj.list = newList;
            return oldObj;
          });

          // 글목록 뿌려주기 어떻게?...document.getelementbyid?,아니면 jsx로 접근하는법
          // 일단 목록의 수만큼
          // 제목
          // 시간
          // 해결미해결여부
        })
        .catch(({ response }) => {
          console.log('이것은 entire 에러', response);
        });
    } else if (match.params.mode === ':incompleted') {
      instance
        .get('/posts?iscomplete=true')
        .then(({ data }) => {
          console.log('이것은 incompleted 데이터', data);
        })
        .catch(({ response }) => {
          console.log('이것은 incompleted 에러', response);
        });
    } else if (match.params.mode === ':completed') {
      instance
        .get('/posts?iscomplete=false')
        .then(({ data }) => {
          console.log('이것은 completed 데이터', data);
        })
        .catch(({ response }) => {
          console.log('이것은 completed 에러', response);
        });
    }
  }

  render() {
    // 어떤 요청으로 들어왔느냐에 따라 해결/미해결/전체 목록 보여주기...
    // 보여줘야할 것 = 목록 / 해결미해결여부 / 시간?
    // 리스트랭스만큼 제목을 입력하려면...?
    return (
      <div>
        {console.log(this.state)}
        {this.state.list.map(ele => {
          return <Makelist val={ele} />;
        })}
      </div>
    );
  }
}
