"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingMiddleware = void 0;
class LoggingMiddleware {
    static handler(req, res, next) {
        console.log(`${new Date()} REQ: ${req.url}`);
        next();
    }
}
exports.LoggingMiddleware = LoggingMiddleware;
