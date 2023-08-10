export const create = (initialState) => {
  const listeners = new Set();
  let state = initialState;

  const getState = () => state;

  const setState = (newState) => {
    const nextState =
      typeof newState === "function" ? newState(state) : newState;
    state = Object.assign({}, state, nextState);

    listeners.forEach((listener) => listener(getState()));
  };

  const subscribe = (listener) => {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  };

  return { getState, setState, subscribe };
};
