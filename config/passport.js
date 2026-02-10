const localStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
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
passport.use(
    new GoogleStrategy({
        clientID:process.env.clientID,
        clientSecret:process.env.clientSecret,
        callbackURL:'http://localhost:3000/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
        const user = {
            id:profile.id,
            username:profile.displayName,
            accessToken,  
            refreshToken
        }
        console.log('Google profile:', profile);
        console.log('Access Token:', accessToken);
        console.log('Refresh Token:', refreshToken);
        return done(null, user);
    }
)
)
}
passport.serializeUser(function (user, done) {
    done(null, user.id);
})
passport.deserializeUser(function (id, done) {
  
       return done(null, {id});
   
})



module.exports = passportConfig;