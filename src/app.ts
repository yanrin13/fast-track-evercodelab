import "./db/schema.js";
import "./db/init.js";
import express from "express";
import { startCoinSync } from "./jobs/coinSync.job.js";
import { startPriceUpdateJob } from "./jobs/priceUpdate.job.js";
import coinRoutes from "./routes/coin.routes.js";
import trackedCoinsRoutes from "./routes/trackedCoins.routes.js";
import historyRoutes from "./routes/price.routes.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";
import { setupShutdown } from "./shutdown.js";
const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", coinRoutes);
app.use("/api", historyRoutes);
app.use("/api", trackedCoinsRoutes);

app.listen(port, () => {
  console.log("Server started");
});

setupShutdown();

await startCoinSync();
if (process.env.NODE_ENV !== "test") {
  startPriceUpdateJob();
}

export default app;
