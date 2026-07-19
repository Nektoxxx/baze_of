export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

/** Публичные данные пользователя — без пароля. */
export type PublicUser = Omit<User, 'password'>;

export const SEED_USERS: User[] = [
  {
    id: 'user-demo',
    name: 'Демо Пользователь',
    email: 'demo@example.com',
    password: 'demo1234',
  },
  {
    id: 'user-admin',
    name: 'Админ',
    email: 'admin@example.com',
    password: 'admin1234',
  },
];
