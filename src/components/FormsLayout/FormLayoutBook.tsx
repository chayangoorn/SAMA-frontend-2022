import { ValidateAct, ActData } from "../../redux/type";

interface FormProps {
  onChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChangeAreaHandler?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  validation?: ValidateAct
  data?: ActData
  read?: boolean
}

const FormLayoutBook: React.FC<FormProps> = ({
  onChangeHandler,
  onChangeAreaHandler,
  validation,
  data,
  read
}) => {
  return (
    <div className="bg-pccp-light-blue p-5 rounded-lg">
      <div className={`form-group mb-2 bg-pccp-light-orange rounded-lg p-3 ${validation?.act_head? 'border-red-400 border-2' : ""}`}>
        <label className="form-label inline-block mb-2 text-xs">
          ชื่อหนังสือ <span className="text-red-600">*</span>
        </label>
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
      {validation?.act_head ? <div className="text-red-400 text-xs mb-3">ต้องใส่ชื่อหนังสือ</div> : ""}
      <div className={`form-group mb-2 bg-pccp-light-orange rounded-lg p-3 ${validation?.act_places? 'border-red-400 border-2' : ""}`}>
        <label className="form-label inline-block mb-2 text-xs">
          ผู้แต่ง/ผู้แปล หรือหน่วยงานที่จัดทำ <span className="text-red-600">*</span>
        </label>
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
      {validation?.act_places ? <div className="text-red-400 text-xs mb-3">ต้องใส่ผู้แต่ง / ผู้แปล หรือหน่วยงานที่จัดทำ</div> : ""}
      <div className={`form-group mb-2 bg-pccp-light-orange rounded-lg p-3 ${validation?.act_hours? 'border-red-400 border-2' : ""} grid grid-cols-2`}>
        <label className="form-label inline-block mb-2 pt-2">
          พิมพ์ครั้งที่ <span className="text-red-600">*</span>
        </label>
        <input
          value={data?.act_hours}
          type="number"
          className="form-control block
          w-full py-1.5 text-base bg-clip-padding
          bg-transparent rounded transition ease-in-out m-0"
          readOnly={read}
          name="act_hours"
          onChange={e => {
             if (onChangeHandler) onChangeHandler(e)
            }}
        ></input>
      </div>
      {validation?.act_hours ? <div className="text-red-400 text-xs mb-3">ต้องใส่ครั้งที่พิมพ์</div> : ""}
      <div className={`form-group mb-2 bg-pccp-light-orange rounded-lg p-3 ${validation?.act_print? 'border-red-400 border-2' : ""}`}>
        <label className="form-label inline-block mb-2 text-xs">
          สำนักพิมพ์ <span className="text-red-600">*</span>
        </label>
        <input
          value={data?.act_print}
          type="text"
          className="form-control block
          w-full py-1.5 text-base bg-clip-padding
          bg-transparent rounded transition ease-in-out m-0"
          readOnly={read}
          name="act_print"
          onChange={e => {
             if (onChangeHandler) onChangeHandler(e)
            }}
        ></input>
      </div>
      {validation?.act_print ? <div className="text-red-400 text-xs mb-3">ต้องใส่สำนักพิมพ์</div> : ""}
      <div className={`form-group mb-2 bg-pccp-light-orange rounded-lg p-3 ${validation?.act_date? 'border-red-400 border-2' : ""} grid grid-cols-2`}>
        <label className="form-label inline-block mb-2 pt-2">ปีที่พิมพ์ (พ.ศ.) <span className="text-red-600">*</span> </label>
        <input
          value={data?.act_date}
          type="number"
          className="form-control block w-full py-1.5 text-base font-normal text-gray-700 bg-transparent
          bg-clip-padding rounded transition 
          ease-in-out m-0"
          readOnly={read}
          name="act_date"
          onChange={e => {
             if (onChangeHandler) onChangeHandler(e)
          }}
        />
      </div>
      {validation?.act_date ? <div className="text-red-400 text-xs mb-3">ต้องใส่ปีที่พิมพ์</div> : ""}
      <div className={`form-group mb-2 bg-pccp-light-orange rounded-lg p-3 ${validation?.act_details? 'border-red-400 border-2' : ""}`}>
        <label className="form-label inline-block mb-2 text-xs">
          เรื่องย่อหรือสาระสังเขปของเรื่อง <span className="text-red-600">*</span>
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
      <div className={`form-group mb-2 bg-pccp-light-orange rounded-lg p-3 ${validation?.act_feels? 'border-red-400 border-2' : ""}`}>
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
      {validation?.act_feels ? <div className="text-red-400 text-xs mb-3">ต้องใส่ความประทับใจ</div> : ""}
    </div>
  );
};

export default FormLayoutBook;
