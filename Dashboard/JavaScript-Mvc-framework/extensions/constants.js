; $.app.constants = {
    server: "http://localhost:8080/api/",
    authUrlPath: "login/jiraLogin",
    queryUrlPath: "jiraQueries",
    jiraQueryData: [
        " AND status in (Resolved, Closed)", //  AND resolved >= @D1 AND resolved <= @D2, resolved >= 2017-08-01 AND resolved <= 2017-08-31
        " AND status in (Reopened)", // all reopen  || project in (@ProjectName)
        " AND status in (Reopened) AND cf[10904] is not empty" // defects with delta or any other
    ],
    jiraProjects: [
        {
            projectsId: "CCAP, CC",
            projectsDisplayName: "Chefs Culinar"
        },
        {
            projectsId: "BREN",
            projectsDisplayName: "Brenntag"
        },
        {
            projectsId: "EVA, EVBS",
            projectsDisplayName: "Evobus"
        },
        {
            projectsId: "PLB",
            projectsDisplayName: "Pipelife"
        },
        {
            projectsId: "GBO",
            projectsDisplayName: "GBO"
        },
        {
            projectsId: "SGG, SGH, SGC, SGP, SAN",
            projectsDisplayName: "Saint Gobain"
        },
        {
            projectsId: "TAL",
            projectsDisplayName: "Talis"
        },
        {
            projectsId: "IKO",
            projectsDisplayName: "IKO"
        },
        {
            projectsId: "STK",
            projectsDisplayName: "STK"
        },
        {
            projectsId: "BREN",
            projectsDisplayName: "RISO"
        },
        {
            projectsId: "BUTST",
            projectsDisplayName: "Bulter"
        }
    ]


};