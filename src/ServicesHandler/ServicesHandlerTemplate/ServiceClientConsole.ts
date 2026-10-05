export function log(name: string, message: string): void {
	console.log(`${name}: ${message}`);
}

export function error(name: string, message: string): void {
	console.error(`${name}: ${message}`);
}

export function warn(name: string, message: string): void {
	console.warn(`${name}: ${message}`);
}
