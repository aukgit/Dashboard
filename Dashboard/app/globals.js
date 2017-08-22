module.exports = {
    isEmpty: function (o) {
        return o === undefined || o === null;
    },

    defferedClientPost: function (hostName, path, args, acceptingStatus, checkDurationInMilisec) {
        var https = require("https");
        var sleep = require("system-sleep");
        var data = args.data;
        var headers = args.headers;

        var query = JSON.stringify(data);
        var results = [], result = null;

        var isEmpty = function (o) {
            return o === undefined || o === null;
        };

        var options = {
            hostname: hostName,
            path: path,
            method: "POST"
        }

        if (isEmpty(acceptingStatus)) {
            acceptingStatus = 200;
        }

        if (isEmpty(checkDurationInMilisec)) {
            checkDurationInMilisec = 250;
        }
        console.log("---------------- [Start] New Request at : " + hostName + path + "---------------------");

        var req2 = https.request(options,
            function (resp) {
                // if the statusCode isn't what we expect, get out of here
                if (resp.statusCode !== acceptingStatus) {
                    console.log("StatusCode=" + resp.statusCode);
                    return null;
                }

                console.log("reading data : ");
                resp.on("data", function (dataChunk) {
                    //  console.log('BODY: ' + cssMinified);
                    results.push(dataChunk);
                    //console.log(dataChunk);
                });

                resp.on("end", function () {
                    result = results.join("");
                    //console.log("done reading");
                    console.log("---------------- [End] at : " + hostName + path + " with " + resp.statusCode + "---------------------");
                    return result;
                });
                //resp.pipe(process.stdout);
            });

        req2.on("error", function (err) {
            throw err;
        });

        req2.setHeader("Content-Type", "application/json");
        req2.setHeader("Content-Length", query.length);

        if (!isEmpty(headers)) {
            for (var key in headers) {
                if (headers.hasOwnProperty(key)) {
                    console.log(key + " -> " + headers[key]);
                    req2.setHeader(key, headers[key]);
                }
            }
        }

        req2.end(query, "utf8");
        console.log(req2.output);

        // console.log("before waiting");

        while (result === null) {
            sleep(checkDurationInMilisec);
            //console.log("waiting " + checkDurationInMilisec);
            // console.log(result);
        }

        return result;
    }
};

