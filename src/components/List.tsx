import { IonIcon, useIonRouter } from "@ionic/react";
import { chevronForward } from "ionicons/icons";
import activityType from '../redux/activityType'

interface ListComponentProps {
    act: string,
    navigate: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const ListComponent: React.FC<ListComponentProps> = ({act, navigate}) => {

  const actType = activityType

  return (
    <div
      className="w-full bg-pccp-light-orange p-3 rounded-lg grid grid-cols-6 mb-2"
      onClick={navigate}
    >
      <div className="col-span-5 pt-1">{actType[act]}</div>
      <div className="text-right">
        <IonIcon src={chevronForward} size="large"></IonIcon>
      </div>
    </div>
  );
};
export default ListComponent;
