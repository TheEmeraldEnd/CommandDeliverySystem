import { ServiceClient } from "../ServicesHandler/ServicesClient/ServiceClient.ts";
import * as PathDatabaseHandler from "./FileRelated/PathDatabaseHandler.ts";
import { AddEventListenersToClient } from "./StarterClientCommands.ts";

export default class StarterClient {
	serviceClient: ServiceClient;
	constructor() {
		this.serviceClient = new ServiceClient(8080, StarterClient.name);

		PathDatabaseHandler.CreateDatabaseIfDatabaseDoesntExist(this);

		AddEventListenersToClient(this);
	}
}
