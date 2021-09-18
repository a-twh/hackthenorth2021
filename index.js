const express = require("express");
const app = express();
const parse = require("pg-connection-string").parse;
const { Pool } = require("pg");
const { v4: uuidv4 } = require("uuid");

const port = 5000;

const connectionString =
    "postgresql://user:qDfZrAm5HubXG@D@free-tier.gcp-us-central1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&sslrootcert=$HOME/.postgresql/root.crt&options=--cluster%3Dcockroachdb-3592"
    .replace("$HOME", process.env.HOME);

var config = parse(connectionString);
config.port = 26257;
config.database = "Users";
const pool = new Pool(config);

// Connect to database
const client = pool
    .connect()
    .then(() => {
        console.log("Database connected");
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(port, () => {
    console.log("Serving on port " + port);
});
