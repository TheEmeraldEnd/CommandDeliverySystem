export interface ServicesHandlerSocketEvent {
	eventCallbackString: string;
	executedMethod: (args: any[]) => any;
}
