import { db } from "../db/db.js";

export function createCoin(symbol: string, name: string, last_updated: string) {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT OR IGNORE INTO coins (symbol, name, last_updated) VALUES (?, ?, ?)",
      [symbol, name, last_updated],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            changes: this.changes,
            lastID: this.lastID,
          });
        }
      },
    );
  });
}

export function getCoins() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM coins", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}
