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
import React, { useState, useEffect, useContext } from "react";
import { ActData, ValidateAct, StudentUser } from "../../redux/type";
import { RootState, AppDispatch } from "../../redux/store";
import { useSelector, useDispatch } from 'react-redux'
import axios from "axios";
import { fetchUserBytoken } from "../../redux/features/UserDataSlice";
import { AuthContext } from "../../Firebase/AuthContext";
import { initialActData, initialvalidateAct } from "../../redux/initialState";
import { auth } from "../../Firebase/firebase";
import { Storage } from '@capacitor/storage';

const FormPage: React.FC = () => {
  const router = useIonRouter();
  const { form, id } = useParams<{ form: string, id : string }>();
  const userData = useSelector((state: RootState) => state.userData)
  //const token = auth.currentUser?.getIdToken()
  //const uid = auth.currentUser?.uid
  let student = userData.user as StudentUser
  const activities = useSelector((state: RootState) => state.actData.data)
  const [read, setRead] = useState(false)
  const [flag, setFlag] = useState("PENDING")
  const user = useContext(AuthContext)
  const [actData, setActData] = useState<ActData>(initialActData)
  const [validation, setValidation] = useState<ValidateAct>(initialvalidateAct)
  const dispatch = useDispatch<AppDispatch>()
  const [present] = useIonAlert();
  const [school, setSchool] = useState('')
  const getSchool = async () => {
    const sch = await Storage.get({ key: 'userSchool' });
    setSchool(JSON.parse(JSON.stringify(sch.value)))
  }

  useEffect(() => {
    getSchool()
    dispatch(fetchUserBytoken([user?.email, school]))
  }, [dispatch])

  const checkStatus = (flag: string) => {
    if (flag === "ACCEPT") {setRead(true)}
  }

  useIonViewWillEnter(() => {
    let newActData: any = {...actData}
    if (id) {
      const selected = activities.filter((value) => value.act_id.toString() === id)[0]
      checkStatus(selected.flag)
      setFlag(selected.flag)
      if (['03', '11'].includes(selected.act_type)) {
        newActData['act_data']['act_date'] = selected.act_data?.act_date?.slice(0,4)
      } else {
        newActData['act_data']['act_date'] = selected.act_data?.act_date
      }
      newActData['act_id'] = selected.act_id
      newActData['act_type'] = selected.act_type
      newActData['act_data'] = selected.act_data
      newActData['flag'] = selected.flag
    } else {
      newActData['std_id'] = student.std_id
      newActData['std_firstname'] = student.firstname
      newActData['std_lastname'] = student.lastname
      newActData['std_classroom'] = student.classroom
      newActData['std_number'] = student.number
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
        return <FormLayoutMeet onChangeHandler={onChangeActData} validation={validation} data={actData} read={read}></FormLayoutMeet>
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
    let newAct: any = {...actData}
    let newActData: any = {...actData.act_data}
    let newValidation: any = {...validation}
    if (event.target.name === 'act_hour') {
      newActData[event.target.name] = parseInt(event.target.value)
    } else {
      newActData[event.target.name] = event.target.value as string
    }
    if (event.target.value === '') {
      newValidation[event.target.name] = true
    } else if (event.target.name === 'act_hour' && newActData['act_hour'] === 0) {
      newValidation['act_hour'] = true
    } else {
      newValidation[event.target.name] = false
    }
    if (newActData['act_type'] == '12') {
      if (newActData['act_time_start'].length == 5) {
        newActData['act_time_start'] = newActData['act_time_start']+":00"
      } else if (newActData['act_time_end'].length == 5) {
        newActData['act_time_end'] = newActData['act_time_end']+":00"
      }
      if (newActData['act_time_start'] !== '' && newActData['act_time_end'] !== '') {
        newActData['act_hour'] = calTime(newActData['act_time_start'], newActData['act_time_end'])
      }
    }
    newAct.act_data = newActData
    setValidation(newValidation)
    setActData(newAct)
  }

  const onChangeAreaActData = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newAct: any = {...actData}
    let newActData: any = {...actData.act_data}
    let newValidation: any = {...validation}
    newActData[event.target.name] = event.target.value
    if (newActData[event.target.name] === '') {
      newValidation[event.target.name] = true
    } else {
      newValidation[event.target.name] = false
    }
    newAct.act_data = newActData
    setValidation(newValidation)
    setActData(newAct)
  }

  const onChangeSelectActData = (event: CustomEvent<SelectChangeEventDetail>) => {
    let newAct: any = {...actData}
    let newActData: any = {...actData.act_data}
    let newValidation: any = {...validation}
    newActData['act_place'] = event.detail.value
    if (newActData['act_place'] === '') {
      newValidation['act_place'] = true
    } else {
      newValidation['act_place'] = false
    }
    newAct.act_data = newActData
    setValidation(newValidation)
    setActData(newAct)
  }

  const selectField = () => {
    if (['01', '02'].includes(actData.act_type)) {
      return ['act_date', 'act_hour', 'act_place', 'act_detail', 'act_feel']
    } else if (actData.act_type == '03') {
      return ['act_head', 'act_date', 'act_hour', 'act_print', 'act_place', 'act_detail', 'act_feel']
    } else if (['04', '05'].includes(actData.act_type)) {
      return ['act_head', 'act_place', 'act_detail', 'act_feel']
    } else if (['06', '07'].includes(actData.act_type)) {
      return ['act_head', 'act_date', 'act_place', 'act_detail', 'act_feel']
    } else if (['08', '09', '10'].includes(actData.act_type)) {
      return ['act_head', 'act_date', 'act_detail', 'act_feel']
    } else if (actData.act_type == '11') {
      return ['act_head', 'act_date', 'act_hour', 'act_place', 'act_detail', 'act_feel']
    } else if (actData.act_type == '12') {
      return ['act_detail', 'act_time_start', 'act_time_end']
    } else if (actData.act_type == '13') {
      return ['act_date', 'act_detail']
    }
  }

  const validate = async () => {
    const asArray = Object.entries(actData.act_data);
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
    return Number(((dateEnd - dateStart)/3600).toFixed(2))
  }

  const onRecord = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    validate().then( async (vd) => {
      if (!vd) {
        let done_time = 0
        if (['01', '02'].includes(actData.act_type)) {
          done_time = actData.act_data?.act_hour as number
        } else {
          done_time = 1
        }
        let sendData = {
          act_type: actData.act_type,
          act_data: actData.act_data,
          act_done_time: done_time
        }
        if ((['03', '11'].includes(actData.act_type)) && actData.act_data?.act_date?.length === 4) 
        { sendData.act_data!.act_date = actData.act_data.act_date+"-00-00" }
        console.log(sendData)
        //setActData(initialActData)
        if (id) {
          let updateData = {
            act_data: sendData.act_data
          }
          console.log(updateData)
          let path = `https://w1fyg8naxk.execute-api.ap-northeast-2.amazonaws.com/Dev/${student.school}/${student.email}/rec/${id}`
          AxiosHttpMethod(updateData, path, "update")
        } else {
          let path = `https://w1fyg8naxk.execute-api.ap-northeast-2.amazonaws.com/Dev/${student.school}/${student.email}/rec`
          AxiosHttpMethod(sendData, path, "create")
        }
      }
    })
  }

  const AxiosHttpMethod = async (sendData:any, path:string, status:string) => {
      await axios.post(path, JSON.stringify(sendData))
      .then(res => {
        console.log(res)
        if (res.data === "Record is full") {
          fullAlert()
        } else {
          sendAlert(res, status)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const sendAlert = (res:any, status: string) => {
    present({
      header: 'ต้องการส่งเลยหรือไม่ ?',
      buttons: [
        { text: 'Cancel', handler: async () => {
            navigateBack()
        }},
        { text: 'Ok', handler: async () => {
          console.log(res.data[0].act_id)
            pushNavigate('send/'+res.data[0].act_id+"/"+status)
        } },
        ],
      })
  }

  const fullAlert = () => {
    present({
      header: 'บันทึกกิจกรรมครบแล้ว ไม่สามารถบันทึกเพิ่มได้',
      buttons: [
        { text: 'OK' },
        ],
      })
  }

  const onDelete = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    console.log(actData.act_id)
    await axios.post(`https://w1fyg8naxk.execute-api.ap-northeast-2.amazonaws.com/Dev/${student.school}/${student.email}/recDel/${id}`,
    )
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
        <form>
            <h1 className="font-bold text-xl mb-2">{activityType[form]}</h1>
            {selectForm(form)}
            {!read && flag!=="SEND" ? <div onClick={e => onRecord(e)} className="mt-3 border-2 border-success text-center text-success grid content-center w-full rounded-lg h-12 font-bold">บันทึก</div> : ""}
            {id && flag==="SEND" ? <div onClick={e => onRecord(e)} className="mt-3 border-2 border-primary text-center text-primary grid content-center w-full rounded-lg h-12 font-bold">เปลี่ยนแปลง</div> : ""}
        </form>
        {id && flag!=="ACCEPT" && <div onClick={e => onDelete(e)} className="mt-3 border-2 border-danger text-danger text-center grid content-center w-full rounded-lg h-12 font-bold">ลบ</div>}
        </div>
      </IonContent>
    </IonPage>
  );
};
export default FormPage;
