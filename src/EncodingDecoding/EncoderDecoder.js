//For future development, so this will focus on only being part of the passing of information
export class EncoderDecoder {
    static isEncryptToggle = false;
    static Encrypt(incomingMessage = "") {
        let result = incomingMessage;
        return result;
    }
    static EncryptWithToggle(incomingMessage = "") {
        if (this.isEncryptToggle) {
            return this.Encrypt(incomingMessage);
        }
        else {
            return incomingMessage;
        }
    }
    static Decrypt(incomingEncryptedMessage = "") {
        let result = incomingEncryptedMessage;
        return result;
    }
    static DecryptWithToggle(incomingEncryptedMessage = "") {
        if (this.isEncryptToggle) {
            return this.Decrypt(incomingEncryptedMessage);
        }
        else {
            return incomingEncryptedMessage;
        }
    }
    StartupMethod() {
        return false;
    }
    async HeartbeatMethod() {
        return await false;
    }
    FailureMethod() {
        return false;
    }
    SuccessMethod() {
        return false;
    }
}
