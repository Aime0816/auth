
const bcrypt = require('bcryptjs');
const connection = require('../config/db');
const path = require('path');

function registerUser(req, res) {
    const { username, password } = req.body;
    const saltRounds = 10;
    console.log(req.body);
    bcrypt.hash(password, saltRounds, function (err, hashedPassword) {
        if (err){
            return res.status(500).json({ message: 'Error hashing password' });
        }
        else {
            const sql = 'INSERT INTO users (username, pass) VALUES (?, ?)';
            connection.query(sql, [username, hashedPassword], function (err, results) {
                 if(err){
                        return  res.status(500).json({ message: 'Error registering user' });
                 }
                    console.log('User registered successfully');
                    return res.sendFile(path.join(__dirname, '../public/login.html'));
            });
        }
    })
}
 function dashboard(req, res) {
     if (!req.isAuthenticated() || !req.user) {
        console.log('User not authenticated');
        return res.redirect('/login.html');
        
        } else {
            console.log('User authenticated');
            return res.sendFile(path.join(__dirname, '../views/dashboard.html'));
        }
 }






 module.exports = { registerUser, dashboard };