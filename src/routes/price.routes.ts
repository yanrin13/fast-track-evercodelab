import { Router } from "express";
import { getCoinHistory } from "../controllers/price.controller.js";

const router = Router();

router.get("/coins/:coinSymbol/price_history", getCoinHistory);

export default router;
