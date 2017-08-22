$(function () {
    //$("#summary-table").DataTable({
    //    responsive: true
    //});
    //Morris.Donut({
    //    element: "morris-donut-chart",
    //    data: [
    //        { label: "Download Sales", value: 12 },
    //        { label: "In-Store Sales", value: 30 },
    //        { label: "Mail-Order Sales", value: 20 }
    //    ]
    //});

    var loggedin = false;

    var server = "http://localhost:8080/api/";

    var ids = {
        jiraForm: "jira-form",
        summaryBtn: "summary-btn"
    };

    var loginDetails;

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


        //$.ajaxSetup({
        //    beforeSend: function (xhr) {
        //        xhr.setRequestHeader('contentType', "application/json");
        //        xhr.setRequestHeader('Access-Control-Allow-Origin', "*");
        //    }
        //});

        if (!loggedin) {
            $.ajax({
                type: "POST",
                url: server + "login/jiraLogin",
                data: jsonString,
                contentType: "application/json",
                dataType: "json",

                success: function (response) {
                    console.log("Success");
                    console.log(response);
                    loggedin = response.isLoggedIn;
                    loginDetails = response;
                    getJiraResults("status=Closed OR status=Open", loginDetails);
                },
                error: function (x, e, d) {
                    console.log("Error");
                    console.log(x);
                    console.log(e);
                    console.log(d);
                }
            });
        } else {
            getJiraResults("status=Closed OR status=Open", loginDetails);
        }

        var getJiraResults = function (jql, login) {


            var data = { "jql": jql, login: login };


            var dataJsonString = JSON.stringify(data);

            $.ajax({
                type: "POST",
                url: server + "jiraQuery",
                data: dataJsonString,
                contentType: "application/json",
                dataType: "json",

                success: function (response) {
                    console.log(response);
                },
                error: function (x, e, d) {
                    console.log("Error");
                    console.log(x);
                    console.log(e);
                    console.log(d);
                }
            });
        }



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