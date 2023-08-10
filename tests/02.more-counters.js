// 01.counter.js는 base 값이 singleton이기 때문에 재사용할 수 없었습니다.
// 이번에는 여러개의 카운터를 만들 수 있도록 코드를 작성해봅니다.

export const createCounter = (initialCount = 0) => {
  // 이 부분을 작성합니다.

  return { getCount, increase, changeBase };
};
