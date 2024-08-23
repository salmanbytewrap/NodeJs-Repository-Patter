import { Router } from "express";
import userRouter from "../components/user/router";
import loginRouter from "../components/login/router";

const router=Router();

router.use("/user",userRouter)
router.use("/login", loginRouter)
export default router;