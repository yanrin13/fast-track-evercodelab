import { stopCoinSync } from "./jobs/coinSync.job.js";
import { stopPriceUpdateJob } from "./jobs/priceUpdate.job.js";

let isShuttingDown = false;

export function setupShutdown() {
  const shutdown = (signal: string) => {
    if (isShuttingDown) return;

    isShuttingDown = true;

    console.log(`Received ${signal}. Shutting down...`);

    stopCoinSync();
    stopPriceUpdateJob();

    console.log("Background jobs stopped.");

    process.exit(0);
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}
