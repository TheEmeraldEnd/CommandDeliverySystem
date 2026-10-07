import { io, Socket } from "socket.io-client";
import { log, warn, error } from "./ServiceClientConsole.ts";
import { IncomingMessage } from "node:http";

export class ServiceClient {
	socket: Socket;
	serviceName: string;
	constructor(socketPortNumber: number = 8080, paramName: string = "client") {
		this.serviceName = paramName;

		this.socket = io(`ws://localhost:${socketPortNumber}`);

		this.socket.on("connection_error", (err) => {
			error(this.serviceName, err.message);
			// error(this.name, err.description);
			// error(this.name, err.context);
		});

		this.socket.on("connect", () => {
			// socket connected
			log(this.serviceName, "Socket Connected");
		});

		this.socket.on("discordNotificationResponse", (res: string) => {
			log(this.serviceName, res);
		});

		this.socket.on("getInfo", () => {
			this.socket.emit("infoReciever", this.serviceName);
		});

		this.socket.on("commandDelivery", (IncomingMessage: string) => {
			this.SendNotification(`Recieved ${IncomingMessage}`);
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
