import { it, expect } from "vitest";

import { createCounter } from "./02.more-counters";

it("should increase correctly after changing base", () => {
  const { getCount, increase, changeBase } = createCounter(2);

  increase(3);

  expect(getCount()).toBe(5);

  changeBase(4);
  increase(1);

  expect(getCount()).toBe(10);
});

it("should create new counter working correctly", () => {
  const { getCount, increase } = createCounter(10);

  increase(2);

  expect(getCount()).toBe(12);
});
