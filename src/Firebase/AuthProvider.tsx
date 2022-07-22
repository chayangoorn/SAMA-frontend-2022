import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import firebase from "firebase/compat/app";
import { auth } from "./firebase";
import { IonSpinner, IonContent } from '@ionic/react';

const AuthProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false)
    });
  }, []);

  if (loading) {
    return <IonContent>
      <div className="grid justify-items-center h-full">
        <div className="mt-1/2"></div>
        <IonSpinner name="crescent"/>
      </div>
    </IonContent>
  }

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthProvider