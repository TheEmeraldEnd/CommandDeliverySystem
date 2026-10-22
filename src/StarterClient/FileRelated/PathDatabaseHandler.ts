import * as FileHandler from "./FileHandler.ts";
import StarterClient from "../StarterClient.ts";
import { execFileSync } from "child_process";

const baseDirectoryPath: string = `./src/StarterClient/FileRelated`;
const fileNameAndExtension: string = "PathDatabase.txt";

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

export function CreateDatabaseIfDatabaseDoesntExist() {
	StarterClient.serviceClient.Logger.log(`${IsDatabaseExist()}`);
	if (!IsDatabaseExist()) {
		StarterClient.serviceClient.Logger.log(
			`${fileNameAndExtension} doesn't exist. Creating it now, but no path exists for it to work.`,
		);
		CreateDataBase();
	} else {
		StarterClient.serviceClient.Logger.log(
			`${fileNameAndExtension} exists.`,
		);
	}
}

export function OpenApplication(keyWord: string) {
	let fullContent: string = FileHandler.ReadFromFile(GetDatabasePath()) ?? "";

	if (fullContent === "") {
		StarterClient.serviceClient.SendMessageToBot(
			`No keyword by the name ${keyWord}`,
		);

		return;
	}

	let contentLines: string[] = fullContent.split("\n");
	let contentDictionary: Map<string, string> = new Map<string, string>();

	for (let i = 0; i < contentLines.length; i++) {
		let contentLine = contentLines[i];
		if (!contentLine.includes("=")) {
			let warningString = "Improperly formatted line in PathDatabase";
			StarterClient.serviceClient.Logger.warn(warningString);
			StarterClient.serviceClient.SendMessageToBot(warningString);
			return;
		}
		let contentKeyword: string = contentLine
			.split("=")[0]
			.toLowerCase()
			.trim();
		let contentPath: string = contentLine
			.split("=")[1]
			.replaceAll('"', "")
			.trim();

		contentDictionary.set(contentKeyword, contentPath);
	}

	console.log(contentDictionary.get(keyWord.toLowerCase()));
	contentDictionary.get(keyWord.toLowerCase());
	execFileSync(contentDictionary.get(keyWord.toLowerCase()) ?? "");
}
