import {
  jest,
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
} from "@jest/globals";

jest.unstable_mockModule("../src/services/coins.service.js", () => ({
  syncCoins: jest.fn(),
}));

const { syncCoins } = await import("../src/services/coins.service.js");
const { startCoinSync, stopCoinSync } =
  await import("../src/jobs/coinSync.job.js");

const mockedSyncCoins = jest.mocked(syncCoins);

describe("coinSync job", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    stopCoinSync();
    jest.useRealTimers();
  });

  it("should sync coins immediately and every hour", async () => {
    mockedSyncCoins.mockResolvedValue(undefined);

    await startCoinSync();

    expect(mockedSyncCoins).toHaveBeenCalledTimes(1);

    await jest.advanceTimersByTimeAsync(60 * 60 * 1000);

    expect(mockedSyncCoins).toHaveBeenCalledTimes(2);
  });

  it("should continue working when syncCoins fails", async () => {
    mockedSyncCoins
      .mockRejectedValueOnce(new Error("Sync failed"))
      .mockResolvedValue(undefined);

    await startCoinSync();

    // Первая ошибка ловится внутри startCoinSync
    expect(mockedSyncCoins).toHaveBeenCalledTimes(1);

    await startCoinSync();

    expect(mockedSyncCoins).toHaveBeenCalledTimes(2);
  });

  it("should handle sync error inside interval", async () => {
    mockedSyncCoins
      .mockResolvedValueOnce(undefined)
      .mockRejectedValueOnce(new Error("Sync failed"));

    await startCoinSync();

    expect(mockedSyncCoins).toHaveBeenCalledTimes(1);

    await jest.advanceTimersByTimeAsync(60 * 60 * 1000);

    expect(mockedSyncCoins).toHaveBeenCalledTimes(2);
  });
});
