import { it, expect, vi } from "vitest";

import { create } from "./03.module-state";

it("should return new state if state has changed", () => {
  const { setState, getState } = create({ name: "glen", age: 65 });

  setState({ age: 58 });

  expect(getState()).toEqual({ name: "glen", age: 58 });
});

it("should be called when state changes", () => {
  const spy = vi.fn();
  const { setState, subscribe } = create({ name: "glen", age: 65 });
  subscribe(spy);

  setState({ age: 58 });

  expect(spy).toHaveBeenCalledOnce();
  expect(spy).toHaveBeenCalledWith({ name: "glen", age: 58 });
});

it("should unsubscribe correctly", () => {
  const spy = vi.fn();
  const { setState, subscribe } = create({ name: "glen", age: 65 });
  const unsubscribe = subscribe(spy);

  setState({ age: 58 });
  unsubscribe();
  setState({ name: "mark" });

  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith({ name: "glen", age: 58 });
});
