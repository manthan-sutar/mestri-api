import { GetList, Search, FiltersOption } from './getList';
import { GetOne } from './getOne';
import { Create } from './create';
import { Update } from './update';
import { Destroy } from './delete';
export interface Actions<I extends string | number, R> {
    getOne: GetOne<R> | null;
    create: Create<I, R> | null;
    destroy: Destroy | null;
    update: Update<R> | null;
    getList: GetList<R> | null;
    search: Search<R> | null;
}
interface CrudOptions {
    filters: FiltersOption;
}
export { GetOne, Create, Destroy, Update, GetList, Search };
export declare const crud: <I extends string | number, R>(path: string, actions: Partial<Actions<I, R>>, options?: Partial<CrudOptions> | undefined) => import("express-serve-static-core").Router;
export default crud;
