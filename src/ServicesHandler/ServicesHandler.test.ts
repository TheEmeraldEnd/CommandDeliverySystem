import { expect, describe, test } from "vitest";
import { ServicesHandler } from "./ServicesHandler";
import { ServiceClient } from "../../submodules/ServiceClient/ServicesClient/ServiceClient";

describe("Server opening and closing functions", async () => {
	test("If server opens and closes successfully", async () => {
		const testServer: ServicesHandler = new ServicesHandler();
		const openResult: boolean = await testServer.StartupMethod();
		const closeResult: boolean = await testServer.SuccessMethod();

		expect(openResult && closeResult).toBe(true);
	});
});

describe("Test server and client functionality", async () => {
	//Setup a test ServicesHandler
	const testServer: ServicesHandler = new ServicesHandler();
	await testServer.StartupMethod();

	//Setup a client to test connectivity
	const serviceName: string = "testClient";
	const testPort: number = 8080;
	const testClient: ServiceClient = new ServiceClient();

	test.todo("Test a connection", () => {});
});
