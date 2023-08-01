const createBook = {
  tags: ["Books"],
  summary: "Create a Book; only admins have access to this api.",
  description: "createBook",
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
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          example: {
            title: "The Hard Thing About Hard Things",
            author: "Benjamin Abraham Horowitz",
            description:
              "The hard thing isn't hiring great people. The hard thing is when those “great people” develop a sense of entitlement and start demanding unreasonable things.",
            publicationYear: "2014/03/04",
          },
        },
      },
    },
  },
  responses: {
    "200": {
      description: "Success Response",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              code: 200,
              message: "book successfully created ",
              data: {
                code: 200,
                message: "book created successfully",
                data: {
                  createdAt: "2023-07-30T22:54:47.985Z",
                  updatedAt: "2023-07-30T22:54:48.098Z",
                  id: "49c32096-a0e9-41a2-bd64-be531f86a3a6",
                  title: "The Hard Thing About Hard Things",
                  author: "Benjamin Abraham Horowitz",
                  description:
                    "The hard thing isn't hiring great people. The hard thing is when those “great people” develop a sense of entitlement and start demanding unreasonable things.",
                  publicationYear: "2014-03-04",
                },
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
              code: 403,
              message: "Data already exists",
            },
          },
        },
      },
    },
  },
};

export default createBook;
