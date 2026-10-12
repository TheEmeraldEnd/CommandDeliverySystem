import { Driver } from "./Driver.ts";
import { ServiceClient } from "./ServicesHandler/ServicesHandlerTemplate/ServiceClient.ts";
import { ServicesHandler } from "./ServicesHandler/ServicesHandler.ts";

let messageToSend = "This is a test message";

let client = new ServiceClient();
let client2 = new ServiceClient(8080, "client2");

Driver.InitializeApp();

Driver.RunApp();

console.log("Application Run Complete!!");

setTimeout(() => {
	ServicesHandler.ClearAndRequestInfoOfAllSockets();
}, 4000);
