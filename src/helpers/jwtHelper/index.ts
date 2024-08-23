import * as jwt from "jsonwebtoken";
import config from "../../config";
import { Request, Response, NextFunction, response } from "express";
import { ResponseError } from "../../utils/response";

export const createToken = (payload: any) => {
  const expiry: number = 60 * 24 * 60 * 60;
  const expiryStamp: number = Date.now() + expiry * 1000;

  const token = jwt.sign(payload, config.JWTSECRET, {
    algorithm: "HS384",
    expiresIn: expiry,
    issuer: config.ISSUER,
  });
  return { access_token: token, expireOn: expiryStamp };

}

export const decodeToken = async (req: Request, res: Response, callback: NextFunction) => {
  const token = req.header("idToken");

  if (token != "" && token != undefined) {
    try {
      const result: any = await jwt.verify(token, config.JWTSECRET);
      req.user = result;
      callback();
    } catch (error) {
      let response = new ResponseError({
        error: "Authorization failed.",
        message: (error as any).message,
      });
      return res.status(401).json(response);
    }
  } else {
    let response = new ResponseError({
      message: "Authorization failed.",
      error: "'idToken' field is required",
    });
    return res.status(400).json(response);
  }
};