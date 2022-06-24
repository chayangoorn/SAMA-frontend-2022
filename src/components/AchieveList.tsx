import ProgressBar from "@ramonak/react-progress-bar";

interface AchieveListProps {
    label: string
    point: number
    types: string
}

const AchieveList: React.FC<AchieveListProps> = ({
    label,
    point,
    types
}) => {

    const times: any = {'01':15,'02':10,'03':5,'04':1,'05':1,'06':1, 
    '07':1,'08':1,'09':1,'10':1,'11':1,'12':50,'13':90}

  return (
    <div className="bg-pccp-light-orange p-5 rounded-lg mb-3">
      <div className="text-base mb-3">{label}</div>
      <ProgressBar completed={parseFloat(((point/times[types])*100).toFixed(2))} bgColor="#FFF" labelColor="#000" labelAlignment="outside"></ProgressBar>
    </div>
  );
};
export default AchieveList;
