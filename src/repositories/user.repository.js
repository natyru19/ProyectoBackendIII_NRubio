import UserDao from "../dao/user.dao.js";

class UserRepository {

    async getByEmail(email){
        try {
            return await UserDao.findOne({email});
        } catch (error) {
            throw error;
        }
    }

    async createUser(userData){        

        try {
            return await UserDao.save(userData);
        } catch (error) {
            throw error;
        }
    }
}

export default new UserRepository();