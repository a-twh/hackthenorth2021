const { v4: uuidv4 } = require("uuid");
const parse = require("pg-connection-string").parse;
const { Pool } = require("pg");

const connectionString =
    "postgresql://user:qDfZrAm5HubXG@D@free-tier.gcp-us-central1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&sslrootcert=$HOME/.postgresql/root.crt&options=--cluster%3Dcockroachdb-3592"
    .replace("$HOME", process.env.HOME);

var config = parse(connectionString);
config.port = 26257;
config.database = "HTN";
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


const add_user = async (req, res) => {
    try {
        var id = await uuidv4();
        var email = req.body.email;
        var name = req.body.name;
        var password = req.body.password;
        var high_score = req.body.high_score;
    } catch (err) {
        res.status(400).json("Bad Request")
    }    

    const insert = `INSERT INTO HTN.Users(id, email, name, password, high_score)VALUES(\'${id}\', \'${email}\', \'${name}\', \'${password}\', \'${high_score}\');`;
    await pool.query(insert, (err, result) => {
        if (!err) {
            console.log(result);
            res.status(200).json("Successfully addes user with id: " + id);
        } else {
            res.status(500).json("Internal Server Error: " + err.message);
            console.log(err);
        }
    })
}

const delete_user = async (req, res) => {
    try {
        var id = req.params.id;
    } catch (err) {
        res.status(400).json("Bad Request");
    }
    
    const statement = `DELETE FROM HTN.Users WHERE id=\'${id}\';`
    await pool.query(statement, (err, result) => {
        if (!err && result.rowCount == 0) {
            res.status(404).json("User with id: " + id + " not found");
        }
        else if (!err) {
            console.log(result);
            res.status(200).json("Sucessfully deleted row with id: " + id);
        } else {
            res.status(500).json("Internal Server Error: " + err.message);
        }
    })
}

const get_user = async (req, res) => {
    try {
        var id = req.params.id;
    } catch (err) {
        res.status(400).json("Bad Request");
    }
    
    const statement = `SELECT * FROM HTN.Users WHERE id=\'${id}\';`
    await pool.query(statement, (err, result) => {
        if (!err && result.rowCount == 0) {
            res.status(404).json("User with id: " + id + " not found");
        }
        else if (!err) {
            console.log(result.rows);
            res.status(200).json(result.rows);
        } else {
            res.status(500).json("Internal Server Error: " + err.message);
        }
    })
}

const get_all_users = async (req, res) => {    
    const statement = `SELECT * FROM HTN.Users;`
    await pool.query(statement, (err, result) => {
        if (!err) {
            console.log(result.rows);
            res.status(200).json(result.rows);
        } else {
            res.status(500).json("Internal Server Error: " + err.message);
        }
    })
}

//NOT WORKING
const update_user = async (req, res) => {
    try {
        var id = req.params.id;
        var name = req.body.name;
        var password = req.body.password;
        var high_score = req.body.high_score;
    } catch (err) {
        res.status(400).json("Bad Request");
    }
    
    const statement = `UPDATE HTN.Users SET name = \'${name}\', password = \'${password}\', high_score = \'${high_score}\' WHERE id=\'${id}\'`
    await pool.query(statement, (err, result) => {
        if (!err && result.rowCount == 0) {
            res.status(404).json("User with id: " + id + " not found");
        } else if (!err) {
            console.log(result);
            res.status(200).json("Successfully updated row with id: " + id);
        } else {
            res.status(500).json("Internal Server Error: " + err.message);
        }
    })
}

module.exports = {
    add_user,
    delete_user,
    get_user,
    get_all_users,
    update_user,
}