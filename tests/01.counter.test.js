import { it, expect } from "vitest";

import { increase, count } from "./01.counter";

it("should increase correctly", () => {
  increase(3);

  expect(count).toBe(3);
});
