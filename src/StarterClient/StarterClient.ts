import { ServiceClient } from "../ServicesHandler/ServicesClient/ServiceClient.ts";
import * as FileHandler from "./FileHandler.ts";
import { AddEventListenersToClient } from "./StarterClientCommands.ts";

export default class StarterClient {
	serviceClient: ServiceClient;
	constructor() {
		this.serviceClient = new ServiceClient(8080, StarterClient.name);

		AddEventListenersToClient(this);
	}
}
