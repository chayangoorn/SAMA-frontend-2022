import { IonPage, IonContent, IonCheckbox, IonItem, IonLabel, IonImg } from "@ionic/react";
import React, { useState, useContext } from "react";
import { auth } from "../Firebase/firebase";
import { useDispatch } from "react-redux";
import axios from "axios";
import { StudentUser, TeacherUser } from "../redux/type";
import { changeData } from "../redux/features/UserDataSlice";
import { useHistory } from "react-router";
import SignupPage from "./student/Signup";
import FloatingInput from "../components/FloatingInput";
import pic from '../assets/logo.png'

const LoginPage: React.FC = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [login, setLogin] = useState({
      email: '',
      password: ''
    })

    const replace = () => {
      history.replace('/home')
    }

    const onChangeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      let newLogin: any = { ...login };
      newLogin[event.target.name] = event.target.value;
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
                img_path: user.data.img_path,
                flag: user.data.flag
              }
              console.log(data)
              dispatch(changeData(data))
              replace()
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
              replace()
            }
            
            })
      })} catch (error) {
          console.log(error)
      }
    
  }

  return (
    <IonPage>
      <IonContent>
        <div className="p-8 mt-3 grid justify-items-center">
          <img src={pic} className="w-2/3 mb-3" />
          <h1 className="text-center font-bold text-2xl mb-2">PCSHSP SAMA</h1>
          <h3 className="text-center font-bold mb-8">Student Activity Mobile Application</h3>
            <form onSubmit={e => {handleLogin(e)}} className="w-full">
              <div className="block p-6 rounded-lg shadow-lg bg-pccp-light-blue">
              <div className="form-group mb-6">
                <FloatingInput label="Email" type="text" name="email" onChangeHandler={onChangeInputHandler}></FloatingInput>
              </div>
              <div className="form-group mb-6">
                <FloatingInput label="Password" type="password" name="password" onChangeHandler={onChangeInputHandler}></FloatingInput>
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
              <p className="text-gray-800 mt-6 text-center">
                Not a member?{" "}
                <a
                  className="text-pccp-orange transition duration-200 ease-in-out"
                  href="/signup"
                >
                  Register
                </a>
              </p>

              
            </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
