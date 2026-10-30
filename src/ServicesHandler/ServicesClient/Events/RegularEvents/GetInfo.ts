import { ServiceClient } from '../../ServiceClient.ts';
import { type IClientSocketEvent } from '../ClientEvents.ts';

export default class GetInfo implements IClientSocketEvent {
	eventName: string = 'getInfo';
	AddEventListenerAtOn(client: ServiceClient) {
		client.socket.on(this.eventName, () => {
			client.socket.emit('infoReciever', client.serviceName);
		});
	}
}
