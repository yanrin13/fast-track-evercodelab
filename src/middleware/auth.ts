import type { Request, Response, NextFunction } from "express";
import { db } from "../db/db.js";

export function auth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Bearer token is required",
    });
  }

  const token = authHeader.slice(7);

  db.get(
    "SELECT id FROM users WHERE api_key = ?",
    [token],
    (err, user: { id: number } | undefined) => {
      if (err) {
        console.error(err);

        return res.status(500).json({
          error: "Database error",
        });
      }

      if (!user) {
        return res.status(401).json({
          error: "Invalid token",
        });
      }

      res.locals.userId = user.id;

      next();
    },
  );
}
