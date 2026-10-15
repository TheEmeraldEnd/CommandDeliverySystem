import { EncoderDecoder } from "./EncodingDecoding/EncoderDecoder.ts";
import { DiscordDriver } from "./DiscordBot/DiscordDriver.ts";
import { ServicesHandler } from "./ServicesHandler/ServicesHandler.ts";

//Methods should default to true or await true if not defined in inherited methods
export interface IDriverEventInterface {
	//Triggered on when the driver is starting startup
	StartupMethod(): Promise<boolean>;

	//triggered periodically. Must be within interval
	/**
	 * Currently non-operational
	 */
	HeartbeatMethod(): Promise<boolean>;

	/**
	 * Currently Non operational
	 */
	//Used in if the driver class heartbeat method fails
	FailureMethod(): Promise<boolean>;

	//Used if success (if reached in the future)
	/**
	 * Currently non operational
	 */
	SuccessMethod(): Promise<boolean>;
}

export class Driver {
	static InterfaceEventClasses: IDriverEventInterface[];
	static TimersInMilliseconds = class {
		static heartbeatInterval: number = 2000;
		static startupTimer: number = 2000;
		static failureTimer: number = 20000;
	};

	static InitializeApp() {
		this.InterfaceEventClasses = [
			new EncoderDecoder(),
			new DiscordDriver(),
			new ServicesHandler(),
		];
	}

	static async RunApp() {
		//Start the events
		let isStartSuccessful = await this.AsyncEventHandler(
			this.InterfaceEventClasses.map((i) => i.StartupMethod),
			this.TimersInMilliseconds.startupTimer,
		);

		//Run the heartbeats
		// let isHeartbeatRunSuccessful: boolean = true;
		// if (isStartSuccessful) {
		// 	while (isHeartbeatRunSuccessful) {
		// 		isHeartbeatRunSuccessful = await this.AsyncEventHandler(
		// 			this.InterfaceEventClasses.map((i) => i.HeartbeatMethod),
		// 			this.TimersInMilliseconds.heartbeatInterval,
		// 		);
		// 	}
		// }

		//Put the final run
		//TODO: Make final run exist when method for exiting loop exists

		//In case of failure
		if (!isStartSuccessful) {
			this.AsyncEventHandler(
				this.InterfaceEventClasses.map((i) => i.FailureMethod),
				this.TimersInMilliseconds.failureTimer,
			);
		}
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
				setTimeout(() => {}, timeIntervalInMilliseconds),
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
