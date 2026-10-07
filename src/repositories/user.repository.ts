import { db } from "../db/db.js";
import { generateApiKey } from "../utils/generateApiKey.js";

export function createUser() {
  const apiKey = generateApiKey();

  db.run("INSERT INTO users (api_key) VALUES (?)", apiKey);

  return apiKey;
}

// Получить api_key первого пользователя

export function getFirstUserApiKey(): Promise<string | null> {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT api_key FROM users ORDER BY id ASC LIMIT 1",
      (err, row: { api_key?: string } | undefined) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(row?.api_key ?? null);
      },
    );
  });
}
