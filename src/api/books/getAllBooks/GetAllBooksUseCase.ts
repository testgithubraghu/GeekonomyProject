import { Request, Response } from "express";
import BookRepository from "../../../repositories/bookRepository/BookRepository";
import BaseUseCase from "../../BaseUseCase";
import { successMessages } from "../../../domain/constants/messages/successMessages";
import { Op } from "sequelize";
import PaginationService from "../../../domain/service/PaginationService";

class GetAllBooksUseCase extends BaseUseCase {
  private bookRepository: BookRepository;

  constructor(request: Request, response: Response, bookRepository: BookRepository) {
    super(request, response);
    this.request = request;
    this.response = response;
    this.bookRepository = bookRepository;
  }

  public async execute(): Promise<ResponseModel.GetAllBooksResponseWithData> {
    let responseBody: ResponseModel.GetAllBooksResponseWithData;

    try {
      await this.authenticateAdmin();

      let { searchKey, index, size, sortingKey, sortingPriority } = this.request.query;

      const searchQuery = this.getSearchQuery(searchKey);
      let searchQueries = searchKey ? { [Op.or]: searchQuery } : {};
      const { paginate, pageSize, pageIndex } = PaginationService.generatePaginationQuery(size, index, searchKey);
      let books = await this.bookRepository.findAll({
        where: { ...searchQueries },
        distinct: true,
        ...paginate,
      });

      if (!books) books = [];
      responseBody = {
        code: 200,
        message: successMessages.BOOKS_FETCHED_SUCCESSFULLY,
        data: books,
        ...paginate,
      };
      return responseBody;
    } catch (error) {
      throw error;
    }
  }

  public getSearchQuery(searchKey) {
    const searchQuery = { [Op.iLike]: "%" + searchKey + "%" };
    const queries: any[] = [{ title: searchQuery }, { author: searchQuery }, { description: searchQuery }];
    return queries;
  }

  public static get(request: Request, response: Response) {
    const getAllBookUseCase = new GetAllBooksUseCase(request, response, new BookRepository());
    return getAllBookUseCase;
  }
}

export default GetAllBooksUseCase;
