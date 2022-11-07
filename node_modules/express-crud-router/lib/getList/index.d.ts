import { RequestHandler, Request, Response } from 'express';
export declare type GetList<R> = (conf: {
    filter: Record<string, any>;
    limit: number;
    offset: number;
    order: Array<[string, string]>;
}, opts?: {
    req: Request;
    res: Response;
}) => Promise<{
    rows: R[];
    count: number;
}>;
export declare type Search<R> = (q: string, limit: number, filter: Record<string, any>, opts?: {
    req: Request;
    res: Response;
}) => Promise<{
    rows: R[];
    count: number;
}>;
export declare const getMany: <R>(doGetFilteredList: GetList<R>, doGetSearchList?: Search<R> | undefined, filtersOption?: FiltersOption | undefined) => RequestHandler;
export declare const parseQuery: (query: any, filtersOption?: FiltersOption | undefined) => {
    offset: any;
    limit: number;
    filter: {
        [x: string]: any;
    };
    order: [[string, string]];
    q: any;
};
export declare type FiltersOption = Record<string, (value: any) => any>;
