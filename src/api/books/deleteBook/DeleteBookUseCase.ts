import { Request, Response } from "express";
import HttpError from "standard-http-error";
import BookRepository from "../../../repositories/bookRepository/BookRepository";
import BaseUseCase from "../../BaseUseCase";
import deleteBookJoiValidation from "./DeleteBookJoiValidation";
import { successMessages } from "../../../domain/constants/messages/successMessages";
import { failureMessages } from "../../../domain/constants/messages/failureMessages";
import { joiReqObjectEnum } from "../../../domain/enumerations/JioObjectEnum";

class DeleteBookUseCase extends BaseUseCase {
  private bookRepository: BookRepository;
  protected pathParams: RequestModel.DeleteBookPathParams;

  constructor(request: Request, response: Response, bookRepository: BookRepository) {
    super(request, response);
    this.request = request;
    this.response = response;
    this.bookRepository = bookRepository;
  }

  public async execute(): Promise<ResponseModel.DeleteBookResponseWithData> {
    let responseBody: ResponseModel.DeleteBookResponseWithData;
    try {
      await this.authenticateAdmin();
      this.validate(joiReqObjectEnum.REQUEST_PARAMS, deleteBookJoiValidation);

      const bookId = this.pathParams?.id;

      if (!bookId) throw new HttpError(400, failureMessages.INVALID_ID);

      const deleteCount = await this.bookRepository.delete({
        id: bookId,
      });

      if (deleteCount === 0) throw new HttpError(404, failureMessages.RECORD_NOT_FOUND_TO_DELETE);

      responseBody = {
        code: 200,
        message: successMessages.BOOK_DELETED_SUCCESSFULLY,
        data: {
          deleteCount: deleteCount,
        },
      };

      return responseBody;
    } catch (error) {
      throw error;
    }
  }

  public static delete(request: Request, response: Response) {
    const deleteBookUseCase = new DeleteBookUseCase(request, response, new BookRepository());
    return deleteBookUseCase;
  }
}

export default DeleteBookUseCase;
