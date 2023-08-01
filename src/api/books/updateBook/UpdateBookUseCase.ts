import { Request, Response } from "express";
import { successMessages } from "../../../domain/constants/messages/successMessages";
import BookRepository from "../../../repositories/bookRepository/BookRepository";
import BaseUseCase from "../../BaseUseCase";
import updateBookJoiValidation from "./UpdateBookJoiValidation";
import { joiReqObjectEnum } from "../../../domain/enumerations/JioObjectEnum";

class UpdateBookUseCase extends BaseUseCase {
  private bookRepository: BookRepository;
  protected requestBody: RequestModel.UpdateBook;
  protected pathParams: RequestModel.UpdateBookPathParams;

  constructor(request: Request, response: Response, bookRepository: BookRepository) {
    super(request, response);
    this.request = request;
    this.response = response;
    this.bookRepository = bookRepository;
  }

  public async execute(): Promise<ResponseModel.UpdateBookResponseWithData> {
    let responseBody: ResponseModel.UpdateBookResponseWithData;

    try {
      await this.authenticateAdmin();
      this.validate(joiReqObjectEnum.REQUEST_BODY, updateBookJoiValidation);
      const bookId = this.request.params.id;
      let updatedBook = await this.bookRepository.findAndUpdate(this.requestBody, {
        id: bookId,
      });

      responseBody = {
        code: 200,
        message: successMessages.BOOK_UPDATED_SUCCESSFULLY,
        data: updatedBook,
      };

      return responseBody;
    } catch (error) {
      throw error;
    }
  }

  public static update(request: any, response: any) {
    const updateBookUseCase = new UpdateBookUseCase(request, response, new BookRepository());
    return updateBookUseCase;
  }
}
export default UpdateBookUseCase;
