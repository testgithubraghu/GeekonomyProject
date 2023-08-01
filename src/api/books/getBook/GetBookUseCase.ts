import { Request, Response } from "express";
import HttpError from "standard-http-error";
import BookRepository from "../../../repositories/bookRepository/BookRepository";
import BaseUseCase from "../../BaseUseCase";
import { successMessages } from "../../../domain/constants/messages/successMessages";
import { failureMessages } from "../../../domain/constants/messages/failureMessages";

class GetBookUseCase extends BaseUseCase {
  private bookRepository: BookRepository;
  protected pathParams: RequestModel.GetBookPathParams;

  constructor(request: Request, response: Response, bookRepository: BookRepository) {
    super(request, response);
    this.request = request;
    this.response = response;
    this.bookRepository = bookRepository;
  }

  public async execute(): Promise<ResponseModel.GetBookResponseWithData> {
    let responseBody: ResponseModel.GetBookResponseWithData;

    try {
      await this.authenticateAdmin();
      this.validate();

      let book = await this.bookRepository.findOne({
        where: {
          id: this.pathParams.id,
        },
      });

      if (!book) throw new HttpError(400, failureMessages.RECORD_NOT_FOUND);

      responseBody = {
        code: 200,
        message: successMessages.BOOK_FETCHED_SUCCESSFULLY,
        data: book,
      };

      return responseBody;
    } catch (error) {
      throw error;
    }
  }

  public static get(request: Request, response: Response) {
    const getBookUseCase = new GetBookUseCase(request, response, new BookRepository());
    return getBookUseCase;
  }
}

export default GetBookUseCase;
