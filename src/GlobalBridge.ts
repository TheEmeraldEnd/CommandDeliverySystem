import { DiscordDriver } from './DiscordBot/DiscordDriver.ts';

export class GlobalBridge {
	static SendNotification(messageString: string = ''): void {
		if (messageString === '') {
			return;
		}

		DiscordDriver.SendMessageToGeneral(messageString);
	}

	static RecieveNotification(messageString: string = ''): void {
		if (messageString === '') {
			return;
		}

		//TODO: Eventually send to MessageSorter
		console.log(messageString);
	}
}
