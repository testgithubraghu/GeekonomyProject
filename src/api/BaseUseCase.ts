import { Request, Response } from "express";
import Utility from "../domain/service/Utility";
import { ObjectSchema } from "joi";
import UseCaseInterface from "./UseCaseInterface";
import HttpError from "standard-http-error";
import AuthControlFactory from "../core/authControl/AuthControlFactory";
import UserRepository from "../repositories/userRepository/UserRepository";
import { permissionMessage } from "../domain/constants/messages/failureMessages";
import { RoleEnum } from "../domain/enumerations/RoleEnum";
import { joiReqObjectEnum } from "../domain/enumerations/JioObjectEnum";

abstract class BaseUseCase implements UseCaseInterface {
  public request: Request;
  public response: Response;
  public tokenPayload;
  protected requestBody: any;
  protected pathParams: any;
  protected queryParams: any;

  constructor(request: Request, response: Response) {
    this.request = request;
    this.response = response;
    this.requestBody = request.body;
    this.tokenPayload = {};
  }

  // tslint:disable-next-line: no-empty
  validate(requestType?: string, joiFunction: ObjectSchema<any> = undefined) {
    this.requestBody = Utility.trimInputs(this.request.body);
    this.pathParams = this.request.params;
    this.queryParams = this.request.query;
    let validateReqObj;

    if (requestType === joiReqObjectEnum.REQUEST_BODY) {
      validateReqObj = this.requestBody;
    } else if (requestType === joiReqObjectEnum.REQUEST_PARAMS) {
      validateReqObj = this.pathParams;
    } else if (requestType === joiReqObjectEnum.REQUEST_QUERY) {
      validateReqObj = this.queryParams;
    }
    if (validateReqObj) joiFunction && this.joiValidationUtil(joiFunction, validateReqObj);
  }

  public joiValidationUtil(joiSchema: any, requestData: any) {
    try {
      const options = {
        allowUnknown: true,
      };

      const { error } = joiSchema.validate(requestData, options);
      console.log("error joi ======>", error);
      if (error) {
        throw new HttpError(400, error.details[0].message.replace(/["]/gi, ""));
      }
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }

  abstract execute();

  async authenticate() {
    try {
      // const jwtToken: any = request.headers.authorization || request.headers.jwt;
      let token = this.request.headers.authorization || this.request.headers.jwt  || this.request.headers.Authorization;
      if (!token) {
        throw new HttpError(400, "Authorization token is required");
      }
      let authControl = new AuthControlFactory().create();
      let payload = authControl.decode(token, process.env.JWTSecret);
      this.tokenPayload = payload;
      let id = payload.id;

      if (id == undefined) {
        throw new HttpError(401, permissionMessage.ACCESS_DENIED);
      }

      let repo = new UserRepository();
      let user = await repo.findOne({
        where: {
          id,
        },
        raw: true,
      });

      if (!user) {
        throw new HttpError(401, permissionMessage.ACCESS_DENIED);
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  public async authenticateAdmin() {
    let rootAdmin = await this.authenticate();
    if (rootAdmin.role != Number(RoleEnum.ADMIN)) {
      throw new HttpError(401, permissionMessage.ACCESS_DENIED);
    }
    return rootAdmin;
  }

  public async executeAndHandleErrors(): Promise<any> {
    try {
      let data: any = await this.execute();
      if (data == null) {
        data = {};
      }
      if (data.error) {
        const error = data;
        throw error;
      }
      const code = 200;
      data.code = code;
      this.response.status(code).json(data);
    } catch (error) {
      if (error != null) {
        let message = error.message;
        let code = error.code ? error.code : 400;

        if (error.parent && error.parent.code === "23505") {
          message = "Data already exists";
          code = 409;
        }

        const data = { code, message };
        this.response.status(code >= 100 && code < 600 ? code : 500).json(data);
      } else {
        const data = {
          code: 400,
          message: "Unable to process your request, please try again",
        };
        this.response.status(400).json(data);
      }
    }
  }
}

export default BaseUseCase;
