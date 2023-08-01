import express, { Request, Response } from "express";
import UrlConstants from "../../domain/constants/urlConstants/UrlConstants";
import CreateBookUseCase from "./createBook/CreateBookUseCase";
import DeleteBookUseCase from "./deleteBook/DeleteBookUseCase";
import GetAllBooksUseCase from "./getAllBooks/GetAllBooksUseCase";
import GetBookUseCase from "./getBook/GetBookUseCase";
import UpdateBookUseCase from "./updateBook/UpdateBookUseCase";

const router = express.Router();

router.post(`${UrlConstants.bookEndpoint.createBook}`, async (request: Request, response: Response) => {
  const createBookUseCase = CreateBookUseCase.create(request, response);
  await createBookUseCase.executeAndHandleErrors();
});

router.delete(`${UrlConstants.bookEndpoint.deleteBook}`, async (request: Request, response: Response) => {
  const deleteBookUseCase = DeleteBookUseCase.delete(request, response);
  await deleteBookUseCase.executeAndHandleErrors();
});

router.get(`${UrlConstants.bookEndpoint.getAllBooks}`, async (request: Request, response: Response) => {
  const getAllBooksUseCase = GetAllBooksUseCase.get(request, response);
  await getAllBooksUseCase.executeAndHandleErrors();
});

router.get(`${UrlConstants.bookEndpoint.getBook}`, async (request: Request, response: Response) => {
  const getBookUseCase = GetBookUseCase.get(request, response);
  await getBookUseCase.executeAndHandleErrors();
});

router.put(`${UrlConstants.bookEndpoint.updateBook}`, async (request: Request, response: Response) => {
  const updateBookUseCase = UpdateBookUseCase.update(request, response);
  await updateBookUseCase.executeAndHandleErrors();
});

export default router;
