import request from "supertest";
import app from "../src/app.js";

describe("Coin Routes", () => {
  describe("GET /api/coins/:symbol/price", () => {
    // позитивный тест получение цены существующей монеты ожидаемый результат: 200 и данные
    it("returns price for valid symbol", async () => {
      const res = await request(app).get("/api/coins/BTC/price");

      expect(res.status).toBe(200);
      expect(res.body).toBeDefined();
    });

    // негативный тест несуществующий путь без символа ожидаемый результат: 404
    it("returns 404 when symbol segment is empty", async () => {
      const res = await request(app).get("/api/coins//price");

      expect(res.status).toBe(404);
    });
  });

  describe("GET /api/coins/list/price", () => {
    // позитивный тест получение курсов всех монет с Binance ожидаемый результат: 200 и данные
    it("returns list of coin prices", async () => {
      const res = await request(app).get("/api/coins/list/price");

      expect(res.status).toBe(200);
      expect(res.body).toBeDefined();
    });

    // негативный тест неверный HTTP-метод ожидаемый результат: 404
    it("returns 404 for wrong method", async () => {
      const res = await request(app).post("/api/coins/list/price");

      expect(res.status).toBe(404);
    });
  });

  describe("GET /api/coins", () => {
    // позитивный тест получение всех монет из БД ожидаемый результат: 200 и данные
    it("returns all coins from database", async () => {
      const res = await request(app).get("/api/coins");

      expect(res.status).toBe(200);
      expect(res.body).toBeDefined();
    });

    // негативный тест неверный путь ожидаемый результат: 404
    it("returns 404 for unknown path", async () => {
      const res = await request(app).get("/api/coins/unknown/extra");

      expect(res.status).toBe(404);
    });
  });
});
