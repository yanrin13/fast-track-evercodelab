import { getCoins } from "../repositories/coin.repository.js";
import {
  createPriceHistory,
  getPriceHistory,
} from "../repositories/priceHistory.repository.js";
import { getCoinFromApi } from "./coins.service.js";

type Coin = {
  id: number;
  symbol: string;
};

// Обновление цен
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function updatePrices() {
  const coins = (await getCoins()) as Coin[];
  const BATCH_SIZE = 50;
  let successCount = 0;
  let failCount = 0;

  console.log(`[Prices] Starting update for ${coins.length} coins`);

  for (let i = 0; i < coins.length; i += BATCH_SIZE) {
    const batch = coins.slice(i, i + BATCH_SIZE);
    const symbols = batch.map((c) => c.symbol).join(",");

    try {
      const data = await getCoinFromApi(symbols);

      for (const coin of batch) {
        const price = data.data[coin.symbol]?.[0]?.quote?.USD?.price;

        if (typeof price === "number") {
          await createPriceHistory(coin.symbol, price);
          successCount++;
        } else {
          console.warn(`[Prices] Price not found for ${coin.symbol}`);
          failCount++;
        }
      }

      console.log(
        `[Prices] Batch done: ${Math.min(i + BATCH_SIZE, coins.length)} / ${coins.length} (${symbols})`,
      );
    } catch (error) {
      console.error(`[Prices] Batch failed (symbols: ${symbols}):`, error);
      failCount += batch.length;
    }

    if (i + BATCH_SIZE < coins.length) {
      await sleep(1000);
    }
  }

  console.log(
    `[Prices] Finished. Success: ${successCount}, Failed: ${failCount}`,
  );
}

// Получение истории цен по одной монете
export async function getPrice(coinSymbol: string) {
  return getPriceHistory(coinSymbol);
}
