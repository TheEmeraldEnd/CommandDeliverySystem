import { ServiceClient } from "../ServicesHandler/ServicesClient/ServiceClient.ts";
import * as PathDatabaseHandler from "./FileRelated/PathDatabaseHandler.ts";
import { AddEventListenersToClient } from "./StarterClientCommands.ts";

export default class StarterClient {
	static serviceClient: ServiceClient;
	constructor() {
		let serviceName = "Starter";

		StarterClient.serviceClient = new ServiceClient(8080, serviceName);

		PathDatabaseHandler.CreateDatabaseIfDatabaseDoesntExist();

		AddEventListenersToClient();
	}
}
