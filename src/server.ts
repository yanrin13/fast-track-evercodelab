import app from "./app.js";
import { startCoinSync } from "./jobs/coinSync.job.js";
import { startPriceUpdateJob } from "./jobs/priceUpdate.job.js";
import { setupShutdown } from "./shutdown.js";

const port = process.env.PORT;

setupShutdown();

await startCoinSync();

if (process.env.NODE_ENV !== "test") {
  startPriceUpdateJob();
}

app.listen(port, () => {
  console.log("Server started");
});
