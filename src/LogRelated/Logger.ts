/**
 * Used to log information. Use this
 */
export default class Logger {
	scriptName: string;
	constructor(incomingName = "") {
		this.scriptName = incomingName;
	}

	log(incomingMessage: string = ""): void {
		console.log(`${this.scriptName}: ${incomingMessage}`);
	}

	warn(incomingMessage: string = ""): void {
		console.warn(`${this.scriptName}: ${incomingMessage}`);
	}

	error(incomingMessage: string = ""): void {
		console.error(`${this.scriptName}: ${incomingMessage}`);
	}
}
