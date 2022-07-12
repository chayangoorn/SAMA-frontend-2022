import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonIcon,
  IonContent,
  useIonViewWillEnter,
  IonFab,
  IonFabButton,
  useIonAlert
} from "@ionic/react";
import { chevronBack, paperPlane } from "ionicons/icons";
import { useIonRouter } from "@ionic/react";
import ManageList from "../../components/ManageList";
import { AppDispatch, RootState } from '../../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchActivitiesByID } from "../../redux/features/activityDataSlice";
import activityType from "../../redux/activityType";
import { ActData, StudentUser } from "../../redux/type";

interface ids {
  act_ids : string[]
}

const ActivitiesPage: React.FC = () => {
  const { index } = useParams<{ index: string }>();
  const router = useIonRouter();
  const dispatch = useDispatch<AppDispatch>()
  const activities = useSelector((state: RootState) => state.actData)
  const userData = useSelector((state: RootState) => state.userData)
  let student = userData.user as StudentUser
  const [present] = useIonAlert()
  const [sendData, setSendData] = useState<ids>({act_ids: []})
  const [selects, setSelects] = useState(Array.from({length: activities.data.length}, () => false))
  const navigateBack = () => {
    if (router.canGoBack()) {
      router.goBack();
    }
  };

  const pushNavigate = () => {
    if (sendData.act_ids.length !== 0) {
      if (sendData.act_ids.length > 5) {
        present({
          message: "เลือกกิจกรรมได้สูงสุด 5 รายการเท่านั้น",
          buttons: ["OK"]
        })
      } else {
        router.push('/send/'+sendData.act_ids.join("&"), 'forward', 'push')
      }
    } else {
      present({
        message: "กรุณาเลือกรายการที่ต้องการส่ง",
        buttons: ["OK"]
      })
    }
    
  }

  useIonViewWillEnter(() => {
    dispatch(fetchActivitiesByID([student.std_id, index]))
  })

  useEffect(() => {
    dispatch(fetchActivitiesByID([student.std_id, index]))
  }, [])

  const onClickSelect = (e: React.MouseEvent<HTMLDivElement>, data: ActData, select: boolean, index: number) => {
    e.preventDefault()
    let newSendData = {...sendData}
    let newSelects = {...selects}
    newSelects[index] = select
    setSelects(newSelects)
    if (select) {
      newSendData.act_ids.push(data.act_id.toString())
    } else {
      newSendData.act_ids = newSendData.act_ids.filter((id, idx) => idx !== index)
    }
    setSendData(newSendData)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className="flex py-3 pl-5">
            <div onClick={navigateBack} className="mt-2">
              <IonIcon src={chevronBack}></IonIcon>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
          <div className="container mx-auto py-5 mt-2 px-8">
            <div className="font-bold text-2xl">{activityType[index]}</div>
            <div className="font-bold text-sm mb-5">activities recorded</div>
            {activities.data.length ? activities.data.map((value, i) => {
              if (value.act_type === index) {
                return <ManageList data={value} index={i} key={i} onClickSelect={onClickSelect} choose={selects[i]}></ManageList>
              }
            }) : <div>No result</div>}
          </div>
          <IonFab vertical="bottom" horizontal="end" slot="fixed" className="mr-3 mb-3">
          <IonFabButton style={{'--background' : '#9da2ff', '--color' : '#000'}} onClick={pushNavigate}>
            <IonIcon icon={paperPlane}/>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default ActivitiesPage;
