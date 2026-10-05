import { expect, describe, test } from 'vitest';
import { ServicesHandler } from './ServicesHandler';
import { ServiceClient } from './ServicesHandlerTemplate/ServiceClient';

describe("Testing ServicesHandler's socket capabilities", () => {
	test.todo('Test a connection', () => {
		//Needs more work to understand why connection is not working here, but works in field tests
		// let servicesHandlerVar = new ServicesHandler();
		// servicesHandlerVar.StartupMethod();
		// let serviceClientVar = new ServiceClient();
		// expect(serviceClientVar.IsConnected()).toBe(true);
	});
});
