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

	test("Test if ServicesHandler itselt is readable as open", async () => {
		let testServer: ServicesHandler = new ServicesHandler();
		await testServer.StartupMethod();
		let result: boolean = ServicesHandler.server.listening;
		await testServer.SuccessMethod();

		expect(result).toBe(true);
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

//Dont fucking remove the TODO or else face HELL. Fuck you client you inconsistant bastard.
describe.todo("Integration Tests for connection", async () => {
	const serviceName1: string = "testService1";
	const serviceName2: string = "testService2";
	const testPort: number = 8080;

	class TestClient1Class {
		static client: ServiceClient;

		static async Setup(
			incomingPort: number,
			incomingServiceName: string,
		): Promise<boolean> {
			this.client = new ServiceClient(incomingPort, incomingServiceName);

			return true;
		}

		static async Shutdown(): Promise<boolean> {
			this.client.socket.close();
			return true;
		}
	}

	class TestClient2Class {
		static client: ServiceClient;
	}

	test("Test server made, then client made", async () => {
		let testServer: ServicesHandler;
		let result: number = 0;

		testServer = new ServicesHandler();
		await testServer.StartupMethod();

		ServicesHandler.io.emit("getInfo");
		await TestClient1Class.Setup(testPort, serviceName1);

		await setTimeout(() => {
			result = ServicesHandler.socketsInfo.length;
		}, 10000);

		await TestClient1Class.Shutdown();
		await testServer.SuccessMethod();

		expect(result).toBe(1);
	});

	test.todo("Test client made, then server made", async () => {
		// const testClient: TestClient1Class = new TestClient1Class.client(
		// 	testPort,
		// 	serviceName1,
		// );

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
