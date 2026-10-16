import { type IDriverEventInterface } from "../Driver.ts";
import Logger from "../LogRelated/Logger.ts";

//For future development, so this will focus on only being part of the passing of information
export class EncoderDecoder implements IDriverEventInterface {
	static isEncryptToggle: boolean = false;
	static Logger: Logger = new Logger(EncoderDecoder.name);

	static Encrypt(incomingMessage: string = ""): string {
		let result: string = incomingMessage;
		return result;
	}

	static EncryptWithToggle(incomingMessage: string = ""): string {
		if (this.isEncryptToggle) {
			return this.Encrypt(incomingMessage);
		} else {
			return incomingMessage;
		}
	}

	static Decrypt(incomingEncryptedMessage: string = ""): string {
		let result: string = incomingEncryptedMessage;
		return result;
	}

	static DecryptWithToggle(incomingEncryptedMessage: string = ""): string {
		if (this.isEncryptToggle) {
			return this.Decrypt(incomingEncryptedMessage);
		} else {
			return incomingEncryptedMessage;
		}
	}

	async StartupMethod(): Promise<boolean> {
		return true;
	}

	async HeartbeatMethod(): Promise<boolean> {
		return await true;
	}

	async FailureMethod(): Promise<boolean> {
		return true;
	}

	async SuccessMethod(): Promise<boolean> {
		return true;
	}
}
