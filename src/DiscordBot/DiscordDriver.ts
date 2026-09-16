import { type IDriverEventInterface } from "../Driver.ts";
import dotenv from "dotenv";
import {
	Client,
	GatewayIntentBits,
	ButtonBuilder,
	ButtonStyle,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
	Events,
} from "discord.js";
import path from "node:path";

export class DiscordDriver implements IDriverEventInterface {
	StartupMethod(): boolean {
		dotenv.config({ path: path.resolve("../../Ignore/.env") });

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
		console.log(`Thing: ${process.env.DISCORD_TOKEN}`);
		//Need to figure out how to get to discord token
		// client.login(process.env.DISCORD_TOKEN);

		// //Need to test what button builder does
		// const btn = new ButtonBuilder()
		// 	.setCustomId("Thing")
		// 	.setLabel("This is a new thing")
		// 	.setStyle(ButtonStyle.Premium);

		// client.on(Events.InteractionCreate, async (interaction) => {
		// 	await interaction.reply({
		// 		content: "Hello thing",
		// 		ephemeral: true,
		// 		components: [btn],
		// 	});
		// });

		// client.on("messageCreate", async (message) => {
		// 	console.log("message");

		// 	if (!message.author.bot)
		// 		message.channel.send({
		// 			content: "thing",
		// 		});
		// });
		console.log("Discord thing can be reached");

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
}
