const updateBook = {
  tags: ["Books"],
  summary: "Only admin can use this API to update a specific book.",
  description: "Update a particular book.",
  produces: ["application/json"],
  parameters: [
    {
      title: "jwt",
      in: "header",
      type: "string",
      required: true,
      description: "token to be passed as a header",
    },
    {
      title: "id",
      in: "path",
      description: "enter bookId, which needs to be Update",
      required: true,
      type: "string",
    },
  ],

  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            book: {
              type: "object",
              example: {
                title: "Start with Why: How to Great Leaders Inspire Everyone to Take Action",
                author: "Simon Sinek katich",
                description:
                  "he book starts with comparing the two main ways to influence human behaviour: manipulation and inspiration. Sinek argues that inspiration is the more powerful and sustainable of the two.",
                publicationYear: "2019/10/24",
              },
            },
          },
        },
      },
    },
  },

  responses: {
    "200": {
      description: "Success Ressponse",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              code: 200,
              message: "book updated successfully",
              data: {
                id: "49c32096-a0e9-41a2-bd64-be531f86a3a6",
                title: "Start with Why: How to Great Leaders Inspire Everyone to Take Action",
                author: "Simon Sinek katich",
                description:
                  "he book starts with comparing the two main ways to influence human behaviour: manipulation and inspiration. Sinek argues that inspiration is the more powerful and sustainable of the two.",
                publicationYear: "2019-10-24",
                createdAt: "2023-07-30T22:54:47.985Z",
                updatedAt: "2023-07-30T23:22:37.949Z",
              },
            },
          },
        },
      },
    },
    "400": {
      description: "error response",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              code: 400,
              message: "Record not found to update",
            },
          },
        },
      },
    },
  },
};

export default updateBook;
