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
        var https = require('https');

        var globals = require("./globals"),
            isEmpty = globals.isEmpty;

        var request = require('request');
        var querystring = require('querystring');

        var query = querystring.stringify({
            input: css
        });

        //var deferred = require('deferred');

        //var delay = function (fn, timeout) {
        //    return function () {
        //        var def = deferred(), self = this, args = arguments;

        //        setTimeout(function () {
        //            var value;
        //            try {
        //                value = fn.apply(self, args));
        //            } catch (e) {
        //                def.reject(e);
        //                return;
        //            }
        //            def.resolve(value);
        //        }, timeout);

        //        return def.promise;
        //    };
        //};

        //console.log(req.session.login);



        //if (!isEmpty(req.session.login)) {
        //    var newReq = client.post(req.session.login.jiraUrl + "api/2/search", req.session.login.jiraHeader, function (searchResult, response) {
        //        console.log('alreay logged in');
        //        return searchResult;
        //    });
        //}

        var username = postData.username,
            pass = postData.password,
            jiraUrl = config.jiraUrl,
            authUrl = config.authUrl,
            result = null;

        var loginArgs = {
            data: {
                "username": username,
                "password": pass
            },
            headers: {
                "Content-Type": "application/json"
            }
        };
        var results = [], result = null;

        var options = {
            hostname: 'jira.update.com',
            path: '/rest/auth/1/session',
            method: 'POST',
            headers: loginArgs.headers,
            form: loginArgs.data
        }
        var req2 = https.request(options,
            function (resp) {
                // if the statusCode isn't what we expect, get out of here
                if (resp.statusCode !== 200) {
                    console.log('StatusCode=' + resp.statusCode);
                }

                console.log("reading data");
                resp.on('data', function (dataChunk) {
                    //  console.log('BODY: ' + cssMinified);
                    results.push(dataChunk);
                    console.log(dataChunk);
                });

                resp.on('end', function () {
                    result = results.join("");
                    console.log("done reading");
                });

                //resp.pipe(process.stdout);
            }
        );
        req2.on('error', function (err) {
            throw err;
        });

        //client.post(authUrl,
        //    loginArgs,
        //    function (data, response) {
        //        if (response.statusCode === 200) {
        //            console.log('succesfully logged in, session:', data.session);
        //            var session = data.session;
        //            // Get the session information and store it in a cookie in the header
        //            var searchArgs = {
        //                headers: {
        //                    // Set the cookie from the session information
        //                    cookie: session.name + '=' + session.value,
        //                    "Content-Type": "application/json"
        //                },
        //                data: {
        //                    // Provide additional data for the JIRA search. You can modify the JQL to search for whatever you want.
        //                    jql: "type=Bug AND status=Closed"
        //                }
        //            };

        //            var login = {};

        //            login.jiraHeader = searchArgs;
        //            login.urls = {
        //                jira: jiraUrl,
        //                auth: authUrl
        //            };

        //            login.userName = username;
        //            login.isLoggedIn = true;

        //            req.session.login = login;
        //            // Make the request return the search results, passing the header information including the cookie.
        //            client.post(jiraUrl + "api/2/search",
        //                searchArgs,
        //                function (searchResult, response) {
        //                    console.log('status code:', response.statusCode);
        //                    //console.log('search result:', searchResult);
        //                    result = searchResult;
        //                    return searchResult;
        //                });
        //        } else {
        //            throw "Login failed :(";
        //        }
        //    });

        console.log("before waiting");
        var sleep = require('system-sleep');
        while (result === null) {
            sleep(1000);
            console.log("waiting 500");
        }

        return result;
    }
};

