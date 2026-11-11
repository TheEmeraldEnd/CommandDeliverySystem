import { expect, describe, test } from "vitest";
import { ServicesHandler } from "./ServicesHandler";
import ServiceClient from "../../submodules/ServiceClient/ServiceClient";

describe("Test functionality of the test server", async () => {
	//Designed to run sequentially
	let testServer: ServicesHandler;

	test("Test if server opens", async () => {
		testServer = new ServicesHandler();
		const openResult: boolean = await testServer.StartupMethod();

		expect(openResult).toBe(true);
	});

	describe("integration tests with ServiceClient and events", async () => {
		const serviceName: string = "testService";
		const testPort: number = ServicesHandler.notificationPort;
		const testClient: ServiceClient = new ServiceClient(
			testPort,
			serviceName,
		);

		test.todo("Test if the connection event fires", async () => {
			ServicesHandler.io.emit("getInfo");
		});
	});

	test("Test if server closes properly", async () => {
		let result: boolean = await testServer.SuccessMethod();
		expect(result).toBe(true);
	});
});
