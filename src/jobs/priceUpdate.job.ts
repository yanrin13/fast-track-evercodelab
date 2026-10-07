import { DEFAULT_REQUEST_DELAY } from "../config.js";
import { updatePrices } from "../services/price.service.js";

let interval: NodeJS.Timeout;

export async function startPriceUpdateJob() {
  await updatePrices();

  interval = setInterval(async () => {
    try {
      await updatePrices();
    } catch (error) {
      console.error("Price update failed:", error);
    }
  }, DEFAULT_REQUEST_DELAY);
}

export function stopPriceUpdateJob() {
  clearInterval(interval);
}
