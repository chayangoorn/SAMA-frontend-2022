import { ActData, ValidateAct } from "../../redux/type";

interface FormProps {
  onChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeAreaHandler?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  validation?: ValidateAct
  data?: ActData
  read?: boolean
}

const FormLayoutOutreach: React.FC<FormProps> = ({
  onChangeHandler,
  onChangeAreaHandler,
  validation,
  data,
  read
}) => {
  return (
    <div className="bg-pccp-light-blue p-5 rounded-lg">
      <div className="flex items-center justify-center">
        <div className={`mb-2 w-full p-3 bg-pccp-light-orange ${validation?.act_date? 'border-red-400 border-2' : ""} 
        rounded-lg grid grid-cols-2`}>
          <label className="form-label inline-block mb-2 pt-2">วันที่ <span className="text-red-600">*</span> </label>
          <input
            value={data?.act_data?.act_date}
            type="date"
            className="form-control block w-full py-1.5 text-base font-normal text-gray-700 bg-transparent
            bg-clip-padding rounded transition ease-in-out m-0"
            name="act_date"
            readOnly={read}
            onChange={(e) => {
              if (onChangeHandler) onChangeHandler(e);
            }}
          />
        </div>
      </div>
      {validation?.act_date ? <div className="text-red-400 text-xs mb-3">ต้องใส่วันที่</div> : ""}
      <div className={`form-group mb-2 bg-pccp-light-orange ${validation?.act_hour? 'border-red-400 border-2' : ""}
      rounded-lg p-3 grid grid-cols-2`}>
        <label className="form-label inline-block mb-2 pt-2">
          จำนวนชั่วโมง <span className="text-red-600">*</span>
        </label>
        <input
          value={data?.act_data?.act_hour}
          type="number"
          className="form-control block
          w-full py-1.5 text-base bg-clip-padding
          bg-transparent rounded transition ease-in-out m-0"
          name="act_hour"
          readOnly={read}
          onChange={(e) => {
            if (onChangeHandler) onChangeHandler(e);
          }}
        ></input>
      </div>
      {validation?.act_hour ? <div className="text-red-400 text-xs mb-3">ต้องใส่จำนวนชั่วโมง</div> : ""}
      <div className={`form-group mb-2 bg-pccp-light-orange ${validation?.act_place ? 'border-red-400 border-2' : ""} rounded-lg p-3`}>
        <label className="form-label inline-block mb-2 text-xs">
          สถานที่บำเพ็ญประโยชน์ <span className="text-red-600">*</span>
        </label>
        <input
          value={data?.act_data?.act_place}
          type="text"
          className="form-control block
          w-full py-1.5 text-base bg-clip-padding
          bg-transparent rounded transition ease-in-out m-0"
          name="act_place"
          readOnly={read}
          onChange={(e) => {
            if (onChangeHandler) onChangeHandler(e);
          }}
        ></input>
      </div>
      {validation?.act_place ? <div className="text-red-400 text-xs mb-3">ต้องใส่สถานที่</div> : ""}
      <div className={`form-group mb-2 bg-pccp-light-orange ${validation?.act_detail? 'border-red-400 border-2' : ""}
      rounded-lg p-3`}>
        <label className="form-label inline-block mb-2 text-xs">
          ลักษณะรูปแบบการบำเพ็ญประโยชน์ <span className="text-red-600">*</span>
        </label>
        <textarea
          value={data?.act_data?.act_detail}
          className="form-control block
          w-full py-1.5 text-base bg-clip-padding
          bg-transparent rounded transition ease-in-out m-0"
          name="act_detail"
          readOnly={read}
          onChange={(e) => {
            if (onChangeAreaHandler) onChangeAreaHandler(e);
          }}
        ></textarea>
      </div>
      {validation?.act_detail ? <div className="text-red-400 text-xs mb-3">ต้องใส่รูปแบบการบำเพ็ญประโยชน์</div> : ""}
      <div className={`form-group mb-2 bg-pccp-light-orange ${validation?.act_feel? 'border-red-400 border-2' : ""}
      rounded-lg p-3`}>
        <label className="form-label inline-block mb-2 text-xs">
          ความประทับใจ <span className="text-red-600">*</span>
        </label>
        <textarea
        value={data?.act_data?.act_feel}
          className="form-control block
          w-full py-1.5 text-base bg-clip-padding
          bg-transparent rounded transition ease-in-out m-0"
          name="act_feel"
          readOnly={read}
          onChange={(e) => {
            if (onChangeAreaHandler) onChangeAreaHandler(e);
          }}
        ></textarea>
      </div>
      {validation?.act_feel ? <div className="text-red-400 text-xs mb-3">ต้องใส่ความประทับใจ</div> : ""}
    </div>
  );
};

export default FormLayoutOutreach;
