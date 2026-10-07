import type { Request, Response } from "express";
import { getPrice } from "../services/price.service.js";
import { parseCoinSymbol } from "../utils/validation.js";

// Получение истории цен на одну конкретную монету
export async function getCoinHistory(req: Request, res: Response) {
  try {
    const coinSymbol = parseCoinSymbol(req.params.coinSymbol);

    if (coinSymbol === null) {
      return res.status(400).json({
        error: "Invalid cryptocurrency symbol",
      });
    }

    const data = await getPrice(coinSymbol.toUpperCase());

    res.json(data);
  } catch (error) {
    console.error(error);

    res.status(502).json({
      error: "Failed to get data from database",
    });
  }
}
