import { expect, test } from "vitest";
import { TestFunction } from "./app";

test("This to test the basic function of vitest", () => {
	expect(TestFunction()).toBe("true");
});
