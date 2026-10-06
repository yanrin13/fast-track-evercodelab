import { getCoins } from "../repositories/coin.repository.js";
import {
  createPriceHistory,
  getPriceHistory,
} from "../repositories/priceHistory.repository.js";
import { getBinanceCoin } from "./coins.service.js";

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

  for (const coin of coins) {
    try {
      const data = await getBinanceCoin(coin.symbol);

      const price = data.data[coin.symbol]?.[0]?.quote?.USD?.price;

      console.log(coin.symbol, price);

      if (typeof price !== "number") {
        console.error(`Price not found for ${coin.symbol}`);
        continue;
      }

      await createPriceHistory(coin.symbol, price);

      await sleep(3000);
    } catch (error) {
      console.error(`Failed to update ${coin.symbol}:`, error);

      await sleep(3000);
    }
  }
}
// Получение истории цен по одной монете
export async function getPrice(coinSymbol: string) {
  return getPriceHistory(coinSymbol);
}
