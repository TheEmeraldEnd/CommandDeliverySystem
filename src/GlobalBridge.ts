import { DiscordDriver } from './DiscordBot/DiscordDriver.ts';
import { ServicesHandler } from './ServicesHandler/ServicesHandler.ts';

export class GlobalBridge {
	static SendNotification(messageString: string = ''): void {
		if (messageString === '') {
			return;
		}

		DiscordDriver.SendMessageToGeneral(messageString);
	}

	static async RecieveNotification(
		messageString: string = '',
	): Promise<void> {
		if (messageString === '') {
			return;
		}

		await ServicesHandler.SendCommandMessage(messageString);
	}

	static async GetClientServicesNames(): Promise<string[]> {
		let result: string[] = [];

		ServicesHandler.socketsInfo.forEach((e) => result.push(e.serviceName));

		return result;
	}

	static async CloseAllServicesAndServicesHandler() {
		ServicesHandler.CloseAll();
	}
}
