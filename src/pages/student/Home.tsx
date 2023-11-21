import {
  IonContent,
  IonPage,
  useIonViewWillEnter,
} from "@ionic/react";
import ListComponent from "../../components/ListComponent";
import { AppDispatch, RootState } from '../../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useContext, useState } from "react";
import { fetchUserBytoken } from "../../redux/features/UserDataSlice";
import { fetchActivitiesByID } from "../../redux/features/activityDataSlice";
import { AuthContext } from "../../Firebase/AuthContext";
import { StudentUser } from "../../redux/type";
import blank from '../../assets/blankprofile.png'
import { useIonRouter } from "@ionic/react";
import { Storage } from '@capacitor/storage';

const HomePage: React.FC = () => {

  const user = useContext(AuthContext);
  const userData = useSelector((state: RootState) => state.userData)
  const actData = useSelector((state: RootState) => state.actData)
  const [school, setSchool] = useState('')
  let student = userData.user as StudentUser
  const dispatch = useDispatch<AppDispatch>()
  const router = useIonRouter()
  const getSchool = async () => {
    const sch = await Storage.get({ key: 'userSchool' });
    setSchool(JSON.parse(JSON.stringify(sch.value)))
  }

  useEffect(() => {
    getSchool()
    dispatch(fetchUserBytoken([user?.email, school]))
    console.log(student)
  }, [])

  const linkpic = 'https://pcshsptsama.com/www/profile/'

  const navigate = (path: string) => {
    router.push(path, 'forward', 'push')
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="container mx-auto py-5 px-8">
          <div className="bg-gradient-to-r from-pccp-light-orange to-pccp-blue w-full shadow-lg p-5 rounded-lg mb-12 mt-5">
            <div className="grid grid-cols-3 gap-4 flex items-stretch">
              <div className="relative pb-2/3 sm:pt-1/3 h-24">
              <img
                src={
                  userData.user.img_path ? linkpic+userData.user.img_path : blank
                }
                className="absolute inset-0 w-full h-full object-cover rounded-md"
              />
              </div>
              
              <div className="col-span-2 self-center">
                <div className="font-bold text-lg md:text-2xl">{student.firstname} {student.lastname}</div>
                <div className="text-base">student ID: {student.std_id}</div>
                <div className="text-base">{school}</div>
              </div>
            </div>
          </div>
          <div className="text-lg">History Checked</div>
          <div className="mb-5">
          {actData?.data.filter((act) => act.flag === "ACCEPT" || act.flag === "REJECT").length > 0 ? 
          actData?.data.filter((act) => act.flag === "ACCEPT" || act.flag === "REJECT").slice(0,5)
          .map((act,index) => {
            return <ListComponent data={act} key={index} navigate={() => navigate('/home/'+act.act_type+"/"+act.act_id)}></ListComponent>
          }) : <p className="text-center mt-10">No Result</p>}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
