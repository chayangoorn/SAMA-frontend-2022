import { IonPage, IonContent, IonSelect, IonSelectOption, SelectChangeEventDetail, useIonAlert } from "@ionic/react";
import axios from "axios";
import React, { useState } from "react";
import FloatingInput from "../../components/FloatingInput";
import { auth } from "../../Firebase/firebase";
import classroom from "../../redux/classroom";
import { Storage } from "@capacitor/storage";

const SignupPage: React.FC = () => {
  const [present] = useIonAlert()
  const [signUp, setSignUp] = useState({
    firstname: "",
    lastname: "",
    classroom: "",
    number: "",
    id: "",
    dormitory: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [validate, setValidate] = useState({
    firstname: false,
    lastname: false,
    classroom: false,
    number: false,
    dormitory: false,
    id: false,
    email: false,
    password: false,
    confirmPassword: false,
  })

  const validateForm = async () => {
    const asArray = Object.entries(signUp);
    const filtered = asArray.filter(([key, value]) => value == '');
    let i = 0
    let newValidation: any = {...validate}
    filtered.forEach((element) => {
      newValidation[element[0]] = true
      i++
    });
    setValidate(newValidation)
    if (i==0) {
      if (signUp.password.length < 6) {
        present({
          message: 'Password must be more than 6 character',
          buttons: [
            'OK',
          ],
        })
        return true
      }
      if (signUp.password !== signUp.confirmPassword) {
        present({
          message: 'Password and Confirm Password is not match.',
          buttons: [
            'OK',
          ],
        })
        return true
      }
      
      return false
    } else {
      return true
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validateForm().then(async (val) => {
      if (!val) {
        await axios.post('http://pcshsptsama.com/www/register.php', JSON.stringify(signUp))
        .then(async (res) => {
          console.log(res.data)
          await auth.createUserWithEmailAndPassword(signUp.email, signUp.password)
          .then(() => {
            present({
              message: res.data,
              buttons: [
                {text: 'OK', handler: (async () => {
                  await Storage.set({
                    key: 'userEmail',
                    value: signUp.email,
                  });
                  window.location.replace('/home')
                })}
              ],
            })
          })
          .catch(() => {
            present({
              message: res.data,
              buttons: [
                {text: 'OK'}
              ],
            })
          })
        })
      }
    })
  };

  const onChangeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newSignUp: any = { ...signUp };
    let newValidate: any = {...validate}
    newSignUp[event.target.name] = event.target.value;
    if (newSignUp[event.target.name] === "") {
      newValidate[event.target.name] = true
    } else {
      newValidate[event.target.name] = false
    }
    setValidate(newValidate)
    setSignUp(newSignUp);
  };

  const onChangeSelectDormHandler = (event: CustomEvent<SelectChangeEventDetail>) => {
    let newSignUp: any = {...signUp}
    let newValidate: any = {...validate}
    newSignUp['dormitory'] = event.detail.value
    if (newSignUp['dormitory'] === "") {
      newValidate['dormitory'] = true
    } else {
      newValidate['dormitory'] = false
    }
    setValidate(newValidate)
    setSignUp(newSignUp)
  }

  const onChangeSelectClassHandler = (event: CustomEvent<SelectChangeEventDetail>) => {
    let newSignUp: any = {...signUp}
    let newValidate: any = {...validate}
    newSignUp['classroom'] = event.detail.value
    if (newSignUp['classroom'] === "") {
      newValidate['classroom'] = true
    } else {
      newValidate['classroom'] = false
    }
    setValidate(newValidate)
    setSignUp(newSignUp)
  }

  return (
    <IonPage>
      <IonContent>
        <div className="p-8">
          <h1 className="text-center text-2xl font-bold mb-5">STUDENT REGISTER</h1>
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
                    onChangeHandler={onChangeInputHandler}
                    err={validate.lastname}
                  ></FloatingInput>
                  {validate.lastname && <label className="text-red-400 text-xs">please fill lastname</label>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="form-group text-sm">
                <IonSelect
                    okText="ตกลง"
                    cancelText="ยกเลิก"
                    style={{
                      '--placeholder-opacity': '80%',
                      "--padding-bottom":"5px",
                      "--padding-top":"0",
                      "--padding-start":"0",
                    }}
                    placeholder="Classroom"
                    onIonChange={(e) => onChangeSelectClassHandler(e)}
                > 
                {classroom.map((option, index) => {
                    return <IonSelectOption key={index} value={option}>{option}</IonSelectOption>
                })}
                </IonSelect>
                <hr className={`${validate.dormitory ? "border-red-400" : "border-black"} border-1`}/>
                  {validate.classroom && <label className="text-red-400 text-xs">please fill classroom</label>}
                </div>
                <div className="text-sm">
                  <IonSelect placeholder="Dormitory" value={signUp.dormitory}
                  onIonChange={e => onChangeSelectDormHandler(e)}
                  style={{
                    '--placeholder-opacity': '80%',
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
              </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="form-group">
                  <FloatingInput
                    label="Number"
                    type="number"
                    name="number"
                    onChangeHandler={onChangeInputHandler}
                    err={validate.number}
                  ></FloatingInput>
                  {validate.number && <label className="text-red-400 text-xs">please fill number</label>}
                </div>
              <div className="form-group">
                  <FloatingInput
                    label="Student ID"
                    type="text"
                    name="id"
                    length={5}
                    onChangeHandler={onChangeInputHandler}
                    err={validate.id}
                  ></FloatingInput>
                  {validate.id && <label className="text-red-400 text-xs">please fill ID</label>}
                </div>
              </div>

              <div className="mb-3">
                <FloatingInput
                  label="Email"
                  type="email"
                  name="email"
                  onChangeHandler={onChangeInputHandler}
                  err={validate.email}
                ></FloatingInput>
                {validate.email && <label className="text-red-400 text-xs">please fill email</label>}
              </div>
              <div className="mb-3">
                <FloatingInput
                  label="Password"
                  type="password"
                  name="password"
                  onChangeHandler={onChangeInputHandler}
                  err={validate.password}
                ></FloatingInput>
                {validate.password && <label className="text-red-400 text-xs">please fill password</label>}
              </div>
              <div className="mb-3">
                <FloatingInput
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  onChangeHandler={onChangeInputHandler}
                  err={validate.confirmPassword}
                ></FloatingInput>
                {validate.confirmPassword && <label className="text-red-400 text-xs">please fill confirm password</label>}
              </div>
              <div className="mt-8 mb-2 flex items-center text-sm">
                <input type="checkbox" name="accept" />
                <div className="ml-2">Accept Term & Condition</div>
              </div>
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
              Sign up
            </button>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignupPage;
