import type { Request, Response } from "express";
import {
  getBinanceCoin,
  getBinanceCoins,
  getAllCoins,
} from "../services/coins.service.js";

// Получение курса одной конкретной монеты
export async function getCoinPrice(req: Request, res: Response) {
  try {
    const symbol = req.params.symbol;

    if (!symbol || typeof symbol !== "string" || !/^[A-Za-z]+$/.test(symbol)) {
      return res.status(400).json({
        error: "Invalid cryptocurrency symbol",
      });
    }

    const data = await getBinanceCoin(symbol.toUpperCase());

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
    const data = await getBinanceCoins();

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
