import { db } from "./db.js";

export function initSchema(): Promise<void> {
  return new Promise((resolve, reject) => {
    db.exec(
      `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        api_key TEXT NOT NULL UNIQUE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS coins (
        symbol TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS tracked_coins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        coin_symbol TEXT NOT NULL,

        UNIQUE(user_id, coin_symbol),

        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (coin_symbol) REFERENCES coins(symbol) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS price_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        coin_symbol TEXT NOT NULL,
        price REAL NOT NULL,
        recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (coin_symbol) REFERENCES coins(symbol) ON DELETE CASCADE
      );
      `,
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      },
    );
  });
}
