 interface IRepository<T> {
    find(item: T): Promise<T[]>;
    findOne(id: string): Promise<T|null>;
    create(item: T): Promise<T>;
    update(id: string, item: T): Promise<T|null>;
    delete(id: string): Promise<boolean>;
}
export default IRepository;