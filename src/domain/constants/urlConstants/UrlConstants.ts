const UrlConstants = {
  baseEndpoint: "/geekonomy-project",
  swaggerEndpoint: "/api-docs",
  userEndpoint: {
    authenticate: "/authenticate",
  },
  bookEndpoint: {
    createBook: "/api/book",
    getBook: "/api/book/:id",
    getAllBooks: "/api/books",
    updateBook: "/api/book/:id",
    deleteBook: "/api/book/:id",
  },
};
export default UrlConstants;
