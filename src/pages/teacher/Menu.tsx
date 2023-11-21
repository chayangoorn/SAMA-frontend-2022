import { IonPage, IonContent, IonIcon, IonLabel } from "@ionic/react";
import SearchSvg from "../../components/assets/search.svg";
import StatSvg from "../../components/assets/stats-chart.svg";
import { useIonRouter } from "@ionic/react";

const MenuPage: React.FC = () => {

  const router = useIonRouter()
  const pushNavigate = (path: string) => {
    router.push(path, 'forward', 'push')
  }

  return (
    <IonPage>
      <IonContent>
        <div className="bg-pccp-light-blue w-full h-52">
          <div className="mx-auto container py-5 px-8">
            <div className="font-bold text-4xl mt-5">เมนูกิจกรรม</div>
            <div className="font-bold text-lg mb-8 mt-2">Activities Menu</div>
            <div className="grid grid-cols-2 gap-x-5">
              <div className="bg-gradient-to-r from-pccp-light-orange to-pccp-blue shadow-lg rounded-lg p-1">
                <div className="bg-white h-full py-5 grid justify-items-center gap-y-5 rounded-lg"
                onClick={() => pushNavigate('/search')}>
                  <IonIcon
                    icon={SearchSvg}
                    style={{ "fontSize": "64px" }}
                  ></IonIcon>
                  <h1 className="text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-pccp-orange to-pccp-blue">
                    ค้นหากิจกรรม
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MenuPage;
