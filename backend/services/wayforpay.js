import crypto from "crypto";

export function verifySignature(data, signature, secret) {
  const str = data.join(";");
  const hash = crypto
    .createHmac("md5", secret)
    .update(str)
    .digest("hex");

  return hash === signature;
}
