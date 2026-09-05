import { test, describe, expect } from "vitest";
import { Driver, type IDriverEventInterface } from "./Driver";

describe("Testing Sync event handler", () => {
	//Used for populating the functions
	function FalseTestFunction(): boolean {
		return false;
	}

	function TrueTestFunction(): boolean {
		return true;
	}

	describe("Test No methods", () => {
		test("Test No Methods Only", () => {
			const arrayOfFunctions: (() => boolean)[] = [];

			expect(Driver.SyncEventHandler(arrayOfFunctions)).toBe(true);
		});
	});

	describe("Test single functions", () => {
		test("Test for success", () => {
			const arrayOfFunctions: (() => boolean)[] = [TrueTestFunction];

			expect(Driver.SyncEventHandler(arrayOfFunctions)).toBe(true);
		});

		test("Test if single method can handle failure", () => {
			const arrayOfFunctions: (() => boolean)[] = [FalseTestFunction];

			expect(Driver.SyncEventHandler(arrayOfFunctions)).toBe(false);
		});
	});

	describe("Test multiple methods", () => {
		test("Test for all success", () => {
			const arrayOfFunctions: (() => boolean)[] = [
				TrueTestFunction,
				TrueTestFunction,
			];

			expect(Driver.SyncEventHandler(arrayOfFunctions)).toBe(true);
		});

		test("Test for not all, but one or more fail", () => {
			const arrayOfFunctions: (() => boolean)[] = [
				TrueTestFunction,
				FalseTestFunction,
				TrueTestFunction,
				FalseTestFunction,
			];

			expect(Driver.SyncEventHandler(arrayOfFunctions)).toBe(false);
		});

		test("Test for if all fail", () => {
			const arrayOfFunctions: (() => boolean)[] = [
				FalseTestFunction,
				FalseTestFunction,
				FalseTestFunction,
			];

			expect(Driver.SyncEventHandler(arrayOfFunctions)).toBe(false);
		});
	});
});

describe("Testing Async Event Handler", () => {
	const TIME_INTERVAL_MILISECONDS_LONG: number = 3000;
	const TIME_INTERVAL_MILISECONDS: number = 2000;
	const TIME_INTERVAL_MILISECONDS_SHORT: number = 1000;
	const TIME_INTERVAL_MILISECONDS_PLANK: number = 0.00001;

	async function FalseTestFunction(): Promise<boolean> {
		return false;
	}

	async function TrueTestFunction(): Promise<boolean> {
		return true;
	}

	async function WaitForTimeFailMedium(): Promise<boolean> {
		await new Promise((resolve) =>
			setTimeout(resolve, TIME_INTERVAL_MILISECONDS),
		);
		return true;
	}

	describe("Test no method", () => {
		test("Test success", async () => {
			const arrayOfFunctions: (() => Promise<boolean>)[] = [];
			let heartbeatInterval: number = TIME_INTERVAL_MILISECONDS;

			const result = await Driver.AsyncEventHandler(
				arrayOfFunctions,
				heartbeatInterval,
			);

			expect(result).toBe(true);
		});

		test("Test if going through no functions trigger the time interval failure", async () => {
			const arrayOfFunctions: (() => Promise<boolean>)[] = [];
			let heartbeatInterval: number = TIME_INTERVAL_MILISECONDS_PLANK;

			const result = await Driver.AsyncEventHandler(
				arrayOfFunctions,
				heartbeatInterval,
			);

			expect(result).toBe(true);
		});
	});

	describe("Test one method", () => {
		test("Test if success", async () => {
			const arrayOfFunctions: (() => Promise<boolean>)[] = [
				TrueTestFunction,
			];
			const heartbeatInterval: number = TIME_INTERVAL_MILISECONDS;

			let result: boolean = await Driver.AsyncEventHandler(
				arrayOfFunctions,
				heartbeatInterval,
			);

			expect(result).toBe(true);
		});

		test("Test for failure", async () => {
			const arrayOfFunctions: (() => Promise<boolean>)[] = [
				FalseTestFunction,
			];
			let heartbeatInterval: number = TIME_INTERVAL_MILISECONDS;

			let result: boolean = await Driver.AsyncEventHandler(
				arrayOfFunctions,
				heartbeatInterval,
			);

			expect(result).toBe(false);
		});

		test("Test if time interval overflow will trigger a fail", async () => {
			const arrayOfFunctions: (() => Promise<boolean>)[] = [
				WaitForTimeFailMedium,
			];

			let heartbeatInterval: number = TIME_INTERVAL_MILISECONDS_SHORT;

			let result: boolean = await Driver.AsyncEventHandler(
				arrayOfFunctions,
				heartbeatInterval,
			);

			expect(result).toBe(false);
		});
	});

	describe("Test multiple functions", () => {
		test("Test multiple functions returning true", async () => {
			const arrayOfFunctions: (() => Promise<boolean>)[] = [
				TrueTestFunction,
				TrueTestFunction,
				TrueTestFunction,
			];

			let heartbeatInterval: number = TIME_INTERVAL_MILISECONDS;

			let result: boolean = await Driver.AsyncEventHandler(
				arrayOfFunctions,
				heartbeatInterval,
			);

			expect(result).toBe(true);
		});

		test("Test multiple functions returning true", async () => {
			const arrayOfFunctions: (() => Promise<boolean>)[] = [
				TrueTestFunction,
				FalseTestFunction,
				TrueTestFunction,
			];

			let heartbeatInterval: number = TIME_INTERVAL_MILISECONDS;

			let result: boolean = await Driver.AsyncEventHandler(
				arrayOfFunctions,
				heartbeatInterval,
			);

			expect(result).toBe(false);
		});

		test("Test if mix of true and false return false", async () => {
			const arrayOfFunctions: (() => Promise<boolean>)[] = [
				TrueTestFunction,
				FalseTestFunction,
				TrueTestFunction,
				FalseTestFunction,
			];

			let heartbeatInterval: number = TIME_INTERVAL_MILISECONDS;

			let result: boolean = await Driver.AsyncEventHandler(
				arrayOfFunctions,
				heartbeatInterval,
			);

			expect(result).toBe(false);
		});

		test("Test if time failure return false", async () => {
			const arrayOfFunctions: (() => Promise<boolean>)[] = [
				TrueTestFunction,
				TrueTestFunction,
				WaitForTimeFailMedium,
			];

			let heartbeatInterval: number = TIME_INTERVAL_MILISECONDS_PLANK;

			let result: boolean = await Driver.AsyncEventHandler(
				arrayOfFunctions,
				heartbeatInterval,
			);

			expect(result).toBe(false);
		});
	});
});

describe("Testing adding Interface of methods", () => {
	//TODO: Need a mock array of interfaces for classes

	//TODO: Set up tests for interface collection

	test("Test collection of the interfaces (not mock data)", () => {});

	test("Test if the interfaces can ");
});
