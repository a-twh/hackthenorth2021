const parse = require("pg-connection-string").parse;
const { Pool } = require("pg");
const prompt = require("prompt");
const { v4: uuidv4 } = require("uuid");

const add_user = async (req, res) => {
    //TODO
}

const delete_user = async (req, res) => {
    //TODO
}

const get_user = async (req, res) => {
    //TODO
}

const get_all_users = async (req, res) => {
    //TODO
}

const update_user = async (req, res) => {
    //TODO
}

module.exports = {
    add_user,
    delete_user,
    get_user,
    get_all_users,
    update_user,
}