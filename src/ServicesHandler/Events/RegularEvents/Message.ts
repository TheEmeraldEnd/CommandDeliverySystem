import { type ISocketEvent } from "../SocketEvents.ts";
import { ServicesHandler } from "../../ServicesHandler.ts";
import { Socket } from "socket.io";

export default class Message implements ISocketEvent {
	eventName: string = "message";
	AddEventListenerAtOn(incomingSocket: Socket) {
		incomingSocket.on(this.eventName, (message: string) => {
			ServicesHandler.io.emit(
				"message",
				`${incomingSocket.id.substring(0, 2)} said ${message}`,
			);
		});
	}
}
