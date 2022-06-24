import { IonPage, IonContent, IonIcon, IonLabel } from "@ionic/react";
import SearchSvg from "../../components/assets/search.svg";
import StatSvg from "../../components/assets/stats-chart.svg";

const SearchPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <div className="bg-pccp-light-blue w-full h-48">
          <div className="mx-auto container py-5 px-8">
            <div className="font-bold text-4xl mt-5">ค้นหากิจกรรม</div>
            <div className="font-bold text-lg mb-8">Search Activities</div>
            <div className="grid grid-cols-2 gap-x-5">
              <div className="bg-gradient-to-r from-pccp-light-orange to-pccp-blue shadow-lg rounded-lg p-1">
                <div className="bg-white h-full py-5 grid justify-items-center gap-y-5 rounded-lg">
                  <IonIcon
                    icon={SearchSvg}
                    style={{ "fontSize": "64px" }}
                  ></IonIcon>
                  <h1 className="text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-pccp-orange to-pccp-blue">
                    เรียกดูแบบละเอียด
                  </h1>
                </div>
              </div>
              <div className="bg-gradient-to-r from-pccp-light-orange to-pccp-blue shadow-lg rounded-lg p-1">
                <div className="bg-white h-full py-5 grid justify-items-center gap-y-5 rounded-lg">
                  <IonIcon
                    icon={StatSvg}
                    style={{ "fontSize": "64px" }}
                  ></IonIcon>
                  <h1 className="text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-pccp-orange to-pccp-blue">
                    เรียกดูแบบสถิติ
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

export default SearchPage;
