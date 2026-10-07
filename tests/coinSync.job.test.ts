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

  // позитивный тест, тестирует немедленный запуск синхронизации и повторный запуск через час
  // ожидаемый результат: syncCoins вызывается сразу и повторно через один час
  it("should sync coins immediately and every hour", async () => {
    mockedSyncCoins.mockResolvedValue(undefined);

    await startCoinSync();

    expect(mockedSyncCoins).toHaveBeenCalledTimes(1);

    await jest.advanceTimersByTimeAsync(60 * 60 * 1000);

    expect(mockedSyncCoins).toHaveBeenCalledTimes(2);
  });

  // негативный тест, тестирует обработку ошибки при первоначальной синхронизации
  // ожидаемый результат: ошибка обрабатывается и повторный запуск startCoinSync работает
  it("should continue working when syncCoins fails", async () => {
    mockedSyncCoins
      .mockRejectedValueOnce(new Error("Sync failed"))
      .mockResolvedValue(undefined);

    await startCoinSync();

    expect(mockedSyncCoins).toHaveBeenCalledTimes(1);

    await startCoinSync();

    expect(mockedSyncCoins).toHaveBeenCalledTimes(2);
  });

  // негативный тест, тестирует обработку ошибки синхронизации внутри фонового интервала
  // ожидаемый результат: ошибка обрабатывается и выполнение фоновой задачи не прекращается
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
