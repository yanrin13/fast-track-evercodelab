import { Router } from "express";
import { getFirstUserApiKey } from "../controllers/user.controller.js";

const router = Router();

/**
 * @openapi
 * /api/user/api-key:
 *   get:
 *     tags:
 *       - User
 *     summary: Получить API-ключ пользователя
 *     description: Возвращает API-ключ первого пользователя
 *     responses:
 *       200:
 *         description: Успешный ответ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 apiKey:
 *                   type: string
 *                   description: API-ключ пользователя
 *                   example: 5f9e7857e614446ba7d990bd1ec2dc55
 *             example:
 *               apiKey: 5f9e7857e614446ba7d990bd1ec2dc55
 *
 *       404:
 *         description: Пользователь не найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 *             example:
 *               error: User not found
 *
 *       500:
 *         description: Ошибка при получении API-ключа
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to get API key
 *             example:
 *               error: Failed to get API key
 */
router.get("/user/api-key", getFirstUserApiKey);
router.get("/user/api-key", getFirstUserApiKey);

export default router;
