/**
 * Created by quang on 04/07/2017.
 */
const bcrypt = require('bcryptjs');

const {db,} = require('../pgp');

const User = {};

function createfb(user) {
    console.log(user);
    return db.oneOrNone(`
    INSERT INTO users
    (username,email)
    VALUES
    ($1,$2)
    RETURNING *;`,
        [user.username, user.email]
    );
};

function create(user) {
    const password = bcrypt.hashSync(user.password, 10);
    return db.none("INSERT INTO users (username,password,phonenumber)VALUES($1,$2,$3)", [user.username, password, user.phonenumber]
    );
};
function findname(username) {
    return db.any(`
    SELECT *
    FROM users 
    WHERE username = $1;`, [username]
    );
};
function findUsername(username) {
    return db.oneOrNone(`
    SELECT *
    FROM users 
    WHERE username = $1;`, [username]
    );
};

module.exports = {create, createfb, findUsername, findname};