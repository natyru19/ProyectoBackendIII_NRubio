import bcrypt from "bcrypt";
import { fakerES } from "@faker-js/faker";


export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password);

const generateUsers = () => {
    return {
        id: fakerES.database.mongodbObjectId(),
        firstName: fakerES.person.firstName(),
        lastName: fakerES.person.lastName(),
        email: fakerES.internet.email(),
        age: fakerES.number.int({ min: 18, max: 80 }),
        password: createHash("coder123"),
        products: [],
        role: fakerES.helpers.arrayElement(["user", "admin"])     
    }
}

export default generateUsers;



