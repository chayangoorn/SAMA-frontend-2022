import { IonIcon } from "@ionic/react"
<<<<<<< Updated upstream
import { checkmarkOutline, chevronForward } from "ionicons/icons"
import blank from '../assets/blankprofile.png'

interface ListComponentProps {
    label?: string
    type?: string
    img?: string
    student?: boolean
    point?: number
    navigate? : (event: React.MouseEvent<HTMLDivElement>) => void
}

const ListComponent: React.FC<ListComponentProps> = ({
    label,
    type,
    img,
    student,
    point,
    navigate
}) => {

    const linkpic = 'http://www.zp11489.tld.122.155.167.85.no-domain.name/www/profile/'
    return (
<<<<<<< HEAD
        <div className="w-full p-3">
            <div className="text-base grid grid-cols-6 bg-white items-center flex items-stretch">
                {point != null ? "" :
                <div className="self-center">
                {student ? 
                    (img == null || img == "" ? <img src={blank} className="rounded-full w-8 h-8"/> 
                    : <img src={linkpic+img+".jpg"} className="rounded-full w-8 h-8"/> )
                : <IonIcon src={checkmarkOutline}></IonIcon>}
                </div>}
                <div className="text-left col-span-4 flex flex-nowrap self-center">
                    <p className="truncate">{label}</p>
                </div>
                <div className={`text-right ${point != null && 'col-span-2'}`} onClick={e => { if (navigate) navigate(e) }}>
                    {point != null ? <p>{point} {type}</p> : <IonIcon src={chevronForward} className="pt-3"></IonIcon> }
=======
        <div className="w-full p-5 grid gap-y-5">
            <div className="text-base grid grid-cols-6 bg-white">
                <div><IonIcon src={checkmarkOutline}></IonIcon></div>
                <div className="text-left col-span-4 flex flex-nowrap">
                    <p className="truncate">การบำเพ็ญประโยชน์ครั้งที่ 1</p>
=======
import { checkmarkOutline, chevronForward, removeCircleOutline } from "ionicons/icons"
import blank from '../assets/blankprofile.png'
import { ActData } from "../redux/type"

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

    const linkpic = 'http://www.zp11489.tld.122.155.167.85.no-domain.name/www/profile/'
    return (
        <div className="w-full p-3">
            <div className="text-base grid grid-cols-6 bg-white items-center flex items-stretch">
                {point != null &&
                <div className="self-center">
                {student && 
                    (img == null || img == "" ? <img src={blank} className="rounded-full w-8 h-8"/> 
                    : <img src={linkpic+img+".jpg"} className="rounded-full w-8 h-8"/> )
                }
                </div>}
                {Number(data?.flag) === 3 ? 
                    <div className="self-center col-span-1">
                        <IonIcon src={checkmarkOutline}></IonIcon>
                    </div>
                     : 
                     <div className="self-center col-span-1">
                        <IonIcon src={removeCircleOutline}></IonIcon>
                    </div>
                 }
                <div className="text-left col-span-4 self-center">
                    { label && <p className="truncate">{label}</p>}
                    { data && 
                        <div>
                            <p className="truncate">{"["+data.act_updated+"]"}</p>
                            <p className="truncate">{data.act_details}</p>
                        </div>
                    }
                </div>
                <div className={`text-right ${point != null && 'col-span-2'} ${data && 'col-span-1'}`} onClick={e => { if (navigate) navigate(e) }}>
                    {point != null ? <p>{point} {type}</p> : <IonIcon src={chevronForward} className="pt-3"></IonIcon> }
>>>>>>> Stashed changes
>>>>>>> paetong/student
                </div>
            </div>
        </div>
    )
}

export default ListComponent