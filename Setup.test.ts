import { describe, test, expect } from "vitest";
import { GetAllPortClasses, GetAllRunnerClasses } from "./Setup";

describe("Setup Scripts Tests", () => {
	test("Test if GetAllPortClasses returns something other than an empty array", () => {
		let result: any[] = GetAllPortClasses();
		expect(result.length > 0).toBe(true);
	});

	test("Test if GetAllRunnerClasses returns nonempty", () => {
		let result: any[] = GetAllRunnerClasses();
		expect(result.length > 0).toBe(true);
	});
});
