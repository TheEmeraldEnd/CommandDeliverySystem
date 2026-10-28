import { type ISocketEvent } from "../SocketEvents.ts";
import { Socket } from "socket.io";
import { ServicesHandler } from "../../ServicesHandler.ts";

export default class Disconnect implements ISocketEvent {
	eventName: string = "disconnect";
	AddEventListenerAtOn(incomingSocket: Socket) {
		incomingSocket.on(this.eventName, () => {
			ServicesHandler.socketsInfo = ServicesHandler.socketsInfo.filter(
				(e) => e.socketID !== incomingSocket.id,
			);
		});
	}
}
