import axios from "axios";
import { createCoin, getCoins } from "../repositories/coin.repository.js";

const apiKey = process.env.API_KEY;

// Получение курса одной конкретной монеты
export async function getCoinFromApi(symbol: string) {
  try {
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest",
      {
        params: { symbol, convert: "USD" },
        headers: { "X-CMC_PRO_API_KEY": apiKey },
        timeout: 5000,
      },
    );
    return response.data;
  } catch (error) {
    console.error("CoinMarketCap API error:", error);
    throw new Error("CoinMarketCap API error");
  }
}

// Получение курсов всех монет
export async function getCoinsFromApi() {
  try {
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        headers: { "X-CMC_PRO_API_KEY": apiKey },
        timeout: 5000,
      },
    );
    return response.data;
  } catch (error) {
    console.error("CoinMarketCap API error:", error);
    throw new Error("CoinMarketCap API error");
  }
}

// Добавление монет в базу данных
export async function syncCoins() {
  const response = await getCoinsFromApi();
  const coins = response.data;
  const BATCH_SIZE = 50;
  const DELAY_MS = 0;
  let successCount = 0;
  let failCount = 0;

  console.log(`[Coins] Starting sync of ${coins.length} coins`);

  for (let i = 0; i < coins.length; i += BATCH_SIZE) {
    const batch = coins.slice(i, i + BATCH_SIZE);

    const results = await Promise.allSettled(
      batch.map(
        (coin: { symbol: string; name: string; last_updated: string }) =>
          createCoin(coin.symbol, coin.name, coin.last_updated),
      ),
    );

    for (const result of results) {
      if (result.status === "fulfilled") {
        successCount++;
      } else {
        failCount++;
        console.error("[Coins] Failed to create coin:", result.reason);
      }
    }

    console.log(
      `[Coins] Processed ${Math.min(i + BATCH_SIZE, coins.length)} / ${coins.length}`,
    );

    if (i + BATCH_SIZE < coins.length) {
      await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
    }
  }

  console.log(
    `[Coins] Sync finished. Success: ${successCount}, Failed: ${failCount}`,
  );

  return coins.length;
}

// Получение монет из базы данных
export function getAllCoins() {
  return getCoins();
}
