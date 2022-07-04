import { IonIcon } from "@ionic/react";
import {
  chevronForward,
  earthOutline,
  schoolOutline,
  bookmarkOutline,
  flaskOutline,
  sparklesOutline,
  beakerOutline,
  footstepsOutline,
  gitNetworkOutline,
  accessibilityOutline,
  colorPaletteOutline,
  flagOutline,
  barbellOutline,
  peopleOutline,
  caretDown,
  caretUp,
} from "ionicons/icons";
import activityType from "../redux/activityType";
import { ActData } from "../redux/type";
import FormLayoutOutreach from "../components/FormsLayout/FormLayoutOutreach";
import FormLayoutBook from "../components/FormsLayout/FormLayoutBook";
import FormLayoutCamp from "../components/FormsLayout/FormLayoutCamp";
import FormLayoutVisit from "../components/FormsLayout/FormLayoutVisit";
import FormLayoutLecture from "../components/FormsLayout/FormLayoutLecture";
import FormLayoutClub from "../components/FormsLayout/FormLayoutClub";
import FormLayoutExercise from "../components/FormsLayout/FormLayoutExercise";
import FormLayoutMeet from "../components/FormsLayout/FormLayoutMeet";
import React, { useState } from "react";
import axios from "axios";

interface ListComponentProps {
  act: string;
  navigate?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  teacher?: boolean;
  data?: ActData;
  refresh?: (event: React.MouseEvent<HTMLDivElement>) => void;
  check?: boolean;
  index?: number;
}

const ListBackground: React.FC<ListComponentProps> = ({
  act,
  navigate,
  teacher,
  data,
  refresh,
  check,
  index,
}) => {
  const actIcon: any = {
    "01": earthOutline,
    "02": schoolOutline,
    "03": bookmarkOutline,
    "04": flaskOutline,
    "05": sparklesOutline,
    "06": beakerOutline,
    "07": footstepsOutline,
    "08": gitNetworkOutline,
    "09": accessibilityOutline,
    "10": colorPaletteOutline,
    "11": flagOutline,
    "12": barbellOutline,
    "13": peopleOutline,
  };

  const selectForm = (id: string) => {
    switch (id) {
      case "01":
      case "02":
        return (
          <FormLayoutOutreach read={true} data={data}></FormLayoutOutreach>
        );
      case "03":
        return <FormLayoutBook read={true} data={data}></FormLayoutBook>;
      case "04":
      case "05":
        return <FormLayoutCamp read={true} data={data}></FormLayoutCamp>;
      case "06":
      case "07":
        return <FormLayoutVisit read={true} data={data}></FormLayoutVisit>;
      case "08":
      case "09":
      case "10":
        return <FormLayoutLecture read={true} data={data}></FormLayoutLecture>;
      case "11":
        return <FormLayoutClub read={true} data={data}></FormLayoutClub>;
      case "12":
        return (
          <FormLayoutExercise read={true} data={data}></FormLayoutExercise>
        );
      case "13":
        return <FormLayoutMeet read={true} data={data}></FormLayoutMeet>;
      default:
        return <div></div>;
    }
  };

  const [open, setOpen] = useState(false);

  const onCheck = async (id: number, e: React.MouseEvent<HTMLDivElement>) => {
    await axios
      .post(
        "http://www.zp11489.tld.122.155.167.85.no-domain.name/www/update-act.php",
        JSON.stringify({ act_id: id, flag: 3 })
      )
      .then((res) => {
        console.log(res);
        if (refresh) refresh(e);
        setOpen(false);
      });
  };

  const onWrong = async (id: number, e: React.MouseEvent<HTMLDivElement>) => {
    await axios
      .post(
        "http://www.zp11489.tld.122.155.167.85.no-domain.name/www/update-act.php",
        JSON.stringify({ act_id: id, flag: 4 })
      )
      .then((res) => {
        console.log(res);
        if (refresh) refresh(e);
        setOpen(false);
      });
  };

  return (
    <div className="mb-2 w-full " onClick={navigate}>
      <div
        className={`grid grid-cols-6 bg-pccp-light-orange p-3 pb-4 gap-x-3 ${
          open ? "rounded-t-lg" : "rounded-lg"
        }  flex items-stretch`}
      >
        <div className="grid justify-items-stretch ml-1 shadow-md bg-white rounded-full w-10 h-10 flex items-stretch">
          <IonIcon
            className="self-center justify-self-center"
            src={actIcon[act]}
            size="small"
          ></IonIcon>
        </div>
        <div className="text-left col-span-4 ml-4 flex flex-nowrap self-center">
          <div className="truncate inline-block text-base">
            {!teacher ? (
              activityType[act]
            ) : index ? (
              <p>ครั้งที่ {index}</p>
            ) : (
              data && (
                <p>
                  {data.std_firstname} {data.std_lastname}
                </p>
              )
            )}
          </div>
        </div>
        <div
          className="text-right self-center mt-2 mr-2"
          onClick={() => {
            if (!navigate) setOpen(!open);
          }}
        >
          <IonIcon
            src={!teacher ? chevronForward : open ? caretUp : caretDown}
          ></IonIcon>
        </div>
      </div>
      <div
        className={`bg-pccp-light-blue mb-3 rounded-b-lg ${
          open ? "max-h-max" : "hidden"
        }`}
      >
        {selectForm(act)}
        {check ? (
          <div className="grid grid-cols-2 gap-x-3 text-white px-5 pb-7 pt-0 w-full text-center content-center">
            <div
              className="bg-danger rounded-md p-1.5 shadow"
              onClick={(e) => {
                if (data) onWrong(data.act_id, e);
              }}
            >
              ส่งคืน
            </div>
            <div
              className="bg-success rounded-md p-1.5 shadow"
              onClick={(e) => {
                if (data) onCheck(data.act_id, e);
              }}
            >
              ตรวจ
            </div>
          </div>
        ) : (
          <div className="pb-3">
            <div className="px-5 mb-2">รายละเอียดการตรวจ</div>
            <div
              className={`form-group mx-5 mb-2 bg-pccp-light-orange rounded-lg p-3 grid grid-cols-3 flex items-center`}
            >
              <label className="form-label inline-block col-span-1">
                ครูผู้ตรวจ
              </label>
              <input
                value={data?.tch_firstname + " " + data?.tch_lastname}
                type="text"
                className="form-control col-span-2 block w-full py-1.5 text-base bg-transparent rounded"
                readOnly={true}
              ></input>
            </div>
            <div
              className={`form-group mx-5 mb-2 bg-pccp-light-orange rounded-lg p-3 grid grid-cols-3 flex items-center`}
            >
              <label className="form-label inline-block col-span-1">
                สร้างเมื่อ
              </label>
              <input
                value={data?.act_created}
                type="text"
                className="form-control col-span-2 block w-full py-1.5 text-base bg-transparent rounded"
                readOnly={true}
              ></input>
            </div>
            <div
              className={`form-group mx-5 mb-5 bg-pccp-light-orange rounded-lg p-3 grid grid-cols-3 flex items-center`}
            >
              <label className="form-label inline-block col-span-1">
                ตรวจเมื่อ
              </label>
              <input
                value={data?.act_updated}
                type="text"
                className="form-control col-span-2 block w-full py-1.5 text-base bg-transparent rounded"
                readOnly={true}
              ></input>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListBackground;
