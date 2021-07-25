import { UpdateResult } from 'typeorm';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../entities/User';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>
  updatePassword(password: string, user_id: string): Promise<UpdateResult>
  findByEmail(email: string): Promise<User>
  findById(id: string): Promise<User>
  list(): Promise<User[]>
  deleteById(id: string): Promise<void>
  updateName(id: string, name: string): Promise<UpdateResult>
}

export { IUsersRepository };