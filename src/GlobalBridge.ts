import { DiscordDriver } from "./DiscordBot/DiscordDriver.ts";
import { ServicesHandler } from "./ServicesHandler/ServicesHandler.ts";

export class GlobalBridge {
	static SendNotification(messageString: string = ""): void {
		if (messageString === "") {
			return;
		}

		DiscordDriver.SendMessageToGeneral(messageString);
	}

	static RecieveNotification(messageString: string = ""): void {
		if (messageString === "") {
			return;
		}

		ServicesHandler.SendCommandMessage(messageString);
	}
}
