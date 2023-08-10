import React from "react";

export const create = (initialState) => {
  const listeners = new Set();

  let globalState = initialState;

  const getGlobalState = () => globalState;

  const setGlobalState = (newGlobalState) => {
    const nextState =
      typeof newGlobalState === "function"
        ? newGlobalState(globalState)
        : newGlobalState;
    globalState = Object.assign({}, globalState, nextState);

    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener) => {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  };

  const useGlobalState = () => {
    const [state, setState] = React.useState(() => getGlobalState());

    React.useEffect(() => {
      const unsubscribe = subscribe(() => setState(getGlobalState()));
      setState(getGlobalState());

      return unsubscribe;
    }, []);

    return [state, setGlobalState];
  };

  return useGlobalState;
};
