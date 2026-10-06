import { db } from "../db/db.js";

export function createPriceHistory(coinSymbol: string, price: number) {
  return new Promise((resolve, reject) => {
    db.run(
      `
        INSERT INTO price_history (coin_symbol, price)
        VALUES (?, ?)
      `,
      [coinSymbol, price],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      },
    );
  });
}

export function getPriceHistory(coinSymbol: string) {
  return new Promise((resolve, reject) => {
    db.all(
      `
        SELECT *
        FROM price_history
        WHERE coin_symbol = ?
        ORDER BY recorded_at DESC
      `,
      [coinSymbol],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      },
    );
  });
}
