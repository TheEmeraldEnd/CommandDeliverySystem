import { Driver } from "./Driver.ts";
import { ServiceClient } from "./ServicesHandler/ServicesHandlerTemplate/ServiceClient.ts";

Driver.InitializeApp();

Driver.RunApp();

console.log("Application Run Complete!!");

let messageToSend = "This is a test message";

let client = new ServiceClient();

setTimeout(() => {
	client.SendNotification(messageToSend);
}, 4000);
