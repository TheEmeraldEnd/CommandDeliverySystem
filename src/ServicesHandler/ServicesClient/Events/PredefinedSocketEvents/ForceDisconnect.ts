import { ServiceClient } from '../../ServiceClient.ts';
import { type IClientSocketEvent } from '../ClientEvents.ts';

export default class ForceDisconnect implements IClientSocketEvent {
	eventName: string = 'ForceDisconnect';
	AddEventListenerAtOn(client: ServiceClient) {
		client.socket.on(this.eventName, () => {
			client.Logger.log(`Forced disconnect`);
			client.socket.close();
		});
	}
}
