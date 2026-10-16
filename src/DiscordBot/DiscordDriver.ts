import { type IDriverEventInterface } from "../Driver.ts";
import dotenv from "dotenv";
import { Client, GatewayIntentBits, WebhookClient } from "discord.js";

import path from "node:path";
import { messageCreateCommands } from "./Commands/MessageCreateCommands.ts";
import Logger from "../LogRelated/Logger.ts";

export class DiscordDriver implements IDriverEventInterface {
	//Different clients
	static staticWebhookClient: WebhookClient;
	static staticClient: Client;

	//Logger
	static Logger: Logger = new Logger(DiscordDriver.name);

	async StartupMethod(): Promise<boolean> {
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

		let someString = await DiscordDriver.staticClient.login(
			process.env.DISCORD_TOKEN,
		);

		if (someString === undefined || someString === "") {
			DiscordDriver.Logger.warn("Login Unsuccessful");
			return false;
		}

		await DiscordDriver.staticClient.on("clientReady", () => {
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
					DiscordDriver.Logger.log(
						messageCreateCommand.name + " is activated",
					);
					hasCommandFired = true;
					await messageCreateCommand.CallBackFunction(message);
				}
			});

			if (!hasCommandFired) {
				await message.channel.send(DiscordDriver.#GetMessageError());
			}
		});

		DiscordDriver.Logger.log("Discord Bot ready");

		DiscordDriver.SendMessageToGeneral("Discord Response system is ready");
		DiscordDriver.Logger.log("Discord Response system is ready");

		return true;
	}

	static async SendMessageToGeneral(incomingSendingString: string = "") {
		if (
			DiscordDriver.staticWebhookClient == null ||
			DiscordDriver.staticWebhookClient == undefined
		) {
			DiscordDriver.staticWebhookClient = new WebhookClient({
				url: `${process.env.WEBHOOK_GENERAL_TOKEN}`,
			});
		}

		await DiscordDriver.staticWebhookClient.send(incomingSendingString);
	}

	async HeartbeatMethod(): Promise<boolean> {
		return true;
	}

	async FailureMethod(): Promise<boolean> {
		return true;
	}

	async SuccessMethod(): Promise<boolean> {
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
