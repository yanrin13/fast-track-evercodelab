import "./db/schema.js";
import "./db/init.js";
import express from "express";
import { startCoinSync } from "./jobs/coinSync.job.js";
import { startPriceUpdateJob } from "./jobs/priceUpdate.job.js";
import coinRoutes from "./routes/coin.routes.js";
import trackedCoinsRoutes from "./routes/trackedCoins.routes.js";
import historyRoutes from "./routes/price.routes.js";

const app = express();

app.use(express.json());

app.use("/api", coinRoutes);
app.use("/api", historyRoutes);
app.use("/api", trackedCoinsRoutes);

app.listen(3000, () => {
  console.log("Server started");
});

await startCoinSync();
await startPriceUpdateJob();

export default app;
