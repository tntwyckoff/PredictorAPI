"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingMiddleware = void 0;
class LoggingMiddleware {
}
exports.LoggingMiddleware = LoggingMiddleware;
LoggingMiddleware.handler = function (req, res, next) {
    console.log(`${new Date()} REQ: ${req.url}`);
    next();
};
