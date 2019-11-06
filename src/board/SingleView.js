/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { Tag, Input, Icon, List, Card } from 'antd';

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
      writeRefers: [],
      inputVisible: false,
      inputValue: ''
    };
    this.handleLeftBtn = this.handleLeftBtn.bind(this);
    this.handleAddKeyword = this.handleAddKeyword.bind(this);
    this.handleAddRef = this.handleAddRef.bind(this);
    this.getReadData = this.getReadData.bind(this);
    this.handleCancleBtn = this.handleCancleBtn.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.saveInputRef.focus());
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { writeKeyWords } = this.state;
    if (inputValue && writeKeyWords.indexOf(inputValue) === -1) {
      writeKeyWords = [...writeKeyWords, inputValue];
    }
    this.setState(prev => {
      return {
        ...prev,
        writeKeyWords,
        inputVisible: false,
        inputValue: ''
      };
    });
  };

  handleClose = removedTag => {
    const { writeKeyWords } = this.state;
    const newWriteKeyWords = writeKeyWords.filter(tag => tag !== removedTag);
    this.setState(prev => {
      return { ...prev, writeKeyWords: newWriteKeyWords };
    });
  };

  handleCloseRef = removedTag => {
    const { writeRefers } = this.state;
    const newwriteRefers = writeRefers.filter(tag => tag !== removedTag);
    this.setState(prev => {
      return { ...prev, writeRefers: newwriteRefers };
    });
  };

  handleInputChange = (e, stateKey) => {
    this.setState({ [stateKey]: e.target.value });
  };

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

  handleCancleBtn() {
    const { mode, data } = this.state;
    const { history } = this.props;

    if (mode === 'read') {
      instance
        .delete(`/posts/${data.id}`)
        .then(() => {
          history.push('/overview');
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

      return;
    }

    history.goBack();
  }

  handleLeftBtn() {
    const {
      mode,
      writeKeyWords,
      writeRefers,
      writePostname,
      writeSolution,
      writePostCode,
      data
    } = this.state;
    const { history } = this.props;

    if (mode === 'update') {
      if (writePostname.value === '') {
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
          postname: writePostname,
          postcode: writePostCode,
          solution: writeSolution,
          iscomplete: !this.unsolveRadio.checked
        },
        keyword: writeKeyWords,
        refer: writeRefers
      };

      instance
        .patch(`/posts/${data.id}`, obj)
        .then(res => {
          this.getReadData(res.data.postid);
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

    if (mode === 'read') {
      // TODO: 키워드랑 ref는 어떻게 수정하지..? 메테리얼로 삭제하고 수정은 없고 새로 생성만?

      this.setState({
        mode: 'update',
        writePostname: data.postname,
        writePostCode: data.postcode,
        writeSolution: data.solution,
        writeKeyWords: data.Poskeys.map(ele => ele.Keyword.keyword),
        writeRefers: data.Refers.map(ele => ({
          referurl: ele.referurl,
          understand: ele.understand
        }))
      });
    }

    if (mode === 'write') {
      if (writePostname === '') {
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
          postname: writePostname,
          postcode: writePostCode,
          solution: writeSolution,
          iscomplete: !this.unsolveRadio.checked
        },
        keyword: writeKeyWords,
        refer: writeRefers
      };

      instance
        .post('/posts', obj)
        .then(res => {
          history.push(`/singleview/${res.data.postid}`);
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

  render() {
    const {
      data,
      isErr,
      mode,
      writeKeyWords,
      writeRefers,
      writePostname,
      writePostCode,
      writeSolution,
      needName,
      inputVisible,
      inputValue
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
            <span>
              {mode === 'read' && data && (data.iscomplete ? '해결' : '미해결')}
            </span>
          </div>
          <h1>
            {mode === 'read' && data && data.postname}
            {mode !== 'read' && (
              <input
                placeholder="제목"
                value={writePostname}
                onChange={e => this.handleInputChange(e, 'writePostname')}
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
                <code>{mode === 'read' && data && data.postcode}</code>
              </pre>
              {mode !== 'read' && (
                <textarea
                  value={writePostCode}
                  onChange={e => this.handleInputChange(e, 'writePostCode')}
                />
              )}
            </div>
          </div>

          <div>
            <span>검색 키워드</span>

            {mode !== 'read' && inputVisible && (
              <Input
                ref={element => {
                  this.saveInputRef = element;
                }}
                type="text"
                size="small"
                style={{ width: 78 }}
                value={inputValue}
                onChange={e => this.handleInputChange(e, 'inputValue')}
                onBlur={this.handleInputConfirm}
                onPressEnter={this.handleInputConfirm}
              />
            )}
            {mode !== 'read' && !inputVisible && (
              <Tag
                onClick={this.showInput}
                style={{ background: '#fff', borderStyle: 'dashed' }}
              >
                <Icon type="plus" /> 키워드 추가
              </Tag>
            )}

            <ul>
              {mode !== 'read' &&
                writeKeyWords.map(ele => (
                  <Tag key={ele} closable onClose={() => this.handleClose(ele)}>
                    {ele}
                  </Tag>
                ))}

              {mode === 'read' &&
                data &&
                data.Poskeys.length !== 0 &&
                data.Poskeys.map(ele => (
                  <Tag key={ele.Keyword.keyword} closable={false}>
                    {ele.Keyword.keyword}
                  </Tag>
                ))}
            </ul>
          </div>
          <hr />

          <div>
            <div>
              <span>참고한 페이지</span>{' '}
              {mode !== 'read' && (
                <div>
                  <Icon type="plus" onClick={this.handleAddRef} />
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
                      <textarea
                        ref={element => {
                          this.refUnderstand = element;
                        }}
                      />
                    </li>
                    <List
                      grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 6,
                        xxl: 3
                      }}
                      dataSource={writeRefers}
                      renderItem={item => (
                        <List.Item>
                          <Icon
                            type="delete"
                            onClick={() => this.handleCloseRef(item)}
                          />
                          <Card title={item.referurl}>{item.understand}</Card>
                        </List.Item>
                      )}
                    />
                  </ul>
                </div>
              )}
              {mode === 'read' && data && data.Refers.length !== 0 && (
                <List
                  grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 3
                  }}
                  dataSource={data.Refers}
                  renderItem={item => (
                    <List.Item>
                      <Card title={item.referurl}>{item.understand}</Card>
                    </List.Item>
                  )}
                />
              )}
            </div>
          </div>
          <hr />

          <div>
            <span>해결한 내용</span>
            <p>
              {mode === 'read' && data && data.solution}
              {mode !== 'read' && (
                <textarea
                  value={writeSolution}
                  onChange={e => this.handleInputChange(e, 'writeSolution')}
                />
              )}
            </p>
          </div>

          {mode !== 'read' && (
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
