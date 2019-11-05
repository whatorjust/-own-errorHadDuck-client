/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';

const axios = require('axios');

const instance = axios.create({
  withCredentials: true,
  timeout: 1000
});

class SingleView extends Component {
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
    this.handleCancleBtn = this.handleCancleBtn.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { postid }
      }
    } = this.props;

    if (postid) {
      this.getReadData(postid);
    } else {
      this.setState({
        mode: 'write',
        data: null,
        isErr: null,
        writeKeyWords: [],
        writeRefers: []
      });
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
              data: null,
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
              data: null,
              isErr: '404',
              writeKeyWords: [],
              writeRefers: []
            };
          });
        }
      });
  }

  handleLeftBtn() {
    const { mode, writeKeyWords, writeRefers } = this.state;
    const { history } = this.props;

    if (mode === 'write') {
      if (this.writePostname.value === '') {
        this.setState(prev => {
          return {
            mode: prev.mode,
            writeKeyWords: prev.writeKeyWords,
            writeRefers: prev.writeRefers,
            needName: true
          };
        });
        return;
      }

      const obj = {
        post: {
          postname: this.writePostname.value,
          postcode: this.writePostCode.value,
          solution: this.writeSolution.value,
          iscomplete: this.unsolveRadio.checked
        },
        keyword: writeKeyWords,
        refer: writeRefers
      };

      instance
        .post('/posts', obj)
        .then(({ data }) => {
          history.push(`/singleview/${data.postid}`);
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
    const { value } = this.keyword;

    if (value === '') return;

    this.keyword.value = '';

    this.setState(prev => {
      return {
        writeKeyWords: [...prev.writeKeyWords, value]
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

  handleCancleBtn() {
    const { history } = this.props;
    history.goBack();
  }

  render() {
    const {
      data,
      isErr,
      mode,
      writeKeyWords,
      writeRefers,
      needName
    } = this.state;
    const leftBtn =
      mode === 'read' ? '수정' : mode === 'write' ? '작성 완료' : '수정 완료';
    const cancleBtn =
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
          {needName && (
            <span style={{ color: 'red' }}>제목은 필수 항목입니다.</span>
          )}
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

          {mode === 'write' && (
            <div>
              <div className="form-check-inline">
                <label className="form-check-label">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="optradio"
                    defaultChecked
                    ref={element => {
                      this.unsolveRadio = element;
                    }}
                  />
                  미해결
                </label>
              </div>
              <div className="form-check-inline">
                <label className="form-check-label">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="optradio"
                  />
                  해결
                </label>
              </div>
            </div>
          )}
        </div>

        <button type="button" onClick={this.handleLeftBtn}>
          {leftBtn}
        </button>
        <button type="button" onClick={this.handleCancleBtn}>
          {cancleBtn}
        </button>
      </div>
    );
  }
}

export default withRouter(SingleView);
