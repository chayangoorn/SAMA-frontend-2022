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
          <div className={`form-group mb-2 bg-pccp-light-orange ${validation?.act_time_start? 'border-red-400 border-2' : ""}
      rounded-lg p-3 grid grid-cols-2`}>
          <label className="form-label inline-block mb-2 pt-2">เวลาเริ่มต้น <span className="text-red-600">*</span></label>
          <input
            value={data?.act_data?.act_time_start}
            type="time"
            className="form-control block w-full py-1.5 text-base font-normal text-gray-700 bg-transparent
            bg-clip-padding rounded transition ease-in-out m-0"
            readOnly={read}
            name="act_time_start"
            onChange={(e) => {
              if (onChangeHandler) onChangeHandler(e);
            }}
          />
        </div>
        {validation?.act_time_start ? <div className="text-red-400 text-xs mb-3">ต้องใส่เวลาเริ่มต้น</div> : ""}
        <div className={`form-group mb-2 bg-pccp-light-orange ${validation?.act_time_end? 'border-red-400 border-2' : ""}
      rounded-lg p-3 grid grid-cols-2`}>
          <label className="form-label inline-block mb-2 pt-2">เวลาสิ้นสุด <span className="text-red-600">*</span></label>
          <input
            value={data?.act_data?.act_time_end}
            type="time"
            className="form-control block w-full py-1.5 text-base font-normal text-gray-700 bg-transparent
            bg-clip-padding rounded transition ease-in-out m-0"
            readOnly={read}
            name="act_time_end"
            onChange={(e) => {
              if (onChangeHandler) onChangeHandler(e);
            }}
          />
        </div>
        {validation?.act_time_end ? <div className="text-red-400 text-xs mb-3">ต้องใส่เวลาสิ้นสุด</div> : ""}
        <div className={`form-group mb-2 bg-pccp-light-orange ${validation?.act_detail ? 'border-red-400 border-2' : ""} rounded-lg p-3`}>
          <label className="form-label inline-block mb-2 text-xs">
            ลักษณะการออกกำลังกาย <span className="text-red-600">*</span>
          </label>
          <input
            value={data?.act_data?.act_detail}
            type="text"
            className="form-control block
            w-full py-1.5 text-base bg-clip-padding
            bg-transparent rounded transition ease-in-out m-0"
            readOnly={read}
            name="act_detail"
            onChange={(e) => {
              if (onChangeHandler) onChangeHandler(e);
            }}
          ></input>
        </div>
        {validation?.act_detail ? <div className="text-red-400 text-xs mb-3">ต้องใส่ลักษณะการออกกำลังกาย</div> : ""}
      </div>
    );
  };
  
  export default FormLayoutExercise;
  