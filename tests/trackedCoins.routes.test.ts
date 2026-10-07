import { jest, describe, it, expect, afterEach } from "@jest/globals";
import request from "supertest";

// Мокаем auth
jest.unstable_mockModule("../src/middleware/auth.js", () => ({
  auth: jest.fn((_req: any, res: any, next: any) => {
    res.locals.userId = 1;
    next();
  }),
}));

// Мокаем сервис
jest.unstable_mockModule("../src/services/trackedCoins.service.js", () => ({
  getTrackedList: jest.fn(),
  addCoin: jest.fn(),
  updateCoin: jest.fn(),
  deleteCoin: jest.fn(),
}));

const { getTrackedList, addCoin, updateCoin, deleteCoin } =
  await import("../src/services/trackedCoins.service.js");

const { default: app } = await import("../src/app.js");

const mockedGetTrackedList = jest.mocked(getTrackedList);
const mockedAddCoin = jest.mocked(addCoin);
const mockedUpdateCoin = jest.mocked(updateCoin);
const mockedDeleteCoin = jest.mocked(deleteCoin);

afterEach(() => {
  jest.clearAllMocks();
});

describe("GET /api/trackedCoins", () => {
  it("should return tracked coins", async () => {
    const coins = [
      {
        id: 1,
        user_id: 1,
        coin_symbol: "BTC",
      },
      {
        id: 2,
        user_id: 1,
        coin_symbol: "ETH",
      },
    ];

    mockedGetTrackedList.mockResolvedValue(coins);

    const response = await request(app).get("/api/trackedCoins");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: coins,
    });

    expect(mockedGetTrackedList).toHaveBeenCalledWith(1);
  });

  it("should return 500 when getting tracked coins fails", async () => {
    mockedGetTrackedList.mockRejectedValue(new Error("Database error"));

    const response = await request(app).get("/api/trackedCoins");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: "Failed to get tracked coins",
    });
  });
});

describe("POST /api/trackedCoins", () => {
  it("should add a tracked coin", async () => {
    mockedAddCoin.mockResolvedValue(undefined);

    const response = await request(app).post("/api/trackedCoins").send({
      coinSymbol: "BTC",
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      success: true,
    });

    expect(mockedAddCoin).toHaveBeenCalledWith(1, "BTC");
  });

  it("should return 500 when adding coin fails", async () => {
    mockedAddCoin.mockRejectedValue(new Error("Database error"));

    const response = await request(app).post("/api/trackedCoins").send({
      coinSymbol: "BTC",
    });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: "Failed to add tracked coin",
    });
  });
});

describe("PUT /api/trackedCoins/:coinSymbol", () => {
  it("should update a tracked coin", async () => {
    mockedUpdateCoin.mockResolvedValue(undefined);

    const response = await request(app).put("/api/trackedCoins/BTC").send({
      newSymbol: "ETH",
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
    });

    expect(mockedUpdateCoin).toHaveBeenCalledWith(1, "BTC", "ETH");
  });

  it("should return 500 when updating coin fails", async () => {
    mockedUpdateCoin.mockRejectedValue(new Error("Database error"));

    const response = await request(app).put("/api/trackedCoins/BTC").send({
      newSymbol: "ETH",
    });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: "Failed to update tracked coin",
    });
  });
});

describe("DELETE /api/trackedCoins/:coinSymbol", () => {
  it("should delete a tracked coin", async () => {
    mockedDeleteCoin.mockResolvedValue(undefined);

    const response = await request(app).delete("/api/trackedCoins/BTC");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
    });

    expect(mockedDeleteCoin).toHaveBeenCalledWith(1, "BTC");
  });

  it("should return 500 when deleting coin fails", async () => {
    mockedDeleteCoin.mockRejectedValue(new Error("Database error"));

    const response = await request(app).delete("/api/trackedCoins/BTC");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: "Failed to delete tracked coin",
    });
  });
});
