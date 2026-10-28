import { ServiceClient } from "../ServiceClient.ts";

interface IClientSocketEvent {
	eventName: string;
	AddEventListenerAtOn: (client: ServiceClient) => void;
}

const ClientSocketEvents: IClientSocketEvent[] = [
	new (class ConnectionError implements IClientSocketEvent {
		eventName: string = "connection_error";
		AddEventListenerAtOn(client: ServiceClient) {
			client.socket.on(this.eventName, (err) => {
				client.Logger.error(err.message);
				client.Logger.error(err.description);
				client.Logger.error(err.context);
			});
		}
	})(),
	new (class Connection implements IClientSocketEvent {
		eventName: string = "connect";
		AddEventListenerAtOn(client: ServiceClient) {
			client.socket.on(this.eventName, () => {
				client.Logger.log("Socket Connected");
			});
		}
	})(),
	new (class DiscordNotificationResponse implements IClientSocketEvent {
		eventName: string = "discordNotificationResponse";
		AddEventListenerAtOn(client: ServiceClient) {
			client.socket.on(this.eventName, (res: string) => {
				client.Logger.log(res);
			});
		}
	})(),
	new (class GetInfo implements IClientSocketEvent {
		eventName: string = "getInfo";
		AddEventListenerAtOn(client: ServiceClient) {
			client.socket.on(this.eventName, () => {
				client.socket.emit("infoReciever", client.serviceName);
			});
		}
	})(),
	new (class CommandDelivery implements IClientSocketEvent {
		eventName: string = "commandDelivery";
		AddEventListenerAtOn(client: ServiceClient) {
			client.socket.on(this.eventName, (IncomingMessage: string) => {
				//Initialize the command info
				IncomingMessage.trim();
				let spaceCount: number = (
					IncomingMessage.match(/([\s]+)/g) ?? ""
				).length;
				let command: string = "";
				let argumentString: string = "";

				//Sort arguments
				if (spaceCount === 0) {
					//Has no arguments
					command = IncomingMessage;
				} else {
					command = IncomingMessage.split(" ")[0];
					argumentString = IncomingMessage.split(" ")[1];
				}

				let isMethodCalled: boolean = false;
				client.ServiceCommandInfoArray.forEach((e) => {
					if (e.commandName.toLowerCase() === command.toLowerCase()) {
						e.commandFunction(argumentString);
						isMethodCalled = true;
					}
				});

				let notificationMessage: string = "";
				if (isMethodCalled) {
					notificationMessage = `command ${command} was successful`;
				} else {
					`Command {${command}} doesn't exist for this service`;
				}

				client.socket.emit(
					"discordNotification",
					client.serviceName,
					notificationMessage,
				);
			});
		}
	})(),
	new (class Disconnect implements IClientSocketEvent {
		eventName: string = "disconnect";
		AddEventListenerAtOn(client: ServiceClient) {
			client.socket.on(this.eventName, () => {
				client.Logger.log(
					`${client.serviceName} disconnected from services handler`,
				);
			});
		}
	})(),
	new (class ForceDisconnect implements IClientSocketEvent {
		eventName: string = "ForceDisconnect";
		AddEventListenerAtOn(client: ServiceClient) {
			client.socket.on(this.eventName, () => {
				client.Logger.log(`Forced disconnect`);
				client.socket.close();
			});
		}
	})(),
];

export function AddEventListenersAtOn(client: ServiceClient) {
	ClientSocketEvents.forEach((e) => {
		e.AddEventListenerAtOn(client);
	});
}
