import { Router } from "express";

import {
  getTrackedCoins,
  addTrackedCoin,
  updateTrackedCoin,
  deleteTrackedCoin,
} from "../controllers/trackedCoins.controller.js";

import { auth } from "../middleware/auth.js";

const router = Router();

/**
 * @openapi
 * /api/trackedCoins:
 *   get:
 *     tags:
 *       - Tracked Coins
 *     summary: Получить список отслеживаемых монет
 *     description: Возвращает список криптовалют, отслеживаемых текущим авторизованным пользователем
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список отслеживаемых монет
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   coin_symbol:
 *                     type: string
 *                     description: Символ криптовалюты
 *                     example: BTC
 *             example:
 *               - coin_symbol: BTC
 *               - coin_symbol: ETH
 *               - coin_symbol: SOL
 *
 *       401:
 *         description: Пользователь не авторизован
 *
 *       500:
 *         description: Ошибка при получении списка отслеживаемых монет
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to get tracked coins
 *             example:
 *               error: Failed to get tracked coins
 */
router.get("/trackedCoins", auth, getTrackedCoins);

/**
 * @openapi
 * /api/trackedCoins:
 *   post:
 *     tags:
 *       - Tracked Coins
 *     summary: Добавить монету в отслеживаемые
 *     description: Добавляет криптовалюту в список отслеживаемых текущего пользователя
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - coinSymbol
 *             properties:
 *               coinSymbol:
 *                 type: string
 *                 description: Символ криптовалюты
 *                 example: BTC
 *           example:
 *             coinSymbol: BTC
 *     responses:
 *       201:
 *         description: Монета успешно добавлена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             example:
 *               coinSymbol: BTC
 *
 *       400:
 *         description: Некорректный символ монеты
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: coinSymbol is required and must be a crypto coin name
 *             example:
 *               error: coinSymbol is required and must be a crypto coin name
 *
 *       401:
 *         description: Пользователь не авторизован
 *
 *       500:
 *         description: Ошибка при добавлении монеты
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to add tracked coin
 *             example:
 *               error: Failed to add tracked coin
 */
router.post("/trackedCoins", auth, addTrackedCoin);

/**
 * @openapi
 * /api/trackedCoins/{coinSymbol}:
 *   put:
 *     tags:
 *       - Tracked Coins
 *     summary: Изменить отслеживаемую монету
 *     description: Заменяет одну отслеживаемую монету на другую
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: coinSymbol
 *         required: true
 *         description: Символ текущей отслеживаемой монеты
 *         schema:
 *           type: string
 *           example: BTC
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newSymbol
 *             properties:
 *               newSymbol:
 *                 type: string
 *                 description: Новый символ криптовалюты
 *                 example: ETH
 *           example:
 *             newSymbol: ETH
 *     responses:
 *       200:
 *         description: Монета успешно изменена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             example:
 *               coinSymbol: ETH
 *
 *       400:
 *         description: Некорректный символ монеты
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             examples:
 *               invalidCoinSymbol:
 *                 summary: Некорректный старый символ
 *                 value:
 *                   error: coinSymbol is required and must be a crypto coin name
 *               invalidNewSymbol:
 *                 summary: Некорректный новый символ
 *                 value:
 *                   error: newSymbol is required and must be a crypto coin name
 *
 *       401:
 *         description: Пользователь не авторизован
 *
 *       500:
 *         description: Ошибка при изменении отслеживаемой монеты
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to update tracked coin
 *             example:
 *               error: Failed to update tracked coin
 */
router.put("/trackedCoins/:coinSymbol", auth, updateTrackedCoin);

/**
 * @openapi
 * /api/trackedCoins/{coinSymbol}:
 *   delete:
 *     tags:
 *       - Tracked Coins
 *     summary: Удалить монету из отслеживаемых
 *     description: Удаляет криптовалюту из списка отслеживаемых текущего пользователя
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: coinSymbol
 *         required: true
 *         description: Символ криптовалюты для удаления
 *         schema:
 *           type: string
 *           example: BTC
 *     responses:
 *       200:
 *         description: Монета успешно удалена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             example:
 *               coinSymbol: BTC
 *
 *       400:
 *         description: Некорректный символ монеты
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: coinSymbol is required and must be a crypto coin name
 *             example:
 *               error: coinSymbol is required and must be a crypto coin name
 *
 *       401:
 *         description: Пользователь не авторизован
 *
 *       500:
 *         description: Ошибка при удалении отслеживаемой монеты
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to delete tracked coin
 *             example:
 *               error: Failed to delete tracked coin
 */
router.delete("/trackedCoins/:coinSymbol", auth, deleteTrackedCoin);

export default router;
