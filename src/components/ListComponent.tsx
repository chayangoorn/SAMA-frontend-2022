import { checkmarkOutline, chevronForward, removeCircleOutline } from "ionicons/icons"
import blank from '../assets/blankprofile.png'
import { ActData } from "../redux/type"
import { IonIcon } from '@ionic/react'

interface ListComponentProps {
    label?: string
    type?: string
    img?: string
    student?: boolean
    point?: number
    data?: ActData
    navigate? : (event: React.MouseEvent<HTMLDivElement>) => void
}

const ListComponent: React.FC<ListComponentProps> = ({
    label,
    type,
    img,
    student,
    point,
    data,
    navigate
}) => {

    const linkpic = 'https://pcshsptsama.com/www/profile/'
    return (
        <div className="w-full p-3">
            <div className="text-base grid grid-cols-6 bg-white items-center flex items-stretch">
                {student ?
                    <div className="self-center">
                    {img == null || img == "" ? <img src={blank} className="rounded-full w-8 h-8"/> 
                    : <img src={linkpic+img} className="rounded-full w-8 h-8"/> }
                    </div> : (data!=undefined ? (
                        data?.flag === "ACCEPT" ? 
                            <div className="self-center col-span-1">
                                <IonIcon src={checkmarkOutline}></IonIcon>
                            </div> : 
                            <div className="self-center col-span-1">
                                <IonIcon src={removeCircleOutline}></IonIcon>
                            </div>
                    ) : null
                    )
                }
                
                <div className="text-left col-span-4 self-center">
                    { label && <p className="truncate">{label}</p>}
                    { data != undefined && 
                        <div>
                            <p className="truncate text-xs">{"[ "+data.act_update+" ]"}</p>
                            <p className="truncate -mt-1.5">{data.act_data?.act_detail}</p>
                        </div>
                    }
                </div>
                <div className={`text-right ${point != null && 'col-span-2'} ${data != undefined ? 'col-span-1': ""}`} onClick={e => { if (navigate) navigate(e) }}>
                    {point != null ? <p>{point} {type}</p> : <IonIcon src={chevronForward} className="pt-3"></IonIcon> }
                </div>
            </div>
        </div>
    )
}

export default ListComponent