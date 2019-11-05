/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

const axios = require('axios');

const instance = axios.create({
  timeout: 1000
});

export default class SingleView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'read',
      data: null,
      isErr: null,
      writeKeyWords: [],
      writeRefers: []
    };
    this.handleLeftBtn = this.handleLeftBtn.bind(this);
    this.handleAddKeyword = this.handleAddKeyword.bind(this);
    this.handleAddRef = this.handleAddRef.bind(this);
    this.getReadData = this.getReadData.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;

    if (match !== undefined) {
      const { postid } = match.params;
      this.getReadData(postid);
    } else {
      this.setState({ mode: 'write' });
    }
  }

  getReadData(postid) {
    instance
      .get(`/posts/${postid}`)
      .then(({ data }) => {
        this.setState({
          mode: 'read',
          data,
          isErr: null,
          writeKeyWords: [],
          writeRefers: []
        });
      })
      .catch(({ response }) => {
        if (response.status === 500) {
          this.setState(prev => {
            return {
              mode: prev.mode,
              data: prev.data,
              isErr: '500',
              writeKeyWords: [],
              writeRefers: []
            };
          });
          return;
        }

        if (response.status === 400) {
          this.setState(prev => {
            return {
              mode: prev.mode,
              data: prev.data,
              isErr: '404',
              writeKeyWords: [],
              writeRefers: []
            };
          });
        }
      });
  }

  handleLeftBtn() {
    const { mode } = this.state;

    if (mode === 'write') {
      const { writeKeyWords, writeRefers } = this.state;

      // TODO: 예외처리 ) 미입력시???

      const obj = {
        post: {
          postname: this.writePostname.value,
          postcode: this.writePostCode.value,
          solution: this.writeSolution.value
        },
        keyword: writeKeyWords,
        refer: writeRefers
      };

      instance
        .post('/posts', obj)
        .then(({ data }) => {
          this.getReadData(data.postid);
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
    }
  }

  handleAddKeyword() {
    const val = this.keyword.value;

    if (val === '') return;

    this.keyword.value = '';

    this.setState(prev => {
      return {
        writeKeyWords: [...prev.writeKeyWords, val]
      };
    });
  }

  handleAddRef() {
    const referurl = this.refUrl.value;
    const understand = this.refUnderstand.value;

    if (referurl === '' || understand === '') return;

    this.refUrl.value = '';
    this.refUnderstand.value = '';

    this.setState(prev => {
      return {
        writeRefers: [...prev.writeRefers, { referurl, understand }]
      };
    });
  }

  render() {
    const { data, isErr, mode, writeKeyWords, writeRefers } = this.state;
    const leftBtn =
      mode === 'read' ? '수정' : mode === 'write' ? '작성 완료' : '수정 완료';
    const rightBtn =
      mode === 'read' ? '삭제' : mode === 'write' ? '작성 취소' : '수정 취소';

    return (
      <div>
        <div>
          {isErr === '404' && <Redirect to="/404page" />}
          {isErr === '500' && <Redirect to="/500page" />}
          <div>
            <span>{data && (data.iscomplete ? '해결' : '미해결')}</span>
          </div>
          <h1>
            {data && data.postname}
            {mode === 'write' && (
              <input
                placeholder="제목"
                ref={element => {
                  this.writePostname = element;
                }}
              />
            )}
          </h1>
          <div>
            <span>에러 코드</span>
            <div>
              <pre>
                <code>{data && data.postcode}</code>
              </pre>
              {mode === 'write' && (
                <textarea
                  ref={element => {
                    this.writePostCode = element;
                  }}
                />
              )}
            </div>
          </div>

          <div>
            <span>검색 키워드</span>
            {mode === 'write' && (
              <div>
                <input
                  type="text"
                  ref={element => {
                    this.keyword = element;
                  }}
                />
                <button type="button" onClick={this.handleAddKeyword}>
                  +
                </button>
              </div>
            )}

            <ul>
              {mode === 'write' && writeKeyWords.map(ele => <li>{ele}</li>)}
              {data &&
                data.Poskeys.length !== 0 &&
                data.Poskeys.map(ele => <li>{ele.Keyword.keyword}</li>)}
            </ul>
          </div>
          <hr />

          <div>
            <div>
              <span>참고한 페이지</span>
              {mode === 'write' && (
                <div>
                  <button type="button" onClick={this.handleAddRef}>
                    +
                  </button>
                  <ul>
                    <li>
                      url :{' '}
                      <input
                        type="text"
                        ref={element => {
                          this.refUrl = element;
                        }}
                      />
                    </li>
                    <li>
                      이해한 내용 :{' '}
                      <input
                        type="text"
                        ref={element => {
                          this.refUnderstand = element;
                        }}
                      />
                    </li>
                    {writeRefers.map(ele => (
                      <ul>
                        <li>url : {ele.referurl}</li>
                        <li>이해한 내용 : {ele.understand}</li>
                      </ul>
                    ))}
                  </ul>
                </div>
              )}

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
            <p>
              {data && data.solution}
              {mode === 'write' && (
                <textarea
                  ref={element => {
                    this.writeSolution = element;
                  }}
                />
              )}
            </p>
          </div>
        </div>

        <button type="button" onClick={this.handleLeftBtn}>
          {leftBtn}
        </button>
        <button type="button">{rightBtn}</button>
      </div>
    );
  }
}
