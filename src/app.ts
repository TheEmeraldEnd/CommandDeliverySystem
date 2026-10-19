import { Driver } from "./Driver.ts";
import StarterClient from "./StarterClient/StarterClient.ts";

const starterClient: StarterClient = new StarterClient();

Driver.InitializeApp();

Driver.RunApp();

console.log("Application Run Complete!!");
