import {
  checkmarkOutline,
  chevronForward,
  removeCircleOutline,
} from "ionicons/icons";
import blank from "../assets/blankprofile.png";
import { ActData } from "../redux/type";
import { IonIcon } from "@ionic/react";

interface ListComponentProps {
  label?: string;
  type?: string;
  school?: string;
  email?: string;
  student?: boolean;
  point?: number;
  data?: ActData;
  navigate?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const ListComponent: React.FC<ListComponentProps> = ({
  label,
  type,
  school,
  email,
  student,
  point,
  data,
  navigate,
}) => {
  const checkIfImageExists = (url: string) => {
    const img = new Image();
    img.src = url;

    if (img.complete) {
      return true;
    } else {
      img.onload = () => {
        return true;
      };

      img.onerror = () => {
        return false;
      };
    }
  };

  const linkpic = (school: string, email: string) => {
    return (
      "https://sama-data-bucket.s3.ap-northeast-2.amazonaws.com/" +
      school +
      "/profile_pic/" +
      email.split("@")[0] +
      "." +
      email.split("@")[1] +
      ".jpeg"
    );
  };
  return (
    <div className="w-full p-3">
      <div className="text-base grid grid-cols-6 bg-white items-center flex items-stretch">
        {student ? (
          <div className="self-center">
            {checkIfImageExists(linkpic(school as string, email as string)) ? (
              <img
                src={linkpic(school as string, email as string)}
                className="rounded-full w-8 h-8"
              />
            ) : (
              <img src={blank} className="rounded-full w-8 h-8" />
            )}
          </div>
        ) : data != undefined ? (
          data?.flag === "ACCEPT" ? (
            <div className="self-center col-span-1">
              <IonIcon src={checkmarkOutline}></IonIcon>
            </div>
          ) : (
            <div className="self-center col-span-1">
              <IonIcon src={removeCircleOutline}></IonIcon>
            </div>
          )
        ) : null}

        <div className="text-left col-span-4 self-center">
          {label && <p className="truncate">{label}</p>}
          {data != undefined && (
            <div>
              <p className="truncate text-xs">
                {"[ " + data.act_update + " ]"}
              </p>
              <p className="truncate -mt-1.5">{data.act_data?.act_detail}</p>
            </div>
          )}
        </div>
        <div
          className={`text-right ${point != null && "col-span-2"} ${
            data != undefined ? "col-span-1" : ""
          }`}
          onClick={(e) => {
            if (navigate) navigate(e);
          }}
        >
          {point != null ? (
            <p>
              {point} {type}
            </p>
          ) : (
            <IonIcon src={chevronForward} className="pt-3"></IonIcon>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListComponent;
