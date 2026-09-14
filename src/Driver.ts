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
		timeIntervalInMilliseconds: number,
	): Promise<boolean> {
		let startTime: number = new Date().getTime();

		//Gets the time that this should end in milliseconds
		let projectedEndTime: number = startTime + timeIntervalInMilliseconds;

		//Setup for timer
		const timerWithInterval = async () => {
			await new Promise((resolve) =>
				setTimeout(
					() => resolve(console.log("Timer Done")),
					timeIntervalInMilliseconds,
				),
			);

			//Return false because this means that the overall event handler failed.
			return [false];
		};

		//Setup for function calls
		const arrayOfFunctionCalls = async () =>
			await Promise.allSettled(
				await incomingFunctions.map(async (x) => await x()),
			).then((promiseResult): boolean[] => {
				let arrayOfResults: boolean[] = promiseResult.map(
					(m) => m.value,
				);
				return arrayOfResults;
			});

		//Should have a race between all settled functions and the timer
		let result: boolean = await Promise.race([
			arrayOfFunctionCalls(),
			timerWithInterval(),
		]).then((promiseResult: boolean[]) => {
			return promiseResult.every((e) => e === true);
		});

		//Backup date guard
		let endMilliseconds: number = new Date().getTime();

		//Backup wait for projected time guard
		if (endMilliseconds < projectedEndTime) {
			setTimeout(() => {}, projectedEndTime - endMilliseconds);
		}

		return result;
	}
}
