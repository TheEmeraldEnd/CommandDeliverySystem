import StarterClient from "./StarterClient.ts";

type StarterClientCommandInfo = {
	commandName: string;
	commandMethod: (incomingArguments: string) => void;
};

const CommandInfos: StarterClientCommandInfo[] = [];

export function AddEventListenersToClient(client: StarterClient) {
	CommandInfos.forEach((e) => {
		client.serviceClient.AddCommandMethodToEvents(
			e.commandName,
			e.commandMethod,
		);
	});
}
