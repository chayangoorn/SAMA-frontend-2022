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

  const checkIfImageExists = (url:string) => {
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
  }

  const [user, setUser] = useState<StudentUser>()
  const getStudent = async () => {
    await axios.get('https://2r5zg4uzoh.execute-api.ap-northeast-2.amazonaws.com/Dev/data/'+id)
    .then((res) => {
        const userData: StudentUser = {
            std_id: res.data[0].id,
            firstname: res.data[0].std_firstname,
            lastname: res.data[0].std_lastname,
            classroom: res.data[0].std_classroom,
            number: res.data[0].std_number,
            img_path: '',
            email: res.data[0].std_email,
            school: res.data[0].school,
            flag: res.data[0].flag
        }
        setUser(userData)
    })
  }

  const linkpic = (school:string, email:string) => {
    return 'https://sama-data-bucket.s3.ap-northeast-2.amazonaws.com/'+school+"/profile_pic/"+email?.split("@")[0]+"."+email?.split("@")[1]+".jpeg"
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
            <img src={ checkIfImageExists(linkpic(user?.school as string, user?.email as string)) ?
                linkpic(user?.school as string, user?.email as string) : blank
            } className="w-40 h-40 rounded-full border-white border-8 -mt-10 -ml-10"/>
            <div>
              <p className="pt-4 ml-5 font-bold text-lg">{user?.firstname} {user?.lastname}</p>
              <p className="ml-5 text-sm">M.{user?.classroom} No.{user?.number} ID:{user?.std_id}</p>
            </div>
          </div>
        </div>
        <div className="mx-auto container p-5 px-8 mt-8">
            <h1 className="text-xl font-bold mb-2 mt-2">สถิติการทำกิจกรรม</h1>
            {['01', '02', '03', '11', '12', '13'].map((type, index) => {
               return <ListComponent key={index} label={activityType[type]} point={achieve.points[type][2]} type={labels[index]} student={false}></ListComponent>
            })}
            <h1 className="text-xl font-bold my-5">ดูรายละเอียดกิจกรรม</h1>
            {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13'].map((value,index) => {
                return <ListBackground key={index} act={value} navigate={() => pushNavigate(`${user?.school}/${value}/${id}`)}></ListBackground>
            })}
        </div><br /><br />
      </IonContent>
    </IonPage>
  );
};

export default ResultPage;
