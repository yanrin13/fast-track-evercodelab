import { db } from "../db/db.js";

export interface TrackedCoin {
  id: number;
  user_id: number;
  coin_symbol: string;
}

// Получение всех отслеживаемых пользователем монет
export function getTrackedCoins(userId: number): Promise<TrackedCoin[]> {
  return new Promise((resolve, reject) => {
    db.all(
      `
        SELECT id, user_id, coin_symbol
        FROM tracked_coins
        WHERE user_id = ?
        ORDER BY id
      `,
      [userId],
      (err, rows) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(rows as TrackedCoin[]);
      },
    );
  });
}

// Добавить монету в отслеживаемые
export function addTrackedCoin(userId: number, symbol: string): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(
      `
        INSERT INTO tracked_coins (user_id, coin_symbol)
        VALUES (?, ?)
      `,
      [userId, symbol],
      (err) => {
        if (err) {
          reject(err);
          return;
        }

        resolve();
      },
    );
  });
}

// Изменить монету
export function updateTrackedCoin(
  userId: number,
  oldSymbol: string,
  newSymbol: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(
      `
        UPDATE tracked_coins
        SET coin_symbol = ?
        WHERE user_id = ?
          AND coin_symbol = ?
      `,
      [newSymbol, userId, oldSymbol],
      function (err) {
        if (err) {
          reject(err);
          return;
        }

        if (this.changes === 0) {
          reject(new Error("Tracked coin not found"));
          return;
        }

        resolve();
      },
    );
  });
}

// Удалить монету из отслеживаемых
export function deleteTrackedCoin(
  userId: number,
  symbol: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(
      `
        DELETE FROM tracked_coins
        WHERE user_id = ?
          AND coin_symbol = ?
      `,
      [userId, symbol],
      function (err) {
        if (err) {
          reject(err);
          return;
        }

        if (this.changes === 0) {
          reject(new Error("Tracked coin not found"));
          return;
        }

        resolve();
      },
    );
  });
}
