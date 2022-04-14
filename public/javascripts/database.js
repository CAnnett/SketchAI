const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('../DB/SketchAI.db');

db.get("SELECT * FROM Users WHERE UserID = '1'");
