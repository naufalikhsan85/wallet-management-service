import crypto from "crypto";

export function encryptPrivateKey(privateKey: string, pin_hash: string, uuid: string) {
  const key = crypto.pbkdf2Sync(pin_hash, uuid, 100000, 32, "sha256");

  const iv = crypto.randomBytes(12); // 96-bit nonce for GCM
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

  const encrypted = Buffer.concat([
    cipher.update(privateKey, "utf8"),
    cipher.final()
  ]);

  const authTag = cipher.getAuthTag();

  return Buffer.concat([iv, authTag, encrypted]).toString("base64");
}

export function decryptPrivateKey(encryptedBase64: string, pin_hash: string, uuid: string) {
  const data = Buffer.from(encryptedBase64, "base64");

  const iv = data.subarray(0, 12);
  const authTag = data.subarray(12, 28);
  const encrypted = data.subarray(28);

  const key = crypto.pbkdf2Sync(pin_hash, uuid, 100000, 32, "sha256");
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final()
  ]);

  return decrypted.toString("utf8");
}
