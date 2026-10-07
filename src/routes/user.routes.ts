import { Router } from "express";
import { getFirstUserApiKey } from "../controllers/user.controller.js";

const router = Router();

router.get("/user/api-key", getFirstUserApiKey);

export default router;
