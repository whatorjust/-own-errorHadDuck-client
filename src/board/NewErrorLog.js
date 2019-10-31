import React from 'react';
import Nav from '../Nav';

export default function NewErrorLog() {
  // TODO: 새글인지 수정인지 구분
  return (
    <div>
      <Nav />

      <div>
        <h3>새로운 에러 작성</h3>
        <div>
          <span>제목</span>
          <input type="text" />
        </div>
        <div>
          <span>에러 코드</span>
          <input type="text" />
        </div>
        <div>
          <span>검색 키워드</span>
          <input type="text" />
          <button type="button">+</button>
        </div>
        <hr />
        <div>
          <div>
            <span>참고한 페이지</span>
            <input type="text" />
          </div>
          <div>
            <span>이해한 내용</span>
            <textArea />
            <button type="button">+</button>
          </div>
        </div>
        <hr />
        <div>
          <span>해결한 내용</span>
          <textArea />
        </div>
      </div>

      <button type="button">해결</button>
      <button type="button">미해결</button>
    </div>
  );
}
