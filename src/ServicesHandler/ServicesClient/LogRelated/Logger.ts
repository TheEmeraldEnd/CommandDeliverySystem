/**
 * Used to log information.
 * 	This is strictly for exporting as client logger (can be modified seperately)
 */
export default class Logger {
	scriptName: string;
	serviceName: string = "client_blank";
	serviceNameDefault: string = "";

	constructor(
		incomingName = "",
		incomingServiceName = this.serviceNameDefault,
	) {
		this.scriptName = incomingName;
		this.serviceName = incomingServiceName;
	}

	setServiceName(incomingServiceName = this.serviceNameDefault) {
		this.serviceName = incomingServiceName;
	}

	/**
	 * Display a normal console log in the console
	 * @param incomingMessage
	 * 	The message showing up in the console logs
	 */
	log(incomingMessage: string = ""): void {
		console.log(this.formatMessage(incomingMessage));
	}

	/**
	 * Display a warning that should call attemtion to a specific portion of the code
	 * @param incomingMessage
	 * 	The message showing up in the console logs
	 */
	warn(incomingMessage: string = ""): void {
		console.warn(this.formatMessage(incomingMessage));
	}

	/**
	 * Display a error where a piece of code broke.
	 * @param incomingMessage
	 * 	The message showing up in the console logs
	 */
	error(incomingMessage: string = ""): void {
		console.error(this.formatMessage(incomingMessage));
	}

	formatMessage(incomingMessage: string): string {
		return `${this.serviceName} (${this.scriptName}): ${incomingMessage}`;
	}
}
