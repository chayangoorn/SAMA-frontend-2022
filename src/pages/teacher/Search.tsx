import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonIcon,
  IonSelect,
  IonSelectOption,
  useIonAlert,
  useIonLoading,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { useIonRouter } from "@ionic/react";
import classroom from "../../redux/classroom";
import ListComponent from "../../components/ListComponent";
import axios from "axios";
import { useState, useEffect } from "react";
import StateSvg from "../../components/assets/stats-chart.svg";
import { Directory } from "@capacitor/filesystem";
import { FileOpener } from "@awesome-cordova-plugins/file-opener";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { Http, HttpDownloadFileResult } from "@capacitor-community/http";

const SearchPage: React.FC = () => {
  const router = useIonRouter();
  const navigateBack = () => {
    if (router.canGoBack()) {
      router.goBack();
    }
  };
  const [present] = useIonAlert();
  const userData = useSelector((state: RootState) => state.userData);
  const [room, setRoom] = useState<string>();
  const [presentLoad, dismiss] = useIonLoading();
  //const [loading, setLoading] = useState(false)
  const [listName, setListName] = useState<Array<any>>();
  const getName = async () => {
    await axios.get(
        `https://w1fyg8naxk.execute-api.ap-northeast-2.amazonaws.com/Dev/${userData.user.school}/list?type=STD&classroom=${room}`
      )
      .then((res) => {
        setListName(res.data);
      });
  };

  const downloadFile = async (filename: string, url: string) => {
    const options = {
      url: url,
      filePath: "report/" + filename,
      fileDirectory: Directory.Documents,
      method: "GET",
    };

    const response: HttpDownloadFileResult = await Http.downloadFile(options);

    return response.path as string;
  };

  const download = async () => {
    presentLoad({
      message: "Downloading...",
    });
    if (room) {
      const url =
        "https://w1fyg8naxk.execute-api.ap-northeast-2.amazonaws.com/Dev/" +
        userData.user.school +
        "/file?type=" +
        room;
      const filename = "stat_" + room[0] + "." + room[2] + ".xlsx";
      await axios.get(url).then(async (res: any) => {
        console.log(res.data);
        const filepath = await downloadFile(
          filename,
          res.data.url.split("?")[0]
        );
        dismiss().then(() => {
          FileOpener.open(filepath, "text/csv");
          present({
            message:
              "ดาวน์โหลดเสร็จสิ้น คุณสามารถดูรายละเอียดได้ที่ Documents Folder",
            buttons: [{ text: "OK" }],
          });
        });
      });
    }
  };

  const pushNavigate = (id: string) => {
    router.push("/search/" + id, "forward", "push");
  };

  useEffect(() => {
    getName();
  }, [room]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ "--background": "#CBD3FF" }}>
          <div className="flex py-3 pl-5">
            <div onClick={navigateBack} className="mt-2">
              <IonIcon src={chevronBack}></IonIcon>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="bg-pccp-light-blue w-full h-40">
          <div className="mx-auto container py-5 px-8">
            <div className="font-bold text-4xl mt-2">ค้นหากิจกรรม</div>
            <div className="font-bold text-lg mb-8">Search Activities</div>
            <div
              className={`mb-2 bg-pccp-light-orange
                rounded-lg p-3 grid grid-cols-2 flex items-center font-arthiti`}
            >
              <label>
                เลือกห้องเรียน <span className="text-red-600">*</span>
              </label>
              <IonSelect
                okText="ตกลง"
                cancelText="ยกเลิก"
                style={{ "--placeholder-opacity": "100%" }}
                onIonChange={(e) => {
                  setRoom(e.detail.value);
                }}
              >
                <IonSelectOption value="ALL">สถิติทั้งโรงเรียน</IonSelectOption>
                {classroom.map((option, index) => {
                  return (
                    <IonSelectOption key={index} value={option}>
                      {option}
                    </IonSelectOption>
                  );
                })}
              </IonSelect>
            </div>
            {room && (
              <div className="bg-gradient-to-r my-4 from-pccp-light-orange to-pccp-blue shadow-md rounded-lg p-0.5">
                <div
                  className="bg-white h-full py-4 rounded-lg flex justify-center"
                  onClick={() => {
                    download();
                  }}
                >
                  <IonIcon icon={StateSvg}></IonIcon>
                  <h1 className="text-center ml-3 font-bold text-transparent bg-clip-text bg-gradient-to-r from-pccp-orange to-pccp-blue">
                    <p>Dowload CSV file</p>
                  </h1>
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 divide-y">
              {listName?.map((student, index) => {
                return (
                  <ListComponent
                    label={student.std_firstname + " " + student.std_lastname}
                    key={index}
                    student={true}
                    school={student.school}
                    email={student.std_email}
                    navigate={() => pushNavigate(student.std_email)}
                  ></ListComponent>
                );
              })}
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SearchPage;
