var express = require('express');
var request = require('request');
var parseString = require('xml2js')
    .parseString;
var router = express.Router();

var API_KEY = "SN9X-MBRe-JJ4n";
var BASE_API_URI = 'http://brickset.com/api/v2.asmx';
var REDIRECT_BASE_URL = "https://www.google.co.in";

/* GET users listing. */
router.post('/login', function(req, res, next) {
    var reqObj = req.body;
    console.log(reqObj)
    var username = reqObj.user_name;
    var password = reqObj.user_password;

    if (username !== undefined && password) {
        var url = BASE_API_URI + "/login?apiKey=" + API_KEY + "&username=" + username + "&password=" + password;
        
		request.get(url, function(error, response, body) {
            parseString(body, function(err, result) {
                console.log(result);
                var resStr = result.string._;
                var resJSON = {};
                if (!err) {
                    if (resStr.indexOf('ERROR') == -1) {
                        resJSON = {
                            status: "Success",
                            message: "User logged In",
                            token: resStr
                        };
                        res.send(resJSON);
                    } else {
                        resJSON = {
                            status: "Error",
                            message: resStr.split(':')[1]
                        }
                        res.send(resJSON);
                    }
                } else {
                    resJSON = {
                        status: "Error",
                        message: "Internal server error"
                    };
                    res.send(resJSON);
                }
            });
        });
    } else {
        res.send({
            Error: "invalid username and/or password"
        });
    }
});

module.exports = router;
