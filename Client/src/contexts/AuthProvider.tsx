import { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { getLogginData } from '@/utils/funcs';
import { setLogginData } from '@/redux/slices/user.slice';

type AuthContextType = {
  user: any;
  login?: (email: string, password: string) => Promise<void>;
  logout?: () => Promise<void>;
  register?: (email: string, password: string) => Promise<void>;
  isAdmin?: boolean;
};

interface AuthProviderProps {
  children: React.ReactNode;
}
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  isAdmin: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [isAdmin, setIsAdmin] = useState(false);

  const login = async (email: string, password: string) => {
    // TODO: login logic
  };

  const logout = async () => {
    // TODO: logout logic
  };

  const register = async (email: string, password: string) => {
    // TODO: register logic
  };

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const data = getLogginData();
    dispatch(setLogginData(data));
    if (data?.role === 'ADMIN') {
      setIsAdmin(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
