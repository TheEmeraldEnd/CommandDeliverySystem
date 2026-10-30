import { ServiceClient } from '../ServiceClient.ts';
import ConnectionError from './PredefinedSocketEvents/ConnectionError.ts';
import CommandDelivery from './RegularEvents/CommandDelivery.ts';
import GetInfo from './RegularEvents/GetInfo.ts';
import Disconnect from './PredefinedSocketEvents/Disconnect.ts';
import ForceDisconnect from './PredefinedSocketEvents/ForceDisconnect.ts';
import Connection from './PredefinedSocketEvents/Connection.ts';

export interface IClientSocketEvent {
	eventName: string;
	AddEventListenerAtOn: (client: ServiceClient) => void;
}

const ClientSocketEvents: IClientSocketEvent[] = [
	new ConnectionError(),
	new Connection(),
	new GetInfo(),
	new CommandDelivery(),
	new Disconnect(),
	new ForceDisconnect(),
];

export function AddEventListenersAtOn(client: ServiceClient) {
	ClientSocketEvents.forEach((e) => {
		e.AddEventListenerAtOn(client);
	});
}
