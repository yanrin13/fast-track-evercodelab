import type { Request, Response } from "express";
import { getPrice } from "../services/price.service.js";

// Получение истории цен на одну конкретную монету
export async function getCoinHistory(req: Request, res: Response) {
  try {
    const coinSymbol = req.params.coinSymbol;

    if (typeof coinSymbol !== "string") {
      return res.status(400).json({
        error: "Symbol is required and must be a string",
      });
    }

    const data = await getPrice(coinSymbol);

    res.json(data);
  } catch (error) {
    console.error(error);

    res.status(502).json({
      error: "Failed to get data from database",
    });
  }
}
