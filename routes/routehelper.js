const jwt = require('jsonwebtoken');
function authenticateToken(req, res, next) {
    console.log('dis oned getting called')
    console.log(`token: ${req.session.token}`)
    console.log(req.session.userinfo)

    const token = req.session.token

    if (token == null) return res.redirect('/login')  // Redirect to login page if token is null

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            console.error("JWT verification error:", err);
            return res.redirect('/login');  // Redirect to login page if token verification fails
        }

        req.user = user;
        next();
    })
}

module.exports = {
    authenticateToken
};
