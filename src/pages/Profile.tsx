import { IonPage, IonContent, IonLoading } from "@ionic/react";
import MenuList from "../components/MenuList";
import { AppDispatch, RootState } from '../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useContext } from "react";
import { fetchUserBytoken } from "../redux/features/UserDataSlice";
import { AuthContext } from "../Firebase/AuthContext";
import { StudentUser, TeacherUser } from "../redux/type";

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const userData = useSelector((state: RootState) => state.userData)
  let student = userData.user as StudentUser
  let teacher = userData.user as TeacherUser
  const user = useContext(AuthContext);

  useEffect(() => {
    dispatch(fetchUserBytoken(user?.email))
  }, [])

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="container mx-auto p-5">
          <div className="flex justify-center mb-5 mt-8">
                <div className="w-40 h-40 blur-lg rounded-full bg-gradient-to-r from-pccp-light-orange to-pccp-blue grid place-items-center">
                <img className="object-cover w-32 h-32 rounded-full inset-0" src="http://placekitten.com/g/200/301" alt="Profile image"/>
        </div>
          </div>
          <div className="text-center text-lg font-bold">
            {
              Number(userData.user.flag) === 0 ? 
              <p>{student.firstname} {student.lastname}</p> : <p>{teacher.firstname} {teacher.lastname}</p>
            }
          </div>
          {
            Number(userData.user.flag) === 0 && 
            <div className="flex justify-center">
              <div className="text-sm flex justify-between w-1/2 mb-8">
                <div>M.{student.classroom}</div>
                <div>No.{student.number}</div>
                <div>ID: {student.std_id}</div>
              </div>
            </div>
          }
          
          <div className="mx-3 mt-5">
            <MenuList></MenuList>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
export default ProfilePage;
