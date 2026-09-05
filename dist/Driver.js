import { EncoderDecoder } from "./EncodingDecoding/EncoderDecoder";
export class Driver {
    //Delete the class
    static InterfaceEventClasses;
    constructor() {
        Driver.InitializeApp();
    }
    static InitializeApp() {
        this.InterfaceEventClasses = [new EncoderDecoder()];
    }
    static RunApp() { }
    static SyncEventHandler(incomingFunctions) {
        return true;
    }
    static async AsyncEventHandler(incomingFunctions, timeInterval) {
        return true;
    }
}
//# sourceMappingURL=Driver.js.map