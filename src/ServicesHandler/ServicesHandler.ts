import { type IDriverEventInterface } from '../Driver.ts';
import express from 'express';
import { GlobalBridge } from '../GlobalBridge.ts';
import { Server } from 'socket.io';
import { createServer } from 'node:http';

//Continue on https://www.youtube.com/watch?v=-MTSQjw5DrM&t=151s
//Socket.io tutorial on https://www.youtube.com/watch?v=1BfCnjr_Vjg&t=305s
export class ServicesHandler implements IDriverEventInterface {
	static pingPortRangeInclusive: [number, number] = [2001, 2100];
	static notificationPort: number = 8080;
	static expressApp = express();

	//Has to be any type since the actual type requires alot of brackets.
	static server: any;
	static io: Server;

	StartupMethod(): boolean {
		ServicesHandler.server = createServer(express);
		ServicesHandler.io = new Server().listen(ServicesHandler.server, {
			cors: { origin: '*' },
		});

		ServicesHandler.io.on('connection', (socket) => {
			console.log('A user is connected');

			socket.on('message', (message) => {
				console.log(message);
				ServicesHandler.io.emit(
					'message',
					`${socket.id.substring(0, 2)} said ${message}`,
				);
			});
		});

		ServicesHandler.server.listen(ServicesHandler.notificationPort, () => {
			console.log(
				`Listening on notification port http://localhost:${ServicesHandler.notificationPort}`,
			);
		});

		ServicesHandler.io;

		//#region Express only portion
		// ServicesHandler.expressApp.use(express.json());

		// ServicesHandler.expressApp.listen(
		// 	ServicesHandler.notificationPort,
		// 	() => {
		// 		console.log(
		// 			`Notification listening is on in http://localhost:${ServicesHandler.notificationPort}`,
		// 		);
		// 	},
		// );

		// ServicesHandler.expressApp.get("/test", (req, res) => {
		// 	res.status(200).send({ Test: "Successful" });
		// });

		// ServicesHandler.expressApp.post("/testPost/:id", (req, res) => {
		// 	const { id } = req.params;
		// 	const { logo } = req.body;

		// 	if (!logo) {
		// 		res.status(418).send({ message: "Please send a logo" });
		// 	}

		// 	res.send({ tshirt: `logo ${logo} id ${id}` });

		// 	GlobalBridge.SendNotification(`${logo}`);
		// });

		// ServicesHandler.expressApp.post("/Notification", (req, res) => {
		// 	let notificationFound = "";
		// 	try {
		// 		const { notification } = req.body;
		// 		notificationFound = notification;
		// 	} catch (error) {
		// 		console.log(error);
		// 		res.status(400).send({
		// 			error: "JSON not correct",
		// 			message:
		// 				"Json should only be {notification, 'string'} to be passed in.",
		// 		});
		// 		return;
		// 	}

		// 	GlobalBridge.SendNotification(`${notificationFound}`);
		// 	res.send(200).send({ success: true });
		// 	return;
		// });
		//#endregion

		return true;
	}

	async HeartbeatMethod(): Promise<boolean> {
		return true;
	}

	SuccessMethod(): boolean {
		//ServicesHandler.io.close();
		//ServicesHandler.server.close();
		return true;
	}

	FailureMethod(): boolean {
		return true;
	}

	// async PingAllAcceptablePorts() {
	// 	ServicesHandler.pingPortRangeInclusive =
	// 		ServicesHandler.pingPortRangeInclusive.sort();

	// 	let portUpperRange: number = ServicesHandler.pingPortRangeInclusive[1];
	// 	let portLowerRange: number = ServicesHandler.pingPortRangeInclusive[0];

	// 	let portsLength: number = Math.abs(portUpperRange - portLowerRange);

	// 	let ports: number[] = [];

	// 	for (let i = 0; i < portsLength; i++) {
	// 		ports.push(portLowerRange + i);
	// 	}
	// 	ports.push(portUpperRange);

	// 	let fetchMethods: (() => Promise<Response>)[] = [];

	// 	for (let i = 0; i < ports.length; i++) {
	// 		fetchMethods.push(async () => {
	// 			return await fetch(`http://localhost:${ports[i]}`);
	// 		});
	// 	}

	// 	return await Promise.allSettled(fetchMethods);
	// }
}
