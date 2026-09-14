import { IDriverEventInterface } from "../Driver";

class DiscordDriver implements IDriverEventInterface {
	StartupMethod(): boolean {
		return false;
	}

	async HeartbeatMethod(): Promise<boolean> {
		return false;
	}

	FailureMethod(): boolean {
		return false;
	}

	SuccessMethod(): boolean {
		return false;
	}
}
