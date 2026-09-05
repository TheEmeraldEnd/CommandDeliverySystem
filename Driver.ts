import { EncoderDecoder } from "./src/EncodingDecoding/EncoderDecoder";

//Methods should default to true or await true if not defined in inherited methods
export interface IDriverEventInterface {
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
	static InterfaceEventClasses: IDriverEventInterface[];

	constructor() {
		Driver.InitializeApp();
	}

	static InitializeApp() {
		//this.InterfaceEventClasses = [new EncoderDecoder()];
	}

	static RunApp() {
		//Start the events
		// let isStartSuccessful = this.SyncEventHandler(
		// 	this.InterfaceEventClasses.map((i) => i.StartupMethod),
		// );

		console.log("This is a new thing");

		//Run the heartbeats

		//Put the final run

		//In case of failure
	}

	static SyncEventHandler(incomingFunctions: (() => boolean)[]): boolean {
		// let arrayOfResults: boolean[] = [];

		// for (let i = 0; i < incomingFunctions.length; i++) {
		// 	let result = incomingFunctions[i]();
		// }

		return true;
	}

	static async AsyncEventHandler(
		incomingFunctions: (() => Promise<boolean>)[],
		timeInterval: number,
	): Promise<boolean> {
		return true;
	}
}
