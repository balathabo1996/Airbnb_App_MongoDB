/******************************************************************************
* ITE5315 – Assignment 4
* I declare that this assignment is my own work in accordance with Humber Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Thabotharan Balachandran Student ID: N01674899 Date: 2025-11-18
*
*
******************************************************************************/

require('dotenv').config();

const dbName = process.env.MONGO_DB;

module.exports = {
    url: `${process.env.MONGO_URI}/${dbName}?retryWrites=true&w=majority`,
    port: process.env.PORT || 8000,
    env: process.env.NODE_ENV || "development",
    dbName
};

