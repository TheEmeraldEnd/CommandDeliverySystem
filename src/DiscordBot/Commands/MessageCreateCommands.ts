import { Message, type OmitPartialGroupDMChannel } from 'discord.js';
import { GlobalBridge } from '../../GlobalBridge.ts';
import { DiscordDriver } from '../DiscordDriver.ts';

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
			incomingMessage.channel.send('**__Available Commands:__**');
			messageCreateCommands.forEach(async (command) => {
				let formattedString: string = `\t**__${command.name}__**\n`;
				formattedString += `\t*ID:${command.callbackID}*\n`;
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

			await GlobalBridge.RecieveNotification(argument);
		}
	})(),
	new (class GetServicesCommand implements IMessageCreateCommand {
		name: string = 'Get Services';
		callbackID: string = 'GetServices';
		description: string =
			'Gathers the names of services, in the future, there may be a system for getting descriptions as well. No additional arguments needed';
		async CallBackFunction(
			incomingMessage: OmitPartialGroupDMChannel<Message<boolean>>,
		): Promise<void> {
			let servicesNames: string[] =
				await GlobalBridge.GetClientServicesNames();

			let result: string = 'Current applicable Services:';
			servicesNames.forEach((e) => {
				result += `\n\t${e}`;
			});

			incomingMessage.channel.send(result);
		}
	})(),
	new (class CloseAll implements IMessageCreateCommand {
		name: string = 'Close All';
		callbackID: string = 'CloseAll';
		description: string =
			'Closes all processes relating to this discord bot';
		async CallBackFunction(
			incomingMessage: OmitPartialGroupDMChannel<Message<boolean>>,
		): Promise<void> {
			await incomingMessage.channel.send('Killing Application');

			//Kill off the socket services
			await GlobalBridge.CloseAllServicesAndServicesHandler();

			//Kill off the discord bot
			await DiscordDriver.staticClient.destroy();

			DiscordDriver.Logger.log(
				`Killing process as instructed. Farewell...`,
			);

			process.kill(process.pid, 'SIGTERM');
		}
	})(),
];
