import { type IDriverEventInterface } from "../Driver.ts";
import express from "express";
import { GlobalBridge } from "../GlobalBridge.ts";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { type SocketInfo } from "./ServicesHandler.types.ts";
import Logger from "../LogRelated/Logger.ts";

//Continue on https://www.youtube.com/watch?v=-MTSQjw5DrM&t=151s
//Socket.io tutorial on https://www.youtube.com/watch?v=1BfCnjr_Vjg&t=305s
export class ServicesHandler implements IDriverEventInterface {
	static notificationPort: number = 8080;
	static expressApp = express();
	static Logger: Logger = new Logger(ServicesHandler.name);

	//Has to be any type since the actual type requires alot of brackets.
	static server: any;
	static io: Server;

	//Socket info
	static socketsInfo: SocketInfo[] = [];

	async StartupMethod(): Promise<boolean> {
		ServicesHandler.Logger.log("THis is a thing");

		ServicesHandler.server = createServer(express);
		ServicesHandler.io = new Server().listen(ServicesHandler.server, {
			cors: { origin: "*" },
		});

		let isServerListeningSuccessful = false;

		ServicesHandler.io.on("connection", (socket) => {
			socket.on("message", (message) => {
				ServicesHandler.io.emit(
					"message",
					`${socket.id.substring(0, 2)} said ${message}`,
				);
			});

			socket.on(
				"discordNotification",
				(incomingName: string, notification: string) => {
					GlobalBridge.SendNotification(
						`${incomingName}: ${notification}`,
					);
					socket.emit(
						"discordNotificationResponse",
						"ServicesHandler server recieved notification successfully.",
					);
				},
			);

			socket.on("infoReciever", (incomingServiceName: string) => {
				let newSocketInfo: SocketInfo = {
					socketID: socket.id,
					serviceName: incomingServiceName,
				};
				ServicesHandler.socketsInfo.push(newSocketInfo);
			});

			socket.on("disconnect", () => {
				ServicesHandler.socketsInfo =
					ServicesHandler.socketsInfo.filter(
						(e) => e.socketID !== socket.id,
					);
			});

			socket.emit("getInfo");
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
			incomingCommandAndString.match(/^([\w\-]+)/)?.[0] ?? ""
		).trim();

		let messageContent: string = (
			incomingCommandAndString.match(/\s(.*)/)?.[0] ?? ""
		).trim();

		//Sort through the available services
		let selectedSocketInfo: SocketInfo = { socketID: "", serviceName: "" };
		for (let i = 0; i < this.socketsInfo.length; i++) {
			if (
				this.socketsInfo[i].serviceName.toLowerCase() ===
				intendedService.toLocaleLowerCase()
			) {
				selectedSocketInfo = this.socketsInfo[i];
			}
		}

		if (
			!(
				selectedSocketInfo.socketID === "" ||
				selectedSocketInfo.socketID === undefined
			)
		) {
			this.io
				.to(selectedSocketInfo.socketID)
				.emit("commandDelivery", messageContent);
		} else {
			ServicesHandler.Logger.log("No socket by name exists.");
		}
	}
}
