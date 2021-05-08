import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {IUser, ISession} from '../models';
import {apiPortalDosPets} from '../services';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  signed: boolean;
  user: IUser | null;
  loading: boolean;
  updateUserLocalStorage(user: IUser): void;
  signIn(credentials: SignInCredentials): any;
  signOut(): void;
}

const USER_DATA_LOCALSTORAGE = '@PortalDosPets:User';
const SESSION_TOKEN_LOCALSTORAGE = '@PortalDosPets:Session:token';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  const signIn = useCallback(async ({email, password}) => {
    const {data: responseSession} = await apiPortalDosPets.post(`/sessions`, {
      email,
      password,
    });

    const {user: userFound, token}: ISession = responseSession.data;

    setUser(userFound);

    setLoading(false);

    apiPortalDosPets.defaults.headers.Authorization = `Bearer ${token}`;

    await AsyncStorage.multiSet([
      [USER_DATA_LOCALSTORAGE, JSON.stringify(userFound)],
      [SESSION_TOKEN_LOCALSTORAGE, token],
    ]);
  }, []);

  const signOut = (): void => {
    AsyncStorage.clear().then(() => {
      setUser(null);
    });
  };

  const updateUserLocalStorage = useCallback(async (user: IUser) => {
    await AsyncStorage.setItem(USER_DATA_LOCALSTORAGE, JSON.stringify(user));
  }, []);

  useEffect(() => {
    const loadStoragedData = async (): Promise<void> => {
      const [storagedUser, storagedToken] = await AsyncStorage.multiGet([
        USER_DATA_LOCALSTORAGE,
        SESSION_TOKEN_LOCALSTORAGE,
      ]);

      if (storagedUser[1] && storagedToken[1]) {
        apiPortalDosPets.defaults.headers.Authorization = `Bearer ${storagedToken[1]}`;
        setUser(JSON.parse(storagedUser[1]));
      }
      setLoading(false);
    };

    loadStoragedData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        updateUserLocalStorage,
        signIn,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado em um AuthProvider');
  }

  return context;
};

export {AuthProvider, useAuth};
