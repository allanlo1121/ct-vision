import crypto from "node:crypto"

export function generateSalt(bytes = 16) {
  return crypto.randomBytes(bytes).toString("hex")
}

export function sha256WithSalt(password: string, salt: string) {
  return crypto
    .createHash("sha256")
    .update(password + salt)
    .digest("hex")
}

export function generateRandomPassword(bytes = 12) {
  return crypto
    .randomBytes(bytes)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")
}

export function hashMqttPassword(password: string) {
  const salt = generateSalt();

  return {
    salt,
    passwordHash: sha256WithSalt(password, salt),
  };
}