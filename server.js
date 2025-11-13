/* 
Controllers - express modules
-----------------------------
express-formiddable: https://www.npmjs.com/package/express-formidable
- express-formidable can basically parse form types, including application/x-www-form-urlencoded, application/json, and multipart/form-data.
-----------------------------
fs/promises: https://nodejs.org/zh-tw/learn/manipulating-files/reading-files-with-nodejs
-----------------------------
*/
const express = require('express');
const app = express();
const fs = require('node:fs/promises');
const formidable = require('express-formidable'); 
const cookieSession = require('cookie-session');

app.use(cookieSession({
    name: 'session',
    keys: ['your-secret-key-here'],
    maxAge: 24 * 60 * 60 * 1000
}));
app.use(formidable());

/* Model - mongodb modules
mongodb ^6.9: https://www.npmjs.com/package/mongodb
*/
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const url = 'mongodb+srv://Aaronli:Aaron@cluster0.fwfuo0a.mongodb.net/';  
const client = new MongoClient(url, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

