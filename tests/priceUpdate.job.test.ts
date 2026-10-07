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

  it("should update prices immediately and every 20 seconds", async () => {
    mockedUpdatePrices.mockResolvedValue(undefined);

    await startPriceUpdateJob();

    expect(mockedUpdatePrices).toHaveBeenCalledTimes(1);

    await jest.advanceTimersByTimeAsync(20_000);

    expect(mockedUpdatePrices).toHaveBeenCalledTimes(2);
  });

  it("should handle updatePrices error inside interval", async () => {
    mockedUpdatePrices
      .mockResolvedValueOnce(undefined)
      .mockRejectedValueOnce(new Error("Update failed"));

    await startPriceUpdateJob();

    expect(mockedUpdatePrices).toHaveBeenCalledTimes(1);

    await jest.advanceTimersByTimeAsync(20_000);

    expect(mockedUpdatePrices).toHaveBeenCalledTimes(2);
  });

  it("should stop the interval", async () => {
    mockedUpdatePrices.mockResolvedValue(undefined);

    await startPriceUpdateJob();

    expect(mockedUpdatePrices).toHaveBeenCalledTimes(1);

    stopPriceUpdateJob();

    await jest.advanceTimersByTimeAsync(20_000);

    expect(mockedUpdatePrices).toHaveBeenCalledTimes(1);
  });
});
