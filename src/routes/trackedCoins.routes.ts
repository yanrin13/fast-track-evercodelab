import { Router } from "express";

import {
  getTrackedCoins,
  addTrackedCoin,
  updateTrackedCoin,
  deleteTrackedCoin,
} from "../controllers/trackedCoins.controller.js";

import { auth } from "../middleware/auth.js";

const router = Router();

router.get("/trackedCoins", auth, getTrackedCoins);
router.post("/trackedCoins", auth, addTrackedCoin);
router.put("/trackedCoins/:coinSymbol", auth, updateTrackedCoin);
router.delete("/trackedCoins/:coinSymbol", auth, deleteTrackedCoin);

export default router;
