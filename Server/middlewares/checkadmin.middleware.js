module.exports.checkAdmin = (req, res, next) => {
    try {
        const user = req.user;
        if (!user) throw new Error("Can't find the user")
        if (user.role != 'ADMIN') throw new Error("User not authorized for this")
        next();
    } catch (error) {
        return res.status(406).json({ success: false, message: error.message })
    }
}