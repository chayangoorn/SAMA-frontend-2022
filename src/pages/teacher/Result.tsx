import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonIcon,
  useIonViewWillEnter,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { useIonRouter } from "@ionic/react";
import blank from "../../assets/blankprofile.png";
import { useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { StudentUser } from "../../redux/type";
import { fetchAchieveByID } from "../../redux/features/achieveDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import ListComponent from "../../components/ListComponent";
import activityType from "../../redux/activityType";
import ListBackground from "../../components/ListBackground";

const ResultPage: React.FC = () => {
    const { id } = useParams<{ id : string }>();
  const router = useIonRouter();
    const dispatch = useDispatch<AppDispatch>()
    const achieve = useSelector((state: RootState) => state.achieveData)
  const navigateBack = () => {
    if (router.canGoBack()) {
      router.goBack();
    }
  };
  const pushNavigate = (path: string) => {
    router.push('result/'+path, "forward", "push");
  };

  useIonViewWillEnter(() => {
    getStudent()
  })

  const linkpic = 'http://www.zp11489.tld.122.155.167.85.no-domain.name/www/profile/'
  const [user, setUser] = useState<StudentUser>()
  const getStudent = async () => {
    await axios.post("http://www.zp11489.tld.122.155.167.85.no-domain.name/www/login.php", JSON.stringify({std_ID: id}))
    .then((res) => {
        const userData: StudentUser = {
            user_id: res.data.user_id,
            std_id: res.data.std_ID,
            firstname: res.data.std_firstname,
            lastname: res.data.std_lastname,
            classroom: res.data.std_classroom,
            number: res.data.std_number,
            dormitory: res.data.std_dormitory,
            img_path: res.data.img_path,
            email: res.data.std_email,
            flag: res.data.flag
        }
        setUser(userData)
    })
  }

  useEffect(() => {
    dispatch(fetchAchieveByID(id))
  }, [dispatch])

  const labels = ['ชั่วโมง','ชั่วโมง','ครั้ง','ชุมนุม',"ครั้ง","ครั้ง"]

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
        <div className="w-full mt-14 flex">
          <div className="h-20 w-full bg-pccp-light-orange flex">
            <img src={ user?.img_path == null || user?.img_path == "" ?
                blank : linkpic+user.img_path
            } className="w-40 h-40 rounded-full border-white border-8 -mt-10 -ml-10"/>
            <div>
              <p className="pt-4 ml-5 font-bold text-lg">{user?.firstname} {user?.lastname}</p>
              <p className="ml-5 text-sm">M.{user?.classroom} No.{user?.number} ID:{id}</p>
            </div>
          </div>
        </div>
        <div className="mx-auto container p-5 px-8 mt-8">
            <h1 className="text-xl font-bold mb-2 mt-2">สถิติการทำกิจกรรม</h1>
            {['01', '02', '03', '11', '12', '13'].map((type, index) => {
               return <ListComponent key={index} label={activityType[type]} point={achieve.points[type]} type={labels[index]} student={false}></ListComponent>
            })}
            <h1 className="text-xl font-bold my-5">ดูรายละเอียดกิจกรรม</h1>
            {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13'].map((value,index) => {
                return <ListBackground key={index} act={value} navigate={() => pushNavigate(`${value}/${id}`)}></ListBackground>
            })}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ResultPage;
