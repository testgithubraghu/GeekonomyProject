import * as bcrypt from "bcryptjs";
import HttpError from "standard-http-error";
import HashControlInterface from "./HashControlInterface";
class BcryptHashControl implements HashControlInterface {
  public async hash(password: string) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (error) {
      throw new HttpError(500, "InternalServerError");
    }
  }

  public async compare(candidatePassword: string, hashedPassword: string) {
    try {
      const comparisionResult = await bcrypt.compare(
        candidatePassword,
        hashedPassword
      );
      return comparisionResult;
    } catch (error) {
      return false;
    }
  }
}
export default new BcryptHashControl();
