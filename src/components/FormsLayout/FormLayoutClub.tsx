import { IonSelect, IonSelectOption, SelectChangeEventDetail } from "@ionic/react";
import React from "react";
import { ValidateAct, ActData } from "../../redux/type";

interface FormProps {
  onChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeAreaHandler?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeSelectHandler?: (event: CustomEvent<SelectChangeEventDetail>) => void;
  validation?: ValidateAct
  data?: ActData
  read?: boolean
}

const FormLayoutClub: React.FC<FormProps> = ({
  onChangeHandler,
  onChangeAreaHandler,
  onChangeSelectHandler,
  validation,
  data,
  read
}) => {

  const options = [
    "ชุมนุมวิชาการ",
    "ชุมนุมสังคมศึกษา ภาษา ศาสนา ศิลปวัฒนธรรมและโบราณคดี",
    "ชุมนุมกีฬาและการออกกำลังกาย",
    "ชุมนุมกิจกรรมอื่น ๆ"
  ]

  return (
    <div className="bg-pccp-light-blue p-5 rounded-lg">
      <div className={`form-group mb-2 bg-pccp-light-orange ${validation?.act_hours? 'border-red-400 border-2' : ""}
      rounded-lg p-3 grid grid-cols-2`}>
        <label className="form-label inline-block mb-2 pt-2">
          ภาคเรียนที่ <span className="text-red-600">*</span>
        </label>
        <input
          value={data?.act_hours}
          type="number"
          className="form-control block
          w-full py-1.5 text-base bg-clip-padding
          bg-transparent rounded transition ease-in-out m-0"
          readOnly={read}
          name="act_hours"
          onChange={(e) => {
            if (onChangeHandler) onChangeHandler(e);
          }}
        ></input>
      </div>
      {validation?.act_hours ? <div className="text-red-400 text-xs mb-3">ต้องใส่ภาคเรียน</div> : ""}
      <div className={`form-group mb-2 bg-pccp-light-orange ${validation?.act_date? 'border-red-400 border-2' : ""}
      rounded-lg p-3 grid grid-cols-2`}>
        <label className="form-label inline-block mb-2 pt-2">
          ปีการศึกษา (พ.ศ.) <span className="text-red-600">*</span>
        </label>
        <input
          value={data?.act_date.slice(0,4)}
          type="number"
          className="form-control block
          w-full py-1.5 text-base bg-clip-padding
          bg-transparent rounded transition ease-in-out m-0"
          readOnly={read}
          name="act_date"
          onChange={(e) => {
            if (onChangeHandler) onChangeHandler(e);
          }}
        ></input>
      </div>
      {validation?.act_date ? <div className="text-red-400 text-xs mb-3">ต้องใส่ปีการศึกษา</div> : ""}
      <div className={`form-group mb-2 bg-pccp-light-orange ${validation?.act_head ? 'border-red-400 border-2' : ""} rounded-lg p-3`}>
        <label className="form-label inline-block mb-2 text-xs">
          ชื่อชุมนุม <span className="text-red-600">*</span>
        </label>
        <input
          value={data?.act_head}
          type="text"
          className="form-control block
            w-full py-1.5 text-base bg-clip-padding
            bg-transparent rounded transition ease-in-out m-0"
          readOnly={read}
          name="act_head"
          onChange={(e) => {
            if (onChangeHandler) onChangeHandler(e);
          }}
        ></input>
      </div>
      {validation?.act_head ? <div className="text-red-400 text-xs mb-3">ต้องใส่ชื่อชุมนุม</div> : ""}
      <div className={`mb-2 bg-pccp-light-orange ${validation?.act_places? 'border-red-400 border-2' : ""}
      rounded-lg p-3 grid grid-cols-2 flex items-center font-arthiti`}>
        <label>
          ประเภทของชุมนุม <span className="text-red-600">*</span>
        </label>
        <IonSelect
          placeholder={data?.act_places}
          okText="ตกลง"
          cancelText="ยกเลิก"
          name="act_places"
          disabled={read}
          style={{'--placeholder-opacity': '100%'}}
          onIonChange={(e) => {
            if (onChangeSelectHandler) {
              onChangeSelectHandler(e)
            };
          }}
        > 
          {options.map((option, index) => {
            return <IonSelectOption key={index} value={option}>{option}</IonSelectOption>
          })}
        </IonSelect>
      </div>
      {validation?.act_places ? <div className="text-red-400 text-xs mb-3">ต้องเลือกประเภทชุมนุม</div> : ""}
      <div className={`form-group mb-2 bg-pccp-light-orange ${validation?.act_details ? 'border-red-400 border-2' : ""} rounded-lg p-3`}>
        <label className="form-label inline-block mb-2 text-xs">
          ความรู้ที่ได้รับโดยสังเขป <span className="text-red-600">*</span>
        </label>
        <textarea
        value={data?.act_details}
          className="form-control block
            w-full py-1.5 text-base bg-clip-padding
            bg-transparent rounded transition ease-in-out m-0"
          readOnly={read}
          name="act_details"
          onChange={(e) => {
            if (onChangeAreaHandler) onChangeAreaHandler(e);
          }}
        ></textarea>
      </div>
      {validation?.act_details ? <div className="text-red-400 text-xs mb-3">ต้องใส่รายละเอียด</div> : ""}
      <div className={`form-group mb-2 bg-pccp-light-orange ${validation?.act_feels ? 'border-red-400 border-2' : ""} rounded-lg p-3`}>
        <label className="form-label inline-block mb-2 text-xs">
          ความประทับใจ <span className="text-red-600">*</span>
        </label>
        <textarea
          value={data?.act_feels}
          className="form-control block
            w-full py-1.5 text-base bg-clip-padding
            bg-transparent rounded transition ease-in-out m-0"
          readOnly={read}
          name="act_feels"
          onChange={(e) => {
            if (onChangeAreaHandler) onChangeAreaHandler(e);
          }}
        ></textarea>
      </div>
      {validation?.act_feels ? <div className="text-red-400 text-xs mb-3">ต้องใส่ความประทับใจ</div> : ""}
    </div>
  );
};

export default FormLayoutClub;
