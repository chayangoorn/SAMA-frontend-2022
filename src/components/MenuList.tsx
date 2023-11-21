import { IonIcon, useIonAlert, useIonRouter, useIonToast } from "@ionic/react"
import { lockOpen, informationCircle, logOut, create, mail } from "ionicons/icons"
import { auth, credential } from "../Firebase/firebase"
import { Storage } from "@capacitor/storage"
import axios from 'axios'

interface MenuListProps {
    email?: string
    flag?: string
    user_id?: string
}

const MenuList: React.FC<MenuListProps> = ({email, flag, user_id}) => {

    const router = useIonRouter()
    const [presentAlert] = useIonAlert()
    const [presentToast, dismiss] = useIonToast()
    
    const sendResetPassword = async () => {
        if (email) {
            await auth.sendPasswordResetEmail(email)
                .then(() => {
                   presentAlert({
                    message: "กรุณาตรวจสอบอีเมลของคุณเพื่อเปลี่ยนรหัสผ่านใหม่",
                    buttons: [{text: "OK", handler: async () => {
                        await Storage.remove({ key: 'userEmail' });
                        await auth.signOut()
                    }}]
                }) 
            })
        }
    }

    const errorPassword = () => {
        presentAlert({
            message: "Wrong password, if you forget your password please click 'Forget Password'",
            buttons: [
                {text: 'Forget Password', handler: async () => {
                   await sendResetPassword()
                }},
                {text:'OK'}
            ]
        })
    }

    const resetPassword = () => {
        presentAlert({
            header: "ใส่รหัสผ่านใหม่",
            inputs: [
                {
                    type: 'password',
                    placeholder: 'New password',
                    name: 'new-password'
                }
            ],
            buttons: [ {text: "Cancel"},
                {text: "OK", handler: async (alertData) => {
                    await auth.currentUser?.updatePassword(alertData['new-password'])
                    .then(() => {
                        presentAlert({
                            message: "Reset password complete!, please login again",
                            buttons: [{
                                text: "OK", handler: async () => {
                                    await Storage.remove({ key: 'userEmail' });
                                    await auth.signOut()
                                }
                            }]
                        })
                    }).catch(() => {
                        presentAlert({
                            message: "Error reset password please check again",
                            buttons: ["OK"]
                        })
                    })
                }
            }]
        })
    }

    const checkEmail = async (newemail: string) => {
        await axios.post('https://pcshsptsama.com/www/register.php', JSON.stringify(
            {email: newemail, user_id: Number(user_id), flag: flag, method: "update-email"}))
        .then(async (res) => {
            if (res.data === "This email already exists in the system.") {
                await presentAlert({
                    message: res.data,
                    buttons: [{text: "OK"}]
                })            
            } else if (res.data === "update email completed!") {
                await presentAlert({
                    message: res.data,
                    buttons: [
                    {text: 'OK', handler: (async () => {
                        await auth.currentUser?.updateEmail(newemail)
                        .then(() => {
                            presentAlert({
                                message: "Change Email complete!, please login again",
                                buttons: [{
                                    text: "OK", handler: async () => {
                                        await Storage.remove({ key: 'userEmail' });
                                        await auth.signOut()
                                    }
                                }]
                            })
                        }).catch(() => {
                            presentAlert({
                                message: "Error change email please check again",
                                buttons: ["OK"]
                            })
                        })
                    })}
                    ],
                })
            }
        })
    }

    const ValidateEmailAddress = (emailString: string) => {
        if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(emailString)) {
            checkEmail(emailString)
        } else {
            presentToast({
                buttons: [{ text: 'ok', handler: () => dismiss()}],
                message: 'wrong email format, please check again.',
            })
        }
    }

    const changeEmail = () => {
        presentAlert({
            header: "ใส่อีเมลใหม่",
            inputs: [
                {
                    type: 'email',
                    placeholder: 'New Email',
                    name: 'new-email',
                }
            ],
            buttons: [ {text: "Cancel"},
                {text: "OK", handler: async (alertData) => {
                    ValidateEmailAddress(alertData['new-email'])
                }
            }]
        })
    }

    const checkOldPassword = (status: number) => {
        presentAlert({
            header: 'ใส่รหัสผ่านเก่า',
            buttons: [
                {text: "Cancel"},
               { text: 'OK', handler: async (alertData) => {
                await auth.currentUser?.reauthenticateWithCredential(
                    credential.credential(auth.currentUser.email as string, alertData['old-password'])
                ).then(() => {
                    if (status === 1) {
                        resetPassword()
                    } else if (status === 2) {
                        changeEmail()
                    } else if (status === 3) {
                        confirmDelete()
                    }
                }).catch(() => {
                    errorPassword()
                })
                }},
                {text: "Forget Password", handler: () => sendResetPassword()},
            ],
            inputs: [
              {
                type: 'password',
                placeholder: 'Old Password',
                name: 'old-password'
              }
            ]
          })
    }

    const deleteAccount = async () => {
       await axios.post("https://pcshsptsama.com/www/register.php", JSON.stringify({user_id: user_id, flag: flag, method: "delete-user"}))
        .then(async (res) => {
            if (res.data === "delete account completed!") {
                await auth.currentUser?.delete()
                await presentAlert({
                    message: "Delete Completed!",
                    buttons: ["OK"]
                })
            }
        })
    }

    const confirmDelete = async () => {
        await presentAlert({
            header: "Confirm to delete account ?",
            buttons: [{text: "Cancel"}, {text: "Confirm", handler: async () => {
                await deleteAccount()
            }}]
        })
    }

    const pushNavigate = () => {
        router.push('/sama')
    }

    return (
        <div>
            <div className="p-5 grid gap-y-6 w-full bg-gradient-to-r from-pccp-light-orange to-pccp-blue rounded-lg">
            { /*
                <div className="flex border-b-2 pb-1" id="open-modal">
                    <div className="ml-3 text-xl"><IonIcon src={create}></IonIcon></div>
                    <div className="ml-5">แก้ไขข้อมูลส่วนตัว</div>
                </div>
            */}
            
            <div className="flex border-b-2 pb-1" onClick={async () => {
                checkOldPassword(1)
            }}>
                <div className="ml-3 text-xl"><IonIcon src={lockOpen}></IonIcon></div>
                <div className="ml-5">เปลี่ยนรหัสผ่าน</div>
            </div>
            { /*
                <div className="flex border-b-2 pb-1" onClick={async () => {
                    checkOldPassword(2)
                    }}>
                    <div className="ml-3 text-xl"><IonIcon src={mail}></IonIcon></div>
                    <div className="ml-5">เปลี่ยนอีเมล</div>
                </div>
            */}
            
            <div className="flex border-b-2 pb-1" onClick={pushNavigate}>
                <div className="ml-3 text-xl"><IonIcon src={informationCircle}></IonIcon></div>
                <div className="ml-5">เกี่ยวกับ</div>
            </div>
            <div className="flex border-b-2 pb-1" onClick={async () => {
                await auth.signOut()
                await Storage.remove({ key: 'userEmail' });
                router.push('/login')
                }}>
                <div className="ml-3 text-xl"><IonIcon src={logOut}></IonIcon></div>
                <div className="ml-5">ออกจากระบบ</div>
            </div>
            </div>
            <div className="my-5 text-center w-full rounded-lg border border-red-400 text-red-400 px-5 py-2"
            onClick={async () => {checkOldPassword(3)}}>
                <div>ลบบัญชีผู้ใช้</div>
            </div>
        </div>
    )
}
export default MenuList