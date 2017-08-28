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

        return login; //, params:  reqParams };
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

        if (isEmpty(username) || isEmpty(postData.password)) {
            return {
                status: "Please pass appropriate username or password. Either probably not present."
            }
        }


        if (isEmpty(req.session.login)) {
            var auth = JSON.parse(deffered(jiraUrlhost, authUrlPath, loginArgs));
            console.log(auth);

            if (auth !== null) {
                console.log("Auth not empty");
                var session = auth.session;

                var cookie = session.name + '=' + session.value;

                console.log(auth.session);

                var searchArgs = {
                    headers: {
                        // Set the xcookie from the session information
                        cookie: cookie
                    },
                    data: {
                        // Provide additional data for the JIRA search. You can modify the JQL to search for whatever you want.
                        jql: ""
                    }
                };

                var login = {};
                if (!isEmpty(session.name)) {
                    login.jiraHeader = searchArgs;
                    login.cookie = cookie;
                    login.urls = {
                        jira: jiraUrlhost,
                        authPath: authUrlPath,
                        apiPath: apiPath
                    };

                    login.userName = username;
                    login.isLoggedIn = true;

                    req.session.login = login;
                }
            }
        }

        if (!isEmpty(req.session.login) && req.session.login["isLoggedIn"] === true) {

            console.log("already logged in.");
            // var bugs = deffered(jiraUrlhost, apiPath, req.session.login.jiraHeader);

            //console.log(bugs);

            return req.session.login;
        }


        return null;
    }
};

