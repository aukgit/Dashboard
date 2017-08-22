module.exports = {
    jiraQuery: function (req, reqParams, postData, app, config) {
        var globals = require("./globals"),
            isEmpty = globals.isEmpty,
            deffered = globals.defferedClientPost;


        var jiraUrlhost = config.jiraUrl,
            apiPath = config.jiraApiUrl,
            login = postData.login,
            jql = postData.jql,
            limit = postData["limit"];


        // console.log(postData);

        var getJiraResults = function (loginx, jql, limit) {
            console.log("already logged in.");

            var jiraHeader = loginx.jiraHeader;

            jiraHeader.data.jql = jql;

            if (isEmpty(limit)) {
                limit = -1;
            } else {
                limit = parseFloat(limit);
            }

            var results = deffered(jiraUrlhost, apiPath, jiraHeader, limit);

            //console.log(bugs);

            return JSON.parse(results);
        };

        if (!isEmpty(req.session.login) && req.session.login["isLoggedIn"] === true) {
            return getJiraResults(req.session.login, jql, limit);
        } else {

            if (!isEmpty(login) && login["isLoggedIn"] === true && !isEmpty(login["cookie"])) {
                return getJiraResults(login, jql, limit);
            }

            return {
                auth: "Failed , login first.",
                status: 500
            }
        }


    }
};

