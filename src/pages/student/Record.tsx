import { IonPage, IonContent, useIonRouter, useIonAlert } from "@ionic/react";
import ListComponent from "../../components/List";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchActivitiesByID } from "../../redux/features/activityDataSlice";
import { fetchUserBytoken } from "../../redux/features/UserDataSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { StudentUser } from "../../redux/type";

const RecordPage: React.FC = () => {
  const activities = ['01','02','03','04','05','06','07','08','09','10','11','12','13']
  const times: any = {'01':15,'02':10,'03':5,'04':1,'05':1,'06':1, 
    '07':1,'08':1,'09':1,'10':1,'11':1,'12':40,'13':90}
  const type_acts = useSelector((state: RootState) => state.actData)
  const userData = useSelector((state: RootState) => state.userData.user)
  const student = userData as StudentUser
  const [present] = useIonAlert()
  const router = useIonRouter();
  const dispatch = useDispatch<AppDispatch>()
  const pushNavigate = async (path: string, types: string) => {
    await dispatch(fetchActivitiesByID([student.std_id, types]))
    if (['01', '02'].includes(types)) {
      let hours = 0
      type_acts.data.forEach(act => {
        hours+=parseFloat(act.act_hours.toString())
      });
      if (hours < times[types]) {
        router.push(path, "forward", "push");
      } else {
        present({
          message: "คุณบันทึกกิจกรรมสำหรับรายการนี้เต็มแล้ว",
          buttons: ["OK"]
        })
      }
    } else {
      if (type_acts.data.length < times[types]) {
        router.push(path, "forward", "push");
      } else {
        present({
          message: "คุณบันทึกกิจกรรมสำหรับรายการนี้เต็มแล้ว",
          buttons: ["OK"]
        })
      }
    }
    
    
  }

  useEffect(() => {
    dispatch(fetchUserBytoken(userData.email))
  }, [])

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="container mx-auto py-5 px-8">
          <div className="text-2xl font-bold mt-3 mb-5">เลือกประเภทกิจกรรม</div>
          {activities.map((act, index) => {
            return (
              <ListComponent key={index} act={act} navigate={() => pushNavigate('/record/'+act, act)}></ListComponent>
            );
          })}
        </div>
      </IonContent>
    </IonPage>
  );
};
export default RecordPage;
