import { IonPage, IonContent, IonToolbar, IonIcon } from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { useIonRouter } from "@ionic/react";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchActivitiesByIDAT } from "../../redux/features/activityDataSlice";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import ListBackground from "../../components/ListBackground";

const DetailPage: React.FC = () => {
    const { school, form, id } = useParams<{ school : string, form : string, id : string }>();
  const router = useIonRouter();
  const navigateBack = () => {
    if (router.canGoBack()) {
      router.goBack();
    }
  };
  const dispatch = useDispatch<AppDispatch>()
  const data = useSelector((state: RootState) => state.actData.data)

  useEffect(() => {
    dispatch(fetchActivitiesByIDAT([form, school, id]))
  },[form])

  return (
    <IonPage>
      <IonToolbar>
        <div className="flex py-3 pl-5">
          <div onClick={navigateBack} className="mt-2">
            <IonIcon src={chevronBack}></IonIcon>
          </div>
        </div>
      </IonToolbar>
      <IonContent>
        <div className="mx-auto container p-5">
            { data.filter(act => act.flag === "ACCEPT").length != 0 ?
            data.filter(act => act.flag === "ACCEPT").map((value, index) => {
                return <ListBackground key={index} index={index+1} act={value.act_type} teacher={true} data={value} check={false}></ListBackground>
            }) : <div className="mt-10">
                    <p className="text-center text-xl font-bold">No result</p> 
                </div>}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DetailPage;
