declare namespace RequestModel {
  interface CreateBook {
    name: string;
    author: string;
    description: string;
    publicationYear: string;
  }

  interface GetBookPathParams {
    id: string;
  }

  interface DeleteBookPathParams {
    id: string;
  }

  interface UpdateBook {
    name: string;
    author: string;
    description: string;
    publicationYear: string;
  }
  interface UpdateBookPathParams {
    id: string;
  }

  interface Authentication {
    email: string;
    password: string;
  }
}
