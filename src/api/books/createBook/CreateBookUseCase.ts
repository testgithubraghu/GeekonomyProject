import { Request, Response } from "express";
import BookRepository from "../../../repositories/bookRepository/BookRepository";
import BaseUseCase from "../../BaseUseCase";
import createBookJoiValidation from "./CreateBookJoiValidation";
import { successMessages } from "../../../domain/constants/messages/successMessages";
import { joiReqObjectEnum } from "../../../domain/enumerations/JioObjectEnum";

class CreateBookUseCase extends BaseUseCase {
  private bookRepository: BookRepository;
  protected requestBody: RequestModel.CreateBook;

  constructor(request: Request, response: Response, bookRepository: BookRepository) {
    super(request, response);
    this.request = request;
    this.response = response;
    this.bookRepository = bookRepository;
  }

  public async execute(): Promise<ResponseModel.CreateBookResponseWithData> {
    let responseBody: ResponseModel.CreateBookResponseWithData;

    try {
      await this.authenticateAdmin();
      this.validate(joiReqObjectEnum.REQUEST_BODY, createBookJoiValidation);
      let book = await this.bookRepository.add(this.requestBody);

      responseBody = {
        code: 200,
        message: successMessages.BOOK_CREATED_SUCCESSFULLY,
        data: book,
      };
      return responseBody;
    } catch (error) {
      throw error;
    }
  }

  public static create(request: Request, response: Response) {
    const createBookUseCase = new CreateBookUseCase(request, response, new BookRepository());
    return createBookUseCase;
  }
}

export default CreateBookUseCase;
