import type { User } from '../domain/types';

const SESSION_STORAGE_KEY = 'internet-package-marketplace:user';

export type AuthenticatedUser = Omit<User, 'password'>;

export function toAuthenticatedUser(user: User): AuthenticatedUser {
  const { password: _password, ...authenticatedUser } = user;

  return authenticatedUser;
}

export function readStoredUser() {
  const storedValue = window.localStorage.getItem(SESSION_STORAGE_KEY);

  if (!storedValue) {
    return null;
  }

  return JSON.parse(storedValue) as AuthenticatedUser;
}

export function storeUser(user: AuthenticatedUser) {
  window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
}

export function clearStoredUser() {
  window.localStorage.removeItem(SESSION_STORAGE_KEY);
}
