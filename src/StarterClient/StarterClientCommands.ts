import StarterClient from "./StarterClient.ts";
import { OpenApplication } from "./FileRelated/PathDatabaseHandler.ts";

type StarterClientCommandInfo = {
	commandName: string;
	commandMethod: (incomingArguments: string) => void;
};

const CommandInfos: StarterClientCommandInfo[] = [
	new (class Start implements StarterClientCommandInfo {
		commandName: string = "start";
		commandMethod(incomingArguments: string) {
			if (incomingArguments.trim().includes(" ")) {
				StarterClient.serviceClient.SendMessageToBot(
					`Argument not correct format for ${this.commandName}`,
				);
			}
			let keyword: string = incomingArguments;
			OpenApplication(keyword);
		}
	})(),
];

export function AddEventListenersToClient() {
	CommandInfos.forEach((e) => {
		StarterClient.serviceClient.AddCommandMethodToEvents(
			e.commandName,
			e.commandMethod,
		);
	});
}
