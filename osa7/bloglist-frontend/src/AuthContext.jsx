import { createContext, useReducer, useContext } from 'react';

// state: { username, password, user }

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGOUT':
      return { username: '', password: '', user: null };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'SET_USERNAME':
      return { ...state, username: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
  }
};

const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [auth, dispatch] = useReducer(authReducer, []);

  return (
    <AuthContext.Provider value={[auth, dispatch]}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuthValue = () => {
  const authValueAndContext = useContext(AuthContext);
  return authValueAndContext[0];
};

export const useAuthDispatch = () => {
  const authValueAndContext = useContext(AuthContext);
  return authValueAndContext[1];
};

export default AuthContext;
