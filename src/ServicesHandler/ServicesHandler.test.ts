import { expect, describe, test } from "vitest";
import { ServicesHandler } from "./ServicesHandler";
import { io } from "socket.io-client";

describe("Testing ServicesHandler's socket capabilities", () => {
	test("Just testing things for now", () => {
		//Configure to send message and record message in
		console.log("thing");
		let servicesHandlerVar = new ServicesHandler();

		servicesHandlerVar.StartupMethod();

		const socket = io(`ws://localhost:${ServicesHandler.notificationPort}`);

		socket.on("message", (text) => {
			console.log(text);
		});

		socket.emit("message", "Test Text");

		servicesHandlerVar.SuccessMethod();

		expect(true).toBe(true);
	});
});
