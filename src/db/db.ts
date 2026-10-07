import sqlite3 from "sqlite3";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, "../../data");
const dbPath = path.join(dataDir, "db.sqlite");

fs.mkdirSync(dataDir, { recursive: true });

export const db = new sqlite3.Database(dbPath);
