import { IonIcon } from "@ionic/react"
import { checkmarkOutline, chevronForward } from "ionicons/icons"

const ListComponent: React.FC = () => {
    return (
        <div className="w-full p-5 grid gap-y-5">
            <div className="text-base grid grid-cols-6 bg-white">
                <div><IonIcon src={checkmarkOutline}></IonIcon></div>
                <div className="text-left col-span-4 flex flex-nowrap">
                    <p className="truncate">การบำเพ็ญประโยชน์ครั้งที่ 1</p>
                </div>
                <div className="text-right"><IonIcon src={chevronForward}></IonIcon></div>
            </div>
        </div>
    )
}

export default ListComponent