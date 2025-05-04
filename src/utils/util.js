import bcrypt from "bcrypt";
import { fakerES, faker } from "@faker-js/faker";


export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password);

export const generateUser = () => {
    return {
        _id: fakerES.database.mongodbObjectId(),
        firstName: fakerES.person.firstName(),
        lastName: fakerES.person.lastName(),
        email: fakerES.internet.email(),
        age: fakerES.number.int({ min: 18, max: 80 }),
        password: createHash("coder123"),
        role: fakerES.helpers.arrayElement(["user", "admin"])     
    }
}

export const generateProduct = ()=>{
    return {
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.number.int().toString(),
        price: faker.number.float({ min: 100, max: 3000, fractionDigits: 2 }),
        status: faker.helpers.arrayElement([true, false]),  
        stock: faker.number.int({ min: 1, max: 100 }),
        category: faker.commerce.department(),
        thumbnails : []
    }
}



