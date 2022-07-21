import { IonPage, IonContent, IonHeader, IonToolbar, IonIcon, IonSelect, IonSelectOption, useIonAlert } from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { useIonRouter } from "@ionic/react";
import classroom from "../../redux/classroom";
import ListComponent from "../../components/ListComponent";
import axios from "axios";
import { useState, useEffect } from "react";
import StateSvg from '../../components/assets/stats-chart.svg';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { FileOpener } from '@awesome-cordova-plugins/file-opener'

const SearchPage: React.FC = () => {
    const router = useIonRouter()
    const navigateBack = () => {
        if (router.canGoBack()) {
          router.goBack();
        }
    };
    const [present] = useIonAlert();
    const [room, setRoom] = useState<string>()
    const [loading, setLoading] = useState(false)
    const [listName, setListName] = useState<Array<any>>()
    const getName = async () => {
        await axios.post('http://pcshsptsama.com/www/selectname.php',
        JSON.stringify({classroom: room}))
        .then((res) => {
            setListName(res.data)
        })
    }

    const writeSecretFile = async (filename: string, data: string) => {
      try {
        await Filesystem.mkdir({
          path: "report/",
          directory: Directory.Documents
        })
      } catch {
        try {
          await deleteSecretFile(filename)
          return await Filesystem.writeFile({
            path: 'report/'+filename,
            data: data,
            directory: Directory.Documents,
            encoding: Encoding.UTF8,
          });
        } catch {
          return await Filesystem.writeFile({
            path: 'report/'+filename,
            data: data,
            directory: Directory.Documents,
            encoding: Encoding.UTF8,
          });
        }
      }
    }

    const deleteSecretFile = async (filename: string) => {
      await Filesystem.deleteFile({
        path: "report/"+filename,
        directory: Directory.Documents,
      });
    };

    const getClassPoints = async () => {
      if (!loading) {
        setLoading(true)
        await axios.post("http://pcshsptsama.com/www/achieve.php", JSON.stringify({classroom: room}))
        .then((res) => {
          setLoading(false)
        })
      }
    }

    const download = async () => {
      //console.log("download")
      if (room) {
        const url = 'http://pcshsptsama.com/www/report/download.php';
        const filename = room[0]+"-"+room[2]+"-report.csv"
        console.log(filename)
        await axios.post(url, JSON.stringify({filename: filename})).then( async (res) => {
          //console.log(res.data)              
          const file = await writeSecretFile(filename, res.data as string)
          FileOpener.open(file!.uri, "text/csv")
          present({
            message: 'ดาวน์โหลดเสร็จสิ้น คุณสามารถดูรายละเอียดได้ที่ Documents Folder',
            buttons: [
              { text: 'OK'},
            ],
          })
        })
      }
    }

    const pushNavigate = (id: string) => {
        router.push('/search/'+id, 'forward', 'push')
    }

    useEffect(() => {
        getName()
        if (room != undefined) getClassPoints()
    }, [room])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{'--background' : '#CBD3FF'}}>
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
            <div className="font-bold text-lg mb-8">Activities</div>
            <div className={`mb-2 bg-pccp-light-orange
                rounded-lg p-3 grid grid-cols-2 flex items-center font-arthiti`}>
                <label>
                    เลือกห้องเรียน <span className="text-red-600">*</span>
                </label>
                <IonSelect
                    okText="ตกลง"
                    cancelText="ยกเลิก"
                    style={{'--placeholder-opacity': '100%'}}
                    onIonChange={(e) => {
                        setRoom(e.detail.value)
                    }}
                > 
                {classroom.map((option, index) => {
                    return <IonSelectOption key={index} value={option}>{option}</IonSelectOption>
                })}
                </IonSelect>
            </div>
            {room && <div className="bg-gradient-to-r my-4 from-pccp-light-orange to-pccp-blue shadow-md rounded-lg p-0.5">
                <div className="bg-white h-full py-4 rounded-lg flex justify-center"
                onClick={() => {
                  if (!loading) download()
                }}>
                  <IonIcon
                    icon={StateSvg}
                  ></IonIcon>
                  <h1 className="text-center ml-3 font-bold text-transparent bg-clip-text bg-gradient-to-r from-pccp-orange to-pccp-blue">
                      {loading ? 'Processing CSV file...' : 
                      <p>Dowload CSV file</p>
                      }
                  </h1>
                </div>
              </div>}
            <div className="grid grid-cols-1 divide-y">
            {
                listName?.map((student, index) => {
                    return <ListComponent label={student.std_firstname+" "+student.std_lastname} 
                    key={index} student={true} img={student.img_path} navigate={() => pushNavigate(student.std_ID)}
                    ></ListComponent>
                })
            }
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SearchPage;
