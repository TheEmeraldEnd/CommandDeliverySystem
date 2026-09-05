import { test, describe, expect } from "vitest";
import { Driver } from "./Driver";
describe("Testing Sync event handler", () => {
    //Used for populating the functions
    function FalseTestFunction() {
        return false;
    }
    function TrueTestFunction() {
        return true;
    }
    describe("Test No methods", () => {
        test("Test No Methods Only", () => {
            const arrayOfFunctions = [];
            expect(Driver.SyncEventHandler(arrayOfFunctions)).toBe(true);
        });
    });
    describe("Test single functions", () => {
        test("Test for success", () => {
            const arrayOfFunctions = [TrueTestFunction];
            expect(Driver.SyncEventHandler(arrayOfFunctions)).toBe(true);
        });
        test("Test if single method can handle failure", () => {
            const arrayOfFunctions = [FalseTestFunction];
            expect(Driver.SyncEventHandler(arrayOfFunctions)).toBe(false);
        });
    });
    describe("Test multiple methods", () => {
        test("Test for all success", () => {
            const arrayOfFunctions = [
                TrueTestFunction,
                TrueTestFunction,
            ];
            expect(Driver.SyncEventHandler(arrayOfFunctions)).toBe(true);
        });
        test("Test for not all, but one or more fail", () => {
            const arrayOfFunctions = [
                TrueTestFunction,
                FalseTestFunction,
                TrueTestFunction,
                FalseTestFunction,
            ];
            expect(Driver.SyncEventHandler(arrayOfFunctions)).toBe(false);
        });
        test("Test for if all fail", () => {
            const arrayOfFunctions = [
                FalseTestFunction,
                FalseTestFunction,
                FalseTestFunction,
            ];
            expect(Driver.SyncEventHandler(arrayOfFunctions)).toBe(false);
        });
    });
});
describe("Testing Async Event Handler", () => {
    const TIME_INTERVAL_MILISECONDS_LONG = 3000;
    const TIME_INTERVAL_MILISECONDS = 2000;
    const TIME_INTERVAL_MILISECONDS_SHORT = 1000;
    const TIME_INTERVAL_MILISECONDS_PLANK = 0.00001;
    async function FalseTestFunction() {
        return false;
    }
    async function TrueTestFunction() {
        return true;
    }
    async function WaitForTimeFailMedium() {
        await new Promise((resolve) => setTimeout(resolve, TIME_INTERVAL_MILISECONDS));
        return true;
    }
    describe("Test no method", () => {
        test("Test success", async () => {
            const arrayOfFunctions = [];
            let heartbeatInterval = TIME_INTERVAL_MILISECONDS;
            const result = await Driver.AsyncEventHandler(arrayOfFunctions, heartbeatInterval);
            expect(result).toBe(true);
        });
        test("Test if going through no functions trigger the time interval failure", async () => {
            const arrayOfFunctions = [];
            let heartbeatInterval = TIME_INTERVAL_MILISECONDS_PLANK;
            const result = await Driver.AsyncEventHandler(arrayOfFunctions, heartbeatInterval);
            expect(result).toBe(true);
        });
    });
    describe("Test one method", () => {
        test("Test if success", async () => {
            const arrayOfFunctions = [
                TrueTestFunction,
            ];
            const heartbeatInterval = TIME_INTERVAL_MILISECONDS;
            let result = await Driver.AsyncEventHandler(arrayOfFunctions, heartbeatInterval);
            expect(result).toBe(true);
        });
        test("Test for failure", async () => {
            const arrayOfFunctions = [
                FalseTestFunction,
            ];
            let heartbeatInterval = TIME_INTERVAL_MILISECONDS;
            let result = await Driver.AsyncEventHandler(arrayOfFunctions, heartbeatInterval);
            expect(result).toBe(false);
        });
        test("Test if time interval overflow will trigger a fail", async () => {
            const arrayOfFunctions = [
                WaitForTimeFailMedium,
            ];
            let heartbeatInterval = TIME_INTERVAL_MILISECONDS_SHORT;
            let result = await Driver.AsyncEventHandler(arrayOfFunctions, heartbeatInterval);
            expect(result).toBe(false);
        });
    });
    describe("Test multiple functions", () => {
        test("Test multiple functions returning true", async () => {
            const arrayOfFunctions = [
                TrueTestFunction,
                TrueTestFunction,
                TrueTestFunction,
            ];
            let heartbeatInterval = TIME_INTERVAL_MILISECONDS;
            let result = await Driver.AsyncEventHandler(arrayOfFunctions, heartbeatInterval);
            expect(result).toBe(true);
        });
        test("Test multiple functions returning true", async () => {
            const arrayOfFunctions = [
                TrueTestFunction,
                FalseTestFunction,
                TrueTestFunction,
            ];
            let heartbeatInterval = TIME_INTERVAL_MILISECONDS;
            let result = await Driver.AsyncEventHandler(arrayOfFunctions, heartbeatInterval);
            expect(result).toBe(false);
        });
        test("Test if mix of true and false return false", async () => {
            const arrayOfFunctions = [
                TrueTestFunction,
                FalseTestFunction,
                TrueTestFunction,
                FalseTestFunction,
            ];
            let heartbeatInterval = TIME_INTERVAL_MILISECONDS;
            let result = await Driver.AsyncEventHandler(arrayOfFunctions, heartbeatInterval);
            expect(result).toBe(false);
        });
        test("Test if time failure return false", async () => {
            const arrayOfFunctions = [
                TrueTestFunction,
                TrueTestFunction,
                WaitForTimeFailMedium,
            ];
            let heartbeatInterval = TIME_INTERVAL_MILISECONDS_PLANK;
            let result = await Driver.AsyncEventHandler(arrayOfFunctions, heartbeatInterval);
            expect(result).toBe(false);
        });
    });
});
describe("Testing adding Interface of methods", () => {
    //TODO: Need a mock array of interfaces for classes
    //TODO: Set up tests for interface collection
    test("Test collection of the interfaces (not mock data)", () => { });
    test("Test if the interfaces can ");
});
//# sourceMappingURL=Driver.test.js.map