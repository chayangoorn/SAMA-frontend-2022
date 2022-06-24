import { ValidateAct, ActData } from "../../redux/type";

interface FormProps {
  onChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeAreaHandler?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  validation?: ValidateAct
  data?: ActData,
  read?: boolean
}

const FormLayoutLecture: React.FC<FormProps> = ({
  onChangeHandler,
  onChangeAreaHandler,
  validation,
  data,
  read
}) => {

  return (
    <div className="bg-pccp-light-blue p-5 rounded-lg">
      <div className={`form-group mb-2 bg-pccp-light-orange ${validation?.act_head ? 'border-red-400 border-2' : ""} rounded-lg p-3`}>
        <label className="form-label inline-block mb-2 text-xs">
          หัวข้อการฟังบรรยาย <span className="text-red-600">*</span>
        </label>
        <input
          value={data?.act_head}
          type="text"
          className="form-control block
            w-full py-1.5 text-base bg-clip-padding
            bg-transparent rounded transition ease-in-out m-0 "
          name="act_head"
          readOnly={read}
          onChange={(e) => {
            if (onChangeHandler) onChangeHandler(e);
          }}
        ></input>
      </div>
      {validation?.act_head ? <div className="text-red-400 text-xs mb-3">ต้องใส่หัวข้อ</div> : ""}
      <div className={`form-group mb-2 bg-pccp-light-orange ${validation?.act_date? 'border-red-400 border-2' : ""}
      rounded-lg p-3 grid grid-cols-2`}>
        <label className="form-label inline-block mb-2 pt-2">
          วันที่ฟังบรรยาย <span className="text-red-600">*</span>
        </label>
        <input
          value={data?.act_date}
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
      {validation?.act_date ? <div className="text-red-400 text-xs mb-3">ต้องใส่วันที่</div> : ""}
      <div className={`form-group mb-2 bg-pccp-light-orange ${validation?.act_details ? 'border-red-400 border-2' : ""} rounded-lg p-3`}>
        <label className="form-label inline-block mb-2 text-xs">
          ความรู้ที่ได้รับโดยสังเขป <span className="text-red-600">*</span>
        </label>
        <textarea
          value={data?.act_details}
          className="form-control block
            w-full py-1.5 text-base bg-clip-padding
            bg-transparent rounded transition ease-in-out m-0 "
          name="act_details"
          readOnly={read}
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
            bg-transparent rounded transition ease-in-out m-0 "
          name="act_feels"
          readOnly={read}
          onChange={(e) => {
            if (onChangeAreaHandler) onChangeAreaHandler(e);
          }}
        ></textarea>
      </div>
      {validation?.act_feels ? <div className="text-red-400 text-xs mb-3">ต้องใส่ความรู้สึก</div> : ""}
    </div>
  );
};

export default FormLayoutLecture;
