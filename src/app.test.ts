import { expect, test } from "vitest";
import { TestFunction } from "./appTest.ts";

test("This to test the basic function of vitest", () => {
	expect(TestFunction()).toBe("true");
});
