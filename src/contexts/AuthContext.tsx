import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  loginWithGoogle: () => Promise<void>;
  signupWithGoogle: () => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({ user, isAuthenticated: true, isLoading: false });
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
        setAuthState({ user: null, isAuthenticated: false, isLoading: false });
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const loginWithGoogle = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const user: User = {
      id: 'google-123',
      username: 'GoogleUser',
      email: 'googleuser@example.com',
      avatar: 'https://via.placeholder.com/150'
    };
    localStorage.setItem('user', JSON.stringify(user));
    setAuthState({ user, isAuthenticated: true, isLoading: false });
  };

  const signupWithGoogle = async () => {
    await loginWithGoogle();
  };

  const signup = async (username: string, email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const user: User = {
      id: '1',
      username,
      email,
      avatar: 'https://via.placeholder.com/150'
    };
    localStorage.setItem('user', JSON.stringify(user));
    setAuthState({ user, isAuthenticated: true, isLoading: false });
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuthState({ user: null, isAuthenticated: false, isLoading: false });
  };

  return (
    <AuthContext.Provider value={{ ...authState, loginWithGoogle, signupWithGoogle, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
