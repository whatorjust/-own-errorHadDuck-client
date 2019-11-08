import React from 'react';
import { Link } from 'react-router-dom';

export default function BoardThumbNail(props) {
  let routeJ = '';
  let listHead = '';
  const singleview = '/singleview/';
  const { Data, type } = props;
  const clearData = Data.map(ele => {
    return ele.postname;
  });

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
          <Link to={routeJ}>{listHead} </Link>
        </div>
        <Link to={clearData[0] ? singleview + Data[0].id : '/'}>
          <div>{clearData[0] || '최근 글이 없덕!'}</div>
        </Link>
        <Link to={clearData[1] ? singleview + Data[1].id : '/'}>
          <div>{clearData[1] || '최근 글이 없덕!'}</div>
        </Link>
        <Link to={clearData[2] ? singleview + Data[2].id : '/overview'}>
          <div>{clearData[2] || '최근 글이 없덕!'}</div>
        </Link>
      </div>
    </p>
  );
}
