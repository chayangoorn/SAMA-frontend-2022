import { IonPage, IonContent, useIonRouter } from "@ionic/react";
import ListBackground from "../../components/ListBackground";

const ManagePage: React.FC = () => {
  const activities = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
  ];

  const router = useIonRouter();
  const pushNavigate = (path: string) => {
    router.push(path, "forward", "push");
  };
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="container mx-auto py-5 px-8">
          <div className="text-2xl font-bold mt-3">Manage Activities</div>
          <div className="text-sm my-3">Activities Recorded</div>
          <div className="bg-pccp-light-blue p-3 rounded-lg">
            {activities.map((act, index) => {
              return (
                <ListBackground
                  key={index}
                  act={act}
                  navigate={() => pushNavigate(`manage/${act}`)}
                ></ListBackground>
              );
            })}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
export default ManagePage;
