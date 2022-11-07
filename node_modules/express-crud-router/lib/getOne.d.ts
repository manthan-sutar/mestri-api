import { RequestHandler, Request, Response } from 'express';
export declare type GetOne<R> = (identifier: string, opts?: {
    req: Request;
    res: Response;
}) => Promise<R | null>;
export declare const getOne: <R>(doGetOne: GetOne<R>) => RequestHandler;
