import { ServiceClient } from '../../ServiceClient.ts';
import { type IClientSocketEvent } from '../ClientEvents.ts';

export default class Disconnect implements IClientSocketEvent {
	eventName: string = 'disconnect';
	AddEventListenerAtOn(client: ServiceClient) {
		client.socket.on(this.eventName, () => {
			client.Logger.log(
				`${client.serviceName} disconnected from services handler`,
			);
		});
	}
}
