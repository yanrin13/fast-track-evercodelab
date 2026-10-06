import { db } from "./src/db/db.js";

db.all(
  `
  SELECT 
    c.symbol,
    COUNT(*) AS updates
  FROM price_history ph
  JOIN coins c ON c.id = ph.coin_id
  GROUP BY ph.coin_id
  ORDER BY updates DESC
`,
  (err, rows) => {
    if (err) {
      console.error(err);
      return;
    }

    console.table(rows);
  },
);
