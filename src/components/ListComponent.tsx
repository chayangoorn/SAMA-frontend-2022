import { IonIcon } from "@ionic/react"
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
                </div>
            </div>
        </div>
    )
}

export default ListComponent