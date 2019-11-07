import React, { Component } from 'react';
import { Comment, Icon, Tooltip } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';

export default class Makelist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      postname: props.postname,
      created: props.created,
      iscomplete: props.iscomplete
    };
  }

  render() {
    const { id, postname, created, iscomplete } = this.state;
    const idNum = `/singleview/${id}`;
    const actions = [<Link to={idNum}>자세히 보기</Link>];

    return (
      <Comment
        actions={actions}
        author={iscomplete === true ? <p>해결된 에러</p> : <p>미해결 에러</p>}
        avatar={
          //완료한 질문과 미완료 질문 icon 다르게 했습니다.
          iscomplete === true ? (
            <Icon type="check-circle" theme="twoTone" />
          ) : (
            <Icon type="question-circle" theme="twoTone" />
          )
        }
        content={<p>{postname}</p>}
        datetime={
          <Tooltip title={moment(created).format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment(created).fromNow()}</span>
          </Tooltip>
        }
      />
    );
  }
}