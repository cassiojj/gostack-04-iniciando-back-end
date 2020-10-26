import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('shold be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndow@example.com',
      password: '121212',
    });

    expect(user).toHaveProperty('id');
  });

  it('shold not be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndow@example.com',
      password: '121212',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndow@example.com',
        password: '121212',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
