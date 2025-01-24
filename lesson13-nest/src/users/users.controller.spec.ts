import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const moduleMocker = new ModuleMocker(global);

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    })
      .useMocker((token) => {
        const testUser = {
          name: 'test_user',
          age: 20,
          email: 'test@test.com',
        };
        const testUsers = [testUser];

        if (token === UsersService) {
          return {
            findAll: jest.fn().mockResolvedValue(testUsers),
            findOne: jest.fn().mockResolvedValue(testUser),
          };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [
        {
          name: 'test_user',
          age: 20,
          email: 'test@test.com',
        },
      ];

      expect(await controller.findAll()).toStrictEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const result = {
        name: 'test_user',
        age: 20,
        email: 'test@test.com',
      };

      expect(await controller.findOne('0')).toStrictEqual(result);
    });
  });
});
