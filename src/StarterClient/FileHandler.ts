import * as fs from "fs";

export class FileHandler {
	static IsFileExist(incomingPathAndName: string): boolean {
		//TODO: Need to figure out why existsSync doesn't work. Is it absolute or relative?
		let tempFile = fs.existsSync("");
		return tempFile;
	}
}
