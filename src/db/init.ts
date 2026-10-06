import crypto from "crypto";
import { db } from "./db.js";

db.get("SELECT id FROM users LIMIT 1", (err, user) => {
  if (err) {
    console.error("SELECT ERROR:", err);
    return;
  }

  console.log("USER:", user);

  if (!user) {
    const apiKey = crypto.randomBytes(32).toString("hex");

    db.run("INSERT INTO users (api_key) VALUES (?)", [apiKey], function (err) {
      if (err) {
        console.error("INSERT ERROR:", err);
        return;
      }

      console.log("USER CREATED, id:", this.lastID);
      console.log("API KEY:", apiKey);
    });
  }
});
