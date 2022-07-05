import { IonPage, IonContent, useIonAlert } from "@ionic/react";
import React, { useState } from "react";
import { auth } from "../Firebase/firebase";
import { useDispatch } from "react-redux";
import axios from "axios";
import { StudentUser, TeacherUser } from "../redux/type";
import { changeData } from "../redux/features/UserDataSlice";
import { useHistory } from "react-router";
import SignupPage from "./student/Signup";
import FloatingInput from "../components/FloatingInput";
import pic from '../assets/logo.png'
import { Storage } from '@capacitor/storage';

const LoginPage: React.FC = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [present] = useIonAlert()
    const [login, setLogin] = useState({
      email: '',
      password: ''
    })
    const [validate, setValidate] = useState({
      email: false,
      password: false
    })

    const replace = (path: string) => {
      history.replace(path)
    }

    const setEmail = async (email: string) => {
      await Storage.set({
        key: 'userEmail',
        value: email,
      });
    };

    const errorAlert = () => {
      present({
        header: 'Sign in error',
        message: 'email or password has incorrect please check again',
        buttons: [
          'OK',
        ],
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

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      try {
        auth.signInWithEmailAndPassword(login.email, login.password)
        .then(res => {
          const loginData = {
            email: res.user?.email
          }
          axios.post('http://www.zp11489.tld.122.155.167.85.no-domain.name/www/login.php', JSON.stringify(loginData))
          .then(user => {
            let data: StudentUser | TeacherUser
            if (Number(user.data.flag) === 0) {
              data = {
                std_id: user.data.std_ID,
                firstname: user.data.std_firstname,
                lastname: user.data.std_lastname,
                classroom: user.data.std_classroom,
                number: user.data.std_number,
                dormitory: user.data.std_dormitory,
                email: user.data.std_email,
                img_path: user.data.img_path,
                flag: user.data.flag
              }
              console.log(data)
              dispatch(changeData(data))
              setEmail(data.email)
              replace('/home')
            } else {
              data = {
                tch_id: user.data.user_id,
                firstname: user.data.tch_firstname,
                lastname: user.data.tch_lastname,
                img_path: user.data.img_path,
                email: user.data.tch_email,
                flag: user.data.flag
              }
              console.log(data)
              dispatch(changeData(data))
              setEmail(data.email)
              replace('/check')
            }
            
            })
      }).catch((err) => {
        errorAlert()
      })
    } 
      catch (error) {
          errorAlert()
    }
    
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="p-8 grid justify-items-center bg-gradient-to-tr from-pccp-light-orange to-pccp-light-blue">
          <img src={pic} className="w-2/3 mb-3 mt-3" />
          <h1 className="text-center font-bold text-2xl mb-2">PCSHSP SAMA</h1>
          <h3 className="text-center font-bold mb-8">Student Activity Mobile Application</h3>
            <form onSubmit={e => {handleLogin(e)}} className="w-full">
              <div className="block p-6 rounded-lg shadow-lg bg-white">
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
                  href="#!"
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
                  onClick={() => replace('/signup')}
                >
                  Register
                </a>
              </div>
            </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
