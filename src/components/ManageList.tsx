import { IonIcon } from "@ionic/react";
import {
  arrowForwardCircleOutline,
  checkmarkCircleOutline,
  chevronForward,
  radioButtonOffOutline,
  radioButtonOnOutline,
  removeCircleOutline,
} from "ionicons/icons";
import { useIonRouter } from "@ionic/react"
import { ActData } from "../redux/type";
import { useState } from 'react'

interface ManageListProps {
  data: ActData
  index: number
  onClickSelect: (event: React.MouseEvent<HTMLDivElement>, data: ActData, select: boolean, index: number) => void
  choose: boolean
}

const ManageList: React.FC<ManageListProps> = ({ 
    data, index, onClickSelect, choose
}) => {

    const router = useIonRouter()
    const pushNavigate = (path: string) => {
      router.push(path, 'forward', 'push');
    }
    const [select, setSelect] = useState(choose)

    const status: any = {
        "PENDING": ["", "", radioButtonOffOutline],
        "SEND": ["primary", "border-2 border-primary shadow", arrowForwardCircleOutline],
        "ACCEPT": ["success", "border-2 border-success shadow", checkmarkCircleOutline],
        "REJECT": ["danger", "border-2 border-danger shadow", removeCircleOutline],
  };

  return (
    <div className="mb-2 w-full grid gap-y-2">
      <div className={`bg-pccp-light-orange p-3 gap-x-3 rounded-lg grid grid-cols-6 flex items-stretch 
      ${select ? "border-2 border-black" : status[data.flag][1]}`}>
        <div className="self-center text-center" onClick={e => {
            if (data.flag === "PENDING" || data.flag === "REJECT")
            setSelect(!select) 
            onClickSelect(e, data, !select, index)
            }}>
          <IonIcon
            src={select ? radioButtonOnOutline : status[data.flag][2]}
            size="large"
            color={select ? "" : status[data.flag][0]}
          ></IonIcon>
        </div>
        <div className="text-left ml-2 self-center col-span-4">
          <div className="truncate inline-block text-base">ครั้งที่ {index+1}</div>
        </div>
        <div className="text-right self-center" onClick={(e) => pushNavigate(`edit/${data.act_type}/${data.act_id}`)}>
          <IonIcon src={chevronForward} size="large" color={select ? "black" : status[data.flag][0]}></IonIcon>
        </div>
      </div>
    </div>
  );
};

export default ManageList;
