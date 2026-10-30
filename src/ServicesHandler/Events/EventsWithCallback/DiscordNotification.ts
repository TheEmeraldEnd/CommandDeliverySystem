import { type ISocketEvent } from "../SocketEvents.ts";
import { Socket } from "socket.io";
import { GlobalBridge } from "../../../GlobalBridge.ts";
import { ServicesHandler } from "../../ServicesHandler.ts";

export default class DiscordNotification implements ISocketEvent {
	eventName: string = "discordNotification";
	AddEventListenerAtOn(incomingSocket: Socket) {
		incomingSocket.on(this.eventName, (notification: string, callback) => {
			let serviceName: string = ServicesHandler.GetSocketServiceName(
				incomingSocket.id,
			);
			GlobalBridge.SendNotification(`${serviceName}: ${notification}`);

			callback({
				status: "ok",
				message:
					"ServicesHandler server recieved notification successfully.",
			});
		});
	}
}
