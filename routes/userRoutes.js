import express from "express";
import * as userController from "../controllers/userController";



const userRouter = express.Router();

userRouter.route("/signup").post(userController.signUp);

export { userRouter };
