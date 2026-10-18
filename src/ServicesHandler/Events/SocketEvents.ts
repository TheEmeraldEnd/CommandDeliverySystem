import { Socket } from 'socket.io';
import { ServicesHandler } from '../ServicesHandler.ts';
import { GlobalBridge } from '../../GlobalBridge.ts';
import { type SocketInfo } from '../ServicesHandler.types.ts';

interface ISocketEvent {
	eventName: string;
	AddEventListenerAtOn: (incomingSocket: Socket) => void;
}

const ServerSocketEvents: ISocketEvent[] = [
	new (class Message implements ISocketEvent {
		eventName: string = 'message';
		AddEventListenerAtOn(incomingSocket: Socket) {
			incomingSocket.on(this.eventName, (message) => {
				ServicesHandler.io.emit(
					'message',
					`${incomingSocket.id.substring(0, 2)} said ${message}`,
				);
			});
		}
	})(),
	new (class DiscordNotification implements ISocketEvent {
		eventName: string = 'discordNotification';
		AddEventListenerAtOn(incomingSocket: Socket) {
			incomingSocket.on(
				this.eventName,
				(incomingName: string, notification: string) => {
					GlobalBridge.SendNotification(
						`${incomingName}: ${notification}`,
					);
					incomingSocket.emit(
						'discordNotificationResponse',
						'ServicesHandler server recieved notification successfully.',
					);
				},
			);
		}
	})(),
	new (class InfoReciever implements ISocketEvent {
		eventName: string = 'infoReciever';
		AddEventListenerAtOn(incomingSocket: Socket) {
			incomingSocket.on(this.eventName, (incomingServiceName: string) => {
				let newSocketInfo: SocketInfo = {
					socketID: incomingSocket.id,
					serviceName: incomingServiceName,
				};
				ServicesHandler.socketsInfo.push(newSocketInfo);
			});
		}
	})(),
	new (class Disconnect implements ISocketEvent {
		eventName: string = 'disconnect';
		AddEventListenerAtOn(incomingSocket: Socket) {
			incomingSocket.on(this.eventName, () => {
				ServicesHandler.socketsInfo =
					ServicesHandler.socketsInfo.filter(
						(e) => e.socketID !== incomingSocket.id,
					);
			});
		}
	})(),
];

export function AddEventListenersAtOn(socket: Socket) {
	ServerSocketEvents.forEach((e) => {
		e.AddEventListenerAtOn(socket);
	});
}
