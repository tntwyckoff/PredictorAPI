import { Request, Response } from 'express';

export class LoggingMiddleware {
    static handler (req: Request, res: Response, next: any) {
        console.log(`${new Date()} REQ: ${req.url}`);
        next();
    }
}
