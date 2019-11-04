import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

const axios = require('axios');

export default class SingleView extends Component {
  constructor(props) {
    super(props);
    this.state = { mode: 'read', data: null, isErr: null };
  }

  // TODO:
  /*
  "/singleview/:postid" -> 1일때
  this.props.match.params.postid; -> 없으면 mode : 'write'
  -> 있으면 디폴트 읽기 모드 -> 수정버튼을 누르면 mode : 'update'
  (읽기)수정/삭제 버튼 <-> 수정 완료/수정 취소 버튼 <-> 작성 완료/작성 취소 버튼
  */

  // 에러 코드 하이라이트? https://prismjs.com/

  componentDidMount() {
    const { match } = this.props;

    if (match !== undefined) {
      const { postid } = match.params;
      const instance = axios.create({
        timeout: 1000
      });

      instance
        .get(`/posts/${postid}`)
        .then(({ data }) => {
          this.setState({ mode: 'read', data, isErr: null });
        })
        .catch(({ response }) => {
          if (response.status === 500) {
            this.setState(prev => {
              return { mode: prev.mode, data: prev.data, isErr: '500' };
            });
            return;
          }

          if (response.status === 400) {
            this.setState(prev => {
              return { mode: prev.mode, data: prev.data, isErr: '404' };
            });
          }
        });
    } else {
      // mode : write
    }
  }

  render() {
    const { data, isErr } = this.state;

    return (
      <div>
        <div>
          {isErr === '404' && <Redirect to="/404page" />}
          {isErr === '500' && <Redirect to="/500page" />}
          <div>
            <span>{data && data.iscomplete ? '해결' : '미해결'}</span>
          </div>
          <h1>{data && data.postname}</h1>
          <div>
            <span>에러 코드</span>
            <div>
              <pre>
                <code>{data && data.postcode}</code>
              </pre>
            </div>
          </div>
          <div>
            <span>검색 키워드</span>
            <ul>
              {data &&
                data.Poskeys.length !== 0 &&
                data.Poskeys.map(ele => <li>{ele.Keyword.keyword}</li>)}
            </ul>
          </div>
          <hr />
          <div>
            <div>
              <span>참고한 페이지</span>

              {data &&
                data.Refers.length !== 0 &&
                data.Refers.map(ele => (
                  <ul>
                    <li>url : {ele.referurl}</li>
                    <li>이해한 내용 : {ele.understand}</li>
                  </ul>
                ))}
            </div>
          </div>
          <hr />
          <div>
            <span>해결한 내용</span>
            <p>{data && data.solution}</p>
          </div>
        </div>

        <button type="button">수정</button>
        <button type="button">삭제</button>
      </div>
    );
  }
}

// [{
//   id: 1,
//   postname: '한글테스트',
//   postcode: 'code1',
//   solution: 'solution1',
//   iscomplete: false,
//   createdAt: '2019-11-03T08:42:36.000Z',
//   updatedAt: '2019-11-03T08:42:36.000Z',
//   UserId: 1,
//   Poskeys: [
//     {
//       id: 1,
//       poskey: null,
//       createdAt: '2019-11-03T08:42:36.000Z',
//       updatedAt: '2019-11-03T08:42:36.000Z',
//       KeywordId: 1,
//       PostId: 1,
//       Keyword: {
//         id: 1,
//         keyword: '키워드',
//         createdAt: '2019-11-03T08:42:36.000Z',
//         updatedAt: '2019-11-03T08:42:36.000Z'
//       }
//     },
//     {
//       id: 2,
//       poskey: null,
//       createdAt: '2019-11-03T08:42:36.000Z',
//       updatedAt: '2019-11-03T08:42:36.000Z',
//       KeywordId: 2,
//       PostId: 1,
//       Keyword: {
//         id: 2,
//         keyword: 'kw2',
//         createdAt: '2019-11-03T08:42:36.000Z',
//         updatedAt: '2019-11-03T08:42:36.000Z'
//       }
//     }
//   ],
//   Refers: [
//     {
//       id: 1,
//       referurl: 'naver.com',
//       understand: '한글',
//       createdAt: '2019-11-03T08:42:36.000Z',
//       updatedAt: '2019-11-03T08:42:36.000Z',
//       PostId: 1
//     },
//     {
//       id: 2,
//       referurl: 'daum.com',
//       understand: 'what..?',
//       createdAt: '2019-11-03T08:42:36.000Z',
//       updatedAt: '2019-11-03T08:42:36.000Z',
//       PostId: 1
//     }
//   ]
// }];
