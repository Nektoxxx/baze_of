import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { PublicUser } from '../data/users';
import {
  AuthError,
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from '../lib/userStore';

interface AuthContextValue {
  user: PublicUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PublicUser | null>(() => getCurrentUser());

  const login = useCallback((email: string, password: string) => {
    const nextUser = loginUser({ email, password });
    setUser(nextUser);
  }, []);

  const register = useCallback((name: string, email: string, password: string) => {
    const nextUser = registerUser({ name, email, password });
    setUser(nextUser);
  }, []);

  const logout = useCallback(() => {
    logoutUser();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: user !== null,
      login,
      register,
      logout,
    }),
    [user, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export { AuthError };
