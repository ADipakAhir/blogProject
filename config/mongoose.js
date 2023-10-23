const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/admin");

const db = mongoose.connection;

db.once("open", function (err) {
    if (err) {
        console.log("error")
    }
    else {
        console.log("db is connect")
    }
});

module.exports = db;