/**
 * Used to log information. Use this
 */
export default class Logger {
	scriptName: string;
	constructor(incomingName = "") {
		this.scriptName = incomingName;
	}

	/**
	 * Display a normal console log in the console
	 * @param incomingMessage
	 * 	The message showing up in the console logs
	 */
	log(incomingMessage: string = ""): void {
		console.log(`${this.scriptName}: ${incomingMessage}`);
	}

	/**
	 * Display a warning that should call attemtion to a specific portion of the code
	 * @param incomingMessage
	 * 	The message showing up in the console logs
	 */
	warn(incomingMessage: string = ""): void {
		console.warn(`${this.scriptName}: ${incomingMessage}`);
	}

	/**
	 * Display a error where a piece of code broke.
	 * @param incomingMessage
	 * 	The message showing up in the console logs
	 */
	error(incomingMessage: string = ""): void {
		console.error(`${this.scriptName}: ${incomingMessage}`);
	}
}
