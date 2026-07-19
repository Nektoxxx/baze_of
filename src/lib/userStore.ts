import { SEED_USERS, type PublicUser, type User } from '../data/users';

const USERS_STORAGE_KEY = 'baze-users';
const SESSION_STORAGE_KEY = 'baze-auth-session';

export type AuthErrorCode =
  | 'EMAIL_TAKEN'
  | 'INVALID_CREDENTIALS'
  | 'USER_NOT_FOUND'
  | 'VALIDATION';

export class AuthError extends Error {
  constructor(
    public code: AuthErrorCode,
    message: string
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function toPublicUser(user: User): PublicUser {
  const { password: _password, ...publicUser } = user;
  return publicUser;
}

function readUsers(): User[] {
  if (typeof window === 'undefined') return [...SEED_USERS];

  try {
    const raw = window.localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) {
      window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(SEED_USERS));
      return [...SEED_USERS];
    }

    const parsed = JSON.parse(raw) as User[];
    if (!Array.isArray(parsed)) {
      window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(SEED_USERS));
      return [...SEED_USERS];
    }

    return parsed.filter(
      (user) =>
        typeof user.id === 'string' &&
        typeof user.name === 'string' &&
        typeof user.email === 'string' &&
        typeof user.password === 'string'
    );
  } catch {
    window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(SEED_USERS));
    return [...SEED_USERS];
  }
}

function writeUsers(users: User[]): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

function readSessionUserId(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const id = window.localStorage.getItem(SESSION_STORAGE_KEY);
    return id && id.length > 0 ? id : null;
  } catch {
    return null;
  }
}

function writeSessionUserId(userId: string | null): void {
  if (typeof window === 'undefined') return;
  if (userId) {
    window.localStorage.setItem(SESSION_STORAGE_KEY, userId);
  } else {
    window.localStorage.removeItem(SESSION_STORAGE_KEY);
  }
}

export function getUsers(): PublicUser[] {
  return readUsers().map(toPublicUser);
}

export function getUserById(id: string): PublicUser | undefined {
  const user = readUsers().find((item) => item.id === id);
  return user ? toPublicUser(user) : undefined;
}

export function getCurrentUser(): PublicUser | null {
  const sessionId = readSessionUserId();
  if (!sessionId) return null;
  return getUserById(sessionId) ?? null;
}

export function registerUser(input: {
  name: string;
  email: string;
  password: string;
}): PublicUser {
  const name = input.name.trim();
  const email = normalizeEmail(input.email);
  const password = input.password;

  if (!name || !email || !password) {
    throw new AuthError('VALIDATION', 'Заполните все поля');
  }

  if (password.length < 8) {
    throw new AuthError('VALIDATION', 'Пароль должен содержать минимум 8 символов');
  }

  const users = readUsers();
  const emailTaken = users.some((user) => normalizeEmail(user.email) === email);

  if (emailTaken) {
    throw new AuthError('EMAIL_TAKEN', 'Пользователь с таким email уже существует');
  }

  const newUser: User = {
    id: `user-${Math.random().toString(36).slice(2, 10)}`,
    name,
    email,
    password,
  };

  writeUsers([...users, newUser]);
  writeSessionUserId(newUser.id);

  return toPublicUser(newUser);
}

export function loginUser(input: { email: string; password: string }): PublicUser {
  const email = normalizeEmail(input.email);
  const password = input.password.trim();

  if (!email || !password) {
    throw new AuthError('VALIDATION', 'Введите email и пароль');
  }

  const user = readUsers().find(
    (item) => normalizeEmail(item.email) === email && item.password === password
  );

  if (!user) {
    throw new AuthError('INVALID_CREDENTIALS', 'Неверный email или пароль');
  }

  writeSessionUserId(user.id);
  return toPublicUser(user);
}

export function logoutUser(): void {
  writeSessionUserId(null);
}
