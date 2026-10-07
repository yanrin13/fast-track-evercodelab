import {
  jest,
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
} from "@jest/globals";

jest.unstable_mockModule("../src/services/price.service.js", () => ({
  updatePrices: jest.fn(),
}));

const { updatePrices } = await import("../src/services/price.service.js");

const { startPriceUpdateJob, stopPriceUpdateJob } =
  await import("../src/jobs/priceUpdate.job.js");

const mockedUpdatePrices = jest.mocked(updatePrices);

describe("priceUpdate job", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    stopPriceUpdateJob();
    jest.useRealTimers();
  });

  // позитивный тест, тестирует немедленный запуск обновления цен и повторный запуск каждые 20 секунд
  // ожидаемый результат: updatePrices вызывается сразу и повторно через 20 секунд
  it("should update prices immediately and every 20 seconds", async () => {
    mockedUpdatePrices.mockResolvedValue(undefined);

    await startPriceUpdateJob();

    expect(mockedUpdatePrices).toHaveBeenCalledTimes(1);

    await jest.advanceTimersByTimeAsync(20_000);

    expect(mockedUpdatePrices).toHaveBeenCalledTimes(2);
  });

  // негативный тест, тестирует обработку ошибки обновления цен внутри фонового интервала
  // ожидаемый результат: ошибка обрабатывается и фоновая задача продолжает выполняться
  it("should handle updatePrices error inside interval", async () => {
    mockedUpdatePrices
      .mockResolvedValueOnce(undefined)
      .mockRejectedValueOnce(new Error("Update failed"));

    await startPriceUpdateJob();

    expect(mockedUpdatePrices).toHaveBeenCalledTimes(1);

    await jest.advanceTimersByTimeAsync(20_000);

    expect(mockedUpdatePrices).toHaveBeenCalledTimes(2);
  });

  // позитивный тест, тестирует остановку фоновой задачи обновления цен
  // ожидаемый результат: после остановки updatePrices больше не вызывается
  it("should stop the interval", async () => {
    mockedUpdatePrices.mockResolvedValue(undefined);

    await startPriceUpdateJob();

    expect(mockedUpdatePrices).toHaveBeenCalledTimes(1);

    stopPriceUpdateJob();

    await jest.advanceTimersByTimeAsync(20_000);

    expect(mockedUpdatePrices).toHaveBeenCalledTimes(1);
  });
});
