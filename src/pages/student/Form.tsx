import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  useIonAlert,
  IonIcon,
  useIonRouter,
  SelectChangeEventDetail,
  useIonViewWillEnter
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { useParams } from "react-router";
import activityType from "../../redux/activityType";
import FormLayoutOutreach from "../../components/FormsLayout/FormLayoutOutreach";
import FormLayoutBook from "../../components/FormsLayout/FormLayoutBook";
import FormLayoutCamp from "../../components/FormsLayout/FormLayoutCamp";
import FormLayoutVisit from "../../components/FormsLayout/FormLayoutVisit";
import FormLayoutLecture from "../../components/FormsLayout/FormLayoutLecture";
import FormLayoutClub from "../../components/FormsLayout/FormLayoutClub";
import FormLayoutExercise from "../../components/FormsLayout/FormLayoutExercise";
import FormLayoutMeet from "../../components/FormsLayout/FormLayoutMeet";
import React, { useState, useEffect } from "react";
import { ActData, ValidateAct, StudentUser } from "../../redux/type";
import { RootState, AppDispatch } from "../../redux/store";
import { useSelector, useDispatch } from 'react-redux'
import axios from "axios";
import { fetchUserBytoken } from "../../redux/features/UserDataSlice";

const FormPage: React.FC = () => {
  const router = useIonRouter();
  const { form, id } = useParams<{ form: string, id : string }>();
  const userData = useSelector((state: RootState) => state.userData)
  let student = userData.user as StudentUser
  const activities = useSelector((state: RootState) => state.actData.data)
  const [read, setRead] = useState(false)
  const [actData, setActData] = useState<ActData>({
    act_id: 0,
    act_type: '',
    act_type_name: '',
    std_id: '',
    act_date: '',
    act_head: '',
    act_print: '',
    act_hours: 0,
    act_places: '',
    act_details: '',
    act_feels: '',
    act_time_starts: '',
    act_time_ends: '',
    std_firstname: '',
    std_lastname: '',
    std_classroom: '',
    std_number: 0,
    std_dormitory: '',
    act_advices: '',
    tch_firstname: '',
    tch_lastname: '',
    act_advices_date: '',
    flag: 0
  })
  const [validation, setValidation] = useState<ValidateAct>({
    act_date: false,
    act_head: false,
    act_print: false,
    act_hours: false,
    act_places: false,
    act_details: false,
    act_feels: false,
    act_time_starts: false,
    act_time_ends: false
  })
  const dispatch = useDispatch<AppDispatch>()
  const options = [
    "ชุมนุมวิชาการ",
    "ชุมนุมสังคมศึกษา ภาษา ศาสนา ศิลปวัฒนธรรมและโบราณคดี",
    "ชุมนุมกีฬาและการออกกำลังกาย",
    "ชุมนุมกิจกรรมอื่น ๆ"
  ]
  const [option, setOption] = useState(0)
  const [present] = useIonAlert();

  useEffect(() => {
    dispatch(fetchUserBytoken('test@gmail.com'))
  }, [dispatch])

  const checkStatus = (flag: number) => {
    if (Number(flag) === 1 || Number(flag) === 3) {setRead(true)}
  }

  useIonViewWillEnter(() => {
    let newActData: any = {...actData}
    if (id) {
      const selected = activities.filter((value) => value.act_id.toString() === id)[0]
      checkStatus(selected.flag)
      if (['03', '11'].includes(selected.act_type)) {
        newActData['act_date'] = selected.act_date.slice(0,4)
      } else {
        newActData['act_date'] = selected.act_date
      }
      newActData['act_id'] = selected.act_id
      newActData['act_type'] = selected.act_type
      newActData['act_head'] = selected.act_head
      newActData['act_print'] = selected.act_print
      newActData['act_hours'] = selected.act_hours
      newActData['act_places'] = selected.act_places
      newActData['act_details'] = selected.act_details
      newActData['act_feels'] = selected.act_feels
      newActData['act_time_starts'] = selected.act_time_starts
      newActData['act_time_ends'] = selected.act_time_ends
      newActData['flag'] = selected.flag
    } else {
      newActData['std_id'] = student.std_id
      newActData['std_firstname'] = student.firstname
      newActData['std_lastname'] = student.lastname
      newActData['std_classroom'] = student.classroom
      newActData['std_number'] = student.number
      newActData['std_dormitory'] = student.dormitory
      newActData['act_type'] = form
      newActData['act_type_name'] = activityType[form]
    }
    setActData(newActData)
  })

  const selectForm = (id: string) => {
    switch (id) {
      case '01': 
      case '02':
        return <FormLayoutOutreach onChangeHandler={onChangeActData} onChangeAreaHandler={onChangeAreaActData} validation={validation} data={actData} read={read}></FormLayoutOutreach>;
      case '03' :
        return <FormLayoutBook onChangeHandler={onChangeActData} onChangeAreaHandler={onChangeAreaActData} validation={validation} data={actData} read={read}></FormLayoutBook>
      case '04' :
      case '05' :
        return <FormLayoutCamp onChangeHandler={onChangeActData} onChangeAreaHandler={onChangeAreaActData} validation={validation} data={actData} read={read}></FormLayoutCamp>
      case '06' :
      case '07' :
        return <FormLayoutVisit onChangeHandler={onChangeActData} onChangeAreaHandler={onChangeAreaActData} validation={validation} data={actData} read={read}></FormLayoutVisit>
      case '08' :
      case '09' :
      case '10' :
        return <FormLayoutLecture onChangeHandler={onChangeActData} onChangeAreaHandler={onChangeAreaActData} validation={validation} data={actData} read={read}></FormLayoutLecture>
      case '11' :
        return <FormLayoutClub onChangeHandler={onChangeActData} onChangeAreaHandler={onChangeAreaActData} onChangeSelectHandler={onChangeSelectActData} validation={validation} data={actData} read={read}></FormLayoutClub>
      case '12' :
        return <FormLayoutExercise onChangeHandler={onChangeActData} validation={validation} data={actData} read={read}></FormLayoutExercise>
      case '13' :
        return <FormLayoutMeet onChangeHandler={onChangeActData} validation={validation} data={actData}></FormLayoutMeet>
      default:
        return <div></div>;
    }
  };

  const navigateBack = () => {
    if (router.canGoBack()) {
      router.goBack();
    }
  };

  const pushNavigate = (path: string) => {
    router.push(path, "forward", "push");
  }

  const onChangeActData = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newActData: any = {...actData}
    let newValidation: any = {...validation}
    if (event.target.name === 'act_hours') {
      newActData[event.target.name] = parseInt(event.target.value)
    } else {
      newActData[event.target.name] = event.target.value
    }
    if (event.target.value === '') {
      newValidation[event.target.name] = true
    } else if (event.target.name === 'act_hours' && newActData['act_hours'] === 0) {
      newValidation['act_hours'] = true
    } else {
      newValidation[event.target.name] = false
    }
    if (newActData['act_type'] == '12') {
      if (newActData['act_time_starts'].length == 5) {
        newActData['act_time_starts'] = newActData['act_time_starts']+":00"
      } else if (newActData['act_time_ends'].length == 5) {
        newActData['act_time_ends'] = newActData['act_time_ends']+":00"
      }
      if (newActData['act_time_starts'] !== '' && newActData['act_time_ends'] !== '') {
        newActData['act_hours'] = calTime(newActData['act_time_starts'], newActData['act_time_ends'])
      }
    }
    setValidation(newValidation)
    setActData(newActData)
  }

  const onChangeAreaActData = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newActData: any = {...actData}
    let newValidation: any = {...validation}
    newActData[event.target.name] = event.target.value
    if (newActData[event.target.name] === '') {
      newValidation[event.target.name] = true
    } else {
      newValidation[event.target.name] = false
    }
    setValidation(newValidation)
    setActData(newActData)
  }

  const onChangeSelectActData = (event: CustomEvent<SelectChangeEventDetail>) => {
    let newActData: any = {...actData}
    let newValidation: any = {...validation}
    newActData['act_places'] = event.detail.value
    if (newActData['act_places'] === '') {
      newValidation['act_places'] = true
    } else {
      newValidation['act_places'] = false
    }
    setValidation(newValidation)
    setActData(newActData)
  }

  const selectField = () => {
    if (['01', '02'].includes(actData.act_type)) {
      return ['act_date', 'act_hours', 'act_places', 'act_details', 'act_feels']
    } else if (actData.act_type == '03') {
      return ['act_head', 'act_date', 'act_hours', 'act_print', 'act_places', 'act_details', 'act_feels']
    } else if (['04', '05'].includes(actData.act_type)) {
      return ['act_head', 'act_places', 'act_details', 'act_feels']
    } else if (['06', '07'].includes(actData.act_type)) {
      return ['act_head', 'act_date', 'act_places', 'act_details', 'act_feels']
    } else if (['08', '09', '10'].includes(actData.act_type)) {
      return ['act_head', 'act_date', 'act_details', 'act_feels']
    } else if (actData.act_type == '11') {
      return ['act_head', 'act_date', 'act_hours', 'act_places', 'act_details', 'act_feels']
    } else if (actData.act_type == '12') {
      return ['act_details', 'act_time_starts', 'act_time_ends']
    } else if (actData.act_type == '13') {
      return ['act_date', 'act_details']
    }
  }

  const validate = async () => {
    const asArray = Object.entries(actData);
    const field = selectField()
    const filtered = asArray.filter(([key, value]) => field?.includes(key) && (value == '' || value == 0));
    let i = 0
    let newValidation: any = {...validation}
    filtered.forEach((element) => {
      newValidation[element[0]] = true
      i++
    });
    setValidation(newValidation)
    if (i==0) {
      return false
    } else {
      return true
    }
  }

  const calTime = (start: string, end: string) => {
    const dateEnd = parseInt((new Date("2020-01-01 "+end).getTime()/1000).toFixed(0))
    const dateStart = parseInt((new Date("2020-01-01 "+start).getTime()/1000).toFixed(0))
    return (dateEnd - dateStart)/3600
  }

  const onRecord = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    validate().then( async (vd) => {
      if (!vd) {
        let path = ""
        if (id) { path = "update-act" } else { path = "record" }
        const sendData = {...actData}
        if ((['03', '11'].includes(actData.act_type)) && actData.act_date.length === 4) 
        { sendData['act_date'] = actData.act_date+"-00-00" }
        console.log(sendData)
        await axios.post(`http://www.zp11489.tld.122.155.167.85.no-domain.name/www/${path}.php`, JSON.stringify(sendData))
        .then(res => {
          console.log(res)
          present({
            header: 'ต้องการส่งเลยหรือไม่ ?',
            buttons: [
              { text: 'Cancel', handler: async () => {
                  navigateBack()
              }},
              { text: 'Ok', handler: async () => {
                  pushNavigate('send/'+res.data.act_id)
              } },
            ],
          })
        })
        .catch(err => {
          console.log(err)
        })
      }
    })
  }

  const onDelete = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    console.log(actData.act_id)
    await axios.post(`http://www.zp11489.tld.122.155.167.85.no-domain.name/www/delete-act.php`, JSON.stringify({id : actData.act_id}))
    .then(res => {
      console.log(res)
      navigateBack()
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className="flex py-3 pl-5">
            <div onClick={navigateBack} className="mt-2">
              <IonIcon src={chevronBack}></IonIcon>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="container mx-auto p-5">
        <form  onSubmit={(e) => onRecord(e)}>
            <h1 className="font-bold text-xl mb-2">{activityType[form]}</h1>
            {selectForm(form)}
            {!read ? <button type="submit" className="mt-3 bg-gradient-to-r from-pccp-light-orange to-pccp-blue w-full rounded-lg h-12 font-bold">บันทึก</button> : ""}
        </form>
        {id && !read && <div onClick={e => onDelete(e)} className="mt-3 border-2 border-danger text-danger text-center grid content-center w-full rounded-lg h-12 font-bold">ลบ</div>}
        </div>
      </IonContent>
    </IonPage>
  );
};
export default FormPage;
