import { jest, describe, it, expect, afterEach } from "@jest/globals";
import request from "supertest";

jest.unstable_mockModule("../src/services/price.service.js", () => ({
  getPrice: jest.fn(),
}));

const { getPrice } = await import("../src/services/price.service.js");
const { default: app } = await import("../src/app.js");

const mockedGetPrice = jest.mocked(getPrice);

afterEach(() => {
  jest.clearAllMocks();
});

describe("GET /api/coins/:coinSymbol/price_history", () => {
  // позитивный тест, тестирует получение истории цен конкретной криптовалюты
  // ожидаемый результат: статус 200 и список исторических цен монеты
  it("should return price history", async () => {
    const history = [
      {
        id: 162,
        coin_symbol: "BTC",
        price: 85948.67701723069,
        recorded_at: "2026-10-06 15:55:49",
      },
      {
        id: 118,
        coin_symbol: "BTC",
        price: 86090.935445062,
        recorded_at: "2026-10-06 15:47:03",
      },
    ];

    mockedGetPrice.mockResolvedValue(history);

    const response = await request(app).get("/api/coins/BTC/price_history");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(history);
    expect(mockedGetPrice).toHaveBeenCalledWith("BTC");
  });

  // негативный тест, тестирует обработку ошибки при получении истории цен из базы данных
  // ожидаемый результат: статус 502 и сообщение об ошибке
  it("should return 502 when database request fails", async () => {
    mockedGetPrice.mockRejectedValue(new Error("Database error"));

    const response = await request(app).get("/api/coins/BTC/price_history");

    expect(response.status).toBe(502);
    expect(response.body).toEqual({
      error: "Failed to get data from database",
    });
  });
});
