import path from "node:path";
import * as FileHandler from "./FileHandler.ts";
import StarterClient from "../StarterClient.ts";

const baseDirectoryPath: string = `./src/StarterClient/FileRelated`;
const fileNameAndExtension: string = "PathDatabase.txt";

function GetDatabaseDirectoryForThis() {}

function GetDatabasePath(): string {
	if (baseDirectoryPath === "") {
		return fileNameAndExtension;
	} else {
		return `${baseDirectoryPath}/${fileNameAndExtension}`;
	}
}

export function IsDatabaseExist(): boolean {
	return FileHandler.IsFileOrDirectoryExist(GetDatabasePath());
}

function CreateDataBase() {
	FileHandler.WriteToFile(GetDatabasePath(), "");
}

export function CreateDatabaseIfDatabaseDoesntExist(client: StarterClient) {
	client.serviceClient.Logger.log(`${IsDatabaseExist()}`);
	if (!IsDatabaseExist()) {
		client.serviceClient.Logger.log(
			`${fileNameAndExtension} doesn't exist. Creating it now, but no path exists for it to work.`,
		);
		CreateDataBase();
	} else {
		client.serviceClient.Logger.log(`${fileNameAndExtension} exists.`);
	}
}
