import { IonPage, IonContent, IonIcon, IonButton, useIonRouter } from "@ionic/react";
import ListComponent from "../../components/List";

const RecordPage: React.FC = () => {
  const activities = ['01','02','03','04','05','06','07','08','09','10','11','12','13']

  const router = useIonRouter();
  const pushNavigate = (path: string) => {
    router.push(path, "forward", "push");
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="container mx-auto py-5 px-8">
          <div className="text-2xl font-bold mt-3 mb-5">เลือกประเภทกิจกรรม</div>
          {activities.map((act, index) => {
            return (
              <ListComponent key={index} act={act} navigate={() => pushNavigate('/record/'+act)}></ListComponent>
            );
          })}
        </div>
      </IonContent>
    </IonPage>
  );
};
export default RecordPage;
