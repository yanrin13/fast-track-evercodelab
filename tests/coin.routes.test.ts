import { jest, describe, it, expect, afterEach } from "@jest/globals";

import request from "supertest";

jest.unstable_mockModule("../src/services/coins.service.js", () => ({
  getCoinFromApi: jest.fn(),
  getCoinsFromApi: jest.fn(),
  getAllCoins: jest.fn(),
}));

const { getCoinFromApi, getCoinsFromApi, getAllCoins } =
  await import("../src/services/coins.service.js");

const { default: app } = await import("../src/app.js");

const mockedGetCoinFromApi = jest.mocked(getCoinFromApi);
const mockedGetCoinsFromApi = jest.mocked(getCoinsFromApi);
const mockedGetAllCoins = jest.mocked(getAllCoins);

describe("Coins routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/coins", () => {
    it("should return list of coins", async () => {
      mockedGetAllCoins.mockResolvedValue([
        { symbol: "BTC" },
        { symbol: "ETH" },
      ]);

      const response = await request(app).get("/api/coins");

      expect(response.status).toBe(200);
      expect(response.body).toEqual([{ symbol: "BTC" }, { symbol: "ETH" }]);
    });

    it("should return 502 when database request fails", async () => {
      mockedGetAllCoins.mockRejectedValue(new Error("Database error"));

      const response = await request(app).get("/api/coins");

      expect(response.status).toBe(502);
      expect(response.body).toEqual({
        error: "Failed to get data from database",
      });
    });
  });

  describe("GET /api/coins/list/price", () => {
    it("should return prices for all coins", async () => {
      mockedGetCoinsFromApi.mockResolvedValue({
        data: [
          {
            symbol: "BTC",
            price: 85689,
          },
          {
            symbol: "ETH",
            price: 2500,
          },
        ],
      });

      const response = await request(app).get("/api/coins/list/price");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        data: [
          {
            symbol: "BTC",
            price: 85689,
          },
          {
            symbol: "ETH",
            price: 2500,
          },
        ],
      });
    });

    it("should return 502 when Binance request fails", async () => {
      mockedGetCoinsFromApi.mockRejectedValue(new Error("Binance API error"));

      const response = await request(app).get("/api/coins/list/price");

      expect(response.status).toBe(502);
      expect(response.body).toEqual({
        error: "Failed to get data from CoinMarketCap API",
      });
    });
  });

  describe("GET /api/coins/:symbol/price", () => {
    it("should return price for a specific coin", async () => {
      mockedGetCoinFromApi.mockResolvedValue({
        data: {
          BTC: [
            {
              symbol: "BTC",
              price: 85689,
            },
          ],
        },
      });

      const response = await request(app).get("/api/coins/BTC/price");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        data: {
          BTC: [
            {
              symbol: "BTC",
              price: 85689,
            },
          ],
        },
      });

      expect(mockedGetCoinFromApi).toHaveBeenCalledWith("BTC");
    });

    it("should return 502 when Binance request fails", async () => {
      mockedGetCoinFromApi.mockRejectedValue(new Error("Binance API error"));

      const response = await request(app).get("/api/coins/BTC/price");

      expect(response.status).toBe(502);
      expect(response.body).toEqual({
        error: "Failed to get data from CoinMarketCap API",
      });
    });
  });
});
