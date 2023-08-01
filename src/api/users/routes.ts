import express, { Request, Response } from "express";
import UrlConstants from "../../domain/constants/urlConstants/UrlConstants";
import AuthenticationUseCase from "./authenticate/AuthenticationUseCase";

const router = express.Router();

router.post(UrlConstants.userEndpoint.authenticate, async (request: any, response: any) => {
  const useCase = AuthenticationUseCase.create(request, response);
  await useCase.executeAndHandleErrors();
});

export default router;
