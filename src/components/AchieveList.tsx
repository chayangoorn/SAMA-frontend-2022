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
    '07':1,'08':1,'09':1,'10':1,'11':1,'12':40,'13':90}

    const unit: any = {'01':"ชั่วโมง",'02':"ชั่วโมง",'03':"เล่ม",'04':"ครั้ง",'05':"ครั้ง",'06':"ครั้ง", 
    '07':"ครั้ง",'08':"ครั้ง",'09':"ครั้ง",'10':"ครั้ง",'11':"ชุมนุม",'12':"ครั้ง",'13':"ครั้ง"}

  return (
    <div className="bg-pccp-light-orange p-5 rounded-lg mb-3">
      <div className="text-base font-bold">{label}</div>
      {['01', '02', '03', '11', '12', '13'].includes(types) && 
        <div className="text-sm">ทำไปแล้ว {point}/{times[types]} {unit[types]}</div>
      }
      <div className="mt-3"></div>
      <ProgressBar completed={parseFloat(((point/times[types])*100).toFixed(2))} bgColor="#FFF" labelColor="#000" labelAlignment="outside"></ProgressBar>
    </div>
  );
};
export default AchieveList;
