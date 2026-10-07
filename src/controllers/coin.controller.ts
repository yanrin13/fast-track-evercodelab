import type { Request, Response } from "express";
import {
  getCoinFromApi,
  getCoinsFromApi,
  getAllCoins,
} from "../services/coins.service.js";
import { parseCoinSymbol } from "../utils/validation.js";

// Получение курса одной конкретной монеты
export async function getCoinPrice(req: Request, res: Response) {
  try {
    const coinSymbol = parseCoinSymbol(req.params.coinSymbol);

    if (coinSymbol === null) {
      return res.status(400).json({
        error: "Invalid cryptocurrency symbol",
      });
    }

    const data = await getCoinFromApi(coinSymbol.toUpperCase());

    res.json(data);
  } catch (error) {
    console.error(error);

    res.status(502).json({
      error: "Failed to get data from CoinMarketCap API",
    });
  }
}

// Получение курсов всех монет
export async function getCoinsPrice(req: Request, res: Response) {
  try {
    const data = await getCoinsFromApi();

    res.json(data);
  } catch (error) {
    console.error(error);

    res.status(502).json({
      error: "Failed to get data from CoinMarketCap API",
    });
  }
}

// получение всех монет из базы данных

export async function getCoins(req: Request, res: Response) {
  try {
    const data = await getAllCoins();

    res.json(data);
  } catch (error) {
    console.error(error);

    res.status(502).json({
      error: "Failed to get data from database",
    });
  }
}
