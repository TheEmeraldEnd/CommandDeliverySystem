import { Message, type OmitPartialGroupDMChannel } from 'discord.js';
import { GlobalBridge } from '../../GlobalBridge.ts';

export interface IMessageCreateCommand {
	name: string;
	//Must be one word
	callbackID: string;
	regexArgumentHandler?: RegExp;
	description: string;
	CallBackFunction(
		incomingMessage: OmitPartialGroupDMChannel<Message<boolean>>,
	): Promise<void>;
}

export const messageCreateCommands: IMessageCreateCommand[] = [
	new (class Ping implements IMessageCreateCommand {
		name: string = 'PingPong';
		callbackID: string = 'Ping';
		description: string =
			'A test response that shows that the discord bot is currently active.';
		async CallBackFunction(
			incomingMessage: OmitPartialGroupDMChannel<Message<boolean>>,
		): Promise<void> {
			await incomingMessage.channel.send('Pong');
		}
	})(),
	new (class Help implements IMessageCreateCommand {
		name: string = 'help';
		callbackID: string = 'help';
		description: string =
			'A help command that helps with navigating commands. This accepts no arguments.';
		async CallBackFunction(
			incomingMessage: OmitPartialGroupDMChannel<Message<boolean>>,
		): Promise<void> {
			incomingMessage.channel.send('Available Commands:');
			messageCreateCommands.forEach(async (command) => {
				let formattedString: string = `\t${command.name}\n`;
				formattedString += `\tID:${command.callbackID}\n`;
				formattedString += `\t\t${command.description}`;

				await incomingMessage.channel.send(formattedString);
			});
		}
	})(),
	new (class ServiceCommand implements IMessageCreateCommand {
		name: string = 'ServiceCommand';
		callbackID: string = 'service';
		regexArgumentHandler: RegExp = /\s(.*)/;
		description: string =
			'Call a service and a method depending on the argument. \nIf the argument is not valid, then a response might appear depending on if the service is complete or not.';
		async CallBackFunction(
			incomingMessage: OmitPartialGroupDMChannel<Message<boolean>>,
		): Promise<void> {
			let argument: string =
				incomingMessage.content.match(this.regexArgumentHandler)?.[0] ??
				'';

			argument = argument.trim();

			GlobalBridge.RecieveNotification(argument);
		}
	})(),
];
