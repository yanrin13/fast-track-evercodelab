import { syncCoins } from "../services/coins.service.js";

let interval: NodeJS.Timeout;

export async function startCoinSync() {
  try {
    await syncCoins();

    interval = setInterval(
      async () => {
        try {
          await syncCoins();
        } catch (error) {
          console.error("Coin sync failed:", error);
        }
      },
      60 * 60 * 1000,
    );
  } catch (error) {
    console.error("Initial coin sync failed:", error);
  }
}

export function stopCoinSync() {
  clearInterval(interval);
}
