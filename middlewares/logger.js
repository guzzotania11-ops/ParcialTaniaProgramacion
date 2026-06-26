const logger = (req, res, next) => {
    console.log(new Date().toLocaleDateString());
    console.log(new Date().toLocaleTimeString());
    console.log(req.method);
    console.log(req.originalUrl);

    next();
};

module.exports = logger;