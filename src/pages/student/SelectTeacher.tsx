import {
  IonPage,
  IonContent,
  IonToolbar,
  IonIcon,
  IonHeader,
  useIonViewDidEnter,
  IonList,
  IonItem
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { useIonRouter } from "@ionic/react";
import axios from "axios";
import { useState } from "react";
import blank from '../../assets/blankprofile.png'
import { useParams } from "react-router";

const SelectTeacherPage: React.FC = () => {
    const [teachers, setTeachers] = useState<Array<any>>()
    const { id } = useParams<{ id : string }>();
    const act_ids = id.split("&")
    const router = useIonRouter();

    const Back = () => {
        if (router.canGoBack()) {
          router.goBack();
        }
    };

  useIonViewDidEnter(() => {
    console.log(act_ids)
    teacher()
  })

  const teacher = async () => {
    await axios.get('http://www.zp11489.tld.122.155.167.85.no-domain.name/www/teacher.php')
    .then((res) => {
        setTeachers(res.data)
    })
  }

  const onSelect = async (teacher: any) => {
    act_ids.forEach( async (id, index) => {
        await axios.post('http://www.zp11489.tld.122.155.167.85.no-domain.name/www/send.php', 
        JSON.stringify({
            act_id: id,
            flag: 1,
            tch_id: teacher.user_id,
            tch_firstname: teacher.tch_firstname,
            tch_lastname: teacher.tch_lastname
        }))
        .then((res) => {
            console.log(res)
            if (index === act_ids.length-1) {
                Back()
            }
        })
    })
  }

  const linkpic = 'http://www.zp11489.tld.122.155.167.85.no-domain.name/www/profile/'

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
                    return <div className="h-12 grid grid-cols-6 flex items-center gap-x-3" key={index}>
                        <div className="col-span-1">
                            {teacher.tch_img? <img src={linkpic+teacher.tch_img+'.jpg'} className="w-8 h-8 rounded-full"/>
                            : 
                            <img src={blank} className="w-8 h-8 rounded-full"/> }
                        </div>
                        <div className="col-span-4">
                            <p className="truncate">{teacher.tch_firstname} {teacher.tch_lastname}</p>
                        </div>
                        <div className="flex justify-end col-span-1">
                            <button className="rounded shadow bg-pccp-light-orange w-full"
                            onClick={e => onSelect(teacher)}>ส่ง</button>
                        </div>
                    </div>
                })}
            </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SelectTeacherPage;
