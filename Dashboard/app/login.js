module.exports = {
    login: function (req, reqParams, app, router, config, options) {
        var login;
        if (!req.session.login) {
            //var searchArgs = {
            //    headers: {
            //        // Set the cookie from the session information
            //        cookie: session.name + '=' + session.value,
            //        "Content-Type": "application/json"
            //    },
            //    data: {
            //        // Provide additional data for the JIRA search. You can modify the JQL to search for whatever you want.
            //        jql: "type=Bug AND status=Closed"
            //    }
            //};
            login = {
                isLoggedIn: false,
                userName: null,
                jiraHeader: null
            };

            req.session.login = login;
        } else {
            login = req.session.login;
        }

        return login; //, params: reqParams };
    },
    jiraLoginGet: function (req, reqParams) {
        return reqParams;
    }
};

