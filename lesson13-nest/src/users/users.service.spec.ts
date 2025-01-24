import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    })
      .useMocker((token) => {
        const testUser = {
          name: 'test_user',
          age: 20,
          email: 'test@test.com',
        };
        const testUsers = [testUser];

        if (token === 'USERS_REPOSITORY') {
          return {
            find: jest.fn().mockResolvedValue(testUsers),
            findOneBy: jest.fn().mockResolvedValue(testUser),
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

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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

      expect(await service.findAll()).toStrictEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const result = {
        name: 'test_user',
        age: 20,
        email: 'test@test.com',
      };

      expect(await service.findOne(0)).toStrictEqual(result);
    });
  });
});
