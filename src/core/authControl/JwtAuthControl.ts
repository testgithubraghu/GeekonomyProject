import jwt from "jsonwebtoken";
import HttpError from "standard-http-error";
import AuthControlInterface from "./AuthControlInterface";
export default class JwtAuthControl implements AuthControlInterface {
  public sign(valueToEncode, secret, options = null) {
    try {
      let token = jwt.sign({ payload: valueToEncode }, secret, options);

      return token;
    } catch (error) {
      throw new HttpError(500, "InternalServerError");
    }
  }

  public decode(verifyToken, secret) {
    try {
      const decoded = jwt.verify(verifyToken, secret);
      return decoded.payload;
    } catch (error) {
      throw new HttpError(401, "Unauthorized");
    }
  }

  public decodeRequestHeader(req, secret) {
    try {
      let token = req.headers.jwt;
      return this.decode(token, secret);
    } catch (error) {
      throw new HttpError(401, "Unauthorized");
    }
  }
}
