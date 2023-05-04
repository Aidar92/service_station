import React, {
  createContext,
  useCallback,
  useEffect,
  useReducer,
} from 'react';
import { Auth } from '~api';
import { authTokenStorage, initialLocationStorage } from '~libs';
import { Common } from '~types';

enum ActionType {
  AUTH_ERROR = 'AUTH_ERROR',
  AUTH_IN = 'AUTH_IN',
  AUTH_OUT = 'AUTH_OUT',
  AUTH_START = 'AUTH_START',
  CLEAR_AUTH_ERROR = 'CLEAR_AUTH_ERROR',
}

type ReducerState = {
  authError: string | null;
  authInProgress: boolean;
  isAuthorized: boolean;
  userData: {
    isActive: boolean;
    login: string;
    name: string;
    permissions: Common.Permissions[];
  } | null;
};

type ReducerAction = {
  type: ActionType;
  payload?: any;
};

const initReducerState = (storedAuthToken?: string | null): ReducerState => ({
  authError: null,
  authInProgress: Boolean(storedAuthToken),
  isAuthorized: false,
  userData: null,
});

const reducer = (state: ReducerState, { type, payload }: ReducerAction) => {
  switch (type) {
    case ActionType.AUTH_START:
      return {
        ...state,
        authError: null,
        authInProgress: true,
        isAuthorized: false,
      };
    case ActionType.AUTH_IN:
      return {
        ...state,
        authInProgress: false,
        isAuthorized: true,
        userData: payload,
      };
    case ActionType.AUTH_OUT:
      return {
        ...state,
        authInProgress: false,
        isAuthorized: false,
      };
    case ActionType.AUTH_ERROR:
      return {
        ...state,
        authError: payload,
        authInProgress: false,
        isAuthorized: false,
      };
    case ActionType.CLEAR_AUTH_ERROR:
      return {
        ...state,
        authError: null,
      };
    default:
      throw new Error('Invalid reducer action name at auth');
  }
};

type AuthContextState = {
  authState: ReducerState;
  clearAuthError: () => void;
  logIn: (params: Auth.LogInParams) => void;
  logOut: () => void;
};

const AuthContext = createContext<AuthContextState>({
  authState: initReducerState(),
  clearAuthError: () => null,
  logIn: () => null,
  logOut: () => null,
});

const mapUserData = (userData: Auth.UserData): ReducerState['userData'] => {
  const { isActive, login, name, permissions } = userData;
  return {
    isActive,
    login,
    name,
    permissions: permissions.map((p) => p.id),
  };
};

const AuthProvider: React.FC = (props) => {
  const { children } = props;

  const [state, dispatch] = useReducer(
    reducer,
    authTokenStorage.get(),
    initReducerState
  );

  const clearAuthError = useCallback(() => {
    dispatch({ type: ActionType.CLEAR_AUTH_ERROR });
  }, []);

  const logIn = useCallback(async (params: Auth.LogInParams) => {
    dispatch({ type: ActionType.AUTH_START });
    try {
      const authData = await Auth.controller.logIn(params);
      authTokenStorage.store(authData.token);
      const userData = await Auth.controller.getUserData();
      dispatch({ type: ActionType.AUTH_IN, payload: mapUserData(userData) });
    } catch (error) {
      dispatch({ type: ActionType.AUTH_ERROR, payload: error.message });
    }
  }, []);

  const logOut = useCallback(() => {
    authTokenStorage.remove();
    initialLocationStorage.remove();
    dispatch({ type: ActionType.AUTH_OUT });
  }, []);

  const renewToken = useCallback(async () => {
    const storedToken = authTokenStorage.get();
    if (storedToken) {
      try {
        const authData = await Auth.controller.renewToken();
        authTokenStorage.store(authData.token);
        const userData = await Auth.controller.getUserData();
        dispatch({ type: ActionType.AUTH_IN, payload: mapUserData(userData) });
      } catch (error) {
        dispatch({ type: ActionType.AUTH_ERROR, payload: error.message });
      }
    }
  }, []);

  /** updating user access token on app mount or setting sso error */
  useEffect(() => {
    renewToken();
  }, [renewToken]);

  return (
    <AuthContext.Provider
      value={{
        authState: state,
        clearAuthError,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
