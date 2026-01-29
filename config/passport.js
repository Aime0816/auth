const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const passport = require('passport');
const connection = require('../config/db');
    
function passportConfig() {
    passport.use(
        new localStrategy(function (username, password, done) {
            const query = 'SELECT * FROM users WHERE username = ?';
            connection.query(query, [username], function (err, results) {
                if (err) {
                    return done(err);
                }
                if (results.length === 0) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                const user = results[0];
                bcrypt.compare(password, user.pass, function (err, isMatch) {
                    if (err) {
                        return done(err);
                    }
                    if (!isMatch) {
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                    return done(null, user);
                }
            );
        }
    );
}
)
)
}
passport.serializeUser(function (user, done) {
    done(null, user.id);
})
passport.deserializeUser(function (id, done) {
    const query = 'SELECT * FROM users WHERE id = ?';
    connection.query(query,[id],function(err,results){
        if(err){
            return done(err);
        }
        done(null, results[0]);
    })
})

module.exports = passportConfig;