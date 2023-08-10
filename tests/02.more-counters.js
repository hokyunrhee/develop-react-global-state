export const createCounter = (initialCount = 0) => {
  let count = initialCount;
  let base = 0;

  const getCount = () => count;

  const increase = (num) => {
    count = count + num + base;
  };

  const changeBase = (newBase) => {
    base = newBase;
  };

  return { getCount, increase, changeBase };
};
