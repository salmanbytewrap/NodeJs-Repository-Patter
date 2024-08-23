import { Router, Request, Response, NextFunction } from "express";
// import { getUserById, createUser } from "./controller";
import { decodeToken } from "../../helpers/jwtHelper";
import UserController from "./controller";

const userController = new UserController();

const router = Router();

router.post("/", userController.createUser);
router.get("/", decodeToken, userController.getUserById);
export default router;