import {
  IonContent,
  IonPage,
} from "@ionic/react";
import ListComponent from "../../components/ListComponent";
import { AppDispatch, RootState } from '../../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useContext } from "react";
import { fetchUserBytoken } from "../../redux/features/UserDataSlice";
import { AuthContext } from "../../Firebase/AuthContext";
import { StudentUser } from "../../redux/type";

const HomePage: React.FC = () => {

  const user = useContext(AuthContext);
  const userData = useSelector((state: RootState) => state.userData)
  let student = userData.user as StudentUser
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchUserBytoken(user?.email))
  }, [])

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="container mx-auto py-5 px-8">
          <div className="bg-gradient-to-r from-pccp-light-orange to-pccp-blue w-full shadow-lg p-5 rounded-lg mb-12 mt-5">
            <div className="grid grid-cols-3 gap-4 flex items-stretch">
              <div className="relative pb-2/3 sm:pt-1/3 h-24">
              <img
                src="http://placekitten.com/g/200/301"
                className="absolute inset-0 w-full h-full object-cover rounded-md"
              />
              </div>
              
              <div className="col-span-2 self-center">
                <div className="font-bold text-lg md:text-2xl">{student.firstname} {student.lastname}</div>
                <div className="text-base">student ID: {student.std_id}</div>
              </div>
            </div>
          </div>
          <div className="text-lg">History Checked</div>
          <ListComponent></ListComponent>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
