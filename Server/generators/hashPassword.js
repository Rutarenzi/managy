const bcrypt = require('bcrypt')
const SALT_ROUNDS = 10

module.exports.hashPassword = (password)=>{
    const newHash = bcrypt.hashSync(password, SALT_ROUNDS)
    return newHash
}