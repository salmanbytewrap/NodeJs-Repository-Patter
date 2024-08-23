import { BaseRepository } from "../../repository/baseRepository";
import { IUser } from "./classes";
import User from "./model";

class UserRepository extends BaseRepository<IUser> {
    // here, we can create all specific stuffs of Hero Repository
    constructor() {
        super(User);
    }
}
export default UserRepository;