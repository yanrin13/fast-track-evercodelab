import axios from "axios";
import { createCoin, getCoins } from "../repositories/coin.repository.js";

const apiKey = process.env.API_KEY;

// Получение курса одной конкретной монеты
export async function getBinanceCoin(symbol: string) {
  try {
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest",
      {
        params: {
          symbol,
          convert: "USD",
        },
        headers: {
          "X-CMC_PRO_API_KEY": apiKey,
        },
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
export async function getBinanceCoins() {
  try {
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        headers: {
          "X-CMC_PRO_API_KEY": apiKey,
        },
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
  const response = await getBinanceCoins();

  for (const coin of response.data) {
    await createCoin(coin.symbol);
  }

  return response.data.length;
}

// Получение монет из базы данных
export function getAllCoins() {
  return getCoins();
}
