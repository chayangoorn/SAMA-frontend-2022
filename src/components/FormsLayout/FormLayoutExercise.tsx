import { ValidateAct, ActData } from "../../redux/type";

interface FormProps {
  onChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  validation?: ValidateAct
  data?: ActData
  read?: boolean
}

const FormLayoutExercise: React.FC<FormProps> = ({
  onChangeHandler,
  validation,
  data,
  read
}) => {
    return (
      <div className="bg-pccp-light-blue p-5 rounded-lg">
          <div className={`form-group mb-2 bg-pccp-light-orange ${validation?.act_time_starts? 'border-red-400 border-2' : ""}
      rounded-lg p-3 grid grid-cols-2`}>
          <label className="form-label inline-block mb-2 pt-2">เวลาเริ่มต้น <span className="text-red-600">*</span></label>
          <input
            value={data?.act_time_starts}
            type="time"
            className="form-control block w-full py-1.5 text-base font-normal text-gray-700 bg-transparent
            bg-clip-padding rounded transition ease-in-out m-0"
            readOnly={read}
            name="act_time_starts"
            onChange={(e) => {
              if (onChangeHandler) onChangeHandler(e);
            }}
          />
        </div>
        {validation?.act_time_starts ? <div className="text-red-400 text-xs mb-3">ต้องใส่เวลาเริ่มต้น</div> : ""}
        <div className={`form-group mb-2 bg-pccp-light-orange ${validation?.act_time_ends? 'border-red-400 border-2' : ""}
      rounded-lg p-3 grid grid-cols-2`}>
          <label className="form-label inline-block mb-2 pt-2">เวลาสิ้นสุด <span className="text-red-600">*</span></label>
          <input
            value={data?.act_time_ends}
            type="time"
            className="form-control block w-full py-1.5 text-base font-normal text-gray-700 bg-transparent
            bg-clip-padding rounded transition ease-in-out m-0"
            readOnly={read}
            name="act_time_ends"
            onChange={(e) => {
              if (onChangeHandler) onChangeHandler(e);
            }}
          />
        </div>
        {validation?.act_time_ends ? <div className="text-red-400 text-xs mb-3">ต้องใส่เวลาสิ้นสุด</div> : ""}
        <div className={`form-group mb-2 bg-pccp-light-orange ${validation?.act_details ? 'border-red-400 border-2' : ""} rounded-lg p-3`}>
          <label className="form-label inline-block mb-2 text-xs">
            ลักษณะการออกำลังกาย <span className="text-red-600">*</span>
          </label>
          <input
            value={data?.act_details}
            type="text"
            className="form-control block
            w-full py-1.5 text-base bg-clip-padding
            bg-transparent rounded transition ease-in-out m-0"
            readOnly={read}
            name="act_details"
            onChange={(e) => {
              if (onChangeHandler) onChangeHandler(e);
            }}
          ></input>
        </div>
        {validation?.act_details ? <div className="text-red-400 text-xs mb-3">ต้องใส่ลักษณะการออกกำลังกาย</div> : ""}
      </div>
    );
  };
  
  export default FormLayoutExercise;
  