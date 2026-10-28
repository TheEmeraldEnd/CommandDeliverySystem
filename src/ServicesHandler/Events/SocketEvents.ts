import { Socket } from "socket.io";
import DiscordNotification from "./EventsSendingAck/DiscordNotification.ts";
import Message from "./RegularEvents/Message.ts";
import InfoReciever from "./RegularEvents/InfoReciever.ts";
import Disconnect from "./PredefinedSocketEvents/Disconnect.ts";

export interface ISocketEvent {
	eventName: string;
	AddEventListenerAtOn: (incomingSocket: Socket) => void;
}

const ServerSocketEvents: ISocketEvent[] = [
	new Message(),
	new DiscordNotification(),
	new InfoReciever(),
	new Disconnect(),
];

export function AddEventListenersAtOn(socket: Socket) {
	ServerSocketEvents.forEach((e) => {
		e.AddEventListenerAtOn(socket);
	});
}
