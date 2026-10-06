import request from "supertest";
import app from "../src/app.js";

const VALID_TOKEN =
  "72389951a208b807e88a0f941f7d355a375de4cdb587a35ea2270b4d1dfcf242";
const AUTH = { Authorization: `Bearer ${VALID_TOKEN}` };

describe("Tracked Coins Routes", () => {
  describe("GET /api/trackedCoins", () => {
    // позитивный тест получение списка отслеживаемых монет с валидным токеном ожидаемый результат: 200 и массив
    it("returns tracked coins for authenticated user", async () => {
      const res = await request(app).get("/api/trackedCoins").set(AUTH);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    // негативный тест запрос без Authorization ожидаемый результат: 401
    it("returns 401 without token", async () => {
      const res = await request(app).get("/api/trackedCoins");

      expect(res.status).toBe(401);
      expect(res.body).toEqual({
        error: "Bearer token is required",
      });
    });
  });

  describe("POST /api/trackedCoins", () => {
    // позитивный тест добавление валидной монеты ожидаемый результат: 201 и данные
    it("adds tracked coin with valid body", async () => {
      const res = await request(app)
        .post("/api/trackedCoins")
        .set(AUTH)
        .send({ coinSymbol: "BTC" });

      expect(res.status).toBe(201);
      expect(res.body).toBeDefined();
    });

    // негативный тест невалидный coinSymbol (число) ожидаемый результат: 400
    it("returns 400 for invalid coinSymbol", async () => {
      const res = await request(app)
        .post("/api/trackedCoins")
        .set(AUTH)
        .send({ coinSymbol: 123 });

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        error: "coinSymbol is required and must be a crypto coin name",
      });
    });

    // негативный тест невалидный токен ожидаемый результат: 401
    it("returns 401 with invalid token", async () => {
      const res = await request(app)
        .post("/api/trackedCoins")
        .set({ Authorization: "Bearer invalid-token" })
        .send({ coinSymbol: "BTC" });

      expect(res.status).toBe(401);
      expect(res.body).toEqual({
        error: "Invalid token",
      });
    });
  });

  describe("PUT /api/trackedCoins/:coinSymbol", () => {
    // позитивный тест обновление символа монеты ожидаемый результат: 200 и данные
    it("updates tracked coin symbol", async () => {
      await request(app)
        .post("/api/trackedCoins")
        .set(AUTH)
        .send({ coinSymbol: "BTC" });

      const res = await request(app)
        .put("/api/trackedCoins/BTC")
        .set(AUTH)
        .send({ newSymbol: "ETH" });

      expect(res.status).toBe(200);
      expect(res.body).toBeDefined();
    });

    // негативный тест невалидный newSymbol ожидаемый результат: 400
    it("returns 400 for invalid newSymbol", async () => {
      const res = await request(app)
        .put("/api/trackedCoins/BTC")
        .set(AUTH)
        .send({ newSymbol: null });

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        error: "newSymbol is required and must be a crypto coin name",
      });
    });

    // негативный тест монета не найдена в БД ожидаемый результат: 500
    it("returns 500 when tracked coin does not exist", async () => {
      const res = await request(app)
        .put("/api/trackedCoins/NONEXISTENT")
        .set(AUTH)
        .send({ newSymbol: "ETH" });

      expect(res.status).toBe(500);
      expect(res.body).toEqual({
        error: "Failed to update tracked coin",
      });
    });
  });

  describe("DELETE /api/trackedCoins/:coinSymbol", () => {
    // позитивный тест удаление отслеживаемой монеты ожидаемый результат: 200 и данные
    it("deletes tracked coin", async () => {
      await request(app)
        .post("/api/trackedCoins")
        .set(AUTH)
        .send({ coinSymbol: "SOL" });

      const res = await request(app).delete("/api/trackedCoins/SOL").set(AUTH);

      expect(res.status).toBe(200);
      expect(res.body).toBeDefined();
    });

    // негативный тест монета не найдена ожидаемый результат: 500
    it("returns 500 when deleting non-existent coin", async () => {
      const res = await request(app)
        .delete("/api/trackedCoins/NONEXISTENT")
        .set(AUTH);

      expect(res.status).toBe(500);
      expect(res.body).toEqual({
        error: "Failed to delete tracked coin",
      });
    });

    // негативный тест запрос без Bearer-токена ожидаемый результат: 401
    it("returns 401 without Bearer token", async () => {
      const res = await request(app).delete("/api/trackedCoins/BTC");

      expect(res.status).toBe(401);
      expect(res.body).toEqual({
        error: "Bearer token is required",
      });
    });
  });
});
