import { type IDriverEventInterface } from "../Driver";

//For future development, so this will focus on only being part of the passing of information
export class EncoderDecoder implements IDriverEventInterface {
	static isEncryptToggle: boolean = false;

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

	StartupMethod(): boolean {
		return false;
	}

	async HeartbeatMethod(): Promise<boolean> {
		return await false;
	}

	FailureMethod(): boolean {
		return false;
	}

	SuccessMethod(): boolean {
		return false;
	}
}
