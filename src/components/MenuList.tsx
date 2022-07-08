import { IonIcon, useIonAlert, AlertInput, useIonRouter } from "@ionic/react"
import { lockOpen, informationCircle, logOut, create } from "ionicons/icons"
import { auth, credential } from "../Firebase/firebase"
import { Storage } from "@capacitor/storage"
import { useState, useContext } from "react"
import { AuthContext } from "../Firebase/AuthContext"

interface MenuListProps {
    email?: string
}

const MenuList: React.FC<MenuListProps> = ({email}) => {

    const router = useIonRouter()
    const [present] = useIonAlert()

    const sendResetPassword = async () => {
        if (email) {
            await auth.sendPasswordResetEmail(email)
                .then(() => {
                   present({
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
        present({
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
        present({
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
                        present({
                            message: "Reset password complete!, please login again",
                            buttons: [{
                                text: "OK", handler: async () => {
                                    await Storage.remove({ key: 'userEmail' });
                                    await auth.signOut()
                                }
                            }]
                        })
                    }).catch(() => {
                        present({
                            message: "Error reset password please check again",
                            buttons: ["OK"]
                        })
                    })
                }
            }]
        })
    }

    const checkOldPassword = () => {
        present({
            header: 'ใส่รหัสผ่านเก่า',
            buttons: [
                {text: "Cancel"},
               { text: 'OK', handler: async (alertData) => {
                await auth.currentUser?.reauthenticateWithCredential(
                    credential.credential(auth.currentUser.email as string, alertData['old-password'])
                ).then(() => {
                    resetPassword()
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

    return (
        <div className="grid gap-y-6 w-full bg-gradient-to-r from-pccp-light-orange to-pccp-blue p-5 rounded-lg">
            <div className="flex border-b-2 pb-1" id="open-modal">
                <div className="ml-3 text-xl"><IonIcon src={create}></IonIcon></div>
                <div className="ml-5">แก้ไขข้อมูลส่วนตัว</div>
            </div>
            <div className="flex border-b-2 pb-1" onClick={async () => {
                checkOldPassword()
            }}>
                <div className="ml-3 text-xl"><IonIcon src={lockOpen}></IonIcon></div>
                <div className="ml-5">เปลี่ยนรหัสผ่าน</div>
            </div>
            <div className="flex border-b-2 pb-1">
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
    )
}
export default MenuList