module.exports = {
    login: function (req, reqParams, post, app, config) {
        var login,
            globals = require("./globals"),
            isEmpty = globals.isEmpty;
        if (isEmpty(req.session.login)) {

            login = {
                isLoggedIn: false,
                userName: null,
                jiraHeader: null,
                jiraUrl: config.jiraUrl,
                authUrl: config.authUrl
            };

            req.session.login = login;
        } else {
            login = req.session.login;
        }

        return login; //, params: reqParams };
    },

    jiraLoginPost: function (req, reqParams, postData, app, config) {
        //console.log(postData);
        //console.log(config);
        var https = require("https");

        var globals = require("./globals"),
            isEmpty = globals.isEmpty,
            deffered = globals.defferedClientPost;




        var username = postData.username,
            pass = postData.password,
            jiraUrlhost = config.jiraUrl,
            authUrlPath = config.authUrl,
            apiPath = config.jiraApiUrl;
        var loginArgs = {
            data: {
                "username": username,
                "password": pass
            }
        };

        var auth = JSON.parse(deffered(jiraUrlhost, authUrlPath, loginArgs));
        console.log(auth);

        if (auth !== null) {
            console.log("Auth not empty");
            var session = auth.session;

            console.log(auth.session);

            var searchArgs = {
                headers: {
                    // Set the xcookie from the session information
                    cookie: session.name + '=' + session.value
                },
                data: {
                    // Provide additional data for the JIRA search. You can modify the JQL to search for whatever you want.
                    jql: "type=Bug AND status=Closed"
                }
            };

            var bugs = deffered(jiraUrlhost, apiPath, searchArgs);

            console.log(bugs);

            return bugs;

        }


        return null;
    }
};

