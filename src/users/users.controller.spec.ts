import { Test } from '@nestjs/testing'
import { UsersController } from './users.controller'
import { User } from './users.intefaces'
import { UsersService } from './users.service'

describe('UsersController', () => {
  let usersController: UsersController
  let usersService: UsersService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile()

    usersService = moduleRef.get<UsersService>(UsersService)
    usersController = moduleRef.get<UsersController>(UsersController)
  })

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result: User[] = [
        {
          id: 1,
          name: 'user name 1',
          birthday: new Date(),
          role: 'admin',
        },
      ]
      jest.spyOn(usersService, 'findAll').mockImplementation(() => result)

      expect(await usersController.findAll()).toBe(result)
    })
  })

  describe('findOne', () => {
    it('should return finded user', async () => {
      const result: User = {
        id: 1,
        name: 'user name 1',
        birthday: new Date(),
        role: 'admin',
      }

      jest.spyOn(usersService, 'findOne').mockImplementation(() => result)

      expect(await usersController.findOne(1)).toBe(result)
    })
  })
})
