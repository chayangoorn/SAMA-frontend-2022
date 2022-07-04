import { IonIcon } from "@ionic/react"
import { lockOpen, informationCircle, logOut } from "ionicons/icons"
import { auth } from "../Firebase/firebase"
import { useIonRouter } from "@ionic/react"

const MenuList: React.FC = () => {

    const router = useIonRouter()

    return (
        <div className="grid gap-y-6 w-full bg-gradient-to-r from-pccp-light-orange to-pccp-blue p-5 rounded-lg">
            <div className="flex border-b-2 pb-1">
                <div className="ml-3 text-xl"><IonIcon src={lockOpen}></IonIcon></div>
                <div className="ml-5">เปลี่ยนรหัสผ่าน</div>
            </div>
            <div className="flex border-b-2 pb-1">
                <div className="ml-3 text-xl"><IonIcon src={informationCircle}></IonIcon></div>
                <div className="ml-5">เกี่ยวกับ</div>
            </div>
            <div className="flex border-b-2 pb-1" onClick={() => {
                auth.signOut()
                localStorage.removeItem("userEmail")
                router.push('/login')
                }}>
                <div className="ml-3 text-xl"><IonIcon src={logOut}></IonIcon></div>
                <div className="ml-5">ออกจากระบบ</div>
            </div>
        </div>
    )
}
export default MenuList