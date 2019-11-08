const myArray = [
  '꽥꽥',
  '근데 잘 이해가 안 대',
  '방금 한 말 너 무슨말 인지 사실 모르지?',
  '오 그럴싸한데?',
  '그거는 고민할 만 해',
  '오 나도 궁금했던건데',
  '너 꽤 똑똑하구나?',
  '설마 그거로 끝이야?',
  '좀만 더 자세히 얘기해줘',
  '응 그래서 다음에는?',
  '아까 말한 건 알겠는데 그래서 다음에는?',
  '그게 그 소리였어?',
  '거짓말하지마'
];

const randomItemOut = () => {
  return myArray[Math.floor(Math.random() * myArray.length)];
};

export default randomItemOut;
