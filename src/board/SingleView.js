/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import {
  Tag,
  Input,
  Icon,
  List,
  Card,
  Typography,
  Button,
  Row,
  Col,
  Divider,
  Popconfirm,
  message,
  Radio
} from 'antd';
import CodeHighlight from './CodeHighlight';

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
    const { referurl, understand } = this.state;

    if (referurl === '' || understand === '') return;

    // this.refUrl.value = '';
    // this.refUnderstand.value = '';

    this.setState(prev => {
      return {
        writeRefers: [...prev.writeRefers, { referurl, understand }],
        referurl: '',
        understand: ''
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
          message.success('삭제되었습니다. 메인으로 돌아갑니다.');
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
      data,
      checked
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
          iscomplete: checked === undefined ? false : checked
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
      inputValue,
      referurl,
      understand
    } = this.state;
    const leftBtn =
      mode === 'read' ? '수정' : mode === 'write' ? '작성 완료' : '수정 완료';
    const cancleBtn =
      mode === 'read' ? '삭제' : mode === 'write' ? '작성 취소' : '수정 취소';
    const { Text, Title } = Typography;
    const { TextArea } = Input;
    const { history } = this.props;
    if (!JSON.parse(localStorage.getItem('isLogin'))) {
      history.push('/');
    }
    return (
      <div>
        <div>
          {isErr === '404' && <Redirect to="/404page" />}
          {isErr === '500' && <Redirect to="/500page" />}
          <div>
            <Text mark>
              {mode === 'read' && data && (data.iscomplete ? '해결' : '미해결')}
            </Text>
          </div>
          <h1>
            {mode === 'read' && data && data.postname}
            {mode !== 'read' && (
              <div>
                <Divider orientation="left">
                  <Title level={3}>
                    <Icon type="code" /> 제목
                  </Title>
                </Divider>
                <Row>
                  <Col span={20} offset={1}>
                    <Input
                      size="large"
                      placeholder="제목"
                      value={writePostname}
                      onChange={e => this.handleInputChange(e, 'writePostname')}
                    />
                  </Col>
                </Row>
              </div>
            )}
          </h1>
          {needName && (
            <span style={{ color: 'red' }}>제목은 필수 항목입니다.</span>
          )}
          <div>
            <Divider orientation="left">
              <Title level={4}>
                <Icon type="code" /> 에러 코드
              </Title>
            </Divider>
            <div>
              {mode === 'read' && data && data.postcode && (
                <CodeHighlight postcode={data.postcode} />
              )}

              {mode !== 'read' && (
                <Row>
                  <Col span={20} offset={1}>
                    <TextArea
                      autoSize={{ minRows: 15, maxRows: 15 }}
                      value={writePostCode}
                      onChange={e => this.handleInputChange(e, 'writePostCode')}
                    />
                  </Col>
                </Row>
              )}
            </div>
          </div>

          <div>
            <Divider orientation="left">
              <Title level={4}>
                <Icon type="tag" /> 검색 키워드
              </Title>
            </Divider>

            <ul>
              {mode !== 'read' &&
                writeKeyWords.map(ele => (
                  <Tag key={ele} closable onClose={() => this.handleClose(ele)}>
                    {ele}
                  </Tag>
                ))}

              {mode === 'read' && data && data.Poskeys.length !== 0 && (
                <Row>
                  <Col span={20} offset={1}>
                    {data.Poskeys.map(ele => (
                      <Tag key={ele.Keyword.keyword} closable={false}>
                        {ele.Keyword.keyword}
                      </Tag>
                    ))}
                  </Col>
                </Row>
              )}
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
            </ul>
          </div>

          <div>
            <div>
              <Divider orientation="left">
                <Title level={4}>
                  <Icon type="link" /> 참고
                </Title>
              </Divider>
              {mode !== 'read' && (
                <div>
                  <Row>
                    <Col span={20} offset={1}>
                      <Button
                        block
                        type="primary"
                        icon="plus"
                        size="middle"
                        onClick={this.handleAddRef}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={20} offset={1}>
                      {' '}
                      <Input
                        addonBefore="URL"
                        value={referurl}
                        onChange={e => this.handleInputChange(e, 'referurl')}
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: '30px' }}>
                    <Col span={20} offset={1}>
                      <Input
                        addonBefore="이해한 내용"
                        value={understand}
                        onChange={e => this.handleInputChange(e, 'understand')}
                      />
                    </Col>
                  </Row>

                  <List
                    grid={{
                      gutter: 16
                    }}
                    dataSource={writeRefers}
                    renderItem={item => (
                      <List.Item>
                        <Row>
                          <Col span={20} offset={1}>
                            <Button
                              block
                              type="danger"
                              icon="delete"
                              size="middle"
                              onClick={() => this.handleCloseRef(item)}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col span={20} offset={1}>
                            <Card title={item.referurl} size="small">
                              {item.understand}
                            </Card>
                          </Col>
                        </Row>
                      </List.Item>
                    )}
                  />
                </div>
              )}
              {mode === 'read' && data && data.Refers.length !== 0 && (
                <List
                  grid={{
                    gutter: 16
                  }}
                  dataSource={data.Refers}
                  renderItem={item => (
                    <Row>
                      <Col span={20} offset={2}>
                        <List.Item>
                          <Card title={item.referurl} size="small">
                            {item.understand}
                          </Card>
                        </List.Item>
                      </Col>
                    </Row>
                  )}
                />
              )}
            </div>
          </div>

          <div>
            <Divider orientation="left">
              <Title level={4}>
                <Icon type="bulb" /> 해결
              </Title>
            </Divider>
            {mode !== 'read' && (
              <Row>
                <Col span={20} offset={1}>
                  <Radio.Group defaultValue="unsolve" size="large">
                    <Radio.Button
                      value="unsolve"
                      onClick={() => this.setState({ checked: false })}
                      ref={element => {
                        this.unsolveRadio = element;
                      }}
                    >
                      미해결
                    </Radio.Button>
                    <Radio.Button
                      value="solved"
                      onClick={() => this.setState({ checked: true })}
                    >
                      해결
                    </Radio.Button>
                  </Radio.Group>
                </Col>
              </Row>
            )}
            <p>
              {mode === 'read' && data && (
                <Row>
                  <Col span={20} offset={2}>
                    {data.solution}
                  </Col>
                </Row>
              )}
              {mode !== 'read' && (
                <Row>
                  <Col span={20} offset={1}>
                    <TextArea
                      autoSize={{ minRows: 10, maxRows: 10 }}
                      value={writeSolution}
                      onChange={e => this.handleInputChange(e, 'writeSolution')}
                    />
                  </Col>
                </Row>
              )}
            </p>
          </div>
        </div>
        <Divider dashed />
        <Row type="flex" justify="center">
          <Col span={2}>
            <Button type="primary" onClick={this.handleLeftBtn}>
              {leftBtn}
            </Button>
          </Col>
          <Col>
            {mode === 'read' ? (
              <Popconfirm
                title="삭제하시겠습니까？"
                okText="네"
                cancelText="아니요"
                onConfirm={this.handleCancleBtn}
              >
                <Button type="danger">{cancleBtn}</Button>
              </Popconfirm>
            ) : (
              <Button type="danger" onClick={this.handleCancleBtn}>
                {cancleBtn}
              </Button>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(SingleView);
