module.exports = {
    isEmpty: function (o) {
        return o === undefined || o === null;
    },

    defferedClientPost: function(url, headerArgs, onCompleteFunction, acceptingStatus, checkDurationInMilisec) {
        var Client = require('node-rest-client').Client;
        var sleep = require('system-sleep');
        var client = new Client();
        var result = null;

        if (acceptingStatus) {
            acceptingStatus = 200;
        }

        if (checkDurationInMilisec) {
            checkDurationInMilisec = 450;
        }

        client.post(url,
            headerArgs,
            function (data, response) {
                if (response.statusCode === acceptingStatus) {
                    
                } else {
                    throw "Login failed :(";
                }
            });
    }
};

