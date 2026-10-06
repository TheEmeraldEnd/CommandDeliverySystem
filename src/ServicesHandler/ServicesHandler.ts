import { type IDriverEventInterface } from "../Driver.ts";
import express from "express";
import { GlobalBridge } from "../GlobalBridge.ts";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { log } from "../LoggingMethods.ts";
import { type socketInfo } from "./ServicesHandler.types.ts";

//Continue on https://www.youtube.com/watch?v=-MTSQjw5DrM&t=151s
//Socket.io tutorial on https://www.youtube.com/watch?v=1BfCnjr_Vjg&t=305s
export class ServicesHandler implements IDriverEventInterface {
	static pingPortRangeInclusive: [number, number] = [2001, 2100];
	static notificationPort: number = 8080;
	static expressApp = express();

	//Has to be any type since the actual type requires alot of brackets.
	static server: any;
	static io: Server;

	//Socket info
	static socketsInfo: socketInfo[] = [];

	StartupMethod(): boolean {
		ServicesHandler.server = createServer(express);
		ServicesHandler.io = new Server().listen(ServicesHandler.server, {
			cors: { origin: "*" },
		});

		ServicesHandler.ClearSocketsInfo();

		ServicesHandler.io.on("connection", (socket) => {
			console.log("A user is connected");

			socket.on("message", (message) => {
				ServicesHandler.io.emit(
					"message",
					`${socket.id.substring(0, 2)} said ${message}`,
				);
			});

			socket.on(
				"discordNotification",
				(name: string, notification: string) => {
					GlobalBridge.SendNotification(`${name}: ${notification}`);
					socket.emit(
						"discordNotificationResponse",
						"ServicesHandler server recieved notification successfully.",
					);
				},
			);

			socket.on("infoReciever", (incomingServiceName: string) => {
				ServicesHandler.socketsInfo.push({
					socketID: socket.id,
					serviceName: incomingServiceName,
				});
			});
		});

		ServicesHandler.server.listen(ServicesHandler.notificationPort, () => {
			console.log(
				`Listening on notification port http://localhost:${ServicesHandler.notificationPort}`,
			);
		});

		return true;
	}

	async HeartbeatMethod(): Promise<boolean> {
		return true;
	}

	SuccessMethod(): boolean {
		ServicesHandler.io.close();
		ServicesHandler.server.close();
		return true;
	}

	FailureMethod(): boolean {
		return true;
	}

	static SendCommandMessage(incomingCommandAndString: string) {
		log(this.name, incomingCommandAndString);
		GlobalBridge.SendNotification(
			`${this.name}: recieved command "${incomingCommandAndString}"`,
		);
		//TODO: Needs to send the command to the specified service and a case for service not specified
	}

	static RequestInfoOfAllSockets() {
		this.ClearSocketsInfo();
		ServicesHandler.io.emit("getInfo");
	}

	static ClearSocketsInfo() {
		this.socketsInfo = [];
	}
}
