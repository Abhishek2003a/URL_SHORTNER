const jwt = require("jsonwebtoken");

const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            userId: user.userId
        },
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: "7d"
        }
    );
};

module.exports = generateRefreshToken;
