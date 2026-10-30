import { ServiceClient } from '../../ServiceClient.ts';
import { type IClientSocketEvent } from '../ClientEvents.ts';

export default class CommandDelivery implements IClientSocketEvent {
	eventName: string = 'commandDelivery';
	AddEventListenerAtOn(client: ServiceClient) {
		client.socket.on(this.eventName, async (IncomingMessage: string) => {
			//Initialize the command info
			IncomingMessage.trim();
			let spaceCount: number = (IncomingMessage.match(/([\s]+)/g) ?? '')
				.length;
			let command: string = '';
			let argumentString: string = '';

			//Sort arguments
			if (spaceCount === 0) {
				//Has no arguments
				command = IncomingMessage;
			} else {
				command = IncomingMessage.split(' ')[0];
				argumentString = IncomingMessage.split(' ')[1];
			}

			let isMethodCalled: boolean = false;
			client.ServiceCommandInfoArray.forEach((e) => {
				if (e.commandName.toLowerCase() === command.toLowerCase()) {
					e.commandFunction(argumentString);
					isMethodCalled = true;
				}
			});

			let notificationMessage: string = '';
			if (isMethodCalled) {
				notificationMessage = `command ${command} was successful`;
			} else {
				`Command {${command}} doesn't exist for this service`;
			}

			try {
				const response = await client.socket.emitWithAck(
					'discordNotification',
					client.serviceName,
					notificationMessage,
				);
				client.Logger.log(response.message);
			} catch (err) {
				client.Logger.error(`${err}`);
			}
		});
	}
}
