import { io, Socket } from 'socket.io-client';

export class ServiceClient {
	socket: Socket;
	constructor(socketPortNumber: number = 8080) {
		this.socket = io(`ws://localhost:${socketPortNumber}`);

		console.log('this is reached');
		this.socket.on('connection_error', (err) => {
			console.log(err.message);
			// console.log(err.description);
			// console.log(err.context);
		});

		this.socket.on('connect', function () {
			// socket connected
			console.log('Socket Connected');
		});
	}

	IsConnected(): boolean {
		return this.socket.connected;
	}
}
