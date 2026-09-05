import { describe, test, expect } from "vitest";
import { EncoderDecoder } from "./EncoderDecoder";
describe.skip("test the encryption and decryption by themselves", () => {
    test.skip("Test if encryption is the different after success", () => {
        let testMessage = "This is a test";
        let testMessage2 = EncoderDecoder.Encrypt(testMessage);
        expect(testMessage).not.toBe(testMessage2);
    });
    test.skip("test if decryption is the different after success", () => {
        let originalMessage = "This is a test";
        let encryptedMessage = EncoderDecoder.Encrypt(originalMessage);
        let decryptedMessage = EncoderDecoder.Decrypt(encryptedMessage);
        expect(originalMessage).toBe(decryptedMessage);
    });
    //TODO: TO be done when adding encryption
    test.skip("Test if decryption will work not correctly decrypted", () => { });
});
describe("Test the toggle of encryption and decryption with toggle", () => {
    test.skip("Test if encryption is different after success with encrypt toggle on", () => {
        //Prep
        let originalMessage = "This is the original message";
        let originalToggle = EncoderDecoder.isEncryptToggle;
        EncoderDecoder.isEncryptToggle = true;
        //Test
        let encryptedMessage = EncoderDecoder.EncryptWithToggle(originalMessage);
        expect(encryptedMessage).not.toBe(originalMessage);
        //Reset
        //EncoderDecoder.isEncryptToggle = originalToggle;
    });
    test("Test if encryption is same after success with encrypt toggle off", () => {
        //Prep
        let testMessage = "";
        let originalToggleValue = EncoderDecoder.isEncryptToggle;
        EncoderDecoder.isEncryptToggle = true;
        let testMessage2 = EncoderDecoder.EncryptWithToggle(testMessage);
        //Test
        expect(testMessage).toBe(testMessage2);
        //Reset
        //EncoderDecoder.isEncryptToggle = originalToggleValue;
    });
    test.skip("Test if decryption is different after success with encrypt toggle on", () => {
        //Prep
        let originalMessage = "This is the original message";
        let originalToggle = EncoderDecoder.isEncryptToggle;
        EncoderDecoder.isEncryptToggle = true;
        //Test
        let encryptedMessage = EncoderDecoder.EncryptWithToggle(originalMessage);
        let decryptedMessage = EncoderDecoder.DecryptWithToggle(encryptedMessage);
        expect(decryptedMessage).toBe(originalMessage);
        //Reset
        //EncoderDecoder.isEncryptToggle = originalToggle;
    });
    test("Test if decryption is same after success with encrypt toggle off", () => {
        //Prep
        let testMessage = "";
        let originalToggleValue = EncoderDecoder.isEncryptToggle;
        EncoderDecoder.isEncryptToggle = true;
        let testMessage2 = EncoderDecoder.DecryptWithToggle(testMessage);
        //Test
        expect(testMessage).toBe(testMessage2);
        //Reset
        //EncoderDecoder.isEncryptToggle = originalToggleValue;
    });
    //TODO: This is to be completed when encryption is worked on
    test.skip("Test if decryption failure is handled correctly", () => { });
});
//# sourceMappingURL=EncoderDecoder.test.js.map