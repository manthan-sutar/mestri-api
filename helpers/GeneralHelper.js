
const bcrypt = require('bcryptjs');
const Logger = require('nodemon/lib/utils/log');

module.exports = {
    hashPassword: (password) => hashPassword(password),
    comparePassword: async (password, hashedPassword) => comparePassword(password, hashedPassword)
}

function hashPassword(password) {
    // Encryption of the string password
    if(password == null || password == "") throw "Password cannot be empty"
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

async function comparePassword(password, hashedPassword){
    var isPasswordMatched = false;
    bcrypt.compare(password, hashedPassword,
        async function (err, isMatch) {
            // Comparing the original password to
            // encrypted password   
            if (err) {
                throw console.log(err);
            }
            if (isMatch) {
                isPasswordMatched = true;
            }
            if (!isMatch) {
                isPasswordMatched = false;
            }
        })
    return isPasswordMatched;
}