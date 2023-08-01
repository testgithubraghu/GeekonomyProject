const authentication = {
  tags: ["Authentication"],
  summary: "Generate login token for a user.",
  description:
    "Produce a login token for a user. Your password must be at least 8 characters long, include at least one number, one special character, and include a mix of uppercase and lowercase letters.",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          example: {
            email: "hnraghavendra806@gmail.com",
            password: "ProjectGeekonomy@123",
          },
        },
      },
    },
  },

  produces: ["application/json"],
  parameters: [],
  responses: {
    "200": {
      description: "Fetching user with an id",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              code: 200,
              data: {
                token:
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiYmFkZGFiYjUtMDYzZC00MDAxLWI0ZmYtMDc3MWJiMDI1MDAxIiwiZW1haWwiOiJobnJhZ2hhdmVuZHJhODA2QGdtYWlsLmNvbSIsInJvbGUiOiIxMDAxIiwiaXNzdWVkQXQiOjE2OTA3NTk3MjcwNDIsImV4cGlyZWRBdCI6MTY5MTM2NDUyNzA0Mn0sImlhdCI6MTY5MDc1OTcyNywiZXhwIjoxNjkxMzY0NTI3fQ.oDwOcR6UIw4ZiKAH-6BeHAL-HeM_rdT8wIpVmjMlPAA",
                issuedAt: 1690759727042,
                expiredAt: 1691364527042,
                user: {
                  id: "baddabb5-063d-4001-b4ff-0771bb025001",
                  name: "raghavendra",
                  email: "hnraghavendra806@gmail.com",
                  role: "1001",
                },
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
              message: "The password must be at least 8 characters long.",
            },
          },
        },
      },
    },
  },
};

export default authentication;
