import { Request, Response } from 'express';

export class ContentTypeMiddleware {
    static handler  (req: Request, res: Response, next: any) {
        res.setHeader("Content-Type", "application/json");
        next();
    }
}