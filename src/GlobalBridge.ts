import { DiscordDriver } from "./DiscordBot/DiscordDriver.ts";
import { ServicesHandler } from "./ServicesHandler/ServicesHandler.ts";

export class GlobalBridge {
	static SendNotification(messageString: string = ""): void {
		if (messageString === "") {
			return;
		}

		DiscordDriver.SendMessageToGeneral(messageString);
	}

	static async RecieveNotification(
		messageString: string = "",
	): Promise<void> {
		if (messageString === "") {
			return;
		}

		await ServicesHandler.SendCommandMessage(messageString);
	}
}
