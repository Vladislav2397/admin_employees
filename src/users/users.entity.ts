import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  birthday: Date

  @Column()
  password: string

  @Column({ default: 'employee' })
  role: 'admin' | 'employee'
}
