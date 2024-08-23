import { Router, Request, Response, NextFunction } from "express";
import { login } from "./controller";

const router = Router();

router.get("/", login)
export default router;