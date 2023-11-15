export interface User {
  id: number
  name: string
  birthday: Date
  role: 'admin' | 'employee'
}
