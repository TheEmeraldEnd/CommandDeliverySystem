import { io, Socket } from "socket.io-client";
import { log, warn, error } from "./ServiceClientConsole.ts";
import { IncomingMessage } from "node:http";
import Logger from "./LogRelated/Logger.ts";

export class ServiceClient {
	socket: Socket;
	serviceName: string;
	Logger: Logger = new Logger(ServiceClient.name);
	constructor(socketPortNumber: number = 8080, paramName: string = "client") {
		this.serviceName = paramName;

		this.Logger.setServiceName(this.serviceName);

		this.socket = io(`ws://localhost:${socketPortNumber}`);

		this.socket.on("connection_error", (err) => {
			error(this.serviceName, err.message);
			error(this.serviceName, err.description);
			error(this.serviceName, err.context);
		});

		this.socket.on("connect", () => {
			// socket connected
			this.Logger.log("Socket Connected");
		});

		this.socket.on("discordNotificationResponse", (res: string) => {
			this.Logger.log(res);
		});

		this.socket.on("getInfo", () => {
			this.socket.emit("infoReciever", this.serviceName);
		});

		this.socket.on("commandDelivery", (IncomingMessage: string) => {
			this.SendNotification(
				`${this.serviceName}: Recieved ${IncomingMessage}`,
			);
		});

		this.socket.on("disconnect", () => {
			this.Logger.log(`disconnected from services handler`);
		});

		this.socket.on("ForceDisconnect", () => {
			this.Logger.log(`Forced disconnect`);
			this.socket.close();
		});
	}

	IsConnected(): boolean {
		return this.socket.connected;
	}

	/**
	 * Sends a notification to the discord server directly. This is not a garanteed recieved system.
	 * @param incomingNotification
	 * 	The message used to send to the discord server.
	 */
	SendNotification(incomingNotification: string = ""): void {
		this.socket.emit(
			"discordNotification",
			this.serviceName,
			incomingNotification,
		);
	}
}
