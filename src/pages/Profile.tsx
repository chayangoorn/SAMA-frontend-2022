import { IonPage,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonSelect,
  IonSelectOption,
  SelectChangeEventDetail,
  useIonAlert,
  useIonViewWillEnter,
  useIonActionSheet
 } from "@ionic/react";
import FloatingInput from "../components/FloatingInput";
import MenuList from "../components/MenuList";
import { AppDispatch, RootState } from '../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useContext, useState, useRef } from "react";
import { fetchUserBytoken } from "../redux/features/UserDataSlice";
import { AuthContext } from "../Firebase/AuthContext";
import { StudentUser, TeacherUser } from "../redux/type";
import blank from '../assets/blankprofile.png'
import classroom from "../redux/classroom";
import axios from "axios";
import { person } from "ionicons/icons";
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@awesome-cordova-plugins/file-transfer'
import { Camera, CameraSource, CameraResultType, ImageOptions } from '@capacitor/camera'
import { auth } from "../Firebase/firebase";
import { Storage } from '@capacitor/storage';

const ProfilePage: React.FC = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(undefined);
  const [present] = useIonAlert()
  const token = auth.currentUser?.getIdToken()
  const uid = auth.currentUser?.uid
  const [pic, setPic] = useState<string>()
  const [school, setSchool] = useState('')
  const [presentAction] = useIonActionSheet()
  const dispatch = useDispatch<AppDispatch>()
  const userData = useSelector((state: RootState) => state.userData)
  let student = userData.user as StudentUser
  let teacher = userData.user as TeacherUser
  const user = useContext(AuthContext);
  const getSchool = async () => {
    const sch = await Storage.get({ key: 'userSchool' });
    setSchool(JSON.parse(JSON.stringify(sch.value)))
  }
  const [stdProfile, setStdProfile] = useState({
    firstname: student.firstname,
    lastname: student.lastname,
    classroom: student.classroom,
    number: student.number,
    flag: 'STD',
    method: "update-profile"
  });
  const [tchProfile, setTchProfile] = useState({
    firstname: teacher.firstname,
    lastname: teacher.lastname,
    flag: 'TCH',
    method: "update-profile"
  });
  const [validate, setValidate] = useState({
    firstname: false,
    lastname: false,
    classroom: false,
    number: false,
    dormitory: false,
  });

  useEffect(() => {
    getSchool()
    dispatch(fetchUserBytoken([user?.email, school]))
  }, [])

  const validateForm = async () => {
    let asArray = []
    if (Number(userData.user.flag) === 0) {
      asArray = Object.entries(stdProfile);
    } else {
      asArray = Object.entries(stdProfile);
    }
    const filtered = asArray.filter(([key, value]) => value == '');
    let i = 0
    let newValidation: any = {...validate}
    filtered.forEach((element) => {
      newValidation[element[0]] = true
      i++
    });
    setValidate(newValidation)
    if (i==0) {
      return false
    } else {
      return true
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validateForm().then(async (val) => {
      if (!val) {
        let data:any = {}
        if (userData.user.flag === "STD") {data = stdProfile} else {data = tchProfile}
        console.log(data)
        //data.token = token; data.uid = uid
        /*
          await axios.post('https://pcshsptsama.com/www/register.php', JSON.stringify(data))
          .then((res) => {
            present({
              message: res.data,
              buttons: [
                {text: 'OK', handler: (async () => {
                  modal.current?.dismiss()
                })}
              ],
            })
          })
          .catch((err) => {
            present({
              message: err,
              buttons: [
                {text: 'OK'}
              ],
            })
          })
          */
      }
    })
  };

  const onChangeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(userData.user.flag) === 0) {
      let newProfile: any = { ...stdProfile };
      let newValidate: any = {...validate}
      newProfile[event.target.name] = event.target.value;
      if (newProfile[event.target.name] === "") {
        newValidate[event.target.name] = true
      } else {
        newValidate[event.target.name] = false
      }
      setValidate(newValidate)
      setStdProfile(newProfile)
    } else {
      let newProfile: any = { ...tchProfile };
      let newValidate: any = {...validate}
      newProfile[event.target.name] = event.target.value;
      if (newProfile[event.target.name] === "") {
        newValidate[event.target.name] = true
      } else {
        newValidate[event.target.name] = false
      }
      setValidate(newValidate)
      setTchProfile(newProfile)
    }
    
  }

  const onChangeSelectClassHandler = (event: CustomEvent<SelectChangeEventDetail>) => {
    let newProfile: any = {...stdProfile}
    let newValidate: any = {...validate}
    newProfile['classroom'] = event.detail.value
    if (newProfile['classroom'] === "") {
      newValidate['classroom'] = true
    } else {
      newValidate['classroom'] = false
    }
    setValidate(newValidate)
    setStdProfile(newProfile)
  }

  const changeProfile = () => {
    presentAction({
      buttons: [{
        text: " Change Display Profile",
        icon: person,
        handler: () => {
          let option: ImageOptions = {
            source: CameraSource.Photos,
            resultType: CameraResultType.DataUrl
          }
          Camera.getPhoto(option).then(async (result) => {
              let fileTransfer: FileTransferObject
              fileTransfer = FileTransfer.create() 
              let option: FileUploadOptions = {
                fileKey: 'file',
                fileName: userData.user.email+"."+result.format,
                chunkedMode: false,
                headers: {},
                mimeType: "image/"+result.format
              }
              fileTransfer.upload(result.dataUrl as string, "https://pcshsptsama.com/www/uppic.php", option)
              .then(async (res) => {
                let data: any = {
                  id: userData.user.email,
                  flag: userData.user.flag,
                }
                //data.uid = uid
                //data.token = token
                await axios.post("https://pcshsptsama.com/www/upprofile.php", JSON.stringify(data))
                .then((res) => {
                  present({
                    message: "เปลี่ยนรูปโปรไฟล์สำเร็จ",
                    buttons: ["OK"]
                  })
                })
              }, (err) => {
                alert(JSON.stringify(err))
              })
            })
        }
      }],
    })
  }

  const linkpic = 'https://pcshsptsama.com/www/profile/'

  return (
    <IonPage ref={page}>
      <IonContent fullscreen>
        <div className="container mx-auto p-5">
          <div className="flex justify-center mb-5 mt-8">
              <div className="w-40 h-40 blur-lg rounded-full bg-gradient-to-r from-pccp-light-orange to-pccp-blue grid place-items-center">
                <img className="object-cover w-32 h-32 rounded-full inset-0" src={ userData.user.img_path ?
                  linkpic+userData.user.img_path : blank
                  }/>
              </div>
          </div>
          <div className="text-center font-bold">{school}</div>
          <div className="text-center text-xl font-bold">
            {
              userData.user.flag === "STD" ? 
              <p>{student.firstname} {student.lastname}</p> : <p>{teacher.firstname} {teacher.lastname}</p>
            }
          </div>
          {
            userData.user.flag === "STD" && 
            <div className="flex justify-center">
              <div className="text-sm flex justify-between w-1/2 mb-8">
                <div>M.{student.classroom}</div>
                <div>No.{student.number}</div>
                <div>ID: {student.std_id}</div>
              </div>
            </div>
          }
          <img src={pic} />
          <div className="mx-3 mt-5">
            <MenuList email={userData.user.email} user_id={userData.user.email} flag={userData.user.flag.toString()}></MenuList>
          </div>
        </div>
        <IonModal ref={modal} trigger="open-modal">
          <IonHeader>
            <IonToolbar>
              <div className="flex pb-2 pl-2">
                <div onClick={() => modal.current?.dismiss()} className="mt-2">
                  Cancel
                </div>
              </div>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <h1 className="text-lg font-bold mb-3">แก้ไขข้อมูลส่วนตัว</h1>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="p-6 rounded-lg shadow-lg bg-white mb-5">
              <div className="grid grid-cols-2 gap-3 mb-8">
                <div className="form-group">
                  <FloatingInput
                    label="Firstname (TH)"
                    type="text"
                    name="firstname"
                    value={ userData.user.flag === "STD" ?
                      stdProfile.firstname : tchProfile.firstname
                    }
                    onChangeHandler={onChangeInputHandler}
                    err={validate.firstname}
                  ></FloatingInput>
                  {validate.firstname && <label className="text-red-400 text-xs">please fill firstname</label>}
                </div>
                <div className="form-group">
                  <FloatingInput
                    label="Lastname (TH)"
                    type="text"
                    name="lastname"
                    value={ userData.user.flag === "STD" ?
                      stdProfile.lastname : tchProfile.lastname
                    }
                    onChangeHandler={onChangeInputHandler}
                    err={validate.lastname}
                  ></FloatingInput>
                  {validate.lastname && <label className="text-red-400 text-xs">please fill lastname</label>}
                </div>
              </div>
              {userData.user.flag === "STD" && 
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="form-group text-sm">
                    <IonSelect
                      okText="ตกลง"
                      cancelText="ยกเลิก"
                      style={{
                        '--placeholder-opacity': '100%',
                        "--padding-bottom":"5px",
                        "--padding-top":"0",
                        "--padding-start":"0",
                      }}
                      placeholder={stdProfile.classroom}
                      onIonChange={(e) => onChangeSelectClassHandler(e)}> 
                      {classroom.map((option, index) => {
                        return <IonSelectOption key={index} value={option}>{option}</IonSelectOption>
                      })}
                    </IonSelect>
                    <hr className={`${validate.dormitory ? "border-red-400" : "border-black"} border-1`}/>
                    {validate.classroom && <label className="text-red-400 text-xs">please fill classroom</label>}
                  </div>
                 {/* <div className="text-sm">
                    <IonSelect placeholder={stdProfile.dormitory}
                      onIonChange={e => onChangeSelectDormHandler(e)}
                      style={{
                        '--placeholder-opacity': '100%',
                        "--padding-bottom":"5px",
                        "--padding-top":"0",
                        "--padding-start":"0",
                      }}>
                      <IonSelectOption value="เขียว">เขียว</IonSelectOption>
                      <IonSelectOption value="ม่วง">ม่วง</IonSelectOption>
                      <IonSelectOption value="ชมพู">ชมพู</IonSelectOption>
                      <IonSelectOption value="ฟ้า">ฟ้า</IonSelectOption>
                      <IonSelectOption value="เหลือง">เหลือง</IonSelectOption>
                      <IonSelectOption value="น้ำตาล">น้ำตาล</IonSelectOption>
                    </IonSelect>
                    <hr className={`${validate.dormitory ? "border-red-400" : "border-black"} border-1`}/>
                    {validate.dormitory && <label className="text-red-400 text-xs">please select dormitory</label>}
                    </div> */}
                </div>
              }
              {userData.user.flag === "STD" && 
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="form-group">
                  <FloatingInput
                    label="Number"
                    type="number"
                    name="number"
                    value={stdProfile.number.toString()}
                    onChangeHandler={onChangeInputHandler}
                    err={validate.number}
                  ></FloatingInput>
                  {validate.number && <label className="text-red-400 text-xs">please fill number</label>}
                </div>
              </div>
              }
              
            </div>
            <button
              type="submit"
              className="
                w-full
                px-6
                py-2.5
                bg-gradient-to-r from-pccp-orange to-pccp-blue
                text-white
                font-medium
                text-lg
                leading-tight
                rounded-lg
                shadow-lg
                transition
                duration-150
                ease-in-out"
            >
              บันทึกข้อมูล
            </button>
          </form>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};
export default ProfilePage;
