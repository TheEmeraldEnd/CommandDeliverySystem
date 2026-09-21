import { Message, type OmitPartialGroupDMChannel } from "discord.js";

export interface IMessageCreateCommand {
	name: string;
	//Must be all in one word
	callbackID: string;
	regexArgumentHandler: string;
	CallBackFunction(
		incomingMessage: OmitPartialGroupDMChannel<Message<boolean>>,
	): Promise<void>;
}

export const messageCreateCommands: IMessageCreateCommand[] = [
	new (class Ping implements IMessageCreateCommand {
		name: string = "PingPong";
		callbackID: string = "Ping";
		regexArgumentHandler: string = "";
		async CallBackFunction(
			incomingMessage: OmitPartialGroupDMChannel<Message<boolean>>,
		): Promise<void> {
			await incomingMessage.channel.send("Pong");
		}
	})(),
	new (class Help implements IMessageCreateCommand {
		name: string = "help";
		callbackID: string = "help";
		regexArgumentHandler: string = "";
		async CallBackFunction(
			incomingMessage: OmitPartialGroupDMChannel<Message<boolean>>,
		): Promise<void> {
			//TODO: Needs to be formatted
			messageCreateCommands.forEach(async (command) => {
				await incomingMessage.channel.send(command.name);
			});
		}
	})(),
];
