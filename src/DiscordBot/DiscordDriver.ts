import { type IDriverEventInterface } from '../Driver.ts';
import dotenv from 'dotenv';
import {
	Client,
	GatewayIntentBits,
	ButtonBuilder,
	ButtonStyle,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
	Events,
	SlashCommandBuilder,
	REST,
	Routes,
} from 'discord.js';

import path from 'node:path';
import { messageCreateCommands } from './Commands/MessageCreateCommands.ts';

export class DiscordDriver implements IDriverEventInterface {
	//Note client can't be a seperate member for some dam reason
	StartupMethod(): boolean {
		dotenv.config({});

		const client = new Client({
			intents: [
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.Guilds,
				GatewayIntentBits.MessageContent,
				GatewayIntentBits.GuildMessageTyping,
				GatewayIntentBits.DirectMessages,
				GatewayIntentBits.GuildMembers,
			],
		});

		client.login(process.env.DISCORD_TOKEN);
		client.on('clientReady', () => {
			// let generalChannel = client.channels.cache.get(
			// 	`${process.env.GENERAL_CHANNEL_TOKEN}`,
			// );

			// //Ignore this, for some reason it works
			// DiscordDriver.#SendMessageToGeneral(client).send(
			// 	`${DiscordDriver.#GetBotName(client)} is ready for service`,
			// );

			DiscordDriver.#SendMessageToGeneral(
				client,
				`${process.env.GENERAL_CHANNEL_TOKEN}`,
				`${DiscordDriver.#GetBotName(client)} is ready for service`,
			);
		});

		// client.on(Events.InteractionCreate, async (interaction) => {
		// 	if (interaction.customID === "Hello") {
		// 		await interaction.reply({
		// 			content: "Hello thing",
		// 			ephemeral: true,
		// 		});
		// 	}
		// });

		client.on('messageCreate', async (message) => {
			if (message.author.bot) {
				return;
			}

			let messageID: string =
				message.content.match(/^([\w\-]+)/)?.[0] ?? '';

			let hasCommandFired: boolean = false;

			messageCreateCommands.forEach(async (messageCreateCommand) => {
				if (
					messageCreateCommand.callbackID.toUpperCase() ===
					messageID.toUpperCase()
				) {
					console.log(messageCreateCommand.name + ' is activated');
					hasCommandFired = true;
					await messageCreateCommand.CallBackFunction(message);
				}
			});

			if (!hasCommandFired)
				message.channel.send(DiscordDriver.#GetMessageError());
		});

		console.log('Discord Bot ready');

		return true;
	}

	async HeartbeatMethod(): Promise<boolean> {
		return true;
	}

	FailureMethod(): boolean {
		return true;
	}

	SuccessMethod(): boolean {
		return true;
	}

	static #GetBotName(incomingClient: Client<boolean>): string {
		return `${incomingClient.user?.displayName}`;
	}

	static #SendMessageToGeneral(
		incomingClient: Client<boolean>,
		channelToken: string = '',
		message: string = '',
	) {
		let generalChannel = incomingClient.channels.cache.get(
			`${channelToken}`,
		);
		if (generalChannel !== undefined) {
			generalChannel.send(message);
		}
	}

	static #GetMessageError(): string {
		return 'No command like that has existed. Type help for more information.';
	}
}
