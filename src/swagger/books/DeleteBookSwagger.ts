const deleteBook = {
  tags: ["Books"],
  summary: "Delete a specific Book; only admins have access to this api.",
  description: "here book can deleted by Id",
  produces: ["application/json"],
  security: [
    {
      jwt: [],
    },
  ],
  parameters: [
    {
      name: "jwt",
      in: "header",
      type: "string",
      required: true,
      description: "token to be passed as a header",
    },
    {
      name: "id",
      in: "path",
      description: "bookId, which needs to be delete",
      required: true,
      type: "string",
      example: 1,
    },
  ],
  responses: {
    "200": {
      description: "Success Response",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              code: 200,
              message: "book deleted successfully",
              data: {
                deleteCount: 1,
              },
            },
          },
        },
      },
    },
    "400": {
      description: "Error Response",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              code: 400,
              message: "invalid bookId",
            },
          },
        },
      },
    },
  },
};

export default deleteBook;
