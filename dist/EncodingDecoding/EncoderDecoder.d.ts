import { type IDriverEventInterface } from "../Driver";
export declare class EncoderDecoder implements IDriverEventInterface {
    static isEncryptToggle: boolean;
    static Encrypt(incomingMessage?: string): string;
    static EncryptWithToggle(incomingMessage?: string): string;
    static Decrypt(incomingEncryptedMessage?: string): string;
    static DecryptWithToggle(incomingEncryptedMessage?: string): string;
    StartupMethod(): boolean;
    HeartbeatMethod(): Promise<boolean>;
    FailureMethod(): boolean;
    SuccessMethod(): boolean;
}
//# sourceMappingURL=EncoderDecoder.d.ts.map