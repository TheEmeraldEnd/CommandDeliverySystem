import { ServiceClient } from "../ServicesHandler/ServicesClient/ServiceClient.ts";
import { FileHandler } from "./FileHandler.ts";
import { AddEventListenersToClient } from "./StarterClientCommands.ts";

export default class StarterClient {
	serviceClient: ServiceClient;
	constructor() {
		this.serviceClient = new ServiceClient(8080, StarterClient.name);
		console.log(
			FileHandler.IsFileExist("C:\Users\Owner\Documents\dk_log.txt"),
		);
		AddEventListenersToClient(this);
	}
}
