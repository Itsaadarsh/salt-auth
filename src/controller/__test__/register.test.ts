import request from 'supertest';
import { app } from '../../server';
import { dbConnect, dbDisconnect } from '../../helper/setup';

beforeAll(async () => dbConnect());
afterAll(async () => dbDisconnect());

it('insert employee', async () => {
  const response = await request(app).post(`/api/v1/register/`).send({
    empUserName: 'Aadarsh',
    email: 'aadarsh@aadarsh.com',
    password: 'asdasd',
  });
  expect(response.body.error).toEqual(false);
  expect(response.body.data.message.length).toEqual(1);
});
