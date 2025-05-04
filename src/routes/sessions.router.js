import { Router } from "express";
import passport from "passport";
import UserController from "../controllers/user.controller.js";

const sessionsRouter = Router();
const userController = new UserController();

sessionsRouter.post("/register", userController.register);
sessionsRouter.post("/login", userController.login);
sessionsRouter.post("/logout", userController.logout);
sessionsRouter.get("/current", passport.authenticate("current", { session: false }), userController.current);

export default sessionsRouter;
