import type { Request, Response } from "express";

import {
  getTrackedList,
  addCoin,
  updateCoin,
  deleteCoin,
} from "../services/trackedCoins.service.js";

import { parseCoinSymbol } from "../utils/validation.js";

// Получение списка отслеживаемых монет
export async function getTrackedCoins(req: Request, res: Response) {
  try {
    const userId = res.locals.userId;

    const data = await getTrackedList(userId);

    return res.status(200).json({
      data,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to get tracked coins",
    });
  }
}

// Добавление монеты
export async function addTrackedCoin(req: Request, res: Response) {
  try {
    const userId = res.locals.userId;
    const coinSymbol = parseCoinSymbol(req.body.coinSymbol);

    if (coinSymbol === null) {
      return res.status(400).json({
        error: "Invalid cryptocurrency symbol",
      });
    }

    const data = await addCoin(userId, coinSymbol);

    return res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to add tracked coin",
    });
  }
}

// Изменение монеты
export async function updateTrackedCoin(req: Request, res: Response) {
  try {
    const userId = res.locals.userId;

    const oldSymbol = parseCoinSymbol(req.params.coinSymbol);
    const newSymbol = parseCoinSymbol(req.body.newSymbol);

    if (oldSymbol === null) {
      return res.status(400).json({
        error: "Invalid cryptocurrency old symbol",
      });
    }

    if (newSymbol === null) {
      return res.status(400).json({
        error: "Invalid cryptocurrency new symbol",
      });
    }

    const data = await updateCoin(userId, oldSymbol, newSymbol);

    return res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to update tracked coin",
    });
  }
}

// Удаление монеты
export async function deleteTrackedCoin(req: Request, res: Response) {
  try {
    const userId = res.locals.userId;
    const coinSymbol = parseCoinSymbol(req.params.coinSymbol);

    if (coinSymbol === null) {
      return res.status(400).json({
        error: "Invalid cryptocurrency symbol",
      });
    }

    const data = await deleteCoin(userId, coinSymbol);

    return res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to delete tracked coin",
    });
  }
}
