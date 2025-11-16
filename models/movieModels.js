const pool = require('../models/db');

async function getallgernes() {
    let queryText = "SELECT name FROM genres";
    const result = await pool.query(queryText);
    return result.rows;
}

module.exports = {
 getallgernes
};