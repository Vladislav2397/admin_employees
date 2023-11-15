import { Injectable } from '@nestjs/common'
import { User } from './users.intefaces'

@Injectable()
export class UsersService {
  private nextId = 3
  private readonly users: User[] = [
    {
      id: 1,
      name: 'some name',
      birthday: new Date(),
      role: 'admin',
    },
    {
      id: 2,
      name: 'some name 2',
      birthday: new Date(),
      role: 'employee',
    },
  ]

  create(user: Pick<User, 'name' | 'birthday'>) {
    this.users.push({
      ...user,
      id: this.nextId++,
      role: 'employee',
    })
  }

  findAll(): User[] {
    return this.users
  }

  findOne(id: number): User {
    return this.users.find((item) => item.id === id)
  }
}
