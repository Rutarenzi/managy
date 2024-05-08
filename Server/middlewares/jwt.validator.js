const { verify } = require("jsonwebtoken")
const { env } = require('process')

module.exports.validateJwt = async (req, res, next) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1]?.trim();
        if (!token) throw new Error("Unauthorized")
        const user = verify(token, env.JWT_ACCESS_TOKEN)
        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({ success: false, message: error.message })
    }

}