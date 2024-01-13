import { IonPage, IonContent, useIonAlert, IonSelect, IonSelectOption, SelectChangeEventDetail } from "@ionic/react";
import React, { useState } from "react";
import { auth } from "../Firebase/firebase";
import { useDispatch } from "react-redux";
import axios from "axios";
import { StudentUser, TeacherUser } from "../redux/type";
import { changeData } from "../redux/features/UserDataSlice";
import { useHistory } from "react-router";
import FloatingInput from "../components/FloatingInput";
import pic from '../assets/logo.jpg'
import { Storage } from '@capacitor/storage';

const LoginPage: React.FC = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [present] = useIonAlert()
    const [login, setLogin] = useState({
      email: '',
      password: '',
      school: '',
    })
    const [validate, setValidate] = useState({
      email: false,
      password: false,
      school: false
    })

    const replace = (path: string) => {
      history.replace(path)
    }

    const setEmail = async (email: string) => {
      await Storage.remove({ key: 'userEmail' });
      await Storage.set({
        key: 'userEmail',
        value: email,
      });
    };

    const setSchool = async (school: string) => {
      await Storage.remove({ key: 'userSchool' });
      await Storage.set({
        key: 'userSchool',
        value: school,
      });
    };

    const errorAlert = () => {
      present({
        header: 'Sign in error',
        message: 'email or password has incorrect please check again',
        buttons: [
          {text: 'OK'}
        ]
      })
    }

    const errorFillAlert = () => {
      present({
        header: 'Sign in error',
        message: 'Please fill sign in form completely',
        buttons: [
          {text: 'OK'}
        ]
      })
    }

    const onChangeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      let newLogin: any = { ...login };
      let newValidate: any = {...validate}
      newLogin[event.target.name] = event.target.value;
      if (event.target.value === "") {
        newValidate[event.target.name] = true
      } else {
        newValidate[event.target.name] = false
      }
      setValidate(newValidate)
      setLogin(newLogin);
    };

    const onChangeSelectSchool = (event: CustomEvent<SelectChangeEventDetail>) => {
      let newLogin: any = {...login}
      let newValidation: any = {...validate}
      newLogin['school'] = event.detail.value
      if (newLogin['school'] === '') {
        newValidation['school'] = true
      } else {
        newValidation['school'] = false
      }
      setValidate(newValidation)
      setLogin(newLogin)
      console.log(newLogin)
    }

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (login.school === '' && (login.email === '' || login.password === '')) {
        let newValidate: any = {...validate}
        newValidate['school'] = true
        setValidate(newValidate)
        errorFillAlert()
      } else if (login.email === '' || login.password === '') {
        errorFillAlert()
      } else {
        try {
          auth.signInWithEmailAndPassword(login.email, login.password)
          .then(res => {
            res.user!.getIdToken().then((token) => {
              const loginData = {
                email: res.user?.email,
                //uid: res.user?.uid,
                //token: token
              }
              axios.get('https://2r5zg4uzoh.execute-api.ap-northeast-2.amazonaws.com/Dev/data/'+loginData.email)
              .then( async user => {
                let data: StudentUser | TeacherUser
                let userdata = user.data[0]
                if (userdata['type'] === "STD") {
                  data = {
                    std_id: userdata['std_ID'],
                    firstname: userdata['firstname'],
                    lastname: userdata['lastname'],
                    classroom: userdata['classroom'],
                    number: userdata['number'],
                    email: userdata["std_email"],
                    school: userdata["school"],
                    img_path: "",
                    flag: userdata['type']
                  }
                  console.log(data)
                  dispatch(changeData(data))
                  await setEmail(data.email)
                  await setSchool(login.school)
                  replace('/home')
                  
                } else {
                  data = {
                    firstname: userdata["tch_firstname"],
                    lastname: userdata["tch_lastname"],
                    img_path: "",
                    email: userdata["tch_email"],
                    school: userdata["school"],
                    flag: userdata["type"]
                  }
                  console.log(data)
                  dispatch(changeData(data))
                  await setEmail(data.email)
                  await setSchool(login.school)
                  replace('/check')
                  
                }
                
                })
            })
        }).catch((err) => {
          errorAlert()
        })
      } 
        catch (error) {
            errorAlert()
      }
      } 
    
  }

  const sendResetPassword = async () => {
    present({
      header: "Forget Password ?",
      message: "กรุณาใส่อีเมลที่ต้องการเปลี่ยนรหัสผ่าน",
      inputs: [{
        type: 'email',
        name: 'email',
        placeholder: 'Email'
      }],
      buttons: [{
        text: "OK", handler: async (alertData) => {
          await auth.sendPasswordResetEmail(alertData['email'])
          .then(() => {
             present({
              message: "กรุณาตรวจสอบอีเมลของคุณเพื่อเปลี่ยนรหัสผ่านใหม่",
              buttons: [{text: "OK", handler: async () => {
                  await Storage.remove({ key: 'userEmail' });
                  await auth.signOut()
              }}]
            }) 
          })
          .catch(() => {
            present({
              message: "รูปแบบอีเมลไม่ถูกต้องหรือไม่มีอีเมลนี้ในระบบ กรุณาตรวจสอบอีกครั้ง",
              buttons: [{text: "OK"}]
            }) 
          })
        }
      }, {text: "Cancel"}]
    })

        
}

  return (
    <IonPage>
      <IonContent>
        <div className="p-8 bg-gradient-to-tr from-pccp-light-orange to-pccp-light-blue min-h-full max-h-max">
            <form onSubmit={e => {handleLogin(e)}} className="w-full">
              <div className="grid justify-items-center my-5 mb-8">
                <img src={pic} className="w-1/2 mt-8 rounded-full shadow-lg" />
              </div>
              <div className="text-center font-bold text-4xl">SAMA</div>
              <div className="text-center font-bold mb-12">Student Activity Management Application</div>
              <div className="w-full p-6 bg-white mb-4 rounded-lg shadow-lg">
                <p className="font-bold">เลือกโรงเรียน</p>
                <IonSelect onIonChange={e => onChangeSelectSchool(e)}>
                  <IonSelectOption>PCSHS-PT</IonSelectOption>
                  <IonSelectOption>PCSHS-LOEI</IonSelectOption>
                </IonSelect>
                {validate.school && <label className="text-red-400 text-xs">please select school</label>}
              </div>
              <div className="block p-6 rounded-lg shadow-lg bg-white">
                <div className="font-bold mb-3">เข้าสู่ระบบ</div>
              <div className="mb-6">
                <FloatingInput label="Email" type="text" name="email" onChangeHandler={onChangeInputHandler} err={validate.email}></FloatingInput>
                {validate.email && <label className="text-red-400 text-xs">please fill email</label>}
              </div>
              <div className="mb-6">
                <FloatingInput label="Password" type="password" name="password" onChangeHandler={onChangeInputHandler} err={validate.password}></FloatingInput>
                {validate.password && <label className="text-red-400 text-xs">please fill password</label>}
              </div>
              <div className="flex justify-between mb-6">
                <a
                  onClick={sendResetPassword}
                  className="text-pccp-orange transition duration-200 ease-in-out"
                >
                  Forgot password?
                </a>
              </div>
              </div>

              <button
                type="submit"
                className="
                    w-full
                    mt-5
                    px-6
                    py-2.5
                    bg-gradient-to-r from-pccp-orange to-pccp-blue
                    text-white
                    font-medium
                    text-lg
                    leading-tight
                    rounded-lg
                    shadow-md
                    transition
                    duration-150
                    ease-in-out"
              >
                Sign in
              </button>
              <div className="text-gray-800 mt-6 text-center">
                Not a member?{" "}
                <a
                  className="text-pccp-orange transition duration-200 ease-in-out"
                  href="/signup"
                >
                  Register
                </a>
              </div>
              <div className="text-center text-xs mt-2">@copyright 2023 ATELO Team</div>
            </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
