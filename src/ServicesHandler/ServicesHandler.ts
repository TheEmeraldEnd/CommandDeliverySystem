import { type IDriverEventInterface } from "../Driver.ts";
import express from "express";
import { GlobalBridge } from "../GlobalBridge.ts";

//Continue on https://www.youtube.com/watch?v=-MTSQjw5DrM&t=151s
export class ServicesHandler implements IDriverEventInterface {
	static pingPortRangeInclusive: [number, number] = [2001, 2100];
	static notificationPort: number = 2000;
	static app = express();

	StartupMethod(): boolean {
		ServicesHandler.app.use(express.json());

		ServicesHandler.app.listen(ServicesHandler.notificationPort, () => {
			console.log(
				`Notification listening is on in http://localhost:${ServicesHandler.notificationPort}`,
			);
		});

		ServicesHandler.app.get("/test", (req, res) => {
			res.status(200).send({ Test: "Successful" });
		});

		ServicesHandler.app.post("/testPost/:id", (req, res) => {
			const { id } = req.params;
			const { logo } = req.body;

			if (!logo) {
				res.status(418).send({ message: "Please send a logo" });
			}

			res.send({ tshirt: `logo ${logo} id ${id}` });

			GlobalBridge.SendNotification(`${logo}`);
		});

		ServicesHandler.app.post("/Notification", (req, res) => {
			let notificationFound = "";
			try {
				const { notification } = req.body;
				notificationFound = notification;
			} catch (error) {
				console.log(error);
				res.status(400).send({
					error: "JSON not correct",
					message:
						"Json should only be {notification, 'string'} to be passed in.",
				});
				return;
			}

			GlobalBridge.SendNotification(`${notificationFound}`);
			res.send(200).send({ success: true });
			return;
		});

		return true;
	}

	async HeartbeatMethod(): Promise<boolean> {
		return true;
	}

	SuccessMethod(): boolean {
		return true;
	}

	FailureMethod(): boolean {
		return true;
	}
}
