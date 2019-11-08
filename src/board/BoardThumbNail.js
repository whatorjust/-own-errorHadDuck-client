import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row, Tooltip, Button } from 'antd';
import moment from 'moment';
import 'moment/locale/ko';

export default function BoardThumbNail(props) {
  let routeJ = '';
  let listHead = '';
  const singleview = '/singleview/';
  const { Data, type } = props;
  const clearData = Data.map(ele => {
    return ele.postname;
  });
  const created = Data.map(ele => {
    return ele.createdAt;
  });
  moment.updateLocale('ko', null);

  if (type === 'entire') {
    routeJ = '/boardlist/entire';
    listHead = '전체 목록';
  } else if (type === 'incompleted') {
    routeJ = '/boardlist/incompleted';
    listHead = '미해결 목록';
  } else {
    routeJ = '/boardlist/completed';
    listHead = '해결 목록';
  }
  return (
    <p>
      <div>
        <div>
          {clearData.length === 0 ? (
            <Button type="primary" disabled>
              {listHead}
            </Button>
          ) : (
            <Link to={routeJ}>
              <Button type="primary">{listHead}</Button>
            </Link>
          )}
        </div>
        <div style={{ background: '#ECECEC', padding: '30px' }}>
          <Row gutter={16}>
            <Col span={8}>
              <Card
                title={
                  <Tooltip
                    title={moment(created[0]).format('YYYY-MM-DD HH:mm:ss')}
                  >
                    <span>{moment(created[0]).fromNow()}</span>
                  </Tooltip>
                }
                bordered={false}
              >
                <Link to={clearData[0] ? singleview + Data[0].id : '/'}>
                  <div>{clearData[0] || '최근 글이 없덕!'}</div>
                </Link>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                title={
                  <Tooltip
                    title={moment(created[1]).format('YYYY-MM-DD HH:mm:ss')}
                  >
                    <span>{moment(created[1]).fromNow()}</span>
                  </Tooltip>
                }
                bordered={false}
              >
                <Link to={clearData[1] ? singleview + Data[1].id : '/'}>
                  <div>{clearData[1] || '최근 글이 없덕!'}</div>
                </Link>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                title={
                  <Tooltip
                    title={moment(created[2]).format('YYYY-MM-DD HH:mm:ss')}
                  >
                    <span>{moment(created[2]).fromNow()}</span>
                  </Tooltip>
                }
                bordered={false}
              >
                <Link to={clearData[2] ? singleview + Data[2].id : '/overview'}>
                  <div>{clearData[2] || '최근 글이 없덕!'}</div>
                </Link>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </p>
  );
}
