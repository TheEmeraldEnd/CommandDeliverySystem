import { ServiceClient } from '../../ServiceClient.ts';
import { type IClientSocketEvent } from '../ClientEvents.ts';

export default class Connection implements IClientSocketEvent {
	eventName: string = 'connect';
	AddEventListenerAtOn(client: ServiceClient) {
		client.socket.on(this.eventName, () => {
			client.Logger.log('Socket Connected');
		});
	}
}
