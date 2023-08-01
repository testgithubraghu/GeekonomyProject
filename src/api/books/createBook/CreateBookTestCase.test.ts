const request = require('supertest');
import * as dotenv from 'dotenv';
dotenv.config();
import app from '../../../..';
import UrlConstants from '../../../domain/constants/urlConstants/UrlConstants';
import ErrorUtility from '../../../domain/service/ErrorJoiUtility';
const jwt = process.env.token;

describe('Geekonomy-Project: Test cases for creating book', () => {
  test('1. test case without jwt token', async () => {
    const res = await request(app).post(`${UrlConstants.baseEndpoint}${UrlConstants.bookEndpoint.createBook}`).send();
    expect(res.body.code).toBe(400);
    expect(res.body.message).toBe('Authorization token is required');
  });

  it('2. test case for empty request body', async () => {
    const res = await request(app)
      .post(`${UrlConstants.baseEndpoint}${UrlConstants.bookEndpoint.createBook}`)
      .set({ jwt })
      .send({});
    expect(res.body.code).toBe(400);
    expect(res.body.message).toBe(ErrorUtility.requiredMsg('title'));
  });

  test('3. test case with title as empty string', async () => {
    const res = await request(app)
      .post(`${UrlConstants.baseEndpoint}${UrlConstants.bookEndpoint.createBook}`)
      .set({ jwt })
      .send({
        title: '',
      });
    expect(res.body.code).toEqual(400);
    expect(res.body.message).toBe(ErrorUtility.emptyMsg('title'));
  });

  test('4. test case with title as empty object', async () => {
    const res = await request(app)
      .post(`${UrlConstants.baseEndpoint}${UrlConstants.bookEndpoint.createBook}`)
      .set({ jwt })
      .send({
        title: {},
      });
    expect(res.body.code).toBe(400);
    expect(res.body.message).toBe(ErrorUtility.typeMsg("title", "string"));
  });

  test('5. test case with valid title and without remaining attributes', async () => {
    const res = await request(app)
      .post(`${UrlConstants.baseEndpoint}${UrlConstants.bookEndpoint.createBook}`)
      .set({ jwt })
      .send({
        title: 'Start with Why: How to Great Leaders Inspire Everyone to Take Action',
      });
    expect(res.body.code).toBe(400);
    expect(res.body.message).toBe(ErrorUtility.requiredMsg('author'));
  });

  test('6. test case with valid title and author as empty string', async () => {
    const res = await request(app)
      .post(`${UrlConstants.baseEndpoint}${UrlConstants.bookEndpoint.createBook}`)
      .set({ jwt })
      .send({
        title: 'Start with Why: How to Great Leaders Inspire Everyone to Take Action',
        author: '',
      });
    expect(res.body.code).toBe(400);
    expect(res.body.message).toBe(ErrorUtility.emptyMsg('author'));
  });

  test('7. test case with valid title and author as empty object', async () => {
    const res = await request(app)
      .post(`${UrlConstants.baseEndpoint}${UrlConstants.bookEndpoint.createBook}`)
      .set({ jwt })
      .send({ title: 'Start with Why: How to Great Leaders Inspire Everyone to Take Action', author: {} });
    expect(res.body.code).toBe(400);
    expect(res.body.message).toBe(ErrorUtility.typeMsg("author", "string"));
  });

  test('8. test case with valid title, author and without remaining attributes', async () => {
    const res = await request(app)
      .post(`${UrlConstants.baseEndpoint}${UrlConstants.bookEndpoint.createBook}`)
      .set({ jwt })
      .send({
        title: 'Start with Why: How to Great Leaders Inspire Everyone to Take Action',
        author: 'Simon Sinek katich',
      });
    expect(res.body.code).toBe(400);
    expect(res.body.message).toBe(ErrorUtility.requiredMsg('description'));
  });

  test('9. test case with valid title, author and description as empty string', async () => {
    const res = await request(app)
      .post(`${UrlConstants.baseEndpoint}${UrlConstants.bookEndpoint.createBook}`)
      .set({ jwt })
      .send({
        title: 'Start with Why: How to Great Leaders Inspire Everyone to Take Action',
        author: 'Simon Sinek katich',
        description: '',
      });
    expect(res.body.code).toBe(400);
    expect(res.body.message).toBe(ErrorUtility.emptyMsg('description'));
  });

  test('10. test case with valid title and author and description as empty object', async () => {
    const res = await request(app)
      .post(`${UrlConstants.baseEndpoint}${UrlConstants.bookEndpoint.createBook}`)
      .set({ jwt })
      .send({
        title: 'Start with Why: How to Great Leaders Inspire Everyone to Take Action',
        author: 'Simon Sinek katich',
        description: {},
      });
    expect(res.body.code).toBe(400);
    expect(res.body.message).toBe(ErrorUtility.typeMsg("description", "string"));
  });

  test('11. test case with valid title, author, description and without publicationYear ', async () => {
    const res = await request(app)
      .post(`${UrlConstants.baseEndpoint}${UrlConstants.bookEndpoint.createBook}`)
      .set({ jwt })
      .send({
        title: 'Start with Why: How to Great Leaders Inspire Everyone to Take Action',
        author: 'Simon Sinek katich',
        description:
          'he book starts with comparing the two main ways to influence human behaviour: manipulation and inspiration. Sinek argues that inspiration is the more powerful and sustainable of the two.',
      });
    expect(res.body.code).toBe(400);
    expect(res.body.message).toBe(ErrorUtility.requiredMsg('publicationYear'));
  });

  test('12. test case with valid title, author, description and with publicationYear as empty string', async () => {
    const res = await request(app)
      .post(`${UrlConstants.baseEndpoint}${UrlConstants.bookEndpoint.createBook}`)
      .set({ jwt })
      .send({
        title: 'Start with Why: How to Great Leaders Inspire Everyone to Take Action',
        author: 'Simon Sinek katich',
        description:
          'he book starts with comparing the two main ways to influence human behaviour: manipulation and inspiration. Sinek argues that inspiration is the more powerful and sustainable of the two.',
        publicationYear: '',
      });
    expect(res.body.code).toBe(400);
    expect(res.body.message).toBe(ErrorUtility.emptyMsg('publicationYear'));
  });

  test('13. test case with valid title, author, description and with publicationYear as empty object', async () => {
    const res = await request(app)
      .post(`${UrlConstants.baseEndpoint}${UrlConstants.bookEndpoint.createBook}`)
      .set({ jwt })
      .send({
        title: 'Start with Why: How to Great Leaders Inspire Everyone to Take Action',
        author: 'Simon Sinek katich',
        description:
          'he book starts with comparing the two main ways to influence human behaviour: manipulation and inspiration. Sinek argues that inspiration is the more powerful and sustainable of the two.',
        publicationYear: {},
      });
    expect(res.body.code).toBe(400);
    expect(res.body.message).toBe(ErrorUtility.typeMsg("publicationYear", "string"));
  });


});
