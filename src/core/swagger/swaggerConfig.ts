import * as dotenv from "dotenv";
dotenv.config();
import authentication from "../../swagger/user/AuthenticationSwagger";
import createBook from "../../swagger/books/CreateBookSwagger";
import deleteBook from "../../swagger/books/DeleteBookSwagger";
import getAllBooks from "../../swagger/books/GetAllBooksSwagger";
import getBook from "../../swagger/books/GetBookSwagger";
import updateBook from "../../swagger/books/UpdateBookSwagger";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Geekonomy Project API Documentation",
      version: "1.0.0",
      description: "Geekonomy project API Management",
    },
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    components: {
      securitySchemes: {
        jwt: {
          type: "http",
          scheme: "bearer",
          in: "header",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        jwt: [],
      },
    ],
    servers: [
      {
        url: "http://localhost:" + process.env.port,
        description: "Local server",
      },
    ],
    paths: {
      "/geekonomy-project/authenticate": {
        post: authentication,
      },
      "/geekonomy-project/api/books": {
        get: getAllBooks,
      },
      "/geekonomy-project/api/book": {
        post: createBook,
      },
      "/geekonomy-project/api/book/{id}": {
        get: getBook,
        put: updateBook,
        delete: deleteBook,
      },
    },
  },
  apis: ["./src/app.ts", "./src/api/*/*.ts"],
};

export default swaggerOptions;
