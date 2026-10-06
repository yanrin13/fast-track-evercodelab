import { Router } from "express";
import {
  getCoinPrice,
  getCoinsPrice,
  getCoins,
} from "../controllers/coin.controller.js";

const router = Router();

router.get("/coins", getCoins); // список монет
router.get("/coins/list/price", getCoinsPrice); // список монет из coinmarketcap api
router.get("/coins/:symbol/price", getCoinPrice); // цена по конкретной монете

export default router;
