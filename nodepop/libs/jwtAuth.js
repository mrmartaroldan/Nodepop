'use strict';

/**
 * Your utility library for express
 */
var jwt = require('jsonwebtoken');
var config = require('../local_config');
var translate = require('../translate.json');
var configJWT = config.jwt;
var googleTranslate = require('google-translate')(config.api.key);
/**
 * JWT auth middleware for use with Express 4.x.
 *
 * @example
 * app.use('/api-requiring-auth', jwtAuth());
 *
 * @returns {function} Express 4 middleware
 */
module.exports = function() {
    return function(req, res, next) {
        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        var language = req.query.language || 'en';

        // decode token
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, configJWT.secret, function(err, decoded) {
                if (err) {
                    var message = translate.FAILED_TO_AUTHENTICATE_TOKEN;
                    if (language == 'es'){
                        message = message.es
                    }else if (language == 'en'){
                        message = message.en
                    }
                    return res.json({ ok: false, error: {code: 401, message: message}});


                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            // if there is no token return error
            var message = translate.TOKEN_IS_NEEDED;
            if (language == 'es'){
                message = message.es
            }else if (language == 'en'){
                message = message.en
            }

                return res.status(403).json({
                    ok: false,
                    error: { code: 403, message: message}
                });


        }
    };
};
