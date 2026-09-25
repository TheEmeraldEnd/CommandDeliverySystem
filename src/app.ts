import { Driver } from "./Driver.ts";
import { GlobalBridge } from "./GlobalBridge.ts";

Driver.InitializeApp();

Driver.RunApp();

console.log("Application Run Complete!!");

async function fetchThing() {
	// await setTimeout(async () => {}, 4000);
	// console.log(
	// 	await fetch("http://localhost:2000/test", {
	// 		method: "GET",
	// 	}),
	// );
	var headers = {
		"Content-Type": "application/json",
		"Access-Control-Origin": "*",
	};
	console.log(
		await fetch("http://localhost:2000/Notification", {
			method: "POST",
			headers: headers,
			body: JSON.stringify({ notification: "Some message" }),
		}),
	);
}

fetchThing();
