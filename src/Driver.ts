import { EncoderDecoder } from "./EncodingDecoding/EncoderDecoder.ts";

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
		this.InterfaceEventClasses = [new EncoderDecoder()];
	}

	static RunApp() {
		//Start the events
		let isStartSuccessful = this.SyncEventHandler(
			this.InterfaceEventClasses.map((i) => i.StartupMethod),
		);

		//Run the heartbeats

		//Put the final run

		//In case of failure
	}

	static SyncEventHandler(incomingFunctions: (() => boolean)[]): boolean {
		//Shortcut incase there are no methods incoming
		if (incomingFunctions.length === 0) {
			return true;
		}

		let arrayOfResults: boolean[] = [];

		for (let i = 0; i < incomingFunctions.length; i++) {
			let result = incomingFunctions[i]();
			arrayOfResults.push(result);
		}

		return arrayOfResults.every((a) => a === true);
	}

	static async AsyncEventHandler(
		incomingFunctions: (() => Promise<boolean>)[],
		timeInterval: number,
	): Promise<boolean> {
		//0 functions guard
		if (incomingFunctions.length === 0) {
			return true;
		}

		//Setup for timer
		const timerWithInterval = async () => {
			await new Promise((resolve) =>
				setTimeout(
					() => resolve(console.log("Timer Done")),
					timeInterval,
				),
			);
			return false;
		};

		const arrayOfFunctionCall = async () =>
			await Promise.allSettled(
				incomingFunctions.map(async (x) => await x()),
			).then(function (result) {
				return result;
			});

		//Should have a race between all settled functions and the timer
		// TODO: Need to figure out the typing in this promise race.
		let result: boolean = await Promise.race([
			await arrayOfFunctionCall(),
			await timerWithInterval(),
		]).then((promiseResult) => {
			// if (typeof promiseResult === typeof []) {
			// 	return promiseResult
			// 		.map((callBack) => callBack.value)
			// 		.every((value) => value === true);
			// } else {
			// 	return promiseResult.value;
			// }

			return true;
		});

		return result;
	}
}
