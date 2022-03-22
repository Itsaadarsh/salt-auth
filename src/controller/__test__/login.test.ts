import request from 'supertest';
import { app } from '../../server';
import { dbConnect, dbDisconnect } from '../../helper/setup';

beforeAll(async () => dbConnect());
afterAll(async () => dbDisconnect());

it('login employee', async () => {
  await request(app).post(`/api/v1/register/`).send({
    empUserName: 'Aadarsh',
    email: 'aadarsh@aadarsh.com',
    password: 'asdasd',
  });

  const response = await request(app).post(`/api/v1/login/`).send({
    empUserName: 'Aadarsh',
    password: 'asdasd',
  });

  expect(response.body.error).toEqual(false);
  expect(response.body.data.token).toBeDefined();
});
