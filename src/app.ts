import { Driver } from "./Driver.ts";
import { ServiceClient } from "./ServicesHandler/ServicesClient/ServiceClient.ts";
import { ServicesHandler } from "./ServicesHandler/ServicesHandler.ts";

let client = new ServiceClient();
let client2 = new ServiceClient(8080, "client2");

Driver.InitializeApp();

Driver.RunApp();

console.log("Application Run Complete!!");
