import { io, Socket } from 'socket.io-client';
import Logger from './LogRelated/Logger.ts';
import { AddEventListenersAtOn } from './Events/ClientEvents.ts';

export class ServiceClient {
	socket: Socket;
	serviceName: string;
	Logger: Logger = new Logger(ServiceClient.name);
	constructor(socketPortNumber: number = 8080, paramName: string = 'client') {
		this.serviceName = paramName;

		this.Logger.setServiceName(this.serviceName);

		this.socket = io(`ws://localhost:${socketPortNumber}`);

		AddEventListenersAtOn(this.socket, this.Logger, this.serviceName);
	}
}
