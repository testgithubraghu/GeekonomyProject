const getBook = {
  tags: ["Books"],
  summary: "Get a particular book, this api can be accessed only by admins",
  description: "Get a particular book.",
  produces: ["application/json"],
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
      description: "enter  bookId to get a particular book ",
      required: true,
      type: "string",
      example: "c3a0f04e-27d4-4826-bc0f-e5a93538f547",
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
              message: "Book fetched successfully",
              data: {
                id: "49c32096-a0e9-41a2-bd64-be531f86a3a6",
                title: "The Hard Thing About Hard Things",
                author: "Benjamin Abraham Horowitz",
                description:
                  "The hard thing isn't hiring great people. The hard thing is when those “great people” develop a sense of entitlement and start demanding unreasonable things.",
                publicationYear: "2014-03-04",
                createdAt: "2023-07-30T22:54:47.985Z",
                updatedAt: "2023-07-30T22:54:48.098Z",
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

export default getBook;
