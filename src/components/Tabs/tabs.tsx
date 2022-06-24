import { IonReactRouter } from "@ionic/react-router";

import SignupPage from "../../pages/student/Signup";
import LoginPage from "../../pages/Login";
import StudentTabs from "./StudentTabs";
import TeacherTabs from "./TeacherTabs";

import { useContext, useEffect } from "react";

import { AuthContext } from "../../Firebase/AuthContext";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchUserBytoken } from "../../redux/features/UserDataSlice";

const Tabs: React.FC = () => {
  const user = useContext(AuthContext);
  const userData = useSelector((state: RootState) => state.userData)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchUserBytoken(user?.email))
  }, [])

  return (
    <IonReactRouter>
      { user ? (Number(userData.user.flag) === 0 ? <StudentTabs></StudentTabs> : <TeacherTabs></TeacherTabs>)
         : window.location.pathname == "/signup" ? 
         <SignupPage></SignupPage> : <LoginPage></LoginPage>
      }  
    </IonReactRouter>
  );
};

export default Tabs;
