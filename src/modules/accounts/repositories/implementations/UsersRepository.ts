import { getRepository, Repository, UpdateResult } from 'typeorm';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }
  
  async create({ name, password, email }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({ 
      name,
      password,
      email
    });
    
    await this.repository.save(user);
  }
  
  async updatePassword(password: string, user_id: string): Promise<UpdateResult> {

    const user = await this.repository.update({id: user_id}, {password});
    
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }
  
  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);
    return user;
  }
}

export { UsersRepository };