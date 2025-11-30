/**
 * Placeholder token generator.
 * IMPORTANT: Replace with ZEGOCLOUD's official token generation code before production.
 */

import crypto from "crypto";

export function generateZegoToken(appID, serverSecret, userID, roomID) {
  const timestamp = Math.floor(Date.now() / 1000);
  const nonce = crypto.randomBytes(8).toString("hex");
  const signature = crypto
    .createHmac("sha256", serverSecret)
    .update(`${appID}_${userID}_${roomID}_${timestamp}_${nonce}`)
    .digest("hex");

  const token = Buffer.from(
    `${appID}:${userID}:${timestamp}:${nonce}:${signature}`
  ).toString("base64");

  return token;
}
