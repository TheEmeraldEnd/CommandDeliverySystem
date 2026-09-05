export interface IDriverEventInterface {
    StartupMethod(): boolean;
    HeartbeatMethod(): Promise<boolean>;
    FailureMethod(): boolean;
    SuccessMethod(): boolean;
}
export declare class Driver {
    static InterfaceEventClasses: IDriverEventInterface[];
    constructor();
    static InitializeApp(): void;
    static RunApp(): void;
    static SyncEventHandler(incomingFunctions: (() => boolean)[]): boolean;
    static AsyncEventHandler(incomingFunctions: (() => Promise<boolean>)[], timeInterval: number): Promise<boolean>;
}
//# sourceMappingURL=Driver.d.ts.map