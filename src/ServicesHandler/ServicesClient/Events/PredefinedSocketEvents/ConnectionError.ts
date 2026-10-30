import { type IClientSocketEvent } from '../ClientEvents.ts';
import { ServiceClient } from '../../ServiceClient';

export default class ConnectionError implements IClientSocketEvent {
	eventName: string = 'connection_error';
	AddEventListenerAtOn(client: ServiceClient) {
		client.socket.on(this.eventName, (err) => {
			client.Logger.error(err.message);
			client.Logger.error(err.description);
			client.Logger.error(err.context);
		});
	}
}
