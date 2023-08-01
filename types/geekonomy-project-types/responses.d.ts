declare namespace ResponseModel {
  interface Response {
    code: number;
    message: string;
  }

  interface CreateBookResponseWithData extends Response {
    data: [];
  }
  interface GetAllBooksResponseWithData extends Response {
    data: [{}];
  }

  interface GetBookResponseWithData extends Response {
    data: {
      book: object;
    };
  }

  interface UpdateBookResponseWithData extends Response {
    data: [];
  }

  interface DeleteBookResponseWithData extends Response {
    message: string;
    data: {
      deleteCount: number;
    };
  }
}
