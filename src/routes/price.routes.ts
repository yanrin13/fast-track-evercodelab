import { Router } from "express";
import { getCoinHistory } from "../controllers/price.controller.js";

const router = Router();

/**
 * @openapi
 * /api/coins/{coinSymbol}/price_history:
 *   get:
 *     tags:
 *       - Coins
 *     summary: Получить историю цен монеты
 *     description: Возвращает историю цен на определенную монету в виде списка записей
 *     parameters:
 *       - in: path
 *         name: coinSymbol
 *         required: true
 *         description: Символ криптовалюты
 *         schema:
 *           type: string
 *           example: BTC
 *     responses:
 *       200:
 *         description: Успешный ответ
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Уникальный идентификатор записи
 *                     example: 162
 *                   coin_symbol:
 *                     type: string
 *                     description: Символ криптовалюты
 *                     example: BTC
 *                   price:
 *                     type: number
 *                     description: Цена монеты в USD
 *                     example: 85948.67701723069
 *                   recorded_at:
 *                     type: string
 *                     description: Дата и время записи цены
 *                     example: "2026-10-06 15:55:49"
 *             example:
 *               - id: 162
 *                 coin_symbol: BTC
 *                 price: 85948.67701723069
 *                 recorded_at: "2026-10-06 15:55:49"
 *               - id: 118
 *                 coin_symbol: BTC
 *                 price: 86090.935445062
 *                 recorded_at: "2026-10-06 15:47:03"
 *               - id: 119
 *                 coin_symbol: BTC
 *                 price: 86090.935445062
 *                 recorded_at: "2026-10-06 15:47:03"
 *               - id: 113
 *                 coin_symbol: BTC
 *                 price: 86092.07273034239
 *                 recorded_at: "2026-10-06 15:46:58"
 *               - id: 69
 *                 coin_symbol: BTC
 *                 price: 86158.61858360517
 *                 recorded_at: "2026-10-06 15:44:41"
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
 *                   example: Invalid cryptocurrency symbol
 *             example:
 *               error: Invalid cryptocurrency symbol
 *
 *       502:
 *         description: Ошибка при получении данных из базы данных
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to get data from database
 *             example:
 *               error: Failed to get data from database
 */
router.get("/coins/:coinSymbol/price_history", getCoinHistory);

export default router;
