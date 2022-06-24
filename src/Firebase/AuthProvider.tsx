import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import firebase from "firebase/compat/app";
import { auth } from "./firebase";

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthProvider