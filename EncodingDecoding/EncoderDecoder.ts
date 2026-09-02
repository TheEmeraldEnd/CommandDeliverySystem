import { DriverEventInterface } from "../Driver";

export class EncoderDecoder implements DriverEventInterface {
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
