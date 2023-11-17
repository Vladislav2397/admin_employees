import { MiddlewareConsumer, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { LoggerMiddleware } from './middlewares/logger.middleware'
import { User } from './users/users.entity'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql',
      port: 3306,
      username: 'admin',
      password: 'admin123',
      database: 'admin_employees',
      entities: [User],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('users')
  }
}
