import { inflateRawSync, deflateRawSync } from "node:zlib";

/**
 * https://discord.com/channels/104739787872694272/1005295193005768777/1015345642861764668
 * The format is as follows:
 * The save data is converted into a JSON string
 * The JSON string is then converted into a compressed byte array using the "deflate" algorithm
 * The byte array is then converted into a base64 encoded string
 * The base64 encoded string is finally prepended with compression key "7e8bb5a89f2842ac4af01b3b7e228592"
 */

/**
 * Magic string for Clicker Heroes game data file (unity format)
 */
const magic = "7e8bb5a89f2842ac4af01b3b7e228592";

/**
 * Decodes Clicker Heros game save data (unity format)
 * @param {Buffer} buffer Game data file binary buffer
 * @returns {any} Decoded JSON object game data
 */
export function decode(buffer) {
  const body = buffer.toString().slice(magic.length);
  const compressed = Buffer.from(body, "base64");
  const json = inflateRawSync(compressed).toString();
  return JSON.parse(json);
}

/**
 * Encodes Clicker Heros game save data (unity format)
 * @param {any} data Game data JSON object
 * @returns {string} Encoded string game data
 */
export function encode(data) {
  const json = JSON.stringify(data);
  const compressed = deflateRawSync(json);
  return magic + compressed.toString("base64");
}

/**
 * Sanitizes Clicker Heros game data from personal data
 * @param {any} data Game data JSON object
 * @returns Sanitized game data JSON object
 */
export function sanitize(data) {
  data.uniqueId = "";
  data.passwordHash = "";
  data.subscribedEmail = "";
  data.accountId = 0;
  data.account = {
    id: 0,
  };

  return data;
}
