import { IonPage, IonContent } from "@ionic/react";
import React, { useState } from "react";
import FloatingInput from "../../components/FloatingInput";
import { auth } from "../../Firebase/firebase";

const SignupPage: React.FC = () => {
  const [signUp, setSignUp] = useState({
    firstname: "",
    lastname: "",
    classroom: "",
    number: "",
    email: "",
    password: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      auth.createUserWithEmailAndPassword(signUp.email, signUp.password);
      console.log("success");
    } catch (error) {
      alert(error);
    }
  };

  const onChangeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newSignUp: any = { ...signUp };
    newSignUp[event.target.name] = event.target.value;
    setSignUp(newSignUp);
  };

  return (
    <IonPage>
      <IonContent>
        <div className="p-8">
          <h1 className="text-center text-2xl font-bold mb-5">REGISTER</h1>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="block p-6 rounded-lg shadow-lg bg-pccp-light-blue w-full mb-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="form-group mb-3">
                  <FloatingInput
                    label="Firstname"
                    type="text"
                    name="firstname"
                    onChangeHandler={onChangeInputHandler}
                  ></FloatingInput>
                </div>
                <div className="form-group mb-3">
                  <FloatingInput
                    label="Lastname"
                    type="text"
                    name="lastname"
                    onChangeHandler={onChangeInputHandler}
                  ></FloatingInput>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-2">
                <div className="form-group">
                  <FloatingInput
                    label="Classroom"
                    type="text"
                    name="classroom"
                    onChangeHandler={onChangeInputHandler}
                  ></FloatingInput>
                </div>
                <div className="form-group">
                  <FloatingInput
                    label="Number"
                    type="number"
                    name="number"
                    onChangeHandler={onChangeInputHandler}
                  ></FloatingInput>
                </div>
              </div>
              <div className="form-group mb-5">
                <FloatingInput
                  label="Email"
                  type="email"
                  name="email"
                  onChangeHandler={onChangeInputHandler}
                ></FloatingInput>
              </div>
              <div className="form-group">
                <FloatingInput
                  label="Password"
                  type="password"
                  name="password"
                  onChangeHandler={onChangeInputHandler}
                ></FloatingInput>
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
