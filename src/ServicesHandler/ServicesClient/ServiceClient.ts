import { io, Socket } from "socket.io-client";
import Logger from "./LogRelated/Logger.ts";
import { AddEventListenersAtOn } from "./Events/ClientEvents.ts";

export class ServiceClient {
	socket: Socket;
	serviceName: string;
	Logger: Logger = new Logger(ServiceClient.name);
	ServiceCommandInfoArray: ServiceCommandInfo[] = [];
	constructor(socketPortNumber: number = 8080, paramName: string = "client") {
		this.serviceName = paramName;

		this.Logger.setServiceName(this.serviceName);

		this.socket = io(`ws://localhost:${socketPortNumber}`);

		AddEventListenersAtOn(this);
	}

	SendMessageToBot(incomingMessage: string) {
		this.socket.emit(
			"discordNotification",
			(this.serviceName, incomingMessage),
		);
	}

	/**
	 * Used to add commands to this client
	 * @param incomingCommandName
	 * 	The command specified to the thing.
	 * @param incomingCommandFunction
	 * 	The incoming function where the default is ''. This is a must for allowing no argument things.
	 */
	AddCommandMethodToEvents(
		incomingCommandName: string,
		incomingCommandFunction: (incomingArguments: string) => void,
	) {
		let result: ServiceCommandInfo = {
			commandName: incomingCommandName.replaceAll(" ", ""),
			commandFunction: incomingCommandFunction,
		};
		this.ServiceCommandInfoArray.push(result);
	}
}

type ServiceCommandInfo = {
	commandName: string;
	commandFunction: (incomingArguments: string) => void;
};
