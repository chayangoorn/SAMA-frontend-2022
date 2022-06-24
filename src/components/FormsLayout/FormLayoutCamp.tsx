import { ValidateAct, ActData } from "../../redux/type";

interface FormProps {
  onChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChangeAreaHandler?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  validation?: ValidateAct
  data?: ActData
  read?: boolean
}

const FormLayoutCamp: React.FC<FormProps> = ({
  onChangeHandler,
  onChangeAreaHandler,
  validation,
  data,
  read
}) => {
  return (
    <div className="bg-pccp-light-blue p-5 rounded-lg">
      <div className={`form-group mb-2 bg-pccp-light-orange ${validation?.act_head ? 'border-red-400 border-2' : ""} rounded-lg p-3`}>
        <label className="form-label inline-block mb-2 text-xs">ชื่อค่าย <span className="text-red-600">*</span> </label>
        <input
          value={data?.act_head}
          type="text"
          className="form-control block
          w-full py-1.5 text-base bg-clip-padding
          bg-transparent rounded transition ease-in-out m-0"
          readOnly={read}
          name="act_head"
            onChange={e => {
             if (onChangeHandler) onChangeHandler(e)
          }}
        ></input>
      </div>
      {validation?.act_head ? <div className="text-red-400 text-xs mb-3">ต้องใส่ชื่อค่าย</div> : ""}
      <div className={`form-group mb-2 bg-pccp-light-orange ${validation?.act_places ? 'border-red-400 border-2' : ""} rounded-lg p-3`}>
        <label className="form-label inline-block mb-2 text-xs">สถานที่ <span className="text-red-600">*</span> </label>
        <input
          value={data?.act_places}
          type="text"
          className="form-control block
          w-full py-1.5 text-base bg-clip-padding
          bg-transparent rounded transition ease-in-out m-0"
          readOnly={read}
          name="act_places"
          onChange={e => {
             if (onChangeHandler) onChangeHandler(e)
          }}
        ></input>
      </div>
      {validation?.act_places ? <div className="text-red-400 text-xs mb-3">ต้องใส่สถานที่</div> : ""}
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
            onChange={e => {
             if (onChangeAreaHandler) onChangeAreaHandler(e)
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
          onChange={e => {
             if (onChangeAreaHandler) onChangeAreaHandler(e)
          }}
        ></textarea>
      </div>
      {validation?.act_feels ? <div className="text-red-400 text-xs mb-3">ต้องใส่ความรู้สึก</div> : ""}
    </div>
  );
};

export default FormLayoutCamp;
