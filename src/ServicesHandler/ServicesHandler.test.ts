import { expect, describe, test } from 'vitest';
import { ServicesHandler } from './ServicesHandler';
import { io } from 'socket.io-client';

describe("Testing ServicesHandler's socket capabilities", () => {
	test('Test a connection', () => {
		//Configure to send message and record message in
		//console.log('thing');
		let servicesHandlerVar = new ServicesHandler();

		servicesHandlerVar.StartupMethod();

		const socket = io(
			`ws://localhost:${ServicesHandler.notificationPort}`,
			{},
		);
		socket.connect();
		servicesHandlerVar.SuccessMethod();

		expect(socket.connected).toBe(true);
	});
});
