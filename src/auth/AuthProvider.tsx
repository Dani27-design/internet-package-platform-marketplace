import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { createCustomer, findUserByCredentials } from '../api/queries';
import type { NewCustomerInput } from '../domain/types';
import {
  clearStoredUser,
  readStoredUser,
  storeUser,
  toAuthenticatedUser,
  type AuthenticatedUser,
} from './session';

type AuthContextValue = {
  user: AuthenticatedUser | null;
  login: (email: string, password: string) => Promise<AuthenticatedUser>;
  registerCustomer: (input: NewCustomerInput) => Promise<AuthenticatedUser>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthenticatedUser | null>(() => readStoredUser());

  const login = useCallback(async (email: string, password: string) => {
    const matchedUser = await findUserByCredentials(email, password);

    if (!matchedUser) {
      throw new Error('Invalid credentials');
    }

    const authenticatedUser = toAuthenticatedUser(matchedUser);
    setUser(authenticatedUser);
    storeUser(authenticatedUser);

    return authenticatedUser;
  }, []);

  const registerCustomer = useCallback(async (input: NewCustomerInput) => {
    const createdUser = await createCustomer(input);
    const authenticatedUser = toAuthenticatedUser(createdUser);
    setUser(authenticatedUser);
    storeUser(authenticatedUser);

    return authenticatedUser;
  }, []);

  const logout = useCallback(() => {
    clearStoredUser();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      login,
      registerCustomer,
      logout,
    }),
    [login, logout, registerCustomer, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return value;
}
