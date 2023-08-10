# Develop React Global State

React는 글로벌 상태에 대한 직접적인 솔루션을 제공하지 않습니다. 때문에 여러 상태 관리 라이브러리들이 만들어졌고 각기 다른 장단점을 갖고 있습니다.

전역 상태 관리에 대한 이해를 높이기 위해서 이번 시간에는 단순한 전역 상태 관리 hook을 만들어봅니다. 자바스크립트의 모듈 상태를 React의 전역 상태로 사용하기 위해서 구독 패턴을 사용합니다.

## Todo

`tests` 폴더 안의 테스트를 통과하는 코드를 차례대로 작성합니다.

## Advanced

모든 테스트를 통과했다면 이번에는 [Zustand](https://github.com/pmndrs/zustand)의 단순화된 버전을 만들어봅니다.

아래 제시된 코드를 참고하여 작성합니다.

```tsx
import React from "react";

type SetState<T> = (
  partial: T | Partial<T> | ((prev: T) => T | Partial<T>)
) => void;

type Store<T> = {
  getState: () => T;
  setState: SetState<T>;
  subscribe: (callback: () => void) => () => void;
};

type CreateState<T> = (
  setState: Store<T>["setState"],
  getState: Store<T>["getState"]
) => T;

export const create = <T,>(createState: CreateState<T>) => {
  return useStore;
};
```

다음과 같이 사용할 수 있어야합니다.

### Create a store

Your store is a hook! You can put anything in it: primitives, objects, functions. State has to be updated immutably and the set function merges state to help it.

```jsx
import { create } from "zustand";

const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));
```

### Then bind your components, and that's it!

Use the hook anywhere, no providers are needed. Select your state and the component will re-render on changes.

```jsx
function BearCounter() {
  const bears = useBearStore((state) => state.bears);
  return <h1>{bears} around here ...</h1>;
}

function Controls() {
  const increasePopulation = useBearStore((state) => state.increasePopulation);
  return <button onClick={increasePopulation}>one up</button>;
}
```
