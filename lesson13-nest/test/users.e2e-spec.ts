import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { DataSource } from 'typeorm';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    dataSource = moduleFixture.get('DATA_SOURCE') as DataSource;
    await dataSource.query('DELETE FROM USERS');
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it('POST /api/v1/users', async () => {
    return await request(app.getHttpServer())
      .post('/api/v1/users')
      .send({
        name: 'test',
        age: 20,
        email: 'test@test.com',
        passwordHash: '',
        salary: 123,
      })
      .expect(201);
  });

  it('GET /api/v1/users', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/v1/users')
      .expect(200);

    const body = res.body;

    const expected = [
      {
        id: body[0].id,
        name: 'test',
        age: 20,
        email: 'test@test.com',
        passwordHash: '',
        salary: 123,
      },
    ];
    expect(body).toStrictEqual(expected);
  });
});
