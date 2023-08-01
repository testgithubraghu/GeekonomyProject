const getAllBooks = {
  tags: ["Books"],
  summary: "Get all books, this api can be accessed only by admins",
  description: "Get all books",
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
      name: "index",
      in: "query",
      type: "string",
      required: false,
      description: "please enter page index as query to fetch list of books",
    },
    {
      name: "size",
      in: "query",
      type: "string",
      required: false,
      description: "please enter page size as query to fetch list of books",
    },
    {
      name: "searchKey",
      in: "query",
      type: "string",
      required: false,
      description:
        "Please enter the search key as a query to retrieve a list of books that match the searchKey in terms of title, author, and description.",
    },
    {
      name: "sortingKey",
      in: "query",
      type: "string",
      required: false,
      description:
        "Please enter a sorting key as a query to retrieve a list of books based on a specific key, such as title, author, or description.",
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
              message: "book fetched successfully",
              data: [
                {
                  id: "49c32096-a0e9-41a2-bd64-be531f86a3a6",
                  title: "The Hard Thing About Hard Things",
                  author: "Benjamin Abraham Horowitz",
                  description:
                    "The hard thing isn't hiring great people. The hard thing is when those “great people” develop a sense of entitlement and start demanding unreasonable things.",
                  publicationYear: "2014-03-04",
                  createdAt: "2023-07-30T22:54:47.985Z",
                  updatedAt: "2023-07-30T22:54:48.098Z",
                },
                {
                  id: "43cce8b9-bf1d-4fd3-a255-645a573b2355",
                  title: "Start with Why: How Great Leaders Inspire Everyone to Take Action",
                  author: "Simon Sinek",
                  description:
                    "he book starts with comparing the two main ways to influence human behaviour: manipulation and inspiration. Sinek argues that inspiration is the more powerful and sustainable of the two.",
                  publicationYear: "2009-12-04",
                  createdAt: "2023-07-30T23:04:07.560Z",
                  updatedAt: "2023-07-30T23:04:07.677Z",
                },
              ],
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
              message: "could not fetch",
            },
          },
        },
      },
    },
  },
};

export default getAllBooks;
