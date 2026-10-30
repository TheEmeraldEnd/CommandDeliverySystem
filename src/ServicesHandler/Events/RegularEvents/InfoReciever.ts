import { type ISocketEvent } from '../SocketEvents.ts';
import { Socket } from 'socket.io';
import { type ISocketInfo } from '../../ServicesHandler.types.ts';
import { ServicesHandler } from '../../ServicesHandler.ts';

export default class InfoReciever implements ISocketEvent {
	eventName: string = 'infoReciever';
	AddEventListenerAtOn(incomingSocket: Socket) {
		incomingSocket.on(this.eventName, (incomingServiceName: string) => {
			let newSocketInfo: ISocketInfo = {
				socketID: incomingSocket.id,
				serviceName: incomingServiceName,
			};
			ServicesHandler.socketsInfo.push(newSocketInfo);
		});
	}
}
