import { EncoderDecoder } from "./EncodingDecoding/EncoderDecoder";

export interface DriverEventInterface {
	//Triggered on when the driver is starting startup
	StartupMethod(): boolean;

	//triggered periodically. Must be within interval
	HeartbeatMethod(): Promise<boolean>;

	//Used in if the driver class heartbeat method fails
	FailureMethod(): boolean;

	//Used if success (if reached in the future)
	SuccessMethod(): boolean;
}

export class Driver {
	//Delete the class
	static InterfaceEventClasses: DriverEventInterface[];

	constructor() {
		Driver.InitializeApp();
	}

	static InitializeApp() {
		this.InterfaceEventClasses = [new EncoderDecoder()];
	}

	static RunApp() {}

	static SyncEventHandler(incomingFunctions: (() => boolean)[]): boolean {
		return true;
	}

	static async AsyncEventHandler(
		incomingFunctions: (() => Promise<boolean>)[],
		timeInterval: number,
	): Promise<boolean> {
		return true;
	}
}
