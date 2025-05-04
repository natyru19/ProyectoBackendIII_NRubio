import { Router } from 'express';
import generateUsers from '../utils/util.js';

const mocksRouter = Router();

mocksRouter.get("/mockingProducts", (req, res) => {

});

mocksRouter.get("/mockingUsers", (req, res) => {
    const { qtyUsers } = req.query;
    const users = [];

    for(let i=0; i<qtyUsers; i++){
        users.push(generateUsers(qtyUsers));
    }

    return res.status(200).json({status: "success", data: users});
});

mocksRouter.post("/generateData", (req, res) => {

});

export default mocksRouter;