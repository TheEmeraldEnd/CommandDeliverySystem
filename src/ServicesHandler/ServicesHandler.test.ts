import { expect, describe, test } from "vitest";
import { ServicesHandler } from "./ServicesHandler";
import ServiceClient from "../../submodules/ServiceClient/ServiceClient";

describe("Test functionality of the test server", async () => {
	//Designed to run sequentially
	let testServer: ServicesHandler;

	test("Test if server opens and closes properly", async () => {
		let testServer: ServicesHandler = new ServicesHandler();
		const openResult: boolean = await testServer.StartupMethod();
		const closeResult: boolean = await testServer.SuccessMethod();

		expect(openResult && closeResult).toBe(true);
	});

	test("Test if 8080 is properly handled after set.", async () => {
		const testServer: ServicesHandler = new ServicesHandler();
		await testServer.StartupMethod();
		await testServer.SuccessMethod();

		const testServer2: ServicesHandler = new ServicesHandler();
		const openResult: boolean = await testServer2.StartupMethod();
		const closeResult: boolean = await testServer2.SuccessMethod();

		expect(openResult && closeResult).toBe(true);
	});
});

describe("Integration Tests for connection", async () => {
	const serviceName1: string = "testService1";
	const serviceName2: string = "testService2";
	const testPort: number = 8080;

	test("Test if clients can connect to an already made server", async () => {
		const testServer: ServicesHandler = new ServicesHandler();
		await testServer.StartupMethod();

		const testClient: ServiceClient = new ServiceClient(
			testPort,
			serviceName1,
		);

		let result: number = ServicesHandler.socketsInfo.length;
		await testServer.SuccessMethod();

		expect(result).toBe(1);
	});

	test("Test if clients can connect to a server before server is made", async () => {
		const testClient: ServiceClient = new ServiceClient(
			testPort,
			serviceName1,
		);

		await setTimeout(() => {}, 1000);
		const testServer: ServicesHandler = new ServicesHandler();
		await testServer.StartupMethod();
		const result: number = ServicesHandler.socketsInfo.length;
		await testServer.SuccessMethod();

		expect(result).toBe(1);
	});
});

describe.skip("Integration test of client events to server", async () => {});

describe.skip("Integration test of server events to client", async () => {});
