import { Socket } from 'socket.io-client';
import Logger from '../LogRelated/Logger.ts';

interface IClientSocketEvent {
	eventName: string;
	AddEventListenerAtOn: (
		incomingSocket: Socket,
		IncomingLogger: Logger,
		serviceName: string,
	) => void;
}

const ClientSocketEvents: IClientSocketEvent[] = [
	new (class ConnectionError implements IClientSocketEvent {
		eventName: string = 'connection_error';
		AddEventListenerAtOn(
			incomingSocket: Socket,
			IncomingLogger: Logger,
			serviceName: string,
		) {
			incomingSocket.on(this.eventName, (err) => {
				IncomingLogger.error(err.message);
				IncomingLogger.error(err.description);
				IncomingLogger.error(err.context);
			});
		}
	})(),
	new (class Connection implements IClientSocketEvent {
		eventName: string = 'connect';
		AddEventListenerAtOn(
			incomingSocket: Socket,
			IncomingLogger: Logger,
			serviceName: string,
		) {
			incomingSocket.on(this.eventName, () => {
				IncomingLogger.log('Socket Connected');
			});
		}
	})(),
	new (class DiscordNotificationResponse implements IClientSocketEvent {
		eventName: string = 'discordNotificationResponse';
		AddEventListenerAtOn(
			incomingSocket: Socket,
			IncomingLogger: Logger,
			serviceName: string,
		) {
			incomingSocket.on(this.eventName, (res: string) => {
				IncomingLogger.log(res);
			});
		}
	})(),
	new (class GetInfo implements IClientSocketEvent {
		eventName: string = 'getInfo';
		AddEventListenerAtOn(
			incomingSocket: Socket,
			IncomingLogger: Logger,
			serviceName: string,
		) {
			incomingSocket.on(this.eventName, () => {
				incomingSocket.emit('infoReciever', serviceName);
			});
		}
	})(),
	new (class CommandDelivery implements IClientSocketEvent {
		eventName: string = 'commandDelivery';
		AddEventListenerAtOn(
			incomingSocket: Socket,
			IncomingLogger: Logger,
			serviceName: string,
		) {
			incomingSocket.on(this.eventName, (IncomingMessage: string) => {
				incomingSocket.emit(
					'discordNotification',
					serviceName,
					`${serviceName}: Recieved ${IncomingMessage}`,
				);
			});
		}
	})(),
	new (class Disconnect implements IClientSocketEvent {
		eventName: string = 'disconnect';
		AddEventListenerAtOn(
			incomingSocket: Socket,
			IncomingLogger: Logger,
			serviceName: string,
		) {
			incomingSocket.on(this.eventName, () => {
				IncomingLogger.log(
					`${serviceName} disconnected from services handler`,
				);
			});
		}
	})(),
	new (class ForceDisconnect implements IClientSocketEvent {
		eventName: string = 'ForceDisconnect';
		AddEventListenerAtOn(
			incomingSocket: Socket,
			IncomingLogger: Logger,
			serviceName: string,
		) {
			incomingSocket.on(this.eventName, () => {
				IncomingLogger.log(`Forced disconnect`);
				incomingSocket.close();
			});
		}
	})(),
];

export function AddEventListenersAtOn(
	incomingSocket: Socket,
	IncomingLogger: Logger,
	serviceName: string,
) {
	ClientSocketEvents.forEach((e) => {
		e.AddEventListenerAtOn(incomingSocket, IncomingLogger, serviceName);
	});
}
