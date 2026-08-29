import { test, describe, expect } from "vitest";
import { Driver } from "./Driver";

function FalseTestFunction(): boolean {
	return false;
}

function TrueTestFunction(): boolean {
	return true;
}

describe("Testing Sync event handler", () => {
	describe("Test No methods", () => {
		test("Test Success", () => {});
	});
});
