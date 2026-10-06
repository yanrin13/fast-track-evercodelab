import { db } from "../db/db.js";
import { generateApiKey } from "../utils/generateApiKey.js";

export function createUser() {
  const apiKey = generateApiKey();

  db.run("INSERT INTO users (api_key) VALUES (?)", apiKey);

  return apiKey;
}
