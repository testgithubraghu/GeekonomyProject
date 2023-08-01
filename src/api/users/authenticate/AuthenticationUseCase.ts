import AuthControlFactory from "../../../core/authControl/AuthControlFactory";
import HashControlFactory from "../../../core/hashControl/HashControlFactory";
import { permissionMessage } from "../../../domain/constants/messages/failureMessages";
import UserRepository from "../../../repositories/userRepository/UserRepository";
import BaseUseCase from "../../BaseUseCase";
import authenticationJoiValidation from "./AuthenticationJoiValidation";
const sequelize = require("sequelize");

class Authenticate extends BaseUseCase {
  private hashControl;
  private authControl;
  private userRepository: UserRepository;
  protected requestBody: RequestModel.Authentication;

  constructor(request, response, hashControl, authControl, userRepository: UserRepository) {
    super(request, response);
    this.hashControl = hashControl;
    this.authControl = authControl;
    this.userRepository = userRepository;
  }

  validate() {
    try {
      super.validate();
      this.requestBody = this.request.body;
      this.joiValidationUtil(authenticationJoiValidation, this.requestBody);
    } catch (error) {
      throw error;
    }
  }

  async execute() {
    try {
      this.validate();
      const body = this.requestBody;
      const { email, password } = body;

      let user;
      if (email) {
        user = await this.userRepository.findOne({
          where: {
            email: sequelize.where(sequelize.fn("LOWER", sequelize.col("email")), email),
          },
          attributes: { exclude: ["createdAt", "updatedAt"] },
          raw: true,
        });

        if (user) {
          let isPasswordMatched = await this.hashControl.compare(password, user.password);

          let date = new Date();

          // generating epoch time in miliseconds
          let issuedAt = Math.floor(+date);
          let expiredAt = date.getTime() + 7 * 24 * 60 * 60 * 1000;

          if (isPasswordMatched) {
            let token = this.authControl.sign(
              {
                id: user.id,
                email: user.email,
                role: user.role,

                issuedAt,
                expiredAt,
              },
              process.env.JWTSecret,
              { expiresIn: process.env.JwtTokenExpiresIn },
            );

            // deleting password from user object
            delete user.password;

            return { code: 200, data: { token, issuedAt, expiredAt, user } };
          } else {
            throw new Error(permissionMessage.INVALID_CREDENTIALS);
          }
        } else {
          throw new Error(permissionMessage.USER_NOT_FOUND);
        }
      }
    } catch (error) {
      throw error;
    }
  }

  static create(request, response) {
    const hashControlFactory = new HashControlFactory();
    const hashControl = hashControlFactory.create();
    const authControlFactory = new AuthControlFactory();
    const authControl = authControlFactory.create();
    const useCase = new Authenticate(request, response, hashControl, authControl, new UserRepository());
    return useCase;
  }
}

export default Authenticate;
