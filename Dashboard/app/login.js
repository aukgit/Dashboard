module.exports = {
    login: function (app, router, config, options, req, reqParams) {
        if (!req.session.views) {
            req.session.views = "Hello from session";
        } else {
            req.session.views += " ... 1 - ";
        }

        return {
            res: "we have got it : " + req.session.views
        }
    }
};

