import express from "express";

import coinRoutes from "./routes/coin.routes.js";
import trackedCoinsRoutes from "./routes/trackedCoins.routes.js";
import historyRoutes from "./routes/price.routes.js";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", coinRoutes);
app.use("/api", historyRoutes);
app.use("/api", trackedCoinsRoutes);

export default app;
