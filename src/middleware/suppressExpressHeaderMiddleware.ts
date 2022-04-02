import { Request, Response } from 'express';

export class SuppressExpressHeaderMiddleware {
    static handler  (req: Request, res: Response, next: any) {
        res.removeHeader("x-powered-by");
        next();        
    }
}