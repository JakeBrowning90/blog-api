module.exports = {
    verifyToken: function(req, res, next) {
        // console.log(req.headers);
        // get auth header value
        const bearerHeader = req.headers['authorization'];
        // console.log(bearerHeader);
    
        if (typeof bearerHeader !== 'undefined') {
            // const bearer = bearerHeader.split(' ');
            // const bearerToken = bearer[1];
            // req.token = bearerToken;
            req.token = bearerHeader;
    
            next();
        } else {
            res.sendStatus(403);
            // res.json({message: 'Login required'})
        }
    } 

}


