import request from "supertest";
import app from "../src/app.js";

describe("Price History Routes", () => {
  describe("GET /api/coins/:coinSymbol/price_history", () => {
    // позитивный тест получение истории цен по валидному символу ожидаемый результат: 200 и данные
    it("returns price history for valid coinSymbol", async () => {
      const res = await request(app).get("/api/coins/BTC/price_history");

      expect(res.status).toBe(200);
      expect(res.body).toBeDefined();
    });

    // негативный тест пустой сегмент coinSymbol ожидаемый результат: 404
    it("returns 404 when coinSymbol segment is empty", async () => {
      const res = await request(app).get("/api/coins//price_history");

      expect(res.status).toBe(404);
    });
  });
});
