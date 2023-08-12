const jwt = require('jsonwebtoken');
function authenticateToken(req, res, next) {
    console.log('dis oned getting called')
    console.log(`token: ${req.session.token}`)
    console.log(req.session.userinfo)
    //const authHeader = req.headers['authorization']
    const token = req.session.token

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            console.error("JWT verification error:", err);
            return res.sendStatus(403);
        }

        req.user = user;
        next();
    })
}
module.exports = {
    authenticateToken
};