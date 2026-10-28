import { type ISocketEvent } from "../SocketEvents.ts";
import { Socket } from "socket.io";
import { GlobalBridge } from "../../../GlobalBridge.ts";

export default class DiscordNotification implements ISocketEvent {
	eventName: string = "discordNotification";
	AddEventListenerAtOn(incomingSocket: Socket) {
		incomingSocket.on(
			this.eventName,
			(incomingName: string, notification: string, callback) => {
				GlobalBridge.SendNotification(
					`${incomingName}: ${notification}`,
				);

				callback({
					status: "ok",
					message:
						"ServicesHandler server recieved notification successfully.",
				});
			},
		);
	}
}
