$(function () {
    $("#summary-table").DataTable({
        responsive: true
    });
    Morris.Donut({
        element: "morris-donut-chart",
        data: [
            { label: "Download Sales", value: 12 },
            { label: "In-Store Sales", value: 30 },
            { label: "Mail-Order Sales", value: 20 }
        ]
    });

    var ids = {
        jiraForm: "jira-form",
        summaryBtn: "summary-btn"
    };


    var $form = $("#" + ids.jiraForm);

    var jsonSearch = function (jsonArray, fieldName, fieldValueLookingfor) {
        for (var i = 0; i < jsonArray.length; i++) {
            var item = jsonArray[i];
            if (item[fieldName] === fieldValueLookingfor) {
                return item;
            }
        }

        return null;
    }

    $form.submit(function (e) {
        e.preventDefault();
        var values = $form.serializeArray();
        console.log(values);
        var userId = jsonSearch(values, "name", "user-id"),
            pass = jsonSearch(values, "name", "password");

        //var loginArgs = {
        //    data: {
        //        "username": userId.value,
        //        "password": pass.value
        //    },
        //    headers: {
        //        "Content-Type": "application/json"
        //    }
        //};

        var loginArgs = {
            username: userId.value,
            password: pass.value
        };


        var jsonString = JSON.stringify(loginArgs);

        var json2 = {
            "username": "Faiz Mohammed",
            "password": "4Update.access!"
        };

        console.log(json2);
        console.log(jsonString);

        //$.ajaxSetup({
        //    beforeSend: function (xhr) {
        //        xhr.setRequestHeader('contentType', "application/json");
        //        xhr.setRequestHeader('Access-Control-Allow-Origin', "*");
        //    }
        //});
        $.ajax({
            type: "POST",
            url: "https://jira.update.com/rest/auth/1/session",
            data: jsonString,
            contentType: "application/json",
            dataType:"json",
            //xhrFields: {
            //    // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
            //    // This can be used to set the 'withCredentials' property.
            //    // Set the value to 'true' if you'd like to pass cookies to the server.
            //    // If this is enabled, your server must respond with the header
            //    // 'Access-Control-Allow-Credentials: true'.
            //    withCredentials: true
            //},
            //headers: {
            //    // Set any custom headers here.
            //    // If you set any non-simple headers, your server must include these
            //    // headers in the 'Access-Control-Allow-Headers' response header.
            //    "Content-Type": "application/json"
            //},

            //headers: {
            //    'Access-Control-Allow-Origin': "*",
            //    //'Access-Control-Allow-Credentials': true,
            //    contentType: "application/json"
            //},
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            success: function (response) {
                console.log("Success");
                console.log(response);
            },
            error: function (x, e, d) {
                console.log("Error");
                console.log(x);
                console.log(e);
                console.log(d);
            }
        });


    });



    //};
    //client.post("http://localhost:8090/jira/rest/auth/1/session", loginArgs, function (data, response) {
    //    if (response.statusCode == 200) {
    //        console.log('succesfully logged in, session:', data.session);
    //        var session = data.session;
    //        // Get the session information and store it in a cookie in the header
    //        var searchArgs = {
    //            headers: {
    //                // Set the cookie from the session information
    //                cookie: session.name + '=' + session.value,
    //                "Content-Type": "application/json"
    //            },
    //            data: {
    //                // Provide additional data for the JIRA search. You can modify the JQL to search for whatever you want.
    //                jql: "type=Bug AND status=Closed"
    //            }
    //        };
    //        // Make the request return the search results, passing the header information including the cookie.
    //        client.post("http://localhost:8090/jira/rest/api/2/search", searchArgs, function (searchResult, response) {
    //            console.log('status code:', response.statusCode);
    //            console.log('search result:', searchResult);
    //        });
    //    } else {
    //        throw "Login failed :(";
    //    }
    //});
});