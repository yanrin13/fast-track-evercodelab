import { Router } from "express";
import {
  getCoinPrice,
  getCoinsPrice,
  getCoins,
} from "../controllers/coin.controller.js";

const router = Router();

/**
 * @openapi
 * /api/coins:
 *   get:
 *     tags:
 *       - Coins
 *     summary: Получить список монет
 *     description: Возвращает список доступных криптовалют
 *     responses:
 *       200:
 *         description: Список доступных криптовалют
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   symbol:
 *                     type: string
 *                     description: Символ криптовалюты
 *                     example: BTC
 *             example:
 *               - symbol: BTC
 *               - symbol: ETH
 *               - symbol: USDT
 *               - symbol: BNB
 *               - symbol: XRP
 *               - symbol: USDC
 *               - symbol: SOL
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
 *                   description: Описание ошибки
 *                   example: Failed to get data from database
 *             example:
 *               error: Failed to get data from database
 */
router.get("/coins", getCoins); // список монет
/**
 * @openapi
 * /api/coins/list/price:
 *   get:
 *     tags:
 *       - Coins
 *     summary: Получить данные о курсах всех монет
 *     description: Получает актуальные данные о криптовалютах из CoinMarketCap API
 *     responses:
 *       200:
 *         description: Успешный ответ с данными о криптовалютах
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: Bitcoin
 *                       symbol:
 *                         type: string
 *                         example: BTC
 *                       slug:
 *                         type: string
 *                         example: bitcoin
 *                       infinite_supply:
 *                         type: boolean
 *                         example: false
 *                       circulating_supply:
 *                         type: number
 *                         example: 20094337
 *                       total_supply:
 *                         type: number
 *                         example: 20094337
 *                       max_supply:
 *                         type: number
 *                         nullable: true
 *                         example: 21000000
 *                       date_added:
 *                         type: string
 *                         format: date-time
 *                         example: "2010-07-13T00:00:00.000Z"
 *                       num_market_pairs:
 *                         type: integer
 *                         example: 12755
 *                       cmc_rank:
 *                         type: integer
 *                         example: 1
 *                       last_updated:
 *                         type: string
 *                         format: date-time
 *                         example: "2026-10-06T16:53:00.000Z"
 *                       quote:
 *                         type: object
 *                         properties:
 *                           USD:
 *                             type: object
 *                             properties:
 *                               price:
 *                                 type: number
 *                                 example: 85689.79108681982
 *                               volume_24h:
 *                                 type: number
 *                                 example: 25134039304.119877
 *                               percent_change_24h:
 *                                 type: number
 *                                 example: 0.45877599
 *                               market_cap:
 *                                 type: number
 *                                 example: 1721879539558.1538
 *             example:
 *               data:
 *                 - id: 1
 *                   name: Bitcoin
 *                   symbol: BTC
 *                   slug: bitcoin
 *                   infinite_supply: false
 *                   circulating_supply: 20094337
 *                   total_supply: 20094337
 *                   max_supply: 21000000
 *                   date_added: "2010-07-13T00:00:00.000Z"
 *                   num_market_pairs: 12755
 *                   cmc_rank: 1
 *                   last_updated: "2026-10-06T16:53:00.000Z"
 *                   quote:
 *                     USD:
 *                       price: 85689.79108681982
 *                       volume_24h: 25134039304.119877
 *                       percent_change_24h: 0.45877599
 *                       market_cap: 1721879539558.1538
 *
 *       502:
 *         description: Ошибка при получении данных из CoinMarketCap API
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to get data from CoinMarketCap API
 *             example:
 *               error: Failed to get data from CoinMarketCap API
 */
router.get("/coins/list/price", getCoinsPrice); // список монет из coinmarketcap api
/**
 * @openapi
 * /api/coins/{symbol}/price:
 *   get:
 *     tags:
 *       - Coins
 *     summary: Получить данные о конкретной монете
 *     description: Получает актуальные данные о криптовалюте по её символу из CoinMarketCap API
 *     parameters:
 *       - in: path
 *         name: symbol
 *         required: true
 *         description: Символ криптовалюты
 *         schema:
 *           type: string
 *           example: BTC
 *     responses:
 *       200:
 *         description: Успешный ответ с данными о криптовалюте
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   additionalProperties:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: Bitcoin
 *                         symbol:
 *                           type: string
 *                           example: BTC
 *                         slug:
 *                           type: string
 *                           example: bitcoin
 *                         is_active:
 *                           type: integer
 *                           example: 1
 *                         infinite_supply:
 *                           type: boolean
 *                           example: false
 *                         circulating_supply:
 *                           type: number
 *                           example: 20094337
 *                         total_supply:
 *                           type: number
 *                           example: 20094337
 *                         max_supply:
 *                           type: number
 *                           nullable: true
 *                           example: 21000000
 *                         cmc_rank:
 *                           type: integer
 *                           example: 1
 *                         quote:
 *                           type: object
 *                           properties:
 *                             USD:
 *                               type: object
 *                               properties:
 *                                 price:
 *                                   type: number
 *                                   example: 85689.79108681982
 *                                 volume_24h:
 *                                   type: number
 *                                   example: 25134039304.119877
 *                                 percent_change_24h:
 *                                   type: number
 *                                   example: 0.45877599
 *                                 market_cap:
 *                                   type: number
 *                                   example: 1721879539558.1538
 *             example:
 *               data:
 *                 BTC:
 *                   - id: 1
 *                     name: Bitcoin
 *                     symbol: BTC
 *                     slug: bitcoin
 *                     is_active: 1
 *                     infinite_supply: false
 *                     circulating_supply: 20094337
 *                     total_supply: 20094337
 *                     max_supply: 21000000
 *                     cmc_rank: 1
 *                     quote:
 *                       USD:
 *                         price: 85689.79108681982
 *                         volume_24h: 25134039304.119877
 *                         percent_change_24h: 0.45877599
 *                         market_cap: 1721879539558.1538
 *
 *       400:
 *         description: Некорректный символ криптовалюты
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Symbol is required and must be a string
 *             example:
 *               error: Symbol is required and must be a string
 *
 *       502:
 *         description: Ошибка при получении данных из CoinMarketCap API
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to get data from CoinMarketCap API
 *             example:
 *               error: Failed to get data from CoinMarketCap API
 */
router.get("/coins/:symbol/price", getCoinPrice); // цена по конкретной монете

export default router;
