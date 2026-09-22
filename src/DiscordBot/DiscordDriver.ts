import { type IDriverEventInterface } from "../Driver.ts";
import dotenv from "dotenv";
import { Client, GatewayIntentBits, WebhookClient } from "discord.js";

import path from "node:path";
import { messageCreateCommands } from "./Commands/MessageCreateCommands.ts";

export class DiscordDriver implements IDriverEventInterface {
	//Different clients
	static staticWebhookClient: WebhookClient;
	static staticClient: Client;
	StartupMethod(): boolean {
		dotenv.config({});

		DiscordDriver.staticClient = new Client({
			intents: [
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.Guilds,
				GatewayIntentBits.MessageContent,
				GatewayIntentBits.GuildMessageTyping,
				GatewayIntentBits.DirectMessages,
				GatewayIntentBits.GuildMembers,
			],
		});

		DiscordDriver.staticClient.login(process.env.DISCORD_TOKEN);
		DiscordDriver.staticClient.on("clientReady", () => {
			DiscordDriver.#SendMessageToGeneral(
				DiscordDriver.staticClient,
				`${process.env.GENERAL_CHANNEL_TOKEN}`,
				`${DiscordDriver.#GetBotName(DiscordDriver.staticClient)} is ready for service`,
			);
		});

		DiscordDriver.staticClient.on("messageCreate", async (message) => {
			if (message.author.bot) {
				return;
			}

			let messageID: string =
				message.content.match(/^([\w\-]+)/)?.[0] ?? "";

			let hasCommandFired: boolean = false;

			messageCreateCommands.forEach(async (messageCreateCommand) => {
				if (
					messageCreateCommand.callbackID.toUpperCase() ===
					messageID.toUpperCase()
				) {
					console.log(messageCreateCommand.name + " is activated");
					hasCommandFired = true;
					await messageCreateCommand.CallBackFunction(message);
				}
			});

			if (!hasCommandFired)
				message.channel.send(DiscordDriver.#GetMessageError());
		});

		console.log("Discord Bot ready");

		DiscordDriver.SendMessageToGeneral("Discord Response system is ready");
		console.log("Discord Response system is ready");

		return true;
	}

	static SendMessageToGeneral(incomingSendingString: string = "") {
		// DiscordDriver.#SendMessageToGeneral(
		// 	DiscordDriver.staticClient,
		// 	process.env.GENERAL_CHANNEL_TOKEN,
		// 	incomingSendingString,
		// );

		if (
			DiscordDriver.staticWebhookClient == null ||
			DiscordDriver.staticWebhookClient == undefined
		) {
			DiscordDriver.staticWebhookClient = new WebhookClient({
				url: `${process.env.WEBHOOK_GENERAL_TOKEN}`,
			});
		}

		DiscordDriver.staticWebhookClient.send(incomingSendingString);
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
		channelToken: string = "",
		message: string = "",
	) {
		let generalChannel = incomingClient.channels.cache.get(
			`${channelToken}`,
		);
		if (generalChannel !== undefined) {
			//! Doesn't cause problems. Send is a general channel method
			generalChannel.send(message);
		}
	}

	static #GetMessageError(): string {
		return "No command like that has existed. Type help for more information.";
	}
}
