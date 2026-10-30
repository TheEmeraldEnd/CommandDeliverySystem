import { type IDriverEventInterface } from '../Driver.ts';
import express from 'express';
import { GlobalBridge } from '../GlobalBridge.ts';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import { type ISocketInfo } from './ServicesHandler.types.ts';
import Logger from '../LogRelated/Logger.ts';
import { AddEventListenersAtOn } from './Events/SocketEvents.ts';

//Express Tutorial on https://www.youtube.com/watch?v=-MTSQjw5DrM&t=151s
//Socket.io tutorial on https://www.youtube.com/watch?v=1BfCnjr_Vjg&t=305s
export class ServicesHandler implements IDriverEventInterface {
	static notificationPort: number = 8080;
	static expressApp = express();
	static Logger: Logger = new Logger(ServicesHandler.name);

	//Has to be any type since the actual type requires alot of brackets.
	static server: any;
	static io: Server;

	//Socket info
	static socketsInfo: ISocketInfo[] = [];

	static GetSocketServiceName(incomingSocketID: string): string {
		return (
			this.socketsInfo.find((e) => e.socketID === incomingSocketID)
				?.serviceName ?? ''
		);
	}

	async StartupMethod(): Promise<boolean> {
		ServicesHandler.server = createServer(express);
		ServicesHandler.io = new Server().listen(ServicesHandler.server, {
			cors: {
				origin: `ws://localhost:${ServicesHandler.notificationPort}`,
			},
		});

		let isServerListeningSuccessful = false;

		ServicesHandler.io.on('connection', (socket) => {
			AddEventListenersAtOn(socket);
			socket.emit('getInfo');
		});

		ServicesHandler.server.listen(ServicesHandler.notificationPort, () => {
			ServicesHandler.Logger.log(
				`Listening on notification port http://localhost:${ServicesHandler.notificationPort}`,
			);
		});

		isServerListeningSuccessful = true;

		return isServerListeningSuccessful;
	}

	async HeartbeatMethod(): Promise<boolean> {
		return true;
	}

	async SuccessMethod(): Promise<boolean> {
		ServicesHandler.io.close();
		ServicesHandler.server.close();
		return true;
	}

	async FailureMethod(): Promise<boolean> {
		return true;
	}

	static async SendCommandMessage(incomingCommandAndString: string) {
		GlobalBridge.SendNotification(
			`${this.name}: recieved command "${incomingCommandAndString}"`,
		);

		let intendedService: string = (
			incomingCommandAndString.match(/^([\w\-]+)/)?.[0] ?? ''
		).trim();

		let messageContent: string = (
			incomingCommandAndString.match(/\s(.*)/)?.[0] ?? ''
		).trim();

		let selectedSocketID: string =
			this.socketsInfo.find(
				(e) =>
					e.serviceName.toLowerCase() ===
					intendedService.toLowerCase(),
			)?.socketID ?? '';

		if (!(selectedSocketID === '' || selectedSocketID === undefined)) {
			this.io
				.to(selectedSocketID)
				.emit('commandDelivery', messageContent);
		} else {
			ServicesHandler.Logger.log('No socket by name exists.');
			GlobalBridge.SendNotification(
				'No service by that name exists. Please try again.',
			);
		}
	}

	static async CloseAll() {
		ServicesHandler.io.emit('ForceDisconnect');
		ServicesHandler.io.disconnectSockets();
	}
}
