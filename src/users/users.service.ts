import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './users.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  private nextId = 3
  private readonly users: User[] = [
    {
      id: 1,
      name: 'name',
      email: 'somename1@empl.tech',
      password: '12345678',
      birthday: new Date(),
      role: 'admin',
    },
    {
      id: 2,
      name: 'some name 2',
      email: 'somename2@empl.tech',
      password: '12345678',
      birthday: new Date(),
      role: 'employee',
    },
  ]

  create(user: Pick<User, 'name' | 'birthday' | 'email' | 'password'>) {
    const newUser = this.usersRepository.create()

    newUser.name = user.name
    newUser.birthday = user.birthday
    newUser.password = user.password
    newUser.role = 'employee'
    newUser.email = user.email

    this.usersRepository.save(newUser)
    // this.users.push({
    //   ...user,
    //   id: this.nextId++,
    //   email: '',
    //   password: '',
    //   role: 'employee',
    // })
  }

  async findAll(): Promise<User[]> {
    const users = this.usersRepository.find() // this.users

    console.log('all users', users)

    return users
  }

  findOne(id: number): User {
    return this.users.find((item) => item.id === id)
  }

  async findOneByUsernameOrEmail(
    usernameOrEmail: string,
  ): Promise<User | null> {
    return this.users.find(
      (item) => item.name === usernameOrEmail || item.email === usernameOrEmail,
    )
  }

  async findWithNameOrEmail({
    name,
    email,
  }: {
    name: string
    email: string
  }): Promise<User[]> {
    return this.usersRepository.find({
      where: {
        name,
        email,
      },
    })
  }
}
