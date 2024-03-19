import { Pagination } from '../../../abstractions/Pagination'

export interface IRepository<IEntity>
{
    create: (payload: IEntity) => Promise<IEntity>
    get: (filter?: Partial<IEntity>, pagination?: Pagination) => Promise<IEntity[]>
    getById: (id: string) => Promise<IEntity>
    getByIds: (ids: string[], pagination?: Pagination) => Promise<IEntity[]>
    update: (id: string, payload: Partial<IEntity>) => Promise<IEntity>
    delete: (filter?: Partial<IEntity>) => Promise<void>
    deleteByIds: (ids: string[]) => Promise<void>
}