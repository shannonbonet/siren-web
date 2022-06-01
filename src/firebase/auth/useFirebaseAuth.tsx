import { useState, useEffect, createContext, useContext } from "react";
import firebase from "../clientApp";

const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email,
});

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const authStateChanged = async (authState) => {
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    var formattedUser = formatAuthUser(authState);
    setAuthUser(formattedUser);
    setLoading(false);
  };
  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };

  const signInWithEmailAndPassword = async (email, password) =>
    firebase.auth().signInWithEmailAndPassword(email, password);

  const createUserWithEmailAndPassword = async (email, password) =>
    firebase.auth().createUserWithEmailAndPassword(email, password);

  const signOut = async () => firebase.auth().signOut().then(clear);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
  };
}

const authUserContext = createContext({
  authUser: null,
  loading: true,
  signInWithEmailAndPassword: async (email, password) => {},
  createUserWithEmailAndPassword: async (email, password) => {},
  signOut: async () => {},
});
export function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth();
  return (
    <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>
  );
}
// custom hook to use the authUserContext and access authUser and loading
export const useAuth = () => useContext(authUserContext);
