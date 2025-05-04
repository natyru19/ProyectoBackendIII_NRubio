import UsersModel from "../models/user.model.js";
import { createHash } from "../../utils/util.js";

class UsersManager {
  async getByEmail(email) {
    try {
      const user = await UsersModel.findOne({ email: email }).lean();
      return user;
    } catch (error) {
      throw error;
    }
  }

  async createUser(userData) {
    try {
      const newUser = await UsersModel.create({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        age: userData.age,
        password: createHash(userData.password),
        cart: userData.cart,
        role: userData.role,
      });
      return newUser;
    } catch (error) {
      throw error;
    }
  }
}

export default UsersManager;
