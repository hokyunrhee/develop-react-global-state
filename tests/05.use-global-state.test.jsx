import React from "react";
import { it, expect } from "vitest";
import { render, screen, userEvent } from "./test-utils";

import { create } from "./05.use-global-state";

it("should change all values if state has changed", async () => {
  // given
  const useGlobalState = create({ count: 0 });

  const Component1 = () => {
    const [state, setState] = useGlobalState();

    const handleClick = () => setState((state) => ({ count: state.count + 1 }));

    return (
      <div>
        <div>count: {state.count}</div>
        <div>
          <button onClick={handleClick}>Increase</button>
        </div>
      </div>
    );
  };

  const Component2 = () => {
    const [state, setState] = useGlobalState();

    const handleClick = () => setState((state) => ({ count: state.count + 1 }));

    return (
      <div>
        <div>count: {state.count}</div>
        <div>
          <button onClick={handleClick}>Increase</button>
        </div>
      </div>
    );
  };

  render(
    <>
      <Component1 />
      <Component2 />
    </>
  );
  const [button] = screen.getAllByRole("button");

  // when
  await userEvent.click(button);

  // then
  const texts = await screen.findAllByText(/count/i);
  texts.forEach((text) => expect(text).toHaveTextContent(1));
});
