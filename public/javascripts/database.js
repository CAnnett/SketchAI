const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./DB/SketchAI.db');

let stringtest = '';


//db.run("INSERT INTO Users VALUES  ('2', 'tester', 'password', 'tester@yahoo.com')");

//Retrieving All Rows
db.all("SELECT * FROM Users", (error, rows) => {
    rows.forEach((row) => {
        console.log(rows);
    })
});

async function getRow() {
    //Retrieving A Single Row
    db.get("SELECT userID, username FROM Users WHERE userID = '1'", (error, row) => {
        let id = row.userID;
        //console.log(row.userID + " " + row.username);
        return(id);
    });
    
}


//db.run("DELETE FROM Users WHERE UserID  2");

// db.run('INSERT INTO emp(id,name) VALUES(?,?)', [req.params.id, req.params.name],