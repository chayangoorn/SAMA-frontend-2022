import {
  IonPage,
  IonContent,
  IonToolbar,
  IonIcon,
  IonHeader,
  useIonAlert,
  useIonViewWillEnter,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { useIonRouter } from "@ionic/react";
import axios from "axios";
import { useState, useEffect } from "react";
import blank from "../../assets/blankprofile.png";
import { useParams } from "react-router";
import { RootState, AppDispatch } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { StudentUser } from "../../redux/type";

const SelectTeacherPage: React.FC = () => {
  const [teachers, setTeachers] = useState<Array<any>>();
  const { id, status } = useParams<{ id: string; status: string }>();
  const act_ids = id.split("&");
  const router = useIonRouter();
  const [present] = useIonAlert();
  const userData = useSelector((state: RootState) => state.userData);
  let student = userData.user as StudentUser;
  const Back = () => {
    if (router.canGoBack()) {
      if (status === "update") {
        router.push("/manage", "back", "pop");
      } else if (status === "create") {
        router.push("/record", "back", "pop");
      }
    }
  };

  useIonViewWillEnter(() => {
    teacher();
  });

  const teacher = async () => {
    await axios
      .get(
        `https://w1fyg8naxk.execute-api.ap-northeast-2.amazonaws.com/Dev/${student.school}/list?type=TCH`
      )
      .then((res) => {
        setTeachers(res.data);
      });
  };

  const onSelect = async (teacher: any) => {
    let sendData = {
      flag: "SEND",
      tch_name: teacher.tch_firstname + " " + teacher.tch_lastname,
      tch_email: teacher.tch_email,
    };
    console.log(sendData);
    try {
      act_ids.forEach(async (id, index) => {
        await axios
          .post(
            `https://w1fyg8naxk.execute-api.ap-northeast-2.amazonaws.com/Dev/${student.school}/${student.email}/rec/${id}`,
            JSON.stringify(sendData)
          )
          .then((res) => {
            console.log(res);
            if (index === act_ids.length - 1) {
              present({
                message: "ส่งเรียบร้อย",
                buttons: ["OK"],
              });
              Back();
            }
          });
      });
    } catch {
      present({
        message: "การส่งผิดพลาด",
        buttons: ["OK"],
      });
      Back();
    }
  };

  const checkIfImageExists = (url: string) => {
    const img = new Image();
    img.src = url;

    if (img.complete) {
      return true;
    } else {
      img.onload = () => {
        return true;
      };

      img.onerror = () => {
        return false;
      };
    }
  };

  const linkpic = (school: string, email: string) => {
    return (
      "https://sama-data-bucket.s3.ap-northeast-2.amazonaws.com/" +
      school +
      "/profile_pic/" +
      email.split("@")[0] +
      "." +
      email.split("@")[1] +
      ".jpeg"
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className="flex py-3 pl-5">
            <div onClick={Back} className="mt-2">
              <IonIcon src={chevronBack}></IonIcon>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="container mx-auto py-5 mt-2 px-8">
          <h1 className="font-bold text-lg mb-3">เลือกคุณครูที่ต้องการส่ง</h1>
          <div className="grid grid-cols-1 divide-y">
            {teachers?.map((teacher, index) => {
              return (
                <div
                  className="h-12 grid grid-cols-6 flex items-center gap-x-3"
                  key={index}
                >
                  <div className="col-span-1">
                    {checkIfImageExists(
                      linkpic(teacher.school, teacher.tch_email)
                    ) ? (
                      <img
                        src={linkpic(teacher.school, teacher.tch_email)}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <img src={blank} className="w-8 h-8 rounded-full" />
                    )}
                  </div>
                  <div className="col-span-4">
                    <p className="truncate">
                      {teacher.tch_firstname} {teacher.tch_lastname}
                    </p>
                  </div>
                  <div className="flex justify-end col-span-1">
                    <button
                      className="rounded shadow bg-pccp-light-orange w-full"
                      onClick={(e) => onSelect(teacher)}
                    >
                      ส่ง
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SelectTeacherPage;
