import type { Request, Response } from "express";
import { getFirstUserApiKeyService } from "../services/user.service.js";

export async function getFirstUserApiKey(_req: Request, res: Response) {
  try {
    const apiKey = await getFirstUserApiKeyService();

    if (!apiKey) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    return res.status(200).json({
      apiKey,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to get API key",
    });
  }
}
