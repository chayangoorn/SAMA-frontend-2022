import { IonReactRouter } from "@ionic/react-router";

import SignupPage from "../../pages/student/Signup";
import LoginPage from "../../pages/Login";
import StudentTabs from "./StudentTabs";
import TeacherTabs from "./TeacherTabs";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../Firebase/AuthContext";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchUserBytoken } from "../../redux/features/UserDataSlice";
import { Storage } from '@capacitor/storage';

const Tabs: React.FC = () => {
  const user = useContext(AuthContext);
  const userData = useSelector((state: RootState) => state.userData)
  const dispatch = useDispatch<AppDispatch>()
  const [school, setSchool] = useState('')
  const checkName = async () => {
    const { value } = await Storage.get({ key: 'userEmail' })
    return value as string
  };
  const getSchool = async () => {
    const sch = await Storage.get({ key: 'userSchool' });
    setSchool(JSON.parse(JSON.stringify(sch.value)))
  }

  useEffect(() => {
    getSchool()
    checkName().then((email) => {
      dispatch(fetchUserBytoken([email, school]))
    })
  }, [])

  const selecttab = () => {
      if (userData.user.flag === "STD") {
        return <StudentTabs></StudentTabs>
      } else if (userData.user.flag === "TCH") {
        return <TeacherTabs></TeacherTabs>
      }
      
  }

  return (
      <IonReactRouter>
        { user ? selecttab() : window.location.pathname === "/signup" ? 
          <SignupPage></SignupPage> : <LoginPage></LoginPage>
        }  
      </IonReactRouter>
    );
  
};

export default Tabs;
