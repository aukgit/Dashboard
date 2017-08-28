module.exports = {
    jiraQueries: function (req, reqParams, postData, app, config) {
        var globals = require("./globals"),
            isEmpty = globals.isEmpty,
            deffered = globals.defferedClientPost,
            promiseRequest = globals.getClientPostPromise;

        var sleep = require("system-sleep");

        var jiraUrlhost = config.jiraUrl,
            apiPath = config.jiraApiUrl,
            login = postData.login,
            jqls = postData.jqls,
            limit = postData["limit"],
            filterFields = postData.filterFields,
            additionalJiraFilters = postData.additionalJiraFilters;


        console.log(postData);
        //console.log(jqls);

        var getJiraResultsPromise = function (loginx, jql, limit, callBack) {
            var jiraHeader = loginx.jiraHeader;
            jiraHeader.data.jql = jql;

            if (!isEmpty(additionalJiraFilters)) {
                for (var filter in additionalJiraFilters) {
                    if (additionalJiraFilters.hasOwnProperty(filter)) {
                        jiraHeader.data[filter] = additionalJiraFilters[filter];
                    }
                }
            }

            console.log(jiraHeader.data);

            if (isEmpty(limit)) {
                limit = -1;
            } else {
                limit = parseFloat(limit);
            }

            return promiseRequest(jiraUrlhost, apiPath, jiraHeader, limit);
        };


        var getMultipleResults = function (loginx, jqls, limit) {
            var len = jqls.length;
            var resultsProcessed = 0;
            var combinedResults = new Array(len);
            var updateResultsIndex = function (loginx, jql, limit, index) {
                getJiraResultsPromise(loginx, jql, limit).then((result) => {
                    // successMessage is whatever we passed in the resolve(...) function above.
                    // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
                    // console.log("Yay! " + successMessage + x + ":y:" + y);

                    var resultJson = JSON.parse(result);
                    if (!isEmpty(filterFields)) {
                        var finalFilteredResultSet = {};
                        for (var j = 0; j < filterFields.length; j++) {
                            var field = filterFields[j];
                            console.log("Reading filter field : " + field);
                            finalFilteredResultSet[field] = resultJson[field];
                        }

                        combinedResults[index] = finalFilteredResultSet;
                        resultJson = -1;
                    } else {
                        combinedResults[index] = resultJson;
                    }


                    resultsProcessed += 1;
                    // console.log("Results Processed : " + resultsProcessed);
                });
            }

            for (var i = 0; i < jqls.length; i++) {
                var jql = jqls[i];
                updateResultsIndex(loginx, jql, limit, i);
            }


            while (resultsProcessed < jqls.length) {
                sleep(10);
            }

            return combinedResults;
        }

        if (!isEmpty(req.session.login) && req.session.login["isLoggedIn"] === true) {
            return getMultipleResults(req.session.login, jqls, limit);
        } else {

            if (!isEmpty(login) && login["isLoggedIn"] === true && !isEmpty(login["cookie"])) {
                return getMultipleResults(login, jqls, limit);
            }

            return {
                auth: "Failed , login first.",
                status: 500
            }
        }


    }
};

