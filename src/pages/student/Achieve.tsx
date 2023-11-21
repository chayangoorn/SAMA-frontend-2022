import { IonPage, IonContent, useIonViewDidEnter } from "@ionic/react";
import AchieveList from "../../components/AchieveList";
import activityType from "../../redux/activityType";
import { AppDispatch, RootState } from '../../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react";
import { fetchAchieveByID } from "../../redux/features/achieveDataSlice";
import { StudentUser } from "../../redux/type";

const AchievePage: React.FC = () => {
  const acttype = ['01','02','03','04','05','06','07','08','09','10','11','12','13']
  const dispatch = useDispatch<AppDispatch>()
  const userData = useSelector((state: RootState) => state.userData)
  let student = userData.user as StudentUser
  const achieves = useSelector((state: RootState) => state.achieveData)

  useEffect(() => {
    dispatch(fetchAchieveByID(student.email))
  }, [dispatch])

  return (
    <IonPage>
      <IonContent fullscreen>
          <div className="container mx-auto py-5 px-8">
          <div className="text-2xl font-bold mt-3 mb-8">Achievement</div>
          <div className="bg-pccp-light-blue rounded-lg p-5">
            {acttype.map((val, index) => {
              return <AchieveList key={index} label={activityType[val]} point={achieves.points[val][2]} types={val}></AchieveList>
            })}
          </div>  
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AchievePage;
