// server.js
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const queryString = require("query-string");

server.use(middlewares);

// Custom response for pagination get request
router.render = (req, res) => {
    const headers = res.getHeaders();
    const totalCount = headers["x-total-count"];

    if (req.method === "GET" && totalCount) {
        const queryParams = queryString.parse(req._parsedUrl.query);
        const result = {
            data: res.locals.data,
            paginations: {
                _page: Number.parseInt(queryParams.page) || 1,
                _limit: Number.parseInt(queryParams.limit) || 10,
                _totalRow: Number.parseInt(totalCount),
            },
        };

        return res.json(result);
    }

    res.jsonp(res.locals.data);
};

// Add delay to simulate network latency
server.use((req, res, next) => {
    setTimeout(next, 500);
});

server.use(router);
server.listen(3000, () => {
    console.log("JSON Server is running in port 3000");
});
