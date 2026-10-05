//Used for appwide console logging

/**
 * Used to notify the user of some info
 * @param name: Name of the caller calling this message
 * @param message: Message to send to the user concerning the information
 */
export function log(name: string, message: string) {
	console.log(`${name}: ${message}`);
}

/**
 * Used to tell the user why some error occured
 * @param name: The name of the caller calling the message
 * @param message: Message to send to the user about the error
 */
export function error(name: string, message: string) {
	console.error(`${name}: ${message}`);
}

/**
 * Used to warn the user of a possible error before it occures
 * @param name: Name of the caller
 * @param message: Message the caller is wanting user to know
 */
export function warn(name: string, message: string) {
	console.warn(`${name}: ${message}`);
}
